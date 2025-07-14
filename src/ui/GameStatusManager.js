export default class GameStatusManager {
  constructor(scene, playerData, player) {
    this.scene = scene;
    this.playerData = playerData;
    this.player = player;

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
        this.player.useBomb(); // 실제 폭탄 기능 호출
      });

      this.bombIcons.push(icon);
    }

  }

  addScore(amount) {
    this.score += amount;
    this.scoreText.setText(`SCORE: ${this.score}`);
  }
  
  loseLife() {
    console.log('lostlife');
    this.lives--;
    // 아이콘 수가 폭탄 수보다 많으면 숨기기
    this.lifeIcons.forEach((icon, index) => {
      if (index < this.lives) {
        icon.setVisible(true);
        icon.setInteractive();
      } else {
        icon.setVisible(false);
        icon.disableInteractive();
      }
    });

    while (this.lifeIcons.length <= this.lives) {
      const icon = this.scene.add.image(20 + i * 30, 40, 'icon-' + this.playerData.ship.key)
        .setScale(1)
        .setOrigin(0, 0)
        .setDepth(100);
      this.lifeIcons.push(icon);
    }

    this.bombs = 2;
    this.updateBombUI();

    if (this.lives < 0) {
      this.scene.cameras.main.fadeOut(500, 0, 0, 0);
      this.scene.cameras.main.once('camerafadeoutcomplete', () => {
        this.showGameOver();
      });
    }
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

  showGameOver() {
    // 현재 씬 정지
    this.scene.scene.pause();  

    // GameOverScene 실행 (겹쳐서 실행됨)
    this.scene.scene.launch('GameOverScene');
  }
}