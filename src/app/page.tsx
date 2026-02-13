// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Users,
  DoorOpen,
  MessageCircle,
  ClipboardList,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  MapPin,
} from "lucide-react";

const MENU_ITEMS = [
  { label: "연구소 소개", href: "/about", icon: Building2 },
  { label: "함께하는 사람들", href: "/people", icon: Users },
  { label: "내부시설", href: "/facilities", icon: DoorOpen },
  { label: "상담서비스", href: "/services", icon: MessageCircle },
  { label: "SoM 프로그램", href: "/programs", icon: ClipboardList },
  { label: "상담전문가 수련", href: "/training", icon: GraduationCap },
  { label: "교육안내", href: "/education", icon: BookOpen },
  { label: "상담예약", href: "/reserve", icon: CalendarCheck },
  { label: "오시는길", href: "/directions", icon: MapPin },
];

export default function HomePage() {
  return (
    <>
      {/* 히어로 섹션 */}
      <section className="relative h-[46vh] min-h-[340px] w-full overflow-hidden border-b">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/home/main_image.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-4 text-white">
              <div className="relative flex h-18 w-18 sm:h-22 sm:w-22 items-center justify-center rounded-full overflow-hidden bg-white">
                <Image
                  src="/home/logo.png"
                  alt="SoM 로고"
                  fill
                  className="object-contain p-1"
                  sizes="(min-width: 640px) 5.5rem, 4.5rem"
                  draggable={false}
                />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">솜(SoM)상담연구소</h1>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base opacity-95">
                  대면/비대면 심리상담 및 교육 플랫폼 제공
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 소개 문단 */}
      {/* text-left  */}
      <section className="container mx-auto max-w-4xl px-4 py-10 sm:py-12">
        <h2 className="text-center font-bold text-base text-muted-foreground">SoM 상담연구소</h2>
        <p className="mt-4 text-left font-bold leading-7 text-base text-gray-700 whitespace-pre-line">
          {`솜상담연구소는 대면/ 비대면 심리상담 및 교육서비스를 제공합니다. 우울, 불안, 성격, 대인관계 갈등 등으로 어려움을 겪고 있는 성인을 위한 개인상담 및 부부 & 커플상담, 부모역할 상담을 제공하며, 다양한 심리검사 해석 상담 및 교육과, 맞춤형 스트레스 관리 집단 상담, 감수성훈련, 갈등관계해결 집단, EAP 상담 등 개인과 조직의 심리지원 서비스를 제공하고 있습니다.
(모든 상담서비스는 예약제로 운영됩니다.)`}
        </p>
      </section>

      {/* 메뉴 버튼 그리드 */}
      <section className="container mx-auto max-w-4xl px-4 pb-16">
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white border border-gray-200 rounded-lg hover:border-[#735751] hover:shadow-md transition-all group"
            >
              <item.icon className="w-12 h-12 sm:w-16 sm:h-16 text-[#735751] group-hover:scale-110 transition-transform" />
              <span className="mt-3 text-sm sm:text-base font-medium text-gray-700 text-center">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}