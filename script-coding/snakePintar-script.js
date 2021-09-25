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
  frameRate(5);
  createCanvas(400, 400);
  background(102, 249, 160 );
  Mundo = {snake: [{ x: 4, y: 1 },{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], dir: {x: 1, y: 0}, food: {x:320, y: 40}, food1:{x:40, y:320}, food2:{x:320, y:320} ,puntaje:0, borracho:false };

  textFont(font);

  const lista = Mundo.snake;
  const bezaca= first(Mundo.snake);
}

// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
function drawGame(Mundo){
  background(102, 249, 160 );
  fill(240, 240, 240);
  forEach(Mundo.snake, s => {
    ellipse(s.x * dx+10, s.y * dy+10, dx, dy);
  });

    textFont(font);


 imageMode(CENTER);
  image(img1, Mundo.food.x+10 , Mundo.food.y+10 , 30, 30);

  imageMode(CENTER);
  image(img, Mundo.food1.x+10 , Mundo.food1.y+10 , 30, 30);
   
  imageMode(CENTER);
  image(img2, Mundo.food2.x+10 , Mundo.food2.y+10  , 30, 30);

if(Mundo.puntaje>=0){
  fill(11,25,30); 

text('Saludable: '+Mundo.puntaje, 0, 20);

}
else {
fill(11,25,30); 

text('Colesterol: '+Mundo.puntaje*-1, 0, 20);
}

 const lista = Mundo.snake;
  const bezaca= first(Mundo.snake);
  if(Mundo.puntaje==-7){
   textSize(32)
  text('Perdiste', 150, 200);
 fill(0, 102, 153);
  return noLoop(); 
  }

  if(chocar(Mundo)||morderse(rest(lista), bezaca)){
  textSize(32)
  text('Perdiste', 150, 200);
 fill(0, 102, 153);
  return noLoop();
  
 }

  
 } 

 

 function chocar(Mundo){
 if(first(Mundo.snake).x==19&&Mundo.dir.x==1||first(Mundo.snake).x==0&&Mundo.dir.x==-1){
   return true ; }

 if(first(Mundo.snake).y==19&&Mundo.dir.y==1||first(Mundo.snake).y==0&&Mundo.dir.y==-1){
   return true ;
 }
 else
 return false;
 }

 


function comer(Mundo,foods){
  if ((first(Mundo.snake).x)*20==foods.x && (first(Mundo.snake).y)*20==foods.y){
    return true;
  }
  else {
    return false;
  }
}



function aleatorio(minimo,maximo){
  return Math.round(Math.random() * (maximo - minimo) + minimo)*20;
}


function morderse(lista, bezaca){
 
   if(JSON.stringify(first(lista)) === JSON.stringify( bezaca )){
     
     return true;
   }
   else if(isEmpty(lista)){
    return false;
   }
   else {
    return  morderse(rest(lista), bezaca);
   }
    }



function ubicarComida(Mundo,foods,snake){
  var ramdomF={x: aleatorio(2,18), y:aleatorio(2,18)}
   console.log(ramdomF)
  if(ramdomF.x==Mundo.food1.x&&ramdomF.y==Mundo.food1.y||ramdomF.x==Mundo.food.x&&ramdomF.y==Mundo.food.y){
     console.log("aquí pasó1")
   console.log(ramdomF)
    return ubicarComida(Mundo,foods,snake)
  }
  if(morderse(rest(snake),{x:ramdomF.x/20, y:ramdomF.y/20})){
    
    console.log(ramdomF)
      return ubicarComida(Mundo,foods,snake)
  }
  else{
    return ramdomF;

  }
  }


    

// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo){
// se ejecuta la funcionalidad que esté aquí 
if(comer(Mundo,Mundo.food1)){
if(Mundo.dir.x == 1){
     return update(Mundo, { food1: ubicarComida(Mundo,Mundo.food1,Mundo.snake) , snake: cons({x:(first(Mundo.snake).x)+1, y:first(Mundo.snake).y},Mundo.snake), puntaje: Mundo.puntaje-1, borracho:false}) ;
   }
   else if(Mundo.dir.x==-1){
     return update(Mundo,{ food1:  ubicarComida(Mundo,Mundo.food1,Mundo.snake) , snake: cons({x:(first(Mundo.snake).x)-1, y:first(Mundo.snake).y},Mundo.snake), puntaje: Mundo.puntaje-1, borracho:false}) ; 
   }
   else if(Mundo.dir.y==1){
     return update(Mundo,{ food1:  ubicarComida(Mundo,Mundo.food1,Mundo.snake) , snake: cons({x:first(Mundo.snake).x, y:(first(Mundo.snake).y)+1},Mundo.snake), puntaje: Mundo.puntaje-1, borracho:false}) ;
   }
   else if(Mundo.dir.y==-1){
     return update(Mundo, { food1: ubicarComida(Mundo,Mundo.food1,Mundo.snake), snake: cons({x:first(Mundo.snake).x, y:(first(Mundo.snake).y)-1},Mundo.snake), puntaje: Mundo.puntaje-1, borracho:false}) ;
   }
}



if(comer(Mundo,Mundo.food)){
if(Mundo.dir.x == 1){
     return update(Mundo, { food: ubicarComida(Mundo,Mundo.food,Mundo.snake) , snake: cons({x:(first(Mundo.snake).x)+2, y:first(Mundo.snake).y},cons({x:(first(Mundo.snake).x)+1, y:first(Mundo.snake).y},Mundo.snake)), puntaje: Mundo.puntaje+1, borracho:false}) ;
   }
   else if(Mundo.dir.x==-1){
     return update(Mundo,{ food:  ubicarComida(Mundo,Mundo.food,Mundo.snake) , snake: cons({x:(first(Mundo.snake).x)-2, y:first(Mundo.snake).y},cons({x:(first(Mundo.snake).x)-1, y:first(Mundo.snake).y},Mundo.snake)), puntaje: Mundo.puntaje+1, borracho:false}) ; 
   }
   else if(Mundo.dir.y==1){
     return update(Mundo,{ food:  ubicarComida(Mundo,Mundo.food,Mundo.snake) , snake: cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y+2},cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y+1},Mundo.snake)), puntaje: Mundo.puntaje+1, borracho:false}) ;
   }
   else if(Mundo.dir.y==-1){
     return update(Mundo, { food: ubicarComida(Mundo,Mundo.food,Mundo.snake), snake: cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y-2},cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y-1},Mundo.snake)), puntaje: Mundo.puntaje+1, borracho:false}) ;
   }  
}

//para la otra comida

if(comer(Mundo,Mundo.food2)){
if(Mundo.dir.x == 1){
     return update(Mundo, { food2: ubicarComida(Mundo,Mundo.food2,Mundo.snake) , snake: cons({x:(first(Mundo.snake).x)+1, y:first(Mundo.snake).y},Mundo.snake), puntaje: Mundo.puntaje-1, borracho:true}) ;
   }
   else if(Mundo.dir.x==-1){
     return update(Mundo,{ food2:  ubicarComida(Mundo,Mundo.food2,Mundo.snake) , snake: cons({x:(first(Mundo.snake).x)-1, y:first(Mundo.snake).y},Mundo.snake), puntaje: Mundo.puntaje-1, borracho:true}) ; 
   }
   else if(Mundo.dir.y==1){
     return update(Mundo,{ food2:  ubicarComida(Mundo,Mundo.food2,Mundo.snake) , snake: cons({x:first(Mundo.snake).x, y:(first(Mundo.snake).y)+1},Mundo.snake), puntaje: Mundo.puntaje-1, borracho:true}) ;
   }
   else if(Mundo.dir.y==-1){
     return update(Mundo, { food2: ubicarComida(Mundo,Mundo.food2,Mundo.snake), snake: cons({x:first(Mundo.snake).x, y:(first(Mundo.snake).y)-1},Mundo.snake), puntaje: Mundo.puntaje-1, borracho:true}) ;
   }
}

 else { 
  return update(Mundo, {snake: moveSnake(Mundo.snake, Mundo.dir)});
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
  else{
   return update(Mundo, {})
  }
  }
  //si está borracho
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
  else{
   return update(Mundo, {})
  }
  
  }
  
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>


// //Vamos a usar http://processingjs.org/
// // o https://p5js.org/reference/

// // Importamos las librerias
// let { append, cons, first, isEmpty, isList, length, rest, map, forEach }  = functionalLight;

// // Actualiza los atributos del objeto y retorna una copia profunda
// function update(data, attribute) {
//   return Object.assign({}, data, attribute);
// }

