// 파일: src/main.js
import Phaser from 'phaser';
import MainScene from './scenes/MainScene';

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 800,
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
  scene: [MainScene]
};

new Phaser.Game(config);