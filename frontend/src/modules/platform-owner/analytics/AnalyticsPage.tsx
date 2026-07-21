"use client";
import { useState } from "react";
import ReactECharts from "echarts-for-react";
import { OwnerSectionHeader } from "@/modules/platform-owner/components/OwnerSectionHeader";
import { OwnerMetricCard } from "@/modules/platform-owner/components/OwnerMetricCard";
import { revenueMonthly, alarmStats, deviceStats, aiInsights } from "../data/ownerMockData";
import { Zap, TrendingUp, Bell, Cpu, BarChart3 } from "lucide-react";

type Tab = "platform" | "revenue" | "alarms" | "devices" | "ai";

const COLORS = ["#6366F1", "#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#64748B"];

export function AnalyticsScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("platform");

  const tabs = [
    { id: "platform" as Tab, label: "Platform Analytics", icon: BarChart3 },
    { id: "revenue" as Tab, label: "Revenue Analytics", icon: TrendingUp },
    { id: "alarms" as Tab, label: "Alarm Analytics", icon: Bell },
    { id: "devices" as Tab, label: "Device Analytics", icon: Cpu },
    { id: "ai" as Tab, label: "AI Insights", icon: Zap },
  ];

  const revenueData = revenueMonthly.map((m) => ({ month: m.month, revenue: m.revenue / 100000, customers: m.customers }));
  const growthData = revenueMonthly.map((m) => ({ month: m.month, new: m.newCustomers, lost: Math.max(0, m.newCustomers - 3) }));

  const growthOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#fff',
      borderColor: '#E2E8F0',
      textStyle: { fontSize: 12, color: '#333' }
    },
    legend: { bottom: 0, textStyle: { fontSize: 11, color: '#64748B' } },
    grid: { top: 10, left: 0, right: 10, bottom: 30, containLabel: true },
    xAxis: {
      type: 'category',
      data: growthData.map(d => d.month),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#94A3B8', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { type: 'dashed', color: '#F1F5F9' } },
      axisLabel: { color: '#94A3B8', fontSize: 11 }
    },
    series: [
      {
        name: 'New Customers',
        type: 'bar',
        data: growthData.map(d => d.new),
        itemStyle: { color: '#6366F1', borderRadius: [4, 4, 0, 0] }
      },
      {
        name: 'Churned',
        type: 'bar',
        data: growthData.map(d => d.lost),
        itemStyle: { color: '#EF4444', borderRadius: [4, 4, 0, 0] }
      }
    ]
  };

  const revenueOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff',
      borderColor: '#E2E8F0',
      textStyle: { fontSize: 12, color: '#333' },
      formatter: (params: any) => `₹${params[0].value.toFixed(1)}L<br/>Revenue`
    },
    grid: { top: 10, left: 0, right: 10, bottom: 20, containLabel: true },
    xAxis: {
      type: 'category',
      data: revenueData.map(d => d.month),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#94A3B8', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { type: 'dashed', color: '#F1F5F9' } },
      axisLabel: { color: '#94A3B8', fontSize: 11, formatter: '₹{value}L' }
    },
    series: [
      {
        data: revenueData.map(d => d.revenue),
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#6366F1' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0.05, color: 'rgba(99,102,241,0.15)' },
              { offset: 0.95, color: 'rgba(99,102,241,0)' }
            ]
          }
        }
      }
    ]
  };

  const devicePieOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)', backgroundColor: '#fff', borderColor: '#E2E8F0', textStyle: { fontSize: 12 } },
    legend: { bottom: 0, textStyle: { fontSize: 11, color: '#64748B' } },
    series: [
      {
        type: 'pie',
        radius: ['50%', '80%'],
        avoidLabelOverlap: false,
        itemStyle: { borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        data: deviceStats.byType.map((d, i) => ({ value: d.count, name: d.type, itemStyle: { color: COLORS[i % COLORS.length] } }))
      }
    ]
  };

  return (
    <div className="space-y-5 pb-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-500 mt-0.5">Platform-wide analytics and intelligence</p>
      </div>

      {/* Tab Pills */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit overflow-x-auto" style={{ background: "#F1F5F9" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
            style={{ background: activeTab === t.id ? "#fff" : "transparent", color: activeTab === t.id ? "#6366F1" : "#64748B", boxShadow: activeTab === t.id ? "0 1px 4px rgba(0,0,0,0.06)" : "none" }}
          >
            <t.icon className="w-3.5 h-3.5" /> {t.label}
          </button>
        ))}
      </div>

      {/* Platform Analytics */}
      {activeTab === "platform" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Daily Active Users", value: "1,842", trend: "+12%", color: "#6366F1" },
              { label: "API Requests Today", value: "4.82M", trend: "+8%", color: "#8B5CF6" },
              { label: "Monthly Active Users", value: "18,420", trend: "+5%", color: "#10B981" },
            ].map((kpi) => (
              <OwnerMetricCard
                key={kpi.label}
                title={kpi.label}
                value={kpi.value}
                valueColor={kpi.color}
                subtext={`↑ ${kpi.trend} from last month`}
                subtextColor="#059669"
                className="bg-white p-5 rounded-2xl"
              />
            ))}
          </div>
          <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E2E8F0" }}>
            <h3 className="text-sm font-bold text-slate-800 mb-4">Customer Growth Trend</h3>
            <ReactECharts option={growthOption} style={{ height: 220, width: "100%" }} />
          </div>
        </div>
      )}

      {/* Revenue Analytics */}
      {activeTab === "revenue" && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "MRR", value: "₹1.82 Cr", trend: "+5.8%", color: "#6366F1" },
              { label: "ARR", value: "₹21.8 Cr", trend: "+5.8%", color: "#8B5CF6" },
              { label: "Pending Payments", value: "₹3.4L", trend: "2 overdue", color: "#EF4444" },
              { label: "Renewals This Month", value: "8", trend: "₹6.2L due", color: "#F59E0B" },
            ].map((kpi) => (
              <OwnerMetricCard
                key={kpi.label}
                title={kpi.label}
                value={kpi.value}
                valueColor={kpi.color}
                subtext={kpi.trend}
                subtextColor="#94A3B8"
                className="bg-white p-4 rounded-2xl"
                valueClassName="text-xl font-bold tabular-nums"
                titleClassName="text-xs text-slate-500 font-semibold mb-1"
                subtextClassName="text-[11px] font-semibold mt-0.5"
              />
            ))}
          </div>
          <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E2E8F0" }}>
            <h3 className="text-sm font-bold text-slate-800 mb-4">Monthly Revenue (₹ Lakhs)</h3>
            <ReactECharts option={revenueOption} style={{ height: 240, width: "100%" }} />
          </div>
          {/* Top Paying Customers */}
          <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E2E8F0" }}>
            <h3 className="text-sm font-bold text-slate-800 mb-4">Top Paying Customers</h3>
            <div className="space-y-2">
              {[
                { name: "Bharti Airtel", mrr: 1480000, plan: "Enterprise", pct: 100 },
                { name: "Reliance Jio", mrr: 1200000, plan: "Enterprise", pct: 81 },
                { name: "Vodafone Idea", mrr: 860000, plan: "Enterprise", pct: 58 },
                { name: "BSNL", mrr: 420000, plan: "Professional", pct: 28 },
                { name: "Tata Teleservices", mrr: 280000, plan: "Professional", pct: 19 },
              ].map((c, i) => (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-300 w-4 tabular-nums">#{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-700">{c.name}</span>
                      <span className="text-xs font-bold text-indigo-600">₹{(c.mrr / 100000).toFixed(1)}L/mo</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100">
                      <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: COLORS[i] }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Alarm Analytics */}
      {activeTab === "alarms" && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Critical", value: alarmStats.critical, color: "#EF4444", bg: "#FEF2F2" },
              { label: "Major", value: alarmStats.major, color: "#F59E0B", bg: "#FFFBEB" },
              { label: "Minor", value: alarmStats.minor, color: "#64748B", bg: "#F8FAFC" },
              { label: "Resolved", value: alarmStats.resolved, color: "#10B981", bg: "#ECFDF5" },
            ].map((s) => (
              <OwnerMetricCard
                key={s.label}
                title={`${s.label} Alarms`}
                value={s.value}
                valueColor={s.color}
                className="p-5 rounded-2xl"
                titleClassName="text-xs font-semibold"
                subtextClassName="hidden"
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E2E8F0" }}>
              <h3 className="text-sm font-bold text-slate-800 mb-4">Top Alarm Categories</h3>
              <div className="space-y-2">
                {alarmStats.topCategories.map((cat, i) => (
                  <div key={cat.name} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                    <div className="flex-1">
                      <div className="flex justify-between mb-0.5">
                        <span className="text-xs font-medium text-slate-600">{cat.name}</span>
                        <span className="text-xs font-bold text-slate-800">{cat.count}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100">
                        <div className="h-full rounded-full" style={{ width: `${cat.pct}%`, background: COLORS[i] }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E2E8F0" }}>
              <h3 className="text-sm font-bold text-slate-800 mb-4">Alarms by Region</h3>
              <div className="space-y-3">
                {alarmStats.byRegion.map((r) => (
                  <div key={r.region} className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-500 w-16">{r.region}</span>
                    <div className="flex items-center gap-1.5 flex-1">
                      <div className="h-5 rounded-sm" style={{ width: `${(r.critical / 25) * 100}%`, minWidth: 4, background: "#EF4444" }} title={`Critical: ${r.critical}`} />
                      <div className="h-5 rounded-sm" style={{ width: `${(r.major / 80) * 100}%`, minWidth: 4, background: "#F59E0B" }} title={`Major: ${r.major}`} />
                      <div className="h-5 rounded-sm" style={{ width: `${(r.minor / 150) * 100}%`, minWidth: 4, background: "#94A3B8" }} title={`Minor: ${r.minor}`} />
                    </div>
                    <span className="text-xs font-bold text-slate-500 tabular-nums">{r.critical + r.major + r.minor}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-400 font-semibold">
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-sm" />Critical</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 rounded-sm" />Major</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-slate-300 rounded-sm" />Minor</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Device Analytics */}
      {activeTab === "devices" && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Total Devices", value: deviceStats.total.toLocaleString(), color: "#6366F1" },
              { label: "Online", value: deviceStats.online.toLocaleString(), color: "#10B981" },
              { label: "Offline", value: deviceStats.offline.toLocaleString(), color: "#EF4444" },
              { label: "Warranty Expiring", value: deviceStats.warrantyExpiring.toLocaleString(), color: "#F59E0B" },
            ].map((s) => (
              <div key={s.label} className="bg-white p-4 rounded-2xl" style={{ border: "1px solid #E2E8F0" }}>
                <div className="text-xs text-slate-500 font-semibold mb-1">{s.label}</div>
                <div className="text-xl font-bold tabular-nums" style={{ color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E2E8F0" }}>
              <h3 className="text-sm font-bold text-slate-800 mb-4">Device Types</h3>
              <ReactECharts option={devicePieOption} style={{ height: 200, width: "100%" }} />
            </div>
            <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E2E8F0" }}>
              <h3 className="text-sm font-bold text-slate-800 mb-4">Firmware Distribution</h3>
              <div className="space-y-3">
                {deviceStats.firmwareVersions.map((v, i) => (
                  <div key={v.version}>
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <span className="font-medium text-slate-600">{v.version}</span>
                      <span className="font-bold text-slate-800">{v.count.toLocaleString()} ({v.pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div className="h-full rounded-full" style={{ width: `${v.pct}%`, background: COLORS[i] }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Insights */}
      {activeTab === "ai" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">Auto-generated by STMS Intelligence Engine · Last run: 6 minutes ago</p>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 cursor-pointer">
              <Zap className="w-3.5 h-3.5" /> Regenerate Insights
            </button>
          </div>
          {aiInsights.map((insight) => {
            const cfg = {
              critical: { bg: "#FEF2F2", border: "#FECACA", text: "#DC2626", labelBg: "#EF4444" },
              warning: { bg: "#FFFBEB", border: "#FDE68A", text: "#D97706", labelBg: "#F59E0B" },
              info: { bg: "#EFF6FF", border: "#BFDBFE", text: "#2563EB", labelBg: "#3B82F6" },
              positive: { bg: "#ECFDF5", border: "#A7F3D0", text: "#059669", labelBg: "#10B981" },
            }[insight.severity];
            return (
              <div
                key={insight.id}
                className="p-5 rounded-2xl"
                style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: cfg.labelBg }}>
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: cfg.labelBg }}>{insight.category}</span>
                      <span className="text-[11px] font-semibold text-slate-400">Confidence: {insight.confidence}%</span>
                    </div>
                    <div className="text-sm font-bold leading-snug" style={{ color: cfg.text }}>{insight.title}</div>
                    <div className="text-xs text-slate-600 mt-1.5 leading-relaxed">{insight.description}</div>
                    <div className="text-[11px] font-semibold mt-2" style={{ color: cfg.text }}>Affected: {insight.affectedEntities}</div>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">{new Date(insight.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
