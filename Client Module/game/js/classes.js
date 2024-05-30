class Sprite 
{
    constructor({position = {
        x: 0,
        y: 0
    }, width = 100, heigth = 100, offset = {
        x: 0,
        y: 0
    }, imageSrc}) {
        this.position = position;
        this.width = width;
        this.heigth = heigth;
        this.offset = offset; 
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.heigth);
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
    }, width = 100, heigth = 100, offset = {
        x: 0,
        y: 0
    }, imageSrc}) {
        super(position, width, heigth, offset, imageSrc);
        this.position = position;
        this.width = width;
        this.heigth = heigth;
        this.offset = offset; 
        this.image = new Image();
        this.image.src = imageSrc;
    }
}