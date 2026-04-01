"use client";

import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Faca uma requisicao GET",
    desc: "Envie um GET para o endpoint com o parametro user e qualquer filtro que desejar.",
    detail: "GET /api/github?user=USERNAME",
  },
  {
    number: "02",
    title: "A API busca os dados",
    desc: "Internamente, a API busca todos os repos publicos do usuario na API do GitHub com paginacao automatica.",
    detail: "Ate 1.000 repos por usuario",
  },
  {
    number: "03",
    title: "Filtra, ordena e pagina",
    desc: "Aplica seus filtros (linguagem, topico, busca), calcula estatisticas e retorna os dados paginados.",
    detail: "Resposta em < 200ms",
  },
  {
    number: "04",
    title: "Receba JSON limpo",
    desc: "Voce recebe um JSON organizado com repos, estatisticas e paginacao, pronto para usar no seu projeto.",
    detail: "Zero configuracao",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">
            Como Funciona
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            De zero a dados em <span className="gradient-text">4 passos</span>
          </h2>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto relative">
          {/* Connecting line */}
          <div className="absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/30 via-brand-500/10 to-transparent hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 150} direction="left">
                <div className="flex gap-6 items-start group">
                  <div className="w-20 h-20 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0 group-hover:bg-brand-500/20 group-hover:border-brand-500/40 transition-all duration-500">
                    <span className="text-2xl font-bold gradient-text">
                      {step.number}
                    </span>
                  </div>
                  <div className="glass-card rounded-2xl p-6 flex-1 group-hover:border-brand-500/20 transition-all duration-500">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-dark-300 text-sm mb-3">{step.desc}</p>
                    <span className="inline-block px-3 py-1 rounded-lg bg-brand-500/10 text-brand-400 text-xs font-medium">
                      {step.detail}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
