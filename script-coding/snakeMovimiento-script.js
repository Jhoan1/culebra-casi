//Vamos a usar http://processingjs.org/
// o https://p5js.org/reference/

// Importamos las librerias
let { append, cons, first, isEmpty, isList, length, rest, map, forEach }  = functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
  return Object.assign({}, data, attribute);
}

//////////////////////// Mundo inicial
let Mundo = {}
////////////////////////
/**
 * Actualiza la serpiente. Creando una nuevo cabeza y removiendo la cola
 */
function moveSnake(snake, dir) {
  const head = first(snake);
  return cons({x: head.x + dir.x, y: head.y + dir.y}, snake.slice(0, length(snake) - 1));
}

const dx = 20;
const dy = 20;
const alto=400
const ancho=800

let img ;
let img1;
let img2;
let font;

function preload(){
  img = loadImage('images/hamburguesa.png');
  img1 = loadImage('images/manzana.png');
  img2 = loadImage('images/cerveza.png');
  font = loadFont('fuentes/FredokaOne-Regular.ttf')
}


/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
  frameRate(15);
  createCanvas(ancho, alto);
  background(219,204,20);
  Mundo = {snake: [{ x: 4, y: 1 },{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], snake1: [{ x: 4, y: 18 },{ x: 3, y: 18 }, { x: 2, y: 18 }, { x: 1, y: 18 }] ,dir: {x: 1, y: 0}, dir1: {x: 1, y: 0},  food:{x: 200, y: 180}, food1:{x:600,y:180},food2:{x:400,y:180} ,puntaje:0, puntaje1:0, borracho:false,borracho1:false};


  textFont(font);

  const lista = Mundo.snake;
  const bezaca= first(Mundo.snake);
}

// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
function drawGame(Mundo){
  background(102, 249, 160 );
  fill(75,20,219);
  forEach(Mundo.snake, s => {
    ellipse(s.x * dx+10, s.y * dy+10, dx, dy);
  });
  fill(219,68,31);
forEach(Mundo.snake1, s => {
    ellipse(s.x * dx+10, s.y * dy+10, dx, dy);
  });

  textFont(font);

 
 //está enlazadoaun botón en html
 function restart(){
  loop();
  Mundo = {snake: [{ x: 4, y: 1 },{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], snake1: [{ x: 4, y: 18 },{ x: 3, y: 18 }, { x: 2, y: 18 }, { x: 1, y: 18 }] ,dir: {x: 1, y: 0}, dir1: {x: 1, y: 0},  food:{x: 200, y: 180}, food1:{x:600,y:180}, puntaje:0,puntaje1:0};
}


if(Mundo.puntaje>=0){
  fill(11,25,30); 

text('Saludable 1: '+Mundo.puntaje, 0, 20);

}
else {
fill(11,25,30); 

text('Colesterol 1: '+Mundo.puntaje*-1, 0, 20);
}


if(Mundo.puntaje1>=0){
fill(11,25,30); 

text('saludable 2: '+Mundo.puntaje1, 100, 20);

}
else {
fill(11,25,30); 

text('Colesterol 2: '+Mundo.puntaje1*-1, 100, 20);
}


 imageMode(CENTER);
  image(img1, Mundo.food.x+10 , Mundo.food.y+10 , 30, 30);

  imageMode(CENTER);
  image(img, Mundo.food1.x+10 , Mundo.food1.y+10 , 30, 30);
   
  imageMode(CENTER);
  image(img2, Mundo.food2.x+10 , Mundo.food2.y+10  , 30, 30);
  

  
  // Perder para la primera
  const lista = Mundo.snake;
  const bezaca= first(Mundo.snake);


  const lista1 = Mundo.snake1;
  const bezaca1= first(Mundo.snake1);
 
 if(chocar(Mundo.dir,Mundo.snake)&&chocar(Mundo.dir1,Mundo.snake1)){
   textSize(32)
   fill(14, 12, 13);
   textAlign(CENTER);
  text('Perdieron', ancho/2, alto/2);
  return noLoop();
 }


   if(morderse(rest(lista), lista1 ,bezaca)||chocar(Mundo.dir,Mundo.snake)){
  textSize(32)
   fill(14, 12, 13);
   textAlign(CENTER);
  text('Perdió jugador 1', ancho/2, alto/2);
  return noLoop();
  }
    // Perder para la segunda

  if(morderse(rest(lista1), lista,bezaca1)||chocar(Mundo.dir1,Mundo.snake1)){
  textSize(32)
 fill(14, 12, 13);
 textAlign(CENTER);
  text('Perdió jugador 2', ancho/2, alto/2);
  return noLoop();
 }
 
 
if(Mundo.puntaje==7){
  textSize(32)
 fill(14, 12, 13);
 textAlign(CENTER);
  text('Gana jugador1', ancho/2, alto/2);
   return noLoop();
}
else if(Mundo.puntaje==-7){
  textSize(32)
  fill(14, 12, 13);
  textAlign(CENTER);
  text('Pierde jugador1', ancho/2, alto/2);
   return noLoop();
}


if(Mundo.puntaje1==7){
  textSize(32)
 fill(14, 12, 13);
 textAlign(CENTER);
  text('Gana jugador2', ancho/2, alto/2);
   return noLoop();
}
else if(Mundo.puntaje1==-7){
  textSize(32)
  fill(14, 12, 13);
  textAlign(CENTER);
  text('Pierde jugador2', ancho/2, alto/2);
   return noLoop();
}


 } 

 

 function chocar(dirs,snakes){
 if(first(snakes).x==39&&dirs.x==1||first(snakes).x==0&&dirs.x==-1){
   return true ; }

 if(first(snakes).y==19&&dirs.y==1||first(snakes).y==0&&dirs.y==-1){
   return true ;
 }
 else
 return false;
 }

  



function comer(snakes,foods){
  if ((first(snakes).x)*20==foods.x &&(first(snakes).y)*20==foods.y){
     
    return true
  
 
  }
  else {
    return false;
  }
}


function morderse(lista, lista1 ,bezaca){
if(isEmpty(lista)&&isEmpty(lista1)){
    return false;
   }
   else if(JSON.stringify( first(lista) ) === JSON.stringify( bezaca)||JSON.stringify( first(lista1) ) === JSON.stringify( bezaca) ){
     return true;
   }
   else {
    return  morderse(rest(lista),rest(lista1) ,bezaca);
   }
    }


function aleatorio(minimo,maximo){
  return Math.round(Math.random() * (maximo - minimo) + minimo)*20;
}



function ubicarComida(Mundo,foods,snakes,snakes1){
  const ramdomF={x: aleatorio(2,38), y: aleatorio(2,18)}
   console.log(ramdomF)
  if(ramdomF.x==Mundo.food1.x&&ramdomF.y==Mundo.food1.y||ramdomF.x==Mundo.food.x&&ramdomF.y==Mundo.food.y){
    return ubicarComida(Mundo,foods,snakes,snakes1)
  }
  if(morderse(snakes, snakes1 ,{x:ramdomF.x/20, y:ramdomF.y/20})){
      return ubicarComida(Mundo,foods,snakes,snakes1)
  }
  else{
    return ramdomF;

  }
  
}

function actualizoP(puntaje,n){
  
  return puntaje+n;
}






3333
// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo){



if(comer(Mundo.snake,Mundo.food1)){
if(Mundo.dir.x == 1){
     return update(Mundo, { food1: ubicarComida(Mundo,Mundo.food1,Mundo.snake,Mundo.snake1) , snake: cons({x:(first(Mundo.snake).x)+1, y:first(Mundo.snake).y},Mundo.snake),puntaje:actualizoP(Mundo.puntaje,-1),borracho:false}) ;
   }
   else if(Mundo.dir.x==-1){
     return update(Mundo,{ food1: ubicarComida(Mundo,Mundo.food1,Mundo.snake,Mundo.snake1) , snake: cons({x:(first(Mundo.snake).x)-1, y:first(Mundo.snake).y},Mundo.snake),puntaje:actualizoP(Mundo.puntaje,-1),borracho:false}) ; 
   }
   else if(Mundo.dir.y==1){
     return update(Mundo,{ food1:  ubicarComida(Mundo,Mundo.food1,Mundo.snake,Mundo.snake1) , snake: cons({x:first(Mundo.snake).x, y:(first(Mundo.snake).y)+1},Mundo.snake),puntaje:actualizoP(Mundo.puntaje,-1),borracho:false}) ;
   }
   else if(Mundo.dir.y==-1){
     return update(Mundo, { food1: ubicarComida(Mundo,Mundo.food1,Mundo.snake,Mundo.snake1), snake: cons({x:first(Mundo.snake).x, y:(first(Mundo.snake).y)-1},Mundo.snake),puntaje:actualizoP(Mundo.puntaje,-1),borracho:false}) ;
   }
}
 
 //para la segunda serpiente 

 if(comer(Mundo.snake1,Mundo.food1)){
if(Mundo.dir1.x == 1){
     return update(Mundo, { food1: ubicarComida(Mundo,Mundo.food1,Mundo.snake,Mundo.snake1) , snake1: cons({x:(first(Mundo.snake1).x)+1, y:first(Mundo.snake1).y},Mundo.snake1),puntaje1:actualizoP(Mundo.puntaje1,-1),borracho1:false}) ;
   }
   else if(Mundo.dir1.x==-1){
     return update(Mundo,{ food1:  ubicarComida(Mundo,Mundo.food1,Mundo.snake,Mundo.snake1) , snake1: cons({x:(first(Mundo.snake1).x)-1, y:first(Mundo.snake1).y},Mundo.snake1),puntaje1:actualizoP(Mundo.puntaje1,-1),borracho1:false}) ; 
   }
   else if(Mundo.dir1.y==1){
     return update(Mundo,{ food1:  ubicarComida(Mundo,Mundo.food1,Mundo.snake,Mundo.snake1) , snake1: cons({x:first(Mundo.snake1).x, y:(first(Mundo.snake1).y)+1},Mundo.snake1),puntaje1:actualizoP(Mundo.puntaje1,-1),borracho1:false}) ;
   }
   else if(Mundo.dir1.y==-1){
     return update(Mundo, { food1:  ubicarComida(Mundo,Mundo.food1,Mundo.snake,Mundo.snake1), snake1: cons({x:first(Mundo.snake1).x, y:(first(Mundo.snake1).y)-1},Mundo.snake1),puntaje1:actualizoP(Mundo.puntaje1,-1),borracho1:false}) ;
   }
}

//para la otra comida
if(comer(Mundo.snake,Mundo.food)){
if(Mundo.dir.x == 1){
     return update(Mundo, { food: ubicarComida(Mundo,Mundo.food,Mundo.snake,Mundo.snake1) , snake: cons({x:(first(Mundo.snake).x)+2, y:first(Mundo.snake).y},cons({x:(first(Mundo.snake).x)+1, y:first(Mundo.snake).y},Mundo.snake)),puntaje:actualizoP(Mundo.puntaje,+1),borracho:false}) ;
   }
   else if(Mundo.dir.x==-1){
     return update(Mundo,{ food: ubicarComida(Mundo,Mundo.food,Mundo.snake,Mundo.snake1) , snake: cons({x:(first(Mundo.snake).x)-2, y:first(Mundo.snake).y},cons({x:(first(Mundo.snake).x)-1, y:first(Mundo.snake).y},Mundo.snake)),puntaje:actualizoP(Mundo.puntaje,+1),borracho:false}) ; 
   }
   else if(Mundo.dir.y==1){
     return update(Mundo,{ food:  ubicarComida(Mundo,Mundo.food,Mundo.snake,Mundo.snake1) , snake: cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y+2},cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y+1},Mundo.snake)),puntaje:actualizoP(Mundo.puntaje,+1),borracho:false}) ;
   }
   else if(Mundo.dir.y==-1){
     return update(Mundo, { food: ubicarComida(Mundo,Mundo.food,Mundo.snake,Mundo.snake1), snake:  cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y-2},cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y-1},Mundo.snake)),puntaje:actualizoP(Mundo.puntaje,+1),borracho:false}) ;
   }
}
 
 //para la segunda serpiente 

 if(comer(Mundo.snake1,Mundo.food)){
if(Mundo.dir1.x == 1){
     return update(Mundo, { food: ubicarComida(Mundo,Mundo.food,Mundo.snake,Mundo.snake1) , snake1: cons({x:(first(Mundo.snake1).x)+2, y:first(Mundo.snake1).y},cons({x:(first(Mundo.snake1).x)+1, y:first(Mundo.snake1).y},Mundo.snake1)),puntaje1:actualizoP(Mundo.puntaje1,+1),borracho1:false}) ;
   }
   else if(Mundo.dir1.x==-1){
     return update(Mundo,{ food:  ubicarComida(Mundo,Mundo.food,Mundo.snake,Mundo.snake1) , snake1: cons({x:(first(Mundo.snake1).x)-2, y:first(Mundo.snake1).y},cons({x:(first(Mundo.snake1).x)-1, y:first(Mundo.snake1).y},Mundo.snake1)),puntaje1:actualizoP(Mundo.puntaje1,+1),borracho1:false}) ; 
   }
   else if(Mundo.dir1.y==1){
     return update(Mundo,{ food:  ubicarComida(Mundo,Mundo.food,Mundo.snake,Mundo.snake1) , snake1: cons({x:(first(Mundo.snake1).x), y:first(Mundo.snake1).y+2},cons({x:(first(Mundo.snake1).x), y:first(Mundo.snake1).y+1},Mundo.snake1)),puntaje1:actualizoP(Mundo.puntaje1,+1),borracho1:false}) ;
   }
   else if(Mundo.dir1.y==-1){
     return update(Mundo, { food:  ubicarComida(Mundo,Mundo.food,Mundo.snake,Mundo.snake1), snake1: cons({x:(first(Mundo.snake1).x), y:first(Mundo.snake1).y-2},cons({x:(first(Mundo.snake1).x), y:first(Mundo.snake1).y-1},Mundo.snake1)),puntaje1:actualizoP(Mundo.puntaje1,+1),borracho1:false}) ;
   }
}



