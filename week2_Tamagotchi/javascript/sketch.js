let canvas;
let button;
let buttonTouch;

let food = [];
let foodLimit = 2;

let feelLike=[];
let feelLikeLimit = 5;
let nowLike = 0;
let fullLove = false;
let feeding = false;
let loveSize;
let blinkCount = 0;

let hungry = 0;
let full = 1;
let tamaState = hungry;

let tamaX;
let tamaY;
let tamaDiam;

function setup() {

  canvas = createCanvas(600, 600);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element

  tamaX = width/2;
  tamaY = height/2;
  tamaDiam = width/6;
  loveSize = width/3;

  addGUI();
}

function draw() {
  background(200,200,250);
  
  //Drawing
  noStroke();
  if(!fullLove)
  {
    if(tamaState == hungry){
      fill(255,255-nowLike,255-nowLike);
      if(tamaDiam > width/4){
        tamaState = full;
      }
    }else if(tamaState == full){
      fill(0,255,0);
      if(tamaDiam > width/6){
        if(frameCount % 2 == 0) tamaDiam--; // reduce every second frame
      }else{
        tamaState = hungry;
      }
    }
  
  //以下是画脸和嘴
    circle(tamaX,tamaY,tamaDiam);
    fill(0);
    let mouthOffset = tamaDiam/2;
    rect(tamaX-mouthOffset/2+3,tamaY,mouthOffset-3,3);
  //以上是画脸和嘴
  }

  updateFood();//update and draw food
  updateLove();

  if(food.length > 0 && tamaState == hungry){
    eatFood();
  }
  
  //
  if(feelLike.length>0&&!fullLove)
  {
    showLove();
  }


  //以下是当好感度满了以后，闪烁操作
  if(fullLove)
  {
    fill(255,0,0);
    drawHeart(tamaX,tamaY,loveSize);
    
    if(frameCount%30==0)
    {
      blinkCount++;
      if(loveSize==width/3)
      {
        loveSize = tamaDiam;
      }
      else
      {
        loveSize=width/3;
      }
    }
    if(blinkCount==4)
    {
      fullLove = false;
      blinkCount = 0;
    }
  }
  //以上是当好感度满了以后，闪烁操作

  //这里是打印字体，打印好感度
  fill(255,255-nowLike,255-nowLike);
  textSize(32);
  let show_string = `Happiness：${(Math.ceil(nowLike/255 * 100))}%`;
  text(show_string, 10, 30);
  
  if(food.length <= foodLimit-1){
    button.html("FEED");
    button.removeClass("inactive");
  }

  if(feelLike.length <= feelLikeLimit-1){
    buttonTouch.html("TOUCH");
    buttonTouch.removeClass("inactive");
  }

}

function updateFood(){
  for(let i = food.length-1; i >= 0 ; i--){
    fill(100);
    circle(food[i].x,food[i].y,food[i].d);
    food[i].y -= 1;
    if(food[i].y < 0){
      food.splice(i,1);//remove one from array at index i
    }
  }
}

function updateLove(){
  for(let i = feelLike.length-1; i >= 0 ; i--){
    fill(255,255-3*feelLike[i].d,255-3*feelLike[i].d);
    drawHeart(feelLike[i].x,feelLike[i].y,feelLike[i].d);
    // circle(feelLike[i].x,feelLike[i].y,feelLike[i].d);
    feelLike[i].y -= 1;
    if(feelLike[i].y < 0){
      feelLike.splice(i,1);//remove one from array at index i
    }
  }
}

//This is a dumb creature who only eats the last bit of food added
//How could you update this function so that you use a similar tactic as above in updateFood
//loop backward through the food array, try:
//eat all the food
//OR eat the biggest piece of food
function eatFood(){

  //Eats all the food
  for(let i = food.length-1; i >= 0 ; i--){
    let distanceY =  tamaY - food[i].y;

    if(food[i].y > tamaX){
      fill(0);
      circle(tamaX,tamaY,tamaDiam/2);
      feeding = true;
    }

    if(abs(distanceY) < 10){
      tamaDiam += food[food.length-1].d;
      food.splice(i,1);
      feeding = false;
    }
  }

}




function showLove(){
  for(let i = feelLike.length-1; i >= 0 ; i--){
    let distanceY =  tamaY - feelLike[i].y;

    // if(feelLike[i].y > tamaX&&!feeding){
    //   fill(255,255-nowLike,255-nowLike);
    //   circle(tamaX,tamaY,tamaDiam/2);
    // }

    if(abs(distanceY) < 10){
      //tamaDiam += food[food.length-1].d;
      nowLike+=feelLike[i].d;
      if(nowLike>=254)
      {
        nowLike=0;
        fullLove=true;
      }

      feelLike.splice(i,1);
    }
  }

}



function addGUI()
{

  //add a button
  button = createButton("FEED");

  button.addClass("button");

  //Add the play button to the parent gui HTML element
  button.parent("gui-container");
  
  //Adding a mouse pressed event listener to the button 
  button.mousePressed(handleButtonPress); 

  buttonTouch = createButton("Touch");
  buttonTouch.addClass("button");
  buttonTouch.parent("gui-container");
  buttonTouch.mousePressed(handleButtonTouchPress); 


}

//按feed按键
function handleButtonPress()
{
    
    if(food.length <= foodLimit-1){
      food.push({
          x:width/2,
          y:height,
          d:random(10,40)
        });
    }
    
    if(food.length > foodLimit-1){
      button.html("FEEDING");
      button.addClass("inactive");
    }
  
}

//按touch按键
function handleButtonTouchPress()
{
  if(feelLike.length <= feelLikeLimit-1){
    feelLike.push({
        x:width/2+random(-40,40),
        y:height,
        d:random(10,40)
      });
  }
  
  if(feelLike.length > feelLikeLimit-1){
    buttonTouch.html("Showing love");
    buttonTouch.addClass("inactive");
  }
}




function drawHeart(posX,posY,posD)
{
  posD=posD*2/3;//缩小一点
  posY=posY-posD/3;
  triangle(posX-posD, posY, posX+posD, posY, posX,posY+posD*7/6);
  arc(posX-posD*5/12, posY, posD*7/6, posD*7/6, PI,0);
  arc(posX+posD*5/12, posY, posD*7/6, posD*7/6, PI,0);

}

