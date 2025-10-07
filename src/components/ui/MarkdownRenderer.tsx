import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import gfm from "remark-gfm";
import remarkMath from "remark-math";
import type { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
  className?: string;
  enableMath?: boolean;
  enableRawHtml?: boolean;
  enableGfm?: boolean;
  customComponents?: Partial<Components>;
}

export function MarkdownRenderer({
  content,
  className = "prose prose-sm max-w-none text-gray-800",
  enableMath = true,
  enableRawHtml = true,
  enableGfm = true,
  customComponents,
}: MarkdownRendererProps) {
  // 默认的组件样式配置
  const defaultComponents: Components = {
    a: ({ href, children, ...props }) => (
      <a
        href={href}
        className="text-blue-600 underline hover:text-blue-800"
        {...props}>
        {children}
      </a>
    ),
    p: ({ children, ...props }) => (
      <p className="text-gray-700 my-2" {...props}>
        {children}
      </p>
    ),
    strong: ({ children, ...props }) => (
      <strong className="text-gray-700 mx-1 my-1 font-semibold" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="text-gray-600 italic" {...props}>
        {children}
      </em>
    ),
    h1: ({ children, ...props }) => (
      <h1 className="text-2xl font-bold text-gray-900 my-4" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-xl font-bold text-gray-900 my-3" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-lg font-semibold text-gray-900 my-2" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="text-base font-semibold text-gray-900 my-2" {...props}>
        {children}
      </h4>
    ),
    h5: ({ children, ...props }) => (
      <h5 className="text-sm font-semibold text-gray-900 my-1" {...props}>
        {children}
      </h5>
    ),
    h6: ({ children, ...props }) => (
      <h6 className="text-xs font-semibold text-gray-900 my-1" {...props}>
        {children}
      </h6>
    ),
    li: ({ children, ...props }) => (
      <li className="text-gray-700 my-1 ml-2" {...props}>
        {children}
      </li>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="text-gray-700 my-2 ml-4 list-decimal list-inside"
        {...props}>
        {children}
      </ol>
    ),
    ul: ({ children, ...props }) => (
      <ul className="text-gray-700 my-2 ml-4 list-disc list-inside" {...props}>
        {children}
      </ul>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-600"
        {...props}>
        {children}
      </blockquote>
    ),
    code: ({ children, className, ...props }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code
            className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono"
            {...props}>
            {children}
          </code>
        );
      }
      return (
        <code
          className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono block my-2"
          {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }) => (
      <pre
        className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto my-4"
        {...props}>
        {children}
      </pre>
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-4">
        <table
          className="min-w-full border border-gray-300 rounded-lg"
          {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-gray-50" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }) => (
      <tbody className="bg-white" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }) => (
      <tr className="border-b border-gray-200" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border-r border-gray-200"
        {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className="px-4 py-2 text-sm text-gray-700 border-r border-gray-200"
        {...props}>
        {children}
      </td>
    ),
    img: ({ src, alt, title, ...props }) => (
      <img
        src={src}
        alt={alt}
        title={title}
        className="my-4 max-w-full h-auto rounded-lg border border-gray-200"
        {...props}
      />
    ),
    hr: (props) => <hr className="my-6 border-gray-300" {...props} />,
  };

  // 合并自定义组件和默认组件
  const components: Components = { ...defaultComponents, ...customComponents };

  // 构建插件数组
  const rehypePlugins = [];
  const remarkPlugins = [];

  if (enableRawHtml) {
    rehypePlugins.push(rehypeRaw);
  }
  if (enableMath) {
    rehypePlugins.push(rehypeKatex);
    remarkPlugins.push(remarkMath);
  }
  if (enableGfm) {
    remarkPlugins.push(gfm);
  }

  return (
    <div className={className}>
      <ReactMarkdown
        rehypePlugins={rehypePlugins}
        remarkPlugins={remarkPlugins}
        components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

// 便捷的预设组件
// eslint-disable-next-line react-refresh/only-export-components
export const MarkdownRendererPresets = {
  // 基础渲染器，适用于简单文本
  basic: (content: string, className?: string) => (
    <MarkdownRenderer
      content={content}
      className={className}
      enableMath={false}
      enableRawHtml={false}
      enableGfm={false}
    />
  ),

  // 完整功能渲染器，适用于复杂内容
  full: (content: string, className?: string) => (
    <MarkdownRenderer
      content={content}
      className={className}
      enableMath={true}
      enableRawHtml={true}
      enableGfm={true}
    />
  ),

  // 报告渲染器，适用于报告内容
  report: (content: string, className?: string) => (
    <MarkdownRenderer
      content={content}
      className={className || "prose prose-sm max-w-none text-gray-800"}
      enableMath={true}
      enableRawHtml={true}
      enableGfm={true}
    />
  ),

  // 内联渲染器，适用于单行或简单内容
  inline: (content: string, className?: string) => (
    <MarkdownRenderer
      content={content}
      className={className || "inline"}
      enableMath={false}
      enableRawHtml={false}
      enableGfm={false}
    />
  ),
};
