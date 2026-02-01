// app/services/page.tsx
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/layout/Container";

type Service = {
  title: string;
  desc: string;
  duration?: string;
  img: string;
  alt?: string;
};

const SERVICES: Service[] = [
  {
    title: "개인상담",
    desc: "우울, 불안, 대인관계, 성격, 스트레스 증상을 호소하는 성인 대상",
    duration: "50분",
    img: "/home/service1.jpeg",
    alt: "개인상담 공간",
  },
  {
    title: "부부 & 커플상담",
    desc: "부부상담이라도 개인이 혼자 상담을 받으실 수 있습니다.",
    duration: "90분",
    img: "/home/service2.jpeg",
    alt: "부부 및 커플 상담 공간",
  },
  {
    title: "청소년 및 부모역할상담",
    desc: "청소년 자녀상담과 부모상담이 병행됩니다.",
    duration: "60분",
    img: "/home/service3.jpeg",
    alt: "청소년 상담/교육실",
  },
  {
    title: "미술치료",
    desc: "청소년, 성인 대상 개인·집단으로 SoM Art 프로그램을 제공합니다.",
    img: "/home/service4.jpeg",
    alt: "미술치료 작품/공간",
  },
  {
    title: "집단상담",
    desc: "다양한 대상들을 위해 맞춤형 구조 & 비구조화 집단상담을 제공합니다.",
    img: "/home/service5.jpeg",
    alt: "심리검사",
  },
  {
    title: "심리검사",
    desc: "성격검사, 정서검사, 투사검사, 학습유형 검사 등 대상자에게 맞는 심리검사 제공",
    img: "/home/service6.jpeg",
    alt: "집단상담/교육 진행 공간",
  },
];

function ServiceCard({ s }: { s: Service }) {
  return (
    <article className="flex flex-col sm:flex-row items-start gap-6">
      {/* 이미지: 40% */}
      <figure className="relative w-full sm:flex-[2] aspect-[4/4] shrink-0 overflow-hidden bg-neutral-100">
        <Image
          src={s.img}
          alt={s.alt ?? s.title}
          fill
          className="object-cover"
          // 2열 레이아웃에서 카드의 40% 폭을 대략적으로 반영
          sizes="(min-width:1024px) 20vw, (min-width:768px) 28vw, 100vw"
          priority={false}
        />
      </figure>

      {/* 텍스트: 60% */}
      <div className="min-w-0 sm:flex-[3] pt-2 sm:self-center">
        <h3 className="text-xl font-extrabold tracking-tight text-neutral-800">
          {s.title}
        </h3>
        <p className="mt-3 text-base md:text-base leading-relaxed text-neutral-600">
          {s.desc}
          {s.duration ? (
            <span className="ml-1 text-neutral-500">({s.duration})</span>
          ) : null}
        </p>
      </div>
    </article>
  );
}

export const metadata = { title: "상담 서비스 – SoM" };

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="상담 서비스"
        variant="split"
        description={
          <>개인·부부·청소년 상담 및 미술치료, 집단상담, 심리검사를 제공합니다.</>
        }
        subDescription={<>* 모든 상담서비스는 예약제로 운영됩니다.</>}
      />

      <main className="py-10">
        <Container>
          {/* 3×2: 2열 그리드(데스크톱) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {SERVICES.map((s, i) => (
              <ServiceCard key={i} s={s} />
            ))}
          </section>
        </Container>
      </main>
    </>
  );
}
