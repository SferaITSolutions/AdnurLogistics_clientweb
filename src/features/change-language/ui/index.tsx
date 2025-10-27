"use client";

import { getLocalItem, setLocalItem } from "@/shared/utils/storage";
import { LANGUAGES } from "@/shared/constants";
import { Select } from "antd";
import { usePathname } from "@/i18n/routing";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../style/style.css";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const pathParts = pathname.split("/").filter(Boolean);

  const handleChange = (value: string) => {
    setLocalItem("lang", value);
    let newPath = "";
    if (pathParts.length > 0) newPath += `/${value}${pathname}`;
    else newPath += "/" + value;
    router.push(newPath);
  };

  return (
    <Select
      value={getLocalItem("lang") || "uz"}
      onChange={handleChange}
      className="custom-lang-select w-[150px] !min-h-[50px]"
      dropdownStyle={{
        padding: "10px 6px ",
        borderRadius: "10px",
      }}
      popupClassName="custom-lang-dropdown"
    >
      {LANGUAGES.map((lang) => (
        <Select.Option key={lang.code} value={lang.code}>
          <div className="flex items-center gap-2">
            <Image src={lang.icon} alt={lang.label} width={20} height={20} />
            <span className="text-[18px] font-medium">{lang.label}</span>
          </div>
        </Select.Option>
      ))}
    </Select>
  );
}
