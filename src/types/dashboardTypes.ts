// Dashboard data types
export interface MemberGrowthData {
  date: string;
  count: number;
}

export interface AgeDistributionData {
  ageGroup: string;
  count: number;
  percentage: number;
}

export interface GenderDistributionData {
  gender: string;
  count: number;
  percentage: number;
}

export interface WeeklyActivityData {
  day: string;
  count: number;
}

export interface DashboardStats {
  totalMembers: number;
  pendingMembers: number;
  approvedMembers: number;
  reportCount: number;
  todayVisits: number;
  totalMembersChange: number;
  pendingMembersChange: number;
  approvedMembersChange: number;
  reportCountChange: number;
  todayVisitsChange: number;
}

export interface RecentActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
}

export interface UpcomingTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
} 