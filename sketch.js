// port of Daniel Shiffman's Pong coding challenge

const TOTAL = 200;

let activeEle = [];
let eliminatedEle = [];
let speedSlider;

let leftscore = 0;

let loadBestBrain = true;

let bestBrainJSON = null;
let bestBrain = null;

let showBest = true;

function preload() {
    bestBrainJSON = loadJSON("BestPaddleGen27.json");
}

function setup() {
    console.log("loaded this");           
    createCanvas(600, 400);
    bestBrain = NeuralNetwork.deserialize(bestBrainJSON);
    speedSlider = createSlider(1,10,1);
    for (let i = 0; i < TOTAL; i++) {
        if(loadBestBrain == true) {
            activeEle[i] = new PongElement(floor(random(150, 255)), bestBrain); 
        }
        else {
            activeEle[i] = new PongElement(floor(random(150, 255)));
        }
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
            activeEle[i].rightPaddle.update();
            
            activeEle[i].puck.update();
            if (activeEle[i].puck.edges()) {
                activeEle[i].hasEnded = true;
            }
            
            activeEle[i].think();

            if(showBest == false) {
                activeEle[i].rightPaddle.show();
                activeEle[i].puck.show();
            }
            
        }

        if(showBest == true &&  activeEle.length > 0) {
            activeEle[0].rightPaddle.show();
            activeEle[0].puck.show();
        }

        eliminatedEle.push(...activeEle.filter(pongele => pongele.hasEnded));
        activeEle = activeEle.filter(pongele => !pongele.hasEnded);

        if (activeEle.length === 0) {

            //CREATE A NEW GENERATION
            nextGeneration();
        }
    }

}

function keyPressed() {
   
    if (keyCode === LEFT_ARROW) {
        console.log("pressed");
        showBest = !showBest;
    }
  }