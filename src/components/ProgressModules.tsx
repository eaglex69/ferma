"use client";

import { useEffect, useState } from "react";
import { Check, Coins, Crown, Gem, Lock, Timer, Trophy, Users } from "lucide-react";
import { AVATARS } from "@/lib/avatars";
import { ITEMS } from "@/lib/game-config";
import {
  POINTS_PER_LEVEL, PREMIUM_COST, SEASON_LEVELS, WEEKLY_COOP_REWARDS, WEEKLY_FARMER_REWARDS,
  lifetimeScore, seasonEnd, seasonName, seasonReward, weekEnd, type Reward,
} from "@/lib/season";
import type { Act, GamePayload } from "./game-types";
import { Avatar, Button, CardTitle, EmptyState, ItemIcon } from "./game-ui";
import { GameIcon } from "./icons";
import { SvgIcon } from "./svg-icons";

export function RewardChips({ reward }: { reward: Reward }) {
  return <div className="reward-chips">
    {!!reward.coins && <span><SvgIcon icon={Coins} size={13} />{reward.coins}</span>}
    {!!reward.gems && <span><SvgIcon icon={Gem} size={13} />{reward.gems}</span>}
    {reward.items && Object.entries(reward.items).map(([key, amount]) => <span key={key}><ItemIcon itemKey={key} size={13} />{ITEMS[key]?.name ?? key} ×{amount}</span>)}
    {reward.avatar && <span><Avatar name={reward.avatar} size={18} />{AVATARS[reward.avatar]?.name}</span>}
  </div>;
}

type FarmerRow = { id: number; displayName: string; avatar: string; level: number; points: number; tag: string | null };
type CoopRow = { id: number; name: string; tag: string; icon: string; points: number; members: number };
type Winner = { id: number; name: string; rank: number; points: number; tag?: string };
type RatingData = {
  week: string;
  farmersWeek: FarmerRow[];
  farmersAll: FarmerRow[];
  coopsWeek: CoopRow[];
  coopsAll: CoopRow[];
  myPoints: number;
  last: { week: string; summary: { farmers?: Winner[]; coops?: Winner[] } } | null;
};

let ratingCache: RatingData | null = null;

export function RatingModule({ now, me, onProfile }: { now: number; me: number; onProfile: (id: number) => void }) {
  const [data, setData] = useState<RatingData | null>(ratingCache);
  const [tab, setTab] = useState<"farmers" | "coops">("farmers");
  const [period, setPeriod] = useState<"week" | "all">("week");

  useEffect(() => {
    let alive = true;
    void fetch("/api/rating", { cache: "no-store" }).then((response) => (response.ok ? response.json() : null)).then((json) => { if (json) { ratingCache = json as RatingData; if (alive) setData(json as RatingData); } });
    return () => { alive = false; };
  }, []);

  if (!data) return <div className="inline-loading"><div className="loading-bar"><i /></div><p>Считаем очки…</p></div>;

  const left = Math.max(0, weekEnd(now) - now);
  const days = Math.floor(left / 86_400_000);
  const hours = Math.floor((left % 86_400_000) / 3_600_000);
  const farmers = period === "week" ? data.farmersWeek : data.farmersAll;
  const coops = period === "week" ? data.coopsWeek : data.coopsAll;
  const rewards = tab === "farmers" ? WEEKLY_FARMER_REWARDS : WEEKLY_COOP_REWARDS;

  return <div className="module-stack">
    <section className="rating-hero">
      <SvgIcon icon={Trophy} size={30} />
      <div><strong>Недельный турнир</strong><p>Каждую неделю топ-5 фермеров и топ-5 кооперативов получают подарки на почту.</p></div>
      <span className="rating-timer"><SvgIcon icon={Timer} size={13} />{days} д {hours} ч</span>
    </section>
    <div className="segmented"><button className={tab === "farmers" ? "active" : ""} onClick={() => setTab("farmers")}>Фермеры</button><button className={tab === "coops" ? "active" : ""} onClick={() => setTab("coops")}>Кооперативы</button></div>
    <div className="segmented"><button className={period === "week" ? "active" : ""} onClick={() => setPeriod("week")}>Эта неделя</button><button className={period === "all" ? "active" : ""} onClick={() => setPeriod("all")}>За всё время</button></div>
    {period === "week" && <section className="panel"><CardTitle icon={<SvgIcon icon={Crown} size={19} />} title={tab === "farmers" ? "Награды недели" : "Награды участникам кооператива"} subtitle={`Ваши очки недели: ${data.myPoints}`} />
      <div className="reward-table">{rewards.map((reward, index) => <div key={index}><span className={`rank-badge rank-${index + 1}`}>{index + 1}</span><RewardChips reward={reward} /></div>)}</div>
      <p className="form-hint">Очки: урожай ×5, рыба ×4, шахта ×3, заготовка ×6, заказ города ×20 и +1 за каждые 20 заработанных монет.</p></section>}
    <div className="rating-list">
      {tab === "farmers" && (farmers.length === 0 ? <EmptyState icon={<SvgIcon icon={Trophy} size={32} />} title="Пока никого" text="Сыграйте — и вы окажетесь в таблице первым." /> : farmers.map((row, index) => <button className={`rating-row ${row.id === me ? "me" : ""}`} onClick={() => onProfile(row.id)} key={row.id}>
        <span className={`rank-badge rank-${index + 1}`}>{index + 1}</span><Avatar name={row.avatar} size={38} />
        <div><strong>{row.displayName}</strong><small>{row.tag ? `[${row.tag}] · ` : ""}{row.level} уровень</small></div>
        <b>{period === "week" ? `${row.points} оч.` : `${row.points} XP`}</b></button>))}
      {tab === "coops" && (coops.length === 0 ? <EmptyState icon={<SvgIcon icon={Users} size={32} />} title="Кооперативов пока нет" text="Создайте первый в разделе «Кооператив»." /> : coops.map((row, index) => <div className="rating-row" key={row.id}>
        <span className={`rank-badge rank-${index + 1}`}>{index + 1}</span><span className="coop-emblem"><GameIcon name={row.icon} size={22} /></span>
        <div><strong>[{row.tag}] {row.name}</strong><small>{row.members} участников</small></div>
        <b>{period === "week" ? `${row.points} оч.` : `${row.points} XP`}</b></div>))}
    </div>
    {data.last && <section className="panel"><CardTitle icon={<SvgIcon icon={Trophy} size={19} />} title={`Победители прошлой недели (${data.last.week})`} />
      <div className="winners">
        {(data.last.summary.farmers ?? []).map((winner) => <button key={`f${winner.id}`} onClick={() => onProfile(winner.id)}><span className={`rank-badge rank-${winner.rank}`}>{winner.rank}</span>{winner.name}<small>{winner.points} оч.</small></button>)}
        {(data.last.summary.coops ?? []).map((winner) => <div key={`c${winner.id}`}><span className={`rank-badge rank-${winner.rank}`}>{winner.rank}</span>[{winner.tag}] {winner.name}<small>{winner.points} оч.</small></div>)}
      </div></section>}
  </div>;
}

