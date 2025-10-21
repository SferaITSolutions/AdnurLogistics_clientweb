"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Select } from "antd";
import { LANGUAGES } from "@/shared/constants";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // Detect current lang from path, default to "en"
  // Assumes path starts with /{lang}/...
  const pathParts = pathname.split("/").filter(Boolean); // removes empty strings
  const currentLang = LANGUAGES.find(lang => lang.code === pathParts[0])
    ? pathParts[0]
    : "en";

  const handleChange = (value: string) => {
    // Replace only the first segment (language)
    const restOfPath = pathParts.slice(1).join("/");
    let newPath = `/${value}`;
    if (restOfPath) {
      newPath += `/${restOfPath}`;
    }
    // router.push expects a valid path
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={currentLang}
        onChange={handleChange}
        style={{ width: 120 }}
        options={LANGUAGES.map((lang: { code: string; label: string }) => ({
          value: lang.code,
          label: lang.label,
        }))}
      />
    </div>
  );
}
