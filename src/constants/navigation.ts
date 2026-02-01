// src/constants/navigation.ts
export type ChildItem = { label: string; href: string }
export type NavItem = { label: string; href: string; children?: ChildItem[] }

export const NAV: NavItem[] = [
  {
    label: "연구소 소개",
    href: "/about",
    children: [
      { label: "SoM이란?", href: "/about" },
      { label: "대표 소개", href: "/about/representative" },
    ],
  },
  {
    label: "함께하는 사람들",
    href: "/people",
    children: [
      { label: "함께하는 사람들", href: "/people" },
    ],
  },
  {
    label: "내부시설",
    href: "/facilities",
    children: [
      { label: "내부시설", href: "/facilities" },
    ],
  },
  {
    label: "상담서비스",
    href: "/services",
    children: [
      { label: "상담서비스", href: "/services" },
    ],
  },
  {
    label: "SoM 프로그램",
    href: "/programs",
    children: [
      { label: "SoM 스트레스 관리", href: "/programs" },
      { label: "효과적인 의사소통 훈련", href: "/programs/communication" },
      { label: "SoM 부부학교", href: "/programs/couple-school" },
      { label: "한알 부모 훈련", href: "/programs/parent" },
      { label: "SoM ART", href: "/programs/art" },
    ],
  },
  {
    label: "상담전문가 수련",
    href: "/training",
    children: [
      { label: "상담전문가 수련", href: "/training" },
    ],
  },
  {
    label: "교육안내",
    href: "/education",
    children: [
      { label: "교육안내", href: "/education" },
    ],
  },
  {
    label: "상담예약",
    href: "/reserve",
    children: [
      { label: "상담예약", href: "/reserve" },
      { label: "예약내역", href: "/reserve/status" },
    ],
  },
  {
    label: "오시는길",
    href: "/directions",
    children: [
      { label: "오시는길", href: "/directions" },
    ],
  },
]