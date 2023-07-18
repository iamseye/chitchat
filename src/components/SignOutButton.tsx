import { ButtonHTMLAttributes, FC } from "react";
import Button from "./ui/Button";
import { Icons } from "./Icons";

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  return (
    <div>
      <Button {...props}>
        <Icons.signOut />
      </Button>
    </div>
  );
};

export default SignOutButton;
