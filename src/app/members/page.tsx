import type { Metadata } from "next";
import Link from "next/link";
import SpeakerPhoto from "@/components/SpeakerPhoto";
import { StaticPageLayout, PageSection } from "@/components/ArchiveLayout";
import { MEMBERS, SPEAKERS } from "@/lib/organization";

export const metadata: Metadata = {
  title: "役員名簿・講演のご依頼",
  description:
    "玉野SDGsみらいづくりセンターの役員名簿と、講演・ワークショップのファシリテーターのご依頼についてご案内します。",
};

export default function MembersPage() {
  return (
    <StaticPageLayout
      label="MEMBERS"
      title="役員名簿・講演のご依頼"
      description={`役員${MEMBERS.length}名の名簿と、講演・ファシリテーターのご依頼についてご案内します。`}
      breadcrumb={[{ label: "センターについて", href: "/about" }]}
    >
      <PageSection label="Board" title="役員名簿">
        <div className="rounded border border-border-line">
          {MEMBERS.map((member) => (
            <div
              key={member.name}
              className="flex items-baseline gap-3 border-b border-border-line px-3.5 py-2.5 last:border-b-0"
            >
              <span className="w-[70px] shrink-0 text-[12px] text-ink-soft">
                {member.role}
              </span>
              <span className="text-[14px] font-bold text-ink">{member.name}</span>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        label="Speaker / Facilitator"
        title="講演・ファシリテーターのご依頼"
        id="speakers"
      >
        <p className="mb-4 text-[13px] leading-[1.8] text-ink-soft">
          理事長・副理事長が講演やワークショップのファシリテーターを承ります。
          テーマや費用などはお気軽にお問い合わせください。
        </p>

        <div className="flex flex-col gap-3">
          {SPEAKERS.map((person) => (
            <div
              key={person.name}
              className="flex flex-col gap-4 rounded border border-border-line p-4 sm:flex-row"
            >
              <SpeakerPhoto
                src={person.photo}
                alt={person.name}
                initial={person.initial}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] leading-tight text-ink-soft">
                  {person.role}
                </p>
                <h3 className="mb-3 mt-1 text-[16px] font-bold leading-tight text-ink">
                  {person.name}
                </h3>
                <dl className="text-[13px] leading-[1.7]">
                  <div className="flex gap-3 border-t border-border-line py-2">
                    <dt className="w-[96px] shrink-0 text-[12px] text-ink-soft">
                      担当・専門領域
                    </dt>
                    <dd className="min-w-0 flex-1 text-ink">{person.credential}</dd>
                  </div>
                  <div className="flex gap-3 border-t border-border-line py-2">
                    <dt className="w-[96px] shrink-0 text-[12px] text-ink-soft">
                      講演内容
                    </dt>
                    <dd className="min-w-0 flex-1 text-ink">
                      {person.topics.map((topic) => (
                        <span key={topic} className="block">
                          {topic}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div className="flex gap-3 border-t border-border-line py-2">
                    <dt className="w-[96px] shrink-0 text-[12px] text-ink-soft">
                      費用など
                    </dt>
                    <dd className="min-w-0 flex-1 text-ink">お問い合わせください</dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/contact"
          className="mt-4 block rounded bg-ocean py-3 text-center text-[14px] font-bold leading-none text-white hover:bg-ocean-dark"
        >
          講演・ファシリテーターについて問い合わせる
        </Link>
      </PageSection>
    </StaticPageLayout>
  );
}
