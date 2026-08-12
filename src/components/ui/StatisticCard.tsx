import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';

interface StatisticCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: string;
  isPositive?: boolean;
  trendLabel?: string;
  icon?: LucideIcon;
  colorClass?: string;
  bgClass?: string;
  borderClass?: string;
}

export const StatisticCard = ({
  title, 
  value, 
  subtitle,
  trend, 
  isPositive = true, 
  trendLabel, 
  icon: Icon,
  colorClass = 'text-indigo-600',
  bgClass = 'bg-indigo-50/80',
  borderClass = 'border-slate-200/80'
}: StatisticCardProps) => {
  return (
    <div className={`bg-white p-5 rounded-xl border ${borderClass} shadow-2xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`w-8 h-8 rounded-lg ${bgClass} flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${colorClass}`} />
          </div>
        )}
      </div>

      <div className="mt-3">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-mono whitespace-nowrap">
          {value}
        </h3>
      </div>

      {(subtitle || trend) && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500">
          {trend && (
            <span className={`inline-flex items-center font-bold px-1.5 py-0.5 rounded text-[11px] ${
              isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}>
              {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {trend}
            </span>
          )}
          {trendLabel && <span className="text-slate-400">{trendLabel}</span>}
          {subtitle && <span className="text-slate-400">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
