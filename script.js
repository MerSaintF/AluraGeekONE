const cardContainer = document.querySelector(".contenedor--products");
7;

function handleImageError(event) {
  event.target.src = "assets/no-image.png";
  
}

const clearBtn = document.querySelector('[data-action="clear"]');

const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target.dataset);
});

clearBtn.addEventListener("click", function () {
  form.reset();
});

const api = axios.create({
  baseURL: "http://localhost:8000",
});

const getData = async (url) => {
  const res = await api.get(url);
  const data = res.data;
  return data;
};

const deleteData = async (url) => {
  const res = await api.delete(url);
  const data = res.data;
  return data;
};

const postData = async (url, obj) => {
  const res = await api.post(url, obj);
  const data = res.data;
  return data;
};

const displayProducts = function () {
  getData("/products")
    .then((data) => {
      data.forEach((cardInfo) => {
        const { id, productName, img, price } = cardInfo;

        let card = `
          <div class="card" data-id="${id}">
            <div class="card--img">
              <img src="${img}" alt="funko-${productName}" onerror="handleImageError(event)">
            </div>
            <div class="card--info">
              <p>${productName}</p>
              <p>$${price}</p>
              <img src="assets/trash3.svg" data-action="delete" alt="eliminar">
            </div>
          </div>`;
        cardContainer.insertAdjacentHTML("beforeend", card);
      });
    })
    .catch((err) => console.log(err));
};

document.addEventListener("DOMContentLoaded", displayProducts);

cardContainer.addEventListener("click", (e) => {
  if (e.target.dataset.action == "delete") {
    const id = e.target.parentElement.parentElement.dataset.id;
    deleteData(`/products/${id}`).catch((err) => console.log(err));
  }
});

form.addEventListener("submit", () => {
  const productName = document.getElementById("name").value;
  const img = document.getElementById("img").value;
  const price = document.getElementById("price").value;
  const id = uuid.v4();

  postData("/products", { id, productName, img, price }).catch((err) =>
    console.log(err)
  );
});
