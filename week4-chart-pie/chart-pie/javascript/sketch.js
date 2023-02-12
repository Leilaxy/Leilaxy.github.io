//no animation / interaction chart
//if you want to use animation or create a loading state look at the cat fact example from last week 
// use a boolean to control when your data is loaded


let breakfast;

function setup() {
  createCanvas(500, 500);

  //no animation / interaction chart
  // noLoop();

  fetch("./json/breakfast.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    breakfast = data.breakfast;

    //using no Loop? you can just call your function once the data is loaded
    // drawChart();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  background(200);
  drawChart();
}

function drawChart(){

  let total = 0; 
  for (let i= 0 ; i<breakfast.length; i++) {
    total += breakfast[i].amount;
  }//计算总amount

  let centreX = width/2;
  let centreY = height/2; 
  let diam = 300;//直径
  let angleStart = TWO_PI*0.75; //开始为竖直状态



  for (let i=0; i<breakfast.length; i++) {

    let item = breakfast[i];

    let itemFraction = item.amount/total;//比例
    let itemAngle = itemFraction * TWO_PI; 
    let angleEnd = angleStart + itemAngle;

    let nowDiam=diam+itemFraction*diam;
    let dist = sqrt((mouseX-centreX)*(mouseX-centreX)+(mouseY-centreY)*(mouseY-centreY));
    let nowAng = atan2(mouseY-centreY, mouseX-centreX)+PI*1/2+TWO_PI*0.75;
    if(nowAng<PI*3/2)
      nowAng+=2*PI;
    // text(dist, centreX, centreY);
    if(nowAng<=angleEnd&&nowAng>angleStart&&2*dist<=nowDiam)
    {
    fill(item.color);
    stroke(item.color); 
    strokeWeight(5); 
    strokeJoin(ROUND); 
    arc(centreX, centreY, nowDiam, nowDiam, angleStart, angleEnd, PIE);
    }
    //normal pie
    // fill(item.color);
    // stroke(0, 0, 0); 
    // strokeWeight(1); 
    else{
      noFill();
      stroke(item.color);
      strokeJoin(ROUND); 
      strokeWeight(5);
      arc(centreX, centreY, nowDiam, nowDiam, angleStart, angleEnd, OPEN); //PIE creates closed slices the the center
    }



    noStroke();
    fill(0); 
    push();
    translate(centreX, centreY); 
    rotate(angleEnd); 
    textAlign(RIGHT, BOTTOM); 
    //normal pie
    text(item.ingredient, (nowDiam)/2-10, -8); 
    // text(nowDiam, (nowDiam)/2-10, -8); 
    pop();

    //update the angle start before the next iteration
    angleStart += itemAngle;
  }

}

