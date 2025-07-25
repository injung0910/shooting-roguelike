import EnemyBulletManager from '../objects/EnemyBulletManager.js';

const enemyTypes = {
  bug1: {
    name: 'bug1',
    speed: 100,
    fireRate: 2000,
    hp: 15,
    bulletKey: 'bullets4',
    pattern: 'straight'
  },
  bug2: {
    name: 'bug2',
    speed: 100,
    fireRate: 2000,
    hp: 15,
    bulletKey: 'bullets4',
    pattern: 'zigzag'
  },
  bug3: {
    name: 'bug3',
    speed: 100,
    fireRate: 2000,
    hp: 15,
    bulletKey: 'bullets4',
    pattern: 'straight'
  },
  danger1: {
    name: 'danger1',
    speed: 200,
    fireRate: 2000,
    hp: 20,
    bulletKey: 'bullets4',
    pattern: 'straight'
  },
  danger2: {
    name: 'danger2',
    speed: 300,
    fireRate: 1000,
    hp: 20,
    bulletKey: 'bullets4',
    pattern: 'straight'
  },
  danger6: {
    name: 'danger6',
    speed: 800,
    fireRate: 1000,
    hp: 1000,
    bulletKey: 'bullets4',
    pattern: 'straight'
  },
  emperor_1: {
    name: 'emperor1',
    speed: 800,
    fireRate: 1000,
    hp: 20000,
    bulletKey: 'bullets4',
    pattern: 'straight'
  },
  emperor1: {
    name: 'emperor1',
    speed: 400,
    fireRate: 1000,
    hp: 3000,
    bulletKey: 'bullets4',
    pattern: 'straight'
  },
  emperor_3: {
    name: 'emperor3',
    speed: 800,
    fireRate: 1000,
    hp: 20000,
    bulletKey: 'bullets4',
    pattern: 'straight'
  },
  emperor3: {
    name: 'emperor3',
    speed: 800,
    fireRate: 1000,
    hp: 1000,
    bulletKey: 'bullets4',
    pattern: 'straight'
  },
  emperor_4: {
    name: 'emperor4',
    speed: 800,
    fireRate: 1000,
    hp: 20000,
    bulletKey: 'bullets4',
    pattern: 'straight'
  },
  emperor4: {
    name: 'emperor4',
    speed: 200,
    fireRate: 1000,
    hp: 600,
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


  spawnEnemies(spawnData) {
    const backgrounds = this.scene.backgroundGroup.getChildren();

    spawnData.forEach(({ key, type, x, delay }) => {
      const bg = backgrounds.find(bg => bg.texture.key === key);
      if (!bg) return;

      const status = enemyTypes[type];
      if (!status) {
        console.warn(`Unknown enemy type: ${type}`);
        return;
      }

      this.scene.time.addEvent({
        delay,
        callback: () => {
          let enemy;

          switch (type) {
            case 'emperor1':
              // 등장: 월드 좌표 기준 생성
              enemy = this.enemies.create(bg.x + x, bg.y - 64, status.name);

              enemy.setScale(3);

              // 등장 연출 (예: 내려오기)
              this.scene.tweens.add({
                targets: enemy,
                y: this.scene.cameras.main.scrollY + 200,
                duration: 7000,
                ease: 'Sine.easeOut', // 💫 좀 더 부드럽게 멈춤
                onComplete: () => {
                  // 📌 화면에 고정되게 설정
                  enemy.setScrollFactor(0);

                  // 겹치지 않도록 각자 다른 위치에 고정
                  enemy.x = x;
                  enemy.y = 200;

                }
              });

              this.scene.time.delayedCall(30000, () => {
                this.scene.tweens.add({
                  targets: enemy,
                  y: this.scene.cameras.main.scrollY + this.scene.cameras.main.height + 200, // 화면 아래로 퇴장
                  duration: 5500,
                  ease: 'Sine.easeInOut',
                  onComplete: () => {
                    enemy.destroy();
                  }
                });
              });
              break;

            case 'emperor_1':
              enemy = this.enemies.create(bg.x + x, bg.y - 64, status.name);
              enemy.setScale(3);
              enemy.setVelocityY(status.speed);
              break;

            case 'emperor3':
              // 등장: 월드 좌표 기준 생성
              enemy = this.enemies.create(bg.x + x, bg.y - 64, status.name);

              enemy.setScale(1.5);

              // 등장 연출 (예: 내려오기)
              this.scene.tweens.add({
                targets: enemy,
                y: this.scene.cameras.main.scrollY + 150,
                duration: 6000,
                ease: 'Sine.easeOut', // 💫 좀 더 부드럽게 멈춤
                onComplete: () => {
                  // 📌 화면에 고정되게 설정
                  enemy.setScrollFactor(0);

                  // 겹치지 않도록 각자 다른 위치에 고정
                  enemy.x = x;
                  enemy.y = 150;

                }
              });


              this.scene.time.delayedCall(30000, () => {
                this.scene.tweens.add({
                  targets: enemy,
                  y: this.scene.cameras.main.scrollY + this.scene.cameras.main.height + 200, // 화면 아래로 퇴장
                  duration: 4000,
                  ease: 'Sine.easeInOut',
                  onComplete: () => {
                    enemy.destroy();
                  }
                });
              });
              break;

            case 'emperor_3':
              enemy = this.enemies.create(bg.x + x, bg.y - 64, status.name);
              enemy.setScale(1.5);
              enemy.setVelocityY(status.speed);
              break;

            case 'emperor4':
              // 등장: 월드 좌표 기준 생성
              enemy = this.enemies.create(bg.x + x, bg.y - 64, status.name);

              enemy.setScale(1.5);

              // 등장 연출 (예: 내려오기)
              this.scene.tweens.add({
                targets: enemy,
                y: this.scene.cameras.main.scrollY + 150,
                duration: 3000,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                  // 📌 화면에 고정되게 설정
                  enemy.setScrollFactor(0);

                  // 겹치지 않도록 각자 다른 위치에 고정
                  enemy.x = x;
                  enemy.y = 150;

                }
              });

              this.scene.time.delayedCall(16000, () => {
                const direction = (enemy.x < 300) ? -800 : 800; // 왼쪽에 있으면 왼쪽으로, 오른쪽에 있으면 오른쪽으로

                this.scene.tweens.add({
                  targets: enemy,
                  x: enemy.x + direction,
                  duration: 2000,
                  ease: 'Sine.easeInOut',
                  onComplete: () => {
                    enemy.destroy();
                  }
                });
              });

              break;

            case 'emperor_4':
              enemy = this.enemies.create(bg.x + x, bg.y - 64, status.name);
              enemy.setScale(1.5);
              enemy.setVelocityY(status.speed);
              break;

            case 'bug1':
              enemy = this.enemies.create(bg.x + x, bg.y - 64, status.name);
              enemy.play(type);
              enemy.setSize(30, 30);
              enemy.setVelocityY(status.speed);
              break;

            case 'bug2':
              enemy = this.enemies.create(bg.x + x, bg.y - 64, status.name);
              enemy.play(type);
              enemy.setSize(30, 30);
              enemy.setVelocityY(status.speed);
              break;

            case 'bug3':
              enemy = this.enemies.create(bg.x + x, bg.y - 64, status.name);
              enemy.play(type);
              enemy.setSize(30, 30);
              enemy.setVelocityY(status.speed);
              break;

            case 'danger1':
              enemy = this.enemies.create(bg.x + x, bg.y - 64, status.name);
              enemy.setSize(30, 30);
              enemy.setVelocityY(status.speed);
              break;

            case 'danger2':
              enemy = this.enemies.create(bg.x + x, bg.y - 64, status.name);
              enemy.setSize(30, 30);
              enemy.setVelocityY(status.speed);
              break;

            case 'danger6':
              enemy = this.enemies.create(bg.x + x, bg.y - 64, status.name);
              enemy.setSize(30, 30);
              enemy.setVelocityY(status.speed);
              break;
          }

          enemy.setDepth(10);
          enemy.hp = status.hp;
          enemy.bulletKey = status.bulletKey;
          enemy.fireRate = status.fireRate;
          enemy.pattern = status.pattern;

          let angle;

          // ⬇ 총알 발사 루프 등록
          enemy.fireTimer = this.scene.time.addEvent({
            delay: enemy.fireRate,
            callback: () => {
              if (enemy.active) {

                switch (type) {
                  case 'emperor1':
                    angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.scene.player.x, this.scene.player.y);

                    this.enemyBulletManager.fireSpread(enemy.x, enemy.y, angle, 7, 'bullets4_3', 300);
                    break;

                  case 'emperor_1':
                    break;

                  case 'emperor3':

                    this.scene.time.delayedCall(3000, () => {
                      if (enemy.active) {
                        this.enemyBulletManager.fireTripleBurstAtPlayer(enemy.x, enemy.y, 'bullets4_4', 300, 100);
                      }
                    });
                    break;

                  case 'emperor_3':
                    break;

                  case 'emperor4':
                    angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.scene.player.x, this.scene.player.y);

                    this.enemyBulletManager.fireSpread(enemy.x, enemy.y, angle, 5, 'bullets4_3', 300);
                    break;

                  case 'emperor_4':
                    break;

                  case 'bug1':
                    this.enemyBulletManager.fire(enemy.x, enemy.y + 20, enemy.bulletKey, 200);
                    break;

                  case 'bug2':
                    this.enemyBulletManager.fire(enemy.x, enemy.y + 20, enemy.bulletKey, 200);
                    break;

                  case 'bug3':
                    this.enemyBulletManager.fire(enemy.x, enemy.y + 20, enemy.bulletKey, 200);
                    break;

                  case 'danger1':
                    this.enemyBulletManager.fireAtPlayer(enemy.x, enemy.y + 20, 'bullets4_2', 300);
                    break;

                  case 'danger2':
                    this.enemyBulletManager.fireAtPlayer(enemy.x, enemy.y + 20, 'bullets4_2', 300);
                    break;

                  case 'danger6':
                    this.enemyBulletManager.fireAtPlayer(enemy.x, enemy.y + 20, 'bullets4_2', 300);
                    break;
                }

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

    this.flashRed(enemy);

    if (enemy.hp <= 0) {

      if (enemy.texture.key.startsWith("emperor")) {
        const explosion = this.scene.add.sprite(enemy.x, enemy.y, 'explosion_large');
        explosion.setScale(1);
        explosion.play('explosion_large');
        explosion.on('animationcomplete', () => explosion.destroy());

        // 사운드
        this.scene.game.audioManager.playSFX('sfx_mid1_explosion');
      } else {
        const explosion = this.scene.add.sprite(enemy.x, enemy.y, 'enemy_explosion_small');
        explosion.setScale(1);
        explosion.play('enemy_explosion_small');
        explosion.on('animationcomplete', () => explosion.destroy());

        // 사운드
        this.scene.game.audioManager.playSFX('sfx_enemy_explosion');
      }

      // 적 제거
      enemy.disableBody(true, true);

      if (Phaser.Math.Between(0, 100) < 30) { // 30% 확률로 드롭
        this.scene.itemManager.spawn(enemy.x, enemy.y, 'power');
      }
    }
  }

  handleEnemyPlayerCollision(player, enemy) {

    if (!enemy.texture.key.startsWith("emperor")) {
      const explosion = this.scene.add.sprite(enemy.x, enemy.y, 'explosion_small');
      explosion.setScale(1);
      explosion.play('enemy_explosion_small');
      explosion.on('animationcomplete', () => explosion.destroy());

      // 사운드
      this.scene.game.audioManager.playSFX('sfx_enemy_explosion');

      // 적 제거
      enemy.disableBody(true, true);
    }

    // 플레이어도 처리
    player.takeHitFromEnemy();  // Player.js에 정의한 함수 호출
  }

  clearAll(damage) {
    // 적 제거
    this.enemies.children.each(enemy => {
      if (enemy.active) {
        const world = enemy.getWorldTransformMatrix().decomposeMatrix();
        const cannonWorldX = world.translateX;
        const cannonWorldY = world.translateY;

        const camera = this.scene.cameras.main;

        const inCameraView =
          cannonWorldX > camera.worldView.x &&
          cannonWorldX < camera.worldView.x + camera.width &&
          cannonWorldY > camera.worldView.y &&
          cannonWorldY < camera.worldView.y + camera.height;

        if (inCameraView) {

          enemy.hp -= damage;

          this.flashRed(enemy);

          if (enemy.hp <= 0) {
            if (enemy.texture.key.startsWith("emperor")) {
              const explosion = this.scene.add.sprite(enemy.x, enemy.y, 'explosion_large');
              explosion.setScale(1);
              explosion.play('explosion_large');
              explosion.on('animationcomplete', () => explosion.destroy());
            } else {
              const explosion = this.scene.add.sprite(enemy.x, enemy.y, 'enemy_explosion_small');
              explosion.setScale(1);
              explosion.play('enemy_explosion_small');
              explosion.on('animationcomplete', () => explosion.destroy());
            }

            enemy.disableBody(true, true);
          }

        }
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

    this.flashRed(enemy);

    if (enemy.hp <= 0) {
      if (enemy.texture.key.startsWith("emperor")) {
        const explosion = this.scene.add.sprite(enemy.x, enemy.y, 'explosion_large');
        explosion.setScale(1);
        explosion.play('explosion_large');
        explosion.on('animationcomplete', () => explosion.destroy());

        // 사운드
        this.scene.game.audioManager.playSFX('sfx_mid1_explosion');
      } else {
        const explosion = this.scene.add.sprite(enemy.x, enemy.y, 'enemy_explosion_small');
        explosion.setScale(1);
        explosion.play('enemy_explosion_small');
        explosion.on('animationcomplete', () => explosion.destroy());

        // 사운드
        this.scene.game.audioManager.playSFX('sfx_enemy_explosion');
      }

      // 적 제거
      enemy.disableBody(true, true);

      if (Phaser.Math.Between(0, 100) < 30) { // 30% 확률로 드롭
        this.scene.itemManager.spawn(enemy.x, enemy.y, 'power');
      }
    }
  }

  showEnemyWarning(warningData) {
    const backgrounds = this.scene.backgroundGroup.getChildren();

    warningData.forEach(({ key, delay, duration, xMin, xMax }) => {
      const bg = backgrounds.find(bg => bg.texture.key === key);
      if (!bg) return;

      const camera = this.scene.cameras.main;

      this.scene.time.delayedCall(delay, () => {
        const centerX = (xMin + xMax) / 2;

        const warningText = this.scene.add.text(centerX, 100, 'ENEMY APPROACHING', {
          fontSize: '48px',
          fill: '#ff0000',
          fontFamily: 'ThaleahFat',
          stroke: '#000',
          strokeThickness: 5
        }).setOrigin(0.5).setScrollFactor(0).setAlpha(0);

        // 깜빡이는 트윈 효과
        this.scene.tweens.add({
          targets: warningText,
          alpha: { from: 0, to: 1 },
          duration: 300,
          yoyo: true,
          repeat: Math.floor(duration / 600), // 1회당 600ms로 계산
          onComplete: () => warningText.destroy()
        });

        // 시각적 범위 표시 (선택적)
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(0xff0000, 0.3);
        graphics.fillRect(xMin, 0, xMax - xMin, camera.height);
        graphics.setScrollFactor(0);

        // 깜빡이는 트윈 효과
        this.scene.tweens.add({
          targets: graphics,
          alpha: { from: 0, to: 1 },
          duration: 300,
          yoyo: true,
          repeat: Math.floor(duration / 600), // 1회당 600ms로 계산
          onComplete: () => graphics.destroy()
        });

        // 경고 사운드
        this.scene.game.audioManager.playSFX('sfx_warning');

      }, null, this);
    });

  }

  // 적이 맞았을 때 붉게 깜빡이는 처리
  flashRed(enemy) {
    const flashCount = 4;
    let count = 0;
    const flashInterval = 100; // 100ms 간격

    const flashTimer = enemy.scene.time.addEvent({
      delay: flashInterval,
      repeat: flashCount * 2 - 1,
      callback: () => {
        if (!enemy.active) {
          flashTimer.remove();
          return;
        }

        if (count % 2 === 0) {
          enemy.setTint(0xff0000);
        } else {
          enemy.clearTint();
        }

        count++;
      }
    });
  }  

  update() {
    this.enemyBulletManager.update();
  }
}