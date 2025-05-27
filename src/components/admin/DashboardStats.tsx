import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { 
  MessageSquare, 
  Users, 
  FileText,
  UserCog,
  TrendingUp
} from "lucide-react";

type StatsType = {
  abalatCount: number;
  reportCount: number;
  pendingAbalatCount: number;
};

const DashboardStats = () => {
  const [stats, setStats] = useState<StatsType>({
    abalatCount: 0,
    reportCount: 0,
    pendingAbalatCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get abalat submissions count
        const { count: abalatCount, error: abalatError } = await supabase
          .from('abalat_mzgeba_submissions')
          .select('*', { count: 'exact', head: true });

        // Get pending abalat submissions count
        const { count: pendingAbalatCount, error: pendingAbalatError } = await supabase
          .from('abalat_mzgeba_submissions')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        // Get report submissions count
        const { count: reportCount, error: reportError } = await supabase
          .from('report_submissions')
          .select('*', { count: 'exact', head: true });

        if (abalatError || reportError || pendingAbalatError) {
          console.error("Error fetching stats:", { abalatError, reportError, pendingAbalatError });
          return;
        }

        setStats({
          abalatCount: abalatCount || 0,
          reportCount: reportCount || 0,
          pendingAbalatCount: pendingAbalatCount || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="animate-pulse bg-white/50 rounded-xl border border-gray-100 shadow-sm h-28">
            <div className="flex items-center p-6 h-full">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-6 w-12 bg-gray-200 rounded"></div>
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
      value: stats.abalatCount,
      icon: <Users className="text-white" size={20} />,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-100",
      increase: "8%"
    },
    {
      title: "አባላት በመጠባበቅ ላይ",
      value: stats.pendingAbalatCount,
      icon: <UserCog className="text-white" size={20} />,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
      borderColor: "border-amber-100",
      increase: "5%"
    },
    {
      title: "ሪፖርቶች",
      value: stats.reportCount,
      icon: <FileText className="text-white" size={20} />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-100",
      increase: "3%"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <Card 
          key={index} 
          className={`overflow-hidden rounded-xl border ${card.borderColor} shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-3px] ${card.bgColor}`}
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-sm`}>
                {card.icon}
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 border border-gray-100 shadow-sm">
                <TrendingUp size={14} className={card.textColor} />
                <span className={`text-xs font-semibold ${card.textColor}`}>{card.increase}</span>
              </div>
            </div>
            <h3 className="text-gray-700 text-sm font-medium mb-1">{card.title}</h3>
            <div className="flex items-baseline">
              <span className={`text-3xl font-bold ${card.textColor}`}>{card.value}</span>
              <span className="ml-2 text-xs text-gray-500 font-medium">ጠቅላላ</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
