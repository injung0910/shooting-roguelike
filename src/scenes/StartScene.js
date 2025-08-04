export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });

  }

  create() {
    this.inputEnabled = true;

    // bgm 설정
    if (!this.sys.settings.data?.fromOption) {
      this.sound.stopAll();
    }
    this.game.audioManager.scene = this;
    this.game.audioManager.playBGM('bgm_title');

    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.menuItems = [];
    this.selectedIndex = 0;
    this.tweensList = [];

    // 배경 이미지 출력
    this.add.image(0, 0, 'start-bg')
      .setOrigin(0)
      .setDisplaySize(this.scale.width, this.scale.height);

    this.titleShadow = this.add.text(this.scale.width / 2 + 4, 104, 'The Invaders', {
      fontFamily: 'ThaleahFat',
      fontSize: '64px',
      color: '#000000'
    }).setOrigin(0.5);

    // === 메인 타이틀 - 본 텍스트 (노란색) ===
    this.titleText = this.add.text(this.scale.width / 2, 100, 'The Invaders', {
      fontFamily: 'ThaleahFat',
      fontSize: '86px',
      color: '#ffe066', // 밝은 노란색
      stroke: '#3b1f00', // 어두운 갈색 테두리
      strokeThickness: 4
    }).setOrigin(0.5);

    // 약간의 부드러운 흔들림 효과
    this.tweens.add({
      targets: this.titleText,
      y: this.titleText.y + 2,
      duration: 1000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });

    const centerX = this.scale.width / 2;
    const startText = this.add.text(centerX, 600, 'START GAME', { fontFamily: 'ThaleahFat',fontSize: '48px', color: '#ffffff' }).setOrigin(0.5).setInteractive();
    const aboutText = this.add.text(centerX, 640, 'OPTION', { fontFamily: 'ThaleahFat',fontSize: '48px', color: '#ffffff' }).setOrigin(0.5).setInteractive();
    const exitText = this.add.text(centerX, 680, 'ABOUT', { fontFamily: 'ThaleahFat',fontSize: '48px', color: '#ffffff' }).setOrigin(0.5).setInteractive();

    // 메뉴 항목 생성
    const menuOptions = [startText, aboutText, exitText];
    const baseY = 600;
    const gap = 40;

    this.add.text(this.scale.width / 2, this.scale.height - 30, '© 2025 injung0910. All rights reserved.', {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#999999'
    }).setOrigin(0.5);

    this.add.text(550, this.scale.height - 30, 'v1.0.2', {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#999999'
    }).setScrollFactor(0);    

    // 키 입력 처리
    this.input.keyboard.on('keydown-UP', () => {
      if (!this.inputEnabled) return;
      this.game.audioManager.playSFX('sfx_ui_select');
      this.selectedIndex = (this.selectedIndex - 1 + this.menuItems.length) % this.menuItems.length;
      this.updateSelection();
    });

    this.input.keyboard.on('keydown-DOWN', () => {
      if (!this.inputEnabled) return;
      this.game.audioManager.playSFX('sfx_ui_select');
      this.selectedIndex = (this.selectedIndex + 1) % this.menuItems.length;
      this.updateSelection();
    });

    this.input.keyboard.on('keydown-ENTER', () => {
      if (!this.inputEnabled) return;
      this.game.audioManager.playSFX('sfx_ui_success');
      const selected = this.menuItems[this.selectedIndex].text;

      this.inputEnabled = false;

      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        if (selected === 'START GAME') {
          this.scene.start('SelectScene');
        } else if (selected === 'ABOUT') {
          this.scene.start('AboutScene');
        } else if (selected === 'OPTION') {
          this.scene.start('OptionScene');
        }
      });
    });

    // 터치/클릭 이벤트 등록    
    menuOptions.forEach((item, i) => {
      this.menuItems.push(item);

      item.on('pointerdown', () => {
        if (!this.inputEnabled) return;
        this.game.audioManager.playSFX('sfx_ui_success');
        this.inputEnabled = false;
        this.selectedIndex = menuOptions.indexOf(item);
        this.updateSelection();
        this.handleMenuSelection(item.text);
      });
    });

    this.updateSelection();
  }

  updateSelection() {
    // 기존 깜빡임 tween 제거
    this.tweensList.forEach(tween => tween.stop());
    this.tweensList = [];

    this.menuItems.forEach((item, index) => {
      
      if (index === this.selectedIndex) {
        item.setColor('#00ffff');
        const tween = this.tweens.add({
          targets: item,
          alpha: { from: 1, to: 0.2 },
          duration: 500,
          repeat: -1,
          yoyo: true
        });
        this.tweensList.push(tween);
      } else {
        item.setColor('#ffffff');
        item.setAlpha(1);
      }
    });
  }

  handleMenuSelection(selected) {
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      if (selected === 'START GAME') {
        this.scene.start('SelectScene');
      } else if (selected === 'ABOUT') {
        this.scene.start('AboutScene');
      } else if (selected === 'OPTION'){
        this.scene.start('OptionScene');
      }
    });
  }
}