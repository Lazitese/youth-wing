import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardStats from "@/components/admin/DashboardStats";
import BackgroundDecoration from "@/components/admin/BackgroundDecoration";
import { Session } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { 
  ArrowRight, 
  CalendarCheck, 
  Bell,
  Layers,
  Activity,
  TrendingUp,
  BarChart4,
  Users,
  ChevronDown
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from "recharts";
import { format, parseISO } from "date-fns";
import { 
  fetchMemberGrowthData,
  fetchAgeDistribution,
  fetchGenderDistribution,
  fetchWeeklyActivity,
  fetchRecentActivities,
  fetchUpcomingTasks
} from "@/lib/dashboardData";
import {
  MemberGrowthData,
  AgeDistributionData,
  GenderDistributionData,
  WeeklyActivityData,
  RecentActivity,
  UpcomingTask
} from "@/types/dashboardTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [growthPeriod, setGrowthPeriod] = useState<'week' | 'month' | 'year'>('month');
  
  // Data states
  const [memberGrowthData, setMemberGrowthData] = useState<MemberGrowthData[]>([]);
  const [ageDistribution, setAgeDistribution] = useState<AgeDistributionData[]>([]);
  const [genderDistribution, setGenderDistribution] = useState<GenderDistributionData[]>([]);
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivityData[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<UpcomingTask[]>([]);
  
  const COLORS = ['#1F8CD7', '#F9DC2F', '#4CAF50', '#FF5722'];
  
  useEffect(() => {
    document.title = "አስተዳዳሪ ዳሽቦርድ";
    
    const checkSession = async () => {
      // First, get the current session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (!session) {
        navigate('/admin/login');
        return;
      }
      
      // Verify admin status
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('email', session.user.email)
        .single();
      
      if (adminError || !adminData) {
        // Not an admin, sign out
        await supabase.auth.signOut();
        navigate('/admin/login');
        return;
      }
      
      setLoading(false);
    };
    
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (!session) {
          navigate('/admin/login');
        } else {
          // Verify admin status on auth change
          const { data: adminData, error: adminError } = await supabase
            .from('admins')
            .select('*')
            .eq('email', session.user.email)
            .single();
          
          if (adminError || !adminData) {
            await supabase.auth.signOut();
            navigate('/admin/login');
          }
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate]);
  
  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setDataLoading(true);
      try {
        // Fetch all data in parallel
        const [
          growthData,
          ageData,
          genderData,
          activityData,
          activities,
          tasks
        ] = await Promise.all([
          fetchMemberGrowthData(growthPeriod),
          fetchAgeDistribution(),
          fetchGenderDistribution(),
          fetchWeeklyActivity(),
          fetchRecentActivities(),
          fetchUpcomingTasks()
        ]);
        
        setMemberGrowthData(growthData);
        setAgeDistribution(ageData);
        setGenderDistribution(genderData);
        setWeeklyActivity(activityData);
        setRecentActivities(activities);
        setUpcomingTasks(tasks);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setDataLoading(false);
      }
    };
    
    if (!loading) {
      fetchDashboardData();
    }
  }, [loading, growthPeriod]);
  
  // Change growth period
  const handleGrowthPeriodChange = (period: 'week' | 'month' | 'year') => {
    setGrowthPeriod(period);
  };
  
  const formatDate = (dateStr: string) => {
    const date = parseISO(dateStr);
    return format(date, 'MMM dd');
  };
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-brand-blue border-r-brand-yellow border-b-brand-red border-l-transparent animate-spin"></div>
            <div className="absolute top-2 left-2 w-16 h-16 rounded-full border-4 border-t-transparent border-r-brand-blue border-b-brand-yellow border-l-brand-red animate-spin"></div>
          </div>
          <p className="mt-6 text-brand-black font-medium">በመጫን ላይ...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      {/* Background decorations */}
      <BackgroundDecoration />
      
      {/* Header section - Reduced top spacing */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4 mt-0 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
      >
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-brand-black tracking-tight">
            <span className="text-brand-blue">አስተዳዳሪ</span> ዳሽቦርድ
          </h1>
          <p className="text-gray-500 text-sm mt-1">እንኳን ደህና መጡ፣ እዚህ ገጽ ላይ ሁሉንም ስታቲስቲክስ መመልከት ይችላሉ።</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full bg-white shadow-sm border border-gray-200 text-gray-500 hover:bg-brand-blue hover:text-white transition-colors duration-200">
            <Bell size={16} />
          </button>
          <button className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-white shadow-sm border border-gray-200 text-gray-700 hover:bg-brand-blue hover:text-white transition-colors duration-200">
            <CalendarCheck size={14} />
            <span className="text-xs font-medium">ዛሬ</span>
          </button>
        </div>
      </motion.div>
      
      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-6"
      >
        <DashboardStats />
      </motion.div>
      
      {/* Charts Dashboard - Added new section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 col-span-2 hover:shadow-md transition-all duration-300"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center">
              <TrendingUp size={16} className="mr-2 text-brand-blue" />
              የአባላት ምዝገባ እድገት
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors">
                {growthPeriod === 'week' ? 'ሳምንት' : growthPeriod === 'month' ? 'ወር' : 'ዓመት'}
                <ChevronDown size={12} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[100px]">
                <DropdownMenuItem className="text-xs" onClick={() => handleGrowthPeriodChange('week')}>
                  ሳምንት
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs" onClick={() => handleGrowthPeriodChange('month')}>
                  ወር
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs" onClick={() => handleGrowthPeriodChange('year')}>
                  ዓመት
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="h-64">
            {dataLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={memberGrowthData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorAbalat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1F8CD7" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1F8CD7" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 11 }} 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={formatDate}
                    minTickGap={15}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11 }} 
                    width={30}
                  />
                  <Tooltip 
                    labelFormatter={(value) => `Date: ${formatDate(value)}`}
                    formatter={(value) => [`${value} አባላት`, 'ጠቅላላ']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #f0f0f0',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#1F8CD7" 
                    fillOpacity={1} 
                    fill="url(#colorAbalat)" 
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300"
        >
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <Users size={16} className="mr-2 text-brand-blue" />
            የአባላት ስብጥር
          </h3>
          <div className="h-64 flex items-center justify-center">
            {dataLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderDistribution}
                    cx="50%"
                    cy="45%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                    nameKey="gender"
                    label={({ gender, percentage }) => `${gender} ${percentage}%`}
                    paddingAngle={3}
                  >
                    {genderDistribution.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        stroke="white"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, name]}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #f0f0f0',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    align="center"
                    layout="horizontal"
                    iconType="circle"
                    iconSize={10}
                    formatter={(value) => <span className="text-xs text-gray-600">{value}</span>}
                    wrapperStyle={{ paddingTop: 20 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Additional row of charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300"
        >
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <BarChart4 size={16} className="mr-2 text-emerald-500" />
            የዕድሜ ክፍፍል
          </h3>
          <div className="h-56">
            {dataLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ageDistribution}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  barCategoryGap={20}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="ageGroup" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11 }} 
                    width={30}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'መጠን']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #f0f0f0',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}
                    cursor={{ fill: 'rgba(76, 175, 80, 0.1)' }}
                  />
                  <Bar 
                    dataKey="percentage" 
                    fill="#4CAF50" 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={1500}
                    minPointSize={3}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300"
        >
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <Activity size={16} className="mr-2 text-amber-500" />
            የሳምንቱ እንቅስቃሴ
          </h3>
          <div className="h-56">
            {dataLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklyActivity}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11 }} 
                    width={30}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value} ጉብኝቶች`, '']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #f0f0f0',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }} 
                    cursor={{ stroke: 'rgba(249, 220, 47, 0.2)', strokeWidth: 20, opacity: 0.5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#F9DC2F" 
                    strokeWidth={3}
                    dot={{ r: 5, strokeWidth: 2, fill: "white", stroke: "#F9DC2F" }}
                    activeDot={{ r: 7, stroke: "#F9DC2F", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Activity and Upcoming Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300 overflow-hidden relative"
        >
          <div className="absolute right-0 top-0 w-24 h-24 bg-brand-blue/10 rounded-bl-full"></div>
          <h2 className="text-sm font-semibold text-brand-black mb-4 flex items-center">
            <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue mr-3">
              <Activity size={15} />
            </span>
            የቅርብ ጊዜ እንቅስቃሴዎች
          </h2>
          <div className="text-gray-600 pt-2 space-y-3">
            {dataLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-blue"></div>
              </div>
            ) : (
              recentActivities.map((activity, index) => (
                <div key={activity.id} className={`flex items-start pb-3 ${index < recentActivities.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="w-2 h-2 mt-2 rounded-full bg-brand-blue mr-3"></div>
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
                  </div>
                  <div className="text-xs text-gray-400">{activity.date === format(new Date(), 'yyyy-MM-dd') ? 'ዛሬ' : activity.date}</div>
                </div>
              ))
            )}
            
            <button className="text-xs text-brand-blue font-medium flex items-center mt-2 hover:text-brand-blue/80 transition-colors">
              ሁሉንም ይመልከቱ
              <ArrowRight size={12} className="ml-1" />
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300 overflow-hidden relative"
        >
          <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full"></div>
          <h2 className="text-sm font-semibold text-brand-black mb-4 flex items-center">
            <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 mr-3">
              <Layers size={15} />
            </span>
            ዛሬ እድሳት ያላቸው ነገሮች
          </h2>
          <div className="text-gray-600 pt-2 space-y-3">
            {dataLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
              </div>
            ) : (
              upcomingTasks.map((task, index) => (
                <div key={task.id} className={`flex items-start pb-3 ${index < upcomingTasks.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>
                  </div>
                  <div className="text-xs text-gray-400">{task.dueDate === format(new Date(), 'yyyy-MM-dd') ? 'ዛሬ' : task.dueDate}</div>
                </div>
              ))
            )}
            
            <button className="text-xs text-emerald-500 font-medium flex items-center mt-2 hover:text-emerald-500/80 transition-colors">
              ሁሉንም ይመልከቱ
              <ArrowRight size={12} className="ml-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
