// src/app/programs/art/page.tsx
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/layout/Container";

export default function CommunicationProgramPage() {
  return (
    <>
      <PageHeader
        title="Som Art"
        variant="split"
        description={<>Shapes of Mind ART</>}
      />
      <main className="py-10">
        <Container>
          {/* 메인 이미지 */}
          <section>
            <figure className="relative w-full overflow-hidden bg-neutral-100 aspect-[16/12]">
              <Image
                src="/home/art_program.png"
                alt="som_art"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </figure>
          </section>

          {/* 소개 문구 */}
          <section className="mt-10 leading-relaxed text-neutral-800 space-y-5">
            <div />
            <p>
              사람마다 자신만의 아트의 형태를 가지고 있습니다. 태초부터 그리고 만들고 창조하는 것은
              인류가 갖고 있는 본성이기 때문입니다. &apos;Shapes of Mind Art&apos; 프로그램은 자신만의 내, 외적
              아트의 형태를 찾아가는 과정으로 이루어집니다. 때로는 그리거나 만드는 행위로, 때로는 자신이
              속한 공간을 재창조하는 행위로 자신의 마음의 여유를 찾고 행복감을 높이는 작업들을 솜아트의
              전문 컨설턴트와 함께 합니다.
            </p>
          </section>
        </Container>
      </main>
    </>
  );
}
