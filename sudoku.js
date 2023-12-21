

// loader functions
document.addEventListener("DOMContentLoaded", function() {
   
    simulateContentLoading();
});

function simulateContentLoading() {

    setTimeout(function() {
        hideLoaderShowContent();
    }, 3000); 
}

function hideLoaderShowContent() {
    var loader = document.getElementById('loader');
    var content = document.querySelector('.content');

    if (loader && content) {
        loader.style.display = 'none'; 
        content.style.display = 'block'; 
    }
}

// sudoku js

var numSelected = null;
var tileSelected = null;

var errors = 0;

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

window.onload = function() {
    setGame();
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}



function selectTile() {
    if (numSelected) {
        if (this.innerText !== "") {
            return;
        }

        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] === numSelected.id) {
            this.innerText = numSelected.id;
            this.style.border = '1.5px solid green'; // Change the border color to green for correct placement
            setTimeout(() => {
                this.style.border = '1px solid black'; // Reset the border color after a delay
            }, 1000); // Change it back to the default after 1 second (1000ms)
        } else {
            // errors += 1;
            document.getElementById("errors").innerText ;
            this.style.border = '1.5px solid red'; // Change the border color to red for wrong placement
            setTimeout(() => {
                this.style.border = '1px solid black'; // Reset the border color after a delay
            }, 1000); // Change it back to the default after 1 second (1000ms)
        }
    }
}

// Add these variables at the top with other global variables
var countdownTime = 300; // 180 seconds (3 minutes)
var timerInterval;

window.onload = function() {
    setGame();
    startTimer();
}

function startTimer() {
    var countdownElement = document.getElementById("countdown");
    timerInterval = setInterval(function() {
        if (countdownTime > 0) {
            var minutes = Math.floor(countdownTime / 60);
            var seconds = countdownTime % 60;

            countdownElement.textContent = `${"0" + minutes + "m" }:${seconds < 10 ? '0' : ''}${seconds + "s "}`;
            countdownTime--;
        } else {
            clearInterval(timerInterval);
            disableGame();
        }
    }, 1000);
}

function disableGame() {
    // Disable further gameplay
    // For example, remove event listeners from the tiles
    var tiles = document.querySelectorAll('.tile');
    tiles.forEach(function(tile) {
        tile.removeEventListener("click", selectTile);
    });

    // Disable number selection
    var numbers = document.querySelectorAll('.number');
    numbers.forEach(function(number) {
        number.removeEventListener("click", selectNumber);
        number.classList.add('disabled');
    });

    // Show a message or perform any other action when the game ends due to timeout
    Swal.fire({
        title: 'Time\'s up!',
        text: 'You ran out of time. Game over!',
        icon: 'info',
        confirmButtonText: 'OK'
    });
}












