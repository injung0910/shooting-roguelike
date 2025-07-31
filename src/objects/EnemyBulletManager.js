export default class EnemyBulletManager {
  constructor(scene) {
    this.scene = scene;

    this.bullets = this.scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      maxSize: 100,
      runChildUpdate: true
    });

    this.defaultSpeed = 400;
  }

  fire(x, y, bulletKey = 'enemy_bullet1', frame = 1, speed = this.defaultSpeed) {

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
      bullet.setFrame(frame); // 기본 프레임 설정
    }
  }

  fireWithAngle(x, y, angle, bulletKey = 'enemy_bullet1', frame = 1, speed = 150) {
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
      bullet.setFrame(frame); // 기본 프레임 설정
    }
  }

  fireAtPlayer(x, y, bulletKey = 'enemy_bullet1', frame = 1, speed = 500) {
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

    if (bullet) {
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
      bullet.setFrame(frame); // 기본 프레임 설정
    }
  }

  fireSpread(x, y, baseAngle, count, bulletKey = 'enemy_bullet1', frame = 0, speed) {
    // 📌 카메라 안에 있는지 확인enemy_bullet1
    const camera = this.scene.cameras.main;
    if (
      x < camera.worldView.x || x > camera.worldView.x + camera.width ||
      y < camera.worldView.y || y > camera.worldView.y + camera.height
    ) {
      return; // 화면 밖이면 발사 안 함
    }

    const spread = Phaser.Math.DegToRad(15); // 탄 간격 (각도)
    const half = Math.floor(count / 2);

    for (let i = 0; i < count; i++) {
      const angleOffset = (i - half) * spread;
      const angle = baseAngle + angleOffset;

      const bullet = this.bullets.get(x, y, bulletKey);

      if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.enable = true;

        bullet.setVelocity(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed
        );

        bullet.setRotation(angle); // 총알 방향
        bullet.setDepth(10);       // z-index
        bullet.setFrame(frame); // 기본 프레임 설정
      }
    }
  }

  fireTripleBurstAtPlayer(x, y, bulletKey = 'enemy_bullet1', frame = 1, speed = 300, delay = 100) {
    for (let i = 0; i < 3; i++) {
      this.scene.time.delayedCall(delay * i, () => {
        this.fireAtPlayer(x, y, bulletKey, frame, speed);
      });
    }
  }

  update() {
    this.bullets.children.iterate(bullet => {
      if (!bullet || !bullet.active) return;

      const outOfBounds =
        bullet.y < -50 ||
        bullet.y > this.scene.scale.height + 50 ||
        bullet.x < -50 ||
        bullet.x > this.scene.scale.width + 50;

      if (outOfBounds) {
        bullet.disableBody(true, true);
        this.bullets.killAndHide(bullet);
        bullet.body.enable = false;
      }
    });
  }

  getGroup() {
    return this.bullets;
  }

} 
