function end_game(){
    alert("Вы проиграли");
    for(let i=0;i<count_field;i++){
        for(let j=0;j<count_field;j++){
            if(game_field[i][j]=="hb") game_field[i][j]="ab";
            if(game_field[i][j]=="bf"){
            score++;            
            }
        }
    }
    document.getElementById("score").innerHTML=score;
    var tab = document.getElementById("tab");
    var scoretab = document.getElementById("scoretab");    
    score_str+="Счёт: "+score+"<br>";     
    document.getElementById("scoretab").innerHTML=score_str;
    setCookie("scoretab",score_str);
    dead.play(); 
}

function setCookie(name, value, options = {}) {

    options = {
      path: '/',
      // при необходимости добавьте другие значения по умолчанию     
    };
  
    // if (options.expires.toUTCString) {
    //   options.expires = options.expires.toUTCString();
    // }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
  }

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

function open_empty_fields(i,j){
    for(let x=i-1;x<i-1+3;x++){
                for(let y=j-1;y<j-1+3;y++){
                    if((i==0)||(j==0)||(i==count_field-1)||(j==count_field-1)) continue;
                    else if(count_field_bomb[x][y]==0) game_field[x][y]="of";
                }
            }
}

function collision_mouse(){
    if(d=="MOUSE_LEFT"){
        alert(cl_x+"  "+cl_y);
        if((cl_x>=0) && (cl_x<=320)
        &&(cl_y-32>=120)&&(cl_y<=320+120)){
            var x=parseInt((cl_x)/size_one_field);
            var y=parseInt((cl_y-120-32)/size_one_field);
            //alert(cl_x+"  "+(cl_y-120));
            if(game_field[y][x]=="hf"){
                game_field[y][x]="of";
                open_empty_fields(x,y);
            }
            else if(game_field[y][x]=="hb"){
                game_field[y][x]="ab";
                end_game();
            }
            
        }
    }
    else if(d=="MOUSE_RIGHT"){
        if((cl_x>=0) && (cl_x<=320)
        &&(cl_y-32>=120)&&(cl_y<=320+120)){
            var x=parseInt((cl_x)/size_one_field);
            var y=parseInt((cl_y-120-32)/size_one_field);            
            if(game_field[y][x]=="hf") game_field[y][x]="fl";
            else if(game_field[y][x]=="fl") game_field[y][x]="hf";
            else if(game_field[y][x]=="hb")game_field[y][x]="bf";
            else if(game_field[y][x]=="bf") game_field[y][x]="hb";            
        }
    }
    d="NONE";
    cl_x=-100;
    cl_y=-100;
}

function draw(){
        
    collision_mouse();
    for(let i=0;i<count_field;i++){
        for(let j=0;j<count_field;j++){
            if((game_field[i][j]=="hf")||(game_field[i][j]=="hb")){
                var img = document.getElementById("img"+i+j);
                img.src="img/hidden_field.png";                
            }
            else if(game_field[i][j]=="ab"){
                var img = document.getElementById("img"+i+j);
                img.src="img/active_bomb.png";                    
                }
           else if(game_field[i][j]=="of"){                    
                    // ctx.fillStyle = "black";
                    // ctx.font = "32px Changa one";
                    // ctx.fillText(count_field_bomb[i][j],i*size_one_field+10,j*size_one_field+25);
                    var img = document.getElementById("img"+i+j);
                img.src="img/field.png";
                }
           else if((game_field[i][j]=="fl") || (game_field[i][j]=="bf")){
            var img = document.getElementById("img"+i+j);
            img.src="img/flag.png";
                    }   
        }
    }    
}


function start_game(){
    var parent = document.getElementById("sap");
    var child = document.getElementById("sp");
    if((child!=null)||(child!=undefined))
    parent.removeChild(child);
    count_field = 10;
    count_bombs = 10;
    start=true;
    score=0;    
    var bm = document.getElementById("bm");
    var cookie = getCookie("scoretab");    
    document.getElementById("scoretab").innerHTML=cookie;
    bm.play();           
    event_game();    
}

function event_game(){    
    if(start) 
    {
        generation_bomb();
        set_count();
        start=false;
    }
    else draw();    
}

function set_count(){
    count_field_bomb=new Array();
    for(let i=0;i<count_field;i++)
    {
        count_field_bomb[i]=new Array();
        for(let j=0;j<count_field;j++)
        {
            var count=0;
            for(let x=i-1;x<i-1+3;x++)
            {
                for(let y=j-1;y<j-1+3;y++)
                {
                    if((i==0)||(j==0)||(i==count_field-1)||(j==count_field-1)) continue;
                    else if(game_field[x][y]=="hb") count++;
                }
            }
            count_field_bomb[i][j]=count;
        }
    }
}

function generation_bomb(){
    var sap = document.getElementById("sap");
    var all_img = document.createElement("div");     
    all_img.id ="sp";
    all_img.style.width=320;
    all_img.style.height=320;
       

    game_field=new Array();
    for(let i=0;i<count_field;i++){
        game_field[i] = new Array();
        for(let j=0;j<count_field;j++){
            game_field[i][j]="hf";
            var img = document.createElement("img");
            img.src="img/hidden_field.png";
            img.id="img"+i+j;
            img.style.top=(i*32)+120;
            img.style.left=j*32;
            img.style.width=32;
            img.style.height=32;
            all_img.appendChild(img);
        }
    }
    sap.appendChild(all_img);
    

    for(let i=0;i<count_bombs;i++){   
        bombs[i] = {
            x : Math.floor(Math.random()*count_field) * size_one_field,
            y : Math.floor(Math.random()*count_field) * size_one_field
        };
        game_field[parseInt(bombs[i].x/32)][parseInt(bombs[i].y/32)] = "hb";                
    }
}
let game = setInterval(event_game,100);