import gameResource from "./examples/gameExample.js";
import characterResource from "./examples/characterExample.js";
import locationResource from "./examples/locationExample.js";
import levelResource from "./examples/levelExample.js";
import graffitiTagResource from "./examples/graffitiTagExample.js";
import songResource from "./examples/songExample.js";
import artistResource from "./examples/artistExample.js";

const gameResponse = document.querySelector('#game-response');
if (gameResponse) {
  gameResponse.textContent = JSON.stringify(gameResource, null, 4);
}
const characterResponse = document.querySelector('#character-response');
if (characterResponse) {
  characterResponse.textContent = JSON.stringify(characterResource, null, 4);
}
const locationResponse = document.querySelector('#location-response');
if (locationResponse) {
  locationResponse.textContent = JSON.stringify(locationResource, null, 4);
}
const levelResponse = document.querySelector('#level-response');
if (levelResponse) {
  levelResponse.textContent = JSON.stringify(levelResource, null, 4);
}
const graffitiTagResponse = document.querySelector('#graffiti-tag-response');
if (graffitiTagResponse) {
  graffitiTagResponse.textContent = JSON.stringify(graffitiTagResource, null, 4);
}
const songResponse = document.querySelector('#song-response');
if (songResponse) {
  songResponse.textContent = JSON.stringify(songResource, null, 4);
}
const artistResponse = document.querySelector('#artist-response');
if (artistResponse) {
  artistResponse.textContent = JSON.stringify(artistResource, null, 4);
}

const expandableButtons = document.querySelectorAll(".expandable-button");
if (expandableButtons) {
  expandableButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (!button.classList.contains('expanded')) {
        button.classList.add('expanded');
        button.textContent = 'Collapse';
      } else {
        button.classList.remove('expanded');
        button.textContent = 'Expand';
      }
      const content = button.parentElement.nextElementSibling;
      content.style.display = content.style.display === "none" ? "block" : "none";
    });
  });
}