export type MenuKey = string;

export interface SidebarItem {
  icon: string;      // next/image에 넣을 src 문자열(정적 import면 타입을 StaticImport로 확장 가능)
  title?: string;    // 이미지 대체 텍스트로도 사용
  label: string;     // 화면에 보이는 라벨
}

// SidebarMenu가 기대하는 형태: 객체(Record). 예: { home: {...}, settings: {...} }
export interface SidebarMenuProps {
  panelData: Record<MenuKey, SidebarItem>;
  activeMenu: MenuKey;
  onMenuClick: (key: MenuKey) => void;
}
