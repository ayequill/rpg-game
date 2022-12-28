import {
  getDicePlaceHolderHtml,
  getDiceRollArray,
  getPercentage,
} from "./utils.js";

//  created a class Character. Template for our objects
class Character{
  constructor(data) {
    Object.assign(this, data);
    this.maxHealth = this.health;
    this.diceHtml = getDicePlaceHolderHtml(this.diceCount);
  }
  takeDamage (attackScoreArray) {
    const totalAttackScore = attackScoreArray.reduce((acc, cur) => acc + cur);
    this.health -= totalAttackScore;

    if (this.health <= 0) {
      this.health = 0;
      this.dead = true;
    }
  };

  getHealthBarHtml() {
    const percent = getPercentage(this.health, this.maxHealth);

    return `<div class="health-bar-outer">
             <div class="health-bar-inner ${percent <= 25 ? "danger" : ""}" 
             style="width: ${percent}%;">
            </div>
           </div>`;
  }
  setDiceHtml (diceCount) {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.diceHtml = this.currentDiceScore
      .map((num) => `<div class="dice">${num}</div>`)
      .join("");
  };

  renderCharacters () {
    const { name, avatar, health, diceHtml } = this;
    const healthBar = this.getHealthBarHtml();

    return `<div class="character-card">
          <h4 class="name"> ${name} </h4>
          <img class="avatar" src="${avatar}"/>
          <p class="health">health: <b> ${health} </b></p>
          ${healthBar}
          <div class="dice-container"> ${diceHtml}</div>
          </div> `;
  };
}

export default Character;