// //////////////////////// Mundo inicial
// let Mundo = {}
// ////////////////////////
// /**
//  * Actualiza la serpiente. Creando una nuevo cabeza y removiendo la cola
//  */
// function moveSnake(snake, dir) {
//   const head = first(snake);
//   return cons({x: head.x + dir.x, y: head.y + dir.y}, snake.slice(0, length(snake) - 1));
// }

// const dx = 20;
// const dy = 20;

// let img ;
// let img1;
// let img2;
// let font;
// //carga de imagenes
// function preload(){
//   img = loadImage('images/hamburguesa.png');
//   img1 = loadImage('images/manzana.png');
//   img2 = loadImage('images/cerveza.png');
//   font = loadFont('fuentes/FredokaOne-Regular.ttf')
// }


// /**
//  * Esto se llama antes de iniciar el juego
//  */
// function setup() {
//   frameRate(5);
//   createCanvas(400, 400);
//   background(102, 249, 160 );
//   Mundo = {
//     snake: [{ x: 4, y: 1 },{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], 
//     dir: {x: 1, y: 0},
//     //manzana
//     food: {x:320, y: 40},
//     //hamburguesa
//     food1:{x:40, y:320},
//     //cerveza
//     // food2:setTimeout(pintaCervezasetup(),2000),
//     food2:{x:320, y:320},
//     puntaje:0, 
//     borracho:false,
//     existeCerveza:true
//   };

//   textFont(font);

//   const lista = Mundo.snake;
//   const bezaca= first(Mundo.snake);
// }

// function pintaCerveza() {
//     image(img2, Mundo.food2.x+10 , Mundo.food2.y+10  , 30, 30);
// }
// function pintaCervezasetup() {return {x:320, y:320}
// }

// // console.log(pintaCerveza())

// // Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
// function drawGame(Mundo){
//   background(102, 249, 160 );
//   fill(240, 240, 240);
//   forEach(Mundo.snake, s => {
//     ellipse(s.x * dx+10, s.y * dy+10, dx, dy);
//   });

//     textFont(font);


//   imageMode(CENTER);
//   image(img1, Mundo.food.x+10 , Mundo.food.y+10 , 30, 30);

//   imageMode(CENTER);
//   image(img, Mundo.food1.x+10 , Mundo.food1.y+10 , 30, 30);

//   imageMode(CENTER);
//   // setTimeout(pintaCerveza(),3000)
//   image(img2, Mundo.food2.x+10 , Mundo.food2.y+10  , 30, 30);

//   if(Mundo.puntaje>=0){
//     fill(11,25,30); 

//     text('Saludable: '+Mundo.puntaje, 0, 20);

//   }
//   else {
//     fill(11,25,30); 

//     text('Colesterol: '+Mundo.puntaje*-1, 0, 20);
//   }

//   const lista = Mundo.snake;
//   const bezaca= first(Mundo.snake);
//   if(Mundo.puntaje==-7){
//      textSize(32)
//     text('Perdiste', 150, 200);
//     fill(0, 102, 153);
//     return noLoop(); 
//   }

//   if(chocar(Mundo)||morderse(rest(lista), bezaca)){
//     textSize(32)
//     text('Perdiste', 150, 200);
//     fill(0, 102, 153);
//     return noLoop();

//  }

  
//  } 

 

// function chocar(Mundo){
//   if(first(Mundo.snake).x==19&&Mundo.dir.x==1||first(Mundo.snake).x==0&&Mundo.dir.x==-1){
//     return true ; }

//   if(first(Mundo.snake).y==19&&Mundo.dir.y==1||first(Mundo.snake).y==0&&Mundo.dir.y==-1){
//     return true ;
//   }
//   else
//     return false;
// }




// function comer(Mundo,foods){
//   if ((first(Mundo.snake).x)*20==foods.x && (first(Mundo.snake).y)*20==foods.y){
//     return true;
//   }
//   else {
//     return false;
//   }
// }



// function aleatorio(minimo,maximo){
//   return Math.round(Math.random() * (maximo - minimo) + minimo)*20;
// }


// function morderse(lista, bezaca){
//   if(JSON.stringify(first(lista)) === JSON.stringify( bezaca )){
//     return true;
//   }
//   else if(isEmpty(lista)){
//     return false;
//   }
//   else {
//     return  morderse(rest(lista), bezaca);
//   }
// }



