// port of Daniel Shiffman's Pong coding challenge
// by madacoo

const TOTAL = 200;

let activeEle = [];
let eliminatedEle = [];
let speedSlider;

let leftscore = 0;

function setup() {
    createCanvas(600, 400);
    speedSlider = createSlider(1,10,1);
    for (let i = 0; i < TOTAL; i++) {
        activeEle[i] = new PongElement(floor(random(150, 255)));
    }
}

function draw() {
    for (let n = 0; n < speedSlider.value(); n++) {
        background(0);

        for (let i = 0; i < activeEle.length; i++) {
            let didItHit = activeEle[i].puck.checkPaddleRight(activeEle[i].rightPaddle);
            if(didItHit) {
                activeEle[i].score++;
            }
            activeEle[i].rightPaddle.show();
            activeEle[i].rightPaddle.update();

            activeEle[i].puck.update();
            if (activeEle[i].puck.edges()) {
                activeEle[i].hasEnded = true;
            }
            activeEle[i].puck.show();

            activeEle[i].think();
        }

        eliminatedEle.push(...activeEle.filter(pongele => pongele.hasEnded));
        activeEle = activeEle.filter(pongele => !pongele.hasEnded);

        if (activeEle.length === 0) {

            //CREATE A NEW GENERATION
            nextGeneration();
        }
    }

}