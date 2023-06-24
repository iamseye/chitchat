import { addFriendValidator } from "@/lib/validations/add-friend";
import { Button } from "./Button";
import { Input } from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AxiosError } from "axios";

export function AddFriendButton() {
  type FormData = z.infer<typeof addFriendValidator>;

  const { register, handleSubmit, setError } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const handleAddFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse(email);

      // call api to add friend

      // show message
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError("email", err);
      }

      if (err instanceof AxiosError) {
        setError("email", err);
      }
    }
  };

  const onSubmit = () => {};
  return (
    <form className="max-w-sm">
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add friend by E-Mail
      </label>
      <div className="flex w-full mt-2 max-w-sm items-center space-x-2">
        <Input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
        />
        <Button className="w-full">Add friend</Button>
      </div>
    </form>
  );
}
