import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';

interface StatisticCardProps {
  title: string;
  value: string;
  trend?: string;
  isPositive?: boolean;
  trendLabel?: string;
  icon: LucideIcon;
  colorClass?: string;
  bgClass?: string;
  borderClass?: string;
  gradientClass?: string;
}

export const StatisticCard = ({
  title, 
  value, 
  trend = '0%', 
  isPositive = true, 
  trendLabel = 'vs last month', 
  icon: Icon,
  colorClass = 'text-indigo-600',
  bgClass = 'bg-indigo-50/80',
  borderClass = 'border-slate-200/80'
}: StatisticCardProps) => {
  return (
    <div className={`bg-white p-5 rounded-xl border ${borderClass} shadow-2xs hover:shadow-xs transition-all duration-200 relative flex flex-col justify-between`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className={`w-8 h-8 rounded-lg ${bgClass} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${colorClass}`} />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-mono">{value}</h3>
        {trend && (
          <div className="flex items-center gap-1 text-[11px] font-medium">
            <span className={`inline-flex items-center font-bold px-1.5 py-0.5 rounded ${
              isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}>
              {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {trend}
            </span>
            <span className="text-slate-400 truncate hidden sm:inline">{trendLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
};
