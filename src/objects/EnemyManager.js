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

    // EnemyBulletManager 인스턴스 생성
    this.enemyBulletManager = new EnemyBulletManager(scene);

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

          if(type === 'bug1'){
            enemy.setSize(30, 30);
            //enemy.setOffset(5, 10);
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
                this.enemyBulletManager.fire(enemy.x, enemy.y + 20, enemy.bulletKey, 200);
              }
            },
            loop: true
          });          

        },
        callbackScope: this
      });
    });
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
      const explosion = this.scene.add.sprite(enemy.x, enemy.y, 'enemy_explosion_small');
      explosion.setScale(1);
      explosion.play('enemy_explosion_small');
      explosion.on('animationcomplete', () => explosion.destroy());

      // 사운드
      this.scene.game.audioManager.playSFX('sfx_enemy_explosion');

      // 적 제거
      enemy.disableBody(true, true);

      if (Phaser.Math.Between(0, 100) < 30) { // 30% 확률로 드롭
        this.scene.itemManager.spawn(enemy.x, enemy.y, 'power');
      }      
    }
  }  

  handleEnemyPlayerCollision(player, enemy) {
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
  
  applyDamage(enemy, amount) {
    
    enemy.hp -= amount;

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
      const explosion = this.scene.add.sprite(enemy.x, enemy.y, 'enemy_explosion_small');
      explosion.setScale(1);
      explosion.play('enemy_explosion_small');
      explosion.on('animationcomplete', () => explosion.destroy());

      // 사운드
      this.scene.game.audioManager.playSFX('sfx_enemy_explosion');

      // 적 제거
      enemy.disableBody(true, true);

      if (Phaser.Math.Between(0, 100) < 30) { // 30% 확률로 드롭
        this.scene.itemManager.spawn(enemy.x, enemy.y, 'power');
      }      
    }
  }

  update() {
    this.enemyBulletManager.update();
  }
}