export default class SelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SelectScene' });
  }

  create() {
    
    // bgm 설정
    this.game.audioManager.scene = this;
    this.game.audioManager.playBGM('bgm_shipselect', { loop: true, volume: this.game.audioManager.bgmVolume }, true);

    // 1. 배경
    this.add.image(0, 0, 'purple_background')
      .setOrigin(0)
      .setDisplaySize(600, 800);

        // 배경 위에 별 레이어
    this.add.image(0, 0, 'stars_1')
      .setOrigin(0)
      .setDisplaySize(600, 800); // 같은 크기로 맞춰줌  

    const title = this.add.text(this.scale.width / 2, 50, 'Select Your Plane', {
      fontFamily: 'ThaleahFat',
      fontSize: '48px',
      color: '#00ffff'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: title,
      alpha: { from: 1, to: 0.3 },
      duration: 600,
      yoyo: true,
      repeat: -1
    });

  
    const centerX = this.scale.width / 2;
    const centerY = 550;

    // 기체 목록
    this.planeData = [
      { key: 'plane2', name: 'Falcon' },
      { key: 'plane9', name: 'Cryphix' },
      { key: 'plane6', name: 'Hawk' }
    ];

    this.selectedIndex = 0;
    this.planes = [];
    this.nameTexts = [];
    this.tweensList = [];

    this.planeData.forEach((data) => {
      const animKey = `${data.key}_idle`;
      if (!this.anims.exists(animKey)) {
        this.anims.create({
          key: animKey,
          frames: this.anims.generateFrameNumbers(`${data.key}`, { start: 0, end: 3 }),
          frameRate: 6,
          repeat: -1
        });
      }
    });

    this.planeData.forEach((data, i) => {
      const x = 150 + (i * 150);

      // 스프라이트에 애니메이션 적용
      const sprite = this.add.sprite(x, centerY, data.key)
        .setScale(2)
        .play(`${data.key}_idle`).setInteractive();

      sprite.on('pointerdown', () => {
        this.selectShip(i); // 🔸 해당 기체 선택 처리 함수 호출
      });
      
        this.planes.push(sprite);

      // 텍스트 추가 (기본 흰색)
      const name = this.add.text(x, centerY + 120, data.name, {
        fontFamily: 'ThaleahFat',
        fontSize: '28px',
        color: '#ffffff'
      }).setOrigin(0.5);
      this.nameTexts.push(name);
    });

    // 하단 안내
    this.add.text(centerX, this.scale.height - 50, '← → SELECT | ENTER : START | SPACE : POWERUP PREVIEW', {
      fontFamily: 'ThaleahFat',
      fontSize: '24px',
      color: '#cccccc'
    }).setOrigin(0.5);


    // preview용 player 생성
    if (!this.anims.exists('plane2_anim')) {
      this.anims.create({
        key: 'plane2_anim',
        frames: this.anims.generateFrameNumbers('plane2', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
      });
    }

        // preview용 player 생성
    if (!this.anims.exists('plane2_powerup_anim')) {
      this.anims.create({
        key: 'plane2_powerup_anim',
        frames: this.anims.generateFrameNumbers('plane2_powerup', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
      });
    }

    // preview용 player 생성
    if (!this.anims.exists('plane9_anim')) {
      this.anims.create({
        key: 'plane9_anim',
        frames: this.anims.generateFrameNumbers('plane9', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
      });
    }

    // preview용 player 생성
    if (!this.anims.exists('plane9_powerup_anim')) {
      this.anims.create({
        key: 'plane9_powerup_anim',
        frames: this.anims.generateFrameNumbers('plane9_powerup', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
      });
    }    

    // preview용 player 생성
    if (!this.anims.exists('plane6_anim')) {
      this.anims.create({
        key: 'plane6_anim',
        frames: this.anims.generateFrameNumbers('plane6', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
      });
    }

    // preview용 player 생성
    if (!this.anims.exists('plane6_powerup_anim')) {
      this.anims.create({
        key: 'plane6_powerup_anim',
        frames: this.anims.generateFrameNumbers('plane6_powerup', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
      });
    }        

    // preview용 bullet 생성
    if (!this.anims.exists('bullets3_anim')) {
      this.anims.create({
        key: 'bullets3_anim',
        frames: this.anims.generateFrameNumbers('bullets3', { start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1
      });
    }

    // preview용 bullet 생성
    if (!this.anims.exists('bullets5_anim')) {    
      this.anims.create({
        key: 'bullets5_anim',
        frames: this.anims.generateFrameNumbers('bullets5', { start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1
      });
    }

    // preview용 bullet 생성
    if (!this.anims.exists('bullets1_anim')) {    
      this.anims.create({
        key: 'bullets1_anim',
        frames: this.anims.generateFrameNumbers('bullets1', { start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1
      });
    }

    // bullet 초기화
    this.currentBulletGroup = this.physics.add.group(); // 초기화

    this.poweredUp = false; // 기본 상태
    
    // 기체 설명 텍스트
    this.planeDescription = this.add.text(this.scale.width / 2, 500, '', {
      fontFamily: 'ThaleahFat',
      fontSize: '18px',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: 400 }
    }).setOrigin(0.5);

    // 기체 스탯 (예: 공격력, 속도)
    this.attackBar = this.add.rectangle(450, 340, 100, 10, 0xff3333);
    this.speedBar = this.add.rectangle(450, 360, 100, 10, 0x3333ff);
    this.fireBar = this.add.rectangle(450, 380, 100, 10, 0xff33ff);
    this.statusLabel = this.add.text(400, 310, 'Status', { fontSize: '18px', color: '#ffffff' });
    this.attackLabel = this.add.text(400, 330, 'Attack', { fontSize: '14px', color: '#ffffff' });
    this.speedLabel = this.add.text(400, 350, 'Speed', { fontSize: '14px', color: '#ffffff' });
    this.fireLabel = this.add.text(400, 370, 'FireRate', { fontSize: '14px', color: '#ffffff' });


    // player1 기본선택
    this.updateSelection();
    this.updateSelectedPlane('plane2');


    // 조작설정
    this.input.keyboard.on('keydown-LEFT', () => {
      this.game.audioManager.playSFX('sfx_ship_select');
      this.selectedIndex = (this.selectedIndex - 1 + this.planeData.length) % this.planeData.length;
      this.updateSelection();
      this.updateSelectedPlane(this.planeData[this.selectedIndex].key);
    });

    this.input.keyboard.on('keydown-RIGHT', () => {
      this.game.audioManager.playSFX('sfx_ship_select');
      this.selectedIndex = (this.selectedIndex + 1) % this.planeData.length;
      this.updateSelection();
      this.updateSelectedPlane(this.planeData[this.selectedIndex].key);
    });

    this.input.keyboard.on('keydown-ENTER', () => {
      if(this.selectedIndex == 0){
        this.game.audioManager.playSFX('sfx_falcon_select');
      }else if(this.selectedIndex == 1){
        this.game.audioManager.playSFX('sfx_cryphix_select');
      }else {
        this.game.audioManager.playSFX('sfx_hawk_select');
      }
      const selected = this.planeData[this.selectedIndex];
      this.registry.set('selectedPlane', selected.key);

      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('StageIntroScene', { ship: this.planeData[this.selectedIndex],
                                              stageKey: 'Stage1'
        });
      });
    });

    this.input.keyboard.on('keydown-ESC', () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('BootScene');
      });
    });

    this.input.keyboard.on('keydown-BACKSPACE', () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('BootScene');
      });
    });

    // 스페이스바로 파워업 상태 전환
    this.input.keyboard.on('keydown-SPACE', () => {
      this.game.audioManager.playSFX('sfx_ship_select');
      this.poweredUp = !this.poweredUp;
      const selectedKey = this.planeData[this.selectedIndex].key;
      this.updateSelectedPlane(selectedKey);
    });

  }

  updateSelection() {
    // 기존 tween 제거
    this.tweensList.forEach(t => t.stop());
    this.tweensList = [];

    this.nameTexts.forEach((text, i) => {
      text.setAlpha(1); // 기본 상태
      if (i === this.selectedIndex) {
        text.setColor('#00ffff'); // 선택된 색상

        const tween = this.tweens.add({
          targets: text,
          alpha: { from: 1, to: 0.2 },
          duration: 400,
          yoyo: true,
          repeat: -1
        });

        this.tweensList.push(tween);
      } else {
        text.setColor('#ffffff');
      }
    });
  }

  updateSelectedPlane(planeKey) {
    // 기존 스프라이트 제거
    if (this.currentPlaneSprite) {
      this.currentPlaneSprite.destroy();
    }

    // 기존 총알 제거
    if (this.currentBulletGroup && this.currentBulletGroup.clear) {
      this.currentBulletGroup.clear(true, true);
    }

    // 기존 총알 발사 타이머 제거
    if (this.bulletTimer) {
      this.bulletTimer.remove(false);
    }

    const isPower = this.poweredUp;
    const animKey = isPower ? `${planeKey}_powerup_anim` : `${planeKey}_anim`;

    // 새 스프라이트 생성 및 애니메이션 실행
    this.currentPlaneSprite = this.add.sprite(this.scale.width / 2, 350, planeKey)
      .setOrigin(0.5)
      .setScale(2)
      .play(animKey);

    // 기체별 총알 정보 설정
    const bulletKey = this.getBulletKeyByPlane(planeKey);
    const bulletAnimKey = this.getBulletAnimByPlane(planeKey); // 없으면 생략 가능

    // 총알 프리뷰 타이머
    this.bulletTimer = this.time.addEvent({
      delay: 300,
      loop: true,
      callback: () => {
        const bullet = this.currentBulletGroup.create(this.currentPlaneSprite.x, this.currentPlaneSprite.y - 40, bulletKey);
        if (bulletAnimKey) bullet.play(bulletAnimKey);
        bullet.setVelocityY(-400);
      }
    });

    // 스탯 바 길이 (가상의 값)
    const stats = {
      plane2: { atk: 100, spd: 200, rate : 200 },
      plane9: { atk: 80, spd: 250, rate : 250  },
      plane6: { atk: 50, spd: 180, rate : 150  }
    };
    const { atk, spd, rate } = stats[planeKey];
    this.attackBar.width = atk;
    this.speedBar.width = spd/2;
    this.fireBar.width = (400 - rate)/2;
  }

  getBulletKeyByPlane(planeKey) {
    const bulletMap = {
      plane2: 'bullets3',
      plane9: 'bullets5',
      plane6: 'bullets1',
      // 추가 기체도 여기에 등록
    };
    return bulletMap[planeKey] || 'bullets3';
  }

  getBulletAnimByPlane(planeKey) {
    const animMap = {
      plane2: 'bullets3_anim',
      plane9: 'bullets5_anim',
      plane6: 'bullets1_anim',
    };
    return animMap[planeKey] || 'bullets3_anim';
  }  

  getBulletConfigByPlane(planeKey, isPowerup) {
    const configMap = {
      player1: {
        delay: 300,
        spread: isPowerup ? [-100, 0, 100] : [0], // 3갈래 or 단일
        offsetY: -40,
      },
      player2: {
        delay: isPowerup ? 100 : 300,
        spread: isPowerup ? [-100, -50, 0, 50, 100] : [-50, 50], // 병렬
        offsetY: -40,
      }
    };

    return configMap[planeKey] || {
      delay: 300,
      spread: [0],
      offsetY: -40
    };
  }

  applyBlinkTween(target) {
    return this.tweens.add({
      targets: target,
      alpha: { from: 1, to: 0.2 },
      duration: 600,
      yoyo: true,
      repeat: -1
    });
  }

  selectShip(index) {
    const selectedShip = this.planeData[index];
    this.game.audioManager.playSFX('sfx_ship_select');   

    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('StageIntroScene', { ship: selectedShip,stageKey: 'Stage1'});
    });
  }
}