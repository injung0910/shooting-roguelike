let instance = null;

export default class AudioManager {
  constructor(scene) {
    if (instance) {
      instance.scene = scene;  // 새 씬 컨텍스트로 갱신
      return instance;
    }

    this.scene = scene;
    this.currentBGM = null;
    this.bgmVolume = parseFloat(localStorage.getItem('bgmVolume') ?? '0.5');
    this.sfxVolume = parseFloat(localStorage.getItem('sfxVolume') ?? '0.5');

    instance = this;
  }

  playBGM(key, config = { loop: true }, force = false) {
    this.bgmVolume = parseFloat(localStorage.getItem('bgmVolume') ?? '0.5');

    if (this.bgmVolume === 0) {
      return; // 음소거면 아예 재생 안함
    }

    if (this.currentBGM && this.currentBGM.key !== key) {
      this.currentBGM.stop();
      this.currentBGM.destroy();
      this.currentBGM = null;
    }

    if (!this.currentBGM || force) {
      this.currentBGM = this.scene.sound.add(key, { loop: true, volume: this.bgmVolume });
      this.currentBGM.play();
    }
  }

  stopBGM() {
    if (this.currentBGM) {
      this.currentBGM.stop();
      this.currentBGM.destroy();
      this.currentBGM = null;
    }
  }
  

  setBGMVolume(volume) {
    this.bgmVolume = volume;
    localStorage.setItem('bgmVolume', volume);
    if (this.currentBGM && typeof this.currentBGM.setVolume === 'function') {
      this.currentBGM.setVolume(volume);
    }
  }

  playSFX(key, config = {}) {
    const scene = this.scene;
    if (!scene || !scene.sound) {
      console.warn('[AudioManager] sound 시스템이 준비되지 않았습니다.');
      return;
    }

    this.scene.sound.play(key, {
      volume: this.sfxVolume,
      ...config
    });
  }

  setSFXVolume(volume) {
    this.sfxVolume = volume;
    localStorage.setItem('sfxVolume', volume);
  }

  setScene(scene) {
    this.scene = scene;
  }  
}