import Enemy from '../objects/Enemy.js';
import EnemyBulletManager from '../objects/EnemyBulletManager.js';

const enemyTypes = {
  bug1 : {
    name : 'bug1',
    speed: 100,
    fireRate: 2000,
    hp: 15,
    bulletKey: 'bullets4',
    pattern: 'straight'
  },
  bug2 : {
    name : 'bug2',
    speed: 100,
    fireRate: 2000,
    hp: 20,
    bulletKey: 'bullets4',
    pattern: 'zigzag'
  },
  bug3 : {
    name : 'bug3',
    speed: 100,
    fireRate: 2000,
    hp: 24,
    bulletKey: 'bullets4',
    pattern: 'straight'
  }
};

export default class EnemyManager {
  constructor(scene) {
    this.scene = scene;
    this.enemies = scene.physics.add.group();

    this.createBugAnimations();

    // EnemyBulletManager 인스턴스 생성
    this.bulletManager = new EnemyBulletManager(scene);

    console.log('this.scene : ' + this.scene);
  }

  spawnLeftEnemy(type) {
    const status = enemyTypes[type];
    const leftPositions = [100, 150, 200];

    console.log('this.scene : ' + this.scene);

    leftPositions.forEach(x => {
      const enemy = this.enemies.create(x, -64, type);
      enemy.play(type);
      enemy.setVelocityY(100);
      enemy.setDepth(10);
      
    });    
  }

  spawnEnemiesFromData(spawnData) {
    spawnData.forEach(({ type, x, delay }) => {
      const status = enemyTypes[type];
      if (!status) {
        console.warn(`Unknown enemy type: ${type}`);
        return;
      }

      this.scene.time.addEvent({
        delay,
        callback: () => {
          let enemy = this.enemies.create(x, -64, type);

          // bug 계열은 애니메이션 play
          if (type.startsWith('bug')) {
            enemy.play(type);
          }

          enemy.setVelocityY(status.speed);
          enemy.setDepth(10);
          enemy.hp = status.hp;
          enemy.bulletKey = status.bulletKey;
          enemy.fireRate = status.fireRate;
          enemy.pattern = status.pattern;

          // ⬇ 총알 발사 루프 등록
          enemy.fireTimer = this.scene.time.addEvent({
            delay: enemy.fireRate,
            callback: () => {
              if (enemy.active) {
                this.bulletManager.fire(enemy.x, enemy.y + 20, enemy.bulletKey, 200);
              }
            },
            loop: true
          });          

        },
        callbackScope: this
      });
    });
  }

  createBugAnimations() {
    for (let i = 1; i <= 6; i++) {
      const key = `bug${i}`;
      if (!this.scene.anims.exists(key)) {
        this.scene.anims.create({
          key,
          frames: this.scene.anims.generateFrameNumbers(key, { start: 0, end: 5 }),
          frameRate: 10,
          repeat: -1
        });
      }
    }
  }

  handleEnemyHit(bullet, enemy) {
    bullet.disableBody(true, true);

    // 적 체력 감소
    enemy.hp -= bullet.damage || 10;

    // 깜빡이기 효과 시작
    this.scene.tweens.add({
      targets: enemy,
      alpha: 0.3,
      duration: 100,
      yoyo: true,
      repeat: 2,
      onComplete: () => {
        enemy.setAlpha(1); // 원래대로 복귀
      }
    });

    if (enemy.hp <= 0) {
      // 폭발 애니메이션
      if (!this.scene.anims.exists('enemy_explosion_small')) {
        this.scene.anims.create({
          key: 'enemy_explosion_small',
          frames: this.scene.anims.generateFrameNumbers('explosion_small', { start: 0, end: 11 }),
          frameRate: 11,
          hideOnComplete: true
        });
      }

      const explosion = this.scene.add.sprite(enemy.x, enemy.y, 'enemy_explosion_small');
      explosion.setScale(1);
      explosion.play('enemy_explosion_small');
      explosion.on('animationcomplete', () => explosion.destroy());

      // 사운드
      this.scene.game.audioManager.playSFX('sfx_enemy_explosion');

      // 적 제거
      enemy.disableBody(true, true);
    }
  }  

  handleEnemyPlayerCollision(player, enemy) {
    // 폭발 애니메이션
    if (!this.scene.anims.exists('enemy_explosion_small')) {
      this.scene.anims.create({
        key: 'enemy_explosion_small',
        frames: this.scene.anims.generateFrameNumbers('explosion_small', { start: 0, end: 11 }),
        frameRate: 12,
        hideOnComplete: true
      });
    }

    const explosion = this.scene.add.sprite(enemy.x, enemy.y, 'explosion_small');
    explosion.setScale(1);
    explosion.play('enemy_explosion_small');
    explosion.on('animationcomplete', () => explosion.destroy());

    // 사운드
    this.scene.game.audioManager.playSFX('sfx_enemy_explosion');

    // 적 제거
    enemy.disableBody(true, true);

    // 플레이어도 처리
    player.takeHitFromEnemy();  // Player.js에 정의한 함수 호출
  }  

  clearAll() {

    // 적 제거
    this.enemies.children.each(enemy => {
      if (enemy.active) {
        // 폭발 애니메이션
        if (!this.scene.anims.exists('enemy_explosion_small')) {
          this.scene.anims.create({
            key: 'enemy_explosion_small',
            frames: this.scene.anims.generateFrameNumbers('explosion_small', { start: 0, end: 11 }),
            frameRate: 12,
            hideOnComplete: true
          });
        }

        const explosion = this.scene.add.sprite(enemy.x, enemy.y, 'explosion_small');
        explosion.setScale(1);
        explosion.play('enemy_explosion_small');
        explosion.on('animationcomplete', () => explosion.destroy());

        enemy.disableBody(true, true);
      }
    });

    // 적 총알 제거
    if (this.enemyBulletManager && this.enemyBulletManager.bullets) {
      this.enemyBulletManager.bullets.children.each(bullet => {
        if (bullet.active) {
          bullet.disableBody(true, true);
        }
      });
    }
  }

  update() {
    this.bulletManager.update();
  }
}