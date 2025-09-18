/* ============================
   MENU MOBILE RESPONSIVO
============================ */
class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 3 + 0.3}s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  handleResize() {
    if (window.innerWidth > 1024) {
      this.navList.classList.remove(this.activeClass);
      this.mobileMenu.classList.remove(this.activeClass);
      this.navLinks.forEach(link => (link.style.animation = "")); // limpa animações
    }
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  addResizeEvent() {
    window.addEventListener("resize", this.handleResize);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
      this.addResizeEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".btn-mobile",
  "#box-nav-reponsive",
  "#box-nav-reponsive ul li"
);
mobileNavbar.init();

/* ============================
   CABEÇALHO FIXO NO TOPO
============================ */
window.addEventListener("scroll", () => {
  const navMobile = document.getElementById("box-nav-reponsive");
  const header = document.getElementById("header-site");

  header.classList.toggle("header-fixed-top", window.scrollY > 0);
  navMobile.classList.toggle("nav-fix", window.scrollY > 0);
});

/* ============================
   EFEITO DE DIGITAÇÃO
============================ */
function efeitoDigitacao(elemento, texto, velocidade = 50) {
  let i = 0;
  elemento.textContent = "";

  function digitar() {
    if (i < texto.length) {
      elemento.textContent += texto.charAt(i);
      i++;
      setTimeout(digitar, velocidade);
    }
  }

  digitar();
}

window.addEventListener("load", () => {
  const tituloHeroi = document.querySelector(".principal-home h1");
  const textoOriginal = tituloHeroi.textContent;

  setTimeout(() => {
    efeitoDigitacao(tituloHeroi, textoOriginal, 80);
  }, 500);
});

/* ============================
   ANIMAÇÃO GLOBAL COM OBSERVER
============================ */
const opcoesObserver = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("animar-entrada");
      observador.unobserve(entrada.target); // só anima uma vez
    }
  });
}, opcoesObserver);

// Aplica observer apenas em elementos fora do footer
document.querySelectorAll(
  "section, h1, h2, h3, p, img, .cartao-servico, .cartao-modelo, .depoimento, .botao-cta"
).forEach((el) => {
  if (!el.closest('footer')) { // ignora elementos dentro do footer
    el.classList.add("antes-animacao");
    observador.observe(el);
  }
});

/* ============================
   CARROSSEL DE DEPOIMENTOS
============================ */
let depoimentoAtivo = 0;
const depoimentos = document.querySelectorAll(".depoimento");
const totalDepoimentos = depoimentos.length;

function inicializarDepoimentos() {
  depoimentos.forEach((depoimento, indice) => {
    if (indice === 0) {
      depoimento.style.display = "block";
      depoimento.style.opacity = "1";
      depoimento.style.transform = "translateX(0)";
    } else {
      depoimento.style.display = "none";
      depoimento.style.opacity = "0";
      depoimento.style.transform = "translateX(50px)";
    }
    depoimento.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });
}

function trocarDepoimento(novoIndice) {
  const depoimentoAnterior = depoimentos[depoimentoAtivo];
  const novoDepoimento = depoimentos[novoIndice];

  depoimentoAnterior.style.opacity = "0";
  depoimentoAnterior.style.transform = "translateX(-50px)";

  setTimeout(() => {
    depoimentoAnterior.style.display = "none";
    novoDepoimento.style.display = "block";
    novoDepoimento.style.transform = "translateX(50px)";

    setTimeout(() => {
      novoDepoimento.style.opacity = "1";
      novoDepoimento.style.transform = "translateX(0)";
    }, 50);
  }, 300);

  depoimentoAtivo = novoIndice;
}

function proximoDepoimento() {
  const proximoIndice = (depoimentoAtivo + 1) % totalDepoimentos;
  trocarDepoimento(proximoIndice);
}

function depoimentoAnteriorFunc() {
  const indiceAnterior = (depoimentoAtivo - 1 + totalDepoimentos) % totalDepoimentos;
  trocarDepoimento(indiceAnterior);
}

function iniciarAutoPlay() {
  setInterval(proximoDepoimento, 5000);
}

function criarControlesNavegacao() {
  const container = document.querySelector(".container-depoimentos");
  const controles = document.createElement("div");
  controles.className = "controles-depoimentos";
  controles.style.cssText = `
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 2rem;
  `;

  depoimentos.forEach((_, indice) => {
    const ponto = document.createElement("button");
    ponto.className = "ponto-controle";
    ponto.style.cssText = `
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid #ccc;
      background: ${indice === 0 ? "linear-gradient(90deg, #FA6200, #F09617, #00C48C)" : "transparent"};
      cursor: pointer;
      transition: all 0.3s ease;
      outline: none;
    `;

    ponto.addEventListener("click", () => {
      trocarDepoimento(indice);
      atualizarPontos(indice);
    });

    controles.appendChild(ponto);
  });

  container.appendChild(controles);
}

function atualizarPontos(indiceAtivo) {
  const pontos = document.querySelectorAll(".ponto-controle");
  pontos.forEach((ponto, indice) => {
    ponto.style.background =
      indice === indiceAtivo
        ? "linear-gradient(90deg, #FA6200, #F09617, #00C48C)"
        : "transparent";
    ponto.style.border = "2px solid #ccc";
    ponto.style.outline = "none";
  });
}

/* ============================
   INICIALIZAÇÕES NO DOM
============================ */
document.addEventListener("DOMContentLoaded", () => {
  // Título seção serviços
  const tituloServicos = document.querySelector(".servicos h2");
  if (tituloServicos) {
    tituloServicos.classList.add("antes-animacao");
    setTimeout(() => tituloServicos.classList.add("animar-entrada"), 200);
  }

  // Título seção depoimentos
  const tituloDepoimentos = document.querySelector(".depoimentos h2");
  if (tituloDepoimentos) {
    tituloDepoimentos.classList.add("antes-animacao");
    setTimeout(() => tituloDepoimentos.classList.add("animar-entrada"), 200);
  }

  // Inicializar depoimentos
  inicializarDepoimentos();
  setTimeout(iniciarAutoPlay, 20000);
  criarControlesNavegacao();
});