/*Seção - Equipe*/
const containerCards = document.getElementById('containerCardsEquipe');
const indicadoresContainer = document.getElementById('indicadoresCarrossel');
let slideAtual = 0;

const cards = containerCards.querySelectorAll('.card-membro');
const totalCards = cards.length;

const totalIndicadores = 6;

for (let i = 0; i < totalIndicadores; i++) {
    const indicador = document.createElement('div');
    indicador.classList.add('indicador');
    if (i === 0) indicador.classList.add('ativo');
    indicador.addEventListener('click', () => {
        irParaSlide(i);
    });
    indicadoresContainer.appendChild(indicador);
}

function atualizarCarrossel() {

    const cardsPorSlide = Math.ceil(totalCards / totalIndicadores);
    const deslocamento = - (slideAtual * cardsPorSlide * 350);
    containerCards.style.transform = `translateX(${deslocamento}px)`;

    const indicadores = indicadoresContainer.querySelectorAll('.indicador');
    indicadores.forEach((indicador, index) => {
        indicador.classList.toggle('ativo', index === slideAtual);
    });
}

function moverCarrossel(direcao) {
    slideAtual += direcao;

    if (slideAtual >= totalIndicadores) {
        slideAtual = 0;
    } else if (slideAtual < 0) {
        slideAtual = totalIndicadores - 1;
    }

    atualizarCarrossel();
}

function irParaSlide(index) {
    slideAtual = index;
    atualizarCarrossel();
}

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

// Adicionar estado inicial a todos os elementos que terão animação
document.querySelectorAll(
  "section, h1, h2, h3, p, img, .cartao-servico, .cartao-modelo, .depoimento, .botao-cta"
).forEach((el) => {
  el.classList.add("antes-animacao");
  observador.observe(el);
});