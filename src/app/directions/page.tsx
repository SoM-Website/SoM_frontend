// src/app/directions/page.tsx
'use client';

/// <reference types="navermaps" />

import { useEffect, useRef, useState, type ReactNode } from 'react';
import PageHeader from '@/components/PageHeader';
import SidebarLayout from '@/components/layout/SidebarLayout';

declare global {
  interface Window {
    naver: typeof naver;
  }
}

function webMercatorToLatLng(x: number, y: number) {
  const R = 20037508.34;
  const lng = (x / R) * 180;
  const lat = (180 / Math.PI) * (2 * Math.atan(Math.exp((y / R) * Math.PI)) - Math.PI / 2);
  return { lat, lng };
}

const ENTRY_X = 14146107.4019856;
const ENTRY_Y = 4493801.4693764;
const { lat: LAB_LAT, lng: LAB_LNG } = webMercatorToLatLng(ENTRY_X, ENTRY_Y);

const NAME = '솜상담연구소';
const DISPLAY_ADDR = '경기도 성남시 분당구 운중동 946 704호';
const NAVER_SEARCH = `https://map.naver.com/v5/search/${encodeURIComponent(DISPLAY_ADDR)}`;
const NAVER_DIRECTIONS = NAVER_SEARCH;

export default function DirectionsPage() {
  const mapEl = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        const infoContent = `<div style="padding:8px 10px;max-width:260px;line-height:1.5;"><strong>${NAME}</strong><br/>${DISPLAY_ADDR}<br/><a href="${NAVER_SEARCH}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;">네이버 지도에서 보기</a></div>`;
        const info = new naver.maps.InfoWindow({ content: infoContent });
        naver.maps.Event.addListener(marker, 'click', () => info.open(map, marker));
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : '지도를 초기화하지 못했습니다.';
        setError(msg);
      }
    };

    let tries = 0;
    const timer = window.setInterval(() => {
      if (window.naver?.maps) {
        clearInterval(timer);
        init();
      } else if (++tries > 80) {
        clearInterval(timer);
        setError('네이버 지도 SDK가 로드되지 않았습니다.');
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <SidebarLayout header={<PageHeader title="오시는 길" variant="split" noContainer={true} />}>
      <section className="mb-10">
        {error && (
          <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}
        <div ref={mapEl} className="w-full h-[360px] md:h-[440px] rounded-xl overflow-hidden bg-neutral-100" aria-label="네이버 지도" />
      </section>

      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900">{DISPLAY_ADDR}</h2>
          <div className="flex gap-3">
            <a href={NAVER_SEARCH} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50">지도에서 보기</a>
          </div>
        </div>

        <div className="border-t border-neutral-300 mb-6" />

        <div className="divide-y divide-neutral-300">
          <Row label="오시는길" content={<div className="space-y-1"><p className="text-neutral-800">국민은행 7층입니다.</p><p className="text-neutral-600">주차정보 | 2시간 까지 무료</p></div>} />
          
          <Row label="전화번호" content={<div className="space-y-1 text-neutral-800"><p><a className="hover:underline" href="tel:0317070704">031-707-0704</a></p><p><a className="hover:underline" href="tel:01025927040">010-2592-7040</a></p></div>} />
          
          <Row label="이용시간" content={<div className="space-y-2"><p className="text-neutral-800"><span className="inline-block w-14 text-neutral-600">평일</span><strong className="ml-1">10:00 ~ 21:00</strong></p><p className="text-neutral-800"><span className="inline-block w-14 text-neutral-600">토요일</span><strong className="ml-1">10:00 ~ 16:00</strong></p><p className="text-neutral-600 text-sm">일요일과 공휴일은 휴무입니다. (예약에 따라 오픈시간이 변경될 수 있습니다)</p></div>} />
          
          <Row label="이용안내" content={<ul className="flex flex-wrap gap-6 text-neutral-800"><li>• 예약</li><li>• 무선 인터넷</li><li>• 남/녀 화장실 구분</li></ul>} />
          
          <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-base font-semibold text-neutral-900 mb-3">사업자정보</h3>
              <dl className="grid grid-cols-[92px_1fr] gap-y-2 text-neutral-800">
                <dt className="text-neutral-600">상호명</dt><dd>솜상담연구소</dd>
                <dt className="text-neutral-600">대표자</dt><dd>황지선</dd>
                <dt className="text-neutral-600">사업자번호</dt><dd>598-96-01120</dd>
                <dt className="text-neutral-600">이메일</dt><dd><a className="hover:underline" href="mailto:somschool704@naver.com">somschool704@naver.com</a></dd>
              </dl>
            </div>
            <div>
              <h3 className="text-base font-semibold text-neutral-900 mb-3">입금계좌</h3>
              <dl className="grid grid-cols-[92px_1fr] gap-y-2 text-neutral-800">
                <dt className="text-neutral-600">예금주</dt><dd>황지선</dd>
                <dt className="text-neutral-600">입금은행</dt><dd>우리은행</dd>
                <dt className="text-neutral-600">계좌번호</dt><dd className="font-semibold">1002-132-348269</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </SidebarLayout>
  );
}

function Row({ label, content }: { label: string; content: ReactNode }) {
  return (
    <div className="py-6 grid grid-cols-1 sm:grid-cols-[96px_1fr] gap-2 sm:gap-6">
      <div className="text-neutral-600 font-medium">{label}</div>
      <div>{content}</div>
    </div>
  );
}