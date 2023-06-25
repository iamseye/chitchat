import { Icons } from "@/components/Icons";
import SideBarOption from "@/components/ui/SideBarOption";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="w-full flex h-screen">
      <div className="flex h-full w-full max-w-sm flex-col grow border-r border-gray-200 p-6 gap-y-5 overflow-y-auto">
        <Link href="/dashboard" className="flex h-16 items-center">
          <Icons.logo className="h-8 w-auto text-indigo-600" />
        </Link>

        <nav className="flex flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <div className="text-sm font-semibold leading-6 text-gray-400">
                Your chats
              </div>
            </li>
            <li>
              <div className="text-sm font-semibold leading-6 text-gray-400">
                Overview
                <ul role="list" className="-mx-2 mt-2 mb-2 space-y-1">
                  <li>
                    <SideBarOption
                      title="Add Friend"
                      href="/dashboard/add"
                      icon="addFriend"
                    />
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default layout;
