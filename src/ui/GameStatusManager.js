export default class GameStatusManager {
  constructor(scene, playerData) {
    this.scene = scene;
    this.playerData = playerData;

    this.score = 0;
    this.lives = 2;
    this.bombs = 2;

    this.createUI();
  }

  createUI() {
    this.lifeIcons = [];
    this.bombIcons = [];

    // Stage1.js 의 create() 내부 예시
    this.scoreText = this.scene.add.text(20, 0, 'SCORE: 000000', {
      fontFamily: 'ThaleahFat',
      fontSize: '32px',
      color: '#00ffff',           // 노란색
      stroke: '#000000',          // 검정 테두리 (음영)
      strokeThickness: 4,         // 음영 두께
    }).setOrigin(0, 0).setDepth(100);  // 왼쪽 위 기준 정렬

    // 목숨 아이콘 표시
    for (let i = 0; i < this.lives; i++) {
      const icon = this.scene.add.image(20 + i * 30, 40, 'icon-' + this.playerData.ship.key)
        .setScale(1)
        .setOrigin(0, 0)
        .setDepth(100);
      this.lifeIcons.push(icon);
    }

    // 폭탄 아이콘 표시
    for (let i = 0; i < this.bombs; i++) {
      const icon = this.scene.add.image(20 + i * 40, this.scene.scale.height - 80, 'icon-bomb')
        .setScale(3)
        .setOrigin(0, 0)
        .setDepth(100)
        .setInteractive({ useHandCursor: true });

      // 클릭 또는 터치하면 폭탄 사용
      icon.removeAllListeners(); // 기존 이벤트 제거
      icon.on('pointerdown', () => {
        this.useBomb(); // 실제 폭탄 기능 호출
      });

      this.bombIcons.push(icon);
    }

  }

  addScore(amount) {
    this.score += amount;
    this.scoreText.setText(`SCORE: ${this.score}`);
  }

  loseLife() {
    if (this.lives > 0) {
      this.lives--;
      this.livesIcons[this.lives].setVisible(false);
    }
  }

  useBomb() {
    if (this.bombs <= 0) return;

    // 중복 방지: 0.1초 안에 다시 호출되지 않도록
    if (this.bombCooldown) return;
    this.bombCooldown = true;
    this.scene.time.delayedCall(150, () => {
      this.bombCooldown = false;
    });

    this.bombs--;
    this.updateBombUI(); // UI 동기화

    const shipName = this.playerData.ship.name;

    switch (shipName) {
      case 'Falcon':
        this.falconBomb();
        break;
      case 'Cryphix':
        this.cryphixBomb();
        break;
      case 'Hawk':
        this.hawkBomb();
        break;
      default:
        this.defaultBomb();
        break;
    }
    
  }

  falconBomb() {
    // 폭발 애니메이션 생성
    if (!this.scene.anims.exists('explosion200')) {
      this.scene.anims.create({
        key: 'explosion200',
        frames: this.scene.anims.generateFrameNumbers('explosion200', { start: 0, end: 39 }),
        frameRate: 20,
        hideOnComplete: true
      });
    }
    
    const centerX = this.scene.scale.width / 2;
    const centerY = this.scene.scale.height / 2;

    const explosion200 = this.scene.add.sprite(centerX, centerY, 'explosion200');
    explosion200.setDepth(30);
    explosion200.setScale(4);
    explosion200.setAlpha(0.7);
    explosion200.play('explosion200');

    this.bombFlash = this.scene.add.rectangle(0, 0, this.scene.scale.width, this.scene.scale.height, 0xffffff)
      .setOrigin(0)
      .setAlpha(0)
      .setDepth(9999); // 모든 요소 위에

    this.bombFlash.setAlpha(0.8);
    this.scene.tweens.add({
      targets: this.bombFlash,
      alpha: 0,
      duration: 300,
      ease: 'Cubic.easeOut',
    });

    this.scene.game.audioManager.playSFX('sfx_falcon_bomb');

    this.scene.enemyManager.clearAll();

    explosion200.on('animationcomplete', () => explosion200.destroy());
  }

  cryphixBomb() {
    // 폭발 애니메이션 생성
    if (!this.scene.anims.exists('thunder200')) {
      this.scene.anims.create({
        key: 'thunder200',
        frames: this.scene.anims.generateFrameNumbers('thunder200', { start: 50, end: 89 }),
        frameRate: 20,
        hideOnComplete: true
      });
    }

    const centerX = this.scene.scale.width / 2;
    const centerY = this.scene.scale.height / 2;

    const thunder200 = this.scene.add.sprite(centerX, centerY, 'thunder200');
    thunder200.setDepth(30);
    thunder200.setScale(4);
    thunder200.setAlpha(0.7);
    thunder200.play('thunder200');

    this.bombFlash = this.scene.add.rectangle(0, 0, this.scene.scale.width, this.scene.scale.height, 0xffffff)
      .setOrigin(0)
      .setAlpha(0)
      .setDepth(9999); // 모든 요소 위에

    this.bombFlash.setAlpha(0.8);
    this.scene.tweens.add({
      targets: this.bombFlash,
      alpha: { from: 0.6, to: 0 },
      duration: 100,
      repeat: 4,
    });

    this.scene.game.audioManager.playSFX('sfx_cryphix_bomb');

    this.scene.enemyManager.clearAll();

    thunder200.on('animationcomplete', () => thunder200.destroy());
  }  

  hawkBomb() {
    // 폭발 애니메이션 생성
    if (!this.scene.anims.exists('fireCircle200')) {
      this.scene.anims.create({
        key: 'fireCircle200',
        frames: this.scene.anims.generateFrameNumbers('fireCircle200', { start: 0, end: 63 }),
        frameRate: 64,
        hideOnComplete: true
      });
    }

    for (let i = 0; i < 20; i++) {
      this.scene.time.delayedCall(i * 100, () => {
        this.scene.game.audioManager.playSFX('sfx_hawk_bomb');

        const x = Phaser.Math.Between(50, this.scene.scale.width - 50); // 화면 좌우 여백 50
        const y = this.scene.scale.height + 50; // 화면 아래쪽 바깥

        //const fireCircle200 = this.scene.add.sprite(this.x, this.y, 'fireCircle200');
        const fireCircle200 = this.scene.physics.add.sprite(x, y, 'fireCircle200');
        fireCircle200.setDepth(30);
        fireCircle200.setAlpha(0.7);
        fireCircle200.setVelocityY(-1000); 
        fireCircle200.play('fireCircle200');
        fireCircle200.on('animationcomplete', () => fireCircle200.destroy());
      });
    }

    this.bombFlash = this.scene.add.rectangle(0, 0, this.scene.scale.width, this.scene.scale.height, 0xff3300)
      .setOrigin(0)
      .setAlpha(0)
      .setDepth(9999); // 모든 요소 위에

    this.bombFlash.setAlpha(0.8);
    this.scene.tweens.add({
      targets: this.bombFlash,
      alpha: { from: 0.3, to: 0 },
      duration: 400,
      repeat: 4,
    });

    this.scene.enemyManager.clearAll();
  }

  updateBombUI() {
    console.log('🔁 updateBombUI 호출됨', this.bombs, this.bombIcons.length);    
    
    // 아이콘 수가 폭탄 수보다 많으면 숨기기
    this.bombIcons.forEach((icon, index) => {
      if (index < this.bombs) {
        icon.setVisible(true);
        icon.setInteractive();
      } else {
        icon.setVisible(false);
        icon.disableInteractive();
      }
    });

    // 부족한 아이콘 추가 생성
    while (this.bombIcons.length < this.bombs) {
      const index = this.bombIcons.length;
      const icon = this.scene.add.image(20 + index * 40, this.scene.scale.height - 80, 'icon-bomb')
        .setScale(3)
        .setOrigin(0, 0)
        .setDepth(100)
        .setInteractive({ useHandCursor: true });

      icon.on('pointerdown', () => this.useBomb());
      this.bombIcons.push(icon);
    }
  }

  addBomb() {
    this.bombs++;
    const icon = this.scene.add.image(20 + (this.bombs - 1) * 40, this.scene.scale.height - 40, 'bombIcon')
      .setScale(0.5).setDepth(10);
    this.bombIcons.push(icon);
  }
}