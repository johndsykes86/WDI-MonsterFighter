var startButton = $('.newgame')
var display = $('.container')
var heroBox = $('.heroBox')
var playerOne = {
  name: '',
  score: 0
}

var playerTwo = {
  name: '',
  score: 0
}

var enemy = {
  hp: 2000,
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

//You should be able to see the enemy.
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


function gameboard() {
  display.append('<div class = scoreDisplay><p class = "score"> Player Score: ' + currentPlayer.score + '</p>' + '<p class = "health">Boss Health: ' + enemy.hp + '</p>' + '</div>');
  display.append("<img src='img/cyclops.png' class='boss'>")
  display.append("<div class='heroBox'><img src='img/hero.png' class='hero'><div>")

}

//I should be able to attack the boss.
function attack() {
  $(".heroBox").append("<button class='attack-normal attack-button'></button>")
  $(".heroBox").append("<button class='attack-strong attack-button'></button>")

  //updates score
  function updateScore(ap) {
    if (ap === 0) {
      enemy.hp += 100;
      $('.health').text("Boss health: " + enemy.hp)
    } else {
      currentPlayer.score += ap
      enemy.hp -= ap
      $('.score').text("Player Score: " + currentPlayer.score)
      $('.health').text("Boss Health: " + enemy.hp)
    }
  }


  // random damage generator.
  function damage(min, max) {

    var ap = random(min, max)

    function hitOrMiss() {
      var hit = random(1, 5)
      return hit;
    }

    if (hitOrMiss() <= 2) {
      ap = 0;
      console.log(ap)
      $('.miss').text("MISS!")
    } else {
      console.log(ap)
      display.append("<h1 class='hit>" + ap + "</h1>")
      updateScore(ap)
    }
    return ap
  }





  $('.attack-normal').on('click', function() {
    var normalAttack = updateScore(25, 50);
    $(this).css({
      'left': random(0, 300) + "px",
      'top': random(0, 125) + "px"
    })
  })

  $('.attack-strong').on('click', function() {
    var strongAttack = damage(50, 100)
    if (strongAttack > 0) {
      chargeCounter += 1
    } else {
      console.log("you missed")
    }
    $(this).css({
      'left': random(0, 300) + "px",
      'top': random(0, 125) + "px"
    })

    if (chargeCounter === 5) {
      $('.heroBox').append("<button class='attack-mega attack-button'></button>")
      $('.attack-mega').fadeOut(timeout)
      $('.attack-mega').on('click', function() {
       var megaAttack = damage(200, 400)
        $(this).hide();
        timeout -= 300
        if (megaAttack != 0){
          deathBlowCounter += 1
        } else {
          console.log('missed DeathBlow')
        }
      })
      chargeCounter = 0;
    }

    if (deathBlowCounter === 3) {
      heroBox.append("<button class='deathBlow attack-button'>Death Blow</button>")

      $('.deathBlow').on('click', function() {
        var deathBlowChance = random(1, 2)
        if (deathBlowChance === 1) {
          enemy.hp = 0
          enemy.isDefeated = true
          console.log("he's dead Jim")
        } else {
          console.log("Oh no! DeathBlow failed! Enemy's recovering half their health. ")
          enemy.hp = 2000
        }

      })

    }


  })

  if (enemy.hp===0){
    console.log('enemy is defeated')
    enemy.isDefeated = true;
  }

  if (enemy.isDefeated){
    display.append("<h1>Game over</h1>")
    currentPlayer = playerTwo;
    display.empty();

    gameboard();
    }


}









//
