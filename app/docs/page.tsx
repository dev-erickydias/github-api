import Navbar from "../../components/Navbar";
import Docs from "../../components/Docs";
import ScrollReveal from "../../components/ScrollReveal";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Documentacao - GitReposAPI",
  description:
    "Documentacao completa da GitReposAPI: endpoint, parametros, estrutura de resposta, erros e guia de integracao.",
};

const API_URL = "https://api-pearl-nine-29.vercel.app/api/github";

export default function DocsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-12 relative hero-gradient">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">
            Documentacao
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
            Referencia completa da <span className="gradient-text">API</span>
          </h1>
          <p className="text-lg text-dark-300 max-w-2xl">
            Tudo que voce precisa saber para integrar a GitReposAPI nos seus projetos.
            Desde o endpoint ate a estrutura completa de cada campo retornado.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 line-glow" />
      </section>

      {/* Quick Start */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Inicio Rapido</h2>
              <p className="text-dark-300 mb-6">
                A GitReposAPI possui um unico endpoint que aceita requisicoes <code className="px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 text-sm">GET</code>.
                O unico parametro obrigatorio e o <code className="px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 text-sm">user</code> (username do GitHub).
                Todos os outros parametros sao opcionais e servem para filtrar, ordenar e paginar os resultados.
              </p>

              <h3 className="text-lg font-semibold text-white mb-3">1. Faca uma requisicao GET</h3>
              <div className="code-block rounded-xl p-5 mb-6">
                <pre className="text-sm">
                  <span className="text-green-400 font-bold">GET</span>{" "}
                  <span className="text-dark-300">{API_URL}?<span className="text-brand-400">user</span>=<span className="text-brand-200">USERNAME</span></span>
                </pre>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">2. Receba o JSON formatado</h3>
              <p className="text-dark-300 mb-4">
                A resposta vem com tres blocos principais:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  { title: "pagination", desc: "Informacoes de paginacao: pagina atual, total de itens, se existe proxima/anterior." },
                  { title: "stats", desc: "Estatisticas agregadas: total de repos, stars, forks, linguagens e topicos." },
                  { title: "projects", desc: "Array com os repositorios formatados, filtrados e ordenados." },
                ].map((block) => (
                  <div key={block.title} className="bg-dark-950 rounded-xl p-4 border border-brand-500/10">
                    <code className="text-brand-400 text-sm font-bold">{block.title}</code>
                    <p className="text-dark-400 text-xs mt-2 leading-relaxed">{block.desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">3. Adicione filtros (opcional)</h3>
              <p className="text-dark-300 mb-3">
                Combine quantos parametros quiser na query string:
              </p>
              <div className="code-block rounded-xl p-5">
                <pre className="text-sm text-dark-300">
{`# Filtrar por TypeScript, ordenar por stars, 5 por pagina
GET ${API_URL}?user=USERNAME&language=TypeScript&sort=stars&per_page=5

# Buscar repos com "api" no nome ou descricao
GET ${API_URL}?user=USERNAME&search=api

# Apenas estatisticas (sem lista de repos)
GET ${API_URL}?user=USERNAME&stats_only=true`}
                </pre>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Full docs component */}
      <Docs />

      {/* How the API processes your request */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Como a API processa sua requisicao</h2>

              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Validacao de entrada",
                    desc: "O parametro user e validado com regex (apenas letras, numeros e hifens, ate 39 caracteres). Os parametros sort e order sao verificados contra listas de valores permitidos. Se algo estiver invalido, a API retorna 400 com uma mensagem clara."
                  },
                  {
                    step: "2",
                    title: "Busca na API do GitHub",
                    desc: "A API faz requests internos para a API do GitHub, buscando ate 100 repos por pagina e ate 10 paginas (1.000 repos maximo). Se um GITHUB_TOKEN estiver configurado, o rate limit e de 5.000 req/hora; sem token, 60 req/hora."
                  },
                  {
                    step: "3",
                    title: "Filtragem",
                    desc: "Forks e repos arquivados sao removidos por padrao (a nao ser que voce passe include_forks=true ou include_archived=true). Depois, os filtros de language, topic e search sao aplicados. Todos sao case-insensitive."
                  },
                  {
                    step: "4",
                    title: "Calculo de estatisticas",
                    desc: "As estatisticas sao calculadas sobre os repos JA filtrados. Ou seja, se voce filtrou por TypeScript, os stats mostrarao apenas dados de repos TypeScript. Isso inclui total de stars, forks, linguagens e topicos."
                  },
                  {
                    step: "5",
                    title: "Ordenacao e paginacao",
                    desc: "Os repos sao ordenados pelo campo escolhido (sort) na direcao escolhida (order). Depois, sao paginados conforme page e per_page. O objeto pagination na resposta informa se existem mais paginas."
                  },
                  {
                    step: "6",
                    title: "Resposta",
                    desc: "O JSON final e retornado com headers CORS, permitindo que qualquer site consuma a API. O cache e de 1 hora (revalidate: 3600), ou seja, dados sao atualizados a cada hora."
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold gradient-text">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                      <p className="text-dark-300 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Perguntas Frequentes</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {[
                {
                  q: "Preciso de autenticacao para usar a API?",
                  a: "Nao. A API e totalmente publica. Voce nao precisa de nenhum token ou cadastro. Basta fazer uma requisicao GET com o parametro user."
                },
                {
                  q: "A API tem limite de uso?",
                  a: "A API funciona como proxy da API do GitHub. O limite depende da configuracao do servidor: com token, 5.000 req/hora; sem token, 60 req/hora. Como consumidor, voce nao precisa se preocupar com isso."
                },
                {
                  q: "Posso usar em projetos comerciais?",
                  a: "Sim. A API e gratuita e de uso livre. Voce pode usa-la em projetos pessoais, comerciais, portfolios, aplicacoes web, mobile, etc."
                },
                {
                  q: "Os dados sao em tempo real?",
                  a: "Os dados tem cache de 1 hora. Ou seja, se voce criar um novo repositorio, ele aparecera na API em ate 1 hora."
                },
                {
                  q: "A API funciona com qualquer usuario do GitHub?",
                  a: "Sim, desde que o usuario exista e tenha repositorios publicos. Funciona com qualquer username valido do GitHub."
                },
                {
                  q: "Posso usar a API a partir de qualquer dominio?",
                  a: "Sim. O CORS esta configurado para aceitar requisicoes de qualquer origem (Access-Control-Allow-Origin: *). Isso significa que voce pode chamar a API diretamente do frontend, sem precisar de um backend intermediario."
                },
              ].map((faq) => (
                <div key={faq.q} className="glass-card rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                  <p className="text-dark-300 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
