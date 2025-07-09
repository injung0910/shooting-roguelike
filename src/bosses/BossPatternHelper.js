export default class BossPatternHelper {
  constructor(scene) {
    this.scene = scene;
  }

  /**
   * 특정 방향(angle)으로 총알 발사
   */
  fireBulletAtAngle(x, y, angle, speed, textureKey = 'enemyBullet') {
    const rad = Phaser.Math.DegToRad(angle);
    const vx = Math.cos(rad) * speed;
    const vy = Math.sin(rad) * speed;

    const bullet = this.scene.physics.add.sprite(x, y, textureKey);
    bullet.setVelocity(vx, vy);
    bullet.setAngle(angle);
  }

  /**
   * 원형으로 총알 발사
   */
  fireCirclePattern(x, y, bulletCount, speed, textureKey = 'enemyBullet') {
    const angleStep = 360 / bulletCount;
    for (let i = 0; i < bulletCount; i++) {
      const angle = i * angleStep;
      this.fireBulletAtAngle(x, y, angle, speed, textureKey);
    }
  }

  /**
   * 부채꼴 범위로 총알 발사
   */
  fireSpreadPattern(x, y, centerAngle, spread, count, speed, textureKey = 'enemyBullet') {
    const startAngle = centerAngle - spread / 2;
    const step = spread / (count - 1);
    for (let i = 0; i < count; i++) {
      const angle = startAngle + i * step;
      this.fireBulletAtAngle(x, y, angle, speed, textureKey);
    }
  }
}