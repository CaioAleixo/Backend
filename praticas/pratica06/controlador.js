const { Tarefa } = require('./modelo');


async function adicionarTarefa(nome) {
  await Tarefa.init();
  const tarefa = new Tarefa(nome, false);
  await tarefa.inserir();
}

async function buscarTarefa(nome) {
  await Tarefa.init();
  const tarefa = new Tarefa(nome, false);
  await tarefa.buscar();
  return tarefa;
}

async function atualizarTarefa(nome, concluida) {
  await Tarefa.init();
  const tarefa = new Tarefa(nome, false);
  await tarefa.buscar();
  if (tarefa.id) {
    tarefa.nome = nome;
    tarefa.concluida = concluida;
    await tarefa.alterar();
  }
}

async function removerTarefa(nome) {
  await Tarefa.init();
  const tarefa = new Tarefa(nome, false);
  await tarefa.buscar();
  if (tarefa.id) {
    await tarefa.deletar();
  }
}


module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa
};