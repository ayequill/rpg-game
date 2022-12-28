import characterData from "./data.js";
import Character from "./character.js";

let isWaiting = false;
console.log(!isWaiting);
let monstersArray = ["orc", "demon", "goblin"];

// Create new objects with Character constructor

const getNewMonster = () => {
  const nextMonsterData = characterData[monstersArray.shift()];
  return nextMonsterData ? new Character(nextMonsterData) : {};
};

//
const attack = () => {
  if (!isWaiting) {
    wizard.setDiceHtml();
    monster.setDiceHtml();
    wizard.takeDamage(monster.currentDiceScore);
    monster.takeDamage(wizard.currentDiceScore);
    render();

    if (wizard.dead) {
      endGame();
    } else if (monster.dead) {
      isWaiting = true;
      if (monstersArray.length > 0) {
        setTimeout(() => {
          monster = getNewMonster();
          render();
          isWaiting = false;
        }, 1300);
      } else endGame();
    }
  }
};

const endGame = () => {
  isWaiting = true;
  // check to see if either character is dead
  const endMessage =
    wizard.health === 0 && monster.health === 0
      ? "All dead"
      : wizard.health > 0
      ? "Wizard wins"
      : "The monsters are wins";
  // render game over  is condition is true
  const endEmoji = wizard.health > 0 ? "🔮" : "☠️";
  setTimeout(() => {
    document.body.innerHTML = `<div class="end-game">
                                 <h2>Game Over</h2>
                                 <h3>${endMessage}</h3>
                                 <p class="end-emoji">${endEmoji}</p>
                              </div>`;
  }, 1500);
};

const render = () => {
  document.getElementById("hero").innerHTML = wizard.renderCharacters();
  document.getElementById("monster").innerHTML = monster.renderCharacters();
  console.log(wizard.currentDiceScore);
};
document.getElementById("attack-button").addEventListener("click", attack);

const wizard = new Character(characterData.hero);
let monster = getNewMonster();
render();
