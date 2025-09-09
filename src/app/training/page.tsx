// app/training/page.tsx
import PageHeader from "@/components/PageHeader";
import Container from "@/components/layout/Container";

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
    <>
      <PageHeader
        title="상담전문가 수련"
        variant="split"
        description={<>솜 상담연구소의 상담전문가 수련 과정 안내</>}
        subDescription={
          <>
            솜 상담연구소 상담전문가 수련과정은 (사)한국상담학회 전문상담사, (사)한상담학회 상담전문가 1,2급 자격증 취득을 위한 수련과정을 제공합니다.
          </>
        }
      />

      <main className="py-10">
        {/* ✅ 전폭(100%) 연한 회색 배경 + 내부만 Container로 폭 제한 */}
        <section className="bg-neutral-50 py-10">
          <Container>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900">수련과정</h2>
            <ul className="mt-4 grid gap-2 list-disc pl-5 text-[15px] md:text-base leading-relaxed text-neutral-700">
              {CURRICULUM.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Container>
        </section>

        {/* 이하 일반 컨테이너 섹션 */}
        <Container>
          <hr className="my-12 border-neutral-200" />

          {/* 수련 슈퍼바이저 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900">수련 슈퍼바이저</h2>
            <div className="mt-6 mb-6 grid grid-cols-1 md:grid-cols-1 gap-10">
              {SUPERVISORS.map((s, i) => (
                <article key={i}>
                  <h3 className="text-lg font-extrabold tracking-tight text-neutral-800">
                    {i + 1}. {s.name}
                  </h3>
                  {s.role ? (
                    <p className="mt-1 text-sm text-neutral-500">{s.role}</p>
                  ) : null}
                  <ul className="mt-3 space-y-1.5 text-[15px] md:text-base leading-relaxed text-neutral-700">
                    {s.lines.map((t, j) => (
                      <li key={j}>• {t}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </Container>
      </main>
    </>
  );
}
