/**
 * Grab Snaffles and try to throw them through the opponent's goal!
 * Move towards a Snaffle and use your team id to determine where you need to throw it.
 **/

function getMyWizards(entities) {
  return entities.filter(entity => entity.entityType === 'WIZARD');
}

function getSnaffles(entities) {
  return entities.filter(entity => entity.entityType === 'SNAFFLE');
}

function getDistanceBetween(A, B) {
  return Math.sqrt((B.x - A.x)*(B.x - A.x) + (B.y - A.y)*(B.y - A.y));
}

function getClosestSnaffle(wizard, snaffles) {
  return snaffles.reduce((distance, snaffle) => {
    const newDistance = getDistanceBetween(wizard, snaffle);
    return newDistance > snaffle.distance ?
      Object.assign({}, snaffle, {newDistance}):
      snaffle;
  }, {
    x: 0,
    y: 0,
    distance: 0
  });
}

var myTeamId = parseInt(readline()); // if 0 you need to score on the right of the map, if 1 you need to score on the left

var oppositeGoals = {
  0: {
    x: 16000,
    y: 3750
  },
  1: {
    x: 0,
    y: 3750
  }
};

var enemyGoal = oppositeGoals[myTeamId];

// game loop
while (true) {
    var entities = parseInt(readline()); // number of entities still in game
    var entitiesTable = [];
    for (var i = 0; i < entities; i++) {
        var inputs = readline().split(' ');
        var entityId = parseInt(inputs[0]); // entity identifier
        var entityType = inputs[1]; // "WIZARD", "OPPONENT_WIZARD" or "SNAFFLE" (or "BLUDGER" after first league)
        var x = parseInt(inputs[2]); // position
        var y = parseInt(inputs[3]); // position
        var vx = parseInt(inputs[4]); // velocity
        var vy = parseInt(inputs[5]); // velocity
        var state = parseInt(inputs[6]); // 1 if the wizard is holding a Snaffle, 0 otherwise
        entitiesTable.push({
          entityId,
          entityType,
          x,
          y,
          vx,
          vy,
          state
        });
    }

    const myWizards = getMyWizards(entitiesTable);
    const snaffles = getSnaffles(entitiesTable);

    myWizards.forEach(function(myWizard) {
        if (myWizard.state === 1) {
          print(`THROW ${enemyGoal.x} ${enemyGoal.y} 500`);
        }
        else {
          var closestSnaffle = getClosestSnaffle(myWizard, snaffles);
          print(`MOVE ${closestSnaffle.x} ${closestSnaffle.y} 150`);
        }
        // Write an action using print()
        // To debug: printErr('Debug messages...');


        // Edit this line to indicate the action for each wizard (0 <= thrust <= 150, 0 <= power <= 500)
        // i.e.: "MOVE x y thrust" or "THROW x y power"
        // print('MOVE 8000 3750 100');
    })
}
