/**
 GUMP - FERRAMENTA DE AUTOMAÇÃO DE TAREFAS

 AUTOMOÇÃO DE PROCESSOS, COM ELE PODEMOS REALIZAR A AUTOMAÇÃO DE TAREFAS COMO A COMPILAÇÃO DO SASS E DO LESS, COMPRESSÇÃO DE IMAGENS E DE ARQUIVOS JS

 >IR PARA O SITE gulpjs.com
 > NO TERMINAL DIGITAL nmp install --global gulp-cli

 > NAVEGAR DENTRO DO TERMINAL ATÉ A PASTA DO MEU PROJETO, VAMOS CRIAR UM NOVO PROJETO DO NODE COM O COMANDO
npm init
APERTAR ENTER PARA AS PERGUNTAS E UM ARQUIVO package.json DEVE SER CRIADO, AINDA NO TERMINAL DIGITAMOS
npm install --save-dev gulp
COM ESSE COMANDO INSTALAÇÃO O gulp SOMANTE NA PARTE DE DESENVOLVIMENTO, PORTANTO QUANDO ESTIVER RODANDO LA NA VERSEL NÃO VAI PRECISAR INSTALAR

AGORA FOI CRIADO MAIN ALGUNS ARQUIVOS COMO package-lock.json E A PASTA node_modules 

DENTRO DO ARQUIVO package.json TEMOS QUE CRIAR UM NOVO SCRIPT
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },

  FICA ASSIM

   "scripts": {
    "gulp": "gulp",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
 
  TEMOS QUE CRIAR UM ARQUIVO GULP, CHAMADO gulpfile.js

  SALVAMOS ESSA ALTERAÇÃO E DENTRO DO VCSCODE ABRIMOS O TERMINAL E DIGITAMOS
  npm run gulp

  DEVEMOS CRIAR O ARQUIVO .gitignore E DIGITAR O NOME DA PASTA node_modules DENTRO, SE INICIARMOS O GIT NO TERMINAL PODEMOS VER QUE A PASTA NÃO FICA COM O SIMBULO U QUE SIGNIFICA UM NOVO ARQUIVO PARA SER ADICIONADO NO STAGE

  AULA 2

  UMA FORMA DE MODULARIZAR O JS TEMOS QUE CRIAR UM ARQUIVO sum.js E DENTRO DESSE ARQUIVOS DEVEMOS CRIAR UMA FUNÇÃO:
  function somar(a, b){
    return a + b;
  }

  PODEMOS EXPORTAR A NOSSA FUNÇÃO ATRAVES DO CODIGO
  module.exports = somar

DEVEMOS CRIAR UMA NOVO ARQUIVO aritmetica.js
AQUI NESSE ARQUIVO DEVEMOS REALIZAR A IMPORTAÇÃO:
const somar = require('./sum')

AGORA DENTRO DO ARQUIVO aritimetica.ls PODEMOS UTILIZAR A FUNÇÃO DEFINIDA NO ARQUIVO sum.js


AGORA PODEMOS IR PARA O GULFILE
> CADA TAREFA QUE A GENTE ESCREVE É UMA FUNÇÃO, E SE QUISERMOS USAR ESSA FUNÇÃO TEMOS QUE EXPORTA-LA

VAMOS CRIAR UM FUNÇÃO DENTRO DO gulpfile.js
function funcaoPadrão(callback){
  console.log('Executando via Gulp')
  callback();
}

AGORA TEMOS QUE EXPORTAR ESSA FUNÇÃO

exports.default = funcaoPadrao

SE EXECUTARMOS O gulp VIA NODE TEMOS O SEGUINTE
npm run gulp

RETORNO
[02:06:43] Using gulpfile ~\Desktop\Ebac\16-gulp\gulpfile.js
[02:06:43] Starting 'default'...
Execultando via Gulp
[02:06:43] Finished 'default' after 2.58 ms

PORTANTO NOSSA FUNÇÃO APARECE NO RETORNO DA MENSAGEM

AGORA VAMOS INCLUIR OUTRA FUNÇÃO
function dizOi(callback){
  console.log('Oi Gulp')
  callback();
}
exports.dizOi = dizOi

QUANDO A TAREFA É A TAREFA default NÃO PRECISAMOS DIZER O NOME DELA, MAS NESSE CASO TEMOS QUE EXECULTAR NO NODE
npm run gulp dizOi

AS TAREFAS PODEM SER PUBLICAS OU PRIVADAS, AS PUBLICAS SÃO AQUELAS QUE EXPORTAMOS E AS PRIVADAS NÃO SÃO ACESSIVEIS ATRAVÉS DA LINHA DE COMANDO, NÃO EXPORTAMOS MAS PODEMOS UTILIZAR DENTRO DE OUTRAS TAREFAS, COMO A FUNÇÃO VAI SER PRIVADA NÃO TEREMOS O caalback PARA O GULP

function dizTchau(){
  console.log('Tchau Gulp')
}

AGORA PODEMOS CHAMAR ESSA FUNÇÃO DENTRO DA FUNÇÃO dizOi

function dizOi(callback) {
  console.log("Oi Gulp");
  dizTchau();
  callback();
}

PORTANTO NÃO EXPORTAMOS A FUNÇÃO dizTchau MAS PODEMOS UTILIZAR ELA DENTRO DE OUTRAS TAREFAS


AULA 3

AS TAREFAS DO GULP PODEM SER DIVIDIDAS EM 2 CATEGORIAS AS TAREFAS EXECUTADAS EM SERIE E AS TAREFAS EXECUTADAS EM PARARELO

TAREFAS EM SERIE
>TEMOS QUE IMPORTAR O gulp NO INICIO DO NOSSO ARQUIVO:
const gulp = require('gulp')
O NOME QUE DAMOS A CONSTANTE PODE SER QUALQUER COISA MAS GERALMENTE DAMOS O NOME DO PACOTE

VAMOS SUBSTITUIR AS EXPORTAÇÕES POR:
exports.default = funcaoPadrao;
exports.dizOi = dizOi;

PARA
exports.default = gulp.series(funcaoPadrao, dizOi)

ELE VAI EXPORTAR PRIMEIRO A funcaoPadrao E DEPOIS A FUNÇÃO dizOi


AULA 4 - EXECUÇÃO PARALELA

BASICAMENTE TEMOS QUE ADICIONAR .parallel
exports.default = gulp.parallel(funcaoPadrao, dizOi)

VAMOS ADICIONAR UMA FUNÇÃO PARA A FUNÇÃO PADRÃO DEMORAR UM POUCO MAIS PARA RODAR, PARA VER O EFEITO DO PARALELO
function funcaoPadrao(callback) {
  console.log("Execultando via Gulp");
  callback();
}

PARA

function funcaoPadrao(callback) {
  setTimeout(function(){
  console.log("Execultando via Gulp");
  callback();
},2000 );
}

AULA 5 - CRIANDO UMA TAREFA 

VAMOS PRECISAR INSTALAR ALGUNS PLUGINS DO GULP PARA REALIZAR ALGUMAS TAREFAS, ESSES PLUGINS SÃO PACOTES DO npm PORTANTO PODEMOS INSTALAR:
npm install --save-dev gulp-sass

VAMOS PRECISAR INSTALAR O PACOTE DO SASS
npm install --save-dev sass

AGORA PRECISAMOS IMPORTAR ESSES PACOTES NO NOSSO gulpfile.js

const sass = require('gulp-sass')(require('sass'))
ESSA IMPORTAÇÃO É UM POUCO DOFERENTE POIS PRECISAMOS IMPORTAR 2 PACOTES

AGORA ESTAMOS PRONTOS PARA ESCREVER AS FUNÇÃO QUE DEVEM SER EXECUTADAS
function compilaSass(){
  return gulp.src('./source/styles/*.scss').pipe(sass())
}
PODE SER ESXRITO ASSIM TAMBEM
function compilaSass(){
  return gulp.src('./source/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/styles'));
}


ESSA FUNÇÃO NÃO PRECISA DE CALLBACK POIS COLOCAMOS UM RETURN, ELA VAI SER RESPONSAVEL POR SELECIONAR TODOS OS ARQUIVOS COM EXTENSÃO .scss, DEPOIS REALIZAMOS A COMPILAÇÃO DOS ARQUIVOS EM .css E NA PROXIMA LINHA DE COMANDO ENVIAMOS OS ARQUIVOS PARA UMA PASTA

AGORA DENTRO DO VSCODE VAMOS CRIAR A ESTRUTURA DO build/styles e source/styles

AGORA VAMOS CRIAR OS ARQUIVOS EM source/styles CRIAR main.scss e variaveis.scss, LA ESCREVEMOS UM CÓDIGO DE SCSS E MAS PRECISAMOS DIZER PARA O GULP IGNORAR O ARQUIVO variaveis.scss POIS ELE NÃO TEM NENHUMA REGRA DE CSS PARA COMPILAR PARA ISSO ALTERAMOS:
function compilaSass(){
  return gulp.src('./source/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/styles'));
}

PARA

function compilaSass(){
  return gulp.src('./source/styles/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/styles'));
}



DEPOIS NO gulpfile.js EXPORTAMOS A FUNÇÃO compilaSass

ELE TEM QUE CRIAR DENTRO DA PASTA build/styles OS ARQUIVOS main.css

NA FUNÇÃO QUE COMPILA O SASS  .pipe(sass()) PODEMOS PASSAR MAIS ALGUMAS COISAS, COMO ALEM DE COMPILAR ELE DEVE MINIFICAR ESSE ARQUIVO
 .pipe(sass({
    outputStyle:'compressed'
 }))

 ELE VAI PEGAR TODO ESPAÇO E QUEBRA DE LINHA E VAI RETIRAR PARA DEIXAR O ARQUIVO MENOR, ALEM DE DEIXAR NOSSO CSS MAIS SEGURO POIS SE TIVER ALGUNS ERRO ELA JÁ VAI AVISAR


 AGORA VAMOS CRIAR UM index.html e linkar o main.css
 SE FORMOS DO DEVTOOLS E VEREFICAR AS REGRAS DE CSS TEMOS QUE O background-color APARECE NA LINHA 1, PORTANTO DIFERENTE DO ARQUIVO main.scss, COMO FAZEMOS PARA O NAVEGADOR ENTENDER ONDE A REGRA ESTA NO ARQUIVO FONTE

 PARA ISSO VAMOS PRECISAR INSTALAR OUTRO PACOTE
 npm install --save-dev gulp-sourcemaps

 IPORTAR NO ARQUIVO DO GULP
const sourcemaps = require("gulp-sourcemaps");


ALTERAR A FUNÇÃO:
 function compilaSass() {
  return gulp
    .src("./source/styles/main.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(gulp.dest("./build/styles"));
}

PARA:
 function compilaSass() {
  return gulp
    .src("./source/styles/main.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed",
      })
      pipe(sourcemaps.write('./maps'))
    )
    .pipe(gulp.dest("./build/styles"));
}


 */
