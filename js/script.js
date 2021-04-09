//Обращаемся к игровому полю в HTML.
let canvas = document.getElementById('game');
//Сделаем поле двухмерным.
let context = canvas.getContext('2d');
//Размер игровой клетки.
let grid = 15;
//Высота платформы.
let paddleHeight = grid*5;
//Скорость платформы.
let paddleSpeed = 5;
//Скорость мяча.
let ballSpeed = 4;
//Максимальное расстояние, на которое может опуститься платформа.
let maxPaddleY = canvas.height - grid - paddleHeight;




//Левая платформа.
let leftPaddle = {
    //Указываемы координаты платформы.
   x: grid*2,
   y: canvas.height / 2 - paddleHeight / 2,
   //Высота платформы.
   height: paddleHeight,
   //Ширина платформы.
   width: grid,
   //Направления движения.
   dy: 0
}
//Правая платформа.
let rightPaddle = {
    //Указываемы координаты платформы.
   x: canvas.width - grid*2,
   y: canvas.height / 2 - paddleHeight / 2,
   //Высота платформы.
   height: paddleHeight,
   //Ширина платформы.
   width: grid,
   //Направления движения.
   dy: 0
   }
let ball = {
    //Начальное положение мяча.
    x: canvas.width / 2,
    y: canvas.height /2,
    //Ширина и высота мяча.
    width: grid,
    height: grid,
  //Признак перезапуска мяча.
  restarting: false, 

    //Начальное ускорение мяча.
    dx: ballSpeed,
    dy: ballSpeed,

}
//Главный цикл игры.
function loop(){
 //Очистка игрового поля.
 requestAnimationFrame(loop);
 context.clearRect(0, 0, canvas.width, canvas.height);

 //Если платформы куда-то двигались - продолжить путь
 leftPaddle.y += leftPaddle.dy;
 rightPaddle.y += rightPaddle.dy;

 //Проверка выхода за границы холста.
 //Ушла ли платформа вверх.
 if(leftPaddle.y <= grid)
  leftPaddle.y = grid;
 //Ушла ли платформа вниз.
 if(leftPaddle.y > maxPaddleY)
 leftPaddle.y = maxPaddleY;

//Ушла ли платформа вверх.
  if(rightPaddle.y <= grid)
  rightPaddle.y = grid;
 //Ушла ли платформа вниз.
 if(rightPaddle.y > maxPaddleY)
 rightPaddle.y = maxPaddleY;
 
 //Рисуем платформы.
 context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
 context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
 context.fillRect(0, 0, canvas.width, grid);
 context.fillRect(0, canvas.height - grid, canvas.width, grid);
 for(let i = grid; i <canvas.height - grid; i += grid*2)
  context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
  //Задаём цвет.
 context.fillStyle = 'white';
 //Нарисуем мяч.
 context.fillRect(ball.x, ball.y, ball.width, ball.height);

//Если мяч двигался, то пусть продолжает.
ball.x += ball.dx;
ball.y += ball.dy;

//Коснулся ли мяч стен.
if((ball.y <= grid) || (ball.y + grid >= canvas.height - grid)){
  ball.dy *= -1;
  sound()
}

  //Задаём цвет.
  context.fillStyle = 'white';
//Отслеживаем нажатия клавиш. 
  document.addEventListener("keydown", function(e){
      //Если нажата стрелка вверх.
      if(e.which == 38){
        rightPaddle.dy = -paddleSpeed;  
      } 
     //Если нажата стрелка вниз. 
     else if(e.which == 40){
        rightPaddle.dy = paddleSpeed; 
     }  

     // Нажата клавиша W.
     if(e.which == 87){
       //Двигаем правую платформу вверх.
      leftPaddle.dy = -paddleSpeed; 
     }
     // Нажата клавиша S.
     else if(e.which == 83){
      leftPaddle.dy = paddleSpeed; 
   }  
  });
  

  document.addEventListener("keyup", function(e){
    //Если нажата стрелка вверх.
    if(e.which == 38){
      rightPaddle.dy = 0;  
    } 
   //Если нажата стрелка вниз. 
   else if(e.which == 40){
      rightPaddle.dy = 0; 
   }  
// Нажата клавиша W.
if(e.which == 87){
  //Двигаем правую платформу вверх.
 leftPaddle.dy = 0; 
}
// Нажата клавиша S.
else if(e.which == 83){
 leftPaddle.dy = 0; 
}  
  
});

//Если мяч коснулся платформы.
if(collides(ball, leftPaddle) || collides(ball, rightPaddle)){
 ball.dx *= -1;
 sound()
}

 //Если мяч улетает за игровое поле влево или вправо.
if((ball.x < 0 || ball.x > canvas.width) && !ball.restarting){
  ball.restarting = true
  //Даём время на подготовку игрокам.
  setTimeout(() => {
    ball.restarting = false
    //Вернём мяч в центр поля.
    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
  }, 1500)
 }
}


//Запуск игры.
requestAnimationFrame(loop);

function collides(obj1, obj2){
return obj1.x < obj2.x + obj2.width &&
 obj1.x + obj1.width > obj2.x &&
 obj1.y < obj2.y + obj2.height &&
 obj1.y + obj1.height > obj2.y;
}

function sound(){
  let audio = new Audio()
  audio.src = "src/music/pop.mp3"
  audio.autoplay = true
}