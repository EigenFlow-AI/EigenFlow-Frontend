import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LineChart,
  ResponsiveContainer,
  Treemap,
  Tooltip,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for charts
const bookFundData = [
  {
    date: "06-22",
    equityB: 800,
    equityBUSC: 600,
    equityS: 300,
    netDepositB: 50,
    netDepositBUSC: -20,
    netDepositS: 10,
    volumeB: 2.0,
    volumeBUSC: 1.5,
    volumeS: 0.8,
  },
  {
    date: "07-10",
    equityB: 750,
    equityBUSC: 550,
    equityS: 280,
    netDepositB: 30,
    netDepositBUSC: -10,
    netDepositS: 5,
    volumeB: 1.8,
    volumeBUSC: 1.2,
    volumeS: 0.6,
  },
  {
    date: "07-28",
    equityB: 820,
    equityBUSC: 580,
    equityS: 320,
    netDepositB: 40,
    netDepositBUSC: -30,
    netDepositS: 15,
    volumeB: 2.2,
    volumeBUSC: 1.4,
    volumeS: 0.9,
  },
  {
    date: "08-15",
    equityB: 780,
    equityBUSC: 520,
    equityS: 300,
    netDepositB: 20,
    netDepositBUSC: -40,
    netDepositS: 8,
    volumeB: 1.9,
    volumeBUSC: 1.1,
    volumeS: 0.7,
  },
  {
    date: "09-02",
    equityB: 850,
    equityBUSC: 620,
    equityS: 350,
    netDepositB: 60,
    netDepositBUSC: -15,
    netDepositS: 20,
    volumeB: 2.4,
    volumeBUSC: 1.6,
    volumeS: 1.0,
  },
  {
    date: "09-20",
    equityB: 800,
    equityBUSC: 580,
    equityS: 330,
    netDepositB: 45,
    netDepositBUSC: -25,
    netDepositS: 12,
    volumeB: 2.1,
    volumeBUSC: 1.3,
    volumeS: 0.85,
  },
];

const depositWithdrawalData = [
  { book: "B", deposit: 800, withdrawal: -200, netDeposit: 600 },
  { book: "B_slip", deposit: 100, withdrawal: -50, netDeposit: 50 },
  { book: "BUSC", deposit: 200, withdrawal: -150, netDeposit: 50 },
  { book: "BUSC_slip", deposit: 80, withdrawal: -60, netDeposit: 20 },
  { book: "S", deposit: 150, withdrawal: -100, netDeposit: 50 },
];

const dailyDepositData = [
  {
    date: "06-22",
    buscDeposit: 400,
    buscWithdrawal: -300,
    sDeposit: 200,
    sWithdrawal: -100,
  },
  {
    date: "07-10",
    buscDeposit: 300,
    buscWithdrawal: -200,
    sDeposit: 150,
    sWithdrawal: -80,
  },
  {
    date: "07-28",
    buscDeposit: 350,
    buscWithdrawal: -250,
    sDeposit: 180,
    sWithdrawal: -120,
  },
  {
    date: "08-15",
    buscDeposit: 280,
    buscWithdrawal: -180,
    sDeposit: 160,
    sWithdrawal: -90,
  },
  {
    date: "09-02",
    buscDeposit: 420,
    buscWithdrawal: -320,
    sDeposit: 220,
    sWithdrawal: -140,
  },
  {
    date: "09-20",
    buscDeposit: 380,
    buscWithdrawal: -280,
    sDeposit: 200,
    sWithdrawal: -110,
  },
];

const monthlyDepositData = [
  { month: "Nov", deposit: 1500, withdrawal: -500, netDeposit: 800 },
  { month: "Jan", deposit: 1300, withdrawal: -600, netDeposit: 700 },
  { month: "Mar", deposit: 1400, withdrawal: -550, netDeposit: 850 },
  { month: "May", deposit: 1200, withdrawal: -700, netDeposit: 500 },
  { month: "Jul", deposit: 1600, withdrawal: -480, netDeposit: 1120 },
  { month: "Sep", deposit: 1350, withdrawal: -650, netDeposit: 700 },
];

const volumeTreemapData = [
  { name: "B\nXAUUSD\n343.7", value: 343.7, fill: "#3b82f6" },
  { name: "B_slip\nXAUUSD\n205.37", value: 205.37, fill: "#fbbf24" },
  { name: "BUSC\nXAUUSD\n147.0", value: 147.0, fill: "#ef4444" },
  { name: "BUSC\nCAD\n50.0", value: 50.0, fill: "#10b981" },
  { name: "S\nDX.U25\n25.0", value: 25.0, fill: "#8b5cf6" },
];

