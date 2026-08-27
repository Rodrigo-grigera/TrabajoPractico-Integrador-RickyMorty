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
    return data.results;
  } catch (error) {
    throw error;
  }
};

const documento = document.getElementById("tarjeta");

const crearCarta = async () => {
  try {
    const pers = await getPersonajes();
    pers.forEach((element) => {
      const carta = document.createElement("div"); //creamos un elemneto de forma directa
      carta.classList.add("carta");
      carta.innerHTML = `
          <img src="${element.image}" alt="${element.name}">
          <h2>${element.name}</h2>`;
      documento.appendChild(carta);
    });

  } catch (error) {
    const mensaje = document.createElement("p");
    mensaje.innerHTML = "No se pudieron cargar los personajes";
    documento.appendChild(mensaje);
  }
};

crearCarta();

const btn_next = document.getElementById("next");
const btn_back = document.getElementById("back");

const paginaSiguiente = () => {
  paginaActual++;
  if (paginaActual > 1) btn_back.disabled = false;
  if (paginaActual === 42) btn_next.disabled = true;
  documento.innerHTML = "";
  crearCarta();
};

btn_next.addEventListener("click", paginaSiguiente);

const pagAnterior = () => {
  paginaActual = paginaActual - 1;
  if (paginaActual === 1) {
    btn_back.disabled = true;
  }
  documento.innerHTML = "";
  crearCarta();
};
btn_back.addEventListener("click", pagAnterior);
