
const itemsContainer = document.querySelector("#list-items");

function addItem(item) {
  const colourCard = document.createElement("section");
  colourCard.className = "card w-75";
  itemsContainer.append(colourCard);

  const colourCardBody = document.createElement("article");
  colourCardBody.className = "card-body";
  colourCard.append(colourCardBody);

  const colourCardTitle = document.createElement("h5");
  colourCardTitle.className = "card-title";
  colourCardTitle.innerText = item.name;
  colourCardBody.append(colourCardTitle);

  const colourCardText = document.createElement("p");
  colourCardText.className = "card-text";
  colourCardText.innerText = item.pantone_value;
  colourCardBody.append(colourCardText);

  const colourCardColour = document.createElement("figure");
  colourCardColour.style.backgroundColor = item.color;
  colourCardColour.innerText = item.color;
  colourCardBody.append(colourCardColour);

  const colourCardBreak = document.createElement("br");
  itemsContainer.append(colourCardBreak);
}

// Tareas 1, 2 y 3
async function fetchColorsList() {
  try {
    const response = await fetch("https://reqres.in/api/unknown");

    if (!response.ok) {
      throw new Error("Error al obtener los colores: " + response.status);
    }

    const result = await response.json();
    const colors = result.data;

    localStorage.setItem("colors", JSON.stringify(colors));

    itemsContainer.innerHTML = "";

    colors.forEach(function(color) {
      addItem(color);
    });

  } catch (error) {
    console.error("Error:", error);
  }
}

// Tarea 4
function loadColorsFromStorage() {
  const savedColors = localStorage.getItem("colors");

  if (savedColors) {
    const colors = JSON.parse(savedColors);

    itemsContainer.innerHTML = "";

    colors.forEach(function(color) {
      addItem(color);
    });

    return true;
  }

  return false;
}

// Tarea 5
function clearColors() {
  localStorage.removeItem("colors");
  itemsContainer.innerHTML = "";
}

// Tarea 6
function reloadColors() {
  fetchColorsList();
}


if (!loadColorsFromStorage()) {
  fetchColorsList();
}
