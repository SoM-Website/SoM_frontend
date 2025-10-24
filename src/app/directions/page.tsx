// src/app/directions/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/layout/Container";

declare global { interface Window { naver: any } }

// 네이버 entry URL(웹 메르카토 미터) → 위경도
function webMercatorToLatLng(x: number, y: number) {
  const R = 20037508.34;
  const lng = (x / R) * 180;
  const lat = (180 / Math.PI) * (2 * Math.atan(Math.exp((y / R) * Math.PI)) - Math.PI / 2);
  return { lat, lng };
}

// 제공한 좌표(미터)
const ENTRY_X = 14146107.4019856;
const ENTRY_Y = 4493801.4693764;
const { lat: LAB_LAT, lng: LAB_LNG } = webMercatorToLatLng(ENTRY_X, ENTRY_Y);

const NAME = "솜상담연구소";
const DISPLAY_ADDR = "경기도 성남시 분당구 운중동 946 704호";

// 외부 링크
const NAVER_SEARCH = `https://map.naver.com/v5/search/${encodeURIComponent(DISPLAY_ADDR)}`;
// '길찾기'는 검색 링크로 연결(네이버 앱/웹에서 길찾기 버튼으로 이어짐)
const NAVER_DIRECTIONS = NAVER_SEARCH;

export default function DirectionsPage() {
  const mapEl = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timer: any;

    const init = () => {
      try {
        const { naver } = window;
        if (!naver?.maps || !mapEl.current) return;

        const center = new naver.maps.LatLng(LAB_LAT, LAB_LNG);
        const map = new naver.maps.Map(mapEl.current, {
          center,
          zoom: 16,
          minZoom: 8,
          scaleControl: true,
          mapDataControl: false,
        });

        const marker = new naver.maps.Marker({ position: center, map });
        const info = new naver.maps.InfoWindow({
          content: `
            <div style="padding:8px 10px;max-width:260px;line-height:1.5;">
              <strong>${NAME}</strong><br/>${DISPLAY_ADDR}<br/>
              <a href="${NAVER_SEARCH}"
                 target="_blank" rel="noreferrer" style="color:#2563eb;text-decoration:underline;">
                 네이버 지도에서 보기
              </a>
            </div>`,
        });
        naver.maps.Event.addListener(marker, "click", () => info.open(map, marker));
      } catch (e: any) {
        setError(e?.message ?? "지도를 초기화하지 못했습니다.");
      }
    };

    // SDK 준비될 때까지 대기(최대 8초)
    let tries = 0;
    timer = setInterval(() => {
      if (window.naver?.maps) {
        clearInterval(timer);
        init();
      } else if (++tries > 80) {
        clearInterval(timer);
        setError("네이버 지도 SDK가 로드되지 않았습니다. (인증/도메인/키 확인)");
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <PageHeader title="오시는 길" variant="split" />

      <main className="py-10">
        <Container>
          {/* 지도 */}
          <section className="space-y-4">
            {error && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}
            <div
              ref={mapEl}
              className="w-full h-[360px] md:h-[440px] rounded-2xl overflow-hidden bg-neutral-100"
              aria-label="네이버 지도"
            />
          </section>

          {/* ───────────────────────────────────────────── */}
          {/* 안내 블록 (주소/버튼 + 섹션별 정보) */}
          {/* ───────────────────────────────────────────── */}
          <section className="mt-8">
            {/* 상단: 큰 주소 + 버튼 */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">
                {DISPLAY_ADDR}
              </h2>

              <div className="flex gap-3">
                <a
                  href={NAVER_DIRECTIONS}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-neutral-800 px-4 py-2 text-white text-sm font-medium hover:bg-neutral-900"
                >
                  길찾기
                </a>
                <a
                  href={NAVER_SEARCH}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
                >
                  지도에서 보기
                </a>
              </div>
            </div>

            {/* 구분선 */}
            <div className="mt-4 border-t border-neutral-200" />

            {/* 줄 단위 정보 */}
            <div className="divide-y divide-neutral-200">
              {/* 오시는길 */}
              <Row
                label="오시는길"
                content={
                  <div className="space-y-1">
                    <p>국민은행 7층입니다.</p>
                    <p className="text-neutral-500">주차정보 | 2시간 까지 무료</p>
                  </div>
                }
              />

              {/* 전화번호 */}
              <Row
                label="전화번호"
                content={
                  <div className="space-y-1">
                    <p>
                      <a className="hover:underline" href="tel:0317070704">031-707-0704</a>
                    </p>
                    <p>
                      <a className="hover:underline" href="tel:01025927040">010-2592-7040</a>
                    </p>
                  </div>
                }
              />

              {/* 이용시간 */}
              <Row
                label="이용시간"
                content={
                  <div className="space-y-2">
                    <p>
                      <span className="inline-block w-14 text-neutral-500">평일</span>
                      <strong className="ml-1">10:00 ~ 21:00</strong>
                    </p>
                    <p>
                      <span className="inline-block w-14 text-neutral-500">토요일</span>
                      <strong className="ml-1">10:00 ~ 16:00</strong>
                    </p>
                    <p className="text-neutral-500 text-sm">
                      일요일과 공휴일은 휴무입니다. (예약에 따라 오픈시간이 변경될 수 있습니다)
                    </p>
                  </div>
                }
              />

              {/* 이용안내 */}
              <Row
                label="이용안내"
                content={
                  <ul className="flex flex-wrap gap-6 text-neutral-800">
                    <li className="flex items-center gap-2">
                      <span className="text-xl" aria-hidden>📅</span> 예약
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-xl" aria-hidden>📶</span> 무선 인터넷
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-xl" aria-hidden>🚻</span> 남/녀 화장실 구분
                    </li>
                  </ul>
                }
              />

              {/* 사업자정보 + 입금계좌 */}
              <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 사업자정보 */}
                <div>
                  <h3 className="text-base font-semibold text-neutral-900 mb-3">사업자정보</h3>
                  <dl className="grid grid-cols-[92px_1fr] gap-y-2 text-neutral-800">
                    <dt className="text-neutral-500">상호명</dt><dd>솜상담연구소</dd>
                    <dt className="text-neutral-500">대표자</dt><dd>황지선</dd>
                    <dt className="text-neutral-500">사업자번호</dt><dd>598-96-01120</dd>
                    <dt className="text-neutral-500">이메일</dt>
                    <dd><a className="hover:underline" href="mailto:somschool704@naver.com">somschool704@naver.com</a></dd>
                  </dl>
                </div>

                {/* 입금계좌 */}
                <div>
                  <h3 className="text-base font-semibold text-neutral-900 mb-3">입금계좌</h3>
                  <dl className="grid grid-cols-[92px_1fr] gap-y-2 text-neutral-800">
                    <dt className="text-neutral-500">예금주</dt><dd>황지선</dd>
                    <dt className="text-neutral-500">입금은행</dt><dd>우리은행</dd>
                    <dt className="text-neutral-500">계좌번호</dt><dd className="font-semibold">1002-132-348269</dd>
                  </dl>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </main>
    </>
  );
}

/** 라벨/콘텐츠 2열 레이아웃 공용 컴포넌트 */
function Row({ label, content }: { label: string; content: React.ReactNode }) {
  return (
    <div className="py-6 grid grid-cols-1 sm:grid-cols-[96px_1fr] gap-2 sm:gap-6">
      <div className="text-neutral-500">{label}</div>
      <div>{content}</div>
    </div>
  );
}
