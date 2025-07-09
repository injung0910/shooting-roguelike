export default class EnemyManager {
  constructor(scene) {
    this.scene = scene;

    // 적 애니메이션
    if (!scene.anims.exists('bug2')) {
      scene.anims.create({
        key: 'bug2',
        frames: scene.anims.generateFrameNumbers('bug2', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
      });
    }

    // 적 그룹 생성
    this.enemies = scene.physics.add.group();

    //this.spawnInitialEnemies();
  }

  spawnInitialEnemies() {
    this.spawnLeftEnemies();

    this.scene.time.delayedCall(5000, () => {
      this.spawnRightEnemies();
    });
  }

  spawnLeftEnemies() {
    const positions = [100, 150, 200];
    positions.forEach(x => {
      const enemy = this.enemies.create(x, -64, 'bug2');
      enemy.play('bug2');
      enemy.setVelocityY(50);
    });
  }

  spawnRightEnemies() {
    const positions = [400, 450, 500];
    positions.forEach(x => {
      const enemy = this.enemies.create(x, -64, 'bug2');
      enemy.play('bug2');
      enemy.setVelocityY(50);
    });
  }

  update() {
    this.enemies.children.iterate(enemy => {
      if (enemy && enemy.y > 900) {
        enemy.destroy();
      }
    });
  }
}