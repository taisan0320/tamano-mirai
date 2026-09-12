/* Instagram への導線。
   サイトは白黒＋青が基本だが、Instagram だけはひと目でそれとわかるよう
   公式アプリのグラデーション（globals.css の bg-instagram）を使う。 */

export const INSTAGRAM_URL = "https://www.instagram.com/tamano.miraizukuri/";
export const INSTAGRAM_HANDLE = "@tamano.miraizukuri";

/** カメラの形のマーク。色は周りの文字色を引き継ぐ */
export function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** グラデーションの角丸四角にマークを白抜きしたもの（アプリのアイコン風） */
export function InstagramBadge({ size = 20 }: { size?: number }) {
  return (
    <span
      className="bg-instagram inline-grid shrink-0 place-items-center rounded-[6px] text-white"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <InstagramIcon size={Math.round(size * 0.66)} />
    </span>
  );
}

/** Instagram を開くボタン。グラデーション地に白い文字 */
export function InstagramButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`bg-instagram inline-flex items-center justify-center gap-2 rounded py-2.5 font-bold leading-none text-white hover:opacity-90 ${className}`}
    >
      <InstagramIcon />
      {children}
    </a>
  );
}
