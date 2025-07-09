import BossPatternHelper from './BossPatternHelper.js';

export default class Boss1 {
  constructor(scene, x, y) {
    this.scene = scene;

    this.sprite = scene.physics.add.sprite(x, y, 'boss01');
    this.sprite.setScale(1.5);
    this.sprite.setCollideWorldBounds(true);

    this.hp = 300;

    this.initMovement();
    this.initAnimations();

    this.helper = new BossPatternHelper(this.scene);

    // 예: 보스가 원형 총알 패턴 사용
    this.helper.fireCirclePattern(this.sprite.x, this.sprite.y, 12, 200);
  }

  initMovement() {
    // 아래로 내려오다 멈춤
    this.sprite.setVelocityY(50);
    this.scene.time.delayedCall(3000, () => {
      this.sprite.setVelocity(0);
      // 이후 공격 패턴 진입
      this.startAttackPattern();
    });
  }

  initAnimations() {
    if (!this.scene.anims.exists('boss01_fly')) {
      this.scene.anims.create({
        key: 'boss01_fly',
        frames: this.scene.anims.generateFrameNumbers('boss01', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
      });
    }
    this.sprite.play('boss01_fly');
  }

  startAttackPattern() {
    // 간단한 총알 발사 패턴 예시
    this.attackTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.fireBullet();
      },
      loop: true
    });
  }

  fireBullet() {
    // 추후 BulletManager에서 보스용 총알 추가할 수 있음
    console.log('Boss fires a bullet!');
  }

  takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.die();
    }
  }

  die() {
    this.sprite.destroy();
    if (this.attackTimer) this.attackTimer.remove(false);
    // 보스 죽은 후 이벤트 등
  }
}