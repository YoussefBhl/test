var express = require('express');
var router = express.Router();
//eq.params, req.body, or req.query
/* GET users listing. */
router.get('/', function(req, res, next) {
    wantedPosition = req.query.wantedPosition;
    knightPosition = req.query.knightPosition;
    console.log(wantedPosition)
    if(verifyParam(wantedPosition)&&verifyParam(knightPosition)){
        path = shortestPath(wantedPosition,knightPosition);
        res.send({"code":204,"success":path})
    }
    else{
        res.send({"code":400,"error":"Paramaters fault"})
    }
    
});
//verify the paramters are correct (A1 <= param <= H8 )
verifyParam = function(param){
    if(param.length != 2){
        return false;
    }
    if(param[0]<'A' || param[0]>'H'){
        return false;
    }
    if(parseInt(param[1])<1 || parseInt(param[1])>8){
        return false;
    }
    return true;
}
//shortestPath get the wantedPosition and return the shortest path based on an heuristic
shortestPath = function(wantedPosition,position){
    var actualPosition = position;
    var visitedPosition = [position];
    var path = [[position,position,0]];
    var moves = [];
    var rankedMoves = [];
    var nextPositionIndex;
    //moves contain the possible moves, previous and the numbre of steps to get to the possbile move
    moves = moves.concat(possibleMoves(actualPosition).map(x => [x,actualPosition,1]))
    while(true){
        //we have to delete the moves that already done 
        moves = moves.filter(x => !visitedPosition.includes(x[0]));
        //to find the best move we have to define an heuristic
        //the heuristic is the distance betwen the possible move and the wantedPosition + the numbre of steps
        rankedMoves = moves.map( x => x[2] + Math.abs(wantedPosition[0].charCodeAt(0) - x[0][0].charCodeAt(0)) + 
                    Math.abs(parseInt(wantedPosition[1]) - parseInt(x[0][1])));
        //we get the next move and update the varibles 
        nextPositionIndex = rankedMoves.indexOf(Math.min(...rankedMoves));
        actualPosition = moves[nextPositionIndex][0];
        visitedPosition.push(moves[nextPositionIndex][0]);
        path.push(moves[nextPositionIndex]);

        //if we reach the wanted moves we return the shortest path
        if(actualPosition == wantedPosition){
            return getPath(path,wantedPosition).reverse();
        }
        moves = moves.concat(possibleMoves(actualPosition).map(x => [x,actualPosition,moves[nextPositionIndex][2]+1]))
    }
}
//getPath takes path wich is all the moves that the algoithms tried is to get the shoretest path
//to get the shoretest path we begin with wantedPosition to reach the intial position of the knight
getPath = function (path,wantedPosition){
    index = path.map(x => x[0]).indexOf(wantedPosition)
    if(path[index][2] == 0){
        return path[index][1]
    }
    return [wantedPosition].concat(getPath(path.filter(x => x[2] < path[index][2]),path[index][1]))
}

//possibleMoves takes the knight's position and return the list of possible moves
possibleMoves = function (knightPosition){
    // to find the possible knight's moves we have to test if the possible move is on the board 
    // we can devide the moves to right and left moves wich are also devided into two columns
    // after fixing the column we've to test the rows wich are between 1 and 8
    // the left and the right moves has the same code so we've create a function colled "filter"
    //we assume that the knight position is simplfied to 
    var firstRightColumn = nextChar(knightPosition[0]);
    var secondRightColumn = nextChar(firstRightColumn); 
    var firstLeftColumn = previousChar(knightPosition[0]);
    var secondLeftColumn = previousChar(firstLeftColumn);
    var moves = [];
    //get the right moves and add it to moves
    moves = moves.concat(filter(firstRightColumn <= 'H',secondRightColumn <= 'H',firstRightColumn,secondRightColumn, parseInt(knightPosition[1])));
    //get the left moves and add it to moves
    moves = moves.concat(filter(firstLeftColumn >= 'A',secondLeftColumn >='A',firstLeftColumn, secondLeftColumn, parseInt(knightPosition[1])));
    return moves;
}

//filter used to return the possible moves 
// it can be used to return the right moves or the left moves

filter = function(firstCond, secondCond,firstColumn, secondColumn, position){
    var moves = [];
    if(firstCond){
        if(position+2 <= 8){
            moves.push(firstColumn+(position+2));
        }
        if(position-2 >= 1){
            moves.push(firstColumn+(position-2));
        }
        if(secondCond){
            if(position+1 <= 8){
                moves.push(secondColumn+(position+1));
            }
            if(position-1 >= 1){
                moves.push(secondColumn+(position-1));
            }
        }
    }
    return moves;
}
//return next char
nextChar = function (c){
    return String.fromCharCode(c.charCodeAt(0)+1);
}
//return previous char
previousChar = function (c){
    return String.fromCharCode(c.charCodeAt(0)-1);
}
module.exports = router;
