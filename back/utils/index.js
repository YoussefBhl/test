//return next char
const nextChar = (char) => String.fromCharCode(char.charCodeAt(0)+1);
//return previous char
const previousChar = (char) => String.fromCharCode(char.charCodeAt(0) - 1);
//verify the paramters are correct (A1 <= param <= H8 )
const verifyParam = (param) => {
    if (param.length != 2 || parseInt(param[1]) !== parseInt(param[1])) {
        return false;
    }
    if (param[0] < 'A' || param[0] > 'H') {
        return false;
    }
    if (parseInt(param[1]) < 1 || parseInt(param[1]) > 8) {
        return false;
    }
    return true;
}

//shortestPath get the wantedPosition and return the shortest path based on an heuristic
//forech step we have to find all the possible moves from the knight's actualPosition and save it in moves
//moves containts {possible move, the previous move (to save the path) and the numbre of steps (helps to find the best moves)
const shortestPath = function (wantedPosition, actualPosition) {
    //make sure that we don't go to the same position twice we have to save all the visited Position
    const visitedPosition = [actualPosition];
    //to return the shortest path we have to save all the actual and the previous position
    const path = [{next:actualPosition, previous:actualPosition, step:0}];
    let moves = []; //conatain all the possible moves that the knight could do
    let rankedMoves = []; //we have to rank each move to take the best choice

    //intialize the moves  
    moves = moves.concat(possibleMoves(actualPosition).map(next => ({next, previous:actualPosition, step:1})));
    while (true) {
        //we have to delete the moves that already done
        moves = moves.filter(x => !visitedPosition.includes(x.next));
        //to find the best move we have to define an heuristic
        //the heuristic is the distance betwen the possible move and the wantedPosition + the numbre of steps
        rankedMoves = moves.map( x => x.step + Math.abs(wantedPosition[0].charCodeAt(0) - x.next[0].charCodeAt(0)) + 
                    Math.abs(parseInt(wantedPosition[1]) - parseInt(x.next[1])));
        //we get the next move wich has the min rank
        const nextPositionIndex = rankedMoves.indexOf(Math.min(...rankedMoves));
        //update vars
        actualPosition = moves[nextPositionIndex].next;
        visitedPosition.push(actualPosition);
        path.push(moves[nextPositionIndex]);
        //if we reach the wanted move we return the shortest path
        if(actualPosition === wantedPosition){
            return getPath(path, wantedPosition).reverse();
        }
        //we add the the possible moves and incriment step
        moves = moves.concat(possibleMoves(actualPosition).map(next => ({next,previous:actualPosition,step:moves[nextPositionIndex].step+1})));
    }
}
//getPath takes path wich is all the moves 
//to get the shoretest path we begin with wantedPosition to reach the intial position of the knight
const getPath = (path, wantedPosition) => {
    const index = path.map(x => x.next).indexOf(wantedPosition) //get the wanted postion index 
    if (!path[index].step) return path[index].previous  //if we reach the intial position
    return [wantedPosition].concat(getPath(path.filter(x => x.step <= path[index].step), path[index].previous))
}

//possibleMoves takes the knight's position and return the list of possible moves on the board
const possibleMoves = function (knightPosition) {
    // to find the possible knight's moves we have to test if the possible move is on the board 
    // we can devide the moves to right and left moves wich are also devided into two columns
    // after fixing the column we've to test the rows wich are between 1 and 8
    // the left and the right moves has the same code so we've create a function colled 'filterLegalMoves'
    //we assume that the knight position is simplfied to 
    const firstRightColumn = nextChar(knightPosition[0]);
    const secondRightColumn = nextChar(firstRightColumn); 
    const firstLeftColumn = previousChar(knightPosition[0]);
    const secondLeftColumn = previousChar(firstLeftColumn);
    let moves = [];
    //get the right moves and add it to moves
    moves = moves.concat(filterLegalMoves(firstRightColumn <= 'H', secondRightColumn <= 'H', firstRightColumn, secondRightColumn, parseInt(knightPosition[1])));
    //get the left moves and add it to moves
    moves = moves.concat(filterLegalMoves(firstLeftColumn >= 'A', secondLeftColumn >= 'A', firstLeftColumn, secondLeftColumn, parseInt(knightPosition[1])));
    return moves;
}

//filterLegalMoves used to return the possible moves 
// it can be used to return the right moves or the left moves

const filterLegalMoves = function (firstCond, secondCond, firstColumn, secondColumn, position) {
    const moves = [];
    if (firstCond) {
        if (position + 2 <= 8) {
            moves.push(firstColumn + (position + 2));
        }
        if (position - 2 >= 1) {
            moves.push(firstColumn + (position - 2));
        }
        if (secondCond) {
            if (position + 1 <= 8) {
                moves.push(secondColumn + (position + 1));
            }
            if (position-1 >= 1) {
                moves.push(secondColumn + (position - 1));
            }
        }
    }
    return moves;
}

module.exports = { verifyParam, shortestPath }