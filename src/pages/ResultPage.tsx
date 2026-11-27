import { useLayoutEffect, useRef, useState } from "react";
import { resultData, type ResultId } from "../data/result";
import "./ResultPage.css";
import { toBlob } from "html-to-image";

type ResultPageProps = {
  resultName: string;
  secondaryName: string;
  onAgain: () => void;
  onHome: () => void;
};

const typeMap: Record<string, ResultId> = {
  平和质: "peaceful",
  气虚质: "qi_deficiency",
  阳虚质: "yang_deficiency",
  阴虚质: "yin_deficiency",
  痰湿质: "phlegm_dampness",
  湿热质: "damp_heat",
  血瘀质: "blood_stasis",
  气郁质: "qi_stagnation",
  特禀质: "special_diathesis",
};

const defaultDiagnosticNote =
  "时愈堂诊断手册：题目每4题一组，分别为气虚、阳虚、阴虚、痰湿、湿热、血瘀、气郁、特禀。若全组＜8分，则诊断为天选平和质。若最高分组≥8分，且第二高分组也≥8分、两组分差≤1，则判定为双体质；否则判定为单一主导体质。";

export default function ResultPage({
  resultName,
  secondaryName,
  onAgain,
  onHome,
}: ResultPageProps) {
  const [showSecondary, setShowSecondary] = useState(false);
  const [hasViewedSecondary, setHasViewedSecondary] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const primaryId = typeMap[resultName] || "peaceful";
  const secondaryId = secondaryName
    ? typeMap[secondaryName]
    : undefined;

  const primaryProfile = resultData[primaryId];
  const secondaryProfile = secondaryId
    ? resultData[secondaryId]
    : undefined;

  const profile =
    showSecondary && secondaryProfile
      ? secondaryProfile
      : primaryProfile;
useLayoutEffect(() => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}, [profile.id]);

  const diagnosticNote =
    profile.pc?.diagnosticNote ||
    profile.mobile?.diagnosticNote ||
    defaultDiagnosticNote;

  const badgeParts = profile.badgeText.trim().split(/\s+/);
  const badgeCaption = badgeParts[0];
  const badgeName = badgeParts.slice(1).join(" ");

const posterRef = useRef<HTMLImageElement>(null);
const [downloadNotice, setDownloadNotice] = useState(false);
const [isDownloading, setIsDownloading] = useState(false);


  function viewSecondary() {
    setHasViewedSecondary(true);
    setShowSecondary(true);
  }

  function toggleSecondary() {
    setShowSecondary((current) => !current);
  }

  // 下载海报：必须放在 ResultPage 组件作用域内
  async function downloadPoster() {
    const image = posterRef.current;

    if (!image || isDownloading) return;

    setIsDownloading(true);

    try {
      // 等待海报图片加载完成
      if (!image.complete) {
        await new Promise<void>((resolve, reject) => {
          image.addEventListener("load", () => resolve(), {
            once: true,
          });

          image.addEventListener(
            "error",
            () => reject(new Error("海报加载失败")),
            { once: true }
          );
        });
      }

      if (!image.naturalWidth || !image.naturalHeight) {
        throw new Error("海报图片无效");
      }

      // 使用 html-to-image 生成 PNG
      const blob = await toBlob(image, {
        cacheBust: true,
        pixelRatio: 2,
      });

      if (!blob || blob.size === 0) {
        throw new Error("PNG 图片生成失败");
      }

      // 检查 PNG 文件签名，避免下载到 HTML
      const signature = new Uint8Array(
        await blob.slice(0, 8).arrayBuffer()
      );

      const validPng =
        signature[0] === 0x89 &&
        signature[1] === 0x50 &&
        signature[2] === 0x4e &&
        signature[3] === 0x47;

      if (!validPng) {
        throw new Error("生成的文件不是有效 PNG");
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${profile.characterName}.png`;

      document.body.appendChild(link);
link.click();
link.remove();

setDownloadNotice(true);

window.setTimeout(() => {
  setDownloadNotice(false);
}, 3500);

      window.setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 60000);
    } catch (error) {
      console.error("海报下载失败：", error);
      window.alert("海报生成失败，请重新打开分享弹窗后再试。");
    } finally {
      setIsDownloading(false);
    }
  }

  // 伴生体质切换按钮
  function renderSecondaryControl(className: string) {
    if (!secondaryProfile) return null;

    return (
      <div className={className}>
        {!hasViewedSecondary ? (
          <button type="button" onClick={viewSecondary}>
            恭喜拥有伴生体质，点击查看
          </button>
        ) : (
          <button type="button" onClick={toggleSecondary}>
            {showSecondary ? "返回主体质" : "返回伴生体质"}
          </button>
        )}
      </div>
    );
  }

  return (
    <main className="result">
      {/* ================= PC ================= */}
      <section
        className="result__desktop"
        style={{
          backgroundImage: `url("${profile.background.pc}")`,
        }}
      >
        <div className={`result__desktop-frame result__desktop-frame--${profile.id}`}>
          {renderSecondaryControl(
            "result__secondary-control result__secondary-control--pc"
          )}

          <header className="result__header">
            ✦ 时愈堂 · 专属把脉报告 ✦
          </header>

          <div className="result__desktop-content">
            <div className="result__portrait">
              <div className="result__portrait-title">
                守护星
              </div>

              <img
                className="result__character"
                src={profile.characterImage}
                alt={profile.characterName}
              />

              <strong className="result__guardian-name">
                {profile.characterName}
              </strong>
            </div>

            <div className="result__details">
              <div className="result__type">
                <span>你的体质是</span>
                <h1>{profile.typeName}</h1>
              </div>

              <section className="result__traits">
                <h2>★ 核心特质</h2>

                <div className="result__traits-scroll">
                  {profile.coreTraits.map((trait, index) => (
                    <p key={index}>{trait}</p>
                  ))}
                </div>
              </section>

              <div className="result__support">
                <section className="result__tags">
                  <div className="result__tag-list">
                    {profile.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </section>

                <section className="result__whisper">
                  <h2>{profile.whisperTitle}</h2>
                  <p>{profile.whisperText}</p>
                </section>
              </div>
            </div>
          </div>

          {/* PC 徽章：文字覆盖在徽章图片上 */}
          <div className="result__badge">
            <img src={profile.badgeImage} alt="" />

            <div className="result__badge-text">
  <span>{badgeCaption}</span>
  <strong>
    {profile.id === "peaceful" ? (
      <>
        <span className="result__peaceful-badge-caption">
          隐藏款
        </span>
        <span className="result__peaceful-badge-name">
          天选星人
        </span>
      </>
    ) : (
      badgeName
    )}
  </strong>
</div>
          </div>

          <nav className="result__desktop-actions">
            <button
              className="result-button result-button--again"
              type="button"
              onClick={onAgain}
            >
              ✦ 感觉不对，再测一次 ✦
            </button>

            <button
              className="result-button result-button--share"
              type="button"
              onClick={() => setShowShare(true)}
            >
              ✦ 分享结果，看专属动画 ✦
            </button>

            <button
              className="result-button result-button--home"
              type="button"
              onClick={onHome}
            >
              ✦ 还不够，看喵喵全家福 ✦
            </button>
          </nav>

          <p className="result__diagnostic">
            {diagnosticNote}
          </p>
        </div>
      </section>

      {/* ================= Mobile ================= */}
      <section
        className="result__mobile"
        style={{
          backgroundImage: `url("${profile.background.mobile}")`,
        }}
      >
        <header className="result__mobile-header">
          ✦ 时愈堂 · 专属把脉报告 ✦
        </header>

        {renderSecondaryControl(
          "result__mobile-secondary-control"
        )}

        <section className="result__mobile-profile">
          <div className="result__mobile-type">
            <span>你的体质是</span>
            <strong>{profile.typeName}</strong>
          </div>

          <div
            className={`result__mobile-badge-score ${
  profile.id === "peaceful"
    ? "result__mobile-badge-score--peaceful"
    : "result__mobile-badge-score--other"
} ${
  ["special_diathesis", "blood_stasis", "damp_heat", "phlegm_dampness"].includes(profile.id)
    ? "result__mobile-badge-score--title-accent"
    : ""
}`}
          >
            <span>{badgeCaption}</span>
<strong>
  {profile.id === "peaceful" ? (
    <>
      <span className="result__peaceful-badge-caption">
        隐藏款
      </span>
      <span className="result__peaceful-badge-name">
        天选星人
      </span>
    </>
  ) : (
    badgeName
  )}
</strong>
          </div>

          <div className="result__mobile-guardian">
            <span>守护星为</span>
            <strong>{profile.characterName}</strong>
          </div>

          <div className="result__mobile-hero">
            <img
              className="result__mobile-badge-image"
              src={profile.badgeImage}
              alt=""
            />

            <img
              className="result__mobile-character"
              src={profile.characterImage}
              alt={profile.characterName}
            />
          </div>
        </section>

        <section className="result__mobile-traits">
          <h2>★ 核心特质</h2>

          <div className="result__mobile-traits-content">
            {profile.coreTraits.map((trait, index) => (
              <p key={index}>{trait}</p>
            ))}
          </div>
        </section>

        <section className="result__mobile-tags">
          {profile.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </section>

        <section className="result__mobile-whisper">
          <h2>{profile.whisperTitle}</h2>
          <p>{profile.whisperText}</p>
        </section>

        {/* 内容阅读结束后，再提供一次伴生体质切换入口 */}
        {renderSecondaryControl(
          "result__mobile-secondary-control result__mobile-secondary-control--bottom"
        )}

        <nav className="result__mobile-actions">
          <button
            className="result-button result-button--share"
            type="button"
            onClick={() => setShowShare(true)}
          >
            ✦ 分享测试结果，看专属动画 ✦
          </button>

          <div className="result__mobile-actions-row">
            <button
              className="result-button result-button--again"
              type="button"
              onClick={onAgain}
            >
              ✦ 再测一次 ✦
            </button>

            <button
              className="result-button result-button--home"
              type="button"
              onClick={onHome}
            >
              ✦ 喵喵全家福 ✦
            </button>
          </div>
        </nav>

        <p className="result__mobile-diagnostic">
          {diagnosticNote}
        </p>

        <footer className="result__footer">
          《异境凉茶铺》 | 九大体质檐主守护星潮玩系列 | 深圳千雪影业有限公司
        </footer>
      </section>

      {/* ================= 分享弹窗 ================= */}
      {showShare && (
        <div
          className="result-share"
          onClick={() => setShowShare(false)}
        >
          <div
            className="result-share__panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="result-share__close"
              type="button"
              onClick={() => setShowShare(false)}
              aria-label="关闭"
            >
              ×
            </button>

            <h2>✦ 专属把脉结果海报已生成 ✦</h2>

            <img
  ref={posterRef}
  className="result-share__poster"
  src={profile.share.posterImage}
  alt={profile.share.posterTitle}
/>

            <button
  className="result-share__download"
  type="button"
  onClick={downloadPoster}
  disabled={isDownloading}
>
  下载高清海报
</button>

{downloadNotice && (
  <p
    className="result-share__success"
    role="status"
    aria-live="polite"
  >
    ✦ 海报已开始下载，请在下载列表中查看 ✦
  </p>
)}
            <p className="result-share__footer">
              异境凉茶铺｜九大体质檐主守护星｜深圳千雪影业有限公司
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
