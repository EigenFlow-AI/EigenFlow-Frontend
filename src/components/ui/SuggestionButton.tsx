import React from "react";

interface SuggestionButtonProps {
  text: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export function SuggestionButton({
  text,
  isSelected = false,
  onClick,
}: SuggestionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
        isSelected
          ? "bg-violet-600 text-white border-violet-600"
          : "bg-white text-gray-700 border-violet-200 hover:bg-violet-50 hover:border-violet-300"
      }`}>
      {text}
    </button>
  );
}
