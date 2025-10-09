// ====== DADOS DE EXEMPLO ======
const catalogoBase = {
  filmes: [
    {
      titulo: "Interestelar",
      ano: 2014,
      genero: "Ficção científica",
      nota: 8.6,
      descricao: "Um grupo de exploradores viaja através de um buraco de minhoca em busca de um novo lar para a humanidade.",
      imagem: "https://image.tmdb.org/t/p/w500/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg"
    },
    {
      titulo: "Matrix",
      ano: 1999,
      genero: "Ação, Ficção científica",
      nota: 8.7,
      descricao: "Um hacker descobre a verdade sobre a realidade e luta contra máquinas que controlam o mundo.",
      imagem: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
    },
    {
      titulo: "Avatar: O Caminho da Água",
      ano: 2022,
      genero: "Aventura, Fantasia",
      nota: 7.8,
      descricao: "Jake Sully vive com sua nova família em Pandora, mas uma ameaça antiga retorna.",
      imagem: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
    }
  ],
  jogos: [
    {
      titulo: "The Legend of Zelda: Breath of the Wild",
      ano: 2017,
      genero: "Aventura",
      nota: 9.5,
      descricao: "Explore o vasto mundo de Hyrule e descubra seus segredos em um jogo revolucionário.",
      imagem: "https://cdn.cloudflare.steamstatic.com/steam/apps/729040/header.jpg?t=1677160299"
    },
    {
      titulo: "God of War Ragnarök",
      ano: 2022,
      genero: "Ação",
      nota: 9.3,
      descricao: "Kratos e Atreus enfrentam novos desafios em uma jornada épica pelos Nove Reinos.",
      imagem: "https://image.api.playstation.com/vulcan/ap/rnd/202208/0817/oZmyK9DMzIPVfQ2Dbuq8HhfL.png"
    },
    {
      titulo: "Cyberpunk 2077",
      ano: 2020,
      genero: "RPG, Mundo aberto",
      nota: 7.9,
      descricao: "Mergulhe em Night City, uma metrópole futurista cheia de ação e intrigas.",
      imagem: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg"
    }
  ]
};

// ====== ELEMENTOS ======
const catalogoEl = document.getElementById("catalogo");
const btnFilmes = document.getElementById("btn-filmes");
const btnJogos = document.getElementById("btn-jogos");
const searchInput = document.getElementById("search");
const modal = document.getElementById("modal");
const modalPoster = document.getElementById("modal-poster");
const modalTitle = document.getElementById("modal-title");
const modalInfo = document.getElementById("modal-info");
const modalDesc = document.getElementById("modal-desc");
const closeModal = document.getElementById("close-modal");

let tipoAtual = "filmes";

// ====== FUNÇÕES ======
function renderCatalogo(tipo, filtro = "") {
  catalogoEl.innerHTML = "";

  const lista = catalogoBase[tipo].filter(item =>
    item.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  if (lista.length === 0) {
    catalogoEl.innerHTML = "<p>Nenhum resultado encontrado 😢</p>";
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
    card.addEventListener("click", () => abrirModal(item));
    catalogoEl.appendChild(card);
  });
}

function abrirModal(item) {
  modalPoster.src = item.imagem;
  modalTitle.textContent = item.titulo;
  modalInfo.textContent = `${item.genero} • ${item.ano} • ⭐ ${item.nota}`;
  modalDesc.textContent = item.descricao;
  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});

// ====== EVENTOS ======
btnFilmes.addEventListener("click", () => {
  tipoAtual = "filmes";
  btnFilmes.classList.add("active");
  btnJogos.classList.remove("active");
  renderCatalogo("filmes", searchInput.value);
});

btnJogos.addEventListener("click", () => {
  tipoAtual = "jogos";
  btnJogos.classList.add("active");
  btnFilmes.classList.remove("active");
  renderCatalogo("jogos", searchInput.value);
});

searchInput.addEventListener("input", e => {
  renderCatalogo(tipoAtual, e.target.value);
});

// ====== INICIALIZAÇÃO ======
renderCatalogo("filmes");
