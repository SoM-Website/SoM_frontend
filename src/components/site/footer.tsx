
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
            <p className="text-2xl md:text-3xl text-neutral-100 mb-6">{ORG.name}</p>
            <address className="not-italic text-neutral-400 leading-relaxed space-y-1">
              <div>대표: {ORG.owner}</div>
              <div>주소: {ORG.address}</div>
              <div>사업자등록번호: {ORG.bizNumber}</div>
              <div>
                전화:{" "}
                <a href={`tel:${ORG.tel}`} className="hover:text-neutral-200">
                  {ORG.tel}
                </a>
              </div>
              <div>
                이메일:{" "}
                <a href={`mailto:${ORG.email}`} className="hover:text-neutral-200">
                  {ORG.email}
                </a>
              </div>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;