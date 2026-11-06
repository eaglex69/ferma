"use client";

import { ChevronLeft, Coins, Gem, Home, Menu, Plus, Store, Truck, Warehouse, Zap } from "lucide-react";
import { xpNeeded } from "@/lib/game-config";
import type { GamePayload, ModuleKey, OpenModule } from "./game-types";
import { Avatar } from "./game-ui";
import { UiIcon } from "./icons";
import { MODULE_META } from "./module-meta";
import { SvgIcon } from "./svg-icons";

const fmt = (value: number) => new Intl.NumberFormat("ru-RU").format(value);

// Верхняя HUD-панель внутренних разделов: аватар с уровнем, энергия, монеты, алмазы.
export function TopHud({ payload, active, open, onMenu }: { payload: GamePayload; active: ModuleKey; open: OpenModule; onMenu: () => void }) {
  const { state, user } = payload;
  const need = xpNeeded(state.level);
  const meta = MODULE_META[active];
  const full = state.energy >= state.maxEnergy;
  return <header className="game-header top-hud">
    <div className="th-row">
      <button className="th-player" onClick={() => open("profile")} aria-label="Профиль">
        <span className="th-avatar"><Avatar name={user.avatar} size={38} /><em>{state.level}</em></span>
        <span className="th-name"><strong>{user.displayName}</strong><small>{state.xp} / {need}</small><i><b style={{ width: `${Math.min(100, state.xp / need * 100)}%` }} /></i></span>
      </button>
      <button className="th-pill th-energy" onClick={() => open("jobs")} aria-label="Энергия">
        <span className="th-ico energy"><UiIcon id="energy" fallback={Zap} size={16} /></span>
        <span className="th-val"><strong>{state.energy}</strong><small>{full ? "полная" : `из ${state.maxEnergy}`}</small></span>
        <span className="th-plus"><UiIcon id="plus" fallback={Plus} size={12} /></span>
      </button>
      <button className="th-pill" onClick={() => open("market")} aria-label="Монеты">
        <span className="th-ico coin"><UiIcon id="coin" fallback={Coins} size={16} /></span>
        <span className="th-val"><strong>{fmt(state.coins)}</strong></span>
        <span className="th-plus"><UiIcon id="plus" fallback={Plus} size={12} /></span>
      </button>
      <button className="th-pill" onClick={() => open("promos")} aria-label="Алмазы">
        <span className="th-ico gem"><UiIcon id="gem" fallback={Gem} size={16} /></span>
        <span className="th-val"><strong>{fmt(state.gems)}</strong></span>
        <span className="th-plus"><UiIcon id="plus" fallback={Plus} size={12} /></span>
      </button>
    </div>
    {active !== "profile" && <div className="th-title">
      <button className="th-back" onClick={() => open("home")} aria-label="На главную"><UiIcon id="back" fallback={ChevronLeft} size={20} /></button>
      <span className="th-title-ico"><UiIcon id={`module:${active}`} fallback={meta.icon} size={18} /></span>
      <div><strong>{meta.title}</strong><small>{meta.subtitle}</small></div>
      <button className="th-menu" onClick={onMenu} aria-label="Все разделы"><UiIcon id="settings" fallback={Menu} size={19} /></button>
    </div>}
  </header>;
}

// Нижняя панель: Ферма, Усадьба (все разделы), большая кнопка «Заказы», Магазин, Профиль.
export function BottomBar({ payload, active, open, onMenu, menuOpen, ordersReady }: { payload: GamePayload; active: ModuleKey; open: OpenModule; onMenu: () => void; menuOpen: boolean; ordersReady: number }) {
  const unread = payload.unreadMail;
  return <nav className="bottom-bar" aria-label="Навигация">
    <button className={menuOpen ? "active" : ""} onClick={onMenu}><span className="bb-ico"><UiIcon id="nav:estate" fallback={Warehouse} size={24} /></span><span>Усадьба</span></button>
    <button className={active === "city" ? "active" : ""} onClick={() => open("city")}><span className="bb-ico"><UiIcon id="nav:orders" fallback={Truck} size={24} />{ordersReady > 0 && <em>{ordersReady}</em>}</span><span>Заказы</span></button>
    <button className={`bb-center ${active === "home" ? "active" : ""}`} onClick={() => open("home")}><span className="bb-big"><UiIcon id="nav:farm" fallback={Home} size={34} /></span><span className="bb-ribbon">Ферма</span></button>
    <button className={active === "shop" ? "active" : ""} onClick={() => open("shop")}><span className="bb-ico"><UiIcon id="nav:shop" fallback={Store} size={24} /></span><span>Магазин</span></button>
    <button className={`bb-profile ${active === "profile" ? "active" : ""}`} onClick={() => open("profile")}><span className="bb-ava"><Avatar name={payload.user.avatar} size={36} />{unread > 0 && <em>{unread}</em>}</span><span>Профиль</span></button>
    <span className="sr-only"><SvgIcon icon={Menu} size={1} /></span>
  </nav>;
}
