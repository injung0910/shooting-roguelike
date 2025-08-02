import EnemyBulletManager from '../objects/EnemyBulletManager.js';

const enemyTypes = {
  bug1: {
    name: 'bug1',
    speed: 100,
    fireRate: 3000,
    hp: 15,
    bulletKey: 'enemy_bullet1',
    pattern: 'straight'
  },
  bug2: {
    name: 'bug2',
    speed: 100,
    fireRate: 3000,
    hp: 15,
    bulletKey: 'enemy_bullet1',
    pattern: 'zigzag'
  },
  bug3: {
    name: 'bug3',
    speed: 100,
    fireRate: 3000,
    hp: 15,
    bulletKey: 'enemy_bullet1',
    pattern: 'straight'
  },
  danger1: {
    name: 'danger1',
    speed: 200,
    fireRate: 2000,
    hp: 20,
    bulletKey: 'enemy_bullet1',
    pattern: 'straight'
  },
  danger2: {
    name: 'danger2',
    speed: 300,
    fireRate: 2000,
    hp: 20,
    bulletKey: 'enemy_bullet1',
    pattern: 'straight'
  },
  danger6: {
    name: 'danger6',
    speed: 800,
    fireRate: 2000,
    hp: 1000,
    bulletKey: 'enemy_bullet1',
    pattern: 'straight'
  },
  emperor_1: {
    name: 'emperor1',
    speed: 800,
    fireRate: 1000,
    hp: 20000,
    bulletKey: 'enemy_bullet1',
    pattern: 'straight'
  },
  emperor1: {
    name: 'emperor1',
    speed: 400,
    fireRate: 1000,
    hp: 1000,
    bulletKey: 'enemy_bullet1',
    pattern: 'straight'
  },
  emperor_3: {
    name: 'emperor3',
    speed: 800,
    fireRate: 1000,
    hp: 20000,
    bulletKey: 'enemy_bullet1',
    pattern: 'straight'
  },
  emperor3: {
    name: 'emperor3',
    speed: 800,
    fireRate: 1000,
    hp: 500,
    bulletKey: 'enemy_bullet1',
    pattern: 'straight'
  },
  emperor_4: {
    name: 'emperor4',
    speed: 800,
    fireRate: 1000,
    hp: 20000,
    bulletKey: 'enemy_bullet1',
    pattern: 'straight'
  },
  emperor4: {
    name: 'emperor4',
    speed: 200,
    fireRate: 1000,
    hp: 200,
    bulletKey: 'enemy_bullet1',
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

              this.scene.time.delayedCall(20000, () => {
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
              enemy.play(type);
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


              this.scene.time.delayedCall(20000, () => {
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
              enemy.play(type);
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

              this.scene.time.delayedCall(13000, () => {
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
              enemy.play(type);
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

                    this.enemyBulletManager.fireSpread(enemy.x, enemy.y, angle, 7, 'enemy_bullet1', 0, 300);
                    break;

                  case 'emperor_1':
                    break;

                  case 'emperor3':

                    this.scene.time.delayedCall(3000, () => {
                      if (enemy.active) {
                        this.enemyBulletManager.fireTripleBurstAtPlayer(enemy.x, enemy.y, 'enemy_bullet1', 1, 300, 100);
                      }
                    });
                    break;

                  case 'emperor_3':
                    break;

                  case 'emperor4':
                    angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.scene.player.x, this.scene.player.y);

                    this.enemyBulletManager.fireSpread(enemy.x, enemy.y, angle, 5, 'enemy_bullet1', 0, 300);
                    break;

                  case 'emperor_4':
                    break;

                  case 'bug1':
                    this.enemyBulletManager.fire(enemy.x, enemy.y + 20, enemy.bulletKey, 1, 200);
                    break;

                  case 'bug2':
                    this.enemyBulletManager.fire(enemy.x, enemy.y + 20, enemy.bulletKey, 1, 200);
                    break;

                  case 'bug3':
                    this.enemyBulletManager.fire(enemy.x, enemy.y + 20, enemy.bulletKey, 1, 200);
                    break;

                  case 'danger1':
                    this.enemyBulletManager.fireAtPlayer(enemy.x, enemy.y + 20, 'enemy_bullet1', 1, 300);
                    break;

                  case 'danger2':
                    this.enemyBulletManager.fireAtPlayer(enemy.x, enemy.y + 20, 'enemy_bullet1', 1, 300);
                    break;

                  case 'danger6':
                    this.enemyBulletManager.fireAtPlayer(enemy.x, enemy.y + 20, 'enemy_bullet1', 1, 300);
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

    // 피격
    this.scene.game.effectManager.flashRed(enemy);

    if (enemy.hp <= 0) {

      if (enemy.texture.key.startsWith("emperor")) {
        // 이펙트
        this.scene.game.effectManager.largeExplosion(enemy.x, enemy.y);
        // 사운드
        this.scene.game.audioManager.playSFX('sfx_mid1_explosion');
      } else {
        // 이펙트
        this.scene.game.effectManager.smallExplosion(enemy.x, enemy.y);
        // 사운드
        this.scene.game.audioManager.playSFX('sfx_enemy_explosion');
      }

      // 점수
      if (enemy.texture.key.startsWith("emperor1")) {
        this.scene.player.gameStatusManager.addScore(1000);
      } else if (enemy.texture.key.startsWith('emperor3')) {
        this.scene.player.gameStatusManager.addScore(500);
      } else if (enemy.texture.key.startsWith('emperor4')) {
        this.scene.player.gameStatusManager.addScore(300);
      } else if (enemy.texture.key.startsWith('bug')) {
        this.scene.player.gameStatusManager.addScore(100);
      } else if (enemy.texture.key.startsWith('danger')) {
        this.scene.player.gameStatusManager.addScore(100);
      } else {
        this.scene.player.gameStatusManager.addScore(10);
      }

      // 아이템
      if (enemy.texture.key.startsWith('bug2')) {
        this.scene.itemManager.spawn(enemy.x, enemy.y, 'power');
      } else if (enemy.texture.key.startsWith('emperor4') && enemy.x === 400) {
        this.scene.itemManager.spawn(enemy.x, enemy.y, 'bomb');
      } else if (enemy.texture.key.startsWith('emperor1')) {
        this.scene.itemManager.spawn(enemy.x, enemy.y, 'bomb');
        this.scene.itemManager.spawn(enemy.x, enemy.y, 'power');
      }

      // 적 제거
      enemy.disableBody(true, true);

    }
  }

  handleEnemyPlayerCollision(player, enemy) {
    // 📌 무적 상태면 아무 처리 안 함
    if (player.isInvincible) return;

    if (!enemy.texture.key.startsWith("emperor")) {
      this.scene.game.effectManager.smallExplosion(enemy.x, enemy.y);

      // 사운드
      this.scene.game.audioManager.playSFX('sfx_enemy_explosion');

      // 적 제거
      enemy.disableBody(true, true);
    }

    // 플레이어도 처리
    player.takeHitFromEnemy();  // Player.js에 정의한 함수 호출
  }

  bombDamage(damage) {
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

          // 피격
          this.scene.game.effectManager.flashRed(enemy);

          if (enemy.hp <= 0) {
            if (enemy.texture.key.startsWith("emperor")) {
              this.scene.game.effectManager.largeExplosion(enemy.x, enemy.y);
            } else {
              this.scene.game.effectManager.smallExplosion(enemy.x, enemy.y);
            }

            // 점수
            if (enemy.texture.key.startsWith("emperor1")) {
              this.scene.player.gameStatusManager.addScore(1000);
            } else if (enemy.texture.key.startsWith('emperor3')) {
              this.scene.player.gameStatusManager.addScore(500);
            } else if (enemy.texture.key.startsWith('emperor4')) {
              this.scene.player.gameStatusManager.addScore(300);
            } else if (enemy.texture.key.startsWith('bug')) {
              this.scene.player.gameStatusManager.addScore(100);
            } else if (enemy.texture.key.startsWith('danger')) {
              this.scene.player.gameStatusManager.addScore(100);
            } else {
              this.scene.player.gameStatusManager.addScore(10);
            }

            // 아이템
            if (enemy.texture.key.startsWith('bug2')) {
              this.scene.itemManager.spawn(enemy.x, enemy.y, 'power');
            } else if (enemy.texture.key.startsWith('emperor4') && enemy.x === 400) {
              this.scene.itemManager.spawn(enemy.x, enemy.y, 'bomb');
            } else if (enemy.texture.key.startsWith('emperor1')) {
              this.scene.itemManager.spawn(enemy.x, enemy.y, 'bomb');
              this.scene.itemManager.spawn(enemy.x, enemy.y, 'power');
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

    // 피격
    this.scene.game.effectManager.flashRed(enemy);

    if (enemy.hp <= 0) {
      if (enemy.texture.key.startsWith("emperor")) {
        // 이펙트
        this.scene.game.effectManager.largeExplosion(enemy.x, enemy.y);
        // 사운드
        this.scene.game.audioManager.playSFX('sfx_mid1_explosion');
      } else {
        // 이펙트
        this.scene.game.effectManager.smallExplosion(enemy.x, enemy.y);
        // 사운드
        this.scene.game.audioManager.playSFX('sfx_enemy_explosion');
      }

      // 점수
      if (enemy.texture.key.startsWith("emperor1")) {
        this.scene.player.gameStatusManager.addScore(1000);
      } else if (enemy.texture.key.startsWith('emperor3')) {
        this.scene.player.gameStatusManager.addScore(500);
      } else if (enemy.texture.key.startsWith('emperor4')) {
        this.scene.player.gameStatusManager.addScore(300);
      } else if (enemy.texture.key.startsWith('bug')) {
        this.scene.player.gameStatusManager.addScore(100);
      } else if (enemy.texture.key.startsWith('danger')) {
        this.scene.player.gameStatusManager.addScore(100);
      } else {
        this.scene.player.gameStatusManager.addScore(10);
      }

      // 아이템
      if (enemy.texture.key.startsWith('bug2')) {
        this.scene.itemManager.spawn(enemy.x, enemy.y, 'power');
      } else if (enemy.texture.key.startsWith('emperor4') && enemy.x === 400) {
        this.scene.itemManager.spawn(enemy.x, enemy.y, 'bomb');
      } else if (enemy.texture.key.startsWith('emperor1')) {
        this.scene.itemManager.spawn(enemy.x, enemy.y, 'bomb');
        this.scene.itemManager.spawn(enemy.x, enemy.y, 'power');
      }

      // 적 제거
      enemy.disableBody(true, true);
    }

  }

  showEnemyWarning(warningData) {
    const backgrounds = this.scene.backgroundGroup.getChildren();

    warningData.forEach(({ key, delay, duration, xMin, xMax, text }) => {
      const bg = backgrounds.find(bg => bg.texture.key === key);
      if (!bg) return;

      const camera = this.scene.cameras.main;

      this.scene.time.delayedCall(delay, () => {
        const centerX = (xMin + xMax) / 2;

        const warningText = this.scene.add.text(centerX, 100, text, {
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

        if (text === 'ENEMY APPROACHING') {
          this.scene.time.delayedCall(2000, () => {
            // ✅ 부스터 효과음
            this.scene.game.audioManager.playSFX('sfx_enemy_boost');
          }, null, this);
        }
        if (text === 'ASTEROID APPROACHING') {
          this.scene.game.audioManager.playSFX('sfx_warning');
          console.log('Spawning asteroids due to enemy warning');
          this.scene.time.delayedCall(2000, () => {
            this.spawnAsteroids();
          });
        }

      }, null, this);
    });

  }

  spawnEnemiesFromPlayerDeath() {
    const currentBg = this.scene.backgroundGroup.getChildren().find(bg => {
      return bg.y <= this.scene.cameras.main.scrollY + this.scene.scale.height &&
        bg.y + bg.height >= this.scene.cameras.main.scrollY;
    });

    const currentKey = currentBg?.texture?.key;
    if (!currentKey) return;

    const spawnData = [
      { key: currentKey, type: 'bug3', x: 50, delay: 500 },
      { key: currentKey, type: 'bug2', x: 100, delay: 500 },
      { key: currentKey, type: 'bug3', x: 150, delay: 500 },
      { key: currentKey, type: 'bug3', x: 450, delay: 500 },
      { key: currentKey, type: 'bug2', x: 500, delay: 500 },
      { key: currentKey, type: 'bug3', x: 550, delay: 500 },
    ];

    this.spawnEnemies(spawnData);
  }

  spawnAsteroids() {
    console.log('spawnAsteroids called');

    this.asteroidTimer = this.scene.time.addEvent({
      delay: 50,
      loop: true,
      callback: () => {
        const backgrounds = this.scene.backgroundGroup.getChildren();
        const cameraY = this.scene.cameras.main.scrollY;

        // 현재 화면에 보이는 배경 찾기
        const bg = backgrounds.find(bg => {
          return bg.y <= cameraY + this.scene.scale.height &&
            bg.y + bg.height >= cameraY;
        });

        if (!bg) return;

        const textureKey = Phaser.Utils.Array.GetRandom([
          'asteroid_01',
          'asteroid_02',
          'asteroid_03',
          'asteroid_04'
        ]);

        const x = Phaser.Math.Between(50, this.scene.scale.width - 50);
        const enemy = this.enemies.create(x, bg.y - 64, textureKey);

        if (!enemy) return;

        enemy.setActive(true);
        enemy.setVisible(true);
        enemy.setDepth(10);
        enemy.setVelocity(0, Phaser.Math.Between(600, 800));
        enemy.hp = 10;
        enemy.enemyType = 'asteroid';
        enemy.setAngle(Phaser.Math.Between(-10, 10));
      }
    });

    // 15초 후 타이머 제거
    this.scene.time.delayedCall(14000, () => {
      if (this.asteroidTimer) {
        this.asteroidTimer.remove(false);
      }
    });
  }

  update() {
    this.enemyBulletManager.update();
  }
}