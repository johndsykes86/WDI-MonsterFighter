//Jquery selections
var startButton = $('.newgame')
var display = $('.container')


//player and boss objects
var playerOne = {
  name: '',
  score: 0,
  timeElapsed: 0,
  hasGone: false,
}

var playerTwo = {
  name: '',
  score: 0,
  timeElapsed: 0,
  hasGone: false,
}

var boss = {
  hp: 1000,
  isDefeated: false
}

//Timer variables
var milliseconds = 0
var seconds = 0

//game state variables
var currentPlayer = playerOne;
var chargeCounter = 0
var deathBlowCounter = 0
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
  var attackZero = "<button class='attack-normal attack-button'></button><br>Does between 25-50 damage. Not your strongest attack but the most reliable so you'll never miss"
  var attackOne = "<br><button class='attack-strong attack-button'></button><br>Finally a real hero's attack. Does between 50-100 damage and unlocks the MEGA ATTACK! Beware: you can miss your strikes"
  var attackTwo = "<br><button class='attack-mega attack-button'></button><br>Does between 100-400 damge. If the gods are with you and you're fast enough, 3 of these attacks unlocks your fiercest blow"
  var attackThree = "<br><button class='deathBlow attack-button'></button><br>This kills monsters dead. Unless you miss, which gives the monster time to heal. So don't miss. (50/50 chance to miss)"

  $('.instruct').html('<p>' + story + '</p>' + '<button class="instruct-button 1">OK</button>')

  $('.1').on('click', function() {
    $('.instruct').html('<p class = "attacks">' + attackZero + "<br>" + attackOne + "<br>" + attackTwo + "<br>" + attackThree + '</p>' + '<button class="instruct-button 2">OK</button>')

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
  }
  $('.timer').text('Time Elapsed: ' + seconds + ":" + milliseconds)
}

// random damage generator.
function damage(min, max) {
  var ap = random(min, max)
  console.log(ap)
  display.append("<h1 class='hit>" + ap + "</h1>")
  gameState(ap)
}


//updates score
function gameState(ap) {
    currentPlayer.score += ap
    boss.hp -= ap
    var change = false;
    $('.score').text("Player Score: " + currentPlayer.score)
    $('.health').text("Boss Health: " + boss.hp)

    if (boss.hp <= 1 && currentPlayer.hasGone===false) {
        //clear the gameboard and save stats
        console.log('the boss has been defeated!')
        currentPlayer.timeElapsed = seconds/1000 + milliseconds
        console.log(currentPlayer.name + "time's was: " +currentPlayer.timeElapsed)
        currentPlayer.hasGone = true;
        currentPlayer = playerTwo
        change = true;
        hargeCounter = 0
        deathBlowCounter = 0
        timeout = 2500;
        boss.hp= 1000;
        display.empty()
      }

        if (change===true && playerTwo.hasGone === true && playerOne.hasGone===true){
          display.html("<h1>Game Over, both players have gone/h1>")
        }


}




function gameboard() {
    display.append('<div class = scoreDisplay><p class = "score"> Player Score: ' + currentPlayer.score + '</p>' + '<p class = "health">Boss Health: ' + boss.hp + '</p>' + '<p class = "timer">' + '</p>' + '</div>');
    display.append("<img src='img/cyclops.png' class='boss'>")
    display.append("<div class='heroBox'><img src='img/hero.png' class='hero'><div>")
    $(".heroBox").append("<button class='attack-normal attack-button'></button>")
    $(".heroBox").append("<button class='attack-strong attack-button'></button>")
    setInterval(timer, 1)

    $('.attack-normal').on('click', function() {
      var normalAttack = gameState(25, 50);
      $(this).css({
        'left': random(0, 300) + "px",
        'top': random(0, 125) + "px"
      })
    })

    $('.attack-strong').on('click', function() {
      var strongAttack = damage(50, 100)
      $(this).css({
        'left': random(0, 300) + "px",
        'top': random(0, 125) + "px"
      })

    })
}
