var options = ['/assets/images/12190-new-zealand-new-light.jpg']
var flagImage = options[Math.floor(Math.random() * options.length)];
var pins = [];
for (var j=0;j<=cloth.h;j++)
pins.push(cloth.index(0, j));

// if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var stats;
var camera, scene, renderer;

var clothGeometry;
var sphere;
var object, arrow;
var rotate = false;

var Flag3D = {
  init: function(){
    this.container = $('.js-flag-canvas');
    // document.body.appendChild( container );
    // scene
    scene = new THREE.Scene();
    // scene.fog = new THREE.Fog( 0x000000, 1000, 10000 );
    // scene.fog.color.setHSV( 0.6, 0.2, 1 );
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
    var clothTexture = THREE.ImageUtils.loadTexture( flagImage );
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
    // sphere
    var ballGeo = new THREE.SphereGeometry( ballSize, 20, 20 );
    var ballMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff } );
    sphere = new THREE.Mesh( ballGeo, ballMaterial );
    window.sphere = sphere;
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add( sphere );
    // arrow
    arrow = new THREE.ArrowHelper( new THREE.Vector3( 0, 1, 0 ), new THREE.Vector3( 0, 0, 0 ), 50, 0xff0000 );
    arrow.position.set( -200, 0, -200 );
    //scene.add( arrow );
    // // ground
    // var initColor = new THREE.Color( 0x00ff00 );
    // initColor.setHSV( 0.25, 0.85, 0.5 );
    // var initTexture = THREE.ImageUtils.generateDataTexture( 1, 1, initColor );
    // var groundMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: initTexture, perPixel: true } );
    // var groundTexture = THREE.ImageUtils.loadTexture( "/assets/images/grasslight-big.jpg", undefined, function() { groundMaterial.map = groundTexture } );
    // groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    // groundTexture.repeat.set( 25, 25 );
    // groundTexture.anisotropy = 16;
    // var mesh = new THREE.Mesh( new THREE.PlaneGeometry( 20000, 20000 ), groundMaterial );
    // mesh.position.y = -250;
    // mesh.rotation.x = - Math.PI / 2;
    // mesh.receiveShadow = true;
    // scene.add( mesh );
    // poles
    var poleGeo = new THREE.CubeGeometry( 5, 750, 5 );
    var poleMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, shiness: 100, perPixel: true } );
    var mesh = new THREE.Mesh( poleGeo, poleMat );
    mesh.position.y = -175; //-250
    mesh.position.x = 0;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add( mesh );
    var gg = new THREE.CubeGeometry( 10, 10, 10 );
    var mesh = new THREE.Mesh( gg, poleMat );
    mesh.position.y = -250;
    mesh.position.x = 0; //125
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add( mesh );
    //
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    // renderer.setClearColor( scene.fog.color );
    this.container[0].appendChild( renderer.domElement );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.physicallyBasedShading = true;
    renderer.shadowMapEnabled = true;
    //
    // stats = new Stats();
    // stats.domElement.style.position = 'absolute';
    // stats.domElement.style.top = '0px';
    // container.appendChild( stats.domElement );
    // stats.domElement.children[ 0 ].children[ 0 ].style.color = "#aaa";
    // stats.domElement.children[ 0 ].style.background = "transparent";
    // stats.domElement.children[ 0 ].children[ 1 ].style.display = "none";
    //
    var _this = this;
    window.addEventListener( 'resize', function(){
      _this.onResize();
    });
    sphere.visible = !true
    this.animate();
    this.onResize();
  },
  onResize: function(){
    console.log(this.container.height())
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
    windStrength = Math.cos( time / 7000 ) * 100 + 200;
    windForce.set( Math.sin( time / 2000 ), Math.cos( time / 3000 ), Math.sin( time / 1000 ) ).normalize().multiplyScalar( windStrength );
    arrow.setLength( windStrength );
    arrow.setDirection( windForce );
    simulate(time);
    this.render();
    // stats.update();
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
    sphere.position.copy( ballPosition );
    if ( rotate ) {
      camera.position.x = Math.cos( timer ) * 1500;
      camera.position.z = Math.sin( timer ) * 1500;
    }
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
  }
};

window.Flag3D = Flag3D;

// module.exports = Flag3D;