//para la cerveza 

if(comer(Mundo.snake,Mundo.food2)){
if(Mundo.dir.x == 1){
     return update(Mundo, { food2: ubicarComida(Mundo,Mundo.food2,Mundo.snake,Mundo.snake1) , snake: cons({x:(first(Mundo.snake).x)+1, y:first(Mundo.snake).y},Mundo.snake),puntaje:actualizoP(Mundo.puntaje,-1),borracho:true}) ;
   }
   else if(Mundo.dir.x==-1){
     return update(Mundo,{ food2: ubicarComida(Mundo,Mundo.food2,Mundo.snake,Mundo.snake1) , snake:cons({x:(first(Mundo.snake).x)-1, y:first(Mundo.snake).y},Mundo.snake),puntaje:actualizoP(Mundo.puntaje,-1),borracho:true}) ; 
   }
   else if(Mundo.dir.y==1){
     return update(Mundo,{ food2:  ubicarComida(Mundo,Mundo.food2,Mundo.snake,Mundo.snake1) , snake:cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y+1},Mundo.snake),puntaje:actualizoP(Mundo.puntaje,-1),borracho:true}) ;
   }
   else if(Mundo.dir.y==-1){
     return update(Mundo, { food2: ubicarComida(Mundo,Mundo.food2,Mundo.snake,Mundo.snake1), snake:  cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y-1},Mundo.snake),puntaje:actualizoP(Mundo.puntaje,-1),borracho:true}) ;
   }
}
 
 //para la segunda serpiente 

 if(comer(Mundo.snake1,Mundo.food2)){
if(Mundo.dir1.x == 1){
     return update(Mundo, { food2: ubicarComida(Mundo,Mundo.food2,Mundo.snake,Mundo.snake1) , snake1: cons({x:(first(Mundo.snake1).x)+1, y:first(Mundo.snake1).y},Mundo.snake1),puntaje1:actualizoP(Mundo.puntaje1,-1),borracho1:true}) ;
   }
   else if(Mundo.dir1.x==-1){
     return update(Mundo,{ food2:  ubicarComida(Mundo,Mundo.food2,Mundo.snake,Mundo.snake1) , snake1: cons({x:(first(Mundo.snake1).x)-1, y:first(Mundo.snake1).y},Mundo.snake1),puntaje1:actualizoP(Mundo.puntaje1,-1),borracho1:true}) ; 
   }
   else if(Mundo.dir1.y==1){
     return update(Mundo,{ food2:  ubicarComida(Mundo,Mundo.food2,Mundo.snake,Mundo.snake1) , snake1: cons({x:(first(Mundo.snake1).x), y:first(Mundo.snake1).y+1},Mundo.snake1),puntaje1:actualizoP(Mundo.puntaje1,-1),borracho1:true}) ;
   }
   else if(Mundo.dir1.y==-1){
     return update(Mundo, { food2: ubicarComida(Mundo,Mundo.food2,Mundo.snake,Mundo.snake1), snake1: cons({x:(first(Mundo.snake1).x), y:first(Mundo.snake1).y-1},Mundo.snake1),puntaje1:actualizoP(Mundo.puntaje1,-1),borracho1:true}) ;
   }
}



 else { 
   
  return update(Mundo, {snake1: moveSnake(Mundo.snake1, Mundo.dir1), snake:  moveSnake(Mundo.snake, Mundo.dir)}) ;
}
  

  }



