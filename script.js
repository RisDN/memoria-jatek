// random szam generalo
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const MAP = document.querySelector('#tiles')
function start() { 
    for(let i = 0; i < 25; i++) {
        let newElement = document.createElement('div')
        let randomInt = randInt(1, 99)
        newElement.innerHTML = `<input maxlength="2" data-value="${randomInt}" disabled type="text" value="${randomInt}"></input>`
        newElement.className = 'tile'
        newElement.id = i
        MAP.appendChild(newElement)
    }
}
start()

// Start gomb
const SCREEN = document.querySelector('#screen span')
document.querySelector('#controllers #start').addEventListener('click', () => {
    document.querySelector('#controllers #start').style.display = 'none'
    SCREEN.innerHTML = `3`
    setTimeout(()=> {
        SCREEN.innerHTML = `2`
        setTimeout(()=> {
            SCREEN.innerHTML = `1`
            setTimeout(()=> {
                showCells()
            }, 1000)
        }, 1000)
    }, 1000)

})

// Válaszok megnézése, hogy jó e
document.querySelector('#controllers #check').addEventListener('click', () => {
    let correct = 0
    document.querySelectorAll('input').forEach((elem) => {
        elem.disabled = true
        if(elem.value == elem.dataset.value) { 
            elem.style.backgroundColor = '#198754'
            correct += 1
         } else { 
            elem.style.backgroundColor = '#dc3545'
            elem.value = elem.dataset.value
        }
    })
    SCREEN.innerHTML = `Találataid: ${correct}/25`
    document.querySelector('#controllers #check').style.display = 'none'
})

document.querySelector('#controllers #reset').addEventListener('click', () => { window.location.reload() } )

// Cellák megjelenitese, majd eltuntetese
function showCells() {
    document.querySelectorAll('input').forEach((elem) => {
        elem.style.display = 'block'
    })
    countdown(6)
}

// Cellak eltuntetese, a valasz megadasra valo lehetoseg megadasa
function hideCells() { 
    document.querySelectorAll('input').forEach((elem) => {
        elem.value = null
        elem.disabled = false
    })
    document.querySelector('#controllers #check').style.display = 'inline-block'
}

// Vissza szamlalo 
function countdown(counter) {
    if (counter > 1) {
        counter--
        setTimeout(function() { countdown(counter) }, 1000)
        SCREEN.innerHTML = counter
    } else {
        SCREEN.innerHTML = `Írd be azokat, amelyikekre emlékszel.`
        document.querySelector('#controllers #start').style.display = 'none'
        hideCells()
    }
}
