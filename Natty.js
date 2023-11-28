/* A sequência de Fibonacci é uma série de números onde cada número é a soma dos dois números anteriores. Ela começa com 0 e 1, e os números subsequentes são calculados somando os dois últimos números da sequência.

Crie um programa que imprima os primeiros 40 números da sequência de Fibonacci.

Exemplo dos primeiros números da sequência: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

*/

//Acha os 40 numeros de Fibonacci
function fibQuarenta() {
  const numerosSequenciaFibonacci = [0, 1];
  let proximoValorSequenciaFibonacci = 0;
  for (let i = 2; i < 40; i++) {
    proximoValorSequenciaFibonacci =
      numerosSequenciaFibonacci[i - 1] + numerosSequenciaFibonacci[i - 2];
    numerosSequenciaFibonacci.push(proximoValorSequenciaFibonacci);
  }
  return numerosSequenciaFibonacci;
}

const arr = fibQuarenta();

console.log(arr);
