export default class OptionScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OptionScene' });
  }

  create() {
    const centerX = this.scale.width / 2;

    this.game.audioManager.scene = this;

    // --- 기본 설정
    this.menuTargets = ['bgm', 'sfx', 'mute', 'reset', 'back'];
    this.selectedIndex = 0;
    this.currentBgmVolume = parseFloat(localStorage.getItem('bgmVolume') ?? '0.5');
    this.currentSfxVolume = parseFloat(localStorage.getItem('sfxVolume') ?? '0.5');

    // --- 배경
    this.add.image(0, 0, 'purple_background').setOrigin(0).setDisplaySize(600, 800);
    this.add.image(0, 0, 'stars_1').setOrigin(0).setDisplaySize(600, 800);

    // --- 타이틀
    this.add.text(centerX, 80, 'OPTIONS', {
      fontFamily: 'ThaleahFat',
      fontSize: '64px',
      color: '#ffe066'
    }).setOrigin(0.5);

    // === BGM ===
    this.add.text(centerX - 100, 200, 'BGM Volume', {
      fontFamily: 'ThaleahFat',
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5);
    this.bgmVolume = this.add.text(centerX + 150, 200, `${Math.round(this.currentBgmVolume * 200)}%`, {
      fontFamily: 'ThaleahFat',
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5).setInteractive();
    this.bgmVolume.on('pointerdown', () => this.setSelection('bgm'));

    // === SFX ===
    this.add.text(centerX - 100, 250, 'SFX Volume', {
      fontFamily: 'ThaleahFat',
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5);
    this.sfxVolume = this.add.text(centerX + 150, 250, `${Math.round(this.currentSfxVolume * 200)}%`, {
      fontFamily: 'ThaleahFat',
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5).setInteractive();
    this.sfxVolume.on('pointerdown', () => this.setSelection('sfx'));

    // === BACK ===
    this.backBtn = this.add.text(centerX, 400, 'BACK', {
      fontFamily: 'ThaleahFat',
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5).setInteractive();
    this.backBtn.on('pointerdown', () => {this.handleBack()});

    // 볼륨 텍스트 옆에 좌우 화살표 추가
    this.bgmLeftBtn = this.add.text(centerX + 60, 190, '◀', {fontFamily: 'ThaleahFat', fontSize: '40px', color: '#ffffff'}).setInteractive();
    this.bgmRightBtn = this.add.text(centerX + 200, 190, '▶', {fontFamily: 'ThaleahFat', fontSize: '40px', color: '#ffffff'}).setInteractive();
    this.sfxLeftBtn = this.add.text(centerX + 60, 240, '◀', {fontFamily: 'ThaleahFat', fontSize: '40px', color: '#ffffff'}).setInteractive();
    this.sfxRightBtn = this.add.text(centerX + 200, 240, '▶', {fontFamily: 'ThaleahFat', fontSize: '40px', color: '#ffffff'}).setInteractive();

    // 🔽 버튼 클릭 이벤트 연결
    this.bgmLeftBtn.on('pointerdown', () => {
        this.setSelection('bgm');
        this.adjustVolume('bgm', -0.05);
    });

    this.bgmRightBtn.on('pointerdown', () => {
        this.setSelection('bgm');
        this.adjustVolume('bgm', 0.05);
    });

    this.sfxLeftBtn.on('pointerdown', () => {
        this.setSelection('sfx');
        this.adjustVolume('sfx', -0.05);
    });

    this.sfxRightBtn.on('pointerdown', () => {
        this.setSelection('sfx');
        this.adjustVolume('sfx', 0.05);
    });    

    // 음소거 버튼
    this.muteBtn = this.add.text(centerX, 300, 'MUTE ALL', {
      fontFamily: 'ThaleahFat',
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5).setInteractive();
    this.muteBtn.on('pointerdown', () => this.muteAll());

    // 초기화 버튼
    this.resetBtn = this.add.text(centerX, 350, 'RESET', {
      fontFamily: 'ThaleahFat',
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5).setInteractive();
    this.resetBtn.on('pointerdown', () => this.resetVolume());    

    this.updateSelection();

    // --- 키보드 입력 처리
    this.input.keyboard.on('keydown-UP', () => {
      this.game.audioManager.playSFX('sfx_ui_select');
      this.selectedIndex = (this.selectedIndex - 1 + this.menuTargets.length) % this.menuTargets.length;
      this.updateSelection();
    });

    this.input.keyboard.on('keydown-DOWN', () => {
      this.game.audioManager.playSFX('sfx_ui_select');
      this.selectedIndex = (this.selectedIndex + 1) % this.menuTargets.length;
      this.updateSelection();
    });

    this.input.keyboard.on('keydown-LEFT', () => {
      this.game.audioManager.playSFX('sfx_ui_select');
      const target = this.menuTargets[this.selectedIndex];
      if (target === 'bgm') this.adjustVolume('bgm', -0.05);
      if (target === 'sfx') this.adjustVolume('sfx', -0.05);
    });

    this.input.keyboard.on('keydown-RIGHT', () => {
      this.game.audioManager.playSFX('sfx_ui_select');
      const target = this.menuTargets[this.selectedIndex];
      if (target === 'bgm') this.adjustVolume('bgm', 0.05);
      if (target === 'sfx') this.adjustVolume('sfx', 0.05);
    });

    this.input.keyboard.on('keydown-ENTER', () => {
      const target = this.menuTargets[this.selectedIndex];
      if (target === 'mute') this.muteAll();
      if (target === 'reset') this.resetVolume();
      if (target === 'back') this.handleBack();
    });

    this.input.keyboard.on('keydown-BACKSPACE', () => {
        this.handleBack();
    });    
  }

  setSelection(type) {
    this.selectedIndex = this.menuTargets.indexOf(type);
    this.updateSelection();
  }

  updateSelection() {
    const items = {
      bgm: this.bgmVolume,
      sfx: this.sfxVolume,
      mute: this.muteBtn,
      reset: this.resetBtn,
      back: this.backBtn
    };

    // reset
    Object.values(items).forEach(item => {
      item.setColor('#ffffff');
      item.setAlpha(1);
      if (item._tween) {
        item._tween.stop();
        item._tween = null;
      }
    });

    // apply blink to selected
    const selectedKey = this.menuTargets[this.selectedIndex];
    const selectedItem = items[selectedKey];
    selectedItem.setColor('#00ffff');
    selectedItem._tween = this.tweens.add({
      targets: selectedItem,
      alpha: { from: 1, to: 0.3 },
      duration: 400,
      yoyo: true,
      repeat: -1
    });
  }

  // 볼륨 저장
  adjustVolume(type, delta) {
    if (type === 'bgm') {
      this.currentBgmVolume = Phaser.Math.Clamp(this.currentBgmVolume + delta, 0, 0.5);
      this.bgmVolume.setText(`${Math.round(this.currentBgmVolume * 200)}%`);
        // AudioManager가 있으면
        if (this.game.audioManager) {
        if (!this.game.audioManager.currentBGM || !this.game.audioManager.currentBGM.isPlaying) {
            // BGM이 꺼져 있거나 없으면 다시 재생
            this.game.audioManager.playBGM('bgm_title', { volume: this.currentBgmVolume });
        } else {
            this.game.audioManager.currentBGM.setVolume(this.currentBgmVolume);
        }
        }
    } else if (type === 'sfx') {
      this.currentSfxVolume = Phaser.Math.Clamp(this.currentSfxVolume + delta, 0, 0.5);
      this.sfxVolume.setText(`${Math.round(this.currentSfxVolume * 200)}%`);
      this.game.audioManager.setSFXVolume(this.currentSfxVolume); 
    }
  }

  // 뒤로가기
  handleBack() {
    // 현재 볼륨 상태를 저장
    localStorage.setItem('bgmVolume', this.currentBgmVolume);
    localStorage.setItem('sfxVolume', this.currentSfxVolume);
    
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('StartScene', { fromOption: true });
    });
  }

  // 음소거
  muteAll() {
    this.currentBgmVolume = 0;
    this.currentSfxVolume = 0;
    this.bgmVolume.setText('0%');
    this.sfxVolume.setText('0%');

    this.saveVolumeSettings();
  }

  // 초기화
  resetVolume() {
    this.currentBgmVolume = 0.5;
    this.currentSfxVolume = 0.5;
    this.bgmVolume.setText('100%');
    this.sfxVolume.setText('100%');

    this.saveVolumeSettings();
  }  

  saveVolumeSettings() {
    this.game.audioManager.setBGMVolume(this.currentBgmVolume);
    this.game.audioManager.setSFXVolume(this.currentSfxVolume); 
  }
}