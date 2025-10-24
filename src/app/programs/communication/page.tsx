import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/layout/Container";

export default function CommunicationProgramPage() {
  return (
    <>
      <PageHeader
        title="효과적인 의사소통 훈련"
        variant="split"
        description={<>인간관계를 향상하고 갈등을 해결하는 효과적인 의사소통 훈련</>}
      />
      <main className="py-10">
        <Container>
          {/* 메인 이미지 */}
          <section>
            <figure className="relative w-full overflow-hidden bg-neutral-100 aspect-[16/12]">
              {/* 실제 파일명/확장자에 맞게 src 경로 수정 (예: /home/communication_program.jpg) */}
              <Image
                src="/home/communication_program.png"
                alt="효과적인 의사소통 훈련"
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

            <p>
              말에는 사람을 살리는 말이 있고, 사람의 사기를 저하시키는 말이 있습니다.
              자신을 변화시키고 타인에게 바른 영향력을 끼치기 위해서는 마음을 바꾸어야 하고
              마음을 바꾸기 위해서는 말을 바꾸어야 합니다.
            </p>

            <p>
              이처럼 말은 타고난 말과 훈련하여 배우고 익히는 말이 있습니다.
              자신과 다른 성격과 가치관 등을 가진 많은 타인들과 효과적인 의사소통을 이루기 위해서는
              자신이 습관적으로 지닌 말 이외에 다른 사람들과 잘 소통할 수 있는 말을 훈련해야 합니다.
            </p>

            <p>
              솜상담심리연구소의 효과적인 의사소통 기술은 ‘한상담’의 상담 코칭기법을 기반으로 하여
              개인 간의 대인관계 향상 및 조직과 직장 안에서의 갈등관계를 해결하고
              팀빌딩을 효과적으로 이룰 수 있도록 구성된 검증된 훈련 방법입니다.
            </p>

            <p>
              솜상담연구소에서는 자기 자신의 성장과 인간관계 성장에 관심 있는 일반인부터
              상담 의사소통을 향상하고 싶은 전문 상담자들, 그리고 학교 등 다양한 조직과 기업의
              여건과 상황에 따라 내용을 구성하고 기간, 회기 등 맞춤형 프로그램으로 제공하고 있습니다.
              (갈등관리, 팀빌딩, 중간관리자 과정, 리더의 의사소통 등)
            </p>

            <p className="text-sm text-neutral-600">
              *솜상담연구소 자체 교육은 3개월 주 1회(3시간) 과정으로 상시모집 중입니다.
            </p>
          </section>
        </Container>
      </main>
    </>
  );
}
