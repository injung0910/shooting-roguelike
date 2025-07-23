export default class MineEnemyManager {
  constructor(scene) {
    this.scene = scene;
    this.mines = [];

  }

  spawnMine(mineSpawnData) {
    const backgrounds = this.scene.backgroundGroup.getChildren();

    mineSpawnData.forEach(config => {
      const bg = backgrounds.find(bg => bg.texture.key === config.key);
      if (!bg) return;

      const x = bg.x + config.x;
      const y = bg.y + config.y;

      const spriteKey = config.type === 'passive' ? 'minibeam' : 'mini_5';

      let mine; // 

      if(config.type === 'passive'){
          mine = this.scene.add.sprite(x, y, spriteKey);
          mine.setScale(1); 
          // 애니메이션 시작
          mine.play(spriteKey);

          this.scene.physics.add.existing(mine);
          this.scene.backgroundContainer.add(mine);

          // 피격 크기 조절
          mine.body.setSize(48, 48); // 피격 범위만 작게
          mine.body.setOffset(8, 8); // 이미지 중심 보정

      }else if(config.type === 'suicide'){
          mine = this.scene.add.image(x, y, spriteKey);
          mine.setScale(1); 

          this.scene.physics.add.existing(mine);
          this.scene.backgroundContainer.add(mine);

          // 피격 크기 조절
          mine.body.setSize(24, 24); // 피격 범위만 작게
          mine.body.setOffset(20, 20); // 이미지 중심 보정
      }


      this.mines.push(mine);

      mine.mineType = config.type;

      // Suicide 타입은 깜빡이다 터지는 애니메이션
      if (mine.mineType === 'suicide') {
        this.scene.tweens.add({
          targets: mine,
          alpha: 0.3,
          duration: 200,
          yoyo: true,
          repeat: -1
        });
      }
    });
  }

  update() {
    this.mines.forEach(mine => {
      // 카메라 안에 들어온 후 터뜨리는 로직 등
      if (mine.mineType === 'suicide') {
        const distance = Phaser.Math.Distance.Between(
          mine.x, mine.y,
          this.scene.player.x, this.scene.player.y
        );

        if (distance < 30) {
          // 플레이어 피격 처리
          this.scene.player.takeHitFromEnemy();
          this.destroyMine(mine);
        }
      }
    });
  }

  handlePlayerCollision(mine, player) {
    if (mine.mineType === 'passive') {
      player.takeHitFromEnemy();
    } else if (mine.mineType === 'suicide') {
      player.takeHitFromEnemy();
      this.destroyMine(mine);
    }
  }

  destroyMine(mine) {
    const matrix = mine.getWorldTransformMatrix().decomposeMatrix();
    const worldX = matrix.translateX;
    const worldY = matrix.translateY;

    const mineExplosion = this.scene.add.sprite(worldX, worldY, 'mini_5_explosion');
    mineExplosion.play('mini_5_explosion');
    mineExplosion.once('animationcomplete', () => mineExplosion.destroy());

    this.scene.game.audioManager.playSFX('sfx_mine_explosion');
    this.scene.game.audioManager.playSFX('sfx_enemy_explosion');
    this.scene.backgroundContainer.remove(mine, true);
    mine.destroy();
    this.mines = this.mines.filter(m => m !== mine);
  }
}