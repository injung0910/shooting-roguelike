
import BulletManager from '../objects/BulletManager.js';
import GameStatusManager from '../ui/GameStatusManager.js';

const SHIP_STATS = {
  Falcon: {
    key: 'plane2',
    name : 'Falcon',
    damage : 5,
    speed: 220,
    fireRate : 300,
    hitbox: { width: 19.2, height: 38.4, offsetX: 38.4, offsetY: 38.4 }
  },
  Cryphix: {
    key: 'plane9',
    name : 'Cryphix',
    damage : 10,
    speed: 250,
    fireRate : 350,
    hitbox: { width: 46.08, height: 24, offsetX: 24, offsetY: 43.2 }
  },
  Hawk: {
    key: 'plane6',
    name : 'Hawk',
    damage : 5,
    speed: 200,
    fireRate : 200,
    hitbox: { width: 19.2, height: 38.4, offsetX: 38.4, offsetY: 38.4 }
  }
};

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, data) {
    super(scene, 300, 700, data);
    
    this.scene = scene;
    this.playerData = data; // key, name 등 전체 저장

    const stats = SHIP_STATS[this.playerData.ship.name];

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(20); // 다른 오브젝트보다 위로
    
    // 히트박스 설정
    this.setSize(stats.hitbox.width, stats.hitbox.height);
    this.setOffset(stats.hitbox.offsetX, stats.hitbox.offsetY);

    // 충돌 범위 설정 등
    this.setCollideWorldBounds(true);

    // 입력 처리
    this.cursors = scene.input.keyboard.createCursorKeys();

    // 터치 관련 변수
    this.touchTarget = null;
    // 속도, 데미지 등 설정
    this.speed = stats.speed;

    this.registerTouchControls();
    //this.play('idle');

    // 발사
    this.bulletManager = new BulletManager(scene, stats, this.scene.game.audioManager);

    // 게임 ui
    this.gameStatusManager = new GameStatusManager(scene, this.playerData, this);

    // 폭탄
    this.bombKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

  }

  registerTouchControls() {
    this.scene.input.on('pointerdown', (pointer) => {
      this.touchTarget = { x: pointer.x, y: pointer.y };
      this.isTouching = true;
    });

    this.scene.input.on('pointermove', (pointer) => {
      if (this.isTouching) {
        this.touchTarget = { x: pointer.x, y: pointer.y };
      }
    });

    this.scene.input.on('pointerup', () => {
      this.isTouching = false;
      this.touchTarget = null;
    });

    
  }

  handleHit(bullet) {
    bullet.disableBody(true, true);

    if (!this.body.enable) return;

    const shipName = this.playerData.ship.name;
    this.scene.game.audioManager.playSFX(`sfx_${shipName}_down`);

    const explosion = this.scene.add.sprite(this.x, this.y, 'explosion_small');
    explosion.play('explosion_small');
    explosion.on('animationcomplete', () => {
      // 2초 후 제거
      this.scene.time.delayedCall(2000, () => {
        explosion.destroy();
      });
    });

    // 목숨잃음
    this.gameStatusManager.loseLife();

    // 파워 초기화
    this.bulletManager.powerLevel = 1;    

    // Support Unit 제거
    this.bulletManager.supportUnits.forEach(unit => {
      unit.destroy();
    });

    this.bulletManager.supportUnits = [];

    this.bulletManager.destroyAura();

    // 무적 상태 및 시각 효과
    //this.body.checkCollision.none = true;

    this.body.checkCollision.up = false;
    this.body.checkCollision.down = false;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
    

    // 🔸 깜빡이는 효과 시작
    let blink = true;
    const blinkTimer = this.scene.time.addEvent({
      delay: 150,
      repeat: 9, // 총 10번 반복 (약 1.5초)
      callback: () => {
        blink = !blink;
        this.setAlpha(blink ? 0.3 : 1);
      }
    });

    // 2초 후 정상 복귀
    this.scene.time.delayedCall(2000, () => {
      this.setAlpha(1);
      this.clearTint();
      //this.body.checkCollision.none = false;
      this.body.checkCollision.up = true;
      this.body.checkCollision.down = true;
      this.body.checkCollision.left = true;
      this.body.checkCollision.right = true;      
      blinkTimer.remove(); // 타이머 정지
    });
  }  

  takeHitFromEnemy() {
    if (!this.body.enable) return; // 이미 무적 상태면 무시

    const explosion = this.scene.add.sprite(this.x, this.y, 'explosion_small');
    explosion.setScale(1);
    explosion.play('explosion_small');
    explosion.on('animationcomplete', () => explosion.destroy());

    // 사운드
    const shipName = this.playerData.ship.name;
    this.scene.game.audioManager.playSFX(`sfx_${shipName}_down`);

    // 목숨잃음
    this.gameStatusManager.loseLife();

    // 파워 초기화
    this.bulletManager.powerLevel = 1;

    // Support Unit 제거
    this.bulletManager.supportUnits.forEach(unit => {
      unit.destroy();
    });
    
    this.bulletManager.supportUnits = [];

    this.bulletManager.destroyAura();

    // 무적 상태 및 시각 효과
    this.body.checkCollision.none = true;

    // 🔸 깜빡이는 효과 시작
    let blink = true;
    const blinkTimer = this.scene.time.addEvent({
      delay: 150,
      repeat: 9, // 총 10번 반복 (약 1.5초)
      callback: () => {
        blink = !blink;
        this.setAlpha(blink ? 0.3 : 1);
      }
    });

    // 2초 후 정상 복귀
    this.scene.time.delayedCall(2000, () => {
      this.setAlpha(1);
      this.clearTint();
      this.body.checkCollision.none = false;
      blinkTimer.remove(); // 타이머 정지
    });
  }  

  useBomb() {
    if (this.gameStatusManager.bombs <= 0) return;

    // 중복 방지: 0.1초 안에 다시 호출되지 않도록
    if (this.bombCooldown) return;
    this.bombCooldown = true;
    this.scene.time.delayedCall(150, () => {
      this.bombCooldown = false;
    });

    this.gameStatusManager.bombs--;
    this.gameStatusManager.updateBombUI(); // UI 동기화

    const shipName = this.playerData.ship.name;

    switch (shipName) {
      case 'Falcon':
        this.falconBomb();
        break;
      case 'Cryphix':
        this.cryphixBomb();
        break;
      case 'Hawk':
        this.hawkBomb();
        break;
      default:
        this.falconBomb();
        break;
    }
    
  }

  falconBomb() {
    
    const centerX = this.scene.scale.width / 2;
    const centerY = this.scene.scale.height / 2;

    const explosion200 = this.scene.add.sprite(centerX, centerY, 'explosion200');
    explosion200.setDepth(30);
    explosion200.setScale(4);
    explosion200.setAlpha(0.7);
    explosion200.play('explosion200');

    this.bombFlash = this.scene.add.rectangle(0, 0, this.scene.scale.width, this.scene.scale.height, 0xffffff)
      .setOrigin(0)
      .setAlpha(0)
      .setDepth(9999); // 모든 요소 위에

    this.bombFlash.setAlpha(0.8);
    this.scene.tweens.add({
      targets: this.bombFlash,
      alpha: 0,
      duration: 300,
      ease: 'Cubic.easeOut',
    });

    this.scene.game.audioManager.playSFX('sfx_falcon_bomb');

    const bombDuration = 2000; // 폭탄 지속 시간 (2초)
    const interval = 200;      // 0.2초마다 제거

    // 반복 제거 타이머
    const clearTimer = this.scene.time.addEvent({
      delay: interval,
      callback: () => {
        this.scene.enemyManager.clearAll(this.gameStatusManager.bombDamage); // 적과 총알 모두 제거
        this.scene.groundEnemyManager.clearAll(this.gameStatusManager.bombDamage); // 지상 적 모두 제거
      },
      repeat: Math.floor(bombDuration / interval) - 1 // 총 몇 번 반복할지
    });    

    explosion200.on('animationcomplete', () => explosion200.destroy());
  }

  cryphixBomb() {

    const centerX = this.scene.scale.width / 2;
    const centerY = this.scene.scale.height / 2;

    const thunder200 = this.scene.add.sprite(centerX, centerY, 'thunder200');
    thunder200.setDepth(30);
    thunder200.setScale(4);
    thunder200.setAlpha(0.7);
    thunder200.play('thunder200');

    this.bombFlash = this.scene.add.rectangle(0, 0, this.scene.scale.width, this.scene.scale.height, 0xffffff)
      .setOrigin(0)
      .setAlpha(0)
      .setDepth(9999); // 모든 요소 위에

    this.bombFlash.setAlpha(0.8);
    this.scene.tweens.add({
      targets: this.bombFlash,
      alpha: { from: 0.6, to: 0 },
      duration: 100,
      repeat: 4,
    });

    this.scene.game.audioManager.playSFX('sfx_cryphix_bomb');

    this.scene.enemyManager.clearAll(this.gameStatusManager.cryphixBombDamage);
    this.scene.groundEnemyManager.clearAll(this.gameStatusManager.cryphixBombDamage); // 지상 적 모두 제거

    thunder200.on('animationcomplete', () => thunder200.destroy());
  }  

  hawkBomb() {

    for (let i = 0; i < 20; i++) {
      this.scene.time.delayedCall(i * 100, () => {
        this.scene.game.audioManager.playSFX('sfx_hawk_bomb');

        const x = Phaser.Math.Between(50, this.scene.scale.width - 50); // 화면 좌우 여백 50
        const y = this.scene.scale.height + 50; // 화면 아래쪽 바깥

        //const fireCircle200 = this.scene.add.sprite(this.x, this.y, 'fireCircle200');
        const fireCircle200 = this.scene.physics.add.sprite(x, y, 'fireCircle200');
        fireCircle200.setDepth(30);
        fireCircle200.setAlpha(0.7);
        fireCircle200.setVelocityY(-1000); 
        fireCircle200.play('fireCircle200');
        fireCircle200.on('animationcomplete', () => fireCircle200.destroy());
      });
    }

    this.bombFlash = this.scene.add.rectangle(0, 0, this.scene.scale.width, this.scene.scale.height, 0xff3300)
      .setOrigin(0)
      .setAlpha(0)
      .setDepth(9999); // 모든 요소 위에

    this.bombFlash.setAlpha(0.8);
    this.scene.tweens.add({
      targets: this.bombFlash,
      alpha: { from: 0.3, to: 0 },
      duration: 400,
      repeat: 4,
    });

    const bombDuration = 2000; // 폭탄 지속 시간 (2초)
    const interval = 200;      // 0.2초마다 제거

    // 반복 제거 타이머
    const clearTimer = this.scene.time.addEvent({
      delay: interval,
      callback: () => {
        this.scene.enemyManager.clearAll(this.gameStatusManager.bombDamage); // 적과 총알 모두 제거
        this.scene.groundEnemyManager.clearAll(this.gameStatusManager.bombDamage); // 지상 적 모두 제거
      },
      repeat: Math.floor(bombDuration / interval) - 1 // 총 몇 번 반복할지
    });    
  }

  update() {

    const key = this.bulletManager.powerLevel >= 4 
    ? `${this.playerData.ship.key}_powerup`
    : this.playerData.ship.key;

    // 화면 경계 제한
    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.scale.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.scale.height);      

    // 키보드 입력 우선
    if (!this.isTouching) {
      if (this.cursors.left.isDown) {
        this.setVelocityX(-this.speed);
        this.anims.play(`${key}_left`, true);
      } else if (this.cursors.right.isDown) {
        this.setVelocityX(this.speed);
        this.anims.play(`${key}_right`, true);
      } else {
        this.setVelocityX(0);
        this.anims.play(`${key}_idle`, true);
      }

      if (this.cursors.up.isDown) {
        this.setVelocityY(-this.speed);
      } else if (this.cursors.down.isDown) {
        this.setVelocityY(this.speed);
      } else {
        this.setVelocityY(0);
      }

      if (this.cursors.space.isDown) {
        this.bulletManager.fire(this.x, this.y - 30);
      }

      if (Phaser.Input.Keyboard.JustDown(this.bombKey)) {
         this.useBomb(); 
      }

    }

    // 터치 입력 처리
    if (this.isTouching && this.touchTarget) {
      const angle = Phaser.Math.Angle.Between(this.x, this.y, this.touchTarget.x, this.touchTarget.y);
      const distance = Phaser.Math.Distance.Between(this.x, this.y, this.touchTarget.x, this.touchTarget.y);

      if (distance > 5) {
        this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);

        if (this.touchTarget.x < this.x - 10) {
          if (this.anims.currentAnim?.key !== `${key}_left`) this.anims.play(`${key}_left`);
        } else if (this.touchTarget.x > this.x + 10) {
          if (this.anims.currentAnim?.key !== `${key}_right`) this.anims.play(`${key}_right`);
        } else {
          if (this.anims.currentAnim?.key !== `${key}_idle`) this.anims.play(`${key}_idle`);
        }
      } else {
        this.setVelocity(0);
        if (this.anims.currentAnim?.key !== `${key}_idle`) this.anims.play(`${key}_idle`);
      }
     
      this.bulletManager.fire(this.x, this.y - 30);
    }
    
    this.bulletManager.update();

    // supportUnits 따라다님
    this.bulletManager.supportUnits?.forEach((unit, index) => {
      const offset = index === 0 ? -40 : 40;
      unit.update(this.x, this.y, offset);
    });    

  }
}