// src/app/program/page.tsx
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/layout/Container";

export default function ProgramStressPage() {
  return (
    <>
      <PageHeader title="SoM 스트레스 관리" variant="split" />

      <main className="py-10">
        <Container>
          <section>
            <div className="flex flex-col md:flex-row items-stretch md:items-start gap-8">
              {/* 1:1 이미지 (좌) - 사이즈 소폭 축소, 잘릴 때 오른쪽 상단 기준 */}
              <figure className="relative aspect-square w-full md:w-[360px] lg:w-[420px] overflow-hidden rounded-2xl bg-neutral-100 shrink-0">
                <Image
                  src="/home/stress_program.jpeg"
                  alt="SoM 스트레스 관리 프로그램"
                  fill
                  className="object-cover object-[right_top]"
                  sizes="(min-width:1024px) 420px, (min-width:768px) 360px, 100vw"
                  priority
                />
              </figure>

              {/* 텍스트 (우) */}
              <div className="flex-1 leading-relaxed text-neutral-800">
                <p>
                  솜 스트레스 관리 프로그램은 통합적 접근의 솜상담연구소만의 맞춤형 프로그램으로
                  내면탐색, 관계성 향상, 몸의 자각과 이완의 방법을 각 분야의 전문가와 함께 익혀
                  몸과 마음의 건강함을 회복하는 프로그램입니다.
                </p>
                <p className="mt-4 text-sm text-neutral-600">
                  *마음과 몸의 통합 프로그램으로 구성되어 있으며, 3개월 과정으로 현재 상시모집 중입니다.
                </p>
              </div>
            </div>
          </section>
        </Container>
      </main>
    </>
  );
}
