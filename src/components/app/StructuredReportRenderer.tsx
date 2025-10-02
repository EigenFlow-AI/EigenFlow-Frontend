import ReactMarkdown from "react-markdown";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  DollarSign,
  Users,
  BarChart3,
} from "lucide-react";

interface StructuredReportRendererProps {
  content: string;
}

export function StructuredReportRenderer({
  content,
}: StructuredReportRendererProps) {
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
    const metrics: { [key: string]: string } = {};
    const lines = metricsText.split("\n").filter((line) => line.trim());

    for (const line of lines) {
      if (line.includes("平均保证金水平")) {
        metrics.avgMarginLevel = line.split("：")[1]?.trim() || "";
      } else if (line.includes("LP总数")) {
        metrics.lpCount = line.split("：")[1]?.trim() || "";
      } else if (line.includes("跨LP对冲可释放保证金总额")) {
        metrics.totalReleasableMargin = line.split("：")[1]?.trim() || "";
      } else if (line.includes("最高保证金使用率")) {
        metrics.maxMarginUsage = line.split("：")[1]?.trim() || "";
      }
    }

    return metrics;
  };

  const parseRecommendations = (recommendationsText: string) => {
    const recommendations: Array<{
      priority: string;
      title: string;
      action: string;
      impact: string;
      reason: string;
    }> = [];

    const lines = recommendationsText.split("\n");
    let currentRec: {
      priority: string;
      title: string;
      action: string;
      impact: string;
      reason: string;
    } = {
      priority: "",
      title: "",
      action: "",
      impact: "",
      reason: "",
    };

    for (const line of lines) {
      if (
        line.includes("**P0 (Critical)**") ||
        line.includes("**P1 (High)**") ||
        line.includes("**P2 (Medium)**")
      ) {
        if (currentRec.priority) {
          recommendations.push(currentRec);
        }
        currentRec = {
          priority: line.includes("Critical")
            ? "Critical"
            : line.includes("High")
            ? "High"
            : "Medium",
          title: "",
          action: "",
          impact: "",
          reason: "",
        };
      } else if (line.includes("**动作**")) {
        currentRec.action = line.split("**动作**")[1]?.trim() || "";
      } else if (line.includes("**预期影响**")) {
        currentRec.impact = line.split("**预期影响**")[1]?.trim() || "";
      } else if (line.includes("**理由**")) {
        currentRec.reason = line.split("**理由**")[1]?.trim() || "";
      } else if (line.includes("清理") && !currentRec.title) {
        currentRec.title = line.replace(/\*\*/g, "").trim();
      }
    }

    if (currentRec.priority) {
      recommendations.push(currentRec);
    }

    return recommendations;
  };

  const metrics = sections.summary_metrics
    ? parseMetrics(sections.summary_metrics)
    : {};
  const recommendations = sections.priority_recommendations
    ? parseRecommendations(sections.priority_recommendations)
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

      {/* Summary Metrics */}
      {Object.keys(metrics).length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">关键指标</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.avgMarginLevel && (
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    平均保证金水平
                  </span>
                </div>
                <div className="text-xl font-bold text-blue-900">
                  {metrics.avgMarginLevel}
                </div>
              </div>
            )}
            {metrics.lpCount && (
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    LP总数
                  </span>
                </div>
                <div className="text-xl font-bold text-green-900">
                  {metrics.lpCount}
                </div>
              </div>
            )}
            {metrics.totalReleasableMargin && (
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">
                    可释放保证金
                  </span>
                </div>
                <div className="text-xl font-bold text-purple-900">
                  {metrics.totalReleasableMargin}
                </div>
              </div>
            )}
            {metrics.maxMarginUsage && (
              <div className="bg-orange-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">
                    最高使用率
                  </span>
                </div>
                <div className="text-xl font-bold text-orange-900">
                  {metrics.maxMarginUsage}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Critical Alerts */}
      {sections.critical_alerts && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">关键警报</h3>
          </div>
          <div className="text-gray-700 whitespace-pre-line">
            {sections.critical_alerts}
          </div>
        </div>
      )}

      {/* Priority Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">优先建议</h3>
          </div>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      rec.priority === "Critical"
                        ? "bg-red-100 text-red-800"
                        : rec.priority === "High"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                    P{index + 1} ({rec.priority})
                  </span>
                  <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                </div>
                {rec.action && (
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      动作：
                    </span>
                    <span className="text-sm text-gray-800 ml-1">
                      {rec.action}
                    </span>
                  </div>
                )}
                {rec.impact && (
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      预期影响：
                    </span>
                    <span className="text-sm text-gray-800 ml-1">
                      {rec.impact}
                    </span>
                  </div>
                )}
                {rec.reason && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      理由：
                    </span>
                    <span className="text-sm text-gray-800 ml-1">
                      {rec.reason}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Analysis */}
      {sections.detailed_analysis && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">详细分析</h3>
          </div>
          <div className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none">
            <ReactMarkdown>{sections.detailed_analysis}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
