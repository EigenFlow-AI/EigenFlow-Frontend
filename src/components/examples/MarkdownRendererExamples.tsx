import {
  MarkdownRenderer,
  MarkdownRendererPresets,
} from "@/components/ui/MarkdownRenderer";

// 示例内容
const basicContent = `
# 基础 Markdown 示例

这是一个**粗体**文本和*斜体*文本的示例。

- 列表项 1
- 列表项 2
- 列表项 3

[链接示例](https://example.com)
`;

const fullContent = `
# 完整功能示例

## 数学公式
行内公式：$E = mc^2$

块级公式：
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

## HTML 支持
<div style="background: #f0f0f0; padding: 10px; border-radius: 5px;">
  这是一个 HTML div 元素
</div>

## GitHub Flavored Markdown
- [x] 已完成的任务
- [ ] 未完成的任务

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`
`;

const reportContent = `
# 系统报告

## 状态概览
- **系统状态**: 正常
- **CPU 使用率**: 45%
- **内存使用率**: 67%

## 关键指标
| 指标 | 当前值 | 阈值 | 状态 |
|------|--------|------|------|
| 响应时间 | 120ms | <200ms | ✅ 正常 |
| 错误率 | 0.1% | <1% | ✅ 正常 |
| 吞吐量 | 1000 req/s | >800 req/s | ✅ 正常 |

## 建议
1. **监控内存使用**: 当前内存使用率较高，建议关注
2. **优化数据库查询**: 部分查询响应时间较长
`;

const inlineContent = "这是一个**内联**的 Markdown 文本";

export function MarkdownRendererExamples() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        MarkdownRenderer 使用示例
      </h1>

      {/* 基础渲染器示例 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          1. 基础渲染器 (basic)
        </h2>
        <p className="text-gray-600">
          适用于简单文本，不支持数学公式、HTML 和 GitHub Flavored Markdown
        </p>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">代码示例:</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
            {`import { MarkdownRendererPresets } from "@/components/ui/MarkdownRenderer";

<MarkdownRendererPresets.basic(content, "custom-class") />`}
          </pre>
          <h3 className="text-lg font-medium text-gray-900 mb-3 mt-4">
            渲染结果:
          </h3>
          <div className="border border-gray-200 rounded p-4">
            {MarkdownRendererPresets.basic(basicContent)}
          </div>
        </div>
      </section>

      {/* 完整功能渲染器示例 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          2. 完整功能渲染器 (full)
        </h2>
        <p className="text-gray-600">
          支持所有功能：数学公式、HTML、GitHub Flavored Markdown
        </p>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">代码示例:</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
            {`import { MarkdownRendererPresets } from "@/components/ui/MarkdownRenderer";

<MarkdownRendererPresets.full(content, "custom-class") />`}
          </pre>
          <h3 className="text-lg font-medium text-gray-900 mb-3 mt-4">
            渲染结果:
          </h3>
          <div className="border border-gray-200 rounded p-4">
            {MarkdownRendererPresets.full(fullContent)}
          </div>
        </div>
      </section>

      {/* 报告渲染器示例 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          3. 报告渲染器 (report)
        </h2>
        <p className="text-gray-600">
          专为报告内容设计，支持所有功能，使用报告样式
        </p>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">代码示例:</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
            {`import { MarkdownRendererPresets } from "@/components/ui/MarkdownRenderer";

<MarkdownRendererPresets.report(content, "custom-class") />`}
          </pre>
          <h3 className="text-lg font-medium text-gray-900 mb-3 mt-4">
            渲染结果:
          </h3>
          <div className="border border-gray-200 rounded p-4">
            {MarkdownRendererPresets.report(reportContent)}
          </div>
        </div>
      </section>

      {/* 内联渲染器示例 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          4. 内联渲染器 (inline)
        </h2>
        <p className="text-gray-600">适用于单行或简单内容，内联显示</p>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">代码示例:</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
            {`import { MarkdownRendererPresets } from "@/components/ui/MarkdownRenderer";

<span>
  状态: <MarkdownRendererPresets.inline("**Active**") />
</span>`}
          </pre>
          <h3 className="text-lg font-medium text-gray-900 mb-3 mt-4">
            渲染结果:
          </h3>
          <div className="border border-gray-200 rounded p-4">
            <p className="text-gray-700">
              系统状态: {MarkdownRendererPresets.inline(inlineContent)}
            </p>
          </div>
        </div>
      </section>

      {/* 自定义配置示例 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">5. 自定义配置</h2>
        <p className="text-gray-600">
          直接使用 MarkdownRenderer 组件进行自定义配置
        </p>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">代码示例:</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
            {`import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

<MarkdownRenderer
  content={content}
  className="prose prose-lg max-w-2xl mx-auto"
  enableMath={true}
  enableRawHtml={false}
  enableGfm={true}
  customComponents={{
    h1: ({ children, ...props }) => (
      <h1 className="text-3xl font-bold text-red-600 my-6" {...props}>
        {children}
      </h1>
    ),
  }}
/>`}
          </pre>
          <h3 className="text-lg font-medium text-gray-900 mb-3 mt-4">
            渲染结果:
          </h3>
          <div className="border border-gray-200 rounded p-4">
            <MarkdownRenderer
              content={basicContent}
              className="prose prose-lg max-w-2xl mx-auto"
              enableMath={false}
              enableRawHtml={false}
              enableGfm={true}
              customComponents={{
                h1: ({ children, ...props }) => (
                  <h1
                    className="text-3xl font-bold text-red-600 my-6"
                    {...props}>
                    {children}
                  </h1>
                ),
              }}
            />
          </div>
        </div>
      </section>

      {/* 使用场景示例 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          6. 实际使用场景
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">聊天消息</h3>
            <div className="bg-gray-50 p-3 rounded">
              <MarkdownRenderer
                content="用户发送了一个**重要**消息，包含 [链接](https://example.com)"
                className="prose prose-sm max-w-none"
                enableMath={false}
                enableRawHtml={false}
                enableGfm={false}
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">技术文档</h3>
            <div className="bg-gray-50 p-3 rounded">
              <MarkdownRenderer
                content={`
# API 文档

## 端点
\`GET /api/users\`

返回用户列表，支持分页参数。

**参数:**
- \`page\`: 页码 (默认: 1)
- \`limit\`: 每页数量 (默认: 10)
                `}
                className="prose prose-sm max-w-none"
                enableMath={false}
                enableRawHtml={false}
                enableGfm={true}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
