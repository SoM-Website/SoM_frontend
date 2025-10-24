import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/layout/Container";

export default function CommunicationProgramPage() {
  return (
    <>
      <PageHeader
        title="Som 부부학교"
        variant="split"
        description={<>부부 소통 프로그램</>}
        subDescription={
          <>* 자세한 프로그램에 대한 설명은 솜상담연구소에 문의하세요. </>
        }
      />
      <main className="py-10">
        <Container>
          {/* 메인 이미지 */}
          <section>
            <figure className="relative w-full overflow-hidden bg-neutral-100 aspect-[16/12]">
              {/* 실제 파일명/확장자에 맞게 src 경로 수정 (예: /home/communication_program.jpg) */}
              <Image
                src="/home/couple_program.png"
                alt="부부학교"
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
            부부는 다른 가족, 환경, 가치관에서 성장한 두 사람이 결혼을 통해서 함께 살아나갑니다. 사랑으로 맺어졌다 하더라도 다른 두 사람이 만났기에 살아가면서 당연히 갈등이 있을 수 있습니다. 많은 부부들이 시행착오를 통해 서로의 문제를 풀어나가는 방법을 익히기도 하지만 회피하기도 합니다. 갈등이 깊어도 말해봤자 잘못 전달되어 오해만 깊어질까봐, 혹은 싸워봤자 감정만 상하고 싸우고 난 뒤에 관계가 더 악화될까봐 일 것입니다. 하지만 부부간의 갈등을 피하려고만 들면 그 갈등은 더 깊어지고 서로에 대한 오해와 원망이 쌓일 수 밖에 없습니다.  평생으로 보면 자신의 원 가족보다 더 긴 세월을 배우자와 함께 하는 경우가 대부분입니다. 그러므로 서로를 이해하고 잘 소통할 수 있는 바른 방법을 익힐 수 있다면 자신의 인생 여정의 행복감을 높이는 데 꼭 필요하게 쓰여질 것입니다. 
솜상담연구소의 부부학교는 자신과 배우자의 기본적 기질을 이해하고 배우자와 효과적으로 소통하기 위한 방법을 직접 익힘으로써 두 사람간의 갈등을 잘 해결하는 법, 혹은 싸웠더라도 잘 화해하고 소통할 수 있는 훈련들로 구성되었습니다. 
            </p>
          </section>
        </Container>
      </main>
    </>
  );
}
