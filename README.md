# GitHub Repos API

API publica para buscar, filtrar e ordenar repositorios publicos de qualquer usuario do GitHub. Construida com **Next.js 14** (App Router) e hospedada na **Vercel**.

**URL Base em Producao:**

```
https://api-pearl-nine-29.vercel.app
```

---

## Indice

- [Visao Geral](#visao-geral)
- [Como Funciona](#como-funciona)
- [Endpoint](#endpoint)
- [Parametros](#parametros)
- [Exemplos de Uso](#exemplos-de-uso)
  - [Buscar todos os repos de um usuario](#1-buscar-todos-os-repos-de-um-usuario)
  - [Filtrar por linguagem](#2-filtrar-por-linguagem)
  - [Filtrar por topico](#3-filtrar-por-topico)
  - [Buscar por nome ou descricao](#4-buscar-por-nome-ou-descricao)
  - [Ordenar por stars](#5-ordenar-por-stars)
  - [Paginacao](#6-paginacao)
  - [Somente estatisticas](#7-somente-estatisticas)
  - [Incluir forks e arquivados](#8-incluir-forks-e-arquivados)
  - [Combinando filtros](#9-combinando-varios-filtros)
- [Estrutura da Resposta](#estrutura-da-resposta)
  - [Resposta completa](#resposta-completa)
  - [Objeto project](#objeto-project)
  - [Resposta stats_only](#resposta-stats_only)
- [Erros](#erros)
- [Como Usar nos Seus Projetos](#como-usar-nos-seus-projetos)
  - [JavaScript / Fetch](#javascript--fetch)
  - [React / Next.js](#react--nextjs)
  - [Python](#python)
  - [cURL](#curl)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Como Fazer Seu Proprio Deploy](#como-fazer-seu-proprio-deploy)
- [Seguranca](#seguranca)
- [Limites](#limites)
- [Tecnologias](#tecnologias)
- [Licenca](#licenca)

---

## Visao Geral

Esta API funciona como um wrapper inteligente da API do GitHub. Ela recebe um username, busca todos os repositorios publicos desse usuario e retorna os dados formatados, filtrados, ordenados e paginados, prontos para consumo em qualquer aplicacao frontend.

**Principais funcionalidades:**

- Busca automatica de todos os repos (com paginacao interna)
- Filtros por linguagem, topico e texto de busca
- 7 opcoes de ordenacao com direcao asc/desc
- Paginacao customizavel (1 a 100 items por pagina)
- Estatisticas agregadas (total de stars, forks, linguagens, topicos)
- Modo "stats_only" para dashboards leves
- CORS habilitado para uso em qualquer dominio
- Opcao de incluir/excluir forks e repositorios arquivados

---

## Como Funciona

```
Seu App  --->  Esta API (Vercel)  --->  GitHub API
                    |
                    v
              Formata, filtra,
              ordena e pagina
                    |
                    v
              JSON limpo de volta
              para o seu app
```

1. Voce faz uma requisicao GET para `/api/github?user=USERNAME`
2. A API busca todos os repositorios publicos do usuario na API do GitHub
3. Aplica os filtros que voce passou (linguagem, topico, busca)
4. Calcula estatisticas agregadas
5. Ordena e pagina os resultados
6. Retorna um JSON limpo e organizado

---

## Endpoint

```
GET /api/github
```

**URL completa em producao:**

```
https://api-pearl-nine-29.vercel.app/api/github?user=USERNAME
```

---

## Parametros

Todos os parametros sao passados via query string (`?chave=valor&chave2=valor2`).

| Parametro | Tipo | Obrigatorio | Default | Descricao |
|---|---|---|---|---|
| `user` | string | Sim | - | Username do GitHub |
| `language` | string | Nao | - | Filtrar por linguagem de programacao |
| `topic` | string | Nao | - | Filtrar por topico do repositorio |
| `search` | string | Nao | - | Buscar no nome ou descricao do repo |
| `sort` | string | Nao | `updated` | Campo de ordenacao (veja opcoes abaixo) |
| `order` | string | Nao | `desc` | Direcao da ordenacao: `asc` ou `desc` |
| `page` | number | Nao | `1` | Numero da pagina |
| `per_page` | number | Nao | `10` | Items por pagina (min: 1, max: 100) |
| `include_forks` | boolean | Nao | `false` | Incluir repositorios que sao forks |
| `include_archived` | boolean | Nao | `false` | Incluir repositorios arquivados |
| `stats_only` | boolean | Nao | `false` | Retornar apenas estatisticas |

### Opcoes de ordenacao (`sort`)

| Valor | Descricao |
|---|---|
| `updated` | Data da ultima atualizacao (padrao) |
| `created` | Data de criacao |
| `pushed` | Data do ultimo push |
| `name` | Nome do repositorio (alfabetico) |
| `stars` | Numero de stars |
| `forks` | Numero de forks |
| `size` | Tamanho do repositorio |

---

## Exemplos de Uso

### 1. Buscar todos os repos de um usuario

```
GET /api/github?user=dev-erickydias
```

Retorna os 10 primeiros repositorios publicos (sem forks, sem arquivados), ordenados por data de atualizacao.

---

### 2. Filtrar por linguagem

```
GET /api/github?user=dev-erickydias&language=TypeScript
```

Retorna apenas os repositorios cuja linguagem principal e TypeScript.

> O filtro e case-insensitive: `typescript`, `TypeScript` e `TYPESCRIPT` funcionam igualmente.

---

### 3. Filtrar por topico

```
GET /api/github?user=dev-erickydias&topic=nextjs
```

Retorna apenas os repositorios que possuem o topico "nextjs".

> Topicos sao as tags que voce adiciona no repositorio no GitHub (Settings > Topics).

---

### 4. Buscar por nome ou descricao

```
GET /api/github?user=dev-erickydias&search=craft
```

Retorna repositorios cujo nome ou descricao contem a palavra "craft".

> A busca e case-insensitive e procura em qualquer parte do texto.

---

### 5. Ordenar por stars

```
GET /api/github?user=dev-erickydias&sort=stars&order=desc
```

Retorna os repositorios ordenados do mais estrelado para o menos estrelado.

**Outros exemplos de ordenacao:**

```
# Mais antigos primeiro
GET /api/github?user=dev-erickydias&sort=created&order=asc

# Ordem alfabetica
GET /api/github?user=dev-erickydias&sort=name&order=asc

# Maiores repositorios primeiro
GET /api/github?user=dev-erickydias&sort=size&order=desc
```

---

### 6. Paginacao

```
# Primeira pagina, 5 items por pagina
GET /api/github?user=dev-erickydias&page=1&per_page=5

# Segunda pagina
GET /api/github?user=dev-erickydias&page=2&per_page=5

# Todos os repos de uma vez (max 100)
GET /api/github?user=dev-erickydias&per_page=100
```

A resposta inclui dados de paginacao para facilitar a navegacao:

```json
"pagination": {
  "page": 1,
  "per_page": 5,
  "total_items": 11,
  "total_pages": 3,
  "has_next": true,
  "has_prev": false
}
```

---

### 7. Somente estatisticas

```
GET /api/github?user=dev-erickydias&stats_only=true
```

Retorna apenas as estatisticas agregadas, sem a lista de repositorios. Ideal para dashboards e componentes de resumo.

**Resposta:**

```json
{
  "user": "dev-erickydias",
  "stats": {
    "total_repos": 11,
    "total_stars": 6,
    "total_forks": 2,
    "languages": [
      { "name": "TypeScript", "count": 5 },
      { "name": "JavaScript", "count": 4 },
      { "name": "HTML", "count": 1 },
      { "name": "CSS", "count": 1 }
    ],
    "topics": [
      { "name": "nextjs", "count": 1 }
    ]
  }
}
```

---

### 8. Incluir forks e arquivados

```
# Incluir forks
GET /api/github?user=dev-erickydias&include_forks=true

# Incluir arquivados
GET /api/github?user=dev-erickydias&include_archived=true

# Incluir ambos
GET /api/github?user=dev-erickydias&include_forks=true&include_archived=true
```

Por padrao, forks e repositorios arquivados sao excluidos dos resultados.

---

### 9. Combinando varios filtros

Voce pode combinar qualquer quantidade de filtros:

```
GET /api/github?user=dev-erickydias&language=TypeScript&sort=stars&order=desc&per_page=5&page=1
```

Isso retorna: repos em TypeScript, ordenados por stars (descendente), 5 por pagina, primeira pagina.

---

## Estrutura da Resposta

### Resposta completa

```json
{
  "user": "dev-erickydias",
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total_items": 11,
    "total_pages": 2,
    "has_next": true,
    "has_prev": false
  },
  "stats": {
    "total_repos": 11,
    "total_stars": 6,
    "total_forks": 2,
    "languages": [
      { "name": "TypeScript", "count": 5 },
      { "name": "JavaScript", "count": 4 }
    ],
    "topics": [
      { "name": "nextjs", "count": 1 }
    ]
  },
  "projects": [
    {
      "id": 1191065878,
      "name": "calculadora",
      "full_name": "dev-erickydias/calculadora",
      "description": null,
      "url": "https://github.com/dev-erickydias/calculadora",
      "clone_url": "https://github.com/dev-erickydias/calculadora.git",
      "homepage": "https://calculadora-virid-seven.vercel.app",
      "language": "TypeScript",
      "topics": [],
      "default_branch": "master",
      "visibility": "public",
      "is_fork": false,
      "is_archived": false,
      "is_template": false,
      "license": null,
      "stats": {
        "stars": 0,
        "forks": 0,
        "watchers": 0,
        "open_issues": 0,
        "size_kb": 189
      },
      "dates": {
        "created_at": "2026-03-24T22:15:47Z",
        "updated_at": "2026-04-01T07:29:09Z",
        "pushed_at": "2026-04-01T07:29:06Z",
        "days_since_update": 0
      },
      "has": {
        "pages": false,
        "wiki": true,
        "issues": true,
        "projects": true,
        "discussions": false
      }
    }
  ]
}
```

### Objeto `project`

Cada repositorio no array `projects` contem:

| Campo | Tipo | Descricao |
|---|---|---|
| `id` | number | ID unico do repositorio no GitHub |
| `name` | string | Nome do repositorio |
| `full_name` | string | Nome completo (usuario/repo) |
| `description` | string/null | Descricao do repositorio |
| `url` | string | URL do repositorio no GitHub |
| `clone_url` | string | URL para clonar o repositorio |
| `homepage` | string/null | URL do site/demo do projeto |
| `language` | string/null | Linguagem principal |
| `topics` | string[] | Lista de topicos/tags |
| `default_branch` | string | Branch principal (main, master, etc.) |
| `visibility` | string | Visibilidade (public) |
| `is_fork` | boolean | Se e um fork de outro repo |
| `is_archived` | boolean | Se esta arquivado |
| `is_template` | boolean | Se e um template |
| `license` | object/null | Licenca (`key` e `name`) |
| `stats.stars` | number | Numero de stars |
| `stats.forks` | number | Numero de forks |
| `stats.watchers` | number | Numero de watchers |
| `stats.open_issues` | number | Numero de issues abertas |
| `stats.size_kb` | number | Tamanho em KB |
| `dates.created_at` | string | Data de criacao (ISO 8601) |
| `dates.updated_at` | string | Data da ultima atualizacao (ISO 8601) |
| `dates.pushed_at` | string | Data do ultimo push (ISO 8601) |
| `dates.days_since_update` | number | Dias desde a ultima atualizacao |
| `has.pages` | boolean | Se tem GitHub Pages ativo |
| `has.wiki` | boolean | Se tem wiki habilitada |
| `has.issues` | boolean | Se tem issues habilitadas |
| `has.projects` | boolean | Se tem projects habilitados |
| `has.discussions` | boolean | Se tem discussions habilitadas |

### Resposta `stats_only`

Quando `stats_only=true`, a resposta nao inclui `pagination` nem `projects`:

```json
{
  "user": "USERNAME",
  "stats": {
    "total_repos": 11,
    "total_stars": 6,
    "total_forks": 2,
    "languages": [
      { "name": "TypeScript", "count": 5 }
    ],
    "topics": [
      { "name": "nextjs", "count": 1 }
    ]
  }
}
```

---

## Erros

A API retorna mensagens de erro claras em formato JSON:

| Status | Situacao | Resposta |
|---|---|---|
| `400` | Parametro `user` ausente | `{ "error": "Missing required parameter: user", "usage": "...", "params": {...} }` |
| `400` | Username invalido | `{ "error": "Invalid GitHub username format" }` |
| `400` | Sort invalido | `{ "error": "Invalid sort value. Must be one of: ..." }` |
| `400` | Order invalido | `{ "error": "Invalid order value. Must be 'asc' or 'desc'" }` |
| `404` | Usuario nao encontrado | `{ "error": "User \"USERNAME\" not found" }` |
| `429` | Rate limit excedido | `{ "error": "GitHub API rate limit exceeded. Try again later." }` |
| `502` | Erro inesperado | `{ "error": "Failed to fetch GitHub repositories" }` |

---

## Como Usar nos Seus Projetos

### JavaScript / Fetch

```javascript
// Buscar repos de um usuario
const response = await fetch(
  "https://api-pearl-nine-29.vercel.app/api/github?user=dev-erickydias"
);
const data = await response.json();

console.log(data.stats);       // estatisticas
console.log(data.projects);    // lista de repos
console.log(data.pagination);  // info de paginacao

// Filtrar por linguagem
const tsRepos = await fetch(
  "https://api-pearl-nine-29.vercel.app/api/github?user=dev-erickydias&language=TypeScript"
).then(res => res.json());

// Paginacao
const page2 = await fetch(
  "https://api-pearl-nine-29.vercel.app/api/github?user=dev-erickydias&page=2&per_page=5"
).then(res => res.json());
```

### React / Next.js

```jsx
"use client";

import { useState, useEffect } from "react";

const API_URL = "https://api-pearl-nine-29.vercel.app/api/github";

export default function GitHubProjects() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}?user=dev-erickydias&sort=stars&order=desc`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar repos");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h1>Meus Projetos</h1>
      <p>{data.stats.total_repos} repos | {data.stats.total_stars} stars</p>

      {data.projects.map((project) => (
        <div key={project.id}>
          <h2>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>
          </h2>
          <p>{project.description || "Sem descricao"}</p>
          <span>{project.language}</span>
          <span>{project.stats.stars} stars</span>
          {project.homepage && (
            <a href={project.homepage} target="_blank" rel="noopener noreferrer">
              Demo
            </a>
          )}
        </div>
      ))}

      {data.pagination.has_next && <button>Proxima pagina</button>}
    </div>
  );
}
```

### Python

```python
import requests

API_URL = "https://api-pearl-nine-29.vercel.app/api/github"

# Buscar repos
response = requests.get(API_URL, params={
    "user": "dev-erickydias",
    "language": "TypeScript",
    "sort": "stars",
    "order": "desc"
})
data = response.json()

for project in data["projects"]:
    print(f"{project['name']} - {project['stats']['stars']} stars")

# Apenas estatisticas
stats = requests.get(API_URL, params={
    "user": "dev-erickydias",
    "stats_only": "true"
}).json()

print(f"Total: {stats['stats']['total_repos']} repos, {stats['stats']['total_stars']} stars")
```

### cURL

```bash
# Busca basica
curl "https://api-pearl-nine-29.vercel.app/api/github?user=dev-erickydias"

# Filtrar por linguagem e ordenar
curl "https://api-pearl-nine-29.vercel.app/api/github?user=dev-erickydias&language=TypeScript&sort=stars"

# Apenas estatisticas
curl "https://api-pearl-nine-29.vercel.app/api/github?user=dev-erickydias&stats_only=true"

# Formatado com jq
curl -s "https://api-pearl-nine-29.vercel.app/api/github?user=dev-erickydias" | jq .
```

---

## Como Rodar Localmente

### Pre-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- [npm](https://www.npmjs.com/) (vem com o Node.js)
- (Opcional) Um [GitHub Token](https://github.com/settings/tokens) para aumentar o rate limit

### Passo a passo

**1. Clone o repositorio:**

```bash
git clone https://github.com/dev-erickydias/github-api.git
cd github-api
```

**2. Instale as dependencias:**

```bash
npm install
```

**3. Configure as variaveis de ambiente:**

Crie um arquivo `.env.local` na raiz do projeto:

```bash
cp .env.example .env.local
```

Edite o `.env.local` e coloque seu GitHub Token:

```
GITHUB_TOKEN=seu_token_aqui
```

> **Como gerar um GitHub Token:**
> 1. Acesse https://github.com/settings/tokens
> 2. Clique em "Generate new token" > "Fine-grained token" (ou "Classic")
> 3. De um nome ao token (ex: "github-api-local")
> 4. Para leitura publica, nenhum scope/permissao extra e necessario
> 5. Clique em "Generate token"
> 6. Copie o token e cole no `.env.local`
>
> **Sem token:** a API funciona, mas com limite de 60 requisicoes/hora.
> **Com token:** o limite sobe para 5.000 requisicoes/hora.

**4. Rode o servidor de desenvolvimento:**

```bash
npm run dev
```

**5. Acesse a API:**

```
http://localhost:3000/api/github?user=dev-erickydias
```

---

## Como Fazer Seu Proprio Deploy

### Deploy na Vercel (recomendado)

**1. Faca um fork do repositorio:**

Acesse https://github.com/dev-erickydias/github-api e clique em "Fork".

**2. Conecte na Vercel:**

1. Acesse https://vercel.com
2. Clique em "Add New Project"
3. Importe o repositorio do fork
4. A Vercel detecta automaticamente que e um projeto Next.js

**3. Configure a variavel de ambiente:**

Na tela de deploy da Vercel, antes de clicar em "Deploy":

1. Expanda a secao "Environment Variables"
2. Adicione:
   - Name: `GITHUB_TOKEN`
   - Value: `seu_token_github_aqui`
3. Clique em "Deploy"

**4. Pronto!**

A Vercel vai gerar uma URL para a sua API. Cada push no repositorio fara um novo deploy automaticamente.

### Deploy com Vercel CLI

```bash
# Instale a Vercel CLI
npm i -g vercel

# Faca login
vercel login

# Deploy
vercel --prod

# Adicione a variavel de ambiente
echo "seu_token" | vercel env add GITHUB_TOKEN production
```

---

## Seguranca

A API implementa as seguintes medidas de seguranca:

- **Validacao de username:** Regex que aceita apenas caracteres validos do GitHub (letras, numeros, hifens), com no maximo 39 caracteres
- **Encoding de URL:** `encodeURIComponent` no username para prevenir URL injection
- **Validacao de parametros:** `sort` e `order` sao validados contra listas de valores permitidos
- **Limite de busca:** O campo `search` e limitado a 100 caracteres
- **Limite de paginacao:** Maximo de 10 paginas internas (1.000 repos) para evitar loops infinitos
- **Rate limit handling:** Respostas 403 do GitHub sao tratadas e retornadas como 429
- **Validacao de resposta:** Verifica se a resposta do GitHub e um array valido
- **CORS configurado:** Permite acesso de qualquer origem para uso publico
- **Token seguro:** O `GITHUB_TOKEN` fica em variaveis de ambiente, nunca exposto no codigo
- **`.gitignore` configurado:** Arquivos `.env` sao ignorados pelo git

---

## Limites

| Recurso | Limite |
|---|---|
| Rate limit sem token | 60 requisicoes/hora |
| Rate limit com token | 5.000 requisicoes/hora |
| Max repos por usuario | 1.000 (10 paginas x 100) |
| Max items por pagina | 100 |
| Max caracteres no search | 100 |
| Cache | 1 hora (revalidate: 3600) |

---

## Tecnologias

- **[Next.js 14](https://nextjs.org/)** — Framework React com App Router
- **[Vercel](https://vercel.com/)** — Hospedagem e deploy automatico
- **[GitHub REST API v3](https://docs.github.com/en/rest)** — Fonte dos dados

---

## Licenca

Este projeto e de uso livre. Faca fork, modifique e use como quiser.
