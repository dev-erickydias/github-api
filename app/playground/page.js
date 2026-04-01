import Navbar from "../../components/Navbar";
import Playground from "../../components/Playground";
import ScrollReveal from "../../components/ScrollReveal";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Playground - GitReposAPI",
  description:
    "Teste a GitReposAPI ao vivo. Digite qualquer username do GitHub e veja o resultado em tempo real com filtros interativos.",
};

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-12 relative hero-gradient">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">
            Playground
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
            Teste a API <span className="gradient-text">ao vivo</span>
          </h1>
          <p className="text-lg text-dark-300 max-w-2xl">
            Experimente a API sem escrever nenhuma linha de codigo.
            Digite um username, ajuste os filtros e veja o resultado em tempo real.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 line-glow" />
      </section>

      {/* Tutorial */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Como usar o Playground</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    step: "1",
                    title: "Digite o username",
                    desc: "Insira qualquer username do GitHub no campo obrigatorio. Exemplo: torvalds, vercel, facebook."
                  },
                  {
                    step: "2",
                    title: "Ajuste os filtros",
                    desc: "Opcionalmente, filtre por linguagem, altere a ordenacao ou o numero de resultados por pagina."
                  },
                  {
                    step: "3",
                    title: "Clique em Executar",
                    desc: "A requisicao sera feita em tempo real e o resultado JSON aparecera logo abaixo."
                  },
                  {
                    step: "4",
                    title: "Copie a URL",
                    desc: "A URL da requisicao e gerada automaticamente. Copie e use diretamente no seu projeto."
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold gradient-text">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                      <p className="text-dark-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Playground />

      {/* Tips */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-white mb-6 text-center">Dicas de uso</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Ative stats_only",
                  desc: "Se voce so precisa de um resumo (total de repos, stars, linguagens), ative a opcao 'Somente estatisticas'. A resposta fica muito menor e mais rapida."
                },
                {
                  title: "Use usernames populares",
                  desc: "Teste com usernames como torvalds, vercel ou facebook para ver a API lidando com centenas de repositorios."
                },
                {
                  title: "Combine filtros",
                  desc: "Filtre por linguagem e ordene por stars para encontrar os projetos mais populares de um dev em uma stack especifica."
                },
              ].map((tip) => (
                <div key={tip.title} className="glass-card rounded-xl p-5">
                  <h3 className="text-white font-semibold text-sm mb-2">{tip.title}</h3>
                  <p className="text-dark-400 text-xs leading-relaxed">{tip.desc}</p>
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
