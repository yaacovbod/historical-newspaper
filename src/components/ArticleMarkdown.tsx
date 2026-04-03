'use client'

import ReactMarkdown from 'react-markdown'

export default function ArticleMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1a0f08', lineHeight: 1.3, marginBottom: '0.5rem' }}>{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#4a2e1a', marginTop: '0.25rem', marginBottom: '1rem', fontStyle: 'italic' }}>{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#2c1810', marginTop: '1.2rem', marginBottom: '0.4rem' }}>{children}</h3>
        ),
        p: ({ children }) => <p style={{ marginBottom: '0.9rem' }}>{children}</p>,
        strong: ({ children }) => <strong style={{ fontWeight: 700, color: '#1a0f08' }}>{children}</strong>,
        hr: () => <hr style={{ border: 'none', borderTop: '1px solid #c4b99a', margin: '1.5rem 0' }} />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
