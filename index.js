const API = "https://rickandmortyapi.com/api/character";

let paginaActual = 1;
let estado = "";
let nombre = "";

const getPersonajes = async () => {
  try {
    const respo = await fetch(
      `${API}?page=${paginaActual}&name=${nombre}&status=${estado}`,
    );
    if (respo.ok) {
      const personaje = await respo.json();
      const pagiTotales = personaje.info.pages;

      sigueinte.disabled = paginaActual === pagiTotales;
      anterior.disabled = paginaActual === 1;

      let ids = [];
      for (let i = 0; i < personaje.results.length; i++) {
        ids.push(personaje.results[i].id);
      }
      documento.innerHTML = "";

      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        await crearCarta(id);
      }
    } else {
      sigueinte === true;
      anterior === true;
    }
  } catch (error) {
    return error.message;
  }
};

getPersonajes();

const getPersona = async (id) => {
  try {
    const respo = await fetch(`${API}/${id}`);
    if (respo.ok) {
      const persona = await respo.json();
      // console.log(persona);
      return persona;
    }
  } catch (error) {
    console.log(error.status);
  }
};
// personaje("1");

const documento = document.getElementById("tarjeta");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const cerrar = document.getElementById("cerrar");

cerrar.onclick = () => {
  modal.close();
};

const crearCarta = async (id) => {
  const infoPerso = await getPersona(id);

  const carta = document.createElement("div"); //creamos un elemneto de forma directa
  carta.classList.add("carta");
  carta.style.width = "18rem";

  carta.innerHTML = `
    <img src="${infoPerso.image}" alt="${infoPerso.name}">
    <h2>${infoPerso.name}</h2>
    `;
  carta.addEventListener("click", () => {
    modalBody.innerHTML = `
            <h2>${infoPerso.name}</h2>
            <img src="${infoPerso.image}" alt="${infoPerso.name}" style="width:80%" />
            <p><span>Estado:</span> ${infoPerso.status}</p>
            <p><span>Género:</span> ${infoPerso.gender}</p>
            <p><span>Especie:</span> ${infoPerso.species}</p>
            <p><span>Origen:</span> ${infoPerso.origin.name}</p>
            <p><span>Ubicación actual:</span> ${infoPerso.location.name}</p>
          `;
    modal.showModal();
  });

  documento.appendChild(carta);
};

const sigueinte = document.getElementById("siguiente");
const anterior = document.getElementById("anterior");

function pagAnterior() {
  paginaActual--;
  getPersonajes();
}
anterior.addEventListener("click", pagAnterior);

function pagSiguiente() {
  paginaActual++;
  getPersonajes();
}
sigueinte.addEventListener("click", pagSiguiente);

const filtroEstado = document.getElementById("filtroEstado");
const boton = document.getElementById("boton");

function filtrar(e) {
  e.preventDefault();
  estado = filtroEstado.value;
  paginaActual = 1;
  getPersonajes();
}
boton.addEventListener("click", filtrar);

const input = document.getElementById("input");
const buscar = document.getElementById("buscar");

function buscarPorNombre(e) {
  e.preventDefault();
  nombre = input.value;
  input.value = "";

  if (input != nombre) {
    sigueinte.disabled = true;
    documento.innerHTML = `
        <h3>El Personaje no existe</h3>`;
  }
  paginaActual = 1;
  getPersonajes();
}

buscar.addEventListener("click", buscarPorNombre);
