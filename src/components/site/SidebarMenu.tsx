// components/layout/SidebarMenu.tsx

import React from "react";
import { CustomImage } from "../ui/CustomImage";
import { SidebarMenuProps } from "@/types/sidebar";

const SidebarMenu = ({ panelData, activeMenu, onMenuClick }: SidebarMenuProps) => (
  <aside className="flex h-full w-16 select-none flex-col border-r border-r-[4px] border-[#DFE1E6] bg-[#fafbfc]">
    <nav className="flex-1">
      <ul className="space-y-2 pt-4">
        {Object.entries(panelData).map(([key, data]) => (
          <li
            key={key}
            className="flex cursor-pointer flex-col items-center rounded-r-lg transition-colors duration-150"
            onClick={() => onMenuClick(key)}
          >
            <div className="flex w-full flex-col items-center">
              <div
                className={`mb-1 flex h-9 w-9 items-center justify-center rounded-lg transition-colors
                  ${activeMenu === key ? "bg-[#eceff2]" : ""}`}
              >
                <CustomImage src={data.icon} alt={data.title ?? data.label} />
              </div>
              <span className={`text-xs ${
                activeMenu === key ? "font-bold text-[#3b4a6b]" : "text-[#8b98a9]"
              }`}>
                {data.label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default SidebarMenu;