var options = ['/assets/images/jb-16.png']
var flagImage = options[Math.floor(Math.random() * options.length)];
var pins = [];
for (var j=0;j<=cloth.h;j++)
pins.push(cloth.index(0, j));

var stats;
var camera, scene, renderer;

var clothGeometry;
var sphere;
var object, arrow;

var Flag3D = {
  init: function(imageData){
    this.container = $('.js-flag-canvas');
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x000000, 1000, 10000 );
    scene.fog.color.setHSV( 0.6, 0.2, 1 );
    // camera
    camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.y = 50;
    camera.position.z = 1500;
    scene.add( camera );
    // lights
    var light, materials;
    scene.add( new THREE.AmbientLight( 0x666666 ) );
    light = new THREE.DirectionalLight( 0xffffff, 1.75 );
    light.color.setHSV( 0.6, 0.125, 1 );
    light.position.set( 50, 200, 100 );
    light.position.multiplyScalar( 1.3 );
    light.castShadow = true;
    //light.shadowCameraVisible = true;
    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;
    var d = 300;
    light.shadowCameraLeft = -d;
    light.shadowCameraRight = d;
    light.shadowCameraTop = d;
    light.shadowCameraBottom = -d;
    light.shadowCameraFar = 1000;
    light.shadowDarkness = 0.5;
    scene.add( light );
    light = new THREE.DirectionalLight( 0xffffff, 0.35 );
    light.color.setHSV( 0.3, 0.95, 1 );
    light.position.set( 0, -1, 0 );
    scene.add( light );
    // cloth material
    var clothTexture;
    if(imageData !== undefined){
      // var buffer = imageData.data.buffer;
      // clothTexture = new THREE.DataTexture(buffer, imageData.width, imageData.height);
      imageData.crossOrigin = 'Anonymous'
      clothTexture = THREE.ImageUtils.loadTexture( imageData.src );
    }else{
      clothTexture = THREE.ImageUtils.loadTexture( flagImage );
    }
    clothTexture.wrapS = clothTexture.wrapT = THREE.RepeatWrapping;
    clothTexture.anisotropy = 16;
    materials = [
      new THREE.MeshPhongMaterial( { alphaTest: 0.5, ambient: 0xffffff, color: 0xffffff, specular: 0x030303, emissive: 0x111111, shiness: 10, perPixel: true, metal: false, map: clothTexture, doubleSided: true } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true, transparent: true, opacity: 0.9 } )
    ];
    // cloth geometry
    clothGeometry = new THREE.ParametricGeometry( clothFunction, cloth.w, cloth.h, true );
    window.clothGeometry = clothGeometry;
    clothGeometry.dynamic = true;
    clothGeometry.computeFaceNormals();
    var uniforms = { texture:  { type: "t", value: 0, texture: clothTexture } };
    var vertexShader = document.getElementById( 'vertexShaderDepth' ).textContent;
    var fragmentShader = document.getElementById( 'fragmentShaderDepth' ).textContent;
    // cloth mesh
    object = new THREE.Mesh( clothGeometry, materials[ 0 ] );
    object.position.set( 0, 0, 0 );
    object.castShadow = true;
    object.receiveShadow = true;
    scene.add( object );
    object.customDepthMaterial = new THREE.ShaderMaterial( { uniforms: uniforms, vertexShader: vertexShader, fragmentShader: fragmentShader } );
    // poles
    var poleGeo = new THREE.CubeGeometry( 14, 750, 2 );
    var poleMat = new THREE.MeshPhongMaterial( { color: 0x4A4A4A, specular: 0x111111, shiness: 0, perPixel: true } );
    var mesh = new THREE.Mesh( poleGeo, poleMat );
    mesh.position.y = -175; //-250
    mesh.position.x = -4;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add( mesh );
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    this.container[0].appendChild( renderer.domElement );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.physicallyBasedShading = true;
    renderer.shadowMapEnabled = true;
    var _this = this;
    window.addEventListener( 'resize', function(){
      _this.onResize();
    });
    this.animate();
    this.onResize();
  },
  onResize: function(){
    var h = this.container.height();
    camera.aspect = window.innerWidth / h;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, h);
  },
  animate: function(){
    var _this = this;
    requestAnimationFrame(function(){
      _this.animate();
    });
    var time = Date.now();
    // windStrength = Math.cos( time / 7000 ) * 100 + 200;
    // windStrength = 100;
    windForce.set( Math.sin( time / 2000 ), Math.cos( time / 3000 ), Math.sin( time / 1000 ) ).normalize().multiplyScalar( windStrength );
    // windForce.set(2000, 0, 1000).normalize().multiplyScalar(windStrength);
    simulate(time);
    this.render();
    // stats.update();
  },
  toggleWind: function(value){
    // window.wind = value;
    if(value){
      windStrength = 300;
    }else{
      windStrength = 0;
    }
  },
  render: function(){
    var timer = Date.now() * 0.0002;
    var p = cloth.particles;
    for ( var i = 0, il = p.length; i < il; i ++ ) {
      clothGeometry.vertices[ i ].copy( p[ i ].position );
    }
    clothGeometry.computeFaceNormals();
    clothGeometry.computeVertexNormals();
    clothGeometry.normalsNeedUpdate = true;
    clothGeometry.verticesNeedUpdate = true;
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
  }
};

window.Flag3D = Flag3D;
