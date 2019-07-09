//Iniciação do programa
var width = window.innerWidth;
var height = window.innerHeight;
var viewAngle = 45;
var nearClipping = 0.1;
var farClipping = 9999;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( viewAngle, width / height, nearClipping, farClipping );
var renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true
});	
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );

entrada = 1;
//Criação de objetos

var tubeGeometry = new THREE.CylinderGeometry(0.4,0.4,5,32);
var ballGeometry = new THREE.SphereGeometry(1.1,32,32);

var adenina = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
var citosina = new THREE.MeshLambertMaterial( { color: 0xffff00 } );
var guanina = new THREE.MeshLambertMaterial( { color: 0x0000ff } );
var timina = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
var purpleMaterial = new THREE.MeshLambertMaterial( { color: 0x0000ff } );


var dna = new THREE.Object3D();

var fita = []


dna.position.y = 0

//Definição de posição dos objetos
var light = new THREE.PointLight(0xFFFFFF);
light.shadowMapVisible = true;

light.position.set(5,10,0);

scene.add(light);
scene.add(dna);

var vel1 = 0;
var vel2 = 0;
var tamanho = 0;

//Main
function animate() {
	entradaAux = tamanho;
	entrada = document.getElementById("sequencia").value;
	if(entrada.length%2 == 0){
		tamanho = entrada.length/2;
	}
	if(entradaAux > tamanho){
		dna.remove.apply(dna, dna.children);
	}
	if(entradaAux != tamanho){
		for(var i = -5; i<tamanho-5; i++){
			var primeiroChar = entrada.slice(0,1).toUpperCase();
			var segundoChar = entrada.slice(1,2).toUpperCase();

			if((primeiroChar != 'A' && primeiroChar != 'T' && primeiroChar != 'C' && primeiroChar != 'G') || (segundoChar != 'A' && segundoChar != 'T' && segundoChar != 'C' && segundoChar != 'G')){
				alert("Só se pode inserir os seguintes caracteres: A, T, C, G");
				document.getElementById("sequencia").value = "";
				break;
			}
			entrada = entrada.slice(2);

			if(primeiroChar == 'A'){
				var cylinder = new THREE.Mesh(tubeGeometry, adenina);
				cylinder.rotation.z = 90 * Math.PI/180; 
				cylinder.position.x = -2;
			}
			if(segundoChar == 'A'){
				var cylinder2 = new THREE.Mesh(tubeGeometry, adenina);
				cylinder2.rotation.z = 90 * Math.PI/180; 
				cylinder2.position.x = 3;
			}


			if(primeiroChar == 'C'){
				var cylinder = new THREE.Mesh(tubeGeometry, citosina);
				cylinder.rotation.z = 90 * Math.PI/180; 
				cylinder.position.x = -2;					
			}
			if(segundoChar == 'C'){
				var cylinder2 = new THREE.Mesh(tubeGeometry, citosina);
				cylinder2.rotation.z = 90 * Math.PI/180; 
				cylinder2.position.x = 3;				
			}


			if(primeiroChar == 'G'){
				var cylinder = new THREE.Mesh(tubeGeometry, guanina);
				cylinder.rotation.z = 90 * Math.PI/180; 
				cylinder.position.x = -2;					
			}
			if(segundoChar == 'G'){
				var cylinder2 = new THREE.Mesh(tubeGeometry, guanina);
				cylinder2.rotation.z = 90 * Math.PI/180; 
				cylinder2.position.x = 3;					
			}


			if(primeiroChar == 'T'){
				var cylinder = new THREE.Mesh(tubeGeometry, timina);
				cylinder.rotation.z = 90 * Math.PI/180; 
				cylinder.position.x = -2;				
			}
			if(segundoChar == 'T'){
				var cylinder2 = new THREE.Mesh(tubeGeometry, timina);
				cylinder2.rotation.z = 90 * Math.PI/180; 
				cylinder2.position.x = 3;				
			}

		
			var ballRight = new THREE.Mesh( ballGeometry, purpleMaterial );
			ballRight.position.x = 6;
		
			var ballLeft = new THREE.Mesh( ballGeometry, purpleMaterial );
			ballLeft.position.x = -5;
		
			var row = new THREE.Object3D();
		
			row.add(cylinder);
			row.add(cylinder2);
			row.add(ballRight);
			row.add(ballLeft);
		
			row.position.y = i*2;
			row.rotation.y = 30*i * Math.PI/180;
		
			dna.add(row);
		}
	}

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	camera.position.set(0,0,20);
	var timer = Date.now()*0.001;
	camera.position.x = Math.cos(timer)*50;
	camera.position.z = Math.sin(timer)*50;
	camera.lookAt(scene.position);

}
animate();	