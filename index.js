import GAMES_DATA from './games.js';

const GAMES_JSON = JSON.parse(GAMES_DATA)

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const card = document.createElement("div");
        card.classList.add("game-card");
        card.innerHTML = `
            <img src="${games[i].img}" class="game-img" />
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
            <p>Backers: ${games[i].backers.toLocaleString()}</p>
        `;
        gamesContainer.appendChild(card);
    }
}

addGamesToPage(GAMES_JSON);

const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfunded = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfunded);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const funded = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(funded);
}

function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

const descriptionContainer = document.getElementById("description-container");
const numUnfunded = GAMES_JSON.filter(game => game.pledged < game.goal).length;
const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. Currently, ${numUnfunded} ${numUnfunded === 1 ? "game remains" : "games remain"} unfunded. We need your help to fund these amazing games!`;
const descParagraph = document.createElement("p");
descParagraph.innerHTML = displayStr;
descriptionContainer.appendChild(descParagraph);

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

const [firstGame, secondGame, ...rest] = sortedGames;

const firstGameName = document.createElement("p");
firstGameName.innerHTML = firstGame.name;
firstGameContainer.appendChild(firstGameName);

const secondGameName = document.createElement("p");
secondGameName.innerHTML = secondGame.name;
secondGameContainer.appendChild(secondGameName);
