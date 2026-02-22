"use client";
import { useState } from "react";
import Link from "next/link";
import { LetterTemplate as LetterTemplateType } from "@/data/templates";

export function LetterTemplate({ template }: { template: LetterTemplateType }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(template.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <article className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold text-[var(--color-navy)]">
        {template.title}
      </h3>
      <p className="text-gray-600 mt-2">{template.description}</p>

      <div className="mt-4 bg-gray-50 rounded p-4 text-sm space-y-1">
        <p>
          <span className="font-medium">To:</span>{" "}
          {template.recipientSlug ? (
            <Link
              href={`/accountability/${template.recipientSlug}`}
              className="text-[var(--color-red-accent)] hover:underline"
            >
              {template.recipientName}
            </Link>
          ) : (
            template.recipientName
          )}
          , {template.recipientTitle}
        </p>
        <p className="whitespace-pre-line text-gray-500">
          {template.recipientAddress}
        </p>
        {template.ccList.length > 0 && (
          <p className="mt-2">
            <span className="font-medium">CC:</span>{" "}
            {template.ccList.join(", ")}
          </p>
        )}
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-medium text-[var(--color-red-accent)]">
          View and copy letter template
        </summary>
        <div className="mt-4">
          <pre className="bg-gray-50 border border-gray-200 rounded p-4 text-sm text-gray-700 whitespace-pre-wrap font-sans">
            {template.body}
          </pre>
          <button
            onClick={handleCopy}
            className="mt-3 bg-[var(--color-navy)] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[var(--color-navy-light)] transition-colors"
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </details>
    </article>
  );
}
