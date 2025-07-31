// 파일: src/main.js
import Phaser from 'phaser';
import StartScene from './scenes/StartScene.js';
import SelectScene from './scenes/SelectScene.js';
import AboutScene from './scenes/AboutScene.js';
import BootScene from './scenes/BootScene.js';
import LoadingScene from './scenes/LoadingScene.js';
import OptionScene from './scenes/OptionScene.js';
import StageIntroScene from './scenes/StageIntroScene'; 
import AudioManager from './audio/AudioManager.js';
import EffectManager from './effect/EffectManager.js';
import GameOverScene from './scenes/GameOverScene.js';

import Stage1 from './stages/Stage1'; 

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 800,
  scene: [
      LoadingScene, 
      BootScene,
      StartScene, 
      SelectScene, 
      StageIntroScene, 
      Stage1,
      OptionScene, 
      AboutScene,
      GameOverScene], // 순서 중요: StartScene이 첫 진입
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

const game = new Phaser.Game(config);

// 반드시 여기에 붙여줘야 다른 씬에서 사용할 수 있음
game.audioManager = new AudioManager(null);
// effect 
game.effectManager = new EffectManager(null);