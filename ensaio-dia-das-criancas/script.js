// ===================== CONFIGURAÇÃO — edite aqui =====================
const CONFIG = {
  marca: "Studio Lumina IA",
  whatsapp: "5516994184633",     // número que recebe os pedidos (DDI + DDD + número)
  instagram: "studi_olumina",    // perfil mostrado no rodapé (sem @)
  prazoDias: 3,                  // prazo de entrega em dias
  metaPixelId: "",               // ID do Pixel da Meta (Facebook/Instagram Ads)
  pacotes: [
    { nome: "Express", fotos: 3, preco: 14.9,
      desc: "Ideal para quem quer testar ou criar algumas fotos novas para o perfil e as redes sociais." },
    { nome: "Essencial", fotos: 5, preco: 19.9,
      desc: "Perfeito para quem quer um mini ensaio com mais opções de pose, enquadramento e cenário." },
    { nome: "Completo", fotos: 10, preco: 39.9, destaque: true, selo: "Recomendado",
      desc: "Ideal para quem quer várias imagens para postar, emoldurar e montar um ensaio mais completo." },
    { nome: "Premium", fotos: 25, preco: 69.9, selo: "Mais completo", porFoto: true,
      desc: "Nosso pacote mais completo, com mais variedade de estilos, cenários, poses e resultados." },
  ],
  inclusos: [
    "Fotos criadas com IA a partir das suas referências",
    "Cenários e estilos personalizados",
    "Você escolhe o tema das fotos",
    "Entrega pelo WhatsApp",
  ],
};
// =====================================================================

const brl = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const waLink = (msg) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
const profileLink = () => `https://www.instagram.com/${CONFIG.instagram}/`;

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

// ----- Pacotes -----
function renderPackages() {
  const box = document.getElementById("packages");
  CONFIG.pacotes.forEach((p) => {
    const card = el("div", "pack" + (p.destaque ? " featured" : ""));
    if (p.selo) card.appendChild(el("span", "pack-flag" + (p.destaque ? "" : " soft"), p.selo));
    card.appendChild(el("h3", null, "Pacote " + p.nome));
    card.appendChild(el("p", "pack-count", `${p.fotos} fotos com IA`));
    card.appendChild(el("div", "pack-price", brl(p.preco)));
    if (p.porFoto) card.appendChild(el("p", "pack-per", `sai ${brl(p.preco / p.fotos)} por foto`));
    card.appendChild(el("p", "pack-desc", p.desc));
    const btn = el("a", "btn " + (p.destaque ? "btn-wa" : "btn-ghost"), "Quero o " + p.nome);
    btn.dataset.wa = `Olá! Quero o Pacote ${p.nome} (${p.fotos} fotos) do ensaio de Dia das Crianças.`;
    card.appendChild(btn);
    box.appendChild(card);
  });
  const inc = document.getElementById("inclusos");
  CONFIG.inclusos.forEach((i) => inc.appendChild(el("li", null, i)));
  document.getElementById("pack-note").textContent =
    `Entrega em até ${CONFIG.prazoDias} dias após o envio das fotos.`;
}

// ----- Countdown honesto até o Dia das Crianças -----
function setupCountdown() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const day = new Date(now.getFullYear(), 9, 12); // 12 de outubro
  const msDay = 86400000;
  const daysLeft = Math.round((day - today) / msDay);
  const topbar = document.getElementById("topbar-deadline");
  if (daysLeft < 0) {
    topbar.textContent = "Ensaios infantis com IA, o ano todo";
    return;
  }
  const orderBy = new Date(day.getTime() - CONFIG.prazoDias * msDay);
  const fmt = (d) => d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  document.getElementById("cd-days").textContent = daysLeft;
  document.querySelector(".countdown-num small").textContent = daysLeft === 1 ? "dia" : "dias";
  const orderText = today <= orderBy
    ? `Peça até ${fmt(orderBy)} para receber antes da data.`
    : "Fale com a gente para ver se ainda dá tempo.";
  document.getElementById("cd-order-by").textContent = orderText;
  document.getElementById("countdown").hidden = daysLeft === 0;
  topbar.textContent = today <= orderBy
    ? `Peça até ${fmt(orderBy)} e receba antes do Dia das Crianças`
    : "Últimos pedidos para o Dia das Crianças";
}

// ----- Imagens ainda não enviadas viram um espaço reservado -----
function setupPlaceholders() {
  document.querySelectorAll("img[data-ph]").forEach((img) => {
    const mark = () => {
      const box = img.parentElement;
      if (img.hasAttribute("data-optional")) {
        box.hidden = true;
        const group = box.closest(".hero-visual, .compare");
        if (box.classList.contains("snapshot")) group.querySelector(".arrow-note").hidden = true;
        if (group.classList.contains("compare")) group.hidden = true;
        return;
      }
      box.classList.add("is-empty");
      box.dataset.phLabel = "Foto: img/" + img.dataset.ph;
    };
    if (img.complete && img.naturalWidth === 0) mark();
    else img.addEventListener("error", mark, { once: true });
  });
}

// ----- Meta Pixel (só carrega se o ID estiver configurado) -----
function setupPixel() {
  if (!CONFIG.metaPixelId) return;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq("init", CONFIG.metaPixelId);
  fbq("track", "PageView");
}

// ----- Checkout pelo WhatsApp + evento de Lead -----
function setupWhatsApp() {
  document.querySelectorAll("[data-ig-profile]").forEach((a) => {
    a.href = profileLink();
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = waLink(a.dataset.wa);
    a.addEventListener("click", () => {
      if (window.fbq) fbq("track", "Lead", { content_name: a.dataset.wa });
    });
  });
}

// ----- Botão fixo aparece depois que o hero sai da tela -----
function setupSticky() {
  const sticky = document.querySelector(".sticky-cta");
  const hero = document.querySelector(".hero");
  const finalCta = document.querySelector(".final");
  if (!("IntersectionObserver" in window)) { sticky.classList.add("show"); return; }
  let heroVisible = true, finalVisible = false;
  const update = () => sticky.classList.toggle("show", !heroVisible && !finalVisible);
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; update(); }).observe(hero);
  new IntersectionObserver(([e]) => { finalVisible = e.isIntersecting; update(); }).observe(finalCta);
}

// ----- Seções surgem suavemente ao rolar -----
function setupReveal() {
  const items = document.querySelectorAll(".section-head, .feel .wrap, .gallery, .compare, .steps li, .use, .pack, .trust-item, .faq, .final .wrap");
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
  items.forEach((i) => { i.classList.add("reveal"); io.observe(i); });
}

document.querySelectorAll('[data-cfg="prazo"]').forEach((e) => (e.textContent = `${CONFIG.prazoDias} dias`));
document.querySelectorAll('[data-cfg="marca"]').forEach((e) => (e.textContent = CONFIG.marca));
document.querySelectorAll('[data-cfg="instagram"]').forEach((e) => (e.textContent = CONFIG.instagram));
renderPackages();
setupCountdown();
setupPlaceholders();
setupPixel();
setupWhatsApp();
setupSticky();
setupReveal();
