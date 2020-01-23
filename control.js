//document.addEventListener("keydown",direction);

document.onclick = function(event){
    if(event.which == 1){
        d="MOUSE_LEFT"; 
        cl_x=event.clientX;     
        cl_y=event.clientY; 
        down.play();   
    }
}

document.oncontextmenu= function(event) {
    event.preventDefault();
    d="MOUSE_RIGHT";    
    cl_x=event.clientX;     
    cl_y=event.clientY;
    up.play();
}
