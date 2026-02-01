// app/training/page.tsx
import PageHeader from "@/components/PageHeader";
import SidebarLayout from "@/components/layout/SidebarLayout";

type Supervisor = {
  name: string;
  role?: string;
  lines: string[];
};

const CURRICULUM: string[] = [
  "상담 경험",
  "내담자 경험",
  "개인상담 슈퍼비전",
  "심리검사 슈퍼비전",
  "집단상담 참가 및 보조리더",
  "집단상담 슈퍼비전",
  "증례세미나/발표",
  "기타 상담역량 강화 연수",
];

const SUPERVISORS: Supervisor[] = [
  {
    name: "황지선",
    role: "솜 상담연구소 소장",
    lines: [
      "한상담학회 이사 / 수련감독전문가",
      "한국상담학회 1급 전문상담사 (수련감독)",
      "감수성훈련 전문가, 집단상담전문가",
      "한국요가문화협회 이사 / 요가명상지도사",
    ],
  },
  {
    name: "김행수 박사",
    role: "강남대 겸임교수",
    lines: [
      "한상담학회 이사 / 1급 수련전문가",
      "한국상담학회 1급 전문상담사 (수련감독)",
      "SEP 트라우마 치료사",
      "NLP 마스터",
    ],
  },
  {
    name: "채승희 박사",
    role: "학교상담전문가",
    lines: [
      "전문상담 교사 슈퍼바이저",
      "한상담학회 수련감독전문가",
      "감수성훈련 전문가",
    ],
  },
];

export default function TrainingPage() {
  return (
    <SidebarLayout
      header={
        <PageHeader
          title="상담전문가 수련"
          variant="split"
          description={<>솜 상담연구소의 상담전문가 수련 과정 안내</>}
          subDescription={
            <>
              솜 상담연구소 상담전문가 수련과정은 (사)한국상담학회 전문상담사, (사)한상담학회 상담전문가 1,2급 자격증 취득을 위한 수련과정을 제공합니다.
            </>
          }
          noContainer={true}
        />
      }
    >
      {/* 수련과정 */}
      <section className="mb-10 bg-[#000000]/3 py-10 px-8 ">
        <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-6">수련과정</h2>
        <ul className="grid gap-3 list-disc pl-5 text-base md:text-lg leading-relaxed text-neutral-800">
          {CURRICULUM.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 수련 슈퍼바이저 */}
      <section className="bg-[#000000]/3 py-10 px-8 ">
        <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-6">수련 슈퍼바이저</h2>
        <div className="grid grid-cols-1 gap-8">
          {SUPERVISORS.map((s, i) => (
            <article key={i} className="space-y-2">
              <h3 className="text-lg font-extrabold tracking-tight text-neutral-900">
                {i + 1}. {s.name}
              </h3>
              {s.role && (
                <p className="text-sm text-neutral-600">{s.role}</p>
              )}
              <ul className="space-y-1.5 text-base md:text-lg leading-relaxed text-neutral-800 pl-1">
                {s.lines.map((t, j) => (
                  <li key={j}>• {t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </SidebarLayout>
  );
}