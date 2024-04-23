// index.js
const ramenMenuDiv = document.getElementById("ramen-menu");
const ramenDetailDiv = document.getElementById("ramen-detail");
const ratingDisplay = document.getElementById("rating-display");
const commentDisplay = document.getElementById("comment-display");
const ramenForm = document.getElementById("new-ramen");

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

const fetchRamens = () =>
  fetch("http://localhost:3000/ramens", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.error(error));

const handleClick = (ramen) => {
  const { name, restaurant, image, rating, comment } = ramen;
  const detailImage = document.querySelector(".detail-image");
  const detailName = document.querySelector(".name");
  const detailRestaurant = document.querySelector(".restaurant");

  detailImage.src = image;
  detailImage.alt = name;
  detailName.textContent = name;
  detailRestaurant.textContent = restaurant;
  ratingDisplay.textContent = rating;
  commentDisplay.textContent = comment;
};

const addSubmitListener = () => {
  ramenForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("new-name").value;
    const restaurant = document.getElementById("new-restaurant").value;
    const image = document.getElementById("new-image").value;
    const rating = document.getElementById("new-rating").value;
    const comment = document.getElementById("new-comment").value;

    const newRamen = { name, restaurant, image, rating, comment };

    const newRamenImage = document.createElement("img");
    newRamenImage.src = image;
    newRamenImage.alt = name;
    newRamenImage.addEventListener("click", () => handleClick(newRamen));

    ramenMenuDiv.appendChild(newRamenImage);
  });
};

const displayRamens = async () => {
  const ramens = await fetchRamens();

  ramens.forEach((ramen) => {
    const { name, image } = ramen;
    const ramenImage = document.createElement("img");
    ramenImage.src = image;
    ramenImage.alt = name;
    ramenImage.addEventListener("click", () => handleClick(ramen));
    ramenMenuDiv.appendChild(ramenImage);
  });
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

window.addEventListener("DOMContentLoaded", main);

// Export functions for testing
export { displayRamens, addSubmitListener, handleClick, main };