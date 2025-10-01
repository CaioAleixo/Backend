let tarefas = [];

const listar = () => {
    return tarefas;
};


const buscarPeloId = (tarefaId) => {

    const tarefaEncontrada = tarefas.find(tarefa => tarefa.id === tarefaId);

    return tarefaEncontrada || null;
};


const criar = (tarefa) => {
    const novaTarefa = {

        id: Math.random().toString(36).substring(2, 9),
       
        ...tarefa
    };
    tarefas.push(novaTarefa);
    return novaTarefa;
};


const atualizar = (tarefaId, novosDados) => {
    const index = tarefas.findIndex(tarefa => tarefa.id === tarefaId);
    if (index !== -1) {

        tarefas[index] = { ...tarefas[index], ...novosDados };
        return tarefas[index];
    }

    return null;
};


const remover = (tarefaId) => {
    const index = tarefas.findIndex(tarefa => tarefa.id === tarefaId);
    if (index !== -1) {

        const [tarefaRemovida] = tarefas.splice(index, 1);
        return tarefaRemovida;
    }

    return null;
};


module.exports = {
    listar,
    buscarPeloId,
    criar,
    atualizar,
    remover
};