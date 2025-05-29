import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  FileText, 
  Users, 
  UserCog,
  TrendingUp,
  BarChart3,
  ArrowUpRight,
  Eye,
  CheckCircle,
  ArrowDownRight
} from "lucide-react";
import { motion } from "framer-motion";
import { fetchDashboardStats } from "@/lib/dashboardData";
import { DashboardStats as DashboardStatsType } from "@/types/dashboardTypes";

const DashboardStats = () => {
  const [stats, setStats] = useState<DashboardStatsType>({
    totalMembers: 0,
    pendingMembers: 0,
    approvedMembers: 0,
    reportCount: 0,
    todayVisits: 0,
    totalMembersChange: 0,
    pendingMembersChange: 0,
    approvedMembersChange: 0,
    reportCountChange: 0,
    todayVisitsChange: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      try {
        const dashboardStats = await fetchDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, index) => (
          <Card key={index} className="animate-pulse bg-white/50 rounded-xl border border-gray-100 shadow-sm h-28">
            <div className="p-4 h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
                <div className="w-12 h-5 rounded-full bg-gray-200"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "አባላት ምዝገባ",
      value: stats.totalMembers,
      icon: <Users className="text-white" size={18} />,
      chartIcon: <BarChart3 size={35} className="opacity-10" />,
      color: "from-brand-blue to-blue-600",
      bgColor: "bg-gradient-to-br from-white to-blue-50",
      textColor: "text-brand-blue",
      borderColor: "border-blue-100",
      change: stats.totalMembersChange,
      delay: 0.1
    },
    {
      title: "በመጠባበቅ ላይ",
      value: stats.pendingMembers,
      icon: <UserCog className="text-white" size={18} />,
      chartIcon: <BarChart3 size={35} className="opacity-10" />,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-gradient-to-br from-white to-amber-50",
      textColor: "text-amber-600",
      borderColor: "border-amber-100",
      change: stats.pendingMembersChange,
      delay: 0.2
    },
    {
      title: "የተፈቀዱ አባላት",
      value: stats.approvedMembers,
      icon: <CheckCircle className="text-white" size={18} />,
      chartIcon: <BarChart3 size={35} className="opacity-10" />,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-gradient-to-br from-white to-emerald-50",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-100",
      change: stats.approvedMembersChange,
      delay: 0.25
    },
    {
      title: "ሪፖርቶች",
      value: stats.reportCount,
      icon: <FileText className="text-white" size={18} />,
      chartIcon: <BarChart3 size={35} className="opacity-10" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-white to-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-100",
      change: stats.reportCountChange,
      delay: 0.3
    },
    {
      title: "የዛሬ ጉብኝቶች",
      value: stats.todayVisits,
      icon: <Eye className="text-white" size={18} />,
      chartIcon: <TrendingUp size={35} className="opacity-10" />,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-gradient-to-br from-white to-cyan-50",
      textColor: "text-cyan-600",
      borderColor: "border-cyan-100",
      change: stats.todayVisitsChange,
      delay: 0.35
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {statCards.map((card, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: card.delay }}
          key={index}
          className="h-full"
        >
          <Card 
            className={`overflow-hidden rounded-xl border ${card.borderColor} shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] ${card.bgColor} group h-full`}
          >
            <div className="p-4 relative h-full flex flex-col">
              <div className="absolute right-2 bottom-2 transform transition-all duration-300 opacity-20 group-hover:opacity-30">
                {card.chartIcon}
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center shadow-sm transform transition-all duration-300 group-hover:rotate-3 group-hover:scale-110`}>
                  {card.icon}
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full bg-white shadow-sm border ${card.change >= 0 ? 'border-green-100' : 'border-red-100'}`}>
                  {card.change >= 0 ? (
                    <ArrowUpRight size={12} className="text-green-500" />
                  ) : (
                    <ArrowDownRight size={12} className="text-red-500" />
                  )}
                  <span className={`text-xs font-medium ${card.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(card.change)}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-1 mb-auto">
                <h3 className="text-gray-700 text-xs font-medium">{card.title}</h3>
                <div className="flex items-baseline">
                  <span className={`text-xl font-bold ${card.textColor}`}>{card.value}</span>
                  <span className="ml-1.5 text-[10px] text-gray-500 font-medium">ጠቅላላ</span>
                </div>
              </div>
              
              <div className="mt-3 pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-500">ዛሬ</span>
                  <div className="bg-white w-full mx-1.5 h-1 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(Math.max(30, card.value * 2), 100)}%` }}
                      transition={{ duration: 1, delay: card.delay + 0.3 }}
                      className={`h-full rounded-full bg-gradient-to-r ${card.color}`}
                    />
                  </div>
                  <span className={`text-[10px] font-medium ${card.textColor}`}>{Math.min(Math.max(30, card.value * 2), 100)}%</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
