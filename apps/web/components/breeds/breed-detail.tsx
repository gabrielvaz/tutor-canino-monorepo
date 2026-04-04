import type { Breed } from '@tutorcanino/data';
import { BreedSpecs } from './breed-specs';
import { BreedTemperament } from './breed-temperament';
import { Info, History, ShieldAlert, Sparkles, HeartPulse, Stethoscope, Scissors } from 'lucide-react';

interface BreedDetailProps {
  breed: Breed;
}

export function BreedDetail({ breed }: BreedDetailProps) {
  const { sobre, saude, cuidados, ficha_tecnica } = breed;

  return (
    <div className="flex flex-col gap-16">
      {/* Introduction */}
      <section id="sobre">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
          <Info className="text-primary" size={32} />
          Sobre o {breed.nome}
        </h2>
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-4">
          {sobre?.descricao?.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Grid Layout Specs & Temperament */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <BreedSpecs breed={breed} />
        <BreedTemperament breed={breed} />
      </div>

      {/* History */}
      {sobre?.historia && (
        <section id="historia">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
            <History className="text-primary" size={32} />
            Origem e História
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            {sobre.historia.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {/* Health & Diseases */}
      {saude && (
        <section id="saude" className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
            <HeartPulse className="text-primary" size={32} />
            Saúde e Bem-estar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ShieldAlert className="text-primary" size={20} />
                Problemas Comuns
              </h3>
              <ul className="grid grid-cols-1 gap-3">
                {saude.doencas_comuns?.map((doenca, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600 font-medium">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {doenca}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Stethoscope className="text-primary" size={20} />
                Acompanhamento
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {saude.cuidados_veterinarios || 'Recomenda-se acompanhamento veterinário periódico para garantir a saúde da raça.'}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Daily Care */}
      {cuidados && (
        <section id="cuidados">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
            <Sparkles className="text-primary" size={32} />
            Cuidados Diários
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                <Scissors size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Higiene e Pelo</h3>
              <p className="text-sm text-gray-600">{cuidados.higiene || 'Escovação regular recomendada.'}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                <HeartPulse size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Exercícios</h3>
              <p className="text-sm text-gray-600">{cuidados.exercicios || 'Atividade física diária é essencial.'}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                <Sparkles size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Alimentação</h3>
              <p className="text-sm text-gray-600">{cuidados.alimentacao || 'Dieta balanceada conforme orientação profissional.'}</p>
            </div>
          </div>
        </section>
      )}

      {/* Fun Facts */}
      {sobre?.curiosidades && sobre.curiosidades.length > 0 && (
        <section id="curiosidades" className="bg-accent/5 rounded-3xl p-8 md:p-12 border border-accent/10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
            <Sparkles className="text-accent" size={32} />
            Curiosidades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sobre.curiosidades.map((curiosidade, index) => (
              <div key={index} className="flex gap-4 items-start p-4 rounded-xl bg-white/50">
                <span className="text-2xl font-black text-accent/20">{(index + 1).toString().padStart(2, '0')}</span>
                <p className="text-gray-700 font-medium italic leading-relaxed">{curiosidade}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
