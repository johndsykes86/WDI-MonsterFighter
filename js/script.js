console.log("I'm loaded!")

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

  display.append('<div class = "instruct"><div</>')

  $('.instruct').html('<p>Are these names correct?' + '<br>' + '<br>' + playerOne.name + '<br>' + playerTwo.name + '</p>' + '<button class="instruct-button yes ">Yes</button> <button class="instruct-button no">No</button>')



  var no = $('.no')
  var yes = $('.yes')


  no.on('click', function() {
    console.log("You've clicked no!")
    namePrompt()
    nameCheck()

  })

  yes.on('click', function() {
    console.log("You've clicked yes!")
    instructions()
  })
}

//As a user, I should see instructions on how to play the game after clicking the new game button

function instructions() {
  var instructions = "A fierce and wild monster rules these lands. Can you defeat the monster in 30 seconds or less?  "
  $('.instruct').html('<p>' + instructions + '</p>' + '<button class="instruct-button">OK</button>')

  $('.instruct-button').on('click', function() {
    $('.instruct').hide()
    boss()
    hero()
  })
}

//being able to see the enemy.
function boss() {
  //target the display div and append the image.

  display.append("<img src='img/cyclops.png' class='enemy'>")

  $('img.enemy').on('click', function() {
    console.log("I've been clicked")
    
  })
}

//being able to see my character on screen.
function hero(){
  display.append("<div class='hero-box'><img src='img/hero.png' class='hero'><div>")

  $('img.hero').on('click', function() {
    console.log("I've been clicked")

  })
}


function random(){
  return Math.floor(Math.random()*300)
}


function attack() {
  display.append("<button class='attack-normal attack-button'>ATTACK</button>")

  display.append("<button class='attack-strong attack-button'>STRONG ATTACK!</button>")



  var countToMega = 0

  $('.attack-normal').on('click', function() {
    console.log("I've been clicked")
    playerOne.score += 10;
    randomMove()
  })

  $('.attack-strong').on('click', function() {
    console.log("I've been clicked")
    playerOne.score += 30;
    countToMega += 1
    $('.attack-strong').fadeOut(750).fadeIn(750)


    if (countToMega === 5) {
      console.log("MY ULT IS CHARGED")
      display.append("<button class='attack-mega attack-button'>Mega Attack!</button>")
      $('.attack-mega').fadeOut(800)
      playerOne.score += 100
      countToMega = 0;
      $('.attack-mega').on('click', function() {
        console.log('OH. OH MY. OH MY GOODNESS!');
        $(this).hide();
      })
    }

    randomMove();
  })

  function randomMove(){
    $('.attack-button').each(function(index){
      $(this).css({'left': random(), 'top': random()})
      console.log(this);
    })
  }

  randomMove()

}

//
