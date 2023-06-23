import { FC } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const page: FC = async ({}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <pre>{JSON.stringify(session)}</pre>;
};

export default page;
