import Link from "next/link";
import { FC, ReactNode } from "react";
import Image from "next/image";
import { Icons } from "@/components/Icons";
import SignOutButton from "@/components/SignOutButton";
import SideBarOption from "@/components/ui/SideBarOption";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const { user } = session;

  return (
    <div className="w-full flex h-screen">
      <div className="flex h-full w-full max-w-sm flex-col grow border-r border-gray-200 p-6 gap-y-5 overflow-y-auto">
        <Link href="/dashboard" className="flex h-16 items-center">
          <Icons.logo className="h-8 w-auto text-indigo-600" />
        </Link>

        <nav className="flex flex-1 flex-col ">
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
            <li className="mt-auto flex items-center">
              <div className="flex flex-1 items-center pr-6 py-3 gap-x-4 text-sm font-semibold leading-6 text-gray-900">
                <div className="relative h-8 w-8 bg-gray-50">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={user.image || ""}
                    alt="Your profile picture"
                  />
                </div>

                <span className="sr-only">Your profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{user.name}</span>
                  <span className="text-xs text-zinc-400" aria-hidden="true">
                    {user.email}
                  </span>
                </div>
              </div>
              <SignOutButton className="h-full aspect-square text-black bg-transparent" />
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default layout;
