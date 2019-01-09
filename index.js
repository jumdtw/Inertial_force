

const Table_RADIUS = 40;
const TIME_STEP = 1/30;
const Table_height = 10;


var renderer,camera,scene,Ball,Table;
var camera_angle = 0;
var Ball_radius = 5;
class ball{

    constructor(ball){
        this.body = ball;
        this.moveflag = 0;
        this.angle = 0;
    }

    shoot(){
        this.moveflag = 1;
    }

}

function init(){
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#mycanvas'),
    })
    renderer.setSize(innerWidth,innerHeight);
    renderer.shadowMap.enable = true;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight);
    camera.position.set(0,Table_height,0);
    controls = new THREE.OribitControls(camera,renderer,domElement);

    initLights();
    initTable();
    initBall();
}

// initialize lights
function initLights() {
    var directionalLight, ambientLight, spotlight;
    directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set(0, 50, 0);
    //directionalLight.castShadow = true;
    scene.add(directionalLight);
    ambientLight = new THREE.AmbientLight(0xFFFFFF);
    scene.add(ambientLight);
    spotlight = new THREE.SpotLight(0xFFFFFF, 2, 100, Math.PI / 4, 1);
    // ライトに影を有効にする
    spotlight.castShadow = true;
    scene.add(spotlight);
}

function initTable(){
    let geometry,material;
    geometry = new THREE.CylinderGeometry(Table_RADIUS,Table_RADIUS,Table_height/2,32);
    material = new THREE.MeshLavertMaterial({color: 0x777777});
    table = new THREE.Mesh(geometry,material);
    scene.add(table);
}

function initBall(){
    let ball,geometry,material;
    geometry = new THREE.SphereGeometry(Ball_radius);
    material = new THREE.MeshLavertMaterial({color: 0xFF00FF});
    ball = new THREE.Mesh(geometry,material);
    Ball =  new ball(ball);
    Ball.body.postion.set(0,Table_height/2+Ball_radius/2,0)
    scene.add(Ball.body);
}

function animation(){

    if(moveflag){
        Ball.body.position.x += 0.5 * Math.cos(Ball.angle);
        Ball.body.position.z += 0.5 * Math.sin(Ball.angle);
    }else{
        Ball.angle += 0.1;
    }
    camera_angle += 0.1;
    camera.position.x = Table_RADIUS * Math.cos(camera_angle);
    camera.position.z = Table_RADIUS * Math.sin(camera_angle);

    //
    camera.lookAt(new THREE.Vector3(0,0,0));
    //only Subjectivity
    //controls.update();

    renderer.render(scene, camera);
    // request next frame
    requestAnimationFrame(amination);
}

$(document).on('keydown',(event)=>{

    //L
    if(event.keyCode===76){
        Ball.shoot();
    }

});


init();
animate();
