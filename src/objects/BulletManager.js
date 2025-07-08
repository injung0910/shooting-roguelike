export default class BulletManager {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.powerLevel = 1;
    this.lastFired = 0;

    this.bullets = scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      maxSize: 100
    });

    // 화면 밖 총알 제거
    scene.physics.world.on('worldbounds', (body) => {
      const sprite = body.gameObject;
      if (sprite.texture.key === 'bullets') {
        sprite.destroy();
      }
    });
  }

  fireBullet() {
    const x = this.player.x;
    const y = this.player.y - 20;

    if (this.powerLevel === 1) {
      this.fireSingleBullet(x, y);
    } else if (this.powerLevel === 2) {
      this.fireSingleBullet(x - 10, y);
      this.fireSingleBullet(x + 10, y);
    } else if (this.powerLevel >= 3) {
      this.fireSingleBullet(x - 15, y);
      this.fireSingleBullet(x, y);
      this.fireSingleBullet(x + 15, y);
    }
  }

  fireSingleBullet(x, y) {
    const bullet = this.bullets.get(x, y, 'bullets', 1);
    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.setVelocityY(-500);
      bullet.setScale(1.5);
      bullet.setCollideWorldBounds(true);
      bullet.body.onWorldBounds = true;
    }
  }

  increasePower() {
    if (this.powerLevel < 3) this.powerLevel++;
  }

  update(time) {
    if (this.scene.input.activePointer.isDown && time > this.lastFired + 200) {
      this.fireBullet();
      this.lastFired = time;
    }
  }
}