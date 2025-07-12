export default class BulletManager {
  constructor(scene, playerData, audioManager) {
    this.scene = scene;
    this.playerData = playerData; // ship 정보 포함됨
    this.audioManager = audioManager;

    this.bullets = this.scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      maxSize: 50,
      runChildUpdate: true
    });

    this.fireRate = this.playerData.fireRate;
    this.lastFired = 0;
  }

  fire(x, y) {
    const time = this.scene.time.now;
    if (time < this.lastFired + this.fireRate) return;

    const bulletKey = this.getBulletKeyByShip(); // 기체에 따라 bullet 키 다르게

    //console.log('bulletKey : ' + bulletKey);

    const bullet = this.bullets.get(x, y, bulletKey);
    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.body.enable = true;
      bullet.setVelocityY(-400);

      this.scene.game.audioManager.playSFX('sfx_' + bulletKey);
    }

    this.lastFired = time;
  }

  getBulletKeyByShip() {
    const shipName = this.playerData.name;
    switch (shipName) {
      case 'Falcon':
        return 'bullets3';
      case 'Cryphix':
        return 'bullets5';
      case 'Hawk':
        return 'bullets1';
      default:
        return 'bullets1';
    }
  }

  getDamageByBulletKey(key) {
    switch (key) {
      case 'bullets3': return 8;
      case 'bullets5': return 10;
      case 'bullets1': return 5;
      default: return 5;
    }
  }  

  update() {
    this.bullets.children.iterate(bullet => {
      if (bullet && bullet.active && bullet.y < -50) {
        this.bullets.killAndHide(bullet);
        bullet.body.enable = false;
      }
    });
  }
}