export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, data) {
    super(scene, 300, 700, data.key);
    
    this.scene = scene;
    this.data = data; // key, name 등 전체 저장

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(999); // 다른 오브젝트보다 위로

    // 기체별 피격사이즈 설정
    if(this.data.ship.name === 'Falcon'){
      this.setSize(96 * 0.2, 96 * 0.4).setOffset(96 * 0.4, 96 * 0.4);
    }else{
      this.setSize(96 * 0.48, 96 * 0.25).setOffset(96 * 0.25, 96 * 0.45);
    }

    // 충돌 범위 설정 등
    this.setCollideWorldBounds(true);

    // 입력 처리
    this.cursors = scene.input.keyboard.createCursorKeys();

    // 터치 관련 변수
    this.touchTarget = null;
    this.speed = 200;

    this.registerTouchControls();
    this.createAnimations();
    this.play('idle');
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
  }
}