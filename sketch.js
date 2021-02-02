//Global Variables
var monkey, jungle;
var monkeyAnimation, stoneImage, bananaImage, jungleImage;
var score = 0;

var edges;



function preload(){
  monkeyAnimation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png",
  "Monkey_05.png","Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  jungleImage = loadImage("jungle.jpg");
  stoneImage = loadImage("stone.png");
  bananaImage = loadImage("banana.png"); 
}


function setup() {
  createCanvas(displayWidth,displayHeight);

  //jungle = createSprite(displayWidth/2,displayHeight/2);
  //jungle.addImage(jungleImage);
  //jungle.velocityX = 3;


  monkey = createSprite(80,displayHeight-20);
  monkey.addAnimation("monkey", monkeyAnimation);
  monkey.scale = 0.2;
  monkey.velocityX = 3;
  
  invGround = createSprite(displayWidth/2,displayHeight-10,displayWidth,20);
  invGround.visible = false;
  invGround.velocityX = 3;
  

  bananaGroup = new Group();
  stoneGroup = new Group();

  //edges = createEdgeSprites();
}


function draw(){
 background(255); 

/*
 if (invGround.x<0){
   invGround.x = displayWidth/2;;
 }
 */
 

 camera.position.x = monkey.x;
 camera.position.y = displayHeight/2;

 if (keyDown("space")){
   monkey.velocityY = -10;
 }
 monkey.velocityY = monkey.velocityY + 0.8;
 
 spawnBananas();
 spawnStones();

 if (bananaGroup.isTouching(monkey)){
   bananaGroup.destroyEach();
   score = score+2;
 }

 if (stoneGroup.isTouching(monkey)){
   monkey.scale = 0.1;
 }

 switch (score){
   case 10: monkey.scale = 0.15;
   break;
   case 20: monkey.scale = 0.16;
   break;
   case 30: monkey.scale = 0.17;
   break;
   case 40: monkey.scale = 0.18;
   break;
   case 50: monkey.scale = 0.2;
   break;
   default: break;
 }
 

 monkey.collide(invGround);
 drawSprites();
/*
 textSize(20);
 fill(255);
 text("Score: "+score,displayWidth-100,100);
 */
}


function spawnBananas(){
  if (camera.position.x%100===0){
    var banana = createSprite(camera.position.x+displayWidth/2,displayHeight/2);
    banana.addImage(bananaImage);
    //banana.velocityX = -4;
    banana.scale = 0.07;
    banana.y = Math.round(random(displayHeight/2-100,displayHeight/2+100));
    banana.lifetime = displayWidth;
    bananaGroup.add(banana);
  }
}

function spawnStones(){
  if (camera.position.x%200==0){
    var stone = createSprite(camera.position.x+displayWidth/2+100,displayHeight-60);
    stone.addImage(stoneImage);
    //stone.velocityX = -4;
    stone.scale = 0.2;
    stone.lifetime = displayWidth;
    stoneGroup.add(stone);
  }
}
