export default class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.currentBGM = null;
  }

  playBGM(key, config = { loop: true, volume: 0.5 }) {
    // 현재 BGM이 다르면 정지하고 새로 재생
    if (this.currentBGM && this.currentBGM.key !== key) {
      this.currentBGM.stop();
      this.currentBGM.destroy();
      this.currentBGM = null;
    }

    // 이미 해당 BGM이 재생 중이면 아무것도 하지 않음
    if (!this.currentBGM) {
      this.currentBGM = this.scene.sound.add(key, config);
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

  playSFX(key, config = { volume: 0.5 }) {
    this.scene.sound.play(key, config);
  }
}