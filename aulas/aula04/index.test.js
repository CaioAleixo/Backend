import { soma, divisao } from './index.js';


if (soma(1,1) === 2) {
    console.log("Passou 1!");
}else {
    console.log("Deu ruim 1!");
}

if (soma(1,0) === 1){
    console.log("Passou 2!");
}else {
    console.log("Deu ruim 2!");
}

if (soma(1,-1) === 0){
    console.log("Passou 3!");
}else {
    console.log("Deu ruim 3!");
}

if (divisao(1,1) === 1){
    console.log("Passou 4!");
}else {
    console.log("Deu ruim 4!");
}

if (divisao(6,3) === 2){
    console.log("Passou 5!");
}else {
    console.log("Deu ruim 5!");
}

if (divisao(1,0) === undefined){
    console.log("Passou 6!");
}else {
    console.log("Deu ruim 6!");
}
