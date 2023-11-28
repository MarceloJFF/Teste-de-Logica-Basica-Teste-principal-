const { off } = require("process");

var input = require("fs").readFileSync("stdin", "utf8");
var lines = input.split("\n");
let linhaEntrada = "";

class Piloto {
  id;
  posicoes_corridas = [];
  pontuacoesNosSistemasPontuacoes = [];

  constructor(id) {
    this.id = id;
  }
  calcularSomaPontuacoes() {
    return this.pontuacoesNosSistemasPontuacoes.reduce((total, pontuacao) => total + pontuacao, 0);
  }
  atualizarPosicao(objPosicaoCorrida) {
    this.posicoes_corridas.push(objPosicaoCorrida);
  }
}

class Corrida {
  pilotos = null;
  adicionarPilotosNaCorrida(pilotos) {
    this.pilotos = pilotos;
  }

  lerPosicoesPilotosNaCorrida() {
    const posicoesPilotos = lerEntrada().split(" ").map(Number);

    for (let i = 1; i <= this.pilotos.length; i++) {
      this.pilotos[i - 1].atualizarPosicao({
        corrida: this,
        posicao: Number(posicoesPilotos[i - 1]),
      });
    }
  }

  calcularPontuacaoNoSistemaPontuacao(pontuacoes,indiceCorrida) {
    this.pilotos.forEach((piloto) => {
      const posicaoNaCorrida = piloto.posicoes_corridas[indiceCorrida]
      let pontuacao = pontuacoes[posicaoNaCorrida.posicao - 1] || 0;
      piloto.pontuacoesNosSistemasPontuacoes.push(pontuacao);
    });
  }
}


//funcao que inicial do script. 
function iniciarCampeonatoF1(){
  while (lines[0] !== "0 0") {
    linhaEntrada = lerEntrada().split(" ");
    let numeroCorridas = Number(linhaEntrada[0]);
    let numeroPilotos = Number(linhaEntrada[1]);
    const pilotos = carregarPilotos(numeroPilotos);
    gerenciarCorridas(pilotos, numeroCorridas, numeroPilotos, linhaEntrada);
  }  
}
//Esta funcao cria os pilotos de acordo com as entradas e os enumera
function carregarPilotos(numeroPilotos) {
  const pilotos = [];
  for (let i = 1; i <= numeroPilotos; i++) {
    const pilotoAtual = new Piloto(i);
    pilotos.push(pilotoAtual);
  }
  return pilotos;
}
//funcao utilitaria para lidar com entrada de dados
function lerEntrada() {
  return lines.length > 0 ? lines.shift() : "";
}
/* principal funcao do script que lida com o gerenciamento da corrida, ou seja,
criacao das corridas e pontuacao dos pilotos de acordo com os sistemas de pontuacao*/
function gerenciarCorridas(
  pilotos,
  numeroCorridas,
  numeroPilotos,
  linhaEntrada
) {
  if (numeroCorridas === 1) {
    const corridas =[ criarCorrida(
      pilotos,
      numeroCorridas,
      numeroPilotos,
      linhaEntrada
    )];
    let numerosDeSistemasDePontuacao = Number(lerEntrada());
    for(let i = 0; i < numerosDeSistemasDePontuacao; i++){
      let linha = lerEntrada().split(" ");
      let maxPosicaoPontuada = Number(linha.shift());
      gerarPontuacoes(corridas,linha);
      mostrarCampeaoSistemaPontuacao(pilotos)
      limparPontuacaoDoPilotoNoSistemaPontuacao(pilotos)
    }
  } else {
    const corridas = [];
    for (let i = 0; i < numeroCorridas; i++) {
      corridas.push(
        criarCorrida(pilotos, numeroCorridas, numeroPilotos, linhaEntrada)
      );
    }
    let numerosDeSistemasDePontuacao = Number(lerEntrada());
    for(let i = 0; i < numerosDeSistemasDePontuacao; i++){
      let linha = lerEntrada().split(" ");
      let maxPosicaoPontuada = Number(linha.shift());
      gerarPontuacoes(corridas,linha);
      mostrarCampeaoSistemaPontuacao(pilotos)
      limparPontuacaoDoPilotoNoSistemaPontuacao(pilotos)
    }

  }

}

function limparPontuacaoDoPilotoNoSistemaPontuacao(pilotos){
  pilotos.forEach(piloto => piloto.pontuacoesNosSistemasPontuacoes =[]);
}

function mostrarCampeaoSistemaPontuacao(pilotos){
  // Inicializa a variável para rastrear o maior valor
  let maiorValor = pilotos[0].calcularSomaPontuacoes();
  // Inicializa um array para armazenar os índices do maior valor
  let indicesMaiorValor = [pilotos[0].id];

  // Percorre o array a partir do segundo elemento
  for (let i = 1; i < pilotos.length; i++) {
    const valorAtual = pilotos[i].calcularSomaPontuacoes();
    // Se o valor atual for maior que o maior valor registrado
    if (valorAtual > maiorValor) {
      // Atualiza o maior valor
      maiorValor = valorAtual;
      // Reinicializa o array de índices com o índice atual
      indicesMaiorValor = [pilotos[i].id];
    } else if (valorAtual === maiorValor) {
      // Se o valor atual for igual ao maior valor registrado, adiciona o índice ao array
      indicesMaiorValor.push(pilotos[i].id);
    }
  }

  if (indicesMaiorValor.length === 1) {
    console.log(indicesMaiorValor[0]);
  } else {
    console.log(indicesMaiorValor.join(" "))
  }


}

/*funcao que gera as pontuacoes dos pilotos nas corridas de acordo com os sistemas
de pontuacao informados*/
function gerarPontuacoes(corridas,linha) {
  if(corridas.length > 1){
    corridas.forEach((corrida,indiceCorrida)=>{
      const pontuacoes = linha.map(Number);
      corrida.calcularPontuacaoNoSistemaPontuacao(pontuacoes, indiceCorrida);
    })
  }else{
    const pontuacoes = linha.map(Number);
    const indiceCorrida = 0;
    corridas[0].calcularPontuacaoNoSistemaPontuacao(pontuacoes,indiceCorrida);
  }
}
/* funcao utilitaria para criar uma corrida*/
function criarCorrida(pilotos, numeroCorridas, numeroPilotos, linhaEntrada) {
  const corrida = new Corrida();
  corrida.adicionarPilotosNaCorrida(pilotos);
  corrida.lerPosicoesPilotosNaCorrida();
  return corrida;
}


iniciarCampeonatoF1();