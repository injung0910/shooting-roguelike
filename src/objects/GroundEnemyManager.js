export default class GroundEnemyManager {
  constructor(scene) {
    this.scene = scene;
    this.enemyTanks = [];

    // 생성할 배경과 좌표
    this.spawnConfigs = [
      { key: 'stage1_03', x: 129, y: 175, b:'tankbase_1', c:'tankcannon_1a'},
      { key: 'stage1_03', x: 129, y: 255, b:'tankbase_1', c:'tankcannon_1a' },
      { key: 'stage1_03', x: 478, y: 175, b:'tankbase_1', c:'tankcannon_1a' },
      { key: 'stage1_03', x: 478, y: 255, b:'tankbase_1', c:'tankcannon_1a' },

      { key: 'stage1_09', x: 129, y: 535, b:'tankbase_2', c:'tankcannon_2a' },
      { key: 'stage1_09', x: 129, y: 610, b:'tankbase_2', c:'tankcannon_2a' },
      { key: 'stage1_09', x: 478, y: 535, b:'tankbase_2', c:'tankcannon_2a' },
      { key: 'stage1_09', x: 478, y: 610, b:'tankbase_2', c:'tankcannon_2a' }
    ];
  }

  createEnemies() {
    const backgrounds = this.scene.backgroundGroup.getChildren();

    this.spawnConfigs.forEach(config => {
      const bg = backgrounds.find(bg => bg.texture.key === config.key);
      if (!bg) return;

      //const enemy = this.scene.add.sprite(bg.x + config.x, bg.y + config.y, 'enemy');
      const base = this.scene.add.sprite(bg.x + config.x, bg.y + config.y, config.b);
      const cannon = this.scene.add.sprite(bg.x + config.x, bg.y + config.y, config.c);

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

      this.enemyTanks.push({ base, cannon, hp: 15, lastFired: 0 }); // 원하는 체력 설정
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

  update(time, delta) {
    this.enemyTanks.forEach(tank => {
      const { cannon, base } = tank;
      if (!cannon || !cannon.active || !this.scene.player) return;

      // 회전 처리
      const world = cannon.getWorldTransformMatrix().decomposeMatrix();
      const cannonWorldX = world.translateX;
      const cannonWorldY = world.translateY;

      const angle = Phaser.Math.Angle.Between(
        cannonWorldX, cannonWorldY,
        this.scene.player.x, this.scene.player.y
      );
      cannon.rotation = angle + Phaser.Math.DegToRad(90);

      // 발사 조건 확인
      const camera = this.scene.cameras.main;

      const inCameraView =
        cannonWorldX > camera.worldView.x &&
        cannonWorldX < camera.worldView.x + camera.width &&
        cannonWorldY > camera.worldView.y &&
        cannonWorldY < camera.worldView.y + camera.height;

      console.log('🔥 탱크 발사!', cannonWorldX, cannonWorldY);

      if (inCameraView && time > tank.lastFired + 1500) {
        tank.lastFired = time;
        
        // 총알 발사
        this.scene.enemyManager.enemyBulletManager.fireWithAngle(
          cannonWorldX,
          cannonWorldY,
          angle,
          'bullets4',
          300
        );
      }
    }); 
  }
}