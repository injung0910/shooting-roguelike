export default class SelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SelectScene' });
  }

  preload() {
    this.load.image('select-bg', '/assets/backgrounds/select_background.png'); // 배경 이미지
    this.load.image('ship1', '/assets/player/player1.png');
    this.load.image('ship2', '/assets/player/player2.png');
    // 필요한 만큼 ship3, ship4... 로 로드
  }

  create() {
    this.add.image(0, 0, 'select-bg').setOrigin(0).setDisplaySize(this.scale.width, this.scale.height);

    this.add.text(this.scale.width / 2, 50, 'SELECT YOUR SHIP', {
      fontFamily: 'ThaleahFat',
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // 기체 선택 버튼들
    const shipKeys = ['ship1', 'ship2'];
    shipKeys.forEach((key, index) => {
      const x = this.scale.width / 2 - 150 + index * 150;
      const ship = this.add.image(x, 250, key).setInteractive().setScale(2);
      
      ship.on('pointerdown', () => {
        this.selectShip(key);
      });
    });
  }

  selectShip(shipKey) {
    // 선택한 기체를 저장 (예: registry 사용 또는 global 변수)
    this.registry.set('selectedShip', shipKey);

    // MainScene으로 이동
    this.scene.start('MainScene');
  }
}