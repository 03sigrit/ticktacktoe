const gameboardContainer = document.getElementById('gameboardContainer');
const cellElements = document.querySelectorAll('[data-cell]');
const cellNumbers = document.querySelectorAll('[data-position]');
const winningMessage = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageText = document.querySelector('[data-winning-message-text]');
let circleTurn;
const xClass = 'x';
const oClass = 'o';

const handleOver = (e) => {
    const cell = e.target;
    cell.style.fontSize = 'xx-large';
    if(circleTurn) {
        if(cell.getAttribute('data-clicked') != 'true') {
            cell.innerHTML = oClass;
            cell.style.color = 'grey';
        }   
    } else {
        if(cell.getAttribute('data-clicked') != 'true') {
            cell.innerHTML = xClass;
            cell.style.color = 'grey';
        } 
    }
}

const handleOut = (e) => {
    const cell = e.target;
    cell.style.fontSize = 'xx-large';
        if(cell.getAttribute('data-clicked') != 'true') {
            cell.innerHTML = '';
        }   
}

const handleClick = (e) => {
    const cell = e.target;
    cell.style.fontSize = 'xx-large';
    cell.style.color= 'black';
    cell.setAttribute('data-clicked','true');
    const currentClass = circleTurn ? oClass : xClass;
    placeMark(cell, currentClass);

    if(circleTurn) {
        cell.innerHTML = oClass;   
    } else {
        cell.innerHTML = xClass;
    }

    if(checkWin(currentClass)) {
        endGame(false);
    } else if(isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

const swapTurns = () => {
    circleTurn = !circleTurn;
}

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
}

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const startGame = () => {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);
        cell.setAttribute('data-clicked','false');
        cell.removeEventListener('mouseover', handleOver);
        cell.removeEventListener('mouseout', handleOut);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('mouseover', handleOver);
        cell.addEventListener('mouseout', handleOut);
        cell.addEventListener('click', handleClick, { once: true } );
    })
    winningMessage.style.display = 'none';
}

restartButton.addEventListener('click', startGame);

const endGame = (isDraw) => {
    if(isDraw) {
        winningMessageText.innerHTML = 'Draw!';
    } else {
        winningMessageText.innerHTML = `${circleTurn ? "0's" : "X's"} Wins!`;
    }
    winningMessage.style.display = 'block';
}

const isDraw = () => {
    //... paned ette celleElementidele kuna muidu ei saaks kutsuda valja every methodi. aga punktid paned ette siis see on array ja ss saab.
    return [...cellElements].every(cell => {
        //checks if every cell has a class ehk siis iga cell oleks taidetud
        return cell.classList.contains(xClass) || cell.classList.contains(oClass);
    })
}

const checkWin = (currentClass) => {
    //goes thrue all the combinations
    return winningCombinations.some(combination => {
        //checks one combination every index
        return combination.every(index => {
            //if all the indexses have the same classlist as currentclass
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

startGame();