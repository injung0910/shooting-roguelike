export default class EnemyBulletManager {
  constructor(scene) {
    this.scene = scene;

    this.bullets = this.scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      maxSize: 100,
      runChildUpdate: true
    });

    this.defaultSpeed = 400;
  }

  fire(x, y, bulletKey = 'bullets4', speed = this.defaultSpeed) {
    const bullet = this.bullets.get(x, y, bulletKey);
    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.body.enable = true;
      bullet.setVelocityY(speed);
      bullet.setDepth(10);
    }
  }

  fireWithAngle(x, y, angle, bulletKey = 'bullets4', speed = 150) {
    console.log('fire!')
    const bullet = this.bullets.get(x, y, bulletKey);
    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.body.enable = true;

      bullet.setVelocity(
        Math.cos(angle) * speed,
        Math.sin(angle) * speed
      );

      bullet.setRotation(angle); // 시각적으로 방향 맞추기
      bullet.setDepth(10);
    }
  }

  update() {
    this.bullets.children.iterate(bullet => {
      if (bullet && bullet.active && bullet.y > this.scene.scale.height + 50) {
        this.bullets.killAndHide(bullet);
        bullet.body.enable = false;
      }
    });
  }

  getGroup() {
    return this.bullets;
  }

} 
