const cell = document.querySelectorAll('.cell');
const msg = document.getElementById('msg');
const reset = document.getElementById('reset_button');
const jogador_elemento = document.getElementById('jogador_atual');

let jogador_atual = 'X';
let jogo_ativo = true;
let tabuleiro = ['', '', '', '', '', '', '', '', ''];

const combinacoes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cell.forEach(cell => {
    cell.addEventListener('click', verclick);
});

function verclick(evento) {
    const cell_clicada = evento.target;
    const index = cell_clicada.getAttribute('data-index');

    if (tabuleiro[index] !== '' || !jogo_ativo) {
        return;
    }

    tabuleiro[index] = jogador_atual;
    cell_clicada.textContent = jogador_atual;
    cell_clicada.style.color = jogador_atual === 'X' ? '#e74c3c' : '#3498db';

    verificar();
}

function verificar() {
    let venceu = false;

    for (let i = 0; i < combinacoes.length; i++) {
        const [a, b, c] = combinacoes[i];

        if (
            tabuleiro[a] !== '' &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]
        ) {
            venceu = true;
            break;
        }
    }

    if (venceu) {
        msg.textContent = `Jogador ${jogador_atual} venceu!`;
        jogo_ativo = false;
        return;
    }

    if (!tabuleiro.includes('')) {
        msg.textContent = 'Empate!';
        jogo_ativo = false;
        return;
    }

    jogador_atual = jogador_atual === 'X' ? 'O' : 'X';
    jogador_elemento.textContent = jogador_atual;
}

function reiniciar() {
    jogador_atual = 'X';
    jogo_ativo = true;
    tabuleiro = ['', '', '', '', '', '', '', '', ''];

    msg.textContent = '';
    jogador_elemento.textContent = jogador_atual;

    cell.forEach(cell => {
        cell.textContent = '';
    });
}

reset.addEventListener('click', reiniciar);

jogador_elemento.textContent = jogador_atual;