export function SeasonModule({ payload, now, busy, act }: { payload: GamePayload; now: number; busy: boolean; act: Act }) {
  const { state } = payload;
  const points = Math.max(0, lifetimeScore(state.stats) - state.season.base);
  const level = Math.min(SEASON_LEVELS, Math.floor(points / POINTS_PER_LEVEL));
  const inLevel = level >= SEASON_LEVELS ? POINTS_PER_LEVEL : points % POINTS_PER_LEVEL;
  const daysLeft = Math.max(0, Math.ceil((seasonEnd(now) - now) / 86_400_000));
  const levels = Array.from({ length: SEASON_LEVELS }, (_, index) => index + 1);

  function cell(track: "free" | "premium", lvl: number) {
    const reward = seasonReward(track, lvl);
    const claimed = (track === "premium" ? state.season.claimedPremium : state.season.claimedFree).includes(lvl);
    const reached = lvl <= level;
    const locked = track === "premium" && !state.season.premium;
    return <div className={`season-cell ${claimed ? "claimed" : ""} ${reached ? "reached" : ""}`}>
      <RewardChips reward={reward} />
      {claimed ? <span className="season-done"><SvgIcon icon={Check} size={14} />Получено</span> : <Button disabled={busy || !reached || locked} onClick={() => void act({ type: "season-claim", track, level: lvl })}>{locked && <SvgIcon icon={Lock} size={13} />}{!reached ? "Закрыто" : locked ? "Премиум" : "Забрать"}</Button>}
    </div>;
  }

  return <div className="module-stack">
    <section className="season-hero">
      <span className="eyebrow light">Сезон · осталось {daysLeft} дн.</span>
      <h2>{seasonName(now)}</h2>
      <div className="season-level"><strong>Уровень {level}<small> из {SEASON_LEVELS}</small></strong><span>{inLevel}/{POINTS_PER_LEVEL} очков</span></div>
      <div className="progress-track"><span style={{ width: `${inLevel / POINTS_PER_LEVEL * 100}%` }} /></div>
      <p>Очки пропуска набираются за любые дела на ферме: урожай, рыбалка, шахты, заготовки и заказы города.</p>
    </section>
    {!state.season.premium && <section className="season-premium"><SvgIcon icon={Crown} size={28} /><div><h3>Премиум-пропуск</h3><p>Откроет вторую дорожку: больше монет, алмазов, предметов и эксклюзивные аватары. Награды за уже пройденные уровни забираются сразу.</p></div><Button disabled={busy || state.gems < PREMIUM_COST} onClick={() => void act({ type: "season-premium" })}><SvgIcon icon={Gem} size={15} />{PREMIUM_COST} алмазов</Button></section>}
    <div className="season-table">
      <div className="season-head"><span>Ур.</span><span>Бесплатный</span><span>Премиум</span></div>
      {levels.map((lvl) => <div className={`season-row ${lvl <= level ? "reached" : ""}`} key={lvl}><span className="season-lvl">{lvl}</span>{cell("free", lvl)}{cell("premium", lvl)}</div>)}
    </div>
  </div>;
}
