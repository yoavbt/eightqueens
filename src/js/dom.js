import $ from "jquery";
import Game from './logic';
var Dom = {};

Dom.intialize = function () {
    $("#start-btn").click(function(){
        let numberOfCells = $("#size-of-board").val();
        $(".start-menu").css("display", "none")
        Dom.createMenu(numberOfCells);
        Dom.createBoard(numberOfCells);
    })
}

Dom.createBoard = function(numberOfCells){
    Game.initialize(numberOfCells);
    var game = $(".game");
    var board = $("<div class='board'></div>")
    board.appendTo(game);
    let size = Math.floor((100 / numberOfCells) - 1);
    for(let i = 0 ; i < Game.board.length ; i++){
        for(let j = 0; j < Game.board.length; j++){
            var style = `child div${i + "" + j}`;
            var newCell =  $(`<div class="${style}" style="flex: 1 0 ${size}%"></div>`)
            newCell.appendTo(board)
            if ((i+j) % 2 === 0){
                newCell.css("background" , "white")
            }
            else {
                newCell.css("background" , "black")
            }
            newCell.click(() => {
                let res = Game.updateCell(i, j);
                if(res){
                    let curr = $(`.div${i + "" + j}`)
                    if(curr.attr("class").includes("img")){
                        curr.text("");
                        Dom.updateMenu(true, numberOfCells);
                    }
                    else {
                        curr.text("👑");
                        Dom.updateMenu(false);
                        if (Game.queensLeft === 0){
                            Dom.createPopUp(false, numberOfCells);
                        }
                    }
                    curr.toggleClass("img")   
                }
                else {
                    Dom.createPopUp(true, numberOfCells);
                }
            })
        }
    }
}

Dom.createMenu = function(numberOfCells){
    var game = $(".game");
    var menu = $(`
    <div class="game-menu">
        <h1>👑: ${numberOfCells}</h1>
        <button class="restart-btn">Restart</button>
    </div>`)
    menu.appendTo(game)
    $(".restart-btn").click(() => {
        $(".game").empty();
        Game.initialize(numberOfCells);
        Dom.createMenu(numberOfCells);
        Dom.createBoard(numberOfCells);        
    })
}


Dom.updateMenu = function(increment){
    if(increment){
        Game.queensLeft++
    }
    else {
        Game.queensLeft--
    }
    $(".game-menu h1").text(`👑: ${Game.queensLeft}`)
}

Dom.createPopUp = function(gameOver, numberOfCells){
    let popUp = $(".modal");
    popUp.empty();
    if (gameOver){
        $(`<div class="modal-wrapper">
        <h1>Game over : Illegal step</h1>
        <button id="continue">continue playing</button>
        <button id="start">start over</button>
        </div>`).appendTo(popUp);
        $("#continue").click(() => popUp.removeClass("on"))
    }
    else {
        $(`<div class="modal-wrapper">
        <h1>Wow! you solve it!</h1>
        <button id="start">start over</button>
        </div>`).appendTo(popUp);
    }
  
    $("#start").click(() => {
        popUp.removeClass("on")
        $(".game").empty();
        Game.initialize(numberOfCells);
        Dom.createMenu(numberOfCells);
        Dom.createBoard(numberOfCells);     
    })

    popUp.addClass("on");
}

export default Dom;