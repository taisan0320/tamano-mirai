import { lessons, type Lesson } from "@/lib/lessons";

function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <div className="bg-paper border border-border-line overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] bg-forest-pale overflow-hidden">
        {lesson.photo ? (
          <img
            src={lesson.photo}
            alt={lesson.theme}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="opacity-25">
              <rect x="4" y="8" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="2" className="text-ocean" />
              <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="2" className="text-ocean" />
            </svg>
            <span className="text-[11px] text-ink-muted tracking-widest section-label">写真準備中</span>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] text-ocean font-bold tracking-widest">
            {lesson.school === "Coming Soon" ? "Coming Soon" : lesson.school}
          </span>
          {lesson.grade && (
            <span className="text-[11px] text-ink-muted">{lesson.grade}</span>
          )}
        </div>
        <p className="font-serif-h font-bold text-ink leading-snug">{lesson.theme}</p>
        <p className="text-[13px] text-ink-soft leading-relaxed flex-1">{lesson.description}</p>
      </div>
    </div>
  );
}

export default function LessonsSection() {
  return (
    <section className="bg-paper border-t border-border-line">
      <div className="max-w-[1400px] mx-auto px-6 py-24 lg:py-36">

        <div className="mb-16">
          <p className="section-label text-ink-muted mb-5">School Coordination · 学校コーディネート</p>
          <h2 className="font-serif-h text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] text-ink mb-8">
            地域と学校を、<br /><span className="text-ocean">つなぐ授業</span>。
          </h2>
          <p className="text-[15px] leading-[2] text-ink-soft max-w-2xl">
            地域のリソースと学校教育をつなぐコーディネーターとして、
            総合的な学習の時間などを通じた授業づくりを支援しています。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>

      </div>
    </section>
  );
}
