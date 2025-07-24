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
   
    // 📌 카메라 안에 있는지 확인
    const camera = this.scene.cameras.main;
    if (
      x < camera.worldView.x || x > camera.worldView.x + camera.width ||
      y < camera.worldView.y || y > camera.worldView.y + camera.height
    ) {
      return; // 화면 밖이면 발사 안 함
    }

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

  fireAtPlayer(x, y, bulletKey, speed = 300) {
    if (!this.scene.player || !this.bullets) return;

    // 📌 카메라 안에 있는지 확인
    const camera = this.scene.cameras.main;
    if (
      x < camera.worldView.x || x > camera.worldView.x + camera.width ||
      y < camera.worldView.y || y > camera.worldView.y + camera.height
    ) {
      return; // 화면 밖이면 발사 안 함
    }

    const bullet = this.bullets.get(x, y, bulletKey);

    if (!bullet) return;

    bullet.setActive(true);
    bullet.setVisible(true);
    bullet.body.enable = true;

    // 플레이어 방향 계산
    const targetX = this.scene.player.x;
    const targetY = this.scene.player.y;

    const angle = Phaser.Math.Angle.Between(x, y, targetX, targetY);

    const velocityX = Math.cos(angle) * speed;
    const velocityY = Math.sin(angle) * speed;

    bullet.setVelocity(velocityX, velocityY);
    bullet.setRotation(angle); // 총알 방향 시각화
  }  

  fireFixedSpread(x, y, bulletKey, speed = 300, angleDeg = 270, spreadDeg = 40) {

  }  

  fireTripleBurstAtPlayer(x, y, bulletKey, speed = 300, delay = 150) {

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
