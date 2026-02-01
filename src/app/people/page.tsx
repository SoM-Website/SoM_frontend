// app/people/page.tsx
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import SidebarLayout from "@/components/layout/SidebarLayout";

type Person = {
  name: string;
  lines: string[];
  img?: string;
};

const faculty: Person[] = [
  {
    name: "황지선 소장",
    img: "/home/js_image.jpeg",
    lines: ["한국상담학회 1급 전문상담사", "한상담학회 수련감독전문가", "한국요가문화협회 이사"],
  },
  {
    name: "황윤선 부소장",
    img: "/home/ys_image.jpeg",
    lines: ["SoM Art 컨설턴트", "이화여자대학교 석사", "미술심리상담사 1급"],
  },
];

const members: Person[] = [
  { name: "채승희 전문위원", lines: ["교육학 박사(상담심리 전공)", "학교상담전문가", "전문상담 교사 슈퍼바이저", "한상담학회 수련감독전문가", "감수성훈련 전문가"] },
  { name: "김행수 연구원", lines: ["교육학 박사(교육상담 전공)", "강남대 겸임교수", "한상담학회 이사 / 1급 수련전문가", "한국상담학회 1급 전문상담사 (수련감독)", "SEP 트라우마 치료사", "NLP마스터"] },
  { name: "정호진 전문위원 (SoM 스트레스 관리프로그램)", lines: ["이스와라 아쉬람 원장", "심신통합이완연구소 소장", "동국대학교 인도철학 전공 박사(수료)", "IYE 공인 국제요가마스터", "(사)요가지도자연합회 요가지도자", "호원대학교, 한양대학교, 한신대학교, 동덕여자대학교, 성신여자대학교 외래교수"] },
];

function PersonCardWithImage({ p }: { p: Person }) {
  return (
    <article className="flex items-center gap-5 p-1">
      <div className="relative h-40 w-40 shrink-0 overflow-hidden bg-neutral-100">
        <Image
          src={p.img!}
          alt={p.name}
          fill
          sizes="144px"
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="min-w-0">
        <h4 className="text-xl font-bold text-neutral-900">{p.name}</h4>
        <ul className="mt-1 space-y-0.5 text-sm leading-relaxed text-neutral-600">
          {p.lines.map((t, i) => (
            <li key={i} className="truncate">{t}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function PersonTextItem({ p }: { p: Person }) {
  return (
    <article className="p-1">
      <h4 className="text-xl font-bold text-neutral-900">{p.name}</h4>
      <ul className="mt-1 space-y-0.5 text-sm leading-relaxed text-neutral-600">
        {p.lines.map((t, i) => (
          <li key={i} className="truncate">{t}</li>
        ))}
      </ul>
    </article>
  );
}

export default function PeoplePage() {
  return (
    <SidebarLayout
      header={
        <PageHeader
          title="함께하는 사람들"
          variant="split"
          noContainer={true}
        />
      }
    >
      <section className="mb-10">
        <div className="grid gap-8 md:grid-cols-2">
          {faculty.map((p) => (
            <PersonCardWithImage key={p.name} p={p} />
          ))}
        </div>
      </section>

      <section className="bg-[#000000]/3 py-10 px-8">
        <h4 className="text-2xl font-bold text-[#735751] leading-snug mb-8">
          솜 상담연구소는 상담 및 심신치유 전문가들과 함께합니다.
        </h4>
        <div className="grid gap-8 md:grid-cols-2">
          {members.map((p) => (
            <PersonTextItem key={p.name} p={p} />
          ))}
        </div>
      </section>
    </SidebarLayout>
  );
}