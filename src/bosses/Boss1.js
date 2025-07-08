export default class Boss1 {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, 'boss1');
    // ... 추가 로직 ...
  }

  // ... 메서드들 ...
}
