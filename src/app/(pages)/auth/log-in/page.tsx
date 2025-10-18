import Image from "next/image";
import BgImage from "@/assets/images/auth/Group 48097120.png";
import { Input } from "antd";
import SignInUI from "@/features/auth/sign-in/ui";

export default function LoginPage() {
  return (
    <div>
      <div className="flex flex- justify-center items-center">
      <SignInUI />
      </div>
    </div>
  );
}
