export default class GUI {
  constructor(scene) {
    this.scene = scene;

    this.scoreText = scene.add.text(20, 20, 'Score: 0', {
      fontFamily: 'ThaleahFat',
      fontSize: '24px',
      color: '#ffffff'
    });

    this.hpBar = scene.add.rectangle(20, 60, 100, 10, 0xff0000).setOrigin(0, 0);

    // UI는 카메라 따라다니도록 고정
    this.scoreText.setScrollFactor(0);
    this.hpBar.setScrollFactor(0);
  }

  updateScore(score) {
    this.scoreText.setText(`Score: ${score}`);
  }

  updateHP(hp) {
    this.hpBar.width = hp; // 간단한 방식 (예: 최대 100)
  }
}