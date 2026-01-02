import React, { useState, useEffect } from 'react';
import { Lightbulb, AlertTriangle, CheckCircle, X } from 'lucide-react';

const InsightPanel = ({ insight }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (insight) {
        setVisible(true);
        // Auto hide after 5 seconds on mobile only
        if (window.innerWidth < 768) {
            const timer = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }
  }, [insight]);

  if (!insight || !visible) return null;

  const { title, message, type } = insight;

  // New Theme Colors
  const styles = {
    neutral: { border: 'border-white/10', icon: Lightbulb, iconColor: 'text-indigo-400', bg: 'bg-slate-900/80' },
    info: { border: 'border-cyan-500/30', icon: Lightbulb, iconColor: 'text-cyan-400', bg: 'bg-cyan-950/80' },
    warning: { border: 'border-amber-500/30', icon: AlertTriangle, iconColor: 'text-amber-400', bg: 'bg-amber-950/80' },
    success: { border: 'border-emerald-500/30', icon: CheckCircle, iconColor: 'text-emerald-400', bg: 'bg-emerald-950/80' },
  };

  const style = styles[type] || styles.neutral;
  const Icon = style.icon;

  return (
    <>
        {/* Desktop View: Top Right */}
        <div className={`hidden md:block fixed top-28 right-6 w-80 ${style.bg} backdrop-blur-xl border ${style.border} p-5 rounded-2xl shadow-2xl transition-all duration-300 z-50 animate-in slide-in-from-right-8`}>
            <div className="flex items-start gap-4">
                <div className={`p-2 rounded-xl bg-black/40 ${style.iconColor} shadow-inner`}>
                <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1 opacity-90">{title}</h4>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">{message}</p>
                </div>
            </div>
            {/* Glossy overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
        </div>

        {/* Mobile View: Bottom Sheet / Floating Toast */}
        <div className={`md:hidden fixed bottom-4 left-4 right-4 ${style.bg} backdrop-blur-2xl border ${style.border} p-4 rounded-xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)] z-50 animate-in slide-in-from-bottom-10`}>
             <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-black/20 ${style.iconColor}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <h4 className="text-xs font-bold text-white uppercase opacity-80">{title}</h4>
                    <p className="text-xs text-slate-200">{message}</p>
                </div>
                <button onClick={() => setVisible(false)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                </button>
             </div>
        </div>
    </>
  );
};

export default InsightPanel;
