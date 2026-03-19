// Pegando a biblioteca FS que e nativa do node para utilizar a funcionalidade de ler arquivos
const fs = require('fs');

// Criei uma constante com o process.argv para utilizar como caminho dos asquivos
const caminhoArquivo = process.argv;

// Criei uma constante para armazenar o arquivo que eu especifiquei a partir do index do caminho da constante "caminhoArquivo"
const link = caminhoArquivo[2];

// utilizei o metodo readFile do FS para ler o arquivo armazenado na constante "link"
fs.readFile(link, 'utf-8', (erro, texto) => {
    quebraEmParagrafos(texto) // Funcao que ira separar o arquivo sendo cada paragrado um objeto
})

// Funcao que ira separar o arquivo sendo cada paragrado um objeto
function quebraEmParagrafos(texto) {
    const paragrafos = texto.toLowerCase().split('\n'); // Transforma todas as letras do arquivo em minusculas e separa em array a partir das quebras de linha
    const contagem = paragrafos
        .flatMap((paragrafo) => {
            if (!paragrafo) return [];
            return verificaPalavrasDuplicadas(paragrafo) // Vai adicionar a quantidade de vezes que cada palavra aparece
        })
    console.log(contagem)
}

// Essa funcao substituir qualquer caractere especial por uma string vazia
function limpaPalavras(palavra) {
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
}

function verificaPalavrasDuplicadas(texto) {
    const listaPalavras = texto.split(' '); // separa em array com o metodo split a partir de um espaco
    const resultado = {};
    listaPalavras.forEach(palavra => { // Utiliza o metodo forEach para passar pelo arquivo identificando quais palavras tem menos de 3 caracteres
        if (palavra.length >= 3) {
            const palavraLimpa = limpaPalavras(palavra); // Se tiver menos de 3 caracteres ira trocar por uma string vazia
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1 // Se a palavra a tiver sido armazenada ira adicionar mais um em seu valor caso contrario comeca a contagem a partir do 0
        }
    })
    return resultado
}