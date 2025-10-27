// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <section className="relative h-[46vh] min-h-[340px] w-full overflow-hidden border-b">
        {/* background Image (장식용이므로 alt="") */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/home/main_image.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-4 text-white">
              {/* 원형 로고 */}
              <div className="relative flex h-18 w-18 sm:h-22 sm:w-22 items-center justify-center rounded-full overflow-hidden bg-white">
                <Image
                  src="/home/logo.png"
                  alt="SoM 로고"
                  fill
                  className="object-contain p-1"
                  sizes="(min-width: 640px) 5.5rem, 4.5rem"
                  draggable={false}
                />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">솜(SoM)상담연구소</h1>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base opacity-95">
                  대면/비대면 심리상담 및 교육 플랫폼 제공
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 소개 문단 */}
      <section className="container mx-auto max-w-4xl px-4 py-10 sm:py-12">
        <h2 className="text-center font-bold text-base text-muted-foreground">솜상담연구소</h2>
        <p className="mt-4 text-center font-bold leading-7 text-base sm:text-base text-gray-700 whitespace-pre-line">
          {`솜상담연구소는 대면/ 비대면 심리상담 및 교육서비스를 제공합니다. 현재, 코로나 블루, 우울, 불안, 성격, 대인관계 갈등 등으로 어려움을 겪고 있는 성인을 위한 개인상담 및 부부 & 커플상담, 부모역할 상담을 제공하며, 다양한 심리검사 해석 상담 및 교육과,
          맞춤형 스트레스 관리 집단 상담, 감수성훈련, 갈등관계해결 집단,  EAP 상담 등 개인과 조직의 심리지원 서비스를 제공하고 있습니다.
        (모든 상담서비스는 예약제로 운영됩니다.)\n`}
        </p>
      </section>

      {/* 연구소 소개 섹션 (제목 + 더보기) */}
      <section className="w-full md:w-[60%] mx-auto px-4 pb-16">
        {/* 상단 헤더 라인 */}
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-[#735751]">연구소 소개</h3>
          <Link
            href="/about"
            className="group inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900"
            aria-label="연구소 소개 더보기"
          >
            더보기 <span aria-hidden className="transition-transform group-hover:translate-x-0.5">›</span>
          </Link>
        </div>
        <div className="mt-3 border-b border-[#735751]/40" />

        {/* 본문 */}
        <div className="grid gap-6 md:grid-cols-12 pt-6">
          <div className="md:col-start-1 md:col-span-12">
            <div className="text-2xl font-bold text-neutral-800">Shapes of Mind</div>
          </div>
          <div className="md:col-start-1 md:col-span-20">
            <div className="prose prose-sm sm:prose-base max-w-none">
              <p className="whitespace-pre-line">
                {`SoM은 'Shapes of Mind' 의 약자로, 해석하면 '마음의 형태'를 말합니다.
                  우리는 어떤 상황을 대처할때 '마음 먹기 나름'이라는 말을 많이 씁니다.
                  이처럼 우리의 마음의 형태를 어떻게 형성하고 상황을 대처하냐에 따가 그 결과가 달라질 것입니다. …\n
                  솜상담연구소의 상담방법은 한마디로 말하자면 성장 상담입니다.
                솜상담연구소에서의 상담과 교육은 우리가 가지고 있는 문제보다 우리의 문제해결 능력을 탐색하고 키워서, 문제가 문제시되지 않고 어렵지 않게 해결해 나갈 수 있도록 개인과 집단의 역량을 강화하는 방법을 추구합니다.
                이 과정에서 우리는 자신의 모습을 알아차리고 우리가 가지고 있는 힘을 최대한으로 키워 자신이 인식한 문제가 사라지거나 문제가 아주 작게 여겨지게 되는 성장의 과정을 체험합니다.\n
                솜(SoM)상담연구소는 한국상담학회 기관회원, 한상담학회 분당 지부입니다.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 함께하는 사람들 섹션 */}
      <section className="w-full md:w-[60%] mx-auto px-4 pb-16">
        {/* 상단 헤더 라인 */}
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-[#735751]">함께하는 사람들</h3>
          <Link
            href="/people"
            className="group inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900"
            aria-label="함께하는 사람들 더보기"
          >
            더보기 <span aria-hidden className="transition-transform group-hover:translate-x-0.5">›</span>
          </Link>
        </div>
        <div className="mt-3 border-b border-[#735751]/40" />

        {/* 카드 그리드 */}
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {[
            {
              name: "황지선 소장",
              img: "/home/js_image.jpeg",
              lines: [
                "한국상담학회 1급 전문상담사",
                "한상담학회 수련감독전문가",
                "한국요가문화협회 이사",
              ],
            },
            {
              name: "황윤선 부소장",
              img: "/home/ys_image.jpeg",
              lines: ["SoM Art 컨설턴트", "이화여자대학교 석사", "미술심리상담사 1급"],
            },
          ].map((p) => (
            <article key={p.name}>
              {/* 이미지 */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority={false}
                />
              </div>

              {/* 텍스트 */}
              <h4 className="mt-3 text-2xl font-bold text-neutral-800">{p.name}</h4>
              <ul className="mt-1 text-base text-neutral-600 leading-relaxed">
                {p.lines.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* 내부시설 섹션 */}
      <section className="w-full md:w-[60%] mx-auto px-4 pb-16">
        {/* 상단 헤더 라인 */}
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-[#735751]">내부시설</h3>
          <Link
            href="/place"
            className="group inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900"
            aria-label="내부시설 더보기"
          >
            더보기 <span aria-hidden className="transition-transform group-hover:translate-x-0.5">›</span>
          </Link>
        </div>
        <div className="mt-3 border-b border-[#735751]/40" />

        {/* 카드 그리드 */}
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {[
            { name: "place1", img: "/home/place1.jpeg" },
            { name: "place2", img: "/home/place2.jpeg" },
            { name: "place3", img: "/home/place3.jpeg" },
          ].map((p) => (
            <article key={p.name}>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={p.img}
                  alt={"내부 시설 이미지"}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority={false}
                />
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-12 pt-6">
          <div className="md:col-start-1 md:col-span-12">
            <div className="text-2xl font-bold text-neutral-800">
              솜상담연구소의 상담실과 교육실입니다.
            </div>
          </div>
          <div className="md:col-start-1 md:col-span-20">
            <div className="prose prose-sm sm:prose-base max-w-none">
              <p className="whitespace-pre-line">
                {`솜(SoM)상담연구소는 상담대기실, 개인상담실, 부부 가족상담실, 심리검사실, 미술치료실, 집단상담 및 교육실을 갖추고 있습니다.\n`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 상담서비스 섹션 */}
      <section className="w-full md:w-[60%] mx-auto px-4 pb-16">
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-[#735751]">상담서비스</h3>
          <Link
            href="/team"
            className="group inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900"
            aria-label="상담서비스 더보기"
          >
            더보기 <span aria-hidden className="transition-transform group-hover:translate-x-0.5">›</span>
          </Link>
        </div>
        <div className="mt-3 border-b border-[#735751]/40" />

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {[
            {
              name: "개인상담",
              img: "/home/personal.jpeg",
              lines: ["우울, 불안, 대인관계, 성격, 스트레스 증상 을 호소하는 성인대상 (50분)"],
            },
            {
              name: "부부 & 커플상담",
              img: "/home/couple.jpeg",
              lines: ["부부상담이라도 개인이 혼자 상담을 받으실 수 있습니다. (90분)"],
            },
          ].map((p) => (
            <article key={p.name}>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority={false}
                />
              </div>

              <h4 className="mt-3 text-2xl font-bold text-neutral-800">{p.name}</h4>
              <ul className="mt-1 text-base text-neutral-600 leading-relaxed">
                {p.lines.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* SoM 프로그램 섹션 */}
      <section className="w-full md:w-[60%] mx-auto px-4 pb-16">
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-[#735751]">SoM 프로그램</h3>
          <Link
            href="/programs"
            className="group inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900"
            aria-label="SoM 프로그램 더보기"
          >
            더보기 <span aria-hidden className="transition-transform group-hover:translate-x-0.5">›</span>
          </Link>
        </div>
        <div className="mt-3 border-b border-[#735751]/40" />

        <div className="mt-6 grid gap-8 md:grid-cols-12 items-start">
          <div className="md:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
              <Image
                src="/home/program.jpeg"
                alt="SoM 스트레스 관리 프로그램"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>

          <div className="md:col-span-6">
            <h4 className="mt-3 text-2xl font-bold text-neutral-800">
              SoM 스트레스 관리 프로그램
            </h4>
            <p className="whitespace-pre-line mt-1 text-base sm:text-base text-neutral-600 leading-relaxed">
              {`
        솜 스트레스 관리 프로그램은 통합적 접근의 솜상담연구소만의 맞춤형 프로그램으로
        내면탐색, 관계성 향상, 몸의 자각과 이완의 방법을 각 분야의 전문가와 함께 익혀 
        몸과 마음의 건강함을 회복하는 프로그램입니다.\n
        *마음과 몸의 통합 프로그램으로 구성되어 있으며 
          3개월 과정으로 현재 상시모집 중입니다.`}
            </p>
          </div>
        </div>
      </section>

      {/* 상담전문가 수련 섹션 */}
      <section className="w-full md:w-[60%] mx-auto px-4 pb-16">
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-[#735751]">상담전문가 수련</h3>
          <Link
            href="/about"
            className="group inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900"
            aria-label="상담전문가 수련 더보기"
          >
            더보기 <span aria-hidden className="transition-transform group-hover:translate-x-0.5">›</span>
          </Link>
        </div>
        <div className="mt-3 border-b border-[#735751]/40" />

        <div className="grid gap-6 md:grid-cols-12 pt-6">
          <div className="md:col-start-1 md:col-span-12">
            <div className="text-2xl font-bold text-neutral-800">상담전문가 수련과정</div>
          </div>
          <div className="md:col-start-1 md:col-span-20">
            <div className="prose prose-sm sm:prose-base max-w-none">
              <p className="whitespace-pre-line">
                {`솜 상담연구소 상담전문가 수련과정은 (사)한국상담학회 전문상담사, (사)한상담학회 상담전문가 1,2급 자격증 취득을 위한 수련과정을 제공합니다. `}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 교육안내 섹션 */}
      <section className="w-full md:w-[60%] mx-auto px-4 pb-16">
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-[#735751]">교육안내</h3>
          <Link
            href="/team"
            className="group inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900"
            aria-label="교육안내 더보기"
          >
            더보기 <span aria-hidden className="transition-transform group-hover:translate-x-0.5">›</span>
          </Link>
        </div>
        <div className="mt-3 border-b border-[#735751]/40" />

        <div className="mt-6 grid gap-8 md:grid-cols-1">
          {[
            {
              name: "교육안내",
              img: "/home/personal.jpeg",
            },
          ].map((p) => (
            <article key={p.name}>
              <div className="relative aspect-[5/2] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority={false}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 오른쪽 고정 퀵액션
      <QuickRail /> */}
    </>
  );
}
