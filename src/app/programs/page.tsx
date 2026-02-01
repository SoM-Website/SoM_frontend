// src/app/programs/page.tsx
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default function ProgramStressPage() {
  return (
    <SidebarLayout
      header={
        <PageHeader 
          title="SoM 스트레스 관리" 
          variant="split"
          noContainer={true}
        />
      }
    >
      {/* 메인 이미지 */}
      <section className="mb-10">
        <figure className="relative w-full overflow-hidden bg-neutral-100 aspect-[2/1]">
          <Image
            src="/home/stress_program.jpg"
            alt="SoM 스트레스 관리 프로그램"
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
        </figure>
      </section>

      {/* 소개 문구 */}
      <section className="bg-[#000000]/3 py-10 px-8">
        <div className="leading-relaxed text-neutral-800 space-y-5">
          <p className="text-base md:text-lg">
            솜 스트레스 관리 프로그램은 통합적 접근의 솜상담연구소만의 맞춤형 프로그램으로
            내면탐색, 관계성 향상, 몸의 자각과 이완의 방법을 각 분야의 전문가와 함께 익혀
            몸과 마음의 건강함을 회복하는 프로그램입니다.
          </p>
          
          <p className="text-sm text-neutral-600">
            *마음과 몸의 통합 프로그램으로 구성되어 있으며, 3개월 과정으로 현재 상시모집 중입니다.
          </p>
        </div>
      </section>
    </SidebarLayout>
  );
}