let count = 1;
let scale = + document.querySelector('#scale').value;
let size = + document.querySelector('#size').value;
let countElements =+ document.querySelector('#elements').value;
let fillColor = document.querySelector('#fillColor').value;
let strokeColor = document.querySelector('#strokeColor').value;
let shadow = document.querySelector('#shadow').checked;
let shadowColor = document.querySelector('#shadowColor').value;
window.addEventListener('load',() => {
    //canvas setup
    const canvas = document.querySelector('#canvas');
    //get ctx from canvas
    const ctx = canvas.getContext('2d');
    //set width of canvas
    canvas.width = window.innerWidth;
    //set height - 100 of canvas
    canvas.height = window.innerHeight - 100;

    //add event listener to button with id refresh and callback refresh 
    addEvent('#refresh','click',() => refresh(canvas,ctx));
    //add eventn for resize event and resize canvas
    window.addEventListener('resize',() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 100;
        refresh(canvas,ctx);
    });
    // use addEvent for inputs with id  scale, size, elements and use function refresh
    addEvent('#scale','input',() => {
        scale = + document.querySelector('#scale').value;
        refresh(canvas,ctx);
    });
    addEvent('#size','input',() => {
        size = + document.querySelector('#size').value;
        refresh(canvas,ctx);
    });
    addEvent('#elements','input',() => {
        countElements =+ document.querySelector('#elements').value;
        refresh(canvas,ctx);
    });

    // use addeEvent for fill and stroke color and use function refresh
    addEvent('#fillColor','input',() => {
        fillColor = document.querySelector('#fillColor').value;
        refresh(canvas,ctx);
    });
    addEvent('#strokeColor','input',() => {
        strokeColor = document.querySelector('#strokeColor').value;
        refresh(canvas,ctx);
    });
    // use addEvent for shadowColor and use function refresh
    addEvent('#shadowColor','input',() => {
        shadowColor = document.querySelector('#shadowColor').value;
        if (shadow) {
            ctx.shadowColor = shadowColor;
            refresh(canvas,ctx);
        }
    });

    //use addEvent for shadow and use function refresh
    addEvent('#shadow','change',() => {
        shadow = document.querySelector('#shadow').checked;
        if (shadow) {
            ctx.shadowColor = shadowColor;
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
        } else {
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        }
        refresh(canvas,ctx);
    });


    animate();
});


function draw(canvas,ctx) {
    //calculate angle
    let angle = count * 0.1;
    //calculate radius
    let radius = scale * Math.sqrt(count);
    //calculate posX from angle and radius
    let posX = radius * Math.sin(angle) + canvas.width / 2;
    //calculate posY from angle and radius
    let posY = radius * Math.cos(angle) + canvas.height / 2;

    //draw  circle with color = fillColor and fill with  stroke = strokeColor and shadow
    ctx.beginPath();
    ctx.arc(posX, posY, size, 0, 2 * Math.PI);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    //increase count
    count++;
  }

  function animate() {
    const canvas = document.querySelector('#canvas');
    //get ctx from canvas
    const ctx = canvas.getContext('2d');
    draw(canvas,ctx);
    if (count > countElements) return;
    window.requestAnimationFrame(animate);
  }
  
// refresh canvas with canvas and ctx
function refresh(canvas,ctx) {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //set count to 0
    count = 0;
    animate();
}


// create addEvent function for add event listener in input use querySelector and addEventListener with callback
function addEvent(selector,event,callback) {
    document.querySelector(selector).addEventListener(event,callback);
}