//Implemente esta función si quiere que su programa reaccione a eventos del mouse
function onMouseEvent (Mundo, event) {
   return update(Mundo,{});
}


/**
* Actualiza el mundo cada vez que se oprime una tecla. Retorna el nuevo stado del mundo
*/
function onKeyEvent (Mundo, keyCode) {
  // Cambiamos la dirección de la serpiente. Noten que no movemos la serpiente. Solo la dirección
   //PARA LA PRIMERA SERPIENTE
  if(Mundo.borracho==false){
    if(keyCode==UP_ARROW&&Mundo.dir.y!=1){
     return update(Mundo, {dir: {y: -1, x: 0}});
  }
  else if(keyCode==DOWN_ARROW&&Mundo.dir.y!=-1){
     return update(Mundo, {dir: {y: 1, x: 0}});
  }
  else if(keyCode==LEFT_ARROW&&Mundo.dir.x!=1){
   return update(Mundo, {dir: {y: 0, x: -1}});
  }
  else if(keyCode== RIGHT_ARROW&&Mundo.dir.x!=-1){
    return update(Mundo, {dir: {y: 0, x: 1}});
  }
 
  }
  else {
   if(keyCode==UP_ARROW&&Mundo.dir.y!=-1){
     return update(Mundo, {dir: {y: 1, x: 0}});
  }
  else if(keyCode==DOWN_ARROW&&Mundo.dir.y!=1){
     return update(Mundo, {dir: {y: -1, x: 0}});
  }
  else if(keyCode==LEFT_ARROW&&Mundo.dir.x!=-1){
   return update(Mundo, {dir: {y: 0, x: 1}});
  }
  else if(keyCode== RIGHT_ARROW&&Mundo.dir.x!=1){
    return update(Mundo, {dir: {y: 0, x: -1}});
  }
  
  }




//PARA LA SEGUNDA SERPIENTE


  if(Mundo.borracho1==false){
    if(keyCode==87&&Mundo.dir1.y!=1){
     return update(Mundo, {dir1: {y: -1, x: 0}});
  }
  else if(keyCode==83&&Mundo.dir1.y!=-1){
    return update(Mundo, {dir1: {y: 1, x: 0}});
  }
  else if(keyCode==65&&Mundo.dir1.x!=1){
    return update(Mundo, {dir1: {y:0, x:-1}})
  }
   else if(keyCode==68&&Mundo.dir1.x!=-1){
    return update(Mundo, {dir1: {y:0, x:1}})
     }
      else{
   return update(Mundo, {})
  }
  }
  else{
   if(keyCode==87&&Mundo.dir1.y!=-1){
     return update(Mundo, {dir1: {y: 1, x: 0}});
  }
  else if(keyCode==83&&Mundo.dir1.y!=1){
    return update(Mundo, {dir1: {y: -1, x: 0}});
  }
  else if(keyCode==65&&Mundo.dir1.x!=-1){
    return update(Mundo, {dir1: {y:0, x:1}})
  }
   else if(keyCode==68&&Mundo.dir1.x!=1){
    return update(Mundo, {dir1: {y:0, x:-1}})
     }
      else{
   return update(Mundo, {})
  }
  }

  
}