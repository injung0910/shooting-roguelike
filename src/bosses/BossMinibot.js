export default class BossMinibot extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, x2) {
    super(scene, x, y, 'boss01_bot');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.hp = 500; // 미니봇 체력

    this.scene = scene;
    this.setDepth(10);
    this.setOrigin(0.5);

    this.setAlpha(0); // 처음엔 보이지 않음
    this.body.setAllowGravity(false);
    this.body.setVelocity(0, 0); // 이동 없음

    // 등장 연출
    const offsetX = x2;
    const targetX = this.x + x2;
    const targetY = this.y + 150;

    this.scene.tweens.add({
      targets: this,
      x: targetX,
      y: targetY,
      alpha: 1,
      duration: 800,
      ease: 'Power2',
      onComplete: () => {
        this.startRandomMovement();
        this.startAttack();
      }
    });
  }

  startRandomMovement() {
    this.moveTimer = this.scene.time.addEvent({
      delay: 1500,
      callback: () => {
        if (!this.active) return;
        const dx = Phaser.Math.Between(-100, 100);
        const dy = Phaser.Math.Between(-50, 50);
        this.setVelocity(dx, dy);
      },
      loop: true
    });
  }

  startAttack() {
    this.fireTimer = this.scene.time.addEvent({
      delay: Phaser.Math.Between(1000, 2000),
      callback: () => this.fire(),
      loop: true
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
        if(this.active){
          this.scene.player.gameStatusManager.addScore(500);
        }

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

  update() {
    const camera = this.scene.cameras.main;
    const minX = camera.worldView.left + this.width / 2;
    const maxX = camera.worldView.right - this.width / 2;
    const minY = camera.worldView.top + this.height / 2;
    const maxY = camera.worldView.bottom - this.height / 2;

    // X축 화면 밖 방지
    if (this.x < minX) {
      this.x = minX;
      this.setVelocityX(Math.abs(this.body.velocity.x)); // 오른쪽으로 튕김
    } else if (this.x > maxX) {
      this.x = maxX;
      this.setVelocityX(-Math.abs(this.body.velocity.x)); // 왼쪽으로 튕김
    }

    // Y축 화면 밖 방지
    if (this.y < minY) {
      this.y = minY;
      this.setVelocityY(Math.abs(this.body.velocity.y));
    } else if (this.y > maxY) {
      this.y = maxY;
      this.setVelocityY(-Math.abs(this.body.velocity.y));
    }
  }
}