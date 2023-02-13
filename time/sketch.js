let i;
let num=60;
let N=140,sec=0,min=0,hour=0;
function setup() {
  createCanvas(400, 400);
  
  x=width/2;
  y=height/2;
}

function draw(){
  background(0);
  noFill();
    sec++;
    if(sec==N/2){
    min++;
    sec=0;
    if(min==21){
      min=0;
    }
    }
    for(let i=0;i<min;i++){
     noStroke()
     fill((sin(i)+2)*50,50,150,150);
     ellipse((cos(i)+1)/2*200+100,(sin(i)+1)/2*200+100,90,90);
    }
  
    for(let i=0;i<num;i=i+1){ 
    let szx=width-(width/num*i);  
    let szy=height-(height/num*i);
    
      stroke(random(0,255),random(0,255),250,200);
      noFill();
      arc( x, y, szx, szy,sin(i)-3/4*PI,sec/N*4*PI-1/2*PI);
   }
}  
    
    
