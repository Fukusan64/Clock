window.onload = () => {
  // canvas要素を取得
  const canvas = document.getElementById('mainCanvas');
  // 中心点を設定する
  const center = { x: 200, y: 200 };
  // 文字盤の半径
  const faceRadius = 190;
  // canvasからcontextを取得する
  const ctx = canvas.getContext('2d');

  //更新処理
  function update(ctx, center, faceRadius) {
    //canvas全体をクリアする代わりに半透明の色で塗りつぶして残像を作る
    //消えない残像が見えにくくなるように白ではなく薄い灰色で塗る(cssで画面全体の色も合わせる)
    ctx.fillStyle = 'rgba(240,240,240,0.25)';
    ctx.fillRect(0, 0, 400, 400);
    // 文字盤描画
    drawFace(ctx, center, faceRadius);
    //現在時間取得(残像を活かすためにあえて針の動きはカクカクにする)
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() + minutes / 60;
    //秒針が一番上に来ているように見せるために秒針を最後に描く
    // 時針
    drawHand(ctx, center, hours / 12 * Math.PI * 2 - Math.PI / 2, 100, 10);
    // 分針
    drawHand(ctx, center, minutes / 60 * Math.PI * 2 - Math.PI / 2, 160, 4);
    // 秒針
    drawHand(ctx, center, seconds / 60 * Math.PI * 2 - Math.PI / 2, 180, 2, 'red');

    // 次の描画をブラウザに予約
    requestAnimationFrame(() => update(ctx, center, faceRadius));
  }

  // 中心点と角度、半径から座標を計算する関数
  function getPos(center, theta, radius) {
    return {
      x: center.x + radius * Math.cos(theta),
      y: center.y + radius * Math.sin(theta),
    };
  }

  //文字盤を描画する関数
  function drawFace(ctx, center, faceRadius) {
    // 枠
    ctx.fillStyle = ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(center.x, center.y, faceRadius, 0, Math.PI * 2);
    ctx.stroke();
    // 目盛り
    const clockScaleRadius = 170;
    ctx.font = '30px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 60; i++) {
      ctx.beginPath();
      const scaleCenter = getPos(center, Math.PI * 2 / 60 * i, clockScaleRadius);
      const numberCenter = getPos(center, Math.PI * 2 / 60 * i - Math.PI / 2, clockScaleRadius - 20);
      if (i % 5 === 0) {
        // 0,5,10,15,...55分の部分
        ctx.arc(scaleCenter.x, scaleCenter.y, 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillText(i / 5, numberCenter.x, numberCenter.y);
      } else {
        ctx.arc(scaleCenter.x, scaleCenter.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // 針を描画する関数
  function drawHand(ctx, center, theta, length, width, color = 'black') {
    ctx.strokeStyle = color;
    //中心から針先に向かう方向の描画
    ctx.lineCap = 'round';//先端を丸める
    ctx.lineWidth = width;
    ctx.beginPath();
    const tip = getPos(center, theta, length);
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(tip.x, tip.y);
    ctx.stroke();
    //中心から後ろに行く方向の描画
    ctx.lineCap = 'butt';//角を残した線にする
    ctx.lineWidth = width + 2;
    ctx.beginPath();
    const end = getPos(center, theta + Math.PI, length / 3);
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }

  // 起動
  update(ctx, center, faceRadius);
}
