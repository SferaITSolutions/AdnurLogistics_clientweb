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
      await navigator.clipboard.writeText(text);
      setCopied(true);
      message.success("Nusxalandi");
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
    }
  };

  return (
    <div className="gap-2">
      <span className="break-all inline">{text}</span>
      <button
        className="px-3 py-1 rounded text-sm bg-transparent inline"
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
