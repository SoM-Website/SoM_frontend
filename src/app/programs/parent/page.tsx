import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/layout/Container";

export default function CommunicationProgramPage() {
  return (
    <>
      <PageHeader
        title="한알 부모 훈련"
        variant="split"
      />
      <main className="py-10">
        <Container>
          {/* 메인 이미지 */}
          <section>
            <figure className="relative w-full overflow-hidden bg-neutral-100 aspect-[15/12]">
              {/* 실제 파일명/확장자에 맞게 src 경로 수정 (예: /home/communication_program.jpg) */}
              <Image
                src="/home/parent_program.png"
                alt="부모훈련"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </figure>
          </section>

          {/* 소개 문구 */}
          <section className="mt-10 leading-relaxed text-neutral-800 space-y-5">
            <div>
            </div> 
            <p className="whitespace-pre-line">
{`"내 속으로 낳았어도 그 속을 모르겠을 때가 있습니다."
"내가 생각하는 최선을 자녀는 방해라고 말할 때가 있습니다."
"내가 자녀일 때 받았으면 하는 케어와 배려를 해주는데 자녀가 부담스러워 하거나 서운해 할 때가 있습니다."
"자녀의 문제행동에 갈피를 잡지 못할 때가 있습니다."
"자녀는 성장하는데 어릴 때와 같은 방식으로 부모역할을 하고 있는 자신을 발견할 때가 있습니다."`}
</p>

            <p>한알 부모 훈련은 자녀가 건강하게 성장하고 성공적인 삶을 살아나가기 위해 바른 영향을 주고 싶은 부모님들을 위해 개발되었으며 1.부모역할 훈련과 2.부모대화 훈련으로 이루어집니다.  교육 참가자는 상시 모집 중입니다. </p>
            <p>자세한 프로그램 구성과 기간 및 기타 사항에 대해 이메일로 문의하시면 연구소에서 가능한 빠르게 연락드립니다.  </p> 
          </section>
        </Container>
      </main>
    </>
  );
}
