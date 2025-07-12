export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type, status) {
    super(scene, x, y, type);
    this.scene = scene;
    this.status = status;
    this.hp = status.hp;
    this.elapsed = 0;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setVelocityY(this.status.speed);

    this.fireTimer = scene.time.addEvent({
      delay: this.status.fireRate,
      callback: this.fire,
      callbackScope: this,
      loop: true
    });
  }

  update(time, delta) {
    this.elapsed += delta;

    if (this.status.pattern === 'zigzag') {
      this.x += Math.sin(this.elapsed * 0.005) * 2;
    }

    // 죽었는지 체크
    if (this.hp <= 0) {
      this.fireTimer.remove();
      this.destroy();
    }
  }

  takeDamage(amount) {
    this.hp -= amount;
  }

  fire() {
    const bullet = this.scene.physics.add.image(this.x, this.y, this.status.bulletKey);
    bullet.setVelocityY(200);
  }
}