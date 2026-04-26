# HQMania

HQMania e uma biblioteca/catalogo digital ficticio de historias em quadrinhos, criada como primeira versao do RA1 da disciplina **Web Development: Framework**.

## Objetivo

Migrar a ideia de um site antigo feito em HTML, CSS e JavaScript para uma aplicacao React inicial, com componentes reutilizaveis, rotas, layout e organizacao de codigo. Esta etapa nao inclui backend, banco de dados, login real ou CRUD completo.

## Tecnologias usadas

- React
- Vite
- React Router DOM
- CSS

## Como instalar e rodar

```bash
npm install
npm run dev
```

Depois, acesse o endereco local exibido pelo Vite no terminal.

## Estrutura de pastas

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── CardHQ.jsx
│   └── Layout.jsx
├── pages/
│   ├── Home.jsx
│   ├── Catalogo.jsx
│   ├── Sobre.jsx
│   └── Contato.jsx
├── routes/
│   └── AppRoutes.jsx
├── data/
│   └── hqs.js
├── App.jsx
├── main.jsx
└── styles.css
```

## O que foi feito no RA1

- Criacao do projeto React com estrutura Vite.
- Configuracao de rotas com React Router DOM.
- Criacao de layout reutilizavel com Navbar e Footer.
- Criacao do componente reutilizavel `CardHQ`.
- Criacao de dados ficticios com pelo menos 6 HQs.
- Pagina Home com apresentacao do HQMania e cards em destaque.
- Pagina Catalogo renderizando cards com `map()`.
- Pagina Sobre explicando o objetivo academico do projeto.
- Pagina Contato com formulario visual.
- CSS responsivo com fundo claro, header escuro, destaque amarelo e cards arredondados.
