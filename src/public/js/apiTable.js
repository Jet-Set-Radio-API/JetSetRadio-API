/* Displays a Table on the home page Showing Some Available Endpoints */
export function createApiTable() {
  const container = document.createElement("div");
  container.className = "api-table-container";

  const table = document.createElement("table");
  table.className = "api-table";

  const headerRow = document.createElement("tr");
  ["Endpoint", "Description"].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  const baseUrl = "https://jetsetradio-api.onrender.com";
  const rows = [
    {
      endpoint: "/v1/api/audio/jsrf?speaker=DJ Professor K",
      description: "Returns all quotes/audio from DJ Professor K from JSRF",
    },
    {
      endpoint: "/v1/api/games",
      description:
        "Lists all games in the Jet Set Radio series and surrounding games",
    },
    {
      endpoint: "/v1/api/songs/brc",
      description: "Returns all songs in Bomb Rush Cyberfunk",
    },
    {
      endpoint: "/v1/api/characters",
      description: "Returns character information from all games",
    },
    {
      endpoint: "/v1/api/characters/jsrf",
      description: "Returns character information from Jet Set Radio Future",
    },
    {
      endpoint: "/v1/api/songs/random?count=3",
      description:
        "Returns 3 random songs from any game. The /random route works on most endpoints.",
    },
    {
      endpoint: "/v1/api/artists/643865b4af5362b86b844d60/songs",
      description:
        "Returns all songs by an artist. This example is Hideki Naganuma",
    },
    {
      endpoint: "/v1/api/locations/random?game=jsr",
      description:
        "Returns a random location from Jet Set Radio/Jet Grind Radio",
    },
    {
      endpoint: "/v1/api/graffitiTags?size=L",
      description: "Returns all Large Graffiti Tags from any game",
    },
    {
      endpoint: "/v1/api/collectibles?type=Outfit",
      description: "Returns all Outfit collectibles from Bomb Rush Cyberfunk",
    },
  ];

  rows.forEach(({endpoint, description}) => {
    const tr = document.createElement("tr");

    const tdEndpoint = document.createElement("td");
    const link = document.createElement("a");
    link.href = `${baseUrl}${endpoint}`;
    link.textContent = endpoint;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.color = "inherit"; // keep the same color as the table text
    link.style.textDecoration = "none";
    tdEndpoint.appendChild(link);

    const tdDesc = document.createElement("td");
    tdDesc.textContent = description;

    tr.appendChild(tdEndpoint);
    tr.appendChild(tdDesc);
    table.appendChild(tr);
  });

  container.appendChild(table);
  return container;
}
