function calcularMediaAluno(a1, a2, a3) {

  // b)
  if (a1 === undefined || a2 === undefined) {
    throw new Error('Notas a1 ou a2 não informadas');
  }

  // d)
  if (a1 < 0 || a2 < 0) {
    throw new Error('Notas a1 ou a2 não podem ser negativas');
  }

  if (a3 !== undefined && a3 < 0) {
    throw new Error('Nota a3 não pode ser negativa');
  }

  const mediaBase = a1 * 0.4 + a2 * 0.6;

  if (a3 === undefined) {
    return mediaBase;
  }

  const mediaAlternativa = a3 * 0.4 + a2 * 0.6;

  return Math.max(mediaBase, mediaAlternativa);
}

module.exports = { calcularMediaAluno };