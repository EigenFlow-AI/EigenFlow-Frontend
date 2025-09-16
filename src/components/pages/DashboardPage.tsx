import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Activity,
  AlertTriangle,
  TrendingUp,
  Shield,
  FileText,
} from "lucide-react";
import { AIChatArea } from "../ui/AIChatArea";
import { MarginCheckCard } from "../ui/MarginCheckCard";

export function DashboardPage() {
  const [selectedSuggestion, setSelectedSuggestion] = React.useState<string>();

  const suggestions = [
    "Need help with LP margin risk analysis",
    "Need advice on building automated margin monitoring",
    "How to optimize LP collateral management",
    "How to build real-time risk alerts system",
  ];

  const marginCheckFeatures = [
    {
      title: "Quick Check",
      description:
        "One-click check of all LP margin levels to quickly identify potential risks and exposure",
      status: "ok" as const,
      icon: Activity,
      value: "65%",
      buttonText: "Check Now",
    },
    {
      title: "Real-time Monitor",
      description:
        "Continuously monitor margin levels with instant alerts when thresholds are exceeded",
      status: "warn" as const,
      icon: AlertTriangle,
      value: "2 Warnings",
      buttonText: "View Details",
    },
    {
      title: "Cross Position Analysis",
      description:
        "Automatically detect cross-LP hedge positions and prioritize cleanup to free up margin",
      status: "ok" as const,
      icon: TrendingUp,
      value: "3 Crosses",
      buttonText: "Analyze Positions",
    },
    {
      title: "Smart Recommendations",
      description:
        "Generate intelligent suggestions based on SOP logic, including position transfers and funding",
      status: "ok" as const,
      icon: Shield,
      value: "5 Suggestions",
      buttonText: "View Recommendations",
    },
    {
      title: "Risk Report",
      description:
        "Generate detailed margin health reports with comprehensive analytics and PDF export",
      status: "ok" as const,
      icon: FileText,
      value: "Latest Report",
      buttonText: "Generate Report",
    },
  ];

  const handleSuggestionSelect = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
  };

  const handleSendMessage = (message: string) => {
    console.log("AI Message:", message);
  };

  // Handle margin check feature card click events
  const handleFeatureClick = (featureName: string) => {
    console.log(`${featureName} feature triggered`);
    // Add specific feature logic here
    switch (featureName) {
      case "Quick Check":
        console.log("Triggering quick margin check...");
        break;
      case "Real-time Monitor":
        console.log("Opening real-time monitor...");
        break;
      case "Cross Position Analysis":
        console.log("Analyzing cross positions...");
        break;
      case "Smart Recommendations":
        console.log("Generating smart recommendations...");
        break;
      case "Risk Report":
        console.log("Generating risk report...");
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          You have no upcoming sessions scheduled
        </p>
      </div>

      {/* AI Chat Area */}
      <div className="mb-6 sm:mb-8">
        <AIChatArea
          suggestions={suggestions}
          selectedSuggestion={selectedSuggestion}
          onSuggestionSelect={handleSuggestionSelect}
          onSendMessage={handleSendMessage}
        />
      </div>

      {/* Margin Check & Alerts */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            Margin Check & Risk Alerts
          </h3>
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
              title="Previous"
              aria-label="Previous">
              <ChevronLeft className="w-5 h-5 text-purple-600" />
            </button>
            <button
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
              title="Next"
              aria-label="Next">
              <ChevronRight className="w-5 h-5 text-purple-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {marginCheckFeatures.map((feature, index) => (
            <MarginCheckCard
              key={index}
              title={feature.title}
              description={feature.description}
              status={feature.status}
              icon={feature.icon}
              value={feature.value}
              buttonText={feature.buttonText}
              onButtonClick={() => handleFeatureClick(feature.title)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
