export default class GameStatusManager {
  constructor(scene, playerData) {
    this.scene = scene;
    this.playerData = playerData;

    this.score = 0;
    this.lives = 3;
    this.bombs = 1;

    this.createUI();
  }

  createUI() {
    this.score = 0;
    this.lives = 2;
    this.bombs = 2;

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
      const icon = this.scene.add.image(20 + i * 30, this.scene.scale.height - 30, 'icon-bomb')
        .setScale(1.5)
        .setOrigin(0, 0)
        .setDepth(100);
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
    if (this.bombs > 0) {
      this.bombs--;
      this.bombIcons[this.bombs].setVisible(false);
    }
  }

  addBomb() {
    this.bombs++;
    const icon = this.scene.add.image(20 + (this.bombs - 1) * 40, this.scene.scale.height - 40, 'bombIcon')
      .setScale(0.5).setDepth(10);
    this.bombIcons.push(icon);
  }
}