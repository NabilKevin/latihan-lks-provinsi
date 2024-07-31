class Sprite 
{
    constructor({position = {
        x: 0,
        y: 0
    }, width = 100, height = 100, offset = {
        x: 0,
        y: 0
    }, imageSrc}) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.offset = offset; 
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
    }
}

class BackgroundImage
{
    constructor(imageSrc) {
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        console.log(this.image.src);
        c.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    }

    update() {
        this.draw();
    }
}

class Flag extends Sprite {
    constructor({position = {
        x: 0,
        y: 0
    }, width = 100, height = 100, offset = {
        x: 0,
        y: 0
    }, imageSrc}) {
        super(position, width, height, offset, imageSrc);
        this.position = position;
        this.width = width;
        this.height = height;
        this.offset = offset; 
        this.image = new Image();
        this.image.src = imageSrc;
    }
}

class Ball extends Sprite
{
    constructor({position = {
        x: 0,
        y: 0
    }, width = 100, height = 100, offset = {
        x: 0,
        y: 0
    }, imageSrc}) {
        super({position, width, height, offset, imageSrc});
        this.position = position;
        this.width = width;
        this.height = height;
        this.offset = offset; 
        this.image = new Image();
        this.image.src = imageSrc;
        this.lastHeight = -10;
        this.velocity = {
            x: 0,
            y: 0
        }
    }
    update() {
        this.draw();
        this.offset.x = this.position.x + this.width;
        this.offset.y = this.position.y + this.height;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.velocity.x > 0) {
            this.velocity.x = Math.round((this.velocity.x - 0.05) * 100)/100
        }
        if(this.velocity.x < 0) {
            this.velocity.x = Math.round((this.velocity.x + 0.05) * 100)/100
        }
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 105) {
            this.velocity.y = 0;
            if(this.lastHeight !== 0) {
                if(this.lastHeight > 0) {
                    this.velocity.y -= this.lastHeight;
                } else if ( this.lastHeight < 0) {
                    this.velocity.y += this.lastHeight;
                }
                this.lastHeight = Math.ceil(this.lastHeight/2);
            }
        } else {
            this.velocity.y += gravity;
        }
    }
}

class Player extends Sprite 
{
    constructor({position = {
        x: 0,
        y: 0
    }, width = 100, height = 100, offset = {
        x: 0,
        y: 0
    }, imageSrc, team, rotate = 0}) {
        super({position, width, height, offset, imageSrc});
        this.position = position;
        this.width = width;
        this.height = height;
        this.offset = offset; 
        this.image = new Image();
        this.image.src = imageSrc;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.team = team;
        this.totalFrames = 17;
        this.frames = 0;
        this.lastKey = '';
        this.rotate = rotate;
        this.action = 'Idle';
        this.isJump = false;
    }   
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();

        this.offset.x = this.position.x + this.width - 55;
        this.offset.y = this.position.y + this.height - 26;
        
        if(this.rotate === 0) {
            if(this.offset.x + this.velocity.x < canvas.width/ 2 && this.position.x + this.velocity.x + 45 > 0) {
                this.position.x += this.velocity.x;
            } else {
                this.velocity.y = 0;
                this.action = 'Idle'
                this.totalFrames = 17;
            }
        } else {
            if(this.offset.x + this.velocity.x < canvas.width && this.position.x + this.velocity.x + 45 > canvas.width/2) {
                this.position.x += this.velocity.x;
            } else {
                this.velocity.y = 0;
                this.action = 'Idle'
                this.totalFrames = 17;
            }
        }
        this.position.y += this.velocity.y;

        if(this.offset.y + this.velocity.y >= canvas.height - 105) {
            this.velocity.y = 0;
            this.action = 'Idle'
            this.totalFrames = 17;
            this.isJump = false;
        } else {
            this.velocity.y += gravity;
        }
        
        this.image.src = `../Sprites/Characters/Character - ${this.team}/${this.action}/${this.action}_0${this.frames <= 9 ? '0' + this.frames : this.frames}.png`;
        this.frames = this.frames >= this.totalFrames ? 0 : this.frames + 1; 
    }

    move(keys, fKey, sKey) {
        this.velocity.x = 0;
        if(this.lastKey === fKey && keys[fKey].pressed) {
            this.velocity.x = -5;
        } if(this.lastKey === sKey && keys[sKey].pressed) {
            this.velocity.x = 5;
            this.frames = 0;
            this.action = 'Move Forward'
            this.totalFrames = 9;
        } 
    }
    collusion() {
        if(this.position.y + 26 <= ball.offset.y && this.offset.y >= ball.position.y) {
            if(
                this.position.x + 45 <= ball.offset.x &&
                this.offset.x >= ball.offset.x
            ) {
                ball.velocity.x = -5;
            }
            if(
                this.offset.x >= ball.position.x &&
                this.position.x + 45 <= ball.position.x
            ) {
                ball.velocity.x = 5;
            } 
        }
    }
    kick() {

    }
}