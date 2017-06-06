var startButton = $('.newgame')
var display = $('.container')
var playerOne = {
  name: '',
  score: 0
}

var playerTwo = {
  name: '',
  score: 0
}

var enemy = {
  hp: 1000,
  isDefeated: false
}

var currentPlayer = playerOne;
var chargeCounter = 0
var deathBlowCounter = 0
var timeout = 1500;

// random function for attacks, moving buttons, etc.
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//As a user, I should be able to start a new game by clicking a button

startButton.on('click', function() {
  newGame()
})

function newGame() {
  namePrompt()
  nameCheck()
  gameboard()
}


// As a user, I should be able to input my name so that I can know who I'm playing against.

function namePrompt() {
  function playerOneName() {
    playerOne.name = prompt("What is player One's name")

    if (!playerOne.name || playerOne.name === "") {
      alert('Player One Name cannot be blank. Please put in a name')
      playerOneName();
    }
  }

  function playerTwoName() {
    playerTwo.name = prompt("What is player Two's name")

    if (!playerTwo.name || playerTwo.name === "") {
      alert('Player Two Name cannot be blank. Please put in a name')
      playerOneName();
    }
  }

  playerOneName()
  playerTwoName()
}


//Also, I need to make sure the name's are correct because well, people make mistakes.
function nameCheck() {


  if ($('.instruct').length === 0) {
    display.append('<div class = "instruct"><div</>')
  }

  $('.instruct').html('<p>Are these names correct?' + '</p>' + '<p>' + playerOne.name + '<br>' + playerTwo.name + '</p>' + '<button class="instruct-button yes ">Yes</button> <button class="instruct-button no">No</button>')

  var no = $('.no')
  var yes = $('.yes')

  //if you click no on the confirmation, you'll be prompted for names again.
  no.on('click', function() {
    console.log("You've clicked no!")
    namePrompt()
    nameCheck()

  })
  //continues through instructions.
  yes.on('click', function() {
    console.log("You've clicked yes!")
    instructions()
  })
}

//You should be able to see the enemy.
//You should be able to see the attacker on the screen.
function gameboard(){
  display.append("<img src='img/cyclops.png' class='boss'>")
  display.append("<div class='hero-box'><img src='img/hero.png' class='hero'><div>")
  setTimeout(attack, 1000)
}


//As a user, I should see instructions on how to play the game after clicking the new game button
function instructions() {
  var instructions = "A fierce and wild monster rules these lands. Can you defeat the monster in 30 seconds or less?  "
  $('.instruct').html('<p>' + instructions + '</p>' + '<button class="instruct-button">OK</button>')

  $('.instruct-button').on('click', function() {
    $('.instruct').hide()
    boss()
    hero()
    attack();
  })
}

//I should be able to attack the boss.
function attack() {
  display.append("<button class='attack-normal attack-button'>ATTACK</button>")
  display.append("<button class='attack-strong attack-button'>STRONG ATTACK!</button>")
  display.append('<div class = scoreDisplay><p>'+currentPlayer.score+'</p></div>');

  var testCounter = 0

  // random damage generator.
  function damage(min, max) {

    var ap = random(min, max)

    function hitOrMiss(){
      var hit = random(1, 5)
      return hit;
    }

    if (hitOrMiss()<=1) {
      ap = 0;
      console.log("You've missed...")
    } else {
      currentPlayer.score += ap
      enemy.hp -= ap
    }
    return ap
  }



  $('.attack-normal').on('click', function() {
    damage(50, 80)
    $(this).css({
      'left': random(100, 150),
      'top': random(100, 150)
    })
  })

  $('.attack-strong').on('click', function() {
    var strongAttack = damage(80, 100)
    if (strongAttack > 0){
      chargeCounter += 1
      testCounter +=1
      console.log('Test Counter is now at ' + testCounter)
    }
    $(this).css({
      'left': random(50, 100),
      'top': random(50, 100)
    })


    if (chargeCounter === 5) {
      display.append("<button class='attack-mega attack-button'>Mega Attack!</button>")
      $('.attack-mega').fadeOut(timeout)
      damage(100,150);
      chargeCounter = 0;
      $('.attack-mega').on('click', function() {
        $(this).hide();
        timeout -= 500
        if (damage != 0)
        deathBlowCounter +=1
      })
    }

    if (deathBlowCounter === 3){
      damage
    }
  })


}




//
