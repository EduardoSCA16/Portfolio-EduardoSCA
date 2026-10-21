# Portfólio — Eduardo Santana Cruz Almeida

Currículo online de Eduardo Santana Cruz Almeida, estudante de Engenharia de Software e desenvolvedor Back-end Java.

O portfólio reúne minha apresentação, experiência profissional, projetos, tecnologias e formas de contato em uma interface responsiva.

## Site publicado

[Acessar o portfólio no GitHub Pages](https://eduardosca16.github.io/Portfolio-EduardoSCA/)

## Identidade visual

A paleta combina preto, azul-marinho e azul escuro, com branco suave e cinza nos textos e detalhes. A atualização de cores preserva o layout, a tipografia e as animações do portfólio.

| Uso | Cor |
| --- | --- |
| Fundo principal — preto | `#05070B` |
| Fundos de seções — azul-marinho | `#0A1220` |
| Painéis — azul escuro | `#111E33` |
| Botões e cartões de destaque | `#19365E` |
| Destaques em azul | `#6688B8` |
| Detalhes em azul acinzentado | `#A0B4D0` |
| Texto principal — branco suave | `#EEF0F4` |
| Texto secundário — cinza | `#A0A7B3` |

As cores estão definidas em `assets/css/style.css`. Os efeitos incluem brilho acompanhando o cursor, órbita ao redor da foto, entrada das seções durante a rolagem e realce dos cartões ao passar o mouse. O site também respeita a preferência por movimento reduzido.

## Executar localmente

O projeto usa Vite, TypeScript, HTML e CSS.

Use Node.js 24 e pnpm 11.19.0, versões configuradas no fluxo de publicação do projeto.

```bash
pnpm install
pnpm dev
```

Para gerar a versão de produção:

```bash
pnpm build
```

## Estrutura

- `index.html`: conteúdo e estrutura do portfólio;
- `assets/css/style.css`: identidade visual e responsividade;
- `src/main.ts`: navegação e animações;
- `assets/profile.png`: imagem de perfil substituível.

