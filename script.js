// ====== DADOS DE JOGOS ======
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

// ====== ELEMENTOS ======
const catalogoEl = document.getElementById("catalogo");
const searchInput = document.getElementById("search");
const detalhesSec = document.getElementById("detalhes");
const detalhesPoster = document.getElementById("detalhes-poster");
const detalhesTitulo = document.getElementById("detalhes-titulo");
const detalhesDescricao = document.getElementById("detalhes-descricao");
const detalhesTrailer = document.getElementById("detalhes-trailer");

// ====== FUNÇÕES ======
function renderCatalogo(filtro = "") {
  catalogoEl.innerHTML = "";

  const lista = catalogoBase.filter(item =>
    item.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  if (lista.length === 0) {
    catalogoEl.innerHTML = "<p>Nenhum jogo encontrado 😢</p>";
    return;
  }

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
    card.addEventListener("click", () => mostrarDetalhes(item));
    catalogoEl.appendChild(card);
  });
}

function mostrarDetalhes(item) {
  detalhesPoster.src = item.imagem;
  detalhesTitulo.textContent = item.titulo;
  detalhesDescricao.textContent = item.descricao;
  detalhesTrailer.src = item.trailer;
  detalhesSec.classList.remove("hidden");

  // Scroll suave até a área de detalhes
  detalhesSec.scrollIntoView({ behavior: "smooth" });
}

searchInput.addEventListener("input", e => renderCatalogo(e.target.value));

// ====== INICIALIZAÇÃO ======
renderCatalogo();
