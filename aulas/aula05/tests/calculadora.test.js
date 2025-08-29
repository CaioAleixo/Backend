const calculadora = require("../src/calculadora.js");

describe ("Testa as funções da calculadora.js", function (){

test ("2 + 2 = 4?", function(){
    expect(calculadora.soma(2, 2)).toBe(4);
});

test ("2 + 0 = 2?", function(){
    expect(calculadora.soma(2, 0)).toBe(2);
});

test ("-2 + 4 = 2?", function(){
    expect(calculadora.soma(-2, 4)).toBe(2);
});

test ("Multiplica inteiro com inteiro da inteiro?", function(){
    expect(calculadora.multiplicacao).toBeDefined();
    expect(calculadora.multiplicacao(2, 2)).toBe(4);
    expect(calculadora.multiplicacao(2, 0)).toBe(0);
});


test ("Não pode dividir por ZERO", function(){
    expect(calculadora.divisao).toBeDefined();
    expect(() => calculadora.divisao(2, 0)).toThrow("Divisão por zero!");
    expect(calculadora.divisao(8, 4)).toBe(2);
});

})