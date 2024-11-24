let linex = 0;
let lineWidth = 70
let sw = 10;
let ballx, bally;
let speed = 5;
let ballxdir = 1;
let ballydir = 1;
let ballWidth = 20;
let score = 0;
let bonusx,bonusy;
let bonusspeed = 3;
let bonusON = false;
let bonusWidth = 30;
let bonusMake = true;
let button;

function setup() {
  createCanvas(300, 400);
  stroke(0,255,100);
  strokeWeight(sw);
  noCursor();
  bally = ballWidth/2 +1;
  ballx = random(width);
  textSize(20);
  bonusx = random(width-bonusWidth);
  bonusy = 0;
  
}
function draw() {
  background(0);

  line(linex-lineWidth/2,350,linex+lineWidth/2,350);
  
  if(mouseX>width-sw/2-lineWidth/2) {
    linex=width-sw/2-lineWidth/2
  } else if(mouseX<sw/2+lineWidth/2) {
    linex=sw/2+lineWidth/2
  } else {
    linex = mouseX;
  }
  push()
  stroke(255,100,255)
  point(ballx,bally); 
  pop()
  
  ballx +=speed*ballxdir;
  bally +=speed*ballydir;
   
  //walls bounce
  if (ballx>=width-ballWidth/2 || ballx<=ballWidth/2){
    ballxdir *= -1;
  }
  
  //celling bounce
  if (bally<=ballWidth/2){
    ballydir *= -1;
  }
  
  //paddle bounce with speed taken into account 
  if (ballx>linex-lineWidth/2-sw/2 && ballx<linex+lineWidth/2+sw/2 && bally>=350-(speed*ballydir)/2 && bally< 350+(speed*ballydir)/2){
    ballydir *= -1
    score +=1
    bonusON= false;
  }
  
  push()
  strokeWeight(0)
  fill(255,255,255)
  text('score: ' + score,10,20);
  pop()
  
  //score zero
  if (bally >= height){
    score = 0
    speed = 5
    bally = ballWidth/2 + 1;
    ballx = random(width-ballWidth)+ballWidth/2;
    bonusx = random(width-bonusWidth);
    bonusy = 0;
    bonusON = false;
    lineWidth = 70;
  }
  
  //Add on
  //Every 5 points the player can catch a bonus, which makes the paddle bigger. When paddle fills the canvas with its length, game won screen appears.
  
  //monus condition - making the bonus ball
  if (score != 0 && score % 5==0){
    bonusON = true;
  }
  //second bonus condition - enabling second condition to happen - making sure that if a bonus is caught, but score is still the same multiplication of 5, no next bonus will appear (we only want one bonus per specific score)
  if (score % 5 ==3){
    bonusMake = true;
  }
  
  //bonus dissapear
  if (bonusy-100>height){
    bonusON = false;
    bonusx = random(width-bonusWidth);
    bonusy = 0;
  }
  
  //bonus caught
  if (bonusx>linex-lineWidth/2-sw/2 && bonusx<linex+lineWidth/2+sw/2 && bonusy>=350-bonusspeed/2 && bonusy< 350+bonusspeed/2){
    lineWidth += 40
    bonusON = false;
    bonusMake = false; //without bonusMake, if we manage to catch the bonus but score hasn't yet change a second bonus ball appears, we don't want that to happen
  }
  
  //If the score is right nad bonus is enabled to happen
  if (bonusON && bonusMake){
    push()
    strokeWeight(30)
    stroke(255,255,0);
    point(bonusx+bonusWidth/2,bonusy);
    pop()
  } else {
    bonusy = 0;
  }
  bonusy += bonusspeed;
  
  //Paddle fills the canvas = game won screen appears
  if (lineWidth >= width){
    fill(255,255,255)
    strokeWeight(0)
    textSize(20);
    text('YOU WON!',105,200);
    textSize(20);
    text(":]",145,230);
    button = createButton('Play again?'); //adding restart button
    button.position(215, 0);
    button.mousePressed(restart);
    bonusy = -20
    bally = -20 
  } 
  
}

//restart button
function restart() {
  lineWidth = 70;
  score = 0;
  setup();
  draw();
}

