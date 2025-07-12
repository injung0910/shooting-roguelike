import BulletManager from '../objects/BulletManager.js';

const SHIP_STATS = {
  Falcon: {
    key: 'plane2',
    name : 'Falcon',
    speed: 200,
    fireRate : 250,
    hitbox: { width: 19.2, height: 38.4, offsetX: 38.4, offsetY: 38.4 }
  },
  Cryphix: {
    key: 'plane9',
    name : 'Cryphix',
    speed: 250,
    fireRate : 200,
    hitbox: { width: 46.08, height: 24, offsetX: 24, offsetY: 43.2 }
  },
  Hawk: {
    key: 'plane6',
    name : 'Hawk',
    speed: 180,
    fireRate : 150,
    hitbox: { width: 19.2, height: 38.4, offsetX: 38.4, offsetY: 38.4 }
  }
};

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, data) {
    super(scene, 300, 700, data);
    
    this.scene = scene;
    this.data = data; // key, name 등 전체 저장

    const stats = SHIP_STATS[this.data.ship.name];

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(999); // 다른 오브젝트보다 위로
    
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
    this.createAnimations();
    this.play('idle');

    //this.game.audioManager.scene = this;

    // 발사
    this.bulletManager = new BulletManager(scene, stats, this.scene.game.audioManager);
  }

  createAnimations() {
    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers(this.data.ship.key, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers(this.data.ship.key, { start: 4, end: 11 }),
      frameRate: 15,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers(this.data.ship.key, { start: 12, end: 19 }),
      frameRate: 15,
      repeat: -1
    });
  }

  registerTouchControls() {
    this.scene.input.on('pointerdown', (pointer) => {
      this.touchTarget = { x: pointer.x, y: pointer.y };
    });

    this.scene.input.on('pointermove', (pointer) => {
      if (pointer.isDown) {
        this.touchTarget = { x: pointer.x, y: pointer.y };
      }
    });
  }

  update() {
    // 키보드 입력 우선
    if (this.cursors.left.isDown) {
      this.setVelocityX(-this.speed);
      this.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(this.speed);
      this.play('right', true);
    } else {
      this.setVelocityX(0);
      this.play('idle', true);
    }

    if (this.cursors.up.isDown) {
      this.setVelocityY(-this.speed);
    } else if (this.cursors.down.isDown) {
      this.setVelocityY(this.speed);
    } else {
      this.setVelocityY(0);
    }

    // 터치 입력 처리
    if (this.touchTarget) {
      const angle = Phaser.Math.Angle.Between(this.x, this.y, this.touchTarget.x, this.touchTarget.y);
      const distance = Phaser.Math.Distance.Between(this.x, this.y, this.touchTarget.x, this.touchTarget.y);

      if (distance > 5) {
        this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);
        if (this.touchTarget.x < this.x - 10) this.play('left', true);
        else if (this.touchTarget.x > this.x + 10) this.play('right', true);
        else this.play('idle', true);
      } else {
        this.setVelocity(0);
      }
    }

    // 화면 경계 제한
    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.scale.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.scale.height);

    if (this.cursors.space.isDown) {
      this.bulletManager.fire(this.x, this.y - 30);
    }

    if (this.touchTarget) {
      this.bulletManager.fire(this.x, this.y - 30);
    }

    this.bulletManager.update();
  }
}