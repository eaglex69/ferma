"use client";

import { Award, BadgePercent, Briefcase, Coins, Gem, Gift, Landmark, Mail, MessageCircle, Newspaper, Plus, Settings, Store, Timer, Trophy, Users, Zap } from "lucide-react";
import { NEWS, dayKey, xpNeeded } from "@/lib/game-config";
import { POINTS_PER_LEVEL, SEASON_LEVELS, lifetimeScore } from "@/lib/season";
import type { GamePayload, ModuleKey, OpenModule, SocialPayload } from "./game-types";
import { Avatar } from "./game-ui";
import { GameIcon, UiIcon } from "./icons";
import { PINS } from "./map-pins";
import { useEffect, useState } from "react";
import CanvasFarmBackground from "./CanvasFarmBackground";
import { BonusChips } from "./BonusUi";
import { SvgIcon } from "./svg-icons";

export default function FarmMap({ payload, social, now, open, onMenu }: { payload: GamePayload; social: SocialPayload; now: number; open: OpenModule; onMenu: () => void }) {
  const [canvasMode, setCanvasMode] = useState(false);
  useEffect(() => { setCanvasMode((window as unknown as { __VALLEY_CANVAS__?: boolean }).__VALLEY_CANVAS__ === true); }, []);
  const { state, user } = payload;
  const ready: Partial<Record<ModuleKey, number>> = {
    garden: state.plots.filter((plot) => plot.crop && plot.readyAt <= now).length,
    ponds: state.ponds.filter((slot) => slot.species && slot.readyAt <= now).length,
    cages: state.cages.filter((slot) => slot.species && slot.readyAt <= now).length,
    pens: state.pens.filter((pen) => pen.animal && pen.readyAt <= now).length,
    cellar: state.cellar.jobs.filter((job) => job.readyAt <= now).length,
    jobs: state.job && state.job.readyAt <= now ? 1 : 0,
    city: state.orders.items.filter((order) => !state.orders.completed.includes(order.id) && (state.inventory[order.itemKey] ?? 0) >= order.quantity).length,
  };
  const timers: Partial<Record<ModuleKey, number>> = {};
  const nextTimer = (key: ModuleKey, values: number[]) => {
    const pending = values.filter((value) => value > now);
    if (pending.length && !(ready[key] ?? 0)) timers[key] = Math.min(...pending) - now;
  };
  nextTimer("garden", state.plots.map((plot) => (plot.crop ? plot.readyAt : 0)));
  nextTimer("ponds", state.ponds.map((slot) => (slot.species ? slot.readyAt : 0)));
  nextTimer("cages", state.cages.map((slot) => (slot.species ? slot.readyAt : 0)));
  nextTimer("pens", state.pens.map((pen) => (pen.animal ? pen.readyAt : 0)));
  nextTimer("cellar", state.cellar.jobs.map((job) => job.readyAt));
  nextTimer("jobs", state.job ? [state.job.readyAt] : []);

  const unreadNews = NEWS.filter((news) => !state.readNews.includes(news.id)).length + payload.news.filter((news) => !state.readNews.includes(`n${news.id}`)).length;
  const incoming = social.friends.filter((friend) => friend.status === "pending" && friend.addresseeId === user.id).length;
  const dailyClaimed = state.claimedPromos.includes(`daily:${dayKey()}`);
  const need = xpNeeded(state.level);

  const seasonLevel = Math.min(SEASON_LEVELS, Math.floor(Math.max(0, lifetimeScore(state.stats) - state.season.base) / POINTS_PER_LEVEL));
  let claimable = 0;
  for (let level = 1; level <= seasonLevel; level += 1) {
    if (!state.season.claimedFree.includes(level)) claimable += 1;
    if (state.season.premium && !state.season.claimedPremium.includes(level)) claimable += 1;
  }

  const fmt = (ms: number) => {
    const s = Math.ceil(ms / 1000);
    return s >= 3600 ? `${Math.floor(s / 3600)}ч ${Math.floor((s % 3600) / 60)}м` : `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  return <div className="farm-map">
    <div className="farm-map-bg" />{canvasMode && <CanvasFarmBackground />}

    <div className="hud hud-top-left">
      <button className="hud-portrait" onClick={() => open("profile")}><span className="hud-portrait-frame"><Avatar name={user.avatar} size={54} /></span><strong>{user.displayName}</strong><small>#{user.id}</small></button>
      <div className="hud-bars">
        <div className="hud-bar hud-level"><span className="hud-star">{state.level}</span><div className="hud-bar-track"><i style={{ width: `${Math.min(100, state.xp / need * 100)}%` }} /><b>{state.xp}/{need}</b></div></div>
        <button className="hud-bar hud-energy" onClick={() => open("jobs")}><span className="hud-bolt"><UiIcon id="energy" fallback={Zap} size={17} /></span><div className="hud-bar-track"><i style={{ width: `${state.energy / state.maxEnergy * 100}%` }} /><b>{state.energy}/{state.maxEnergy}</b></div></button>
      </div>
    </div>

    <div className="hud hud-top-right">
      <button className="hud-currency" onClick={() => open("market")}><span className="hud-cash"><UiIcon id="coin" fallback={Coins} size={20} /></span><strong>{new Intl.NumberFormat("ru-RU").format(state.coins)}</strong><i className="hud-plus"><UiIcon id="plus" fallback={Plus} size={15} /></i></button>
      <button className="hud-currency" onClick={() => open("promos")}><span className="hud-ingot"><UiIcon id="gem" fallback={Gem} size={20} /></span><strong>{state.gems}</strong><i className="hud-plus"><UiIcon id="plus" fallback={Plus} size={15} /></i></button>
      <div className="hud-icon-row">
        <button className="hud-square" onClick={() => open("bank")} aria-label="Банк"><UiIcon id="module:bank" fallback={Landmark} size={22} /></button>
        <button className="hud-square" onClick={() => open("mail")} aria-label="Почта"><UiIcon id="mail" fallback={Mail} size={22} />{payload.unreadMail > 0 && <em>!</em>}</button>
        <button className="hud-square blue" onClick={onMenu} aria-label="Все разделы"><UiIcon id="settings" fallback={Settings} size={22} /></button>
      </div>
      <div className="hud-icon-row">
        <button className="hud-square" onClick={() => open("rating")} aria-label="Рейтинги"><UiIcon id="rating" fallback={Trophy} size={22} /></button>
        <button className="hud-square" onClick={() => open("season")} aria-label="Сезонный пропуск"><UiIcon id="season" fallback={Award} size={22} />{claimable > 0 && <em>{claimable}</em>}</button>
      </div>
    </div>

    <div className="hud hud-left-row">
      <button className="hud-event" onClick={() => open("promos")}><span><UiIcon id="gift" fallback={Gift} size={24} /></span>{!dailyClaimed && <em>!</em>}<small>{dailyClaimed ? "получен" : "подарок"}</small></button>
      <button className="hud-event" onClick={() => open("news")}><span><UiIcon id="news" fallback={Newspaper} size={24} /></span>{unreadNews > 0 && <em>{unreadNews}</em>}<small>новости</small></button>
      {state.elysium.blessing && state.elysium.until > now && <button className="hud-event" onClick={() => open("elysium")}><span><GameIcon name="wand" size={24} /></span><small>{fmt(state.elysium.until - now)}</small></button>}
    </div>

    <BonusChips bonuses={payload.bonuses ?? []} now={now} onOpen={() => open("promos")} />

    {PINS.map((pin) => {
      const count = ready[pin.key] ?? 0;
      const timer = timers[pin.key];
      return <button className={`map-pin ${count ? "is-ready" : ""}`} style={{ left: `${pin.x}%`, top: `${pin.y}%` }} onClick={() => open(pin.key)} key={pin.key} aria-label={pin.label}>
        <span className="map-pin-icon"><GameIcon name={pin.icon} overrideKey={`pin:${pin.key}`} size={40} />{count > 0 && <em>{count}</em>}</span>
        <span className="map-pin-label">{pin.label}</span>
        {timer !== undefined && <span className="map-pin-timer"><SvgIcon icon={Timer} size={10} />{fmt(timer)}</span>}
      </button>;
    })}

    {payload.banner && <div className="map-banner">{payload.banner}</div>}

    <div className="hud hud-bottom" hidden>
      <div className="hud-bottom-group">
        <button className="hud-tile" onClick={() => open("friends")}><UiIcon id="friends" fallback={Users} size={26} />{incoming > 0 && <em>{incoming}</em>}<small>Друзья</small></button>
        <button className="hud-tile" onClick={() => open("market")}><UiIcon id="market" fallback={Store} size={26} /><small>Рынок</small></button>
      </div>
      <div className="hud-bottom-group">
        <button className="hud-tile" onClick={() => open("chat")}><UiIcon id="chat" fallback={MessageCircle} size={26} /><i className="hud-online" /><small>Чат {payload.online}</small></button>
        <button className="hud-tile" onClick={() => open("forum")}><UiIcon id="forum" fallback={Newspaper} size={26} /><small>Форум</small></button>
        <button className="hud-tile" onClick={() => open("newspaper")}><UiIcon id="newspaper" fallback={BadgePercent} size={26} /><small>Газета</small></button>
        <button className="hud-tile gold" onClick={() => open("city")}><UiIcon id="orders" fallback={Briefcase} size={26} />{(ready.city ?? 0) > 0 && <em>{ready.city}</em>}<small>Заказы</small></button>
      </div>
    </div>
  </div>;
}
