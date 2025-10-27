"use client";
import { message } from "antd";
import React, { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";

interface CopyTextProps {
  text: string;
}

export const CopyText: React.FC<CopyTextProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      message.success("Nusxalandi");
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      message.error("Nusxalab bo‘lmadi");
      setCopied(false);
    }
  };

  return (
    <div className="gap-2">
      <span className="break-all inline global-text-size">{text}</span>
      <button
        className="px-3 py-1 rounded text-sm bg-transparent inline cursor-pointer transition-all duration-200"
        onClick={handleCopy}
        type="button"
      >
        {copied ? (
          <FaCheck className="text-green-500" />
        ) : (
          <FaCopy className="text-gray-500" />
        )}
      </button>
    </div>
  );
};
