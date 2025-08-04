export default class AboutScene extends Phaser.Scene {
  constructor() {
    super('AboutScene');
  }

  create() {
    const centerX = this.scale.width / 2;
    let startY = 60;
    const gap = 24;

    this.add.text(centerX, startY, 'ABOUT THIS GAME', {
      fontFamily: 'ThaleahFat',
      fontSize: '32px',
      color: '#ffcc00'
    }).setOrigin(0.5);

    const lines = [
      'Pixel-style space shooting game made with Phaser 3.',
      '',
      'Fonts:',
      'ThaleahFat by Rick Hoppmann (CC BY 4.0)',
      '',
      'Audio:',
      'BGM by doranarasi (Commercial use OK)',
      'SFX/FX by Kronbits (Purchased via itch.io)',
      '',
      'Pixel Art:',
      'Assets from SHMUP Bundle by Dylestorm (LivingTheIndie)',
      '',
      'Etc:',
      'Leonardo AI-generated (commercial license)',
      '',
      'Framework: Phaser 3',
      'Developed by injung0910',
      'GitHub: injung0910/shooting-roguelike',
      '',
      'If you are an asset creator and have',
      'any questions or concerns',
      'about how your work is used in this game,',
      'please don’t hesitate to contact me,',
      'the developer, at injung5722@gmail.com',
      '',
      'Special Thanks:',
      'My family – for their endless love and support'
    ];

    lines.forEach((line, index) => {
      this.add.text(centerX, startY + (gap * (index + 2)), line, {
        fontFamily: 'ThaleahFat',
        fontSize: '25px',
        color: '#dddddd',
        align: 'center',
        wordWrap: { width: 540 }
      }).setOrigin(0.5);
    });

    // 클릭 시 돌아가기
    this.input.once('pointerdown', () => {
      this.scene.start('StartScene');
    });

    this.add.text(centerX, this.scale.height - 40, '[CLICK or BACKSPACE TO RETURN]', {
      fontFamily: 'ThaleahFat',
      fontSize: '36px',
      color: '#66ccff'
    }).setOrigin(0.5);

    // ✅ Backspace 키 이벤트 등록
    this.input.keyboard.on('keydown-BACKSPACE', () => {
      this.scene.start('StartScene');
    });
  }
}