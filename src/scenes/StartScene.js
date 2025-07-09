export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
    this.menuItems = [];
    this.selectedIndex = 0;
    this.tweensList = [];
  }

  preload() {
    // 배경 이미지 로드 (생성한 이미지 파일 경로로 바꿔주세요)
    this.load.image('start-bg', '/img/start-bg.jpg');
  }

  create() {
    // 배경 이미지 출력
    this.add.image(0, 0, 'start-bg')
      .setOrigin(0)
      .setDisplaySize(this.scale.width, this.scale.height);

    this.titleShadow = this.add.text(this.scale.width / 2 + 4, 104, 'SHOOTING GAME', {
      fontFamily: 'ThaleahFat',
      fontSize: '64px',
      color: '#000000'
    }).setOrigin(0.5);

    // === 메인 타이틀 - 본 텍스트 (노란색) ===
    this.titleText = this.add.text(this.scale.width / 2, 100, 'SHOOTING GAME', {
      fontFamily: 'ThaleahFat',
      fontSize: '64px',
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

    // 메뉴 항목 생성
    const menuOptions = ['START', 'ABOUT'];
    const baseY = 650;
    const gap = 30;

    menuOptions.forEach((text, i) => {
      const item = this.add.text(this.scale.width / 2, baseY + i * gap, text, {
        fontFamily: 'ThaleahFat',
        fontSize: '32px',
        color: '#ffffff',
      }).setOrigin(0.5);
      this.menuItems.push(item);
    });

    this.updateSelection();

    // 키 입력 처리
    this.input.keyboard.on('keydown-UP', () => {
      this.selectedIndex = (this.selectedIndex - 1 + this.menuItems.length) % this.menuItems.length;
      this.updateSelection();
    });

    this.input.keyboard.on('keydown-DOWN', () => {
      this.selectedIndex = (this.selectedIndex + 1) % this.menuItems.length;
      this.updateSelection();
    });

    this.input.keyboard.on('keydown-ENTER', () => {
      const selected = this.menuItems[this.selectedIndex].text;
      if (selected === 'START') {
        this.scene.start('SelectScene');
      } else if (selected === 'ABOUT') {
        window.open('/about.html', '_blank');
      }
    });
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
}