import Navbar from "../../components/Navbar";
import Security from "../../components/Security";
import ScrollReveal from "../../components/ScrollReveal";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Seguranca - GitReposAPI",
  description:
    "Auditoria de seguranca completa da GitReposAPI. Validacao de inputs, rate limit, CORS, protecao de tokens e mais.",
};

export default function SecurityPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-12 relative hero-gradient">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">
            Seguranca
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
            Seguro por <span className="gradient-text">design</span>
          </h1>
          <p className="text-lg text-dark-300 max-w-2xl">
            Cada camada da API foi construida com seguranca como prioridade.
            Confira a auditoria completa abaixo.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 line-glow" />
      </section>

      <Security />

      {/* Detailed security explanations */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Detalhamento da <span className="gradient-text">auditoria</span>
            </h2>

            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Input validation */}
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-green-400"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  Validacao de Input
                </h3>
                <p className="text-dark-300 text-sm mb-4">
                  O parametro <code className="px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 text-xs">user</code> e validado
                  contra uma expressao regular que garante o formato correto de usernames do GitHub:
                </p>
                <div className="code-block rounded-xl p-5 mb-4">
                  <pre className="text-sm text-dark-300">{`// Regex de validacao
/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/

// Aceita: "torvalds", "dev-erickydias", "user123"
// Rejeita: "-invalid", "user@name", "a".repeat(40)
// Rejeita: "../etc/passwd", "<script>", SQL injection`}</pre>
                </div>
                <p className="text-dark-400 text-xs">
                  Alem disso, <code className="text-brand-400">encodeURIComponent()</code> e aplicado antes de inserir o username na URL
                  da API do GitHub, prevenindo qualquer tipo de URL injection.
                </p>
              </div>

              {/* Parameter validation */}
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-green-400"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  Validacao de Parametros
                </h3>
                <p className="text-dark-300 text-sm mb-4">
                  Os parametros <code className="px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 text-xs">sort</code> e{" "}
                  <code className="px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 text-xs">order</code> sao validados
                  contra listas de valores permitidos. Qualquer valor fora da lista retorna erro 400:
                </p>
                <div className="code-block rounded-xl p-5">
                  <pre className="text-sm text-dark-300">{`// Valores aceitos para sort:
["updated", "created", "pushed", "name", "stars", "forks", "size"]

// Valores aceitos para order:
["asc", "desc"]

// Qualquer outro valor → 400 Bad Request`}</pre>
                </div>
              </div>

              {/* Rate limit */}
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-green-400"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  Protecao contra Rate Limit
                </h3>
                <p className="text-dark-300 text-sm mb-4">
                  A API monitora as respostas do GitHub. Quando o rate limit e atingido (status 403),
                  a API retorna um erro claro com status 429:
                </p>
                <div className="code-block rounded-xl p-5 mb-4">
                  <pre className="text-sm text-dark-300">{`// Resposta quando rate limit e atingido:
{
  "error": "GitHub API rate limit exceeded. Try again later."
}
// Status: 429 Too Many Requests`}</pre>
                </div>
                <p className="text-dark-400 text-xs">
                  Alem disso, o fetch interno e limitado a 10 paginas (MAX_PAGES = 10), impedindo
                  que um unico request consuma todo o rate limit disponivel.
                </p>
              </div>

              {/* CORS & Token */}
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-green-400"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  CORS e Protecao de Token
                </h3>
                <p className="text-dark-300 text-sm mb-4">
                  O CORS esta configurado para uso publico, mas de forma controlada:
                </p>
                <div className="code-block rounded-xl p-5 mb-4">
                  <pre className="text-sm text-dark-300">{`// Headers CORS aplicados em TODAS as respostas
{
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
}

// Apenas GET e OPTIONS sao permitidos
// POST, PUT, DELETE → nao aceitos`}</pre>
                </div>
                <p className="text-dark-400 text-xs">
                  O GITHUB_TOKEN e armazenado exclusivamente em variaveis de ambiente do servidor.
                  Ele nunca aparece no codigo-fonte, nas respostas da API ou nos logs publicos.
                  O arquivo <code className="text-brand-400">.env</code> esta no <code className="text-brand-400">.gitignore</code>.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-3">
                Encontrou algum problema de seguranca?
              </h2>
              <p className="text-dark-300 text-sm mb-6">
                Se voce encontrou uma vulnerabilidade, por favor reporte de forma responsavel.
              </p>
              <a
                href="https://www.linkedin.com/in/erickydias"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm inline-flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Reportar via LinkedIn
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
