let positions1 = [],
    positions2 = [],
    sizes1 = [],
    sizes2 = [],
    rotations1 = [],
    rotations2 = [],
    numBoxes = 26,
    heightNum = 5,
    eachHeight = 20,
    eachWidth = 20;
function setup() {
  createCanvas(1280,800, WEBGL);
  createEasyCam();
  document.oncontextmenu = ()=>false;
  
  // generate all the data first
  for(let N=0;N<heightNum;N++)
    {
  for(let i = 0 ; i < numBoxes ; i++){
    if(i%2==0)
      {
        let s1 = createVector(2,eachWidth,eachHeight);
        let r1 = createVector(0,0,PI/4);
        let p1 = createVector(i*eachWidth/(sqrt(2)),0, eachHeight*N*2 );
        positions1.push(p1);
        rotations1.push(r1);
        sizes1.push(s1);
        let s2 = createVector(2,eachWidth,eachHeight);
        let r2 = createVector(0,0,-PI/4);
        let p2 = createVector(i*eachWidth/(sqrt(2))+eachWidth*sqrt(2)/2,0, eachHeight*N*2+eachHeight );
        positions2.push(p2)
        rotations2.push(r2);
        sizes2.push(s2)
      }
    }
       
   }
      


}

function draw() {
  // always redraw
  normalMaterial();
  background(127);
  drawGrid(20, 20, 100);
   drawAxis();

  // ** put your code below this **/
  for(let i = 0 ; i < numBoxes/2*heightNum ; i++){

    //let _sz = sizes1[i].copy(); 
    PossiblyEvenBetterBox(sizes1[i], positions1[i], rotations1[i]);
    PossiblyEvenBetterBox(sizes2[i], positions2[i], rotations2[i]);
  }
  push()
  translate(0,numBoxes*eachWidth/(sqrt(2)),0);
   for(let i = 0 ; i < numBoxes/2*heightNum ; i++){

    //let _sz = sizes1[i].copy(); 
    PossiblyEvenBetterBox(sizes1[i], positions1[i], rotations1[i]);
    PossiblyEvenBetterBox(sizes2[i], positions2[i], rotations2[i]);
  }
  pop();
  push();
  rotateZ(PI/2);
  translate(eachWidth/sqrt(2),0,0);
    for(let i = 0 ; i < numBoxes/2*heightNum ; i++){
    //let _sz = sizes1[i].copy(); 
    PossiblyEvenBetterBox(sizes1[i], positions1[i], rotations1[i]);
    PossiblyEvenBetterBox(sizes2[i], positions2[i], rotations2[i]);
  }
  translate(0,-numBoxes*eachWidth/(sqrt(2)),0);
   for(let i = 0 ; i < numBoxes/2*heightNum ; i++){

    //let _sz = sizes1[i].copy(); 
    PossiblyEvenBetterBox(sizes1[i], positions1[i], rotations1[i]);
    PossiblyEvenBetterBox(sizes2[i], positions2[i], rotations2[i]);
  }
  pop()
  push()
  translate(numBoxes*eachWidth/(sqrt(2)*2),numBoxes*eachWidth/(sqrt(2)*2),eachHeight*2*heightNum);
  plane(numBoxes*eachWidth/(sqrt(2))+eachWidth,numBoxes*eachWidth/(sqrt(2))+eachWidth);
  pop()
  push()
  translate(numBoxes*eachWidth/(sqrt(2)*2),numBoxes*eachWidth/(sqrt(2)*2),eachHeight*2*heightNum/2);
  plane(numBoxes*eachWidth/(sqrt(2))+eachWidth,numBoxes*eachWidth/(sqrt(2))+eachWidth);
  pop()

}

/* Function to draw a box inside of vector coordinates, with the baseline always at 0 */
function PossiblyEvenBetterBox(sz, pos, rot){
  push();
  translate(pos.x, pos.y, pos.z  + sz.z/2);
  rotateX(rot.x);
  rotateY(rot.y);
  rotateZ(rot.z);
  box(sz.x, sz.y, sz.z);
  //cylinder(sz.x, sz.z, 24, );
  // translate(0,0,sz.z/2)
  // rotateX(-PI/2)
  // cone(30, 15);
  pop();
}


/* draw a box, baseline in middle */
function betterBox(sz, pos, rot){
  push();
  translate(pos.x, pos.y, pos.z);
  rotateX(rot.x);
  rotateY(rot.y);
  rotateZ(rot.z);
  box(sz.x, sz.y, sz.z);
  pop();
}

/* This draws the axis on the 3D plane */
function drawAxis(){
  push();
  strokeWeight(12);
  let sz = 300;
  // draw the lines
  stroke(255,0,0); // R
  line(0,0,0,sz,0,0); // X
  stroke(0,255,0); // G
  line(0,0,0,0,sz,0); // Y
  stroke(0,0,255); //B
  line(0,0,0,0,0,sz); // Z

  // draw the tips
  strokeWeight(12);
  stroke(255,0,0); // R
  point(sz,0,0); // X
  stroke(0,255,0); // G
  line(0,0,0,0,sz,0); // Y
  stroke(0,0,255); //B
  line(0,0,0,0,0,sz); // Z

  // draw the tips
  strokeWeight(12);
  stroke(255,0,0); // R
  point(sz,0,0); // X
  stroke(0,255,0); // G
  point(0,sz,0); // Y
  stroke(0,0,255); //B
  point(0,0,sz); // Z

  pop();
}


/* draw a grid with variable width height and size */
function drawGrid(rows, cols, sz){
  push();
  stroke(255);
  // move to negative edge of the grid
  translate(-rows*0.5*sz,-cols*0.5*sz );

  // draw the rows
  for(let i = 0; i < rows+1; i++){
    line(i *sz, 0 ,i*sz, cols*sz);
  }
  // draw the columns
  for(let j = 0; j < cols+1; j++){
    line(0,j *sz, rows*sz ,j*sz);
  }

  pop();
}