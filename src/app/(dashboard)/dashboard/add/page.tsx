import { AddFriendButton } from "@/components/ui/AddFriendButton";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="pt-8 px-8">
      <h1 className="text-5xl font-bold mb-8">Add a Friend</h1>
      <AddFriendButton />
    </main>
  );
};

export default page;
