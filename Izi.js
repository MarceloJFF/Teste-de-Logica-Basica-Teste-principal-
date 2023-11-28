/*
Escreva um programa que imprima os números de 1 a 50. Mas, para múltiplos de 3, em vez do número, imprima "Fizz", e para múltiplos de 5, imprima "Buzz". Para números que são múltiplos de ambos, imprima "FizzBuzz". */

for (let i = 1; i <= 50; i++) {
  if (i % 3 === 0 && i % 5 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}
