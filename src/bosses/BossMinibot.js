export default class BossMinibot extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, direction = 'left') {
    super(scene, x, y, 'boss01_bot');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.hp = 500; // 미니봇 체력

    this.scene = scene;
    this.setDepth(20);
    this.setOrigin(0.5);

    // 대각선 이동
    const speedX = direction === 'left' ? -280 : 280;
    const speedY = 100;
    this.setVelocity(speedX, speedY);

    // 도착 후 정지 위치로 대략 0.8초 뒤에 멈춤
    this.scene.time.delayedCall(800, () => {
      this.setVelocity(0, 0); // 정지

      // 그 자리에 고정
      const targetX = this.x;
      const targetY = this.y;
      this.setPosition(targetX, targetY);

      // 발사 타이머 시작
      this.fireTimer = this.scene.time.addEvent({
        delay: Phaser.Math.Between(1000, 2000),
        callback: () => this.fire(),
        loop: true
      });
    });

  }

  fire() {
    if (!this.scene || !this.active) return;
    this.scene.boss.bossBulletManager.fireAtPlayer(this.x, this.y, 'enemy_bullet1', 1,200);
  }

  takeDamage(damage = 10) {
    this.hp -= damage;

    // 피격
    this.scene.game.effectManager.flashRed(this);

    if (this.hp <= 0) {
        // 이펙트
        this.scene.game.effectManager.smallExplosion(this.x, this.y);

        // 점수
        this.scene.player.gameStatusManager.addScore(500);

        // 사운드
        this.scene.game.audioManager.playSFX('sfx_enemy_explosion');

        this.destroyBot();
    }
  }

  destroyBot() {
    if (this.fireTimer) {
      this.fireTimer.remove();
    }
    this.destroy();
  }
}