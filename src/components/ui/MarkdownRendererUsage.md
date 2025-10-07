# MarkdownRenderer 使用指南

## 快速开始

### 1. 基础用法

```tsx
import { MarkdownRenderer, MarkdownRendererPresets } from "@/components/ui/MarkdownRenderer";

// 使用预设组件（推荐）
<MarkdownRendererPresets.basic("简单的 **Markdown** 文本") />
<MarkdownRendererPresets.full("包含数学公式 $E=mc^2$ 的复杂内容") />
<MarkdownRendererPresets.report("报告内容") />
<MarkdownRendererPresets.inline("内联文本") />

// 直接使用组件
<MarkdownRenderer content="你的 Markdown 内容" />
```

## 预设组件详解

### 1. `basic` - 基础渲染器

- **适用场景**: 简单文本、用户输入、聊天消息
- **功能**: 仅支持基础 Markdown 语法
- **不支持**: 数学公式、HTML、GitHub Flavored Markdown

```tsx
<MarkdownRendererPresets.basic(`
# 标题
这是**粗体**和*斜体*文本
- 列表项 1
- 列表项 2
`) />
```

### 2. `full` - 完整功能渲染器

- **适用场景**: 技术文档、复杂内容、包含数学公式的内容
- **功能**: 支持所有功能
- **支持**: 数学公式、HTML、GitHub Flavored Markdown

```tsx
<MarkdownRendererPresets.full(`
# 技术文档

## 数学公式
行内公式：$E = mc^2$

块级公式：
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

## HTML 支持
<div style="background: #f0f0f0; padding: 10px;">
  HTML 内容
</div>

## 表格
| 列1 | 列2 |
|-----|-----|
| 数据1 | 数据2 |
`) />
```

### 3. `report` - 报告渲染器

- **适用场景**: 报告、分析文档、结构化内容
- **功能**: 与 `full` 相同，但使用报告专用样式
- **特点**: 优化的报告显示样式

```tsx
<MarkdownRendererPresets.report(`
# 系统报告

## 状态概览
- **系统状态**: 正常
- **CPU 使用率**: 45%

## 关键指标
| 指标 | 当前值 | 状态 |
|------|--------|------|
| 响应时间 | 120ms | ✅ 正常 |
`) />
```

### 4. `inline` - 内联渲染器

- **适用场景**: 单行文本、状态显示、表格内容
- **功能**: 基础 Markdown，内联显示
- **特点**: 不产生块级元素

```tsx
<span>
  状态: <MarkdownRendererPresets.inline("**Active**") />
</span>
```

## 自定义配置

### 直接使用 MarkdownRenderer 组件

```tsx
<MarkdownRenderer
  content="你的内容"
  className="custom-styles"
  enableMath={true} // 启用数学公式
  enableRawHtml={false} // 禁用 HTML
  enableGfm={true} // 启用 GitHub Flavored Markdown
  customComponents={{
    // 自定义组件样式
    h1: ({ children, ...props }) => (
      <h1 className="text-3xl font-bold text-red-600" {...props}>
        {children}
      </h1>
    ),
  }}
/>
```

### 配置选项说明

| 选项               | 类型                  | 默认值                                      | 说明                     |
| ------------------ | --------------------- | ------------------------------------------- | ------------------------ |
| `content`          | `string`              | -                                           | Markdown 内容            |
| `className`        | `string`              | `"prose prose-sm max-w-none text-gray-800"` | CSS 类名                 |
| `enableMath`       | `boolean`             | `true`                                      | 数学公式支持             |
| `enableRawHtml`    | `boolean`             | `true`                                      | HTML 支持                |
| `enableGfm`        | `boolean`             | `true`                                      | GitHub Flavored Markdown |
| `customComponents` | `Partial<Components>` | `{}`                                        | 自定义组件               |

## 实际使用场景

### 1. 聊天消息

```tsx
// 聊天组件中
<div className="message">
  <MarkdownRendererPresets.basic(message.text) />
</div>
```

### 2. 技术文档

```tsx
// 文档查看器
<div className="document">
  <MarkdownRendererPresets.full(documentContent) />
</div>
```

### 3. 报告显示

```tsx
// 报告组件
<div className="report">
  <MarkdownRendererPresets.report(reportContent) />
</div>
```

### 4. 状态显示

```tsx
// 状态指示器
<div className="status">
  当前状态: <MarkdownRendererPresets.inline("**运行中**") />
</div>
```

### 5. 表格内容

```tsx
// 表格单元格
<td>
  <MarkdownRendererPresets.inline("**重要** 信息") />
</td>
```

## 样式定制

### 使用 Tailwind CSS 类

```tsx
<MarkdownRenderer
  content="内容"
  className="prose prose-lg max-w-2xl mx-auto text-gray-900"
/>
```

### 深色主题

```tsx
<MarkdownRenderer
  content="内容"
  className="prose prose-sm max-w-none text-gray-100 prose-invert"
/>
```

### 自定义组件样式

```tsx
<MarkdownRenderer
  content="内容"
  customComponents={{
    h1: ({ children, ...props }) => (
      <h1
        className="text-4xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2"
        {...props}>
        {children}
      </h1>
    ),
    p: ({ children, ...props }) => (
      <p className="text-gray-700 leading-relaxed mb-4" {...props}>
        {children}
      </p>
    ),
  }}
/>
```

## 注意事项

1. **数学公式**: 需要引入 KaTeX CSS

   ```tsx
   import "katex/dist/katex.min.css";
   ```

2. **性能考虑**: 对于大量内容，考虑使用虚拟滚动

3. **安全性**: 启用 `enableRawHtml` 时注意 XSS 风险

4. **响应式**: 自定义样式时保持响应式设计

5. **可访问性**: 确保自定义组件保持可访问性
