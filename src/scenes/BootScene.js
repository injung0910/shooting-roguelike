export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // 필요한 이미지나 사운드도 여기서 미리 로드 가능
    this.load.image('start-bg', '/img/start-bg.jpg');
  }

  async create() {
    // 폰트가 완전히 로드될 때까지 기다림
    await document.fonts.ready;

    // 테스트용
    const isDev = false;

    if (isDev) {
      // 강제 전환 (예: Stage1)
      this.scene.start('Stage1', {
        ship: {
          key: 'plane1',
          name: 'Falcon'
        },
        stageKey: 'Stage1'
      });
    } else {
      this.scene.start('StartScene');
    }

    console.log('[BootScene] 폰트 로딩 완료');
    //this.scene.start('StartScene');
  }
}