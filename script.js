import { getData, postData, deleteData } from "./api.js";

const cardContainer = document.querySelector(".contenedor--products");
7;

const agregarCard = document.querySelector(".agregar--productos");
const cerrarForm = document.querySelector(".cerrar--form");

const clearBtn = document.querySelector('[data-action="clear"]');

const form = document.querySelector(".form");
const formContainer = document.querySelector(".contenedor--form");

agregarCard.addEventListener("click", () => {
  formContainer.classList.toggle("disabled");
});

cerrarForm.addEventListener("click", () => {
  formContainer.classList.toggle("disabled");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target.dataset);
});

clearBtn.addEventListener("click", function () {
  form.reset();
});

const handleImageError = function (event) {
  console.log(event);
  event.target.src = "assets/no-image.png";
};

window.handleImageError = handleImageError;

const displayProducts = function () {
  getData("/products")
    .then((data) => {
      cardContainer.innerHTML = "";
      if (data.length == 0) {
        throw new Error("No hay ningún producto registrado");
      } else {
        //si hay data, desplegarla
        data.forEach((cardInfo) => {
          const { id, productName, img, price } = cardInfo;
          let card = `
          <div class="card" data-id="${id}">
            <div class="card--img">
              <img src="${img}" alt="funko-${productName}"  onerror="handleImageError(event)">
            </div>
            <div class="card--info">
              <p>${productName}</p>
              <p>$${price}</p>
              <img src="assets/trash3.svg" title="Eliminar producto" data-action="delete" alt="eliminar">
            </div>
          </div>`;
          cardContainer.insertAdjacentHTML("beforeend", card);
        });
      }
    })
    .catch((err) => {
      cardContainer.insertAdjacentHTML(
        "beforeend",
        `<p class="warning" >¡Ups! Ocurrió un error, o no hay productos registrados aún</p>`
      );
      console.log(err);
    });
};

document.addEventListener("DOMContentLoaded", displayProducts);

cardContainer.addEventListener("click", (e) => {
  if (e.target.dataset.action == "delete") {
    const id = e.target.parentElement.parentElement.dataset.id;
    deleteData(`/products/${id}`)
      .catch((err) => console.log(err))
      .finally(() => {
        setTimeout(() => {
          location.reload(true);
        }, 1000);
      });
  }
});

form.addEventListener("submit", () => {
  const productName = document.getElementById("name").value;
  const img = document.getElementById("img").value;
  const price = document.getElementById("price").value;
  const id = uuid.v4();

  postData("/products", { id, productName, img, price })
    .catch((err) => console.log(err))
    .finally(() => {
      setTimeout(() => {
        location.reload(true);
      }, 2000);
    });
});
