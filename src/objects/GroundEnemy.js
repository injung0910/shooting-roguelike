export default class GroundEnemy {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, 'groundEnemy');
    this.sprite.setImmovable(true);
    this.sprite.setData('type', 'ground');
    this.sprite.setDepth(1); // 배경보다 위에 그리기

    // 필요 시 자동 발사
    this.fireTimer = scene.time.addEvent({
      delay: 3000,
      callback: this.fireAtPlayer,
      callbackScope: this,
      loop: true
    });
  }

  fireAtPlayer() {
    if (!this.scene.player || !this.scene.player.sprite.active) return;

    const bullet = this.scene.physics.add.sprite(this.sprite.x, this.sprite.y, 'enemyBullet');
    this.scene.physics.moveToObject(bullet, this.scene.player.sprite, 300);

    // 충돌 처리 등은 BulletManager에서 따로 관리 가능
  }

  update() {
    // 필요시 움직임 로직
    // 예: 좌우 반복 움직임
  }

  destroy() {
    this.sprite.destroy();
    this.fireTimer.remove();
  }
}