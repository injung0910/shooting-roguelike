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
