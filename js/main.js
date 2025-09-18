// Cabeçalho responsivo
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
  "#box-nav-reponsive ul li",
);

mobileNavbar.init();

// Cabeçalho fixo no topo com efeito
window.addEventListener("scroll", () => {
  const navMobile = document.getElementById("box-nav-reponsive");
  const header = document.getElementById("header-site");

  header.classList.toggle("header-fixed-top", window.scrollY > 0);
  navMobile.classList.toggle("nav-fix", window.scrollY > 0)
});

// Efeito de digitação para a Seção Principal
function efeitoDigitacao(elemento, texto, velocidade = 50) {
  let i = 0;
  elemento.textContent = '';

  function digitar() {
    if (i < texto.length) {
      elemento.textContent += texto.charAt(i);
      i++;
      setTimeout(digitar, velocidade);
    }
  }

  digitar();
}

// Ativar efeito quando a página carregar
window.addEventListener('load', () => {
  const tituloHeroi = document.querySelector('.principal-home h1');
  const textoOriginal = tituloHeroi.textContent;

  setTimeout(() => {
    efeitoDigitacao(tituloHeroi, textoOriginal, 80);
  }, 500);
});

// Animação escalonada para cartões de serviço
const opcoes_observador = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.style.opacity = '1';
      entrada.target.style.transform = 'translateY(0)';
    }
  });
}, opcoes_observador);

// Configurar animações dos cartões
document.addEventListener('DOMContentLoaded', () => {
  const cartoes = document.querySelectorAll('.cartao-servico');

  cartoes.forEach((cartao, indice) => {
    // Estado inicial
    cartao.style.opacity = '0';
    cartao.style.transform = 'translateY(30px)';
    cartao.style.transition = `opacity 0.6s ease ${indice * 0.1}s, transform 0.6s ease ${indice * 0.1}s`;

    // Observar cartão
    observador.observe(cartao);
  });

  // Animação do título
  const titulo = document.querySelector('.servicos h2');
  titulo.style.opacity = '0';
  titulo.style.transform = 'translateY(-30px)';
  titulo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

  setTimeout(() => {
    titulo.style.opacity = '1';
    titulo.style.transform = 'translateY(0)';
  }, 100);
});



// Sistema de carrossel simples para depoimentos
let depoimentoAtivo = 0;
const depoimentos = document.querySelectorAll('.depoimento');
const totalDepoimentos = depoimentos.length;

// Inicializar depoimentos (mostrar apenas o primeiro)
function inicializarDepoimentos() {
  depoimentos.forEach((depoimento, indice) => {
    if (indice === 0) {
      depoimento.style.display = 'block';
      depoimento.style.opacity = '1';
      depoimento.style.transform = 'translateX(0)';
    } else {
      depoimento.style.display = 'none';
      depoimento.style.opacity = '0';
      depoimento.style.transform = 'translateX(50px)';
    }
    depoimento.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
}

// Trocar depoimento
function trocarDepoimento(novoIndice) {
  const depoimentoAnterior = depoimentos[depoimentoAtivo];
  const novoDepoimento = depoimentos[novoIndice];

  // Ocultar depoimento anterior
  depoimentoAnterior.style.opacity = '0';
  depoimentoAnterior.style.transform = 'translateX(-50px)';

  setTimeout(() => {
    depoimentoAnterior.style.display = 'none';

    // Mostrar novo depoimento
    novoDepoimento.style.display = 'block';
    novoDepoimento.style.transform = 'translateX(50px)';

    setTimeout(() => {
      novoDepoimento.style.opacity = '1';
      novoDepoimento.style.transform = 'translateX(0)';
    }, 50);
  }, 300);

  depoimentoAtivo = novoIndice;
}

// Avançar para próximo depoimento
function proximoDepoimento() {
  const proximoIndice = (depoimentoAtivo + 1) % totalDepoimentos;
  trocarDepoimento(proximoIndice);
}

// Voltar ao depoimento anterior
function depoimentoAnterior() {
  const indiceAnterior = (depoimentoAtivo - 1 + totalDepoimentos) % totalDepoimentos;
  trocarDepoimento(indiceAnterior);
}

// Auto-play dos depoimentos
function iniciarAutoPlay() {
  setInterval(proximoDepoimento, 20000);
}

// Inicializar quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  // Configurar animação do título
  const titulo = document.querySelector('.depoimentos h2');
  titulo.style.opacity = '0';
  titulo.style.transform = 'translateY(-30px)';
  titulo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

  setTimeout(() => {
    titulo.style.opacity = '1';
    titulo.style.transform = 'translateY(0)';
  }, 100);

  // Inicializar depoimentos
  inicializarDepoimentos();

  // Iniciar auto-play após um pequeno delay
  setTimeout(iniciarAutoPlay, 20000);

  // Adicionar controles de navegação se necessário
  criarControlesNavegacao();
});

// Criar controles de navegação (pontos indicadores)
function criarControlesNavegacao() {
  const container = document.querySelector('.container-depoimentos');
  const controles = document.createElement('div');
  controles.className = 'controles-depoimentos';
  controles.style.cssText = `
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 2rem;
  `;

  depoimentos.forEach((_, indice) => {
    const ponto = document.createElement('button');
    ponto.className = 'ponto-controle';
    ponto.style.cssText = `
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid #ccc;
      background: ${indice === 0 ? 'linear-gradient(90deg, #FA6200, #F09617, #00C48C)' : 'transparent'};
      cursor: pointer;
      transition: all 0.3s ease;
      outline: none; /* remove o contorno roxo do foco */
    `;

    ponto.addEventListener('click', () => {
      trocarDepoimento(indice);
      atualizarPontos(indice);
    });

    controles.appendChild(ponto);
  });

  container.appendChild(controles);
}

// Atualizar pontos indicadores
function atualizarPontos(indiceAtivo) {
  const pontos = document.querySelectorAll('.ponto-controle');
  pontos.forEach((ponto, indice) => {
    ponto.style.background =
      indice === indiceAtivo
        ? 'linear-gradient(90deg, #FA6200, #F09617, #00C48C)'
        : 'transparent';
    ponto.style.border = '2px solid #ccc';
    ponto.style.outline = 'none';
  });
}