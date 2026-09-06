/* 入会・寄付の条件。/join と /about の両方から参照する。 */

export const MEMBERSHIP_TYPES = [
  { type: "個人正会員", fee: "3,000円／年", note: "議決権あり" },
  { type: "団体正会員", fee: "5,000円／年", note: "議決権あり" },
  { type: "個人賛助会員", fee: "2,000円／年（1口）", note: "" },
  { type: "団体賛助会員", fee: "3,000円／年（1口）", note: "" },
  { type: "団体連携会員", fee: "無料", note: "" },
  { type: "ユース会員", fee: "無料", note: "学生・若者向け" },
];

export const BANK_ACCOUNT = [
  { term: "銀行", value: "中国銀行 宇野支店（店番156）" },
  { term: "口座番号", value: "2554341（普通）" },
  {
    term: "名義",
    value: "特定非営利活動法人 玉野SDGsみらいづくりセンター 理事長 東りえ",
  },
];
