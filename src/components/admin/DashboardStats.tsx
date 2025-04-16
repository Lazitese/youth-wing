
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

type StatsType = {
  qretaCount: number;
  abalatCount: number;
  reportCount: number;
  pendingAbalatCount: number;
};

const DashboardStats = () => {
  const [stats, setStats] = useState<StatsType>({
    qretaCount: 0,
    abalatCount: 0,
    reportCount: 0,
    pendingAbalatCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get qreta submissions count
        const { count: qretaCount, error: qretaError } = await supabase
          .from('qreta_submissions')
          .select('*', { count: 'exact', head: true });

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

        if (qretaError || abalatError || reportError || pendingAbalatError) {
          console.error("Error fetching stats:", { qretaError, abalatError, reportError, pendingAbalatError });
          return;
        }

        setStats({
          qretaCount: qretaCount || 0,
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
          <Card key={index} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-10 w-16 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-white shadow transition-transform hover:scale-105">
        <CardContent className="p-6">
          <CardDescription className="text-gray-500 mb-1">ጥቆማዎች</CardDescription>
          <CardTitle className="text-3xl font-bold text-gov-dark">{stats.qretaCount}</CardTitle>
        </CardContent>
      </Card>

      <Card className="bg-white shadow transition-transform hover:scale-105">
        <CardContent className="p-6">
          <CardDescription className="text-gray-500 mb-1">አባላት ምዝገባ (ጠቅላላ)</CardDescription>
          <CardTitle className="text-3xl font-bold text-gov-dark">{stats.abalatCount}</CardTitle>
        </CardContent>
      </Card>

      <Card className="bg-white shadow transition-transform hover:scale-105">
        <CardContent className="p-6">
          <CardDescription className="text-gray-500 mb-1">አባላት በመጠባበቅ ላይ</CardDescription>
          <CardTitle className="text-3xl font-bold text-gov-dark">{stats.pendingAbalatCount}</CardTitle>
        </CardContent>
      </Card>

      <Card className="bg-white shadow transition-transform hover:scale-105">
        <CardContent className="p-6">
          <CardDescription className="text-gray-500 mb-1">ሪፖርቶች</CardDescription>
          <CardTitle className="text-3xl font-bold text-gov-dark">{stats.reportCount}</CardTitle>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
