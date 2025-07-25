// ItemManager.js
export default class ItemManager {
  constructor(scene) {
    this.scene = scene;
    this.group = scene.physics.add.group();
    
  }

  initCollision(player) {
    this.scene.physics.add.overlap(player, this.group, (actualPlayer, collectedItem) => {

      if (collectedItem.type === 'power') {
        actualPlayer.bulletManager.increasePowerLevel(); // bulletManager가 Player 내부에 있어야 함
      }

      collectedItem.destroy();
    },
    null, // 📌 조건 함수에서 항상 true 반환 (무적 여부 상관없이 작동)
    this    
  );
  }

  spawn(x, y, type) {
    const item = this.group.create(x, y, type);
    item.type = type;

    // 애니메이션 재생
    if (type === 'power') {
      item.play('item-power-anim');
    }

    item.amplitude = Phaser.Math.Between(30, 60);
    item.frequency = Phaser.Math.FloatBetween(0.005, 0.01);
    item.startX = x;
    item.startTime = this.scene.time.now;

    this.scene.time.delayedCall(10000, () => {
      if (item.active) item.destroy();
    });

    return item;
  }

  update() {
    const timeNow = this.scene.time.now;

    this.group.children.iterate(item => {
      if (!item || !item.active) return;

      // 지그재그 움직임 적용
      const elapsed = timeNow - item.startTime;
      const offsetX = Math.sin(elapsed * item.frequency) * item.amplitude;
      item.x = item.startX + offsetX;

      // 아래로 천천히 이동
      item.y += 1.2; // 속도 조절 가능
    });
  }

}