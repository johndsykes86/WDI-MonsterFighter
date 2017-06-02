console.log("I'm loaded!")

var startButton = $('.newgame')
var display = $('.display')

//As a user, I should be able to start a new game by clicking a button



startButton.on('click', function(){
  newGame();
})

function newGame(){
  display.append('<div class = "instruct"></>')
  $('.instruct').html('<p> This is my instructions for the game</p>' + '<button class="instruct-button">ok. I get it!</button>')

  $('.instruct-button').on('click', function(){
    $('.instruct').hide()
  })
}
