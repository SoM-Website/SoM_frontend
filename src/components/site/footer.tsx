// src/components/site/footer.tsx
const ORG = {
  name: "솜(SoM)상담연구소",
  owner: "황지선",
  address: "경기도 성남시 분당구 운중동 946, 704호",
  bizNumber: "598-96-01120",
  tel: "031-707-0704",
  email: "somschool704@naver.com",
  bank: {
    holder: "황지선",
    name: "우리은행",
    account: "1002-132-348269",
  },
};

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-24">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <h2 className="sr-only">사이트 정보</h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            <p className="text-2xl md:text-3xl text-neutral-100">{ORG.name}</p>
            <address className="not-italic mt-4 text-neutral-400 leading-relaxed">
              {`솜상담연구소, ${ORG.owner}, ${ORG.address}, 사업자등록번호 : ${ORG.bizNumber}, 전화번호 : `}
              <a href={`tel:${ORG.tel}`} className="hover:text-neutral-200">
                {ORG.tel}
              </a>
              {`, 이메일 : `}
              <a href={`mailto:${ORG.email}`} className="hover:text-neutral-200">
                {ORG.email}
              </a>
            </address>
          </div>

          <div className="md:col-span-4 md:pl-8 md:border-l md:border-neutral-700">
            <div className="text-neutral-400">계좌정보</div>
            <div className="h-px w-full bg-neutral-700 mt-2 mb-4" />

            <dl className="space-y-2">
              <div className="flex items-baseline md:gap-6 justify-between md:justify-start">
                <dt className="w-24 text-neutral-400">예금주</dt>
                <dd className="text-neutral-100">{ORG.bank.holder}</dd>
              </div>
              <div className="flex items-baseline md:gap-6 justify-between md:justify-start">
                <dt className="w-24 text-neutral-400">입금은행</dt>
                <dd className="text-neutral-100">{ORG.bank.name}</dd>
              </div>
              <div className="flex items-baseline md:gap-6 justify-between md:justify-start">
                <dt className="w-24 text-neutral-400">계좌번호</dt>
                <dd className="text-neutral-100 tracking-wide">{ORG.bank.account}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
