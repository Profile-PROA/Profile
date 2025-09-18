/* Seção - Equipe */
const containerCards = document.getElementById('containerCardsEquipe');
let slideAtual = 0;

const cards = containerCards.querySelectorAll('.card-membro');
const totalCards = cards.length;

// Quantos cards aparecem por slide (ajuste conforme necessário)
const cardsPorSlide = 3; 
const totalSlides = Math.ceil(totalCards / cardsPorSlide);

// Adiciona transição suave
containerCards.style.transition = "transform 0.8s ease";

// Atualiza a posição do carrossel
function atualizarCarrossel() {
    const deslocamento = - (slideAtual * cardsPorSlide * 350); // ajuste 350 conforme largura do card + gap
    containerCards.style.transform = `translateX(${deslocamento}px)`;
}

// Move para o próximo slide
function moverCarrossel() {
    slideAtual++;
    if (slideAtual >= totalSlides) slideAtual = 0;
    atualizarCarrossel();
}

// Rolagem automática a cada 5 segundos
setInterval(moverCarrossel, 5000);

/* --- Observer para animação de todos os elementos --- */
const opcoesObserver = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("animar-entrada");
      observador.unobserve(entrada.target);
    }
  });
}, opcoesObserver);

document.querySelectorAll(
  "section, h1, h2, h3, p, img, .cartao-servico, .cartao-modelo, .depoimento, .botao-cta"
).forEach((el) => {
  el.classList.add("antes-animacao");
  observador.observe(el);
});

// Aplica o observer apenas nos elementos dentro de sections principais, excluindo footer
document.querySelectorAll(
  "section, h1, h2, h3, p, img, .cartao-servico, .cartao-modelo, .depoimento, .botao-cta"
).forEach((el) => {
  // ignora elementos que estejam dentro do footer
  if (!el.closest('footer')) {
    el.classList.add("antes-animacao");
    observador.observe(el);
  }
});

// Aplica observer apenas em elementos "fixos" da página, excluindo footer e indicadores
document.querySelectorAll(
  "section, h1, h2, h3, p, img, .cartao-servico, .cartao-modelo, .depoimento, .botao-cta"
).forEach((el) => {
  // Ignora elementos dentro do footer ou com a classe de indicadores
  if (!el.closest('footer') && !el.classList.contains('ponto-controle') && !el.closest('.controles-depoimentos')) {
    el.classList.add("antes-animacao");
    observador.observe(el);
  }
});