export default class Explosion {
  constructor(scene, x, y, scale = 0.5) {
    this.scene = scene;
    this.sprite = scene.add.sprite(x, y, 'explosion1');
    this.sprite.setScale(scale);
    this.sprite.play('explosion1');
    this.sprite.on('animationcomplete', () => {
      this.sprite.destroy();
    });
  }
}