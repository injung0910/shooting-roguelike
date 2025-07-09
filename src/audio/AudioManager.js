export default class AudioManager {
  constructor(scene) {
    this.scene = scene;

    // 사운드 로드 후 재생용 변수 저장
    this.sounds = {
      shoot: scene.sound.add('shoot'),
      explosion: scene.sound.add('explosion'),
    };

    this.bgm = {
      stage1: scene.sound.add('stage1', { loop: true, volume: 0.5 }),
      boss: scene.sound.add('boss', { loop: true, volume: 0.5 }),
    };
  }

  playSFX(key) {
    this.sounds[key]?.play();
  }

  playMusic(key) {
    this.stopAllMusic();
    this.bgm[key]?.play();
  }

  stopAllMusic() {
    Object.values(this.bgm).forEach(track => track.stop());
  }
}