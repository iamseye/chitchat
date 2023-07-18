import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosError } from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { addFriendValidator } from "@/lib/validations/add-friend";
import Button from "./ui/Button";
import { Input } from "./ui/Input";

export function AddFriendButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessState, setShowSuccessState] = useState<boolean>(false);

  type FormData = z.infer<typeof addFriendValidator>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const handleAddFriend = async (email: string) => {
    try {
      setIsLoading(true);
      const validatedEmail = addFriendValidator.parse({ email });

      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });

      setShowSuccessState(true);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError("email", { message: err.message });
        return;
      }

      if (err instanceof AxiosError) {
        setError("email", { message: err.response?.data });
        return;
      }

      setError("email", { message: "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: FormData) => {
    handleAddFriend(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add friend by E-Mail
      </label>
      <div className="flex w-full mt-2 max-w-sm items-center space-x-2">
        <Input
          {...register("email")}
          type="text"
          placeholder="you@example.com"
        />
        <Button isLoading={isLoading} className="w-full">
          Add friend
        </Button>
      </div>

      {showSuccessState && !errors.email ? (
        <p className="mt-1 text-green-900">Add Friend Request Sent!</p>
      ) : (
        <p className="mt-1 text-red-500">{errors.email?.message}</p>
      )}
    </form>
  );
}
