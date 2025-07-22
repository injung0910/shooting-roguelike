export default class GroundEnemyManager {
  constructor(scene) {
    this.scene = scene;
    this.enemyTanks = [];

    // 생성할 배경과 좌표
    this.spawnConfigs = [
      { key: 'stage1_04', x: 300, y: 600 },
      { key: 'stage1_07', x: 450, y: 650 },
    ];
  }

  createEnemies() {
    const backgrounds = this.scene.backgroundGroup.getChildren();

    this.spawnConfigs.forEach(config => {
      const bg = backgrounds.find(bg => bg.texture.key === config.key);
      if (!bg) return;

      const base = this.scene.add.sprite(bg.x + config.x, bg.y + config.y, 'tank_base');
      const cannon = this.scene.add.sprite(bg.x + config.x, bg.y + config.y - 10, 'tank_cannon');

      this.scene.physics.add.existing(base);
      base.body.setImmovable(true);

      this.scene.backgroundContainer.add(base);
      this.scene.backgroundContainer.add(cannon);

      this.enemyTanks.push({ base, cannon });
    });
  }

  update() {
    this.enemyTanks.forEach(tank => {
      const { cannon } = tank;
      if (!cannon || !this.scene.player) return;

      const angle = Phaser.Math.Angle.Between(
        cannon.x, cannon.y,
        this.scene.player.x, this.scene.player.y
      );
      cannon.rotation = angle;
    });
  }
}