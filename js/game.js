function Init() {

    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++) {
            document.getElementById('game').innerHTML += '<div data-x="' + i + '" data-y="' + j + '"class = "block"></div>';

        }
        document.getElementById('game').innerHTML += '<input type="checkbox" checked id="cbVersusPC">VersusPc';
        var btn = document.createElement('input');
        btn.type = 'button'; // или 'submit', или 'reset';
        btn.id = 'reset';
        btn.value = 'Reset'; // или 'Отправить', или 'Очистить'...
        btn.style.cssText = 'color: red; margin-top: 10px; ...';
        btn.onclick = Reset;
        document.getElementById('game').appendChild(btn);
   
    //document.getElementById('game').appendChild(cbVersusPC);
    //document.getElementById('cbVersusPC').checked = false;
    
}

function Build(game)
{
    var k = 0;
    for (var i = 0; i < 3; i++)
    {
        for (var j = 0; j < 3; j++)
        {
            pbs[k].innerHTML = game.Items[i][j] == FieldState.Cross ? Cross : (game.Items[i][j] == FieldState.Nought ? Nought : null);
            k++;
        }
      
    }
}
function Reset()
{
    game = new Game();
    Build(game);
}

var Cross = '<img src = "images/cross.png">';
var Nought = '<img src = "images/circle.png">';
var game = new Game();
Init();
var pbs = document.getElementsByClassName('block');
document.getElementById('game').onclick = function (event) {
    if (event.target.className == 'block') {
        var x = event.target.dataset.x;
        var y = event.target.dataset.y;
        game.MakeMove(x,y);
         //делаем ответный ход
         if (document.getElementById('cbVersusPC').checked && !game.Winned)
         {
             var m = new AI().Move(game);
             
             if(m != null)
             {
                var x = m.charAt(0);
                var y = m.charAt(2);
                game.MakeMove(x,y);
                
                

             }
           
                 
        }
        Build(game);
        //event.target.innerHTML = game.Items[x][y] == FieldState.Cross ? Cross : (game.Items[x][y] == FieldState.Nought ? Nought : null);
        if (game.Winned)
            alert(`${game.CurrentPlayer == 0 ? "Cross" : "Nought"} is winner!`);
    }
    console.log(game);
}


function Game() {
    this.CurrentPlayer = 0;
    this.Winned = false;
    this.Items = [];

    var i, j;
    for (i = 0; i < 3; i++) {
        this.Items.push(0);
        this.Items[i] = [];
        for (j = 0; j < 3; j++) {
            this.Items[i].push(0);
        }
    }

    this.MakeMove = function (x, y) {

        if (this.Items[x][y] != FieldState.Empty)
            return;

        if (this.Winned)
            return;

        this.Items[x][y] = this.CurrentPlayer == 0 ? FieldState.Cross : FieldState.Nought;
        if (this.CheckWinner(FieldState.Cross) || this.CheckWinner(FieldState.Nought)) {
            this.Winned = true;
            return;
        }

        this.CurrentPlayer ^= 1;
    };

    this.CheckWinner = function (state) {
        for (var i = 0; i < 3; i++) {
            if (this.Items[i][0] == state && this.Items[i][1] == state && this.Items[i][2] == state)
                return true;
            if (this.Items[0][i] == state && this.Items[1][i] == state && this.Items[2][i] == state)
                return true;
        }

        if (this.Items[0][0] == state && this.Items[1][1] == state && this.Items[2][2] == state)
            return true;

        if (this.Items[0][2] == state && this.Items[1][1] == state && this.Items[2][0] == state)
            return true;

        return false;
    };
};



var FieldState = Object.freeze({ "Empty": 0, "Cross": 1, "Nought": 2 })