// app/facilities/page.tsx
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/layout/Container";

const IMAGES = [
  { src: "/home/place1.jpeg", alt: "상담실 1" },
  { src: "/home/place2.jpeg", alt: "상담실 2" },
  { src: "/home/place3.jpeg", alt: "상담실 3" },
  { src: "/home/place4.jpeg", alt: "상담실 4" },
  { src: "/home/place5.jpeg", alt: "상담실 5" },
  { src: "/home/place6.jpeg", alt: "상담실 6" },
];

export default function FacilitiesPage() {
  return (
    <>
      {/* 상단 제목: PageHeader 내부에서도 Container를 사용하므로 본문과 폭/여백이 자동 일치 */}
      <PageHeader
        title="내부시설"
        description={<>솜상담연구소의 상담실과 교육실입니다.</>}
        subDescription={
          <>
            솜(SoM)상담연구소는 상담대기실, 개인상담실, 부부 가족상담실, 심리검사실,
            미술치료실, 집단상담 및 교육실을 갖추고 있습니다.
          </>
        }
        variant="split"
      />

      {/* 본문: 전역 컨테이너로 통일 */}
      <main className="py-10">
        <Container>
          {/* 6장 이미지 그리드 (3행×2열) */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {IMAGES.map((img, i) => (
                <figure
                  key={i}
                  className="relative aspect-[5/4] w-full overflow-hidden bg-neutral-100"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    // 2열 기준: ≥640px에서는 너비 약 50vw, 그 미만은 100vw
                    sizes="(min-width:640px) 50vw, 100vw"
                    priority={i === 0}
                  />
                </figure>
              ))}
            </div>
          </section>
        </Container>
      </main>
    </>
  );
}
