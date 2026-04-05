import { Badge } from '@tutorcanino/ui';
import { Home, Heart, Zap, UserCheck, Star } from 'lucide-react';

interface ComparisonBadgesProps {
  verdict: any;
}

export function ComparisonBadges({ verdict }: ComparisonBadgesProps) {
  const { winnerBadges } = verdict;
  if (!winnerBadges) return null;

  const badgeConfig = [
    { key: 'apartment', label: 'Melhor para Apartamento', icon: <Home size={14} /> },
    { key: 'family', label: 'Melhor para Família', icon: <Heart size={14} /> },
    { key: 'activeOwner', label: 'Melhor para Donos Ativos', icon: <Zap size={14} /> },
    { key: 'firstTimeOwner', label: 'Melhor para 1ª Viagem', icon: <UserCheck size={14} /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {badgeConfig.map((config) => {
        const winner = winnerBadges[config.key];
        if (!winner || winner === 'Neither') return null;

        return (
          <div key={config.key} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {config.icon}
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400">{config.label}</span>
              <span className="text-sm font-black text-gray-900">{winner}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
