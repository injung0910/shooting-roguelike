// ItemManager.js
export default class ItemManager {
  constructor(scene) {
    this.scene = scene;

    this.group = scene.physics.add.group();
  }

  spawn(x, y, type) {
    const item = this.group.create(x, y, type);
    item.type = type; // 'damage', 'speed', 'shield' 등
    return item;
  }

  update() {
    this.group.children.iterate(item => {
      if (item && item.y > this.scene.scale.height + 50) {
        item.destroy(); // 화면 밖으로 나간 아이템 제거
      }
    });
  }
}