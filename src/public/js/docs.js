import gameResource from "./examples/gameExample.js";
import characterResource from "./examples/characterExample.js";
import locationResource from "./examples/locationExample.js";
import levelResource from "./examples/levelExample.js";
import graffitiTagResource from "./examples/graffitiTagExample.js";
import songResource from "./examples/songExample.js";
import artistResource from "./examples/artistExample.js";
import collectibleResource from "./examples/collectibleExample.js";
import audioResource from "./examples/audioExample.js";

const resources = [
  {selector: "#game-response", data: gameResource},
  {selector: "#character-response", data: characterResource},
  {selector: "#location-response", data: locationResource},
  {selector: "#level-response", data: levelResource},
  {selector: "#graffiti-tag-response", data: graffitiTagResource},
  {selector: "#song-response", data: songResource},
  {selector: "#artist-response", data: artistResource},
  {selector: "#collectible-response", data: collectibleResource},
  {selector: "#audio-response", data: audioResource},
];

resources.forEach(({selector, data}) => {
  const el = document.querySelector(selector);
  if (el) el.textContent = JSON.stringify(data, null, 4);
});

// Expand/collapse buttons
document.querySelectorAll(".expandable-button").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.classList.toggle("expanded");
    button.textContent = expanded ? "Collapse" : "Expand";

    const content = button.parentElement.nextElementSibling;
    if (content) {
      content.style.display = expanded ? "block" : "none";
    }
  });
});
