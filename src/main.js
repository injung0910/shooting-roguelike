// 파일: src/main.js
import Phaser from 'phaser';
import StartScene from './scenes/StartScene.js';
import SelectScene from './scenes/SelectScene.js';
import MainScene from './scenes/MainScene';
import AboutScene from './scenes/AboutScene.js';
import BootScene from './scenes/BootScene.js';

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 800,
  scene: [BootScene, StartScene, SelectScene, AboutScene, MainScene], // 순서 중요: StartScene이 첫 진입
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
  },
  dom: {
    createContainer: true
  }
};

new Phaser.Game(config);