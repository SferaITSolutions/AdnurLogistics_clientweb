import React, { useState } from "react";
import { Select } from "antd";
import { LANGUAGES } from "@/shared/constants";

export default function LanguageSwitcher() {
  const [selectedLang, setSelectedLang] = useState("en");

  const handleChange = (value: string) => {
    setSelectedLang(value);
    // Place to trigger actual language change, e.g., i18n.changeLanguage(value);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Language:</span>
      <Select
        value={selectedLang}
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
