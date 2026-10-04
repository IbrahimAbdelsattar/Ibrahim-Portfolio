import React from "react";
import { hasRtlText } from "@/data/chatUi";
import { stripForbiddenCharacters } from "@/services/chatService";

interface ChatMessageContentProps {
  text: string;
}

// Isolates embedded Latin/English phrases inside RTL text to prevent BiDi reordering
const isolateMixedLanguageTokens = (textPart: string, isRtlContext: boolean): React.ReactNode => {
  if (!isRtlContext || !textPart) return textPart;

  // Match English words/phrases (including technical acronyms, versions like GPT-4o, RAG, etc.)
  const englishPhraseRegex = /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|https?:\/\/[^\s]+|[A-Za-z0-9][A-Za-z0-9\s&.+/'-]*[A-Za-z0-9]|[A-Za-z0-9]+)/g;
  const segments = textPart.split(englishPhraseRegex);

  if (segments.length <= 1) return textPart;

  return segments.map((seg, i) => {
    if (!seg) return null;
    // Check if segment starts with a Latin alphanumeric character
    if (/^[A-Za-z0-9]/.test(seg.trim())) {
      return (
        <bdi key={i} dir="ltr" className="inline mx-0.5 font-sans font-medium">
          {seg}
        </bdi>
      );
    }
    return <span key={i}>{seg}</span>;
  });
};

// Parses inline tokens (links, inline code, bold if any remains) with BiDi protection
const renderInlineTokens = (content: string, isRtlContext: boolean): React.ReactNode[] => {
  // Regex to match markdown links [label](url), bold **bold**, or `code`
  const tokenRegex = /(\[.*?\]\((?:https?:\/\/|mailto:|\/)[^\s)]+\)|\*\*.*?\*\*|`.*?`)/g;
  const parts = content.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Link: [label](url)
    const linkMatch = part.match(/^\[(.*?)\]\(((?:https?:\/\/|mailto:|\/)[^\s)]+)\)$/);
    if (linkMatch) {
      return (
        <bdi key={index} className="inline">
          <a
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            dir={hasRtlText(linkMatch[1]) ? "rtl" : "ltr"}
            className="text-primary hover:underline font-semibold inline-flex items-center gap-0.5 break-all bidi-isolate"
          >
            {linkMatch[1]}
          </a>
        </bdi>
      );
    }

    // Bold: **text**
    const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {isolateMixedLanguageTokens(boldMatch[1], isRtlContext)}
        </strong>
      );
    }

    // Code: `code`
    const codeMatch = part.match(/^`(.*?)`$/);
    if (codeMatch) {
      return (
        <bdi key={index} dir="ltr" className="inline">
          <code className="px-1.5 py-0.5 text-xs rounded bg-card/60 border border-border font-mono text-primary bidi-isolate">
            {codeMatch[1]}
          </code>
        </bdi>
      );
    }

    return <React.Fragment key={index}>{isolateMixedLanguageTokens(part, isRtlContext)}</React.Fragment>;
  });
};

export const ChatMessageContent: React.FC<ChatMessageContentProps> = ({ text }) => {
  const sanitizedText = stripForbiddenCharacters(text);
  const rootIsRtl = hasRtlText(sanitizedText);
  const lines = sanitizedText.split("\n");

  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];
  let isNumberedList = false;
  let listIsRtl = false;

  const flushList = () => {
    if (currentList.length > 0) {
      const listDir = listIsRtl ? "rtl" : "ltr";
      const listAlignClass = listIsRtl ? "pr-5 text-right" : "pl-5 text-left";

      if (isNumberedList) {
        elements.push(
          <ol
            key={`ol-${elements.length}`}
            dir={listDir}
            className={`list-decimal list-outside ${listAlignClass} space-y-1.5 my-2 text-sm bidi-text`}
          >
            {currentList}
          </ol>
        );
      } else {
        elements.push(
          <ul
            key={`ul-${elements.length}`}
            dir={listDir}
            className={`list-disc list-outside ${listAlignClass} space-y-1.5 my-2 text-sm bidi-text`}
          >
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

    const isLineRtl = hasRtlText(trimmed);
    const lineDir = isLineRtl ? "rtl" : "ltr";
    const textAlignClass = isLineRtl ? "text-right" : "text-left";

    // Headings: ### Heading, ## Heading
    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h4
          key={`h4-${lineIdx}`}
          dir={lineDir}
          className={`font-bold text-sm sm:text-base text-foreground mt-2 mb-1 bidi-text ${textAlignClass}`}
        >
          {renderInlineTokens(trimmed.slice(4), isLineRtl)}
        </h4>
      );
      return;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h3
          key={`h3-${lineIdx}`}
          dir={lineDir}
          className={`font-bold text-sm sm:text-base text-primary mt-3 mb-1 bidi-text ${textAlignClass}`}
        >
          {renderInlineTokens(trimmed.slice(3), isLineRtl)}
        </h3>
      );
      return;
    }

    // Bullet items: - item, * item, • item
    const bulletMatch = trimmed.match(/^[-*•]\s+(.*)$/);
    if (bulletMatch) {
      if (isNumberedList) flushList();
      isNumberedList = false;
      listIsRtl = hasRtlText(bulletMatch[1]);
      const itemDir = listIsRtl ? "rtl" : "ltr";

      currentList.push(
        <li
          key={`li-${lineIdx}`}
          dir={itemDir}
          className={`leading-relaxed bidi-text ${listIsRtl ? "text-right" : "text-left"}`}
        >
          {renderInlineTokens(bulletMatch[1], listIsRtl)}
        </li>
      );
      return;
    }

    // Numbered list: 1. item, 2. item
    const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numberMatch) {
      if (!isNumberedList) flushList();
      isNumberedList = true;
      listIsRtl = hasRtlText(numberMatch[2]);
      const itemDir = listIsRtl ? "rtl" : "ltr";

      currentList.push(
        <li
          key={`li-${lineIdx}`}
          dir={itemDir}
          className={`leading-relaxed bidi-text ${listIsRtl ? "text-right" : "text-left"}`}
        >
          {renderInlineTokens(numberMatch[2], listIsRtl)}
        </li>
      );
      return;
    }

    // Standard paragraph
    flushList();
    elements.push(
      <p
        key={`p-${lineIdx}`}
        dir={lineDir}
        className={`leading-relaxed my-1.5 bidi-text ${textAlignClass}`}
      >
        {renderInlineTokens(trimmed, isLineRtl)}
      </p>
    );
  });

  flushList();

  return (
    <div
      dir={rootIsRtl ? "rtl" : "ltr"}
      className={`space-y-1 text-sm leading-relaxed bidi-text ${
        rootIsRtl ? "text-right" : "text-left"
      }`}
    >
      {elements}
    </div>
  );
};

export default ChatMessageContent;
