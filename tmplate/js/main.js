window.onload = () => {
  //ここに初期化処理を書く
  const update = () => {
    //ここに更新処理を書く
    requestAnimationFrame(update);
  };
  update();
}
