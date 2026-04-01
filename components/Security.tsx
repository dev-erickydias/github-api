"use client";

import ScrollReveal from "./ScrollReveal";

const checks = [
  {
    title: "Validacao de Input",
    desc: "Username validado com regex rigorosa. Apenas caracteres permitidos pelo GitHub (letras, numeros, hifens). Maximo de 39 caracteres.",
    status: "pass",
  },
  {
    title: "URL Encoding",
    desc: "encodeURIComponent aplicado em todos os parametros enviados a API do GitHub, prevenindo URL injection.",
    status: "pass",
  },
  {
    title: "Parametros Validados",
    desc: "Valores de sort e order validados contra listas de valores permitidos. Valores invalidos retornam erro 400.",
    status: "pass",
  },
  {
    title: "Limite de Busca",
    desc: "Campo search limitado a 100 caracteres para evitar abusos. Paginacao limitada a 100 items por pagina.",
    status: "pass",
  },
  {
    title: "Rate Limit Handling",
    desc: "Respostas 403 do GitHub sao interceptadas e retornadas como 429 com mensagem clara para o consumidor.",
    status: "pass",
  },
  {
    title: "Anti-Loop",
    desc: "Fetch interno limitado a 10 paginas (1.000 repos maximo), impedindo loops infinitos na comunicacao com a API do GitHub.",
    status: "pass",
  },
  {
    title: "CORS Seguro",
    desc: "Headers CORS configurados para permitir acesso de qualquer dominio via GET. Metodo OPTIONS implementado para preflight.",
    status: "pass",
  },
  {
    title: "Token Protegido",
    desc: "GITHUB_TOKEN armazenado exclusivamente em variaveis de ambiente. Nunca exposto no codigo ou nas respostas da API.",
    status: "pass",
  },
  {
    title: "Validacao de Resposta",
    desc: "Verifica se a resposta do GitHub e um array valido antes de processar, prevenindo erros com dados inesperados.",
    status: "pass",
  },
  {
    title: "Sem Dados Sensiveis",
    desc: "A API retorna apenas dados publicos. Nenhuma informacao privada, token ou credencial e exposta nas respostas.",
    status: "pass",
  },
];

export default function Security() {
  return (
    <section id="security" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">
            Seguranca
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            Seguro por <span className="gradient-text">design</span>
          </h2>
          <p className="text-dark-300 max-w-xl mx-auto">
            Cada camada da API foi construida pensando em seguranca.
            Todos os checks passaram com sucesso.
          </p>
        </ScrollReveal>

        {/* Score badge */}
        <ScrollReveal className="flex justify-center mb-12" direction="scale">
          <div className="glass-card rounded-2xl p-8 text-center animate-pulse-glow">
            <div className="text-5xl font-extrabold text-green-400 mb-2">
              10/10
            </div>
            <div className="text-sm text-dark-300">Security Score</div>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto grid gap-3">
          {checks.map((check, i) => (
            <ScrollReveal key={check.title} delay={i * 60}>
              <div className="glass-card rounded-xl px-6 py-4 flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-green-500/20 transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-400"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {check.title}
                  </h3>
                  <p className="text-sm text-dark-300 leading-relaxed">
                    {check.desc}
                  </p>
                </div>
                <span className="ml-auto shrink-0 px-2.5 py-1 rounded-lg bg-green-500/10 text-green-400 text-xs font-bold uppercase">
                  Pass
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
