// ====== DADOS DE JOGOS ======
const catalogoBase = [
  {
    titulo: "The Legend of Zelda: Breath of the Wild",
    ano: 2017,
    genero: "Aventura",
    nota: 9.5,
    descricao: "Explore o vasto mundo de Hyrule e descubra seus segredos em um jogo revolucionário.",
    imagem: "img/tablet-1.jpg"
  },
  {
    titulo: "God of War Ragnarök",
    ano: 2022,
    genero: "Ação",
    nota: 9.3,
    descricao: "Kratos e Atreus enfrentam novos desafios em uma jornada épica pelos Nove Reinos.",
    imagem: "img/Godwar-asset.jpg"
  },
  {
    titulo: "Minecraft",
    ano: 2009,
    genero: "sandbox, sobrevivência, Mundo aberto",
    nota: 8.8,
    descricao: "Minecraft é um jogo sandbox em mundo aberto, onde os jogadores exploram e constroem livremente em um mundo tridimensional feito de blocos.",
    imagem: "img/minicraft.jpg"
  }
];

// ====== ELEMENTOS ======
const catalogoEl = document.getElementById("catalogo");
const searchInput = document.getElementById("search");
const modal = document.getElementById("modal");
const modalPoster = document.getElementById("modal-poster");
const modalTitle = document.getElementById("modal-title");
const modalInfo = document.getElementById("modal-info");
const modalDesc = document.getElementById("modal-desc");
const closeModal = document.getElementById("close-modal");

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

searchInput.addEventListener("input", e => {
  renderCatalogo(e.target.value);
});

// ====== INICIALIZAÇÃO ======
renderCatalogo();
