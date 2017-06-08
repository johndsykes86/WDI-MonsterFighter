//Jquery selections
var startButton = $('.newgame')
var display = $('.container')

//player and boss objects
var playerOne = {
  name: '',
  score: 0,
  timeElapsed: 0,
  hasGone: false,
  hp: 2000
}

var playerTwo = {
  name: '',
  score: 0,
  timeElapsed: 0,
  hasGone: false,
  hp: 2000
}

var boss = {
  hp: 4000,
  isDefeated: false
}

//Timer variables
var minutes = 0
var milliseconds = 0
var seconds = 0

//game state variables
var currentPlayer = playerOne;
var chargeCounter = 0;
var deathBlowCounter = 0;
var timeout = 2500;


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
    namePrompt()
    nameCheck()

  })
  //continues through instructions.
  yes.on('click', function() {
    instructions()
  })
}

//You should be able to see the boss.
//You should be able to see the attacker on the screen.

//As a user, I should see instructions on how to play the game after clicking the new game button
function instructions() {

  var story = "A fierce and wild monster rules these lands. You've been sent into the deep woods to slay the dreaded beast in its lair. Your weapon hand shakes as you encounter the beast, Can you defeat the monster before he defeats you?"
  var attackOne = "<br><button class='attack-strong attack-button'></button><br>Finally a real hero's attack. Does between 50-100 damage and unlocks the MEGA ATTACK! Beware: you can miss your strikes"
  var attackTwo = "<br><button class='attack-mega attack-button'></button><br>Does between 100-400 damge. If the gods are with you and you're fast enough, 3 of these attacks unlocks your fiercest blow"
  var attackThree = "<br><button class='deathBlow attack-button'></button><br>This kills monsters dead. Unless you miss, which gives the monster time to heal. So don't miss. (50/50 chance to miss)"

  $('.instruct').html('<p>' + story + '</p>' + '<button class="instruct-button 1">OK</button>')

  $('.1').on('click', function() {
    $('.instruct').html('<p class = "attacks">' + attackOne + "<br>" + attackTwo + "<br>" + attackThree + '</p>' + '<button class="instruct-button 2">OK</button>')

    $('.2').on('click', function() {
      $('.instruct').hide()
      gameboard()
    })
  })
}



function timer() {
  milliseconds++
  if (milliseconds === 999) {
    milliseconds = 0
    seconds += 1
  }
  if (seconds === 60) {

    milliseconds = 0
    seconds = 0
    minutes += 1
  }
  $('.timer').text('Time Elapsed: ' + seconds + ":" + milliseconds)
}

// random damage generator.
function damage(min, max) {
  var ap = random(min, max)
  console.log(ap)
  gameState(ap)
}


//updates score
function gameState(ap) {


  //updates score and score display
  currentPlayer.score += ap
  boss.hp -= ap
  $('.boss img').effect('shake')
  $('.score').text("Player Score: " + currentPlayer.score)
  $('.health').text("Boss Health: " + boss.hp)
  $('.playerhealth').text("Player Health: " + currentPlayer.hp)

  function hitAnimation() {
    $('.hit').text(ap).fadeIn().animate({
      fontSize: 45 + 'px'
    }).animate({
      fontSize: 0 + 'px'
    }).fadeOut()
  }

  hitAnimation()
  //loads Mega Attack if charge counter is at 5


  if (chargeCounter === 5) {
    console.log('fully charged')
    $('.attack-mega').show()
    $('.attack-mega').hide(timeout);
  }

  if (deathBlowCounter === 3){
    console.log('DeathBlow fully charged!')
    $('.deathBlow').show()
    $('.deathBlow').hide(1200);
  }





  //Switch turns and win conditonals


  if (boss.hp <= 1) {
    $('.boss').hide('explode', {
      pieces: 32
    }, 3000)
    currentPlayer.hasGone = true;
    currentPlayer.timeElapsed = seconds / 1000 + milliseconds
    seconds = 0
    milliseconds = 0
    console.log(currentPlayer.name + "time's was: " + currentPlayer.timeElapsed)
    currentPlayer = playerTwo
    ChargeCounter = 0
    deathBlowCounter = 0
    timeout = 2500;
    boss.hp = 4000;
    if (playerOne.hasGone === true & playerTwo.hasGone == true) {
      console.log("game is over")
      display.empty()
      if (playerOne.score >= playerTwo.score || playerOne.timeElapsed >= playerTwo.score) {

        display.append("<h1 class='winner'></h1>")
        $('.winner').animate({
          fontSize: "0px"
        }).text(playerOne.name + " is the winner!").animate({
          fontSize: "60px"
        })
      } else {
        $('.winner').animate({
          fontSize: "0px"
        }).text(playerOne.name + " is the winner!").animate({
          fontSize: "60px"
        })
      }
    } else {
      display.empty()
      resetboard = setTimeout(gameboard, 5000)
    }
  }

return "yea, its dead"


}




function gameboard() {

  display.append('<div class = scoreDisplay><p class = "score"> Player Score: ' + currentPlayer.score + '</p>' + '<p class = "playerhealth">Player Health: ' + currentPlayer.hp + '</p>' + '<p class = "health">Boss Health: ' + boss.hp + '</p>' + '<p class = "timer">' + '</p>' + ' </div>');
  display.append("<div class='boss'><img src='img/cyclops.png'></div>")
  display.append("<div class='heroBox'><img src='img/hero.png' class='hero'><div>")

  var heroDisplay = $('.heroBox')

  heroDisplay.append("<button class='attack-strong attack-button'></button>")
  heroDisplay.append("<button class='attack-mega attack-button'></button>")
  heroDisplay.append("<button class='deathBlow attack-button'></button>")
  heroDisplay.append('<h3 class="hit"></h3>')
  $('.hit').hide()
  $('.attack-mega').hide()
  $('.deathBlow').hide()

  setInterval(timer, 1)





  $('.attack-strong').on('click', function() {
    chargeCounter += 1
    console.log(chargeCounter)
    var strongAttack = damage(50, 100)
    $(this).css({
      'left': random(0, 300) + "px",
      'top': random(0, 125) + "px"
    })

  })




  $('.attack-mega').on('click', function() {
    var chanceToHit = random (1,5)

    if (chanceToHit <= 1){
      console.log('Missed')
      chargeCounter = 0
  } else {
    var megaAttack = damage(100, 400)
    deathBlowCounter+=1
    chargeCounter = 0
  }

    $(this).css({
      'left': random(0, 300) + "px",
      'top': random(0, 125) + "px"
    })
    $(this).hide()
  })
}

  $('.deathBlow').on('click', function() {
    var chanceToHit = random (1,4)

    if (chanceToHit <= 1){
      console.log('Missed')
      chargeCounter = 0
      boss.hp += boss.hp/2
  } else {
    gameState(4000);
  }

    $(this).css({
      'left': random(0, 300) + "px",
      'top': random(0, 125) + "px"
    })
    $(this).hide()
  })
