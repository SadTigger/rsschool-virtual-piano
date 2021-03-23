const WHITE_KEY_CODES = ['KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL']
const BLACK_KEY_CODES = ['KeyR', 'KeyT', 'KeyU', 'KeyI', 'KeyO']

const PIANO = document.getElementById('piano')
const keys = document.querySelectorAll('.piano-key[data-letter]')
const whiteKeys = document.querySelectorAll('.piano-key.white[data-letter]')
const blackKeys = document.querySelectorAll('.piano-key.sharp[data-letter]')

const btnNotes = document.querySelector('.btn-notes')
const btnLetters = document.querySelector('.btn-letters')

/* notes/letter switcher */
function isBtnActive(btn) {
    return btn.classList.contains('btn-active')
}

btnNotes.addEventListener('click', () => {
    if (isBtnActive(btnLetters)) {
        btnLetters.classList.remove('btn-active')
        btnNotes.classList.add('btn-active')
        keys.forEach(key => {
            if (key.classList.contains("piano-key-letter")) key.classList.remove("piano-key-letter")
        })
    }
})

btnLetters.addEventListener('click', () => {
    if (isBtnActive(btnNotes)) {
        btnNotes.classList.remove('btn-active')
        btnLetters.classList.add('btn-active')
        keys.forEach(key => {
            if (!key.classList.contains("piano-key-letter")) key.classList.add("piano-key-letter")
        })
    }
})
/* notes/letter switcher */

/* hands magic ob piano keys*/

function startSound(event) {
    console.log(event.target)
    playNote(event.target)
    event.target.classList.add('piano-key-active')
}

function stopSound(event) {
    event.target.classList.remove('piano-key-active')
}

function startCorrespondentOver(event) {
    event.target.classList.add('piano-key-active')
    playNote(event.target)
    keys.forEach(key => {
        key.addEventListener('mouseover', startSound)
        key.addEventListener('mouseout', stopSound)
    })
}

function stopCorrespondentOver() {
    keys.forEach(key => {
        key.classList.remove('piano-key-active')
        key.removeEventListener('mouseover', startSound)
        key.removeEventListener('mouseout', stopSound)
    })
}

PIANO.addEventListener('mousedown', startCorrespondentOver)
PIANO.addEventListener('mouseup', stopCorrespondentOver)

/* hands magic ob piano keys*/

/* keyboard actions */
document.addEventListener('keydown', (event) => {
    if (event.repeat) return

    const key = event.code
    const whiteKeyIndex = WHITE_KEY_CODES.indexOf(key)
    const blackKeyIndex = BLACK_KEY_CODES.indexOf(key)

    if (whiteKeyIndex > -1) {
        playNote(whiteKeys[whiteKeyIndex])
        whiteKeys[whiteKeyIndex].classList.add('piano-key-active')
        whiteKeys[whiteKeyIndex].classList.add("piano-key-active-pseudo");

    }
    if (blackKeyIndex > -1) {
        playNote(blackKeys[blackKeyIndex])
        blackKeys[blackKeyIndex].classList.add('piano-key-active')
        blackKeys[blackKeyIndex].classList.add("piano-key-active-pseudo")
    }
})

document.addEventListener('keyup', (event) => {
    const key = event.code
    const whiteKeyIndex = WHITE_KEY_CODES.indexOf(key)
    const blackKeyIndex = BLACK_KEY_CODES.indexOf(key)

    if (whiteKeyIndex > -1) {
        if (whiteKeys[whiteKeyIndex].classList.contains('piano-key-active')) {
            whiteKeys[whiteKeyIndex].classList.remove('piano-key-active')
            whiteKeys[whiteKeyIndex].classList.remove("piano-key-active-pseudo")
        }
    }
    if (blackKeyIndex > -1) {
        if (blackKeys[blackKeyIndex].classList.contains('piano-key-active')) {
            blackKeys[blackKeyIndex].classList.remove('piano-key-active')
            blackKeys[blackKeyIndex].classList.remove("piano-key-active-pseudo");
        }
    }
})
/* keyboard actions */


/* playNote() */
function playNote(key) {
    const noteAudio = document.getElementById(key.dataset.note)
    if (!noteAudio) return
    noteAudio.currentTime = 0
    noteAudio.play()
}
/* playNote() */

/* fullscreen */
document.querySelector('.fullscreen').addEventListener('click', toggleScreen);

function toggleScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
    } else {
        if (document.fullscreenEnabled) {
            document.exitFullscreen()
        }
    }
}
/* fullscreen */