// Custom Tooltip Component
interface TooltipEntry {
  name: string;
  value: number;
  color: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((entry: TooltipEntry, index: number) => (
          <p key={index} className="text-sm text-blue-600">
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Common Select Component
const SelectComponent = ({
  value,
  onChange,
  options,
  defaultValue,
  className = "w-[200px]",
  title = "Select option",
}: {
  value?: string;
  onChange?: (value: string) => void;
  options: { value: string; label: string }[];
  defaultValue?: string;
  className?: string;
  title?: string;
}) => (
  <select
    value={value || defaultValue}
    onChange={onChange ? (e) => onChange(e.target.value) : undefined}
    className={`${className} h-8 px-2 border border-gray-300 rounded text-sm`}
    title={title}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

// Book Fund Performance Chart
function BookFundPerformanceChart() {
  const [dateRange, setDateRange] = useState("2025/06/22 - 2025/09/21");

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Book Fund Performance
        </CardTitle>
        <div className="flex items-center gap-2 flex-wrap">
          <SelectComponent
            value={dateRange}
            onChange={setDateRange}
            options={[
              {
                value: "2025/06/22 - 2025/09/21",
                label: "2025/06/22 - 2025/09/21",
              },
            ]}
            className="w-[180px]"
          />
          <SelectComponent
            defaultValue="Server"
            options={[{ value: "Server", label: "Server" }]}
            className="w-[80px]"
          />
          <SelectComponent
            defaultValue="Book"
            options={[{ value: "Book", label: "Book" }]}
            className="w-[80px]"
          />
          <Button size="sm" className="h-8 px-3 bg-blue-600 hover:bg-blue-700">
            Load
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-6">
          {/* Equity Chart */}
          <div>
            <h4 className="text-sm font-medium mb-2 text-gray-600">
              Equity(USD)
            </h4>
            <div className="h-[140px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={bookFundData}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={10} />
                  <YAxis
                    tickFormatter={(value: number) => `${value}k`}
                    fontSize={10}
                    width={40}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    dataKey="equityB"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Area
                    dataKey="equityBUSC"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.6}
                  />
                  <Area
                    dataKey="equityS"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Net Deposit Chart */}
          <div>
            <h4 className="text-sm font-medium mb-2 text-gray-600">
              Net Deposit(USD)
            </h4>
            <div className="h-[120px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={bookFundData}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={10} />
                  <YAxis
                    domain={[-50, 100]}
                    tickFormatter={(value: number) => `${value}k`}
                    fontSize={10}
                    width={40}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    dataKey="netDepositB"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Area
                    dataKey="netDepositBUSC"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.6}
                  />
                  <Area
                    dataKey="netDepositS"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Volume Chart */}
          <div>
            <h4 className="text-sm font-medium mb-2 text-gray-600">
              Volume(USD)
            </h4>
            <div className="h-[120px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={bookFundData}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={10} />
                  <YAxis domain={[0, 3]} fontSize={10} width={40} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="volumeB" fill="#3b82f6" />
                  <Bar dataKey="volumeBUSC" fill="#ef4444" />
                  <Bar dataKey="volumeS" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Net PNL by Book Chart
function NetPNLChart() {
  return (
    <Card className="overflow-hidden h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Net PNL by Book
        </CardTitle>
        <div className="flex items-center gap-2 flex-wrap">
          <SelectComponent
            defaultValue="2025/09/21 - 2025/09/21"
            options={[
              {
                value: "2025/09/21 - 2025/09/21",
                label: "2025/09/21 - 2025/09/21",
              },
            ]}
            className="w-[180px]"
          />
          <SelectComponent
            defaultValue="Server"
            options={[{ value: "Server", label: "Server" }]}
            className="w-[80px]"
          />
          <SelectComponent
            defaultValue="Book"
            options={[{ value: "Book", label: "Book" }]}
            className="w-[80px]"
          />
          <Button size="sm" className="h-8 px-3 bg-blue-600 hover:bg-blue-700">
            Load
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-8 min-h-[300px]">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-600 mb-4">
            MT4 - B book Net PNL
          </h3>
          <div className="text-6xl font-bold text-blue-600">2.05</div>
        </div>
      </CardContent>
    </Card>
  );
}

// Deposit and Withdrawal by Book Chart
function DepositWithdrawalChart() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Deposit And Withdrawal by Book
        </CardTitle>
        <div className="flex items-center gap-2 flex-wrap">
          <SelectComponent
            defaultValue="2025/09/01 - 2025/09/21"
            options={[
              {
                value: "2025/09/01 - 2025/09/21",
                label: "2025/09/01 - 2025/09/21",
              },
            ]}
            className="w-[180px]"
          />
          <SelectComponent
            defaultValue="Server"
            options={[{ value: "Server", label: "Server" }]}
            className="w-[80px]"
          />
          <SelectComponent
            defaultValue="Book"
            options={[{ value: "Book", label: "Book" }]}
            className="w-[80px]"
          />
          <Button size="sm" className="h-8 px-3 bg-blue-600 hover:bg-blue-700">
            Load
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={depositWithdrawalData}
              layout="horizontal"
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                domain={[-400, 1000]}
                tickFormatter={(value: number) => `${value}k`}
                fontSize={11}
              />
              <YAxis type="category" dataKey="book" width={70} fontSize={11} />
              <Tooltip
                formatter={(value: number, name: string) => [`${value}k`, name]}
              />
              <Bar dataKey="deposit" fill="#3b82f6" name="DEPOSIT" />
              <Bar dataKey="withdrawal" fill="#fbbf24" name="WITHDRAWAL" />
              <Bar dataKey="netDeposit" fill="#ef4444" name="NET DEPOSIT" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Daily Deposit and Withdrawal Chart
function DailyDepositChart() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Daily Deposit And Withdrawal
        </CardTitle>
        <div className="flex items-center gap-2 flex-wrap">
          <SelectComponent
            defaultValue="2025/06/22 - 2025/09/21"
            options={[
              {
                value: "2025/06/22 - 2025/09/21",
                label: "2025/06/22 - 2025/09/21",
              },
            ]}
            className="w-[180px]"
          />
          <SelectComponent
            defaultValue="Server"
            options={[{ value: "Server", label: "Server" }]}
            className="w-[80px]"
          />
          <SelectComponent
            defaultValue="Book"
            options={[{ value: "Book", label: "Book" }]}
            className="w-[80px]"
          />
          <Button size="sm" className="h-8 px-3 bg-blue-600 hover:bg-blue-700">
            Load
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dailyDepositData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={11} />
              <YAxis
                domain={[-400, 500]}
                tickFormatter={(value: number) => `${value}k`}
                fontSize={11}
                width={45}
              />
              <Tooltip
                formatter={(value: number, name: string) => [`${value}k`, name]}
              />
              <Bar dataKey="buscDeposit" fill="#3b82f6" name="BUSC-Deposit" />
              <Bar
                dataKey="buscWithdrawal"
                fill="#fbbf24"
                name="BUSC-Withdrawal"
              />
              <Bar dataKey="sDeposit" fill="#ef4444" name="S-Deposit" />
              <Bar dataKey="sWithdrawal" fill="#10b981" name="S-Withdrawal" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Monthly Deposit and Withdrawal Chart
function MonthlyDepositChart() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Monthly Deposit And Withdrawal
        </CardTitle>
        <div className="flex items-center gap-2 flex-wrap">
          <SelectComponent
            defaultValue="2024/09/22 - 2025/09/22"
            options={[
              {
                value: "2024/09/22 - 2025/09/22",
                label: "2024/09/22 - 2025/09/22",
              },
            ]}
            className="w-[180px]"
          />
          <SelectComponent
            defaultValue="Server"
            options={[{ value: "Server", label: "Server" }]}
            className="w-[80px]"
          />
          <SelectComponent
            defaultValue="Book"
            options={[{ value: "Book", label: "Book" }]}
            className="w-[80px]"
          />
          <Button size="sm" className="h-8 px-3 bg-blue-600 hover:bg-blue-700">
            Load
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyDepositData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={11} />
              <YAxis
                domain={[-800, 1800]}
                tickFormatter={(value: number) => `${value / 1000}M`}
                fontSize={11}
                width={45}
              />
              <Tooltip
                formatter={(value: number, name: string) => [`${value}k`, name]}
              />
              <Line
                type="monotone"
                dataKey="deposit"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                name="DEPOSIT"
              />
              <Line
                type="monotone"
                dataKey="withdrawal"
                stroke="#fbbf24"
                strokeWidth={2}
                dot={{ fill: "#fbbf24", strokeWidth: 2, r: 4 }}
                name="WITHDRAWAL"
              />
              <Line
                type="monotone"
                dataKey="netDeposit"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                name="NET DEPOSIT"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Volume by Book & Symbol Treemap
function VolumeTreemapChart() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Volume by Book & Symbol
        </CardTitle>
        <div className="flex items-center gap-2 flex-wrap">
          <SelectComponent
            defaultValue="2025/09/01 - 2025/09/21"
            options={[
              {
                value: "2025/09/01 - 2025/09/21",
                label: "2025/09/01 - 2025/09/21",
              },
            ]}
            className="w-[180px]"
          />
          <SelectComponent
            defaultValue="Server"
            options={[{ value: "Server", label: "Server" }]}
            className="w-[80px]"
          />
          <SelectComponent
            defaultValue="Book"
            options={[{ value: "Book", label: "Book" }]}
            className="w-[80px]"
          />
          <Button size="sm" className="h-8 px-3 bg-blue-600 hover:bg-blue-700">
            Load
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap data={volumeTreemapData} dataKey="value" stroke="#fff" />
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center mt-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span>Volume</span>
            <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs">
              B
            </span>
            <span className="px-2 py-1 bg-gray-600 text-white rounded text-xs">
              XAUUSD
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Main Dashboard Page Component
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="space-y-6 p-4 md:p-6 max-w-[1800px] mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Trading Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor fund performance, PNL, deposits, and volume analytics
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {/* Top Row - Book Fund Performance spans 2 columns */}
          <div className="xl:col-span-2">
            <BookFundPerformanceChart />
          </div>
          <div>
            <NetPNLChart />
          </div>

          {/* Second Row */}
          <div>
            <DepositWithdrawalChart />
          </div>
          <div>
            <DailyDepositChart />
          </div>
          <div>
            <MonthlyDepositChart />
          </div>

          {/* Third Row - Volume Treemap spans full width */}
          <div className="xl:col-span-3">
            <VolumeTreemapChart />
          </div>
        </div>
      </div>
    </div>
  );
}
