import React from "react";
import { stripForbiddenCharacters } from "@/services/chatService";

interface ChatMessageContentProps {
  text: string;
}

// Parses inline tokens (links, inline code, bold if any remains)
const renderInlineTokens = (content: string): React.ReactNode[] => {
  // Regex to match markdown links [label](url), bold **bold**, or `code`
  const tokenRegex = /(\[.*?\]\(https?:\/\/[^\s\)]+\)|\*\*.*?\*\*|`.*?`)/g;
  const parts = content.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Link: [label](url)
    const linkMatch = part.match(/^\[(.*?)\]\((https?:\/\/[^\s\)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-semibold inline-flex items-center gap-0.5 break-all"
        >
          {linkMatch[1]}
        </a>
      );
    }

    // Bold: **text**
    const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {boldMatch[1]}
        </strong>
      );
    }

    // Code: `code`
    const codeMatch = part.match(/^`(.*?)`$/);
    if (codeMatch) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 text-xs rounded bg-card/60 border border-border font-mono text-primary"
        >
          {codeMatch[1]}
        </code>
      );
    }

    return <span key={index}>{part}</span>;
  });
};

export const ChatMessageContent: React.FC<ChatMessageContentProps> = ({ text }) => {
  const sanitizedText = stripForbiddenCharacters(text);
  const lines = sanitizedText.split("\n");

  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];
  let isNumberedList = false;

  const flushList = () => {
    if (currentList.length > 0) {
      if (isNumberedList) {
        elements.push(
          <ol key={`ol-${elements.length}`} className="list-decimal list-outside pl-5 space-y-1 my-2 text-xs sm:text-sm">
            {currentList}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc list-outside pl-5 space-y-1 my-2 text-xs sm:text-sm">
            {currentList}
          </ul>
        );
      }
      currentList = [];
    }
  };

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();

    // Blank line
    if (!trimmed) {
      flushList();
      return;
    }

    // Headings: ### Heading, ## Heading
    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h4 key={`h4-${lineIdx}`} className="font-bold text-sm sm:text-base text-foreground mt-2 mb-1">
          {renderInlineTokens(trimmed.slice(4))}
        </h4>
      );
      return;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h3 key={`h3-${lineIdx}`} className="font-bold text-sm sm:text-base text-primary mt-3 mb-1">
          {renderInlineTokens(trimmed.slice(3))}
        </h3>
      );
      return;
    }

    // Bullet items: - item, * item, • item
    const bulletMatch = trimmed.match(/^[-*•]\s+(.*)$/);
    if (bulletMatch) {
      if (isNumberedList) flushList();
      isNumberedList = false;
      currentList.push(
        <li key={`li-${lineIdx}`} className="leading-relaxed">
          {renderInlineTokens(bulletMatch[1])}
        </li>
      );
      return;
    }

    // Numbered list: 1. item, 2. item
    const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numberMatch) {
      if (!isNumberedList) flushList();
      isNumberedList = true;
      currentList.push(
        <li key={`li-${lineIdx}`} className="leading-relaxed">
          {renderInlineTokens(numberMatch[2])}
        </li>
      );
      return;
    }

    // Standard paragraph
    flushList();
    elements.push(
      <p key={`p-${lineIdx}`} className="leading-relaxed my-1.5">
        {renderInlineTokens(trimmed)}
      </p>
    );
  });

  flushList();

  return <div className="space-y-1 text-xs sm:text-sm leading-relaxed">{elements}</div>;
};

export default ChatMessageContent;
