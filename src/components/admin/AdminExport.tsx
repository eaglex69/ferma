"use client";

import { Download, FileCode2, Package, Server, Smartphone } from "lucide-react";
import { Card } from "./admin-kit";
import { SvgIcon } from "../svg-icons";

export function AdminExport() {
  const isPhp = typeof window !== "undefined" && (window as unknown as { __VALLEY_CANVAS__?: boolean }).__VALLEY_CANVAS__ === true;
  const nextHref = isPhp ? "/api/export?type=next" : "/api/admin/export?type=next";
  const phpHref = isPhp ? "/api/export?type=php" : "/api/admin/export?type=php";
  return <div className="adm-stack">
    <Card title="Скачать игру целиком" subtitle="Архивы собраны из текущего кода. Внутри — исходники, графика, схема БД и инструкции. Секреты и содержимое вашей базы в архив не входят">
      <div className="adm-export-grid">
        <article className="adm-export-card"><span className="adm-export-icon"><SvgIcon icon={FileCode2} size={28} /></span><h3>Next.js + PostgreSQL</h3><p>Основная версия: App Router, React, Drizzle ORM, все разделы игры и админки.</p><ul><li>Исходный TypeScript/React</li><li>Все изображения и стили</li><li>Drizzle-схема и скрипт создания админа</li><li>README с командами запуска</li></ul><a className="adm-btn adm-btn-primary" href={nextHref} download><SvgIcon icon={Download} size={16} />Скачать Next.js</a></article>
        <article className="adm-export-card"><span className="adm-export-icon php"><SvgIcon icon={Server} size={28} /></span><h3>PHP + MySQL + AJAX + Canvas</h3><p>Отдельный установочный пакет с тем же интерфейсом и PHP API. Карта рисуется на canvas.</p><ul><li>Готовый собранный клиент и PHP API</li><li>MySQL schema.sql</li><li>Canvas-карта и общие изображения</li><li>Установка и create-admin.php</li></ul><a className="adm-btn adm-btn-primary" href={phpHref} download><SvgIcon icon={Download} size={16} />Скачать PHP-версию</a></article>
      </div>
    </Card>
    <Card title="Что входит в PHP-пакет" subtitle="Не заглушка и не ссылка на Next.js">
      <div className="adm-kv"><div><span>Сервер</span><strong>PHP 8.1+ / PDO MySQL</strong></div><div><span>Клиент</span><strong>AJAX + общий UI</strong></div><div><span>Карта</span><strong>Canvas + параллакс</strong></div><div><span>Графика</span><strong>Общие ассеты и иконки</strong></div><div><span>Данные</span><strong>MySQL 8+</strong></div><div><span>Запуск</span><strong>Apache или router.php</strong></div></div>
      <p className="adm-hint"><SvgIcon icon={Package} size={15} /> Для повторной сборки PHP-клиента из исходников выполните <code>node scripts/build-php.mjs</code>. Затем обновите архив кнопкой сборки проекта.</p>
      <p className="adm-hint"><SvgIcon icon={Smartphone} size={15} /> На телефоне архивы скачиваются как обычные ZIP-файлы. Распаковывайте их на сервере, а не внутри папки публичного сайта с секретами.</p>
    </Card>
  </div>;
}
