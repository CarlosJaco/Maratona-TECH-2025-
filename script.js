const catalogoBase = [
  {
    titulo: "The Legend of Zelda: Breath of the Wild",
    ano: 2017,
    genero: "Aventura",
    nota: 9.5,
    descricao: "Explore o vasto mundo de Hyrule e descubra seus segredos em um jogo revolucionário.",
    imagem: "img/tablet-1.jpg",
    trailer: "https://www.youtube.com/embed/1rPxiXXxftE"
  },
  {
    titulo: "God of War Ragnarök",
    ano: 2022,
    genero: "Ação",
    nota: 9.3,
    descricao: "Kratos e Atreus enfrentam novos desafios em uma jornada épica pelos Nove Reinos.",
    imagem: "img/Godwar-asset.jpg",
    trailer: "https://www.youtube.com/embed/EE-4GvjKcfs"
  },
  {
    titulo: "Minecraft",
    ano: 2009,
    genero: "Sandbox, Sobrevivência, Mundo Aberto",
    nota: 8.8,
    descricao: "Minecraft é um jogo sandbox em mundo aberto, onde os jogadores exploram e constroem livremente em um mundo tridimensional feito de blocos.",
    imagem: "img/minicraft.jpg",
    trailer: "https://www.youtube.com/embed/MmB9b5njVbA"
  }
];

const catalogoEl = document.getElementById("catalogo");
const searchInput = document.getElementById("search");
const detalhesEl = document.getElementById("detalhes");
const detalhesPoster = document.getElementById("detalhes-poster");
const detalhesTitulo = document.getElementById("detalhes-titulo");
const detalhesDescricao = document.getElementById("detalhes-descricao");
const detalhesTrailer = document.getElementById("detalhes-trailer");
const fecharBtn = document.getElementById("fechar-detalhes");

function renderCatalogo(filtro = "") {
  catalogoEl.innerHTML = "";

  const lista = catalogoBase.filter(item =>
    item.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  lista.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.imagem}" alt="${item.titulo}">
      <div class="card-info">
        <h3>${item.titulo}</h3>
        <p>${item.genero} • ${item.ano}</p>
        <p>⭐ ${item.nota}</p>
      </div>
    `;
    card.addEventListener("click", () => abrirDetalhes(item));
    catalogoEl.appendChild(card);
  });
}

function abrirDetalhes(item) {
  detalhesPoster.src = item.imagem;
  detalhesTitulo.textContent = item.titulo;
  detalhesDescricao.textContent = item.descricao;
  detalhesTrailer.src = item.trailer + "?autoplay=1";

  detalhesEl.classList.add("active");
  catalogoEl.style.filter = "blur(6px)";
  catalogoEl.style.opacity = "0.3";
}

function fecharDetalhes() {
  detalhesEl.classList.remove("active");
  detalhesTrailer.src = "";
  catalogoEl.style.filter = "none";
  catalogoEl.style.opacity = "1";
}

fecharBtn.addEventListener("click", fecharDetalhes);
searchInput.addEventListener("input", e => renderCatalogo(e.target.value));

// INICIALIZAÇÃO
renderCatalogo();

// ===== COMENTÁRIOS (simulação local) =====
const listaComentarios = document.getElementById("lista-comentarios");
const comentarioInput = document.getElementById("comentario-input");
const enviarComentarioBtn = document.getElementById("enviar-comentario");

// Objeto para guardar comentários por jogo
const comentariosPorJogo = {};

enviarComentarioBtn.addEventListener("click", () => {
  const texto = comentarioInput.value.trim();
  if (texto === "") return;

  const tituloAtual = detalhesTitulo.textContent;
  if (!comentariosPorJogo[tituloAtual]) comentariosPorJogo[tituloAtual] = [];

  comentariosPorJogo[tituloAtual].push(texto);
  comentarioInput.value = "";

  renderComentarios(tituloAtual);
});

function renderComentarios(titulo) {
  listaComentarios.innerHTML = "";
  const lista = comentariosPorJogo[titulo] || [];
  lista.forEach(c => {
    const div = document.createElement("div");
    div.className = "comentario";
    div.textContent = c;
    listaComentarios.appendChild(div);
  });
}

// Adapte a função abrirDetalhes para carregar comentários também:
function abrirDetalhes(item) {
  detalhesPoster.src = item.imagem;
  detalhesTitulo.textContent = item.titulo;
  detalhesDescricao.textContent = item.descricao;
  detalhesTrailer.src = item.trailer + "?autoplay=1";

  detalhesEl.classList.add("active");
  catalogoEl.style.filter = "blur(6px)";
  catalogoEl.style.opacity = "0.3";

  renderComentarios(item.titulo); // ← carrega comentários do jogo atual
}

