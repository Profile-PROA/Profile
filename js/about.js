/*Seção - Equipe*/

const containerCards = document.getElementById('containerCardsEquipe');
const indicadoresContainer = document.getElementById('indicadoresCarrossel');
let slideAtual = 0;

const cards = containerCards.querySelectorAll('.card-membro');
const totalCards = cards.length;

const totalIndicadores = 2;

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
