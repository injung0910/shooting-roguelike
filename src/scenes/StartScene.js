export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    this.load.image('start-bg', '/assets/backgrounds/purple_background.png');
    //this.load.audio('start-music', '/assets/bgm/menu_theme.mp3'); // 선택
  }

  create() {
    this.add.image(0, 0, 'start-bg').setOrigin(0).setDisplaySize(this.scale.width, this.scale.height);

    this.titleText = this.add.text(this.scale.width / 2, 200, 'Shooting', {
      fontFamily: 'ThaleahFat',
      fontSize: '64px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.startButton = this.add.text(this.scale.width / 2, 400, '▶ START', {
      fontFamily: 'ThaleahFat',
      fontSize: '32px',
      color: '#00ff00'
    }).setOrigin(0.5).setInteractive();

    this.startButton.on('pointerdown', () => {
      this.scene.start('SelectScene'); // 기체 선택 화면으로 이동
    });

    // BGM (선택)
    //this.sound.stopAll();
    //this.sound.play('start-music', { loop: true, volume: 0.5 });
  }
}