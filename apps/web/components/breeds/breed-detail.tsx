import type { Breed } from '@tutorcanino/data';
import { BreedSpecs } from './breed-specs';
import { BreedTemperament } from './breed-temperament';
import { Info, History, ShieldAlert, Sparkles, HeartPulse, Stethoscope, Scissors, Heart, Utensils } from 'lucide-react';

interface BreedDetailProps {
  breed: Breed;
}

export function BreedDetail({ breed }: BreedDetailProps) {
  const { sobre, saude, cuidados } = breed;

  return (
    <div className="flex flex-col gap-20 md:gap-24">
      {/* Introduction */}
      <section id="sobre">
        <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-4">
          <div className="w-1.5 h-8 bg-primary rounded-full" />
          Sobre o {breed.nome}
        </h2>
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-4 font-medium">
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
          <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-4">
            <div className="w-1.5 h-8 bg-primary rounded-full" />
            Origem e História
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-medium">
            {sobre.historia.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {/* Health & Diseases */}
      {saude && (
        <section id="saude" className="bg-primary/5 rounded-[3rem] p-10 md:p-16 border border-primary/10">
          <h2 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-4">
            <div className="w-1.5 h-8 bg-primary rounded-full" />
            Saúde e Bem-estar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <ShieldAlert className="text-primary" size={24} />
                Problemas Comuns
              </h3>
              <ul className="grid grid-cols-1 gap-4">
                {saude.doencas_comuns?.map((doenca, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-600 font-bold">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    {doenca}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Stethoscope className="text-primary" size={24} />
                Acompanhamento
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium bg-white/50 p-6 rounded-2xl border border-primary/5">
                {saude.cuidados_veterinarios || 'Recomenda-se acompanhamento veterinário periódico para garantir a saúde da raça.'}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Daily Care */}
      {cuidados && (
        <section id="cuidados">
          <h2 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-4">
            <div className="w-1.5 h-8 bg-secondary rounded-full" />
            Cuidados Diários
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 shadow-sm shadow-secondary/5">
                <Scissors size={28} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Higiene e Pelo</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{cuidados.higiene || 'Escovação regular recomendada.'}</p>
            </div>
            <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 shadow-sm shadow-secondary/5">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Exercícios</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{cuidados.exercicios || 'Atividade física diária é essencial.'}</p>
            </div>
            <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 shadow-sm shadow-secondary/5">
                <Utensils size={28} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Alimentação</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{cuidados.alimentacao || 'Dieta balanceada conforme orientação profissional.'}</p>
            </div>
          </div>
        </section>
      )}

      {/* Fun Facts */}
      {sobre?.curiosidades && sobre.curiosidades.length > 0 && (
        <section id="curiosidades" className="bg-accent/10 rounded-[3rem] p-10 md:p-16 border border-accent/20">
          <h2 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-4">
            <div className="w-1.5 h-8 bg-accent rounded-full" />
            Curiosidades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sobre.curiosidades.map((curiosidade, index) => (
              <div key={index} className="flex gap-6 items-start p-6 rounded-2xl bg-white/60 backdrop-blur-sm shadow-sm border border-accent/5">
                <span className="text-4xl font-black text-accent/30 leading-none">{(index + 1).toString().padStart(2, '0')}</span>
                <p className="text-gray-700 font-bold italic leading-relaxed">{curiosidade}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
