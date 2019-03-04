function Init() {

    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++) {
            document.getElementById('game').innerHTML += '<div data-x="' + i + '" data-y="' + j + '"class = "block"></div>';

        }
    var btn = document.createElement('input');
    btn.type = 'button'; // или 'submit', или 'reset';
    btn.id = 'reset';
    btn.value = 'Reset'; // или 'Отправить', или 'Очистить'...
    btn.style.cssText = 'color: red; margin-top: 10px; ...';
    btn.onclick = Reset;

    // "приживление" кнопки
    // вариант первый: перед закрывающим тегом какого-нить тега-контейнера с id="myPlace"
    document.getElementById('game').appendChild(btn);
}
function Reset()
{
    game = new Game();
    var pbs = document.getElementsByClassName('block');
    for (var i = 0; i < 9; i++)
    pbs[i].innerHTML = null;
}

var Cross = '<img src = "images/cross.png">';
var Nought = '<img src = "images/circle.png">';
var game = new Game();
Init();
document.getElementById('game').onclick = function (event) {
    if (event.target.className == 'block') {
        var x = event.target.dataset.x;
        var y = event.target.dataset.y;
        game.MakeMove(x, y);
        event.target.innerHTML = game.Items[x][y] == FieldState.Cross ? Cross : Nought;
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