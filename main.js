const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse} = Matter;

const width = window.innerWidth;
const height = window.innerHeight;

const engine = Engine.create();
const {world} = engine;
let canvas = document.querySelector(".draw")
const render = Render.create({
    element: canvas,
    engine: engine,
    options: {
        width,
        height,
        wireframes:false,
        background: 'transparent'
    }
});
engine.world.gravity = { x: 0, y: 0.1 }; 


Render.run(render);
Runner.run(Runner.create(), engine);
World.add(world, MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
}));

const halfWidth = window.innerWidth / 2;
const halfHeight = window.innerHeight / 2;

//walls 

const walls = [
    Bodies.rectangle(halfWidth, 0, width, 1, { isStatic: true ,render: {
        fillStyle: 'rgba(0, 0, 0, 0)'
    }}),
    Bodies.rectangle(halfWidth, height, width, 1, { isStatic: true,render: {
        fillStyle: 'rgba(0, 1, 0, 1)'
    } }),
    Bodies.rectangle(0, halfHeight, 1, height, { isStatic: true,render: {
        fillStyle: 'rgba(0, 0, 0, 0)'
    } }),
    Bodies.rectangle(width, halfHeight, 1, height, { isStatic: true,render: {
        fillStyle: 'rgba(0, 0, 0, 0)'
    } })
];

World.add(world, walls);


const loadImage = (onSuccess, onError) => {
    const randomNum = Math.floor(Math.random() * 6) + 1;
    
    let url = `https://cdn.jsdelivr.net/gh/mgohar/Misha_particals_anim@0.0.1/t${randomNum}.png`
    const img = new Image();
    img.onload = () => {
      onSuccess(img.src);
    };
    
    img.src = url;
  };


  
let pMouse={x:0,y:0};
let sticKCircle= null

loadImage( url => {
    console.log("Success");
    sticKCircle = Bodies.circle(pMouse.x, pMouse.y, 10, {
        render: {
          sprite: {
            texture: url // set texture here
          }
        }
      });
      World.add(world, sticKCircle);
  }
);



const mouse = Mouse.create(render.canvas);
document.addEventListener("mousemove", (event) => {
    const mousePosition = mouse.position;
    pMouse=mouse.position;
    if(sticKCircle){
        sticKCircle.position.x = mouse.position.x;
        sticKCircle.position.y = mouse.position.y;   
    }
});

let isStatic=true;
let circleCount=0;

function CreateCircles() {
    circleCount++;
    let circleElem=null;
    loadImage( url => {
        console.log("Success");
        circleElem = Bodies.circle(pMouse.x, pMouse.y, 10, {
            render: {
              sprite: {
                texture: url // set texture here
              }
            }
          });
          circleElem.position.y+=5;
          World.add(world, circleElem);
      }
    );
    
   
    if(circleCount>20){
            World.remove(world, walls[1]);
            
            // const addBottomBoundry=setTimeout(() => {
               
                const newBottomBoundary = Bodies.rectangle(halfWidth, height, width, 1, { isStatic: true,render: {
                    fillStyle: 'rgba(0, 1, 0, 1)'
                } });
                World.add(world, newBottomBoundary);
                const removeBottomBoundry=setTimeout(() => {
                    World.remove(world, newBottomBoundary);
                    circleCount=0;
                }, 2000);
                // clearTimeout(removeBottomBoundry);
            // }, 500);
            // clearTimeout(addBottomBoundry);

            
        
    }
   
}
setInterval(() => {
    CreateCircles();
}, 12);


 