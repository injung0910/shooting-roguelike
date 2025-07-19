import SupportUnit from './SupportUnit.js';

export default class BulletManager {
  constructor(scene, playerData, audioManager) {
    this.scene = scene;
    this.playerData = playerData; // ship 정보 포함됨
    this.audioManager = audioManager;

    const bulletKey = this.getBulletKeyByShip();

    this.bullets = this.scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      maxSize: 100,
      runChildUpdate: true
    });

    this.missileGroup = this.scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      maxSize : 100,
      runChildUpdate: true
    });

    this.fireRate = this.playerData.fireRate;
    this.lastFired = 0;

    // 초기 파워 레벨
    this.powerLevel = 1; // 초기 파워 레벨

    this.supportUnits = [];

    this.auraTimer = null; // 오라 타이머 추적용

    this.lastMissileTime = 0;
    this.missileCooldown = 500; // 밀리초 단위, 예: 0.5초마다 발사

  }

  fire(x, y) {
    const time = this.scene.time.now;
    if (time < this.lastFired + this.fireRate) return;

    const bulletKey = this.getBulletKeyByShip();
    console.log('this.powerLevel : ' + this.powerLevel);

    // 파워 레벨에 따른 오프셋/각도 설정
    let config = [];

    if (bulletKey === 'bullets3') {
      const levels = {
        1: [ { offsetX: 0, angle: 0 } ],
        2: [ { offsetX: -10, angle: -0.1 }, { offsetX: 10, angle: 0.1 } ],
        3: [ { offsetX: 0, angle: 0 }, { offsetX: -10, angle: -0.3 }, { offsetX: 10, angle: 0.3 } ],
        4: [ 
          { offsetX: 0, angle: 0 }, 
          { offsetX: -10, angle: -0.3 }, 
          { offsetX: 10, angle: 0.3 }, 
          { offsetX: -30, angle: -0.6 }, 
          { offsetX: 30, angle: 0.6 }
        ],
        5: [ 
          { offsetX: 0, angle: 0 }, 
          { offsetX: -10, angle: -0.3 }, 
          { offsetX: 10, angle: 0.3 }, 
          { offsetX: -30, angle: -0.6 }, 
          { offsetX: 30, angle: 0.6 }
        ]
      };
      config = levels[this.powerLevel] || levels[1];

    } else if (bulletKey === 'bullets5') {
      // bullets5
      const levels = {
        1: [ { offsetX: 0, angle: 0 } ],
        2: [ { offsetX: -5, angle: 0 }, { offsetX: 5, angle: 0 } ],
        3: [ { offsetX: 0, angle: 0 }, { offsetX: -10, angle: 0 }, { offsetX: 10, angle: 0 } ],
        4: [ 
          { offsetX: 0, angle: 0 }, 
          { offsetX: -10, angle: 0 }, 
          { offsetX: 10, angle: 0 }, 
          { offsetX: -20, angle: 0 }, 
          { offsetX: 20, angle: 0 }
        ],
        5: [ 
          { offsetX: 0, angle: 0 }, 
          { offsetX: -10, angle: 0 }, 
          { offsetX: 10, angle: 0 }, 
          { offsetX: -20, angle: 0 }, 
          { offsetX: 20, angle: 0 }
        ]
      };
      config = levels[this.powerLevel] || levels[1];
    } else if (bulletKey === 'bullets1') {
      // bullets1
      const levels = {
        1: [ { offsetX: 0, angle: 0 } ],
        2: [ { offsetX: -5, angle: 0 }, { offsetX: 5, angle: 0 } ],
        3: [ { offsetX: 0, angle: 0 }, { offsetX: -10, angle: 0 }, { offsetX: 10, angle: 0 } ],
        4: [ { offsetX: -5, angle: 0 }, { offsetX: 5, angle: 0 }, { offsetX: -15, angle: 0 }, { offsetX: 15, angle: 0 } ],
        5: [ { offsetX: -5, angle: 0 }, { offsetX: 5, angle: 0 }, { offsetX: -15, angle: 0 }, { offsetX: 15, angle: 0 } ]
      };
      config = levels[this.powerLevel] || levels[1];
    }

    // config 배열을 기반으로 총알 생성
    config.forEach(cfg => {
      this.spawnBullet(x + cfg.offsetX, y, bulletKey, cfg.angle);
    });

    this.scene.game.audioManager.playSFX('sfx_' + bulletKey);
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

  increasePowerLevel() {
    if (this.powerLevel < 5) {
      this.scene.game.audioManager.playSFX('sfx_powerup');
      this.powerLevel++;
    }else{
      this.scene.game.audioManager.playSFX('sfx_powerup_etc');
    }
  }

  spawnBullet(x, y, key, angle = 0) {
    const bullet = this.bullets.get(x, y, key);
    if (!bullet) return;

    bullet.setActive(true);
    bullet.setVisible(true);
    bullet.body.enable = true;

    const speed = -400;
    bullet.setVelocityY(speed);
    bullet.setVelocityX(Math.sin(angle) * 150); // 지그재그 각도
    bullet.setAngle(Phaser.Math.RadToDeg(angle));
    
    if(key === 'bullets3'){
      if (this.powerLevel === 5 && this.supportUnits.length === 0) {
        const unit1 = new SupportUnit(this.scene, this.scene.player.x - 10, this.scene.player.y + 25);
        const unit2 = new SupportUnit(this.scene, this.scene.player.x + 10, this.scene.player.y + 25);
        this.supportUnits.push(unit1, unit2);
      }    
    }else if(key === 'bullets5'){
      if (this.powerLevel < 5) {
        bullet.setScale(1 + this.powerLevel * 0.2, 1 + this.powerLevel * 0.2);
      }

      // 레벨 5 도달 시 오라 시작
      if (this.powerLevel === 5 && !this.auraTimer) {
        this.createElectricAura();

        this.auraTimer = this.scene.time.addEvent({
          delay: 4000, // 5초 (ms 단위)
          callback: this.createElectricAura,
          callbackScope: this,
          loop: true
        });
      }
      
    }else if (key === 'bullets1'){
      let baseFireRate = this.playerData.fireRate;
      if (this.powerLevel >= 4) this.fireRate = baseFireRate - 25;
      else this.fireRate = baseFireRate;

      const now = this.scene.time.now;

      if (this.powerLevel >= 5 && now - this.lastMissileTime > this.missileCooldown) {
        this.lastMissileTime = now;

        const missileOffsets = [-50, -30, 30, 50];
        missileOffsets.forEach(offset => {
          this.spawnMissile(this.scene.player.x + offset, this.scene.player.y);
        });
      }
    }

    bullet.damage = this.getDamageByBulletKey(key);
  }  

  createElectricAura() {
    if (this.electricAura) return; // 이미 생성되어 있으면 무시

    this.electricAura = this.scene.add.sprite(this.scene.player.x, this.scene.player.y, 'lightningShield');
    this.electricAura.play('lightningShield');
    this.electricAura.setDepth(5);
    this.electricAura.setScale(3);
    this.electricAura.setAlpha(0.8);

    // 충돌 감지를 위해 물리 엔진 적용
    this.scene.physics.add.existing(this.electricAura);
    this.electricAura.body.setCircle(this.electricAura.width / 2); // 원형 충돌 범위
    this.electricAura.body.setAllowGravity(false);

    // 주기적으로 적에게 데미지
    this.auraDamageTimer = this.scene.time.addEvent({
      delay: 100, // 0.1초마다 데미지
      callback: () => {
        this.scene.physics.overlap(
          this.electricAura,
          this.scene.enemyManager.enemies,
          (aura, enemy) => {
            this.scene.enemyManager.applyDamage(enemy, 5); // 5 데미지
          }
        );
      },
      loop: true
    });

    // 3초 후 오라 제거
    this.scene.time.delayedCall(3000, () => {
      if (this.electricAura) {
        this.electricAura.destroy();
        this.electricAura = null;
      }
      if (this.auraDamageTimer) {
        this.auraDamageTimer.remove();
        this.auraDamageTimer = null;
      }
    });
  }

  destroyAura() {
    if (this.auraTimer) {
      this.auraTimer.remove();
      this.auraTimer = null;
    }
  }

  spawnMissile(x, y) {
    const missile = this.missileGroup.get(x, y, 'missile03');

    if (!missile) return;

    missile.setActive(true);
    missile.setVisible(true);
    missile.body.enable = true;

    missile.setVelocityY(-300); // 위로 직진
    missile.setAngle(0);        // 회전 보정
    missile.damage = 1;         // 데미지 설정 (관통탄용)

    // 애니메이션 재생 (missile03에 대한 anim이 정의되어 있어야 함)
    if (missile.anims && typeof missile.play === 'function') {
      missile.play('missile3_anim');
    }

    // 충돌 처리용 그룹에 추가
    if (this.scene.hwakGroup) {
      this.scene.hwakGroup.add(missile);
    }
  }

  update() {
    this.bullets.children.iterate(bullet => {
      if (bullet && bullet.active && bullet.y < -100) {
        this.bullets.killAndHide(bullet);
        bullet.body.enable = false;
      }
    });

    this.missileGroup.children.iterate(missile => {
      if (missile && missile.active && missile.y < -100) {
        this.missileGroup.killAndHide(missile);
        missile.body.enable = false;
      }
    });

    if (this.electricAura) {
      this.electricAura.x = this.scene.player.x;
      this.electricAura.y = this.scene.player.y;
    }    
  }
}