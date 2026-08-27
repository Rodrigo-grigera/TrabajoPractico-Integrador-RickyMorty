const API = "https://rickandmortyapi.com/api/character";

let paginaActual = 1;
let state = "";
let nombre = "";

const getPersonajes = async () => {
  try {
    const resp = await fetch(
      `${API}/?page=${paginaActual}&name=${nombre}&status=${state}`,
    );
    if (!resp.ok) {
      throw new Error("Error de al cargar los personajes");
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    throw error;
  }
};
const abilitarDesabilitar = async () => {
  const resp = await getPersonajes();

  if (resp.info.next === null && resp.info.prev === null) {
    // Solo existe una página
    btn_next.disabled = true;
    btn_back.disabled = true;
  } else if (resp.info.prev === null) {
    // Primera página
    btn_next.disabled = false;
    btn_back.disabled = true;
  } else if (resp.info.next === null) {
    // Última página
    btn_next.disabled = true;
    btn_back.disabled = false;
  } else {
    // Página intermedia
    btn_next.disabled = false;
    btn_back.disabled = false;
  }
};

const documento = document.getElementById("tarjeta");

const modalaOpen = document.getElementById("modal");
const closeModal = document.getElementById("cerrar");
const cardModal = document.getElementById("modal-body");

const crearCarta = async () => {
  try {
    const pers = await getPersonajes();
    pers.results.forEach((element) => {
      const carta = document.createElement("div"); //creamos un elemneto de forma directa
      carta.classList.add("carta");
      carta.innerHTML = `
          <img src="${element.image}" alt="${element.name}">
          <h2>${element.name}</h2>`;

      carta.addEventListener("click", () => {
        cardModal.innerHTML = `
        <div>
            <img src="${element.image}" alt="${element.name}">
        </div>
        
        <ul>
            <li><span>Nombre:</span> ${element.name}</li>
            <li><span>Genero:</span> ${element.gender}</li>
            <li><span>Especie:</span> ${element.specie}</li>
            <li><span>Origen: </span> ${element.origin.name}</li>
            <li><span>Estado: </span> ${element.status}</li>
        </ul>
            `;
        modalaOpen.showModal();
      });
      documento.appendChild(carta);
    });
  } catch (error) {
    const mensaje = document.createElement("p");
    mensaje.innerHTML = "Personajes no encontrados, o  mal escrito";
    documento.appendChild(mensaje);
  }
};

closeModal.addEventListener("click", () => modalaOpen.close());
crearCarta();

const btn_next = document.getElementById("next");
const btn_back = document.getElementById("back");

const pageNext = () => {
  paginaActual++;
  abilitarDesabilitar();
  documento.innerHTML = "";
  crearCarta();
};

btn_next.addEventListener("click", pageNext);

const pageBack = () => {
  paginaActual = paginaActual - 1;
  abilitarDesabilitar();
  documento.innerHTML = "";
  crearCarta();
};

btn_back.addEventListener("click", pageBack);

const filter = document.getElementById("filterEstado");
const btn_reset = document.getElementById("reset");

const obtenerValorFilter = () => {
  state = filter.value;
  getPersonajes();
  documento.innerHTML = "";
  crearCarta();
};

filter.addEventListener("change", obtenerValorFilter);

const inputSerch = document.getElementById("input");
const btn_serch = document.getElementById("buscar");

const serch = () => {
  paginaActual = 1;
  nombre = inputSerch.value;
  inputSerch.value = "";
  getPersonajes();
  documento.innerHTML = "";
  crearCarta();
  abilitarDesabilitar();
};

const reset = () => {
  paginaActual = 1;
  nombre = "";
  state = filter.value = "";
  documento.innerHTML = "";
  getPersonajes();
  abilitarDesabilitar();
  crearCarta();
};

btn_serch.addEventListener("click", serch);
btn_reset.addEventListener("click", reset);
