import EnemyBulletManager from '../objects/EnemyBulletManager.js';
import BossMinibot from '../bosses/BossMinibot.js';

export default class Boss1 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'boss01', 0); // 기본은 0프레임
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.hp = 8000; // 전체 체력
    this.phase2Triggered = false; // 2페이즈 진입 여부

    this.body.setSize(180, 180); // 폭, 높이
    this.body.setOffset(30, 30); // 스프라이트 기준으로 오프셋 (좌상단 기준)

    // EnemyBulletManager 인스턴스 생성
    this.bossBulletManager = new EnemyBulletManager(scene);

    this.missiles = this.scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      runChildUpdate: true
    });
  }

  spawn() {
    const backgrounds = this.scene.backgroundGroup.getChildren();
    const bg = backgrounds.find(bg => bg.texture.key === 'stage1_30');
    if (!bg) {
      console.warn('stage1_30 배경이 존재하지 않습니다.');
      return;
    }

    const x = this.scene.scale.width / 2;
    const targetY = 150;

    this.setPosition(x, -100);
    this.setActive(true);
    this.setVisible(true);
    this.setDepth(20); // ✅ 높게 설정

    // 천천히 내려오는 연출 추가
    this.scene.tweens.add({
      targets: this,
      y: targetY,
      duration: 1000,
      ease: 'Sine.easeOut',
    });
  }

  handleBossHit(bullet) {
    bullet.disableBody(true, true);

    // 적 체력 감소
    this.hp -= bullet.damage || 10;

    // 피격
    this.scene.game.effectManager.flashRed(this);

    if (this.hp <= 0) {
      this.onBossDefeated();
    }
  }

  bombDamage(damage) {

    if (this.active) {
      const world = this.getWorldTransformMatrix().decomposeMatrix();
      const cannonWorldX = world.translateX;
      const cannonWorldY = world.translateY;

      const camera = this.scene.cameras.main;

      const inCameraView =
        cannonWorldX > camera.worldView.x &&
        cannonWorldX < camera.worldView.x + camera.width &&
        cannonWorldY > camera.worldView.y &&
        cannonWorldY < camera.worldView.y + camera.height;

      if (inCameraView) {
        this.hp -= damage;

        // 피격
        this.scene.game.effectManager.flashRed(this);

        // 미니봇 처리
        if (this.scene.minibotGroup) {
          this.scene.minibotGroup.children.each(minibot => {
            if (minibot.active) {
              minibot.takeDamage?.(damage);
            }
          });
        }

        // 적 총알 제거
        if (this.bossBulletManager && this.bossBulletManager.bullets) {
          this.bossBulletManager.bullets.children.each(bullet => {
            if (bullet.active) {
              bullet.disableBody(true, true);
            }
          });
        }

        // 미사일 제거
        if (this.missiles) {
          this.missiles.children.iterate(missile => {
            if (missile.active) {
              missile.disableBody(true, true);
            }
          });
        }
        
        if (this.hp <= 0) {
          this.onBossDefeated();
        }
      }
    }
  }

  executePattern() {
    this.pattern1();
    this.pattern2();
    
    if (this.hp <= 6000) {
      this.pattern3();
    }

    if (this.hp <= 1000) {
      this.spawnMiniRobots();
    }
  }

  pattern1() {
    // 이미 타이머가 있으면 다시 만들지 않도록
    if (this.pattern1Timer) return;

    this.pattern1Timer = this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        const baseAngle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.player.x, this.scene.player.y);
        this.bossBulletManager.fireSpread(this.x + 75, this.y + 75, baseAngle, 6, 'enemy_bullet1', 0, 400);
        this.bossBulletManager.fireSpread(this.x - 75, this.y + 75, baseAngle, 6, 'enemy_bullet1', 0, 400);
      },
      callbackScope: this,
      loop: true
    });
  }

  pattern2() {
    if (this.pattern2Timer) return;

    this.pattern2Timer = this.scene.time.addEvent({
      delay: 8000,
      callback: () => {
        this.play('boss01_anim'); // 공격 애니메이션
        this.once('animationcomplete', () => {
          this.missilePattern();
        }, this);
      },
      callbackScope: this,
      loop: true
    });
  }

  pattern3() {
    if (this.pattern3Timer) return;

    this.pattern3Timer = this.scene.time.addEvent({
      delay: 8000,
      callback: () => {
        this.stopHorizontalMovement();

        // 2. 잠깐 멈춤 후 차징 시작 (0.3초)
        this.scene.time.delayedCall(1500, () => {
          this.chargingEffect = this.scene.add.sprite(this.x - 3, this.y + 100, 'charging100');
          this.chargingEffect.setOrigin(0.5, 0.5);
          this.chargingEffect.setDepth(20);
          this.chargingEffect.play('charging100');


          // 2. 사운드 재생
          const sfx = this.scene.game.audioManager.playSFX('sfx_boss_charge');

          // 3. 사운드가 끝나면 실행
          if (sfx && sfx.once) {
            sfx.once('complete', () => {
              // 3-1. 이펙트 제거
              if (this.chargingEffect) {
                this.chargingEffect.destroy();
                this.chargingEffect = null;
              }

              // 3-2. 보스 레이저 발사
              this.fireLaser();
            });
          } else {
            // 혹시 사운드 객체가 없을 때 대비 - 예비 처리
            this.scene.time.delayedCall(2000, () => {
              if (this.chargingEffect) {
                this.chargingEffect.destroy();
                this.chargingEffect = null;
              }
              this.fireLaser();
            });
          }
        });

      },
      callbackScope: this,
      loop: true
    });
  }

  moveRandomlyAfterLaser() {
    if (!this.allowMove || this.isMoving) return;

    this.isMoving = true;

    // 1. 현재 방향 기준 랜덤 좌우 (-1 또는 1)
    const direction = Phaser.Math.RND.pick([-1, 1]);

    // 2. 이동 거리 (100~300px)
    const distance = Phaser.Math.Between(100, 300);

    // 3. 이동 속도 (500~1500ms)
    const duration = Phaser.Math.Between(500, 1500);

    // 4. 최종 목표 위치 계산
    let targetX = this.x + direction * distance;

    // 5. 화면 경계 검사
    const minX = 120;
    const maxX = this.scene.scale.width - 120;
    targetX = Phaser.Math.Clamp(targetX, minX, maxX);

    this.scene.tweens.add({
      targets: this,
      x: targetX,
      duration: duration,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        this.isMoving = false;
      }
    });
  }

  stopHorizontalMovement() {
    if (this.moveTimer) {
      this.moveTimer.remove();
      this.moveTimer = null;
    }

    if (this.activeTween) {
      this.activeTween.stop();
      this.activeTween = null;
    }

    this.isMoving = false;
    this.setVelocity(0);
  }

  moveToCenter() {
    const centerX = this.scene.scale.width / 2;

    this.scene.tweens.add({
      targets: this,
      x: centerX,
      duration: 1000,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        // 중앙 도착 후 다른 행동이 필요하면 여기서 처리
        console.log('보스가 중앙으로 돌아옴');
      }
    });
  }

  fireLaser() {
    // 이동 멈춤
    this.allowMove = false;

    if (this.laser) {
      this.laser.destroy();
    }

    this.laser = this.scene.physics.add.sprite(this.x - 5, this.y + 400, 'boss_laser');
    this.laser.setDepth(19);
    this.laser.setScale(1, 0.6);
    this.laser.setSize(30, 1000);
    this.laser.setOffset(40, 0);
    this.laser.play('boss_laser_anim');

    // ✅ 충돌 가능 설정
    this.laser.body.setAllowGravity(false);
    this.laser.body.setImmovable(true);  // 움직이지 않음

    this.scene.bossLaserGroup.add(this.laser);

    // 사운드
    this.scene.game.audioManager.playSFX('sfx_boss_laser');

    // 일정 시간 후 제거
    this.scene.time.delayedCall(1500, () => {
      if (this.laser) {
        this.laser.destroy();
        this.laser = null;
      }

      this.allowMove = true;
      this.moveRandomlyAfterLaser();
    });
  }

  missilePattern() {
    let offsetY = 0;
    let fireIndex = 0; // 몇 번째 발사인지 카운트
    const total = 8;

    this.scene.time.addEvent({
      delay: 80,
      repeat: total - 1,
      callback: () => {
        const xOffsetLeft = (fireIndex % 2 === 0) ? -110 : -105;
        const xOffsetRight = (fireIndex % 2 === 0) ? +105 : +110;

        // 좌측 발사
        this.spawnMissile(this.x + xOffsetLeft, this.y + offsetY, -250);

        // 우측 발사
        this.spawnMissile(this.x + xOffsetRight, this.y + offsetY, -250);

        fireIndex++;
        offsetY += 5;

        // ✅ 반복 마지막일 때 수동 처리
        if (fireIndex >= total) {
          this.scene.time.delayedCall(500, () => {
            this.setFrame(0);
            this.fireMissilesFromTop()
          }, null, this);
        }
      },
      callbackScope: this
    });
  }

  spawnMissile(x, y, speedY) {
    const missile = this.missiles.get(x, y, 'missile02');

    if (!missile) return;

    missile.setActive(true);
    missile.setVisible(true);
    missile.enableBody(true, x, y, true, true);

    missile.setScale(1.5);
    missile.play('missile2_anim');
    missile.setVelocityY(speedY);
    missile.setDepth(21);

    // 사운드
    this.scene.game.audioManager.playSFX('sfx_boss_missile');
  }


  fireMissilesFromTop() {
    const y = -50; // 화면 밖 위쪽

    const fireDelay = 500; // 각 미사일 간 딜레이 (ms)

    this.scene.time.addEvent({
      delay: fireDelay,
      repeat: 7, // 총 4발 (0~3)
      callback: () => {

        // 좌측 그룹 (x: 10~300)
        const x = Phaser.Math.Between(10, 300);
        this.fireMissile(x, y);

        // 우측 그룹 (x: 301~590)
        const x2 = Phaser.Math.Between(301, 590);
        this.fireMissile(x2, y);
      },
      callbackScope: this
    });


  }

  fireMissile(x, y) {
    const missile = this.missiles.get(x, y, 'missile02');

    if (!missile) return;

    missile.setActive(true);
    missile.setVisible(true);
    missile.enableBody(true, x, y, true, true);

    missile.play('missile2_anim');
    missile.setScale(1.5);
    missile.setDepth(21);
    missile.setVelocity(0, 600); // Y축 아래로만 이동
    missile.setAngle(180); // 시각적 회전
  }

  updateMissiles() {
    if (!this.missiles) return;

    const camera = this.scene.cameras.main;

    this.missiles.children.iterate(missile => {
      if (!missile || !missile.active) return;

      const outOfBounds =
        missile.y > camera.worldView.y + camera.height + 50 ||
        missile.x < camera.worldView.x - 50 ||
        missile.x > camera.worldView.x + camera.width + 50;

      if (outOfBounds) {
        missile.disableBody(true, true);
        this.missiles.killAndHide(missile);
      }
    });
  }

  spawnMiniRobots() {
    const offsetX = 180;
    const offsetY = 150;

    const botLeft = new BossMinibot(this.scene, this.x - offsetX, this.y + offsetY, 'left');
    const botRight = new BossMinibot(this.scene, this.x + offsetX, this.y + offsetY, 'right');

    this.scene.minibotGroup.add(botLeft);
    this.scene.minibotGroup.add(botRight);
  }

  moveToCenterAndStartPhase3() {
    this.returningToCenter = true;

    const centerX = this.scene.scale.width / 2;

    this.scene.tweens.add({
      targets: this,
      x: centerX,
      duration: 1000,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        this.returningToCenter = false;
        this.executePattern();
      }
    });
  }

  setupBossBackground() {
    this.scene.bossBackgroundGroup = this.scene.add.group();

    const bossBg0 = this.scene.add.image(0, 0, 'stage1_boss00').setOrigin(0).setDepth(5);
    const bossBg1 = this.scene.add.image(0, -bossBg0.height, 'stage1_boss01').setOrigin(0).setDepth(5);
    const bossBg2 = this.scene.add.image(0, -bossBg0.height * 2, 'stage1_boss02').setOrigin(0).setDepth(5);
    const bossBg3 = this.scene.add.image(0, -bossBg0.height * 3, 'stage1_boss03').setOrigin(0).setDepth(5);
    const bossBg4 = this.scene.add.image(0, -bossBg0.height * 4, 'stage1_boss04').setOrigin(0).setDepth(5);
    const bossBg5 = this.scene.add.image(0, -bossBg0.height * 5, 'stage1_boss05').setOrigin(0).setDepth(5);

    this.scene.bossBackgroundGroup.add(bossBg0);
    this.scene.bossBackgroundGroup.add(bossBg1);
    this.scene.bossBackgroundGroup.add(bossBg2);
    this.scene.bossBackgroundGroup.add(bossBg3);
    this.scene.bossBackgroundGroup.add(bossBg4);
    this.scene.bossBackgroundGroup.add(bossBg5);
  }

  onBossDefeated() {
    this.scene.inputEnabled = false;
    this.scene.player.body.enable = false;

    // 1. BGM 중지
    this.scene.game.audioManager.stopBGM();

    // 점수
    this.scene.player.gameStatusManager.addScore(5000);

    // 2. 보스 미사일, 총알 제거
    this.cleanUpBoss();

    // 1. 연속 폭발 이펙트
    const explosionPositions = [
      { x: this.x - 50, y: this.y - 50 },
      { x: this.x + 60, y: this.y - 30 },
      { x: this.x,     y: this.y + 40 },
      { x: this.x + 30, y: this.y + 80 },
      { x: this.x - 40, y: this.y + 10 },
    ];

    explosionPositions.forEach((pos, index) => {
      this.scene.time.delayedCall(index * 400, () => {
        // 이펙트
        this.scene.game.effectManager.largeExplosion(pos.x, pos.y);
      });
    });

    // 2. 폭발이 끝나고 텍스트 등장
    this.scene.time.delayedCall(3000, () => {

    this.scene.player.setVelocity(0); // 혹시 물리 속도 쓴다면 중단
    
    const key = this.scene.player.bulletManager.powerLevel >= 4
      ? `${this.scene.player.playerData.ship.key}_powerup`
      : this.scene.player.playerData.ship.key;

    this.scene.player.anims.play(`${key}_idle`); // 유휴 상태 애니메이션 강제 전환      

    // 화면 중앙으로
    this.scene.tweens.add({
      targets: this.scene.player,
      x: 300,
      y: 700,
      duration: 5000,
      ease: 'Power2'
    });

      this.setActive(false);
      this.setVisible(false);
      this.disableBody(true, true);

      this.scene.game.audioManager.playBGM('bgm_clear');

      const clearText = this.scene.add.text(
        this.scene.scale.width / 2,
        this.scene.scale.height / 2,
        'STAGE 1 CLEAR!',
        {
          fontFamily: 'ThaleahFat',
          fontSize: '64px',
          fill: '#00ff00',
        }
      ).setOrigin(0.5).setDepth(30);

      this.scene.tweens.add({
        targets: clearText,
        alpha: { from: 0, to: 1 },
        duration: 1000,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          // 3. Thank you 메시지 추가
          this.scene.time.delayedCall(1000, () => {
            const thankText = this.scene.add.text(
              this.scene.scale.width / 2,
              this.scene.scale.height / 2 - 200,
              'Thank you for playing!',
              {
                fontFamily: 'ThaleahFat',
                fontSize: '54px',
                fill: '#ffffff',
              }
            ).setOrigin(0.5).setDepth(30);

            this.scene.tweens.add({
              targets: thankText,
              alpha: { from: 0, to: 1 },
              duration: 1000,
              yoyo: false,
            });
          });

          const finalScore = this.scene.player.gameStatusManager.score.toString().padStart(6, '0');

          const scoreText = this.scene.add.text(
            this.scene.scale.width / 2,
            this.scene.scale.height / 2 - 100,
            `SCORE : ${finalScore}`,
            {
              fontFamily: 'ThaleahFat',
              fontSize: '54px',
              fill: '#ffffff',
            }
          ).setOrigin(0.5).setDepth(30);

          // 4. 씬 전환 or 정지
          this.scene.time.delayedCall(7000, () => {
            this.scene.inputEnabled = true;
            this.scene.player.body.enable = true;
            this.scene.scene.start('BootScene');
          });
        }
      });
    });
  }

  cleanUpBoss() {
    this.bossBulletManager?.bullets?.clear(true, true);
    this.missiles?.clear(true, true);
    this.chargingEffec?.destroy();
    this.laser?.destroy();
    this.laser = null;

    this.pattern1Timer?.remove();
    this.pattern2Timer?.remove();
    this.pattern3Timer?.remove();
    this.moveTimer?.remove();

    this.scene.minibotGroup?.clear(true, true);
  }  

  update() {
    // 추후 이동 및 패턴 정의 가능
    if (this.active && this.bossBulletManager) {
      this.bossBulletManager.update();
    }

    this.updateMissiles();

    if (this.hp <= 6000 && this.hp > 1000 && !this.phase2Triggered) {
      this.phase2Triggered = true;

      console.log('phase2');

      const targetBg = this.scene.backgroundGroup.getChildren().find(bg => bg.texture.key === 'stage1_30');

      this.scene.tweens.add({
        targets: targetBg,
        y: this.scene.scale.height,
        duration: 5000,
        ease: 'Sine.easeInOut',
        onComplete: () => {
          targetBg.destroy();
          this.setupBossBackground();
        }
      });

      this.executePattern();
    }

    // 3페이즈 진입
    if (this.hp <= 1000 && !this.phase3Triggered) {
      this.phase3Triggered = true;
      this.moveToCenterAndStartPhase3(); // 아래 함수 참고
    }
  }
}