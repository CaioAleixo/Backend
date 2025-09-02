const { calcularMediaAluno } = require('../src/calcularMediaAluno');

describe('Função calcularMediaAluno', () => {

  // a)
  test('Deve lançar erro se a1 ou a2 forem indefinidos', () => {
    expect(() => calcularMediaAluno(undefined, 5)).toThrow('Notas a1 ou a2 não informadas');
    expect(() => calcularMediaAluno(5, undefined)).toThrow('Notas a1 ou a2 não informadas');
  });

  // c)
  test('Deve lançar erro se a1 ou a2 forem negativos', () => {
    expect(() => calcularMediaAluno(-1, 5)).toThrow('Notas a1 ou a2 não podem ser negativas');
    expect(() => calcularMediaAluno(5, -2)).toThrow('Notas a1 ou a2 não podem ser negativas');
  });

  // e)
  test('Deve calcular média base quando a3 não é informada', () => {
    const resultado = calcularMediaAluno(6, 8);
    expect(resultado).toBeCloseTo(6 * 0.4 + 8 * 0.6);
  });

  // g)
  test('Deve lançar erro se a3 for negativa', () => {
    expect(() => calcularMediaAluno(6, 8, -1)).toThrow('Nota a3 não pode ser negativa');
  });

  // i)
  test('Deve calcular melhor média entre a1 e a3 com a2', () => {
    const resultado = calcularMediaAluno(4, 8, 9);
    const esperado = Math.max(4 * 0.4 + 8 * 0.6, 9 * 0.4 + 8 * 0.6);
    expect(resultado).toBeCloseTo(esperado);
  });

  // j)
  test('Deve calcular melhor média entre a3 e a2 com a1', () => {
    const resultado = calcularMediaAluno(9, 4, 3); 
    const esperado = Math.max(9 * 0.4 + 4 * 0.6, 3 * 0.4 + 4 * 0.6);
    expect(resultado).toBeCloseTo(esperado);
  });

});