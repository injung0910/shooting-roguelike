export default class Powerup {
  constructor(scene, player, bulletManager) {
    this.scene = scene;
    this.player = player;
    this.bulletManager = bulletManager;

    // Create a physics group for powerups
    this.group = scene.physics.add.group();

    // Define the powerup animation if not already defined
    if (!scene.anims.get('powerup_anim')) {
      scene.anims.create({
        key: 'powerup_anim',
        frames: scene.anims.generateFrameNumbers('powerup', { start: 0, end: 4 }),
        frameRate: 8,
        repeat: -1
      });
    }

    // Handle collision between player and powerup
    scene.physics.add.overlap(
      player.sprite,
      this.group,
      this.collectPowerup,
      null,
      this
    );
  }

  spawn(x, y) {
    const powerup = this.group.create(x, y, 'powerup');
    powerup.play('powerup_anim');
    powerup.setVelocityY(100);
  }

  collectPowerup(playerSprite, powerup) {
    powerup.destroy();
    this.bulletManager.increasePower();
    // Optionally add effects or sound here
  }
}