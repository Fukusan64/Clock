window.onload = () => {
  //# 初期化処理

  // 更新処理
  function update() {

    // 次の描画をブラウザに予約
    requestAnimationFrame(() => update());
  }

  //# 画面更新のときに使う関数を作る
  // 中心点,角度,半径から座標を計算する関数
  function getPos() {
  }

  //文字盤を描画する関数
  function drawFace() {
  }

  // 針を描画する関数
  function drawHand() {
  }

  // 起動
  update();
};
