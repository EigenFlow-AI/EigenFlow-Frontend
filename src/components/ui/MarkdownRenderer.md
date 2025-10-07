# MarkdownRenderer 组件使用指南

`MarkdownRenderer` 是一个可复用的 Markdown 渲染组件，支持多种配置选项和预设样式。

## 基本用法

```tsx
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

// 基础用法
<MarkdownRenderer content="# Hello World\nThis is **bold** text." />

// 自定义样式
<MarkdownRenderer
  content="Your markdown content here"
  className="custom-prose-class"
/>
```

## 配置选项

### Props

| 属性               | 类型                  | 默认值                                      | 描述                              |
| ------------------ | --------------------- | ------------------------------------------- | --------------------------------- |
| `content`          | `string`              | -                                           | 要渲染的 Markdown 内容            |
| `className`        | `string`              | `"prose prose-sm max-w-none text-gray-800"` | 自定义 CSS 类名                   |
| `enableMath`       | `boolean`             | `true`                                      | 是否启用数学公式支持              |
| `enableRawHtml`    | `boolean`             | `true`                                      | 是否启用原始 HTML 支持            |
| `enableGfm`        | `boolean`             | `true`                                      | 是否启用 GitHub Flavored Markdown |
| `customComponents` | `Record<string, any>` | `{}`                                        | 自定义组件覆盖                    |

### 功能开关

```tsx
// 仅基础 Markdown，无数学公式和 HTML
<MarkdownRenderer
  content="Simple **markdown** text"
  enableMath={false}
  enableRawHtml={false}
  enableGfm={false}
/>

// 完整功能
<MarkdownRenderer
  content="Complex content with $math$ and <div>HTML</div>"
  enableMath={true}
  enableRawHtml={true}
  enableGfm={true}
/>
```

## 预设组件

提供了几个便捷的预设组件：

### 1. 基础渲染器

```tsx
import { MarkdownRendererPresets } from "@/components/ui/MarkdownRenderer";

<MarkdownRendererPresets.basic("Simple **text**") />
```

### 2. 完整功能渲染器

```tsx
<MarkdownRendererPresets.full("Complex content with $math$") />
```

### 3. 报告渲染器

```tsx
<MarkdownRendererPresets.report("Report content here") />
```

### 4. 内联渲染器

```tsx
<MarkdownRendererPresets.inline("Inline **text**") />
```

## 自定义组件

可以覆盖默认的组件样式：

```tsx
<MarkdownRenderer
  content="Your content"
  customComponents={{
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-red-600 my-6">{children}</h1>
    ),
    p: ({ children }) => (
      <p className="text-lg text-blue-800 my-4">{children}</p>
    ),
  }}
/>
```

## 使用场景

### 1. 报告内容渲染

```tsx
// 在报告组件中使用
<div className="report-section">
  <MarkdownRenderer
    content={reportContent}
    className="prose prose-sm max-w-none text-gray-800"
  />
</div>
```

### 2. 聊天消息渲染

```tsx
// 在聊天组件中使用
<div className="message-content">
  <MarkdownRenderer
    content={message.text}
    className="prose prose-sm max-w-none"
    enableMath={false}
    enableRawHtml={false}
  />
</div>
```

### 3. 文档内容渲染

```tsx
// 在文档查看器中使用
<div className="document-viewer">
  <MarkdownRenderer
    content={documentContent}
    className="prose prose-lg max-w-4xl mx-auto"
  />
</div>
```

### 4. 内联文本渲染

```tsx
// 在表格或其他组件中内联使用
<span>
  Status: <MarkdownRendererPresets.inline("**Active**") />
</span>
```

## 样式定制

组件使用 Tailwind CSS 类，可以通过 `className` 属性进行定制：

```tsx
// 自定义样式
<MarkdownRenderer
  content="Content"
  className="prose prose-lg max-w-2xl mx-auto text-gray-900"
/>

// 深色主题
<MarkdownRenderer
  content="Content"
  className="prose prose-sm max-w-none text-gray-100 prose-invert"
/>
```

## 注意事项

1. 确保项目中已安装必要的依赖：

   - `react-markdown`
   - `rehype-raw`
   - `rehype-katex`
   - `remark-gfm`
   - `remark-math`

2. 数学公式需要引入 KaTeX 的 CSS：

   ```tsx
   import "katex/dist/katex.min.css";
   ```

3. 自定义组件时，确保保持组件的可访问性和响应式设计。

4. 对于大量内容，考虑使用虚拟滚动或分页来优化性能。
