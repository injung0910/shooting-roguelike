export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create() {
    // bgm 설정
    if (!this.sys.settings.data?.fromOption) {
      this.sound.stopAll();
    }
    this.game.audioManager.scene = this;
    this.game.audioManager.playBGM('bgm_gameover');    
    
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    this.add.text(centerX, centerY, 'GAME OVER', {
      fontFamily: 'ThaleahFat',
      fontSize: '64px',
      color: '#ff0000'
    }).setOrigin(0.5);

    this.time.delayedCall(3000, () => {
      this.scene.stop('Stage1');          // 원래 게임 씬 정지
      this.scene.stop();                  // GameOverScene 정지
      this.scene.start('StartScene');     // 시작 씬으로 전환
    });
  }
}