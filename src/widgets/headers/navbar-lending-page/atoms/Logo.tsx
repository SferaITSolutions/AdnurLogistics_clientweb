"use client";
import { Typography } from "antd";
import Link from "next/link";
import LogoSVG from '@/assets/images/logo/Logo.svg'
import Image from "next/image";
const { Text } = Typography;

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Text className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
        <Image src={LogoSVG} alt="Logo" height={70}/>
      </Text>
    </Link>
  );
};
