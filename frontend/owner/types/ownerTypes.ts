export type CustomerStatus = "active" | "trial" | "expired" | "suspended";
export type CustomerPlan = "Enterprise" | "Professional" | "Business" | "Basic" | "Trial";
export type HealthScore = "Healthy" | "Warning" | "Critical" | "Offline";
export type ServiceStatus = "healthy" | "warning" | "down";

export interface Customer {
  id: string;
  name: string;
  logo: string;
  plan: CustomerPlan;
  status: CustomerStatus;
  sites: number;
  healthySites: number;
  offlineSites: number;
  users: number;
  health: HealthScore;
  uptime: number;
  mrr: number;
  arr: number;
  region: string;
  circle: string;
  riskScore: number;
  joinDate: string;
  renewalDate: string;
  devices: number;
  alarms: { critical: number; major: number; minor: number };
  invoiceDue: number;
}

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  type: string;
  status: "active" | "inactive" | "suspended";
  contractStart: string;
  contractEnd: string;
  assignedSites: number;
  activeTickets: number;
  slaCompliance: number;
  rating: number;
}

export interface Invoice {
  id: string;
  customerId: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  date: string;
  dueDate: string;
}

export interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  target: string;
  timestamp: string;
  ip: string;
  status: "success" | "failed";
}
