import Navbar from "../../components/Navbar";
import Examples from "../../components/Examples";
import ScrollReveal from "../../components/ScrollReveal";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Exemplos de Codigo - GitReposAPI",
  description:
    "Exemplos de integracao da GitReposAPI em JavaScript, React, Python e cURL. Copie e cole para usar nos seus projetos.",
};

const API_URL = "https://api-pearl-nine-29.vercel.app/api/github";

export default function ExamplesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-12 relative hero-gradient">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">
            Exemplos
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
            Integre em <span className="gradient-text">qualquer stack</span>
          </h1>
          <p className="text-lg text-dark-300 max-w-2xl">
            Exemplos prontos para copiar e colar. Cada exemplo mostra
            desde a chamada basica ate filtros avancados e tratamento de erros.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 line-glow" />
      </section>

      <Examples />

      {/* Step by step tutorial */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Tutorial: Secao de projetos no <span className="gradient-text">portfolio</span>
            </h2>

            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Step 1 */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                    <span className="text-sm font-bold gradient-text">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Entenda a URL da API</h3>
                </div>
                <p className="text-dark-300 text-sm mb-4">
                  A URL base da API e fixa. Voce so precisa trocar <code className="px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 text-xs">USERNAME</code> pelo
                  username do GitHub cujos repos voce quer exibir.
                </p>
                <div className="code-block rounded-xl p-5">
                  <pre className="text-sm text-dark-300">{`// URL base (nunca muda)
const API = "${API_URL}";

// Para buscar seus repos:
// ${API_URL}?user=SEU_USERNAME

// Para buscar repos de outra pessoa:
// ${API_URL}?user=OUTRO_USERNAME`}</pre>
                </div>
              </div>

              {/* Step 2 */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                    <span className="text-sm font-bold gradient-text">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Faca a chamada no seu componente</h3>
                </div>
                <p className="text-dark-300 text-sm mb-4">
                  Use <code className="px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 text-xs">fetch</code> dentro de um <code className="px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 text-xs">useEffect</code> (React)
                  ou diretamente no server component (Next.js). A API retorna JSON, entao basta fazer <code className="px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 text-xs">.json()</code>.
                </p>
                <div className="code-block rounded-xl p-5">
                  <pre className="text-sm text-dark-300">{`const [projects, setProjects] = useState([]);
const [stats, setStats] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("${API_URL}?user=SEU_USERNAME&sort=stars&per_page=6")
    .then(res => res.json())
    .then(data => {
      setProjects(data.projects);
      setStats(data.stats);
    })
    .finally(() => setLoading(false));
}, []);`}</pre>
                </div>
              </div>

              {/* Step 3 */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                    <span className="text-sm font-bold gradient-text">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Renderize os dados</h3>
                </div>
                <p className="text-dark-300 text-sm mb-4">
                  Cada projeto vem com nome, descricao, linguagem, stars, URL e muito mais.
                  Use os campos que fizerem sentido para o seu design.
                </p>
                <div className="code-block rounded-xl p-5">
                  <pre className="text-sm text-dark-300">{`{projects.map(repo => (
  <div key={repo.id} className="card">
    <h3>{repo.name}</h3>
    <p>{repo.description || "Sem descricao"}</p>

    <div className="tags">
      <span>{repo.stats.stars} stars</span>
    </div>

    <div className="links">
      <a href={repo.url}>Codigo</a>
      {repo.homepage && <a href={repo.homepage}>Demo</a>}
    </div>
  </div>
))}`}</pre>
                </div>
              </div>

              {/* Step 4 */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                    <span className="text-sm font-bold gradient-text">4</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Adicione estatisticas (opcional)</h3>
                </div>
                <p className="text-dark-300 text-sm mb-4">
                  Use o objeto <code className="px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 text-xs">stats</code> para exibir
                  um resumo no topo da secao de projetos.
                </p>
                <div className="code-block rounded-xl p-5">
                  <pre className="text-sm text-dark-300">{`<div className="stats-bar">
  <span>{stats.total_repos} repositorios</span>
  <span>{stats.total_stars} stars</span>
  <span>{stats.total_forks} forks</span>
  <span>
    Top topico: {stats.topics[0]?.name}
  </span>
</div>`}</pre>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why use this API */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Por que usar a GitReposAPI no seu portfolio?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Sempre atualizado",
                  desc: "Seus projetos aparecem automaticamente conforme voce cria novos repos no GitHub. Sem necessidade de editar o portfolio manualmente."
                },
                {
                  title: "Dados ricos",
                  desc: "Linguagem, stars, descricao, URL do demo, topicos, datas. Tudo que voce precisa para montar um card completo."
                },
                {
                  title: "Zero configuracao",
                  desc: "Nao precisa de backend, banco de dados, autenticacao ou deploy. Uma chamada GET e voce tem tudo."
                },
                {
                  title: "Performance",
                  desc: "Resposta em menos de 200ms com cache de 1 hora. Seu portfolio carrega rapido sem prejudicar a experiencia."
                },
                {
                  title: "Filtros inteligentes",
                  desc: "Mostre apenas repos de uma linguagem, ordene por stars, ou exclua forks. Controle total sobre o que aparece."
                },
                {
                  title: "Seguro e confiavel",
                  desc: "Hospedada na Vercel com validacao de inputs, rate limit handling e CORS configurado. Pronta para producao."
                },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-xl p-5">
                  <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                  <p className="text-dark-400 text-xs leading-relaxed">{item.desc}</p>
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
