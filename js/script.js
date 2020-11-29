
$(document).ready(function () {
    const totalRows = 3;
    const totalCols = 3;
    const totalSquares = totalRows * totalCols;

    createBoard();

    function createBoard() {
        // How big can each square be?
        // Add 2 to allow for one square's worth of padding on either side
        var squareWidth = Math.round(window.innerWidth / (totalCols + 2));
        console.log("width: " + squareWidth);
        var squareHeight = Math.round(window.innerHeight / (totalRows + 2));
        console.log("height: " + squareHeight);

        // Choose the smaller of the two dimensions so both height and width
        // will fit in the viewport and still be a square
        var bestDimension = Math.min(squareWidth, squareHeight);
        console.log("Squares should be: " + bestDimension);


        // store the board div in a variable
        var gameBoardDiv = $("#board");

        // loop to print rows of squares
        for (var rowNum = 1; rowNum <= totalRows; rowNum++) {
            // Create a new row
            var rowOfSquares = $("<div>");
            // give the row the class of "row" (for Bootstrap)
            rowOfSquares.addClass("row justify-content-center");
            // add the row to the gameboard
            gameBoardDiv.append(rowOfSquares);

            // loop to print the squares in each row
            for (var colNum = 1; colNum <= totalCols; colNum++) {
                // create an empty element to be a square on the board
                var square = $("<span>");
                // give the square its row number as data
                square.data("row", rowNum);
                // give the square its column number as data
                square.data("col", colNum);
                // set the width and height of the square
                square.width(bestDimension);
                square.height(bestDimension);
                // give the square the class of "square" to make it inline-block
                square.addClass("square");
                // display the square's row and column info
                // square.html(`Row ${rowNum}<br>Col ${colNum}`);
                // make the square run a function when clicked

                // add the square to the current row
                rowOfSquares.append(square);
            }
        }
    }
});