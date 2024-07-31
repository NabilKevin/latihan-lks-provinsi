const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const player1 = localStorage.getItem('player1');
const team1 = localStorage.getItem('team1').split('|')[0];
const player2 = localStorage.getItem('player2');
const team2 = localStorage.getItem('team2').split('|')[0];


if(!team1 || !team2 || !player1 || !player2) {
    location.replace('/game')
}

canvas.width = 1000;
canvas.height = 600;

const gravity = .5;

const background = new BackgroundImage(`../Sprites/background${Math.random() >= 0.5 ? '2' : '1'}.jpg`);

const flags = [];
let x = 0;
let i = 0;
while(true) {
    flags.push(new Flag({
        position: {
            x: x,
            y: 380
        },
        width: 92,
        height: 60,
        imageSrc: `../Sprites/Flag/${i %2 === 0 ? team1 : team2}.png`
    }));

    x += 91;
    i++;
    if(x >= canvas.width + 91) {
        break;
    }
}

const ball = new Ball({
    position: {
        x: canvas.width/2 - 50,
        y: 0,
    },
    width: 50,
    height: 50,
    offset: {
        x: canvas.width/2,
        y: 50,
    },
    imageSrc: `../Sprites/Ball 0${Math.random() >= 0.5 ? '2' : '1'}.png`
});

const players1 = new Player({
    position: {
        x: 100,
        y: 100,
    },
    width: 160,
    height: 160,
    offset: {
        x:260,
        y: 260,
    },
    imageSrc: `../Sprites/Characters/Character - ${team1}/Idle/Idle_000.png`,
    team: team1
});

const players2 = new Player({
    position: {
        x: 700,
        y: 100,
    },
    width: 160,
    height: 160,
    offset: {
        x: 860,
        y: 260,
    },
    imageSrc: `../Sprites/Characters/Character - ${team2}/Idle/Idle_000.png`,
    team: team2,
    rotate: 180
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

const animate = () => {
    window.requestAnimationFrame(animate);
    background.update();
    flags.forEach(flag => {
        flag.update();
        flag.position.x -= 1;
        if(flag.position.x + flag.width < 0) {
            flag.position.x = canvas.width
        }
    })
    ball.update();
    players1.update();
    players2.update();

    players1.collusion();
    players2.collusion();

    players1.move(keys, 'a', 'd');
    players2.move(keys, 'ArrowLeft', 'ArrowRight');

    if(players1.velocity.y === 0 && players1.isJump) {
        players1.frames = 0;
        players1.totalFrames = 0;
        players1.action = 'Falling Down';
    }
    if(players2.velocity.y === 0 && players2.isJump) {
        players2.frames = 0;
        players2.totalFrames = 0;
        players2.action = 'Falling Down';
    }
}

animate();

window.addEventListener('keydown', e => {
    if(e.key === 'a' || e.key === 'd') {
        keys[e.key].pressed = true;
        players1.lastKey = e.key;
    }
    if(e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        keys[e.key].pressed = true;
        players2.lastKey = e.key;
    }
    if(e.key === 'w' && !players1.isJump) {
        players1.velocity.y = -15;
        players1.isJump = true;
        players1.frames = 0;
        players1.totalFrames = 0;
        players1.action = 'Jump';
    }
    if(e.key === 'ArrowUp' && !players2.isJump) {
        players2.velocity.y = -15;
        players2.isJump = true;
        players2.frames = 0;
        players2.totalFrames = 0;
        players2.action = 'Jump';
    }
})
window.addEventListener('keyup', e => {
    if(e.key === 'a' || e.key === 'd' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        keys[e.key].pressed = false;
    }
})