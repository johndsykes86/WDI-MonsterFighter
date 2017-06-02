console.log("I'm loaded!")

var startButton = $('.newgame')
var display = $('.display')
var playerOne = {
  name: '',
  score: 0
}

var playerTwo= {
  name: '',
  score: 0
}

//As a user, I should be able to start a new game by clicking a button

startButton.on('click', function(){
  newGame()

})


function newGame(){
  namePrompt()
  display.append('<div class = "instruct"></>')
  nameCheck()
}


//As a user, I should see instructions on how to play the game after clicking the new game button

function instructions(){

  $('.instruct').html('<p> This is my instructions for the game</p>' + '<button class="instruct-button">OK</button>')

  $('.instruct-button').on('click', function(){
    $('.instruct').hide()
  })


}

// As a user, I should be able to input my name so that I can know who I'm playing against.

function namePrompt(){
  playerOne.name = prompt("What is player One's name")
  playerTwo.name = prompt("What is player Two's name")
}


//Also, I need to make sure the name's are correct because well, people make mistakes.
function nameCheck(){

  $('.instruct').html('<p>Are these names correct?' + '<br>'+ playerOne.name + '<br>'+ playerTwo.name +'</p>' + '<button class="instruct-button yes ">Yes</button> <button class="instruct-button no">No</button>')

  var no = $('.no')
  var yes =$('.yes')


  no.on('click', function(){
    console.log("You've clicked no!")
    namePrompt()
    nameCheck()

  })

  yes.on('click', function(){
    console.log("You've clicked yes!")
    instructions()
  })
}
