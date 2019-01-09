

const RADIUS = 40;

var renderer,camera,scene,Ball;


class ball{
    
    constructor(){

    }

    shoot(){

    }

}

function init(){
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#mycanvas'),
    })
    renderer.setSize(innerWidth,innerHeight);
    renderer.shadowMap.enable = true;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera()
    camera.position.set(0,0,0);
    controls = new THREE.OribitControls(camera,renderer,domElement);

    initTable();
    initBall();
}

function initTable(){

}

function initBall(){

}

function animation(){

    //
    camera.lookAt(new THREE.Vector3(0,80,0));
    controls.update();

    renderer.render(scene, camera);
    // request next frame
    requestAnimationFrame(amination);
}

$(document).on('keydown',(event)=>{

    //L
    if(event.keyCode===76){
        
    }

});


init();
animate();
