/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return (
    <style jsx global>{`
      body {
        background-color: #f7f9fe;
        color: #0f172a;
      }

      #theme-heo #announcement-content .notion {
        color: white;
      }

      ::-webkit-scrollbar-thumb {
        background: rgba(60, 60, 67, 0.4);
        border-radius: 8px;
        cursor: pointer;
      }

      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      #more {
        white-space: nowrap;
      }

      .today-card-cover {
        -webkit-mask-image: linear-gradient(to top, transparent 5%, black 70%);
        mask-image: linear-gradient(to top, transparent 5%, black 70%);
      }

      .recent-top-post-group::-webkit-scrollbar {
        display: none;
      }

      .scroll-hidden::-webkit-scrollbar {
        display: none;
      }

      * {
        box-sizing: border-box;
      }

      .tags-group-wrapper {
        animation: rowup 60s linear infinite;
      }

      #theme-heo #post-outer-wrapper > section,
      #theme-heo #post-outer-wrapper > div,
      #theme-heo .evidence-digest,
      #theme-heo #sideRight .card {
        backdrop-filter: saturate(1.02);
      }

      #theme-heo #article-wrapper .notion {
        font-size: 1rem;
        line-height: 1.9;
        color: #1f2937;
      }

      #theme-heo #article-wrapper .notion h1,
      #theme-heo #article-wrapper .notion h2,
      #theme-heo #article-wrapper .notion h3 {
        letter-spacing: -0.01em;
        color: #0f172a;
      }

      #theme-heo #article-wrapper .notion h2 {
        margin-top: 2.5rem;
        padding-top: 0.25rem;
        border-top: 1px solid rgba(148, 163, 184, 0.18);
      }

      #theme-heo #article-wrapper .notion blockquote {
        margin: 1.5rem 0;
        border-left: 3px solid #94a3b8;
        background: rgba(248, 250, 252, 0.92);
        border-radius: 0 14px 14px 0;
        padding: 1rem 1.1rem;
      }

      #theme-heo #article-wrapper .notion pre {
        border: 1px solid rgba(148, 163, 184, 0.18);
        border-radius: 16px;
        box-shadow: none;
      }

      #theme-heo #article-wrapper .notion code {
        border-radius: 8px;
      }

      #theme-heo #article-wrapper .notion img,
      #theme-heo #article-wrapper .notion .notion-asset-wrapper img {
        border-radius: 18px;
        border: 1px solid rgba(148, 163, 184, 0.18);
        background: #ffffff;
      }

      #theme-heo #article-wrapper .notion ul,
      #theme-heo #article-wrapper .notion ol {
        padding-left: 1.2rem;
      }

      #theme-heo #article-wrapper .notion hr {
        border-color: rgba(148, 163, 184, 0.22);
      }

      #theme-heo .evidence-digest {
        border-radius: 20px;
      }

      @media (max-width: 768px) {
        #theme-heo #article-wrapper .notion {
          font-size: 0.96rem;
          line-height: 1.85;
        }

        #theme-heo #article-wrapper .notion h2 {
          margin-top: 2rem;
        }
      }

      @keyframes rowup {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-50%);
        }
      }
    `}</style>
  )
}

export { Style }
