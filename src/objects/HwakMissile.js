export default class HwakMissile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, target) {
    super(scene, x, y, 'rotating_flame_sheet');

    this.scene = scene;
    this.target = target;
    this.speed = 200;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    this.play('rotating_flame_sheet'); // ← 애니메이션 재생

    this.setSize(10, 10);
    this.setScale(1.5);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (!this.active || !this.target || !this.target.active) {
      this.destroy();
      return;
    }

    const angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
    this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);
    this.rotation = angle;
  }
}