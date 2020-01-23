
// загрузка изображений

var hidden_field = new Image();
hidden_field.src ="img/hidden_field.png";

var field = new Image();
field.src = "img/field.png";

var bomb = new Image();
bomb.src = "img/bomb.png";

var active_bomb = new Image();
active_bomb.src = "img/active_bomb.png";

var background = new Image();
background.src = "img/background.jpg";

var fl = new Image();
fl.src = "img/flag.png";

// загрузка аудио

var dead = new Audio();
var up = new Audio();
var down = new Audio();
var fon = new Audio();

dead.src = "audio/dead.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";
fon.src = "audio/bm.mp3";

var size_one_field = 32;
var count_field = 10;
var score=0;

var count_bombs = 25;

var bombs = [];    

//hf - скрытое поле, of - открытое поле, ab - поле с открытой миной(проигрыш), 
//hb - поле с ненайденной миной, fl - флаг на участке поля без мины, bf - флаг на мине

var game_field;
var count_field_bomb;

var start = true;
var cl_x=-100;
var cl_y=-100;
var score_str="";
let d;