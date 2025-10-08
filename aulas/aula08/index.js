const readline = require("readline-sync");

const conecta = require("./database");

async function inserir(nomeTarefa) {

    const db = await conecta();

    const collection = await db.collection('tarefas');

    const resultado = await collection.insertOne ({
        nome: nomeTarefa,
        concluida: false
    });

    console.log("Tarefa criada com sucesso", resultado);

}

async function buscar (nomeTarefa) {
    const db = await conecta();
    const collection = db.collection("tarefas");
    const resultado = await collection.findOne ({nome: nomeTarefa});
    console.log(resultado);
}

async function alterar (nomeTarefa, nomeAlterado, concluidaAlterado) {
    const db = await conecta();
    const collection = db.collection("tarefas");
    const resultado = await collection.updateOne({nome: nomeTarefa}, { $set: {nome: nomeAlterado, concluida: concluidaAlterado}});
    console.log(resultado);
}

async function remover (nomeTarefa) {
    const db = await conecta();
    const collection = db.collection("tarefas");
    const resultado = await collection.deleteOne({nome: nomeTarefa});
    console.log(resultado);
}

async function main () {
    while(true) {
        console.log("Menu Principal");
        console.log("1 - Criar tarefa");
        console.log("2 - Buscar tarefa");
        console.log("3 - Alterar tarefa");
        console.log("4 - Remover tarefa");
        console.log("5 - Sair");

        const opcao = readline.question("Entre com sua opcao: ");

        switch(parseInt(opcao)) {

            case 1: {
                const nome = readline.question("Informe o nome da tarefa: ");
                await inserir(nome);
                break;
            }
            
            case 2: {
                const nome = readline.question("Informe o nome da tarefa: ");
                await buscar(nome);
                break;
            }

            case 3: {
                const nome = readline.question("Informe o nome da tarefa: ");
                await alterar(nome);
                break;
            }
            case 4: {
                const nome = readline.question("Informe o nome da tarefa: ");
                await remover(nome);
                break;
            }
            case 5: process.exit(0);
        }
    }
}

main();