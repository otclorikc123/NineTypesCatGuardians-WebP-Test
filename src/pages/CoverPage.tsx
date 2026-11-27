
import "./CoverPage.css";

const A = `${import.meta.env.BASE_URL}assets`;

type CoverPageProps = {
  onStart: () => void;
};

export default function CoverPage({ onStart }: CoverPageProps) {
  return (
    <div className="cover">
      {/* PC 扉页 */}
      <section className="cover__pc">
        <img
          className="cover__background"
          src={`${A}/bg/asset_bg_home_pc.webp`}
          alt=""
        />

        <img
          className="cover__logo"
          src={`${A}/illustrations/asset_logo.webp`}
          alt="九型体质·檐主守护星"
        />

        <div className="cover__popover">
          <img
            className="cover__popover-image"
            src={`${A}/illustrations/asset_popover_coverpage_pc.png`}
            alt=""
          />

          <div className="cover__popover-copy">
            <p className="cover__popover-title">
              ✦ 点击镜子　开始测试 ✦
            </p>
            <p className="cover__popover-line">
              本次把脉共32道工序，由《异境凉茶铺》时愈堂友情出诊
            </p>
            <p className="cover__popover-line">
              把脉虽严谨，结果仅娱乐
            </p>
          </div>
        </div>

        <button
          className="cover__start-area"
          type="button"
          aria-label="点击镜子，开始测试"
          onClick={onStart}
        />
      </section>

      {/* Mobile 扉页 */}
      <section className="cover__mobile">
        <img
          className="cover__background"
          src={`${A}/bg/asset_bg_home_mobile.webp`}
          alt=""
        />

        <img
          className="cover__logo"
          src={`${A}/illustrations/asset_logo.webp`}
          alt="九型体质·檐主守护星"
        />

        <div className="cover__mobile-copy">
          <p className="cover__mobile-title">
            ✦ 点击镜子　开始测试 ✦
          </p>
          <p>
            本次把脉共32道工序，由《异境凉茶铺》时愈堂友情出诊
          </p>
          <p>把脉虽严谨，结果仅娱乐</p>
        </div>

        {/* 全屏点击区域，ENTER 图片保留原始素材 */}
        <button
          className="cover__start-area cover__start-area--mobile"
          type="button"
          aria-label="开始测试"
          onClick={onStart}
        >
          <img
            className="cover__enter-image"
            src={`${A}/icons/ENTER.svg`}
            alt=""
          />
        </button>
      </section>
    </div>
  );
}
