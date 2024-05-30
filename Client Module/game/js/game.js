const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 600;

const background = new BackgroundImage("/Sprites/background1.jpg");

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
        heigth: 60,
        imageSrc: `/Sprites/Flag/${i %2 === 0 ? 'Brazil' : 'Netherlands'}.png`
    }));

    x += 91;
    i++;
    if(x >= canvas.width + 91) {
        break;
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
}

animate();