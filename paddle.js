class Paddle {
    constructor(isLeft, alpha) {
        this.y = height/2;
        this.w = 20;
        this.h = 100;
        this.ychange = 0;

        this.alpha = alpha;
        
        if (isLeft) {
            this.x = this.w;
        } else {
            this.x = width - this.w;
        }
        
        
    }
    
    update() {
        this.y += this.ychange;
        this.y = constrain(this.y, this.h/2, height-this.h/2);
    }
    
    move(steps) {
        this.ychange = steps;
    }
    
    show() {
        fill(255, 255, 255, this.alpha);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
    }
}
