const getDiceRollArray = (diceCount) =>
  new Array(diceCount).fill(0).map(() => Math.floor(Math.random() * 6) + 1);

 const getDicePlaceHolderHtml = (diceCount) => {
    return new Array(diceCount).fill(0).map(()=>{
        return `<div class="placeholder-dice"></div>`
    }).join('')
}

const getPercentage = (remainingHealth,maximumHealth) => remainingHealth/maximumHealth * 100

  export {getDiceRollArray, getDicePlaceHolderHtml, getPercentage}