// 파일: src/main.js
import Phaser from 'phaser';
import StartScene from './scenes/StartScene.js';
import SelectScene from './scenes/SelectScene.js';
import MainScene from './scenes/MainScene'; // 예시로 함께 불러옴

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 800,
  scene: [StartScene, SelectScene, MainScene], // 순서 중요: StartScene이 첫 진입
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  backgroundColor: '#1d1d1d',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
};

new Phaser.Game(config);