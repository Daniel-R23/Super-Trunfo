var jogadores = [];
var vez = -1;

function calculaPontos(jogador) {
  var pontos = jogador.vitorias * 3 + jogador.empates - jogador.derrotas;
  return pontos;
}

function exibeJogadoresNaTela(jogadores) {
  definirGanhador();
  var elemento = "";
  for (var i = 0; i < jogadores.length; i++) {
    elemento += "<td>" + jogadores[i].nome + "</td>";
    elemento += "<td><img src=" + jogadores[i].avatar + "></td>";
    elemento += "<td>" + jogadores[i].vitorias + "</td>";
    elemento += "<td>" + jogadores[i].empates + "</td>";
    elemento += "<td>" + jogadores[i].derrotas + "</td>";
    elemento += "<td>" + jogadores[i].pontos + "</td>";
    elemento +=
      "<td><input type='radio' name='escolha' value=" + i + "></td></tr>";
  }
  var tabelaJogadores = document.getElementById("tabelaJogadores");
  tabelaJogadores.innerHTML = elemento;
}

exibeJogadoresNaTela(jogadores);

function definirJogadorAtual() {
  console.log("vez: " + vez);
  var radioAtuais = document.getElementsByName("escolha");

  return radioAtuais[vez].value;
}

function definirVez() {
  if (jogadores.length > 0) {
    vez = 0;
    if (vez <= 0) {
      document.getElementsByName("escolha")[vez].checked = true;
    }
  }
  console.log(vez);
}
function atualizarVez() {
  if (vez >= jogadores.length - 1) {
    vez = 0;
  } else {
    vez++;
  }
  document.getElementsByName("escolha")[vez].checked = true;
}

function definirGanhador() {
  var maiorPontuacao = 0;
  var vencedor;
  for (var i = 0; i < jogadores.length; i++) {
    if (jogadores[i].pontos > maiorPontuacao) {
      maiorPontuacao = jogadores[i].pontos;
      vencedor = i;
    }
  }
  for (var i = 0; i < jogadores.length; i++) {
    if (i != vencedor) {
      jogadores[i].vencedor = "";
    } else {
      var prov = jogadores[vencedor].nome;

      jogadores[vencedor].nome =
        "<img id='trofeu'src='https://cdn-icons-png.flaticon.com/512/1651/1651611.png'>" +
        prov;
    }
  }
}

function adicionarVitoria(i) {
  var jogador = jogadores[i];
  jogador.vitorias++;
  jogador.pontos = calculaPontos(jogador);
  exibeJogadoresNaTela(jogadores);
}

function adicionarEmpate(i) {
  var jogador = jogadores[i];
  jogador.empates++;
  jogador.pontos = calculaPontos(jogador);
  exibeJogadoresNaTela(jogadores);
}

function adicionarDerrota(i) {
  var jogador = jogadores[i];
  jogador.derrotas++;
  jogador.pontos = calculaPontos(jogador);
  exibeJogadoresNaTela(jogadores);
}

function adicionarJogador() {
  var nome = prompt("Qual o nome do novo jogador?");
  var avt = prompt("Insira a URL da imagem avatar do " + nome);
  jogadores.push({
    nome: nome,
    avatar: avt,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    pontos: 0
  });
  exibeJogadoresNaTela(jogadores);
  definirVez();
}

function zerarPontos() {
  for (var i = 0; i < jogadores.length; i++) {
    jogadores[i].vitorias = 0;
    jogadores[i].empates = 0;
    jogadores[i].derrotas = 0;
    jogadores[i].pontos = 0;
  }
  exibeJogadoresNaTela(jogadores);
}

var carta1 = {
  nome: "Bulbassauro",
  imagem:
    "https://images.mod-fashions.com/img/lists/2/ashquots-15-most-powerful-pokmon-anime_1.jpg",
  atributos: {
    ataque: 7,
    defesa: 8,
    magia: 6
  }
};

var carta2 = {
  nome: "Darth Vader",
  imagem: "https://sm.ign.com/ign_br/screenshot/default/darth-vader_5yvm.jpg",
  atributos: {
    ataque: 9,
    defesa: 8,
    magia: 2
  }
};

var carta3 = {
  nome: "Shiryu de Dragão",
  imagem: "https://s.aficionados.com.br/imagens/shiryu.jpg",
  atributos: {
    ataque: 5,
    defesa: 9,
    magia: 10
  }
};

var cartas = [carta1, carta2, carta3];
var cartaMaquina;
var cartaJogador;

function sortearCarta() {
  if (jogadores.length < 1) {
    alert("Adicione no mínimo 1 jogador para iniciar");
  } else {
    document.getElementById("btnJogar").disabled = false;
    var numeroCartaMaquina = parseInt(Math.random() * 3);
    cartaMaquina = cartas[numeroCartaMaquina];

    var numeroCartaJogador = parseInt(Math.random() * 3);
    while (numeroCartaMaquina == numeroCartaJogador) {
      numeroCartaJogador = parseInt(Math.random() * 3);
    }
    cartaJogador = cartas[numeroCartaJogador];

    exibirCartaJogador();
  }
}

function obtemAtributoSelecionado() {
  var radioAtributos = document.getElementsByName("atributo");
  for (var i = 0; i < radioAtributos.length; i++) {
    if (radioAtributos[i].checked) {
      return radioAtributos[i].value;
    }
  }
}

function jogar() {
  var atributoSelecionado = obtemAtributoSelecionado();
  var elementoResultado = document.getElementById("resultado");
  var valorCartaJogador = cartaJogador.atributos[atributoSelecionado];
  var valorCartaMaquina = cartaMaquina.atributos[atributoSelecionado];
  var atual = definirJogadorAtual();

  if (valorCartaJogador > valorCartaMaquina) {
    elementoResultado.innerHTML = "<p>" + jogadores[atual].nome + " venceu</p>";
    adicionarVitoria(atual);
  } else if (valorCartaMaquina > valorCartaJogador) {
    elementoResultado.innerHTML = "<p>" + jogadores[atual].nome + " perdeu</p>";
    adicionarDerrota(atual);
  } else {
    elementoResultado.innerHTML =
      "<p>" + jogadores[atual].nome + " empatou</p>";
    adicionarEmpate(atual);
  }
  elementoResultado.classList.add("show");
  setTimeout(function () {
    elementoResultado.classList.remove("show");
  }, 3000);
  exibirCartaMaquina();
}

function exibirCartaJogador() {
  var divCartaJogador = document.getElementById("carta-jogador");
  divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`;

  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png">';
  var tagHTML = "<div id='opcoes'>";

  var opcoesTexto = "";
  var i = 1;
  for (atributo in cartaJogador.atributos) {
    opcoesTexto += `<input type='radio' name='atributo' id='at${i}' value = ${atributo}><label for='at${i}'>${atributo} ${cartaJogador.atributos[atributo]}</label>`;
    i++;
  }
  var nome = `<h3>${cartaJogador.nome}</h3>`;

  divCartaJogador.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function exibirCartaMaquina() {
  atualizarVez();
  var divCartaMaquina = document.getElementById("carta-maquina");
  divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`;

  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png">';
  var tagHTML = "<div id='opcoes' class='carta-status'>";

  var opcoesTexto = "";
  for (atributo in cartaMaquina.atributos) {
    opcoesTexto +=
      "<p name='atributo' value = '" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaMaquina.atributos[atributo] +
      "</p>";
  }
  var nome = `<h3>${cartaMaquina.nome}</h3>`;

  divCartaMaquina.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}
