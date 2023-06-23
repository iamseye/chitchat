"use client";

import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Icons } from "@/components/Icons";
import Button from "@/components/ui/Button";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col justify-center items-center max-w-md space-y-8">
          <div>Logo</div>

          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <Button
            type="button"
            className="max-w-sm mx-auto w-full"
            isLoading={isLoading}
            onClick={signInWithGoogle}
          >
            <Icons.google /> Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default page;