// function ubicarComida(Mundo,foods,snake){
//   var ramdomF={x: aleatorio(2,18), y:aleatorio(2,18)}
//    console.log(ramdomF)
//   if(ramdomF.x==Mundo.food1.x&&ramdomF.y==Mundo.food1.y||ramdomF.x==Mundo.food.x&&ramdomF.y==Mundo.food.y){
//      console.log("aquí pasó1")
//    console.log(ramdomF)
//     return ubicarComida(Mundo,foods,snake)
//   }
//   if(morderse(rest(snake),{x:ramdomF.x/20, y:ramdomF.y/20})){
    
//     console.log(ramdomF)
//       return ubicarComida(Mundo,foods,snake)
//   }
//   else{
//     return ramdomF;
//   }
// }




// // function holaMundo() {
// //   console.log("hola Mundo")
// // }
// // function holaMundo2() {
// //   console.log("hola Mundo2")
// // }
// // setTimeout(holaMundo,1000)
// // setInterval(holaMundo2,2000)


// // Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
// function onTic(Mundo){

//   // se ejecuta la funcionalidad que esté aquí 
//   //si come hamburguesa
//   if(comer(Mundo,Mundo.food1)){
//     if(Mundo.dir.x == 1){     
//       return update(Mundo, { 
//         food1: ubicarComida(Mundo,Mundo.food1,Mundo.snake) , 
//         snake: cons({x:(first(Mundo.snake).x)+1, y:first(Mundo.snake).y},Mundo.snake), 
//         puntaje: Mundo.puntaje-1, 
//         borracho:false
//       });
//     }
//     else if(Mundo.dir.x==-1){
//       return update(Mundo,{ 
//         food1:  ubicarComida(Mundo,Mundo.food1,Mundo.snake) , 
//         snake: cons({x:(first(Mundo.snake).x)-1, y:first(Mundo.snake).y},Mundo.snake), 
//         puntaje: Mundo.puntaje-1, 
//         borracho:false
//       });
//     }
//     else if(Mundo.dir.y==1){
//       return update(Mundo,{ 
//         food1:  ubicarComida(Mundo,Mundo.food1,Mundo.snake) , 
//         snake: cons({x:first(Mundo.snake).x, y:(first(Mundo.snake).y)+1},Mundo.snake), 
//         puntaje: Mundo.puntaje-1, 
//         borracho:false
//       });
//     }
//     else if(Mundo.dir.y==-1){
//       return update(Mundo, { 
//         food1: ubicarComida(Mundo,Mundo.food1,Mundo.snake), 
//         snake: cons({x:first(Mundo.snake).x, y:(first(Mundo.snake).y)-1},Mundo.snake), 
//         puntaje: Mundo.puntaje-1, 
//         borracho:false
//       });
//     }
//   }


//   // si come manzana
//   if(comer(Mundo,Mundo.food)){
//     if(Mundo.dir.x == 1){
//       return update(Mundo, { 
//         food: ubicarComida(Mundo,Mundo.food,Mundo.snake) , 
//         snake: cons({x:(first(Mundo.snake).x)+2, y:first(Mundo.snake).y},cons({x:(first(Mundo.snake).x)+1, y:first(Mundo.snake).y},Mundo.snake)), 
//         puntaje: Mundo.puntaje+1, 
//         borracho:false
//       });
//     }
//     else if(Mundo.dir.x==-1){
//       return update(Mundo,{ 
//         food:  ubicarComida(Mundo,Mundo.food,Mundo.snake) , 
//         snake: cons({x:(first(Mundo.snake).x)-2, y:first(Mundo.snake).y},cons({x:(first(Mundo.snake).x)-1, y:first(Mundo.snake).y},Mundo.snake)), 
//         puntaje: Mundo.puntaje+1, 
//         borracho:false
//       }); 
//     }
//     else if(Mundo.dir.y==1){
//       return update(Mundo,{ 
//         food:  ubicarComida(Mundo,Mundo.food,Mundo.snake) , 
//         snake: cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y+2},cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y+1},Mundo.snake)), 
//         puntaje: Mundo.puntaje+1, 
//         borracho:false
//       });
//     }
//     else if(Mundo.dir.y==-1){
//       return update(Mundo, { 
//         food: ubicarComida(Mundo,Mundo.food,Mundo.snake), 
//         snake: cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y-2},cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y-1},Mundo.snake)), 
//         puntaje: Mundo.puntaje+1, 
//         borracho:false
//       });
//     }
//   }

