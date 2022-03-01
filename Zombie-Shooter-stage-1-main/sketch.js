var bullets = 50
var gameState="fight"
var score = 0
var life = 3

function preload(){

  backgroundImg=loadImage("assets/bg.jpeg")
  explosionSound=loadSound("assets/explosion.mp3")
  heart_1Img=loadImage("assets/heart_1.png")
  heart_2Img=loadImage("assets/heart_2.png")
  heart_3Img=loadImage("assets/heart_3.png")
 looseSound=loadSound("assets/lose.mp3")
shooter_1Img=loadImage("assets/shooter_1.png")
shooter_2Img=loadImage("assets/shooter_2.png")
shooter_3Img=loadImage("assets/shooter_3.png")
winSound=loadSound("assets/win.mp3")
zombieImg=loadImage("assets/zombie.png")
bulletImg=loadImage("assets/bulletImg.png")

}

function setup() {

createCanvas(windowWidth , windowHeight)
edges= createEdgeSprites()
bg=createSprite(displayWidth/2 -20, displayHeight/2 +120,20,20)
bg.addImage(backgroundImg)
bg.scale=1.2

player=createSprite(displayWidth-1150 , displayHeight-300 , 50 ,50)
player.addImage(shooter_2Img)
player.scale=0.4

heart_1=createSprite(displayWidth-150 , 40 ,20 , 20)
heart_1.visible=false
heart_1.addImage("heart_1",heart_1Img)
heart_1.scale=0.4

heart_2=createSprite(displayWidth-100 , 40 ,20 , 20)
heart_2.visible=false
heart_2.addImage("heart_2",heart_2Img)
heart_2.scale=0.4

heart_3=createSprite(displayWidth-150 , 40 ,20 , 20)
heart_3.visible=true
heart_3.addImage("heart_3",heart_3Img)
heart_3.scale=0.4

zombieGroup=new Group()
bulletGroup=new Group()
}


function draw () {
  background(0)

if(player.isTouching(edges)){
  player.bounceOff(edges)
}

if(gameState==="fight"){

  if (life===3){
    heart_3.visible=true
    heart_2.visible=false
    heart_1.visible=false
  }

  if(life===2){
    heart_3.visible=false
    heart_2.visible=true
    heart_1.visible=false
  }
  if(life===1){
    heart_3.visible=false
    heart_2.visible=false
    heart_1.visible=true
  }

  if (life===0){
gameState="lost"
heart_1.visible=false
  }

  if (score===100){
    gameState="won"
    winSound.play()
  }
if (keyDown("UP_ARROW")){
player.y=player.y-30
}

if (keyDown("DOWN_ARROW")){
  player.y=player.y+30
  }

  if(keyWentDown("space")){
    bullet=createSprite(displayWidth-1150,player.y-30,20,10)
    bullet.addImage("bullet",bulletImg)
    bullet.scale=0.05
    bullet.velocityX=20
    bulletGroup.add(bullet)
    player.depth=bullet.depth
    player.depth=player.depth+2
    bullets=bullets-1
player.addImage(shooter_3Img)
explosionSound.play()
  }

  else if(keyWentUp("space")){
player.addImage(shooter_2Img)
  }
  
if (bullets===0){
  gameState="bullet"
  looseSound.play()
}

if (zombieGroup.isTouching(bulletGroup)){
  for(var i=0; i<zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy()
      bulletGroup.destroyEach()
      explosionSound.play()
      score=score+2
    }
  }
}
if (zombieGroup.isTouching(player)){
  looseSound.play()
  for(var i=0; i<zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy()
      life=life-1
    }
  }
}
  enemy()
}
drawSprites()

textSize(20)
fill ("white")
text("bullets= "+bullets,displayWidth-210,displayHeight/2-250)
text("score= "+score,displayWidth-200,displayHeight/2-220)
text("lives= "+life,displayWidth-200,displayHeight/2-280)

if (gameState==="lost"){
textSize(100)
fill ("red")
text("You Lost", 400 , 400)
zombieGroup.destroyEach()
player.destroy()
}

else if (gameState==="won") {
  textSize(100)
  fill ("yellow")
  text("You Won", 400 , 400)
  zombieGroup.destroyEach()
  player.destroy()
}

else if(gameState==="bullet"){
  textSize(50)
  fill ("blue")
  text("Sorry , You Ran Out of Bullets", 470 , 410)
  zombieGroup.destroyEach()
  player.destroy()
  bulletGroup.destroyEach()
}
}

function enemy(){
if (frameCount%50===0) {
zombie=createSprite(random(800,1500),random(100,500),40,40)
zombie.addImage(zombieImg)
zombie.scale=0.15
zombie.velocityX=random(-4,-2)
zombie.velocityY=random(-5,3)

//zombie.debug=true
zombie.setCollider("rectangle",0,0,400,400)
zombie.lifetime=400
zombieGroup.add(zombie)
}
}