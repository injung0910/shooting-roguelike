export default class Player {
  constructor(scene, selectedKey = 'player1') {
    this.scene = scene;
    this.selectedKey = selectedKey;

    this.createAnimations();

    this.sprite = scene.physics.add.sprite(
      scene.scale.width / 2,
      scene.scale.height - 100,
      selectedKey
    );

    this.sprite.setCollideWorldBounds(true);
    this.sprite.play(`${selectedKey}_fly`);

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  createAnimations() {
    const anims = this.scene.anims;

    const keys = ['fly', 'left', 'right'];
    const frameRanges = {
      fly: [0, 3],
      left: [4, 11],
      right: [12, 19],
    };

    keys.forEach(key => {
      const animKey = `${this.selectedKey}_${key}`;
      if (!anims.exists(animKey)) {
        anims.create({
          key: animKey,
          frames: anims.generateFrameNumbers(this.selectedKey, {
            start: frameRanges[key][0],
            end: frameRanges[key][1]
          }),
          frameRate: 10,
          repeat: -1
        });
      }
    });
  }

  update() {
    const speed = 300;
    const sprite = this.sprite;
    const { left, right, up, down } = this.cursors;

    if (!sprite || !sprite.active) return;

    if (left.isDown) {
      sprite.setVelocityX(-speed);
      if (sprite.anims.currentAnim?.key !== `${this.selectedKey}_left`) {
        sprite.play(`${this.selectedKey}_left`);
      }
    } else if (right.isDown) {
      sprite.setVelocityX(speed);
      if (sprite.anims.currentAnim?.key !== `${this.selectedKey}_right`) {
        sprite.play(`${this.selectedKey}_right`);
      }
    } else {
      sprite.setVelocityX(0);
      if (sprite.anims.currentAnim?.key !== `${this.selectedKey}_fly`) {
        sprite.play(`${this.selectedKey}_fly`);
      }
    }

    if (up.isDown) {
      sprite.setVelocityY(-speed);
    } else if (down.isDown) {
      sprite.setVelocityY(speed);
    } else {
      sprite.setVelocityY(0);
    }
  }

  getSprite() {
    return this.sprite;
  }
}