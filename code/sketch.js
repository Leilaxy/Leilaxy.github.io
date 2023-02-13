let posX, posY;
let amt;
var num =100;
let allowDist = 20;//可重叠距离
//声明数组保存脸的信息
var POSX=new Array(num)
var POSY=new Array(num)
var Radius=new Array(num)
var Angles=new Array(num)
var RN=new Array(num)
var FC=new Array(num)
var EC=new Array(num)
var MC=new Array(num)

  let Poss=[];
let p1 = { x: 0, y: 0 };
let count=0;
function setup() {
  createCanvas(1000, 1000);
  count =0;
   noLoop();
  for(let i =1;i<num;i++)
    {
      Radius[i]=30;
      Angles[i]=0;
      RN[i]=0.5;
      FC[i]=color('hsl(160, 100%, 50%)');
      EC[i]=color(255, 204, 0);
      MC[i]=color(255, 255, 255);
      
    }

}
// var rn = 0.3;
    var t = 0;
function draw() {
  background(255);
  stroke(51);
  let nPosX = posX + random(-amt,amt);//新一个的位置x
  let nPosY = posY + random(-amt,amt);//新一个的位置y

  let nRadius=random(30,50);//新一个的半径
  let nAngles=random(0,2*PI);//新一个的旋转角度
  let nRN = random(0,3);//新一个边缘扭曲度
  let nFC =color(250, random(135,200), random(135,200));//新一个的脸颜色
  let nEC=color(random(135,200), random(135,200), 235);//新一个的眼睛颜色
  let nMC=color(255, 100, random(135,150));//新一个的嘴巴颜色
  if(isInCanvas(nPosX,nPosY))
    {
      posX = nPosX;
      posY = nPosY; 
    }

  if(count<num&&frameCount%2==0)
  {   
     //保存当前的到数组里
      let giveUp =false;
      for( let i=1;i<count;i++)
        {
          if(isCollision(POSX[i],POSY[i],Radius[i],posX,posY,nRadius))
            {
              giveUp=true;
              break;
            }
        }
    if(!giveUp)
      {
      POSX[count]=posX;
      POSY[count]=posY;
      Radius[count]=nRadius;
      Angles[count]=nAngles;
      RN[count]=nRN;
      FC[count]=nFC;
      EC[count]=nEC;
      MC[count]=nMC;
      count++;  
      }
  }
   console.log(count);
    for( let i=1;i<count;i++)
    {       
      creat_face(POSX[i],POSY[i],Radius[i],Angles[i],RN[i],FC[i],EC[i],MC[i]);
    }
  t+=0.01;//动态效果
}



//参数意思：x,y 是坐标，radius是脸的半径，angle是脸的旋转度数,rn是脸边缘扭曲程度，越大越扭曲，face_color是脸的颜色，eye_color是眼睛的颜色，mouth_color是嘴巴颜色
function creat_face(x,y,radius,angle,rn,face_color,eye_color,
mouth_color)
{
  //下面三行是平移画布
  push();
  translate(x, y);
  rotate(angle);
  
  //beginShape()到endShape()是画脸
  beginShape();
  for (var i = 0; i < TWO_PI; i += radians(1)) 
  {
    var r = radius + map(noise(rn + rn * cos(i), rn + rn * sin(i), t), 0, 1, -radius/3, radius/3);
    var now_x = r * cos(i);
    var now_y = r * sin(i);
    vertex(now_x, now_y);
    noStroke();
    fill(face_color);
  }
  endShape();
  
  //下面三行是画眼睛
  fill(eye_color);
  ellipse(-radius/3, -radius/3, radius/3);//x,y,r
  ellipse(radius/3, -radius/3, radius/3);
  //下面两行是画嘴巴
  fill(mouth_color);
  arc(0, radius/4, radius/2,radius/2,0,-PI)
  
  pop();
  
}
function mousePressed(){
  posX = mouseX;
  posY = mouseY;
  // amt = random(4,32);
  amt = 30;
  loop();
}

function isCollision(x1,y1,r1,x2,y2,r2)
{
  let dist=sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
  
  if(dist<r1+r2-allowDist)
    {
      return true;
    }
  return false;
}
function isInCanvas(x,y)
{
  if(x<width&&x>0&&y<height&&y>0)
    {
      return true;
    }
  return false;
}

function keyPressed(){
  save("img.png");  
}