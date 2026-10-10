// 表示領域とキャラクター画像をHTMLから取得する
const stage = document.querySelector(".stage");
const hachiwareImage = document.querySelector(".stage img");

// 画像を移動させる幅と、元の位置へ戻す時間を決める
const GAME_SETTINGS = Object.freeze({
  moveOffsetPx: 15,
  moveDuration: 100,
});

// 各矢印キーが、画像をどの方向へ移動させるかを表す
const arrowKeyDirections = Object.freeze({
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
});

// 画像を元の位置へ戻すためのタイマーを保持する
let resetTimer = null;

// 画像の位置を元の位置へ戻す処理
function resetImagePosition() {
  if (hachiwareImage) {
    // translateで、画像を元の位置へ移動させる
    hachiwareImage.style.transform = "translate(0px, 0px)";
  }
}

// 押されたキーを受け取り、画像をその方向へ移動させる処理
function moveImage(key) {
  // 画像が見つからなければ処理を終了する
  if (!hachiwareImage) {
    return;
  }

  // 押されたキーの方向を取得する
  const direction = arrowKeyDirections[key];
  if (!direction) {
    return;
  }

  // 前回の戻し処理が残っていないように、タイマーを解除する
  window.clearTimeout(resetTimer);

  // direction.xとdirection.yを使って、画像を横向き・縦向きに移動させる
  hachiwareImage.style.transform =
    `translate(${direction.x * GAME_SETTINGS.moveOffsetPx}px, ` +
    `${direction.y * GAME_SETTINGS.moveOffsetPx}px)`;

  // 一定時間がたったら、画像を元の位置へ戻す
  resetTimer = window.setTimeout(
    resetImagePosition,
    GAME_SETTINGS.moveDuration,
  );
}

// キーボードのキーが押されたときに処理を行う
function handleKeyDown(event) {
  // 矢印キー以外のキーでは処理をしない
  if (!Object.hasOwn(arrowKeyDirections, event.key)) {
    return;
  }

  // ページの既定動作を止め、矢印キーによるスクロールなどを防ぐ
  event.preventDefault();

  // 押されたキーを画像移動処理へ渡す
  moveImage(event.key);
}

// 表示領域と画像が存在した場合だけ、キー入力を待つ
if (stage && hachiwareImage) {
  window.addEventListener("keydown", handleKeyDown);
}
