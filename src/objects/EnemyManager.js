import Enemy from '../objects/Enemy.js';

const enemyTypes = {
  bug1 : {
    speed: 100,
    fireRate: 300,
    hp: 15,
    bulletKey: 'bullets4',
    pattern: 'straight'
  },
  bug2 : {
    speed: 100,
    fireRate: 300,
    hp: 20,
    bulletKey: 'bullets4',
    pattern: 'zigzag'
  },
  bug3 : {
    speed: 100,
    fireRate: 300,
    hp: 24,
    bulletKey: 'bullets4',
    pattern: 'straight'
  }
};

export default class EnemyManager {
  constructor(scene) {
    this.scene = scene;
    this.enemies = scene.physics.add.group();
  }

  spawnEnemy(type = 'bug1') {
    const status = enemyTypes[type];
    const x = Phaser.Math.Between(50, this.scene.scale.width - 50);
    const enemy = new Enemy(this.scene, x, -50, type, status);
    this.enemies.add(enemy);
  }

  update() {
    this.enemies.children.iterate(enemy => {
      if (enemy && enemy.update) enemy.update();
    });
  }
}