export function Mark({ size = 30, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden="true" className={className}>
      <circle cx="30" cy="30" r="29" fill="#fefcf8" stroke="#1a1a1a" strokeWidth="1.2" />
      <circle cx="38" cy="22" r="6" fill="#e0a23a" />
      <path d="M6,46 C16,38 24,40 32,36 C40,32 50,38 56,34 L56,52 L6,52 Z" fill="#2e7d52" />
      <path d="M6,50 C18,46 26,48 36,44 C44,42 50,48 56,46 L56,52 L6,52 Z" fill="#1a4f33" />
    </svg>
  );
}
