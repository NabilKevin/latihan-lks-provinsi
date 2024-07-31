localStorage.clear();

const flags = ['Brazil', 'England', 'Germany', 'Italy', 'Japan', 'Netherlands', 'Portugal', 'Spain'];

for(let i = 0; i < 2; i++) {
    const eFlags = document.querySelector(`.player${i + 1} .flags`);
    flags.forEach(flag => {
        eFlags.innerHTML += `
        <div class="flag">
            <label for="${flag}|${i + 1}">
            <img draggable="false" src="../Sprites/Flag/${flag}.png" alt="">
                </label>
                <input type="radio" name="p${i + 1}flag" id="${flag}|${i + 1}" required>
        </div>
        `
    })
    document.getElementsByName(`p${i+1}flag`).forEach(flag => {
        flag.addEventListener('change', e => {
            localStorage.setItem(`team${i + 1}`, e.target.id)
        })
    })
}
document.getElementsByName(`balls`).forEach(flag => {
    flag.addEventListener('change', e => {
        localStorage.setItem(`ball`, e.target.id)
    })
})

let mode = 'Light';
const changeModeBtn = document.querySelector('.changeMode .button');
const changeModeCircle = document.querySelector('.changeMode .circle');
const changeModeText = document.querySelector('.changeMode span');
changeModeBtn.addEventListener('click', () => {
    if(mode === 'Light') {
        changeModeCircle.style.left = '27.5px';
        changeModeCircle.style.backgroundColor = '#2e2e3a';
        changeModeBtn.style.backgroundColor = '#4d4d60';
        mode = 'Dark';
    } else {
        changeModeCircle.style.left = '2.5px';
        changeModeCircle.style.backgroundColor = '#cccccc';
        changeModeBtn.style.backgroundColor = '#949494';
        mode = 'Light';
    }
    
    document.body.style.color = `var(--${mode.toLowerCase()}ModeColor)`;
    document.body.style.backgroundColor = `var(--${mode.toLowerCase()}ModeBg)`;
    changeModeText.textContent = `${mode} mode`;
    
});

const instructions = document.querySelector('.instructions');
document.querySelector('.instruction').addEventListener('click', () => {
    instructions.style.display = '';
});
document.querySelector('.xBtn').addEventListener('click', () => {
    instructions.style.display = 'none';
});





document.querySelector('.play').addEventListener('click', e => {
    e.preventDefault();
    const form = document.querySelector('.container form');
    const alert = document.querySelector('.alert');
    const alertC = document.querySelector('.alert .content');

    const usnP1 = document.querySelector('.usernamep1');
    const team1 = localStorage.getItem('team1');
    
    const usnP2 = document.querySelector('.usernamep2');
    const team2 = localStorage.getItem('team2');

    alertC.textContent = '';
    alert.style.top = '-60px'
    
    setTimeout(() => {
        form.style.paddingTop = '0px';
        alertC.style.display = 'none';
        if(!team1 || !team2 || usnP1.value === '' || usnP2.value === '') {
            if(usnP1.value === '' || usnP2.value === '') {
                alertC.textContent = 'Please enter username';
            } else {
                alertC.textContent = 'Choose your/enemy team';
            }
            form.style.paddingTop = '50px';
            alertC.style.display = 'flex';
            alert.style.top = '20px'
        } else {
            localStorage.setItem('player1', usnP1.value);
            localStorage.setItem('player2', usnP2.value);
            location.replace('./game.html');
        }
    }, 300)
    
});