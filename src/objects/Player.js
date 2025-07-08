export default class Player {
  constructor(scene) {
    this.scene = scene;

    // 애니메이션 미리 정의
    this.createAnimations();

    // 플레이어 스프라이트 생성
    this.sprite = scene.physics.add.sprite(
      scene.scale.width / 2,
      scene.scale.height - 100,
      'player1'
    );

    this.sprite.setCollideWorldBounds(true);
    this.sprite.play('fly');

    // 키보드 입력
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  createAnimations() {
    const anims = this.scene.anims;

    if (!anims.exists('fly')) {
      anims.create({
        key: 'fly',
        frames: anims.generateFrameNumbers('player1', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
    }

    if (!anims.exists('left')) {
      anims.create({
        key: 'left',
        frames: anims.generateFrameNumbers('player1', { start: 4, end: 11 }),
        frameRate: 10,
        repeat: -1
      });
    }

    if (!anims.exists('right')) {
      anims.create({
        key: 'right',
        frames: anims.generateFrameNumbers('player1', { start: 12, end: 19 }),
        frameRate: 10,
        repeat: -1
      });
    }
  }

  update() {
    const speed = 300;
    const sprite = this.sprite;
    const { left, right, up, down } = this.cursors;

    if (!sprite || !sprite.active) return;

    // 좌우 이동
    if (left.isDown) {
      sprite.setVelocityX(-speed);
      if (sprite.anims.currentAnim?.key !== 'left') sprite.play('left');
    } else if (right.isDown) {
      sprite.setVelocityX(speed);
      if (sprite.anims.currentAnim?.key !== 'right') sprite.play('right');
    } else {
      sprite.setVelocityX(0);
      if (sprite.anims.currentAnim?.key !== 'fly') sprite.play('fly');
    }

    // 위아래 이동
    if (up.isDown) {
      sprite.setVelocityY(-speed);
    } else if (down.isDown) {
      sprite.setVelocityY(speed);
    } else {
      sprite.setVelocityY(0);
    }
  }
}