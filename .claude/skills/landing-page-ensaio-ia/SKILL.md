---
name: landing-page-ensaio-ia
description: Cria e publica landing pages de venda para anúncios no Instagram/Facebook (Meta Ads) com checkout pelo WhatsApp, no estilo da página da Studio Lumina IA (ensaio fotográfico infantil com IA para o Dia das Crianças). Use sempre que Albert pedir uma landing page, página de vendas, página para anúncio, site para subir no Meta/Instagram/Facebook, página de ensaio fotográfico com IA, página de data comemorativa (Dia das Crianças, Dia das Mães, Natal, Páscoa), ou quiser mudar preços, fotos, banner ou checkout de uma página dessas, mesmo que não diga "landing page". Também cobre o roteiro de vídeo/criativo e o texto do anúncio para a mesma oferta.
---

# Landing page de venda com checkout no WhatsApp

Esta skill reproduz o processo que gerou a página da Studio Lumina IA
(https://studio-lumina-ia.vercel.app), que Albert aprovou. O modelo completo
está em `assets/` (`index.html`, `style.css`, `script.js`, `vercel.json`).
Parta sempre desse modelo em vez de começar do zero: ele já resolve layout de
celular, banner de fotos, pacotes, contagem regressiva, Pixel e WhatsApp.

## Quem é o cliente e como falar com ele

- Albert fala português do Brasil, de forma informal e às vezes por áudio
  transcrito. Responda em português simples, sem jargão técnico.
- Ele não gosta de perguntas em excesso. Decida o razoável, faça, e no fim diga
  em poucas linhas o que decidiu. Pergunte só quando faltar algo que ninguém
  além dele sabe (número de WhatsApp, preço) e não houver um padrão sensato.
- Quando ele pedir uma mudança específica ("só mude os preços"), mude só aquilo.
  Ele já pediu explicitamente para não mexer em mais nada.
- Quando ele perguntar "estou enganado?", dê sua opinião honesta em 2-3 frases
  e depois faça.

## Público e oferta (padrão da Studio Lumina IA)

- Público: mães e pais de 29 a 55 anos, renda mais baixa, chegando pelo celular
  vindos de um anúncio. Cada decisão de layout serve a esse visitante.
- Marca: **Studio Lumina IA** · Instagram **@studi_olumina** · WhatsApp
  **5516994184633** (DDI+DDD+número).
- Pacotes visíveis (só dois, para não assustar o público com valores altos):
  1. **Completo** — R$ 29,90, 10 fotos, selo "Recomendado", aparece primeiro,
     com faixa de vantagem e o único botão verde.
  2. **Express** — R$ 14,90, 3 fotos, embaixo, como opção de entrada.
  A diferença pequena de preço (R$ 15 a mais por mais que o triplo de fotos)
  é proposital: empurra o cliente para o Completo. Premium (R$ 69,90, 25 fotos)
  e Essencial (R$ 19,90, 5 fotos) existem no `CONFIG` com `oculto: true`.
- Prazo de entrega padrão: 3 dias. A contagem regressiva usa esse prazo para
  calcular "peça até DD/MM".

Para outra marca ou outro produto, troque só o bloco `CONFIG` no topo do
`script.js` e os textos do `index.html`; a estrutura continua a mesma.

## Estrutura da página (nesta ordem)

1. Barra fina no topo com o prazo ("Peça até 09/10 e receba antes do…").
2. Hero: selo da data, título emocional curto, **foto principal logo abaixo do
   título no celular** (o visitante do anúncio precisa ver o resultado na
   primeira tela), texto, botão, contagem regressiva real.
3. "Pense comigo": a dor (milhares de fotos no celular, nenhuma num quadro;
   estúdio é caro e criança não para quieta) e a frase "Criança cresce rápido
   demais. Foto fica para sempre."
4. **Banner grande de demonstração** que troca as fotos sozinho a cada ~4,8 s,
   com setas, bolinhas de progresso, arrastar no celular e etiqueta do tema.
   Albert pediu esse formato especificamente; não volte para grade de fotos.
5. Como funciona em 3 passos (escolhe pacote → envia fotos → recebe).
6. Usos da foto: quadro, presente para os avós, álbum, redes sociais.
7. Pacotes (recomendado primeiro) + lista "Incluso em todos os pacotes".
8. Confiança: sigilo das fotos, escolha do tema, atendimento humano.
9. Perguntas frequentes.
10. Chamada final ("A infância passa. A foto fica.") e botão do WhatsApp.
11. Botão fixo de WhatsApp que aparece depois do hero no celular.

Visual aprovado: fundo blush suave com gradientes entre seções, fonte de título
Young Serif, destaque manuscrito em Caveat, texto em Nunito, rosa como cor de
destaque e verde só nos botões de WhatsApp.

## Checkout pelo WhatsApp

Cada botão monta `https://wa.me/<numero>?text=<mensagem>` com o pacote escolhido
já escrito ("Olá! Quero o Pacote Completo (10 fotos)…"). Assim Albert sabe na
conversa o que a pessoa quer. Se o Pixel da Meta estiver configurado, o clique
dispara o evento `Lead`. Lembre Albert de que a mensagem não leva o preço: a
tabela dele no WhatsApp precisa bater com a página.

(Ele chegou a pedir checkout pelo Direct do Instagram. Isso funciona com
`https://ig.me/m/<perfil>`, mas o Direct não aceita mensagem pronta, então a
página precisa copiar o texto para a área de transferência e avisar a pessoa.
Ele voltou para o WhatsApp; use WhatsApp a menos que ele peça o contrário.)

## Fotos

- Albert manda as fotos pelo chat. **Fotos coladas enquanto você está
  trabalhando chegam só como imagem na conversa e não viram arquivo.** Se
  precisar delas, peça para reenviar numa mensagem separada, com você parado.
  Os arquivos que chegam ficam em `.../images/` do diretório da sessão.
- Você roda na nuvem: caminhos como `C:\Users\Acer\...` não são acessíveis.
  Explique isso em uma frase e ofereça o chat ou o upload no GitHub.
- Redimensione e comprima antes de publicar (largura ~540-1200 px, JPEG
  qualidade ~80, progressivo) para carregar rápido no 4G.
- Ele autorizou: "se achar que pode dar ruim, não põe". Deixe de fora fotos que
  parecem ensaio real de outro fotógrafo com criança real (risco de direito
  autoral e reprovação na Meta). Fotos com cara de IA podem entrar. Artes com
  texto escrito são criativo de anúncio, não foto de galeria.
- O `script.js` esconde automaticamente qualquer foto que não carregar, então a
  página nunca mostra buraco ou "imagem quebrada".

## Publicação

1. Salve no repositório (branch de trabalho da sessão), faça commit e push.
2. Publique no Vercel pelo conector, projeto `studio-lumina-ia`
   (id `prj_LdyLmFgfRcmtryPCB5EmYDWPz0nP`), usando `gitSource` apontando para o
   commit, `target: "production"`.
3. A página fica numa subpasta do repositório. Mantenha o `vercel.json` na
   **raiz** do repositório reescrevendo tudo para essa pasta (modelo em
   `assets/vercel.json`); sem ele o site dá **404**, como já aconteceu.
4. A proteção de login da Vercel deve valer só para `preview`
   (`ssoProtection.deploymentType: "preview"`), senão visitantes não abrem o
   link de produção.
5. Antes de publicar, abra a página localmente com Playwright em 390 px e
   1366 px: sem erros de JS, sem rolagem lateral, pacotes na ordem certa.
6. Este ambiente não consegue abrir o link publicado. Diga isso e peça para
   Albert recarregar com Ctrl+F5 no celular.

## Roteiro de vídeo e texto do anúncio

Quando ele pedir copy para vídeo/criativo, use `references/copy-video.md`:
roteiro de ~35 s em 5 cenas, versão de 15 s para Stories, 3 ganchos para teste
A/B e o texto do Gerenciador de Anúncios. Os preços e o prazo do vídeo precisam
bater com os da página.
