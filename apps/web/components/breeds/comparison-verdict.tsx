import { Sparkles, Brain, ShieldCheck, Zap } from 'lucide-react';

interface ComparisonVerdictProps {
  verdict: any;
}

export function ComparisonVerdict({ verdict }: ComparisonVerdictProps) {
  const { summary, comparisons } = verdict;

  return (
    <div className="flex flex-col gap-12">
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent-dark">
            <Sparkles size={20} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Veredito do Especialista</h2>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <p className="text-lg text-gray-600 font-medium leading-relaxed italic">"{summary}"</p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Brain size={24} />
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-widest text-xs">Temperamento</h3>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">{comparisons.temperament}</p>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
            <Zap size={24} />
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-widest text-xs">Manutenção</h3>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">{comparisons.maintenance}</p>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent-dark mb-6">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-widest text-xs">Adequação</h3>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">{comparisons.suitability}</p>
        </div>
      </div>
    </div>
  );
}
