import EnemyBulletManager from '../objects/EnemyBulletManager.js';

export default class Boss1 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'boss01', 0); // 기본은 0프레임
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.hp = 10000; // 전체 체력
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
    this.setDepth(100); // ✅ 높게 설정

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

    this.flashRed(this);

    if (this.hp <= 2500 && !this.phase2Triggered) {
      this.phase2Triggered = true;
    }

    if (this.hp <= 0) {
      //this.disableBody(true, true);
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

        this.flashRed(this);

        // 적 총알 제거
        if (this.bossBulletManager && this.bossBulletManager.bullets) {
          this.bossBulletManager.bullets.children.each(bullet => {
            if (bullet.active) {
              bullet.disableBody(true, true);
            }
          });
        }
      }
    }

  }

  // 적이 맞았을 때 붉게 깜빡이는 처리
  flashRed(boss) {
    const flashCount = 4;
    let count = 0;
    const flashInterval = 100; // 100ms 간격

    const flashTimer = this.scene.time.addEvent({
      delay: flashInterval,
      repeat: flashCount * 2 - 1,
      callback: () => {
        if (!boss.active) {
          flashTimer.remove();
          return;
        }

        if (count % 2 === 0) {
          boss.setTint(0xff0000);
        } else {
          boss.clearTint();
        }

        count++;
      }
    });
  }

  executePattern() {
    if (this.hp > 2500) {
      this.patternPhase1_1();
      this.patternPhase1_2();
    } else {
      if (!this.phase2Triggered) {
        this.phase2Triggered = true;
      }
      //this.patternPhase2();
    }
  }

  patternPhase1_1() {
    // 이미 타이머가 있으면 다시 만들지 않도록
    if (this.pattern1Timer) return;

    this.pattern1Timer = this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        //const baseAngle = Phaser.Math.DegToRad(90);
        const baseAngle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.player.x, this.scene.player.y);
        this.bossBulletManager.fireSpread(this.x + 75, this.y + 75, baseAngle, 3, 'bullets4_3', 400);
        this.bossBulletManager.fireSpread(this.x - 75, this.y + 75, baseAngle, 3, 'bullets4_3', 400);
      },
      callbackScope: this,
      loop: true
    });
  }

  patternPhase1_2() {
    if (this.pattern2Timer) return;

    this.pattern2Timer = this.scene.time.addEvent({
      delay: 7000,
      callback: () => {
        this.play('boss01_anim'); // 공격 애니메이션

        if (!this.hasMissileListener) {
          this.on('animationcomplete', () => {
            this.missilePattern();
          }, this);
          this.hasMissileListener = true;
        }
      },
      callbackScope: this,
      loop: true
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
            this.fireHomingMissilesFromTop()
          }, null, this);
        }
      },
      callbackScope: this
    });
  }

  spawnMissile(x, y, speedY) {
    const missile = this.missiles.get(x, y, 'missile02');
    missile.play('missile2_anim');
    missile.setVelocityY(speedY);
    missile.setDepth(100);
  }

  patternPhase2() {
    // 예: 7방향 스프레드 샷
    const baseAngle = Phaser.Math.DegToRad(90); // 아래 방향
    this.bossBulletManager.fireSpread(this.x, this.y, baseAngle, 9, 'bullets4_3', 200);
  }

  fireHomingMissilesFromTop() {
    const y = -50; // 화면 밖 위쪽

    const fireDelay = 500; // 각 미사일 간 딜레이 (ms)

    this.scene.time.addEvent({
      delay: fireDelay,
      repeat: 3, // 총 4발 (0~3)
      callback: () => {

        // 좌측 그룹 (x: 10~300)
        const x = Phaser.Math.Between(10, 300);
        this.fireHomingMissile(x, y);

        // 우측 그룹 (x: 301~590)
        const x2 = Phaser.Math.Between(301, 590);
        this.fireHomingMissile(x2, y);
      },
      callbackScope: this
    });


  }

  fireHomingMissile(x, y) {
    const missile = this.missiles.get(x, y, 'missile02');
    missile.play('missile2_anim');
    missile.setDepth(10);
    missile.setVelocity(0, 600); // Y축 아래로만 이동
    missile.setAngle(180); // 시각적 회전
  }

  updateMissiles() {
    if (!this.missiles) return;

    const camera = this.scene.cameras.main;

    this.missiles.children.iterate(missile => {
      if (!missile || !missile.active) return;

      const outOfBounds =
        missile.y < camera.worldView.y - 50 ||
        missile.y > camera.worldView.y + camera.height + 50 ||
        missile.x < camera.worldView.x - 50 ||
        missile.x > camera.worldView.x + camera.width + 50;

      if (outOfBounds) {
        missile.destroy();
      }
    });
  }

  setupBossBackground() {
    this.scene.bossBackgroundGroup = this.scene.add.group();

    const bossBg0 = this.scene.add.image(0, 0, 'stage1_boss00').setOrigin(0).setDepth(5);
    console.log('bossBg0.height : ' + bossBg0.height);
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

  update() {
    // 추후 이동 및 패턴 정의 가능
    if (this.active && this.bossBulletManager) {
      this.bossBulletManager.update();
    }

    this.updateMissiles();

  }
}