import { loadAllAssets } from '../loaders/AssetLoader.js';

export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadingScene' });
  }

  preload() {
    const { width, height } = this.scale;

    // 텍스트
    const loadingText = this.add.text(width / 2, height / 2 - 60, 'LOADING...', {
      fontFamily: 'ThaleahFat', // 또는 Arial
      fontSize: '32px',
      color: '#ffe066'
    }).setOrigin(0.5);

    // 백그라운드 바
    const barBg = this.add.graphics();
    const barWidth = 300;
    const barHeight = 24;
    const barX = width / 2 - barWidth / 2;
    const barY = height / 2;

    barBg.fillStyle(0x333333, 1);
    barBg.fillRoundedRect(barX, barY, barWidth, barHeight, 12);

    // 로딩 바
    const progressBar = this.add.graphics();

    // 퍼센트 텍스트
    const percentText = this.add.text(width / 2, barY + barHeight + 20, '0%', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.load.on('progress', (value) => {
      progressBar.clear();

      // 배경 스타일 느낌을 살리기 위해 약간 밝은 노란색
      progressBar.fillStyle(0xffff66, 1);
      progressBar.fillRoundedRect(barX, barY, barWidth * value, barHeight, 12);

      percentText.setText(`${Math.round(value * 100)}%`);
    });

    this.load.on('complete', () => {
      percentText.setText('Complete!');
      this.time.delayedCall(400, () => {
        this.scene.start('BootScene');
      });
    });
    
    // 실제 게임에 필요한 에셋들을 여기서 로드
    // 또는 AssetLoader.js의 loadAllAssets(this) 호출
    // 예시:
    // this.load.image('start-bg', 'assets/start-bg.png');
    // this.load.audio('bgm_title', 'assets/audio/bgm/bgm_title.ogg');
     // 필요한 이미지나 사운드도 여기서 미리 로드 가능
     this.load.image('start-bg', '/img/start-bg.jpg');
     // 여기서만 preload 수행
     loadAllAssets(this);
  }

  create() {
    // create는 preload 완료 후 호출되므로 필요 시 사용
  }
}