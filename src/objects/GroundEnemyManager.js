export default class GroundEnemyManager {
  constructor(scene) {
    this.scene = scene;
    this.enemyTanks = [];

    // 생성할 배경과 좌표
    this.spawnConfigs = [
      { key: 'sample_01', x: 250, y: 100 },
      { key: 'sample_01', x: 350, y: 100 },
    ];
  }

  createEnemies() {
    const backgrounds = this.scene.backgroundGroup.getChildren();

    this.spawnConfigs.forEach(config => {
      const bg = backgrounds.find(bg => bg.texture.key === config.key);
      if (!bg) return;

      //const enemy = this.scene.add.sprite(bg.x + config.x, bg.y + config.y, 'enemy');
      const base = this.scene.add.sprite(bg.x + config.x, bg.y + config.y, 'tankbase_1');
      const cannon = this.scene.add.sprite(bg.x + config.x, bg.y + config.y, 'tankcannon_1a');

      base.setName(`tank_base_${Phaser.Math.RND.uuid()}`);
      cannon.setName(`tank_cannon_${Phaser.Math.RND.uuid()}`);

      this.scene.enemyBaseGroup.add(base);

      this.scene.physics.add.existing(base);
      base.body.setImmovable(true);

      this.scene.backgroundContainer.add(base);
      this.scene.backgroundContainer.add(cannon);

      // 🎯 생성 직후 플레이어 방향으로 회전
      const world = cannon.getWorldTransformMatrix().decomposeMatrix();
      const cannonWorldX = world.translateX;
      const cannonWorldY = world.translateY;

      const angle = Phaser.Math.Angle.Between(
        cannonWorldX, cannonWorldY,
        this.scene.player.x, this.scene.player.y
      );

      cannon.rotation = angle + Phaser.Math.DegToRad(90);

      // 🔁 일정 간격으로 발사
      this.scene.time.addEvent({
        delay: 1000,
        callback: () => {
          if (!this.scene.player || !cannon.active) return;

          const tempMatrix = cannon.getWorldTransformMatrix();
          const worldX = tempMatrix.tx;
          const worldY = tempMatrix.ty;

          const angle = Phaser.Math.Angle.Between(
            worldX, worldY,
            this.scene.player.x, this.scene.player.y
          );

          this.scene.enemyManager.enemyBulletManager.fireWithAngle(
            worldX,
            worldY,
            angle,
            'bullets4',
            300
          );
        },
        callbackScope: this,
        loop: true
      });

      this.enemyTanks.push({ base, cannon, hp: 15 }); // 원하는 체력 설정
    });
  }

  fireBullet(cannon) {
    const bullet = this.scene.physics.add.image(cannon.x, cannon.y, 'bullet4'); // 미사일 이미지 키
    bullet.setDepth(5);
    
    const angle = cannon.rotation;
    const speed = 300;

    bullet.setVelocity(
      Math.cos(angle) * speed,
      Math.sin(angle) * speed
    );

    bullet.setRotation(angle); // 총구 방향과 동일하게 회전
    this.scene.enemyBullets.add(bullet);
  }

  handleGroundEnemyHit(bullet, target) {
    bullet.disableBody(true, true);

    const tank = this.enemyTanks.find(t => 
      t.base.name === target.name || 
      t.cannon.name === target.name
    );
    if (!tank || !tank.base || !tank.cannon) return;

    console.log('tank.hp1 : ' + tank.hp);

    // 체력 감소
    tank.hp  -= bullet.damage || 10;

    console.log('tank.hp2 : ' + tank.hp);

    // 데미지 반응 (선택: 깜빡임 효과 등)
    this.scene.tweens.add({
      targets: tank.base,
      alpha: 0.5,
      duration: 100,
      yoyo: true,
      repeat: 1,
      onComplete: () => tank.base.setAlpha(1)
    });

    // 체력이 0 이하일 때 파괴
    if (tank.hp <= 0) {
      const bounds = tank.base.getBounds();
      const x = bounds.centerX;
      const y = bounds.centerY;
      
      const explosion = this.scene.add.sprite(x, y, 'enemy_explosion_small');
      explosion.play('enemy_explosion_small');
      explosion.once('animationcomplete', () => explosion.destroy());

      const explosioncannon = this.scene.add.sprite(x, y, 'enemy_explosion_small');
      explosioncannon.play('enemy_explosion_small');
      explosioncannon.once('animationcomplete', () => explosioncannon.destroy());      

      this.scene.game.audioManager.playSFX('sfx_enemy_explosion');

      // Container에서 제거
      this.scene.backgroundContainer.remove(tank.base, true);
      this.scene.backgroundContainer.remove(tank.cannon, true);

      tank.base.destroy();
      tank.cannon.destroy();

      Phaser.Utils.Array.Remove(this.enemyTanks, tank);

      this.scene.enemyBaseGroup.remove(tank.base, true, true); 
    }
  }  

  update() {
    this.enemyTanks.forEach(tank => {
      const { cannon } = tank;
      if (!cannon || !this.scene.player) return;

      const world = cannon.getWorldTransformMatrix().decomposeMatrix();
      const cannonWorldX = world.translateX;
      const cannonWorldY = world.translateY;

      const angle = Phaser.Math.Angle.Between(
        cannonWorldX, cannonWorldY,
        this.scene.player.x, this.scene.player.y
      );

      cannon.rotation = angle + Phaser.Math.DegToRad(90);
    });
  }
}