# 📚 Book Finder — Projeto IONIC/Angular

Aplicativo de busca de livros usando a [Open Library API](https://openlibrary.org/developers/api) (pública, sem token, sem autenticação).

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- npm instalado

### Instalação

```bash
# 1. Instalar o Ionic CLI globalmente (se não tiver)
npm install -g @ionic/cli

# 2. Entrar na pasta do projeto
cd book-finder-ionic

# 3. Instalar as dependências
npm install

# 4. Rodar o projeto
ionic serve
# OU
ng serve
```

O app estará disponível em: **http://localhost:4200**

---

## 📁 Estrutura do Projeto

```
src/
└── app/
    ├── app.component.ts          ← Raiz da aplicação
    ├── app.config.ts             ← Configuração (providers)
    ├── app.routes.ts             ← Rotas (home e detail/:id)
    │
    ├── home/
    │   ├── home.page.ts          ← Lógica da tela principal
    │   ├── home.page.html        ← Template com @for, @if, pipes, diretiva
    │   └── home.page.scss        ← Estilização
    │
    ├── detail/
    │   ├── detail.page.ts        ← Lógica da tela de detalhe (lê parâmetro de rota)
    │   ├── detail.page.html      ← Template da tela de detalhe
    │   └── detail.page.scss      ← Estilização
    │
    ├── services/
    │   └── books.service.ts      ← Service com HttpClient e métodos GET
    │
    ├── pipes/
    │   └── book-pages.pipe.ts    ← Pipe personalizado (formata nº de páginas)
    │
    └── directives/
        └── highlight.directive.ts ← Diretiva personalizada (destaque visual)
```





## 🌐 API Utilizada

**Open Library Search API**
- URL: `https://openlibrary.org/search.json?q=tolkien&limit=20`
- Tipo: Pública, gratuita, **sem necessidade de token ou cadastro**
- Retorna: lista de livros com título, autor, ano, número de páginas e ID da capa
- Detalhe de obra: `https://openlibrary.org/works/{id}.json`

---

## 📝 Observações Finais

- Projeto usa **Angular 18 com Standalone Components** (sem NgModule)
- Todos os componentes, pipes e diretivas são `standalone: true`
- O `HttpClient` é provido via `provideHttpClient()` no `app.config.ts`
- O `IonApp` e `IonRouterOutlet` estão no `app.component.ts`
