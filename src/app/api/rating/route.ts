import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { getCurrentUser } from "@/lib/auth";
import { weekKey } from "@/lib/season";
import { settleWeeklyRewards } from "@/lib/weekly";

export const dynamic = "force-dynamic";

async function rows(query: ReturnType<typeof sql>) {
  return (await db.execute(query)).rows;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Нужно войти" }, { status: 401 });
  if (user.bannedAt) return NextResponse.json({ error: "Аккаунт заблокирован" }, { status: 403 });
  try {
    await settleWeeklyRewards().catch(() => undefined);
    const week = weekKey(Date.now());
    const [farmersWeek, farmersAll, coopsWeek, coopsAll, lastRows, mine] = await Promise.all([
      rows(sql`select u.id, u.display_name as "displayName", u.avatar, coalesce((f.data->>'level')::int, 1) as level, s.points,
        (select c.tag from coop_members m join coops c on c.id = m.coop_id where m.user_id = u.id) as tag
        from weekly_scores s join users u on u.id = s.user_id left join farm_states f on f.user_id = u.id
        where s.week = ${week} and s.points > 0 and u.banned_at is null and u.role <> 'admin'
        order by s.points desc, u.id asc limit 50`),
      rows(sql`select u.id, u.display_name as "displayName", u.avatar, coalesce((f.data->>'level')::int, 1) as level, coalesce((f.data->>'xp')::int, 0) as points,
        (select c.tag from coop_members m join coops c on c.id = m.coop_id where m.user_id = u.id) as tag
        from users u join farm_states f on f.user_id = u.id
        where u.banned_at is null and u.role <> 'admin'
        order by level desc, points desc, u.id asc limit 50`),
      rows(sql`select c.id, c.name, c.tag, c.icon, coalesce(sum(s.points), 0)::int as points, count(distinct m.user_id)::int as members
        from coops c join coop_members m on m.coop_id = c.id left join weekly_scores s on s.user_id = m.user_id and s.week = ${week}
        group by c.id order by points desc, c.id asc limit 30`),
      rows(sql`select c.id, c.name, c.tag, c.icon, c.xp as points, (select count(*) from coop_members m where m.coop_id = c.id)::int as members
        from coops c order by c.xp desc, c.id asc limit 30`),
      rows(sql`select week, summary from weekly_rewards where summary <> '{}'::jsonb order by week desc limit 1`),
      rows(sql`select points from weekly_scores where week = ${week} and user_id = ${user.id}`),
    ]);
    return NextResponse.json({
      week,
      farmersWeek,
      farmersAll,
      coopsWeek,
      coopsAll,
      myPoints: (mine[0] as { points?: number } | undefined)?.points ?? 0,
      last: lastRows[0] ?? null,
    });
  } catch (error) {
    console.error("Rating failed", error);
    return NextResponse.json({ error: "Не удалось загрузить рейтинги" }, { status: 500 });
  }
}
