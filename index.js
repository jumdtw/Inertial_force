

const Table_RADIUS = 40;
const TIME_STEP = 1/30;
const Table_height = 10;


var renderer,camera,camera_point,scene,Ball,Table;
var camera_angle = 0;
var Ball_radius = 5;
var view_flag = 1; //sub
class shoot_ball{
    constructor(ball){
        this.body = ball;
        this.moveflag = 0;
        this.angle = 0;
    }

    shoot(){
        this.moveflag = 1;
    }

    reset(){
        this.body.position.set(0,Table_height/2+Ball_radius/2,0);
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
    camera.position.set(0,Table_height+1,0);
    let geometry,material;
    geometry = new THREE.SphereGeometry(1);
    material = new THREE.MeshLambertMaterial({color: 0xFF0000});
    camera_point = new THREE.Mesh(geometry,material);
    camera_point.position.set(0,Table_height+1,0);
    scene.add(camera_point);
    controls = new THREE.OrbitControls(camera,renderer.domElement);

    initLights();
    initTable();
    initBall();
}

// initialize lights
function initLights() {
    var directionalLight, ambientLight, spotlight;
    directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set(0, 50, 50);
    //directionalLight.castShadow = true;
    scene.add(directionalLight);
    spotlight = new THREE.SpotLight(0xFFFFFF, 2, 100, Math.PI / 4, 1);
    // ライトに影を有効にする
    spotlight.castShadow = true;
    scene.add(spotlight);
}

function initTable(){
    let geometry,material;
    geometry = new THREE.CylinderGeometry(Table_RADIUS,Table_RADIUS,Table_height/2,32);
    material = new THREE.MeshLambertMaterial({color: 0x777777});
    table = new THREE.Mesh(geometry,material);
    scene.add(table);
}

function initBall(){
    let ball,geometry,material;
    geometry = new THREE.SphereGeometry(Ball_radius);
    material = new THREE.MeshStandardMaterial({color: 0xFFFF00});
    ball = new THREE.Mesh(geometry,material);
    ball.receiveShadow = true;
    Ball =  new shoot_ball(ball);
    Ball.body.position.set(0,Table_height/2+Ball_radius/2,0)
    scene.add(Ball.body);
}

function animation(){

    if(Ball.moveflag){
        Ball.body.position.x += 0.5 * Math.cos(Ball.angle);
        Ball.body.position.z += 0.5 * Math.sin(Ball.angle);
    }else{
        Ball.angle += 0.01;
    }
    
    camera_angle += 0.01;
    if(view_flag){
        camera.position.x = Table_RADIUS * Math.cos(camera_angle);
        camera.position.y = Table_height+1;
        camera.position.z = Table_RADIUS * Math.sin(camera_angle);
    }

    camera_point.position.x = Table_RADIUS * Math.cos(camera_angle);
    camera_point.position.z = Table_RADIUS * Math.sin(camera_angle);
    //
    camera.lookAt(new THREE.Vector3(0,0,0));
    //only Subjectivity
    controls.update();

    renderer.render(scene, camera);
    // request next frame
    requestAnimationFrame(animation);
}

$('#reset_other').on('click',Objective);
$('#reset_host').on('click',Subjectivity);

function Objective(){
    console.log('a');
    view_flag = 0;
    camera.position.set(50,80,55);
    Ball.angle = 0;
    Ball.moveflag = 0;
    camera_angle = 0;
    Ball.reset();
}

function Subjectivity(){
    console.log()
    view_flag = 1;
    Ball.angle = 0;
    Ball.moveflag = 0;
    camera_angle = 0;
    Ball.reset();
}

$(document).on('keydown',(event)=>{

    //L
    if(event.keyCode===76){
        Ball.shoot();
    }

});


init();
animation();
