import { useRef, useState } from "react";
import "./HomePage.css";
import { resultData, type ResultId } from "../data/result";

type HomePageProps = {
  onStart: () => void;
};

const cardOrder: ResultId[] = [
  "phlegm_dampness", // 05 祛湿喵
  "damp_heat", // 06 凉茶喵
  "blood_stasis", // 07 通通喵
  "qi_stagnation", // 08 逍遥喵
  "special_diathesis", // 09 结界喵
  "peaceful", // 01 天选喵
  "qi_deficiency", // 02 快充喵
  "yang_deficiency", // 03 暖暖喵
  "yin_deficiency", // 04 水光喵
];

const initialIndex = cardOrder.indexOf("peaceful");

function getOffset(index: number, activeIndex: number) {
  let offset = index - activeIndex;

  if (offset > 4) offset -= 9;
  if (offset < -4) offset += 9;

  return offset;
}

export default function HomePage({ onStart }: HomePageProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [showCrowdfundingNotice, setShowCrowdfundingNotice] =
  useState(false);
  const pcDragStart = useRef<number | null>(null);
  const mobileDragStart = useRef<number | null>(null);
  const dragged = useRef(false);

  const selectNext = (direction: number) => {
    setActiveIndex((current) => (current + direction + 9) % 9);
  };

  const selectCard = (index: number) => {
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    setActiveIndex(index);
  };

  const handlePcWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    if (Math.abs(delta) > 8) {
      event.preventDefault();
      selectNext(delta > 0 ? 1 : -1);
    }
  };

  const handlePcPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pcDragStart.current = event.clientX;
    dragged.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePcPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pcDragStart.current === null) return;

    const distance = event.clientX - pcDragStart.current;

    if (Math.abs(distance) > 25) {
      dragged.current = true;
      selectNext(distance < 0 ? 1 : -1);
    }

    pcDragStart.current = null;
  };

  const handleMobilePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    mobileDragStart.current = event.clientX;
    dragged.current = false;
  };

  const handleMobilePointerUp = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (mobileDragStart.current === null) return;

    const distance = event.clientX - mobileDragStart.current;

    if (Math.abs(distance) > 30) {
      dragged.current = true;
      selectNext(distance < 0 ? 1 : -1);
    }

    mobileDragStart.current = null;
  };

  return (
    <main className="home">
      <header className="home__nav">
        <div className="home__brand">✦ 檐主九大体质守护喵</div>

        <div className="home__nav-actions">
          <button
            className="home__button home__button--primary"
            type="button"
            onClick={onStart}
          >
            再测一遍 ✦
          </button>

          <button
  className="home__button home__button--secondary"
  type="button"
  onClick={() => setShowCrowdfundingNotice(true)}
>
  潮玩众筹
</button>
        </div>
      </header>

      <section className="home__gallery">
        <div className="home__gallery-heading">
          <h1>九大体质守护喵 · 全员集结</h1>
        </div>

        {/* PC 卡片组件 */}
        <div
          className="home__carousel home__carousel--pc"
          onWheel={handlePcWheel}
          onPointerDown={handlePcPointerDown}
          onPointerUp={handlePcPointerUp}
          onPointerCancel={() => {
            pcDragStart.current = null;
          }}
        >
          {cardOrder.map((id, index) => {
            const profile = resultData[id];
            const offset = getOffset(index, activeIndex);
            const selected = offset === 0;

            return (
              <button
                type="button"
                className={`home__card home__card--pc ${
                  selected ? "is-selected" : ""
                } ${id === "peaceful" ? "is-peaceful" : ""}`}
                key={id}
                onClick={() => selectCard(index)}
                aria-label={`选择${profile.typeName} ${profile.characterName}`}
                aria-pressed={selected}
                style={
                  {
                    "--card-offset": offset,
                    "--card-depth": Math.abs(offset),
                    "--card-bg": `url("${profile.background.pc}")`,
                  } as React.CSSProperties
                }
              >
                <div className="home__card-character">
                  <img
                    src={profile.characterImage}
                    alt={profile.characterName}
                    draggable={false}
                  />
                </div>

                <div className="home__card-name">
                  {profile.typeName} | {profile.characterName}
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile 扇形卡片组件 */}
        <div
          className="home__carousel home__carousel--mobile"
          onPointerDown={handleMobilePointerDown}
          onPointerUp={handleMobilePointerUp}
          onPointerCancel={() => {
            mobileDragStart.current = null;
          }}
        >
          {cardOrder.map((id, index) => {
            const profile = resultData[id];
            const offset = getOffset(index, activeIndex);
            const selected = offset === 0;

            return (
              <button
                type="button"
                className={`home__card home__card--mobile ${
                  selected ? "is-selected" : ""
                } ${id === "peaceful" ? "is-peaceful" : ""}`}
                key={id}
                onClick={() => selectCard(index)}
                aria-label={`选择${profile.typeName} ${profile.characterName}`}
                aria-pressed={selected}
                style={
                  {
                    "--card-offset": offset,
                    "--card-depth": Math.abs(offset),
                    "--card-bg": `url("${profile.background.mobile}")`,
                  } as React.CSSProperties
                }
              >
                <div className="home__card-character">
                  <img
                    src={profile.characterImage}
                    alt={profile.characterName}
                    draggable={false}
                  />
                </div>

                <div className="home__card-name">
                  {profile.typeName}·{profile.characterName}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <div className="home__divider" />

      <section className="home__bottom">
        <div className="home__media-panel">
          <h2>📺 B站动画番剧 · 《异境凉茶铺》</h2>
          <div className="home__media-placeholder">
  <iframe
    src="https://player.bilibili.com/player.html?bvid=BV1Uwhu6DEBX&page=1&danmaku=0&autoplay=0"
    title="异境凉茶铺官方先行预告PV"
    allow="fullscreen; picture-in-picture"
    allowFullScreen
    loading="lazy"
  />
</div>
        </div>

        <div className="home__support-panel">
          <h2>🐾 星心解忧 · 青少年情绪关怀与心理支持服务</h2>
          <div className="home__support-placeholder">
            <p>已累计向心理健康公益捐助资金 5 万元</p>
            <span>
              参与潮玩众筹，深圳市关爱行动公益基金会即捐赠 元
            </span>
          </div>
        </div>
      </section>

      <footer className="home__footer">
        ✦ 把脉虽严谨，结果仅娱乐 · 《异境凉茶铺》时愈堂 ✦
      </footer>
      {showCrowdfundingNotice && (
  <div
    className="home__notice"
    onClick={() => setShowCrowdfundingNotice(false)}
  >
    <div
      className="home__notice-panel"
      role="dialog"
      aria-modal="true"
      aria-label="潮玩众筹提示"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="home__notice-close"
        type="button"
        onClick={() => setShowCrowdfundingNotice(false)}
        aria-label="关闭"
      >
        ×
      </button>

      <p>尚未开启，敬请期待</p>
    </div>
  </div>
)}
    </main>
  );
}