// 描画先となるステージを取得する
const stage = document.querySelector(".stage");

// 3Dオブジェクトやカメラを配置するシーンを作る
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// 透視投影カメラを作る。引数は順に、視野角、縦横比、描画する最短距離、最長距離
const camera = new THREE.PerspectiveCamera(
  75,
  stage.clientWidth / stage.clientHeight,
  0.1,
  1000,
);
camera.position.set(2, 2, 5);
camera.lookAt(0, 0, 0);

// アンチエイリアスを有効にした描画器を作り、ステージに追加する
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(stage.clientWidth, stage.clientHeight);
stage.appendChild(renderer.domElement);

// 立方体の形、面ごとの色、シーンに置く立方体を作る
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// シーンを一度描画する。アニメーションを止めても立方体は表示される
renderer.render(scene, camera);

// 回転アニメーションを使う場合は、以下の処理のコメントを外す
// 1フレームごとの回転量。小さくすると回転が遅くなる
// const rotationSpeed = 0.001;

// 立方体を少しずつ回転させながら、繰り返し描画する
// function animate() {
//   cube.rotation.x += rotationSpeed;
//   cube.rotation.y += rotationSpeed;
//   renderer.render(scene, camera);
//   requestAnimationFrame(animate);
// }

// アニメーションを開始する
// animate();