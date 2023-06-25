import Link from "next/link";
import { FC } from "react";
import { Icon, Icons } from "../Icons";

interface SideBarOptionProps {
  title: string;
  icon: Icon;
  href: string;
}

const SideBarOption: FC<SideBarOptionProps> = ({ title, icon, href }) => {
  const SideBarIcon = Icons[icon];
  return (
    <Link
      href={href}
      className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold items-center"
    >
      <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
        <SideBarIcon className="h-8 w-auto" />
      </span>

      <span className="truncate">{title}</span>
    </Link>
  );
};

export default SideBarOption;
