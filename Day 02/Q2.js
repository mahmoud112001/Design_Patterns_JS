/*

2-Suppose that we play playstation 
football game and during the game we want to change the game plan
    (attack -defence - meduim)
 */

// Strategies
class AttackStrategy {
  play() {
    console.log("Playing in ATTACK mode ⚽🔥");
  }
}

class DefenseStrategy {
  play() {
    console.log("Playing in DEFENSE mode 🛡️");
  }
}

class MediumStrategy {
  play() {
    console.log("Playing in MEDIUM mode ⚖️");
  }
}

// Context (Game)
class Game {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  play() {
    this.strategy.play();
  }
}

// testcase
const game = new Game(new MediumStrategy());

game.play(); // medium

game.setStrategy(new AttackStrategy());
game.play(); // attack

game.setStrategy(new DefenseStrategy());
game.play(); // defense