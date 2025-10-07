import { CheckCircle, AlertTriangle, XCircle, BarChart3 } from "lucide-react";
import {
  MarkdownRenderer,
  MarkdownRendererPresets,
} from "@/components/ui/MarkdownRenderer";

interface StructuredReportRendererProps {
  content: string;
}

export function StructuredReportRenderer({
  content,
}: StructuredReportRendererProps) {
  // 将单个换行转换为 Markdown 硬换行，保证按行渲染
  const toHardBreaks = (text: string) => text.replace(/\n/g, "  \n");
  // 预处理优先建议文本：为每个 Pn 段落添加空行，并将标签转为加粗的列表项
  const preprocessRecommendations = (text: string) => {
    let s = text.trim();
    // 在以 P0/P1/P2 开头的行前插入一个空行
    s = s.replace(/(^|\n)(P\d+\s*\([^\n]*\)\s*-?)/g, "$1\n$2");
    // 将标签转为加粗的列表项
    s = s.replace(/^\s*动作\s*:/gm, "- **动作**:");
    s = s.replace(/^\s*预期影响\s*:/gm, "- **预期影响**:");
    s = s.replace(/^\s*理由\s*:/gm, "- **理由**:");
    return s;
  };
  // 解析报告内容
  const parseReport = (text: string) => {
    const sections: { [key: string]: string } = {};
    const lines = text.split("\n");
    let currentSection = "";
    let currentContent: string[] = [];

    for (const line of lines) {
      if (line.startsWith("<HEALTH_STATUS>")) {
        currentSection = "health_status";
        currentContent = [
          line
            .replace("<HEALTH_STATUS>", "")
            .replace("</HEALTH_STATUS>", "")
            .trim(),
        ];
      } else if (line.startsWith("<SUMMARY_METRICS>")) {
        currentSection = "summary_metrics";
        currentContent = [];
      } else if (line.startsWith("<CRITICAL_ALERTS>")) {
        currentSection = "critical_alerts";
        currentContent = [];
      } else if (line.startsWith("<PRIORITY_RECOMMENDATIONS>")) {
        currentSection = "priority_recommendations";
        currentContent = [];
      } else if (line.startsWith("<DETAILED_ANALYSIS>")) {
        currentSection = "detailed_analysis";
        currentContent = [];
      } else if (line.startsWith("</")) {
        if (currentSection) {
          sections[currentSection] = currentContent.join("\n");
          currentSection = "";
          currentContent = [];
        }
      } else if (currentSection && line.trim()) {
        currentContent.push(line);
      }
    }

    return sections;
  };

  const sections = parseReport(content);

  const getHealthStatusIcon = (status: string) => {
    if (status.includes("OK"))
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status.includes("WARN"))
      return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

  const getHealthStatusColor = (status: string) => {
    if (status.includes("OK"))
      return "bg-green-100 text-green-800 border-green-200";
    if (status.includes("WARN"))
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const parseMetrics = (metricsText: string) => {
    const items: Array<{ label: string; value: string }> = [];
    const lines = metricsText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    for (const line of lines) {
      if (line.startsWith("- ")) {
        const content = line.slice(2);
        const sep = content.indexOf(":");
        if (sep !== -1) {
          const label = content.slice(0, sep).trim().replace(/：$/, "");
          const value = content
            .slice(sep + 1)
            .trim()
            .replace(/^：/, "");
          items.push({ label, value });
        } else {
          items.push({ label: content, value: "" });
        }
      }
    }
    return items;
  };

  // 优先建议直接使用 Markdown 渲染，无需复杂解析

  const metrics = sections.summary_metrics
    ? parseMetrics(sections.summary_metrics)
    : [];

  return (
    <div className="space-y-6">
      {/* Health Status */}
      {sections.health_status && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            {getHealthStatusIcon(sections.health_status)}
            <h3 className="text-lg font-semibold text-gray-900">
              系统健康状态
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getHealthStatusColor(
                sections.health_status
              )}`}>
              {sections.health_status.includes("OK")
                ? "正常"
                : sections.health_status.includes("WARN")
                ? "警告"
                : "异常"}
            </span>
          </div>
          <p className="text-gray-700">{sections.health_status}</p>
        </div>
      )}

      {/* Summary Metrics (简化通用渲染) */}
      {metrics.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">关键指标</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-gray-50 rounded-md p-3 border border-gray-100">
                <span className="text-sm text-gray-600">{m.label}</span>
                <span className="text-base font-semibold text-gray-900">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Critical Alerts - 直接渲染 Markdown */}
      {sections.critical_alerts && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">关键警报</h3>
          </div>
          {MarkdownRendererPresets.report(
            toHardBreaks(sections.critical_alerts)
          )}
        </div>
      )}

      {/* Priority Recommendations - 直接渲染 Markdown */}
      {sections.priority_recommendations && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">优先建议</h3>
          </div>
          {MarkdownRendererPresets.full(
            toHardBreaks(
              preprocessRecommendations(sections.priority_recommendations)
            )
          )}
        </div>
      )}

      {/* Detailed Analysis */}
      {sections.detailed_analysis && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">详细分析</h3>
          </div>
          <MarkdownRenderer
            content={toHardBreaks(sections.detailed_analysis)}
            className="text-gray-700 text-sm leading-relaxed"
            enableMath={true}
            enableRawHtml={true}
            enableGfm={true}
          />
        </div>
      )}
    </div>
  );
}
