function AI() {

         this.Move = function(game)
         {
            if(!this.GetEmptyCells(game))
            return null;
            var p = this.GetRandomCell();
            console.log("Rand",p);
            return EmptyCells[p];
             
         }
         var EmptyCells = new Array();
         this.GetEmptyCells = function(game)
         {           
             for (var i = 0; i < 3; i++)
             for (var j = 0; j < 3; j++)
             if (game.Items[i][j] == FieldState.Empty)
             EmptyCells.push(i+" "+j);
                 console.log(EmptyCells);
                 return true;
         }
         this.GetRandomCell = function()
         {
           return Math.floor(Math.random() * (EmptyCells.length - 0)) + 0;    
         }
    };