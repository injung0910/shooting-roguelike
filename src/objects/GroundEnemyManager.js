export default class GroundEnemyManager {
  constructor(scene) {
    this.scene = scene;
    this.enemyTanks = [];

  }

  spawnGroundEnemies(groundSpawnData) {
    const backgrounds = this.scene.backgroundGroup.getChildren();

    groundSpawnData.forEach(config => {
      const bg = backgrounds.find(bg => bg.texture.key === config.key);
      if (!bg) return;

      //const enemy = this.scene.add.sprite(bg.x + config.x, bg.y + config.y, 'enemy');
      const base = this.scene.add.sprite(bg.x + config.x, bg.y + config.y, config.b);
      base.setScale(1.2);
      const cannon = this.scene.add.sprite(bg.x + config.x, bg.y + config.y, config.c);
      cannon.setScale(1.2);

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

      this.enemyTanks.push({ base, cannon, hp: 20, lastFired: 0 }); // 원하는 체력 설정
    });
  }

  fireBullet(cannon) {
    const bullet = this.scene.physics.add.image(cannon.x, cannon.y, 'bullet4_1'); // 미사일 이미지 키
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

    // 체력 감소
    tank.hp  -= bullet.damage || 10;

    // 피격
    this.scene.game.effectManager.flashRed(tank.base);

    // 체력이 0 이하일 때 파괴
    if (tank.hp <= 0) {
      const bounds = tank.base.getBounds();
      const x = bounds.centerX;
      const y = bounds.centerY;
      
      // 이펙트
      this.scene.game.effectManager.smallExplosion(x, y);

      // 사운드
      this.scene.game.audioManager.playSFX('sfx_enemy_explosion');
      
      //점수
      this.scene.player.gameStatusManager.addScore(100);

      // Container에서 제거
      this.scene.backgroundContainer.remove(tank.base, true);
      this.scene.backgroundContainer.remove(tank.cannon, true);

      tank.base.destroy();
      tank.cannon.destroy();

      Phaser.Utils.Array.Remove(this.enemyTanks, tank);

      this.scene.enemyBaseGroup.remove(tank.base, true, true); 
    }
  }  

  bombDamage(damage){
    const camera = this.scene.cameras.main;

    this.enemyTanks.slice().forEach(tank => {
      if (!tank.base || !tank.base.active) return;

      const baseBounds = tank.base.getBounds();

      // 💡 탱크와 카메라가 겹치는지 검사
      if (Phaser.Geom.Intersects.RectangleToRectangle(baseBounds, camera.worldView)) {

        tank.hp -= damage;

        // 피격
        this.scene.game.effectManager.flashRed(tank.base);

        if (tank.hp <= 0) {
          const bounds = tank.base.getBounds();
          const x = bounds.centerX;
          const y = bounds.centerY;

          // 이펙트
          this.scene.game.effectManager.smallExplosion(x, y);

          // 사운드
          this.scene.game.audioManager.playSFX('sfx_enemy_explosion');

          //점수
          if(tank.base.active){
            this.scene.player.gameStatusManager.addScore(100);
          }

          // 제거 처리
          this.scene.backgroundContainer.remove(tank.base, true);
          this.scene.backgroundContainer.remove(tank.cannon, true);

          tank.base.destroy();
          tank.cannon.destroy();

          Phaser.Utils.Array.Remove(this.enemyTanks, tank);
          this.scene.enemyBaseGroup.remove(tank.base, true, true); 
        }
      }
    });
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

      if (inCameraView && time > tank.lastFired + 2500) {
        tank.lastFired = time;
        
        // 총알 발사
        this.scene.enemyManager.enemyBulletManager.fireWithAngle(
          cannonWorldX,
          cannonWorldY,
          angle,
          'enemy_bullet1',
          0, // 기본 프레임
          300
        );
      }
    }); 
  }
}