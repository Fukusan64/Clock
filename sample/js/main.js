window.onload = () => {
  //# 初期化処理
  // canvas要素を取得
  const canvas = document.getElementById('mainCanvas');
  // 中心座標を設定する
  const center = {x: 200, y: 200};
  // canvasからcontextを取得する
  const ctx = canvas.getContext('2d');
  // 塗りつぶしの色、線の色を黒に設定
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'black';

  //# 更新処理
  function update(ctx, center) {
    // canvas全体をクリア
    ctx.clearRect(0, 0, 400, 400);
    // 文字盤描画
    drawFace(ctx, center);
    // 現在時間取得(滑らかに針を動かすため下の位の値を足している)
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes() + seconds / 60;
    const hours = now.getHours() + minutes / 60;
    // 秒針を描く
    drawHand(
      ctx,
      center,
      seconds / 60 * Math.PI * 2 - Math.PI / 2,
      180,
      2
    );
    // 分針を描く
    drawHand(
      ctx,
      center,
      minutes / 60 * Math.PI * 2 - Math.PI / 2,
      160,
      4
    );
    // 時針を描く
    drawHand(
      ctx,
      center,
      hours / 12 * Math.PI * 2 - Math.PI / 2,
      100,
      10
    );

    // 次の描画をブラウザに予約
    requestAnimationFrame(() => update(ctx, center));
  }

  //# 画面更新のときに使う関数を作る
  //文字盤を描画する関数
  function drawFace(ctx, center) {
    // 枠
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(center.x, center.y, 190, 0, Math.PI * 2);
    ctx.stroke();
    // 目盛り
    ctx.lineWidth = 1;
    // 60回(0から59まで)ループを回す
    for (let i = 0; i < 60; i++) {
      //目盛りの丸の中心点を計算する
      const scaleCenter = getPos(
        center,
        Math.PI * 2 / 60 * i,
        170
      );
      ctx.beginPath();
      if (i % 5 == 0) {
        // 5の倍数分(0,5,10,15,...55分)の目盛りを描く
        //(大きめの丸を描く)
        ctx.arc(
          scaleCenter.x,
          scaleCenter.y,
          4,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      } else {
        // 5の倍数分以外の目盛りを描く(小さめの丸を塗りつぶす)
        ctx.arc(
          scaleCenter.x,
          scaleCenter.y,
          2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
  }

  // 針を描画する関数
  function drawHand(ctx, center, theta, length, width) {
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    const tip = getPos(center, theta, length);
    ctx.lineTo(tip.x, tip.y);
    ctx.stroke();
  }

  // 中心点,角度,半径から座標を計算する関数
  function getPos(center, theta, radius) {
    return {
      x: center.x + radius * Math.cos(theta),
      y: center.y + radius * Math.sin(theta)
    };
  }

  // 起動
  update(ctx, center);
};
