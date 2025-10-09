// b) Importa o pacote readline-sync
const readline = require('readline-sync');

// c) Importa o controlador
const controlador = require('./controlador');

// d) Função para exibir o menu
function menu() {
  console.log('\n=== MENU PRINCIPAL ===');
  console.log('1 - Adicionar tarefa');
  console.log('2 - Buscar tarefa');
  console.log('3 - Atualizar tarefa');
  console.log('4 - Remover tarefa');
  console.log('5 - Sair');
}

// e–f) Função para escolher a opção
async function escolherOpcao(opcao) {
  switch (opcao) {
    case '1':   // Adicionar tarefa
      const nomeAdicionar = readline.question('Digite o nome da tarefa: ');
      await controlador.adicionarTarefa(nomeAdicionar);
      console.log('Tarefa adicionada com sucesso!');
      break;

    case '2':   // Buscar tarefa
      const nomeBuscar = readline.question('Digite o nome da tarefa: ');
      const tarefaBuscada = await controlador.buscarTarefa(nomeBuscar);
      if (tarefaBuscada.id) {
        console.log(`Nome: ${tarefaBuscada.nome}`);
        console.log(`Concluída: ${tarefaBuscada.concluida}`);
        console.log(`ID: ${tarefaBuscada.id}`);
      } else {
        console.log('Tarefa não encontrada.');
      }
      break;

    case '3':   // Atualizar tarefa
      const nomeAtualizar = readline.question('Digite o nome da tarefa: ');
      const concluidaAtualizar = readline.question('A tarefa está concluída? (true/false): ');
      const concluidaBool = concluidaAtualizar.toLowerCase() === 'true';
      await controlador.atualizarTarefa(nomeAtualizar, concluidaBool);
      console.log('Tarefa atualizada com sucesso!');
      break;

    case '4':   // Remover tarefa
      const nomeRemover = readline.question('Digite o nome da tarefa: ');
      await controlador.removerTarefa(nomeRemover);
      console.log('Tarefa removida com sucesso!');
      break;

    case '5':   // Sair
      console.log('Encerrando o programa...');
      process.exit();

    default:
      console.log('Opção inválida. Tente novamente.');
  }
}


async function main() {
  while (true) {
    menu();
    const opcao = readline.question('Escolha uma opção: ');
    await escolherOpcao(opcao);
  }
}

main();