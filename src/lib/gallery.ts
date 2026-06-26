export interface GalleryPhoto {
  src: string;
  alt: string;
}

/**
 * 活動写真ギャラリー
 *
 * 写真を追加するには:
 *   1. /public/images/gallery/ にファイルを置く
 *   2. 下の配列にエントリを追加する
 *
 * alt に写真の説明を入れると SEO・アクセシビリティが向上します。
 */
export const galleryPhotos: GalleryPhoto[] = [
  { src: "/images/gallery/commemoration.jpg",  alt: "SDGs連続シンポジウム 登壇者・学生が壇上でガッツポーズ" },
  { src: "/images/gallery/group-photo.jpg",    alt: "センタースタッフ・関係者の集合写真" },
  { src: "/images/gallery/work-01.jpg",        alt: "みらいカフェでのワークショップの様子" },
  { src: "/images/gallery/DSC06919.JPG",       alt: "参加者が発表する場面" },
  { src: "/images/gallery/DSC05716.JPG",       alt: "学生と地域の大人が対話する様子" },
  { src: "/images/gallery/DSC06406.JPG",       alt: "地域団体の研修・勉強会" },
  { src: "/images/gallery/DSC06935.JPG",       alt: "学生がワークシートに取り組む様子" },
  { src: "/images/gallery/DSC07051.JPG",       alt: "円卓を囲んでの対話" },
  { src: "/images/gallery/DSC06517.JPG",       alt: "参加者がマイクを持って発言する場面" },
  { src: "/images/gallery/DSC05950.JPG",       alt: "小グループでの打ち合わせ" },
  { src: "/images/gallery/DSC05297.JPG",       alt: "会議室での会合の様子" },
  { src: "/images/gallery/molluk-01.jpg",      alt: "モルック大会の様子" },
  { src: "/images/gallery/tennoike-01.jpg",    alt: "天王池竹林の会による竹林整備の様子" },
];
