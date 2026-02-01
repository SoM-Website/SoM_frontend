// src/app/about/representative/page.tsx
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default function LeaderPage() {
  return (
    <SidebarLayout
      header={
        <PageHeader 
          title="대표 소개" 
          variant="split"
          noContainer={true}
        />
      }
    >
      {/* 상단: 이미지(좌) + 소개 텍스트(우) */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row items-stretch gap-8">
          {/* 정사각 이미지 */}
          <figure className="relative aspect-square w-[180px] md:w-[220px] lg:w-[260px] overflow-hidden bg-neutral-100 shrink-0">
            <Image
              src="/home/js_image.jpeg"
              alt="대표 황지선"
              fill
              className="object-cover"
              sizes="(min-width:1024px) 260px, (min-width:768px) 220px, 180px"
              priority
            />
          </figure>

          {/* 텍스트 박스 */}
          <div className="flex-1 p-5 md:p-6 min-h-[180px] md:min-h-[220px] lg:min-h-[260px] flex">
            <div className="my-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-3">
                대표 황지선
              </h2>
              <p className="whitespace-pre-line text-neutral-800">
{`솜(SoM)상담연구소 소장
Lifeline Singapore 상담교수
청소년상담사 자격연수 강사
전 고려대학교 교육대학원 상담심리교육과 외래교수
전 고려대학교 평생교육원 심리학과 외래교수
전 호원대학교, 성신여대, 덕성여대평교원 외래교수`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 하단: 배경색 섹션 */}
      <section className="bg-[#000000]/3 py-10 px-8 ">
        <div className="leading-relaxed text-neutral-800">
          <p className="whitespace-pre-line">
{`*자격사항
한국상담학회 1급 전문상담사/ 수련감독
한상담학회 수련감독 전문가
한국심리학회 심리지원정책 위원회 위원
기업&조직 심리지원 컨설턴트
한국유형학회 MBTI 일반강사
감수성훈련 전문가
요가교육지도사
(사)한상담학회 이사
(사)한국요가문화협회 이사

고려대학교 교육학 석사(상담심리전공)와 University of Bradford에서 MBA 과정을 마치고 홍익대학교 교육학 박사과정을 수료(상담심리전공)하였습니다.
지난 20여년간 코이카, LG인화원, 한빛 소프트, 현대, 한국장학재단, 한국보훈연구원, 경찰교육원, 경기도 교육청, 서울 및 화성시청, 경기도 전문상담 교사연수, 만풀아카데미, 싱가폴생명의전화, 예상(목회자상담대학) 등 다수의 기업의 사내훈련과 기관 강의 및 고려대학교 교육대학원, 고려대학교 평생교육원 심리학과(과목:집단상담의 이론과 실제), 덕성여대 평생교육원, 호원대학교, 성신여대, 홍익대, 포천중문의대 등의 대학 출강 및 다수의 중, 고등 학교에서 학생, 학부모, 교사대상 상담교육 특강 및 감수성훈련, 감정코칭 훈련을 해왔고, 한국상담학회 전문상담사 양성 및 한국형 감수성 훈련인 한알프로그램(2005) 개발진으로 한상담지도자를 양성하고 있습니다.
저서로는 감수성훈련의 실제(한알출판사)와 한상담매뉴얼(한알사람)이 있습니다.`}
          </p>
        </div>
      </section>
    </SidebarLayout>
  );
}