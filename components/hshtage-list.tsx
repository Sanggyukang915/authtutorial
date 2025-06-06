import React from 'react'

const BLOCKED_TAGS = ['#include', '#define', '#ifdef', '#endif', '#pragma'];

function extractHashtagsFromHTMLString(html: string): string[] {
  const text = html.split(/<[^>]*>/g).map(s => s.trim()).filter(Boolean)

  const hashtags = new Set<string>()

  for (const ctx of text) {
    const matches = ctx.match(/#\w+/g)

    if (matches) {
      matches.forEach(tag => {
        if (!BLOCKED_TAGS.includes(tag)) {
          hashtags.add(tag);
        }
      })
    }
  }

  return Array.from(hashtags)
}

export function HashtagList({ doc }: { doc: { content: { content: string }[] } }) {
  const allTags = doc.content
    .flatMap(ctx => extractHashtagsFromHTMLString(ctx.content))
    .filter((tag, index, self) => self.indexOf(tag) === index);

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {allTags.map((tag, index) => (
        <span
          key={index}
          className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
