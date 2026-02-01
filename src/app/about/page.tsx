// src/app/about/page.tsx
import PageHeader from "@/components/PageHeader";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default function AboutPage() {
  return (
    <SidebarLayout
      header={
        <PageHeader 
          title="연구소 소개" 
          variant="split"
          noContainer={true}
        />
      }
    >
      <section className="bg-[#000000]/3 py-10 px-8">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#735751] mb-6">
          Shapes of Mind
        </h2>

        <div className="leading-relaxed text-neutral-800">
          <p className="whitespace-pre-line text-base md:text-lg">
{`SoM은 'Shapes of Mind' 의 약자로, 해석하면 '마음의 형태'를 말합니다. 
우리는 어떤 상황을 대처할때 '마음 먹기 나름'이라는 말을 많이 씁니다. 
이처럼 우리의 마음의 형태를 어떻게 형성하고 상황을 대처하냐에 따가 그 결과가 달라질 것입니다.  
어떨때는 우리의 마음이 찌그러지거나 꼬였거나 혹은 너무 작고 보잘것 없는 상태를 지닐 때가 있습니다. 
그리고 우리는 그 상태를 지닌 마음이 진짜 자신이라고 '착각'하고 괴롭히곤 합니다. 하지만 마음은 순간순간 그 형태가 바뀌며 고정되어있지 않습니다. 

SoM School의 솜(SoM)상담연구소 에서는 이러한 우리의 마음의 형태를 자유롭고 건강하게 잡아가는 순간을 늘리고 그 크기를 키울 수 있도록 돕는 상담서비스와 맞춤형 교육을 제공하고 있습니다. 

솜상담연구소의 상담방법은 한마디로 말하자면 성장 상담입니다.
솜상담연구소에서의 상담과 교육은 우리가 가지고 있는 문제보다 우리의 문제해결 능력을 탐색하고 키워서, 문제가 문제시되지 않고 어렵지 않게 해결해 나갈 수 있도록 개인과 집단의 역량을 강화하는 방법을 추구합니다. 
이 과정에서 우리는 자신의 모습을 알아차리고 우리가 가지고 있는 힘을 최대한으로 키워 자신이 인식한 문제가 사라지거나 문제가 아주 작게 여겨지게 되는 성장의 과정을 체험합니다.
솜(SoM)상담연구소는 한국상담학회 기관회원, 한상담학회 분당 지부입니다.`}
          </p>
        </div>
      </section>
    </SidebarLayout>
  );
}