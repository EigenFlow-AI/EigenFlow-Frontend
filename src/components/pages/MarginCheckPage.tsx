import React from "react";
import { MarginHealthCard, LPMarginTable } from "../lp-margin";
import { marginHealthData, lpData } from "../../data/mockData";

export function MarginCheckPage() {
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Margin Check Tools
        </h2>
        <p className="text-gray-600">
          Advanced margin analysis and risk assessment tools
        </p>
      </div>

      {/* Margin Health Card */}
      <MarginHealthCard {...marginHealthData} />

      {/* LP Margin Table */}
      <LPMarginTable
        lps={lpData.map((lp) => ({
          name: lp.id,
          marginLevel: lp.marginLevel,
          equity: 100000, // Default equity value
          marginUsed: lp.marginLevel * 1000, // Calculate margin used
          status: lp.status as "warn" | "ok" | "critical",
        }))}
      />
    </>
  );
}