//   //para la otra comida
//   //si come cerveza
//   if(comer(Mundo,Mundo.food2)){
//     if(Mundo.dir.x == 1){
//       // if (generacioncerveza()) {}
//       return update(Mundo, {
//         food2: setTimeout(update(Mundo,{food2:ubicarComida(Mundo,Mundo.food2,Mundo.snake)}),3000), 
//         snake: cons({x:(first(Mundo.snake).x)+1, y:first(Mundo.snake).y},Mundo.snake), 
//         puntaje: Mundo.puntaje-1, 
//         borracho:true
//       });
//     }
//     else if(Mundo.dir.x==-1){
//       return update(Mundo,{ 
//         food2:  setTimeout(update(Mundo,{food2:ubicarComida(Mundo,Mundo.food2,Mundo.snake)}),3000), 
//         snake: cons({x:(first(Mundo.snake).x)-1, y:first(Mundo.snake).y},Mundo.snake), 
//         puntaje: Mundo.puntaje-1, 
//         borracho:true
//       });
//     }
//     else if(Mundo.dir.y==1){
//       return update(Mundo,{ 
//         food2:  setTimeout(update(Mundo,{food2:ubicarComida(Mundo,Mundo.food2,Mundo.snake)}),3000), 
//         snake: cons({x:first(Mundo.snake).x, y:(first(Mundo.snake).y)+1},Mundo.snake), 
//         puntaje: Mundo.puntaje-1, 
//         borracho:true
//       });
//     }
//     else if(Mundo.dir.y==-1){
//       return update(Mundo, { 
//         food2: setTimeout(update(Mundo,{food2:ubicarComida(Mundo,Mundo.food2,Mundo.snake)}),3000), 
//         snake: cons({x:first(Mundo.snake).x, y:(first(Mundo.snake).y)-1},Mundo.snake), 
//         puntaje: Mundo.puntaje-1, 
//         borracho:true
//       });
//     }
//   }

//   if (existeCerveza == false && frameCount%25==0) {
//     return update(Mundo, { 
//         food2: ubicarComida(Mundo,Mundo.food2,Mundo.snake) , 
//         snake: cons({x:(first(Mundo.snake).x)+1, y:first(Mundo.snake).y},Mundo.snake), 
//         puntaje: Mundo.puntaje-1, 
//         borracho:true
//       });
//   }

//   else {return update(Mundo, {snake: moveSnake(Mundo.snake, Mundo.dir)});
//   }
// }


 



// //Implemente esta función si quiere que su programa reaccione a eventos del mouse
// function onMouseEvent (Mundo, event) {
//    return update(Mundo,{});
// }


// /**
// * Actualiza el mundo cada vez que se oprime una tecla. Retorna el nuevo stado del mundo
// */
// function onKeyEvent (Mundo, keyCode) {
//   // Cambiamos la dirección de la serpiente. Noten que no movemos la serpiente. Solo la dirección
  
//   if(Mundo.borracho==false){
//     if(keyCode==UP_ARROW&&Mundo.dir.y!=1){
//      return update(Mundo, {dir: {y: -1, x: 0}});
//   }
//   else if(keyCode==DOWN_ARROW&&Mundo.dir.y!=-1){
//      return update(Mundo, {dir: {y: 1, x: 0}});
//   }
//   else if(keyCode==LEFT_ARROW&&Mundo.dir.x!=1){
//    return update(Mundo, {dir: {y: 0, x: -1}});
//   }
//   else if(keyCode== RIGHT_ARROW&&Mundo.dir.x!=-1){
//     return update(Mundo, {dir: {y: 0, x: 1}});
//   } 
//   else{
//    return update(Mundo, {})
//   }
//   }
//   //si está borracho
//   else {
//    if(keyCode==UP_ARROW&&Mundo.dir.y!=-1){
//      return update(Mundo, {dir: {y: 1, x: 0}});
//   }
//   else if(keyCode==DOWN_ARROW&&Mundo.dir.y!=1){
//      return update(Mundo, {dir: {y: -1, x: 0}});
//   }
//   else if(keyCode==LEFT_ARROW&&Mundo.dir.x!=-1){
//    return update(Mundo, {dir: {y: 0, x: 1}});
//   }
//   else if(keyCode== RIGHT_ARROW&&Mundo.dir.x!=1){
//     return update(Mundo, {dir: {y: 0, x: -1}});
//   } 
//   else{
//    return update(Mundo, {})
//   }
  
//   }
  
// }