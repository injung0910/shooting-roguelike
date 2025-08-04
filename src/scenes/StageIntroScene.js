export default class StageIntroScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StageIntroScene' });
  }

  init(data) {
    this.ship = data; // 선택된 기체 정보 받기
    this.stageKey = data.stageKey;
  }

  create() {
    
    // bgm 설정
    this.game.audioManager.scene = this;
    this.game.audioManager.playBGM(`bgm_${this.stageKey}`, { loop: true, volume: this.game.audioManager.bgmVolume }, true);

    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    // 배경(선택 사항: Stage1의 배경 일부를 미리 보여줄 수도 있음)
    this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000).setOrigin(0);

    // 🔼 Move (↑ ↓ ← →)
    this.add.text(centerX - 100, centerY + 70, '↑ ↓ ← → : Move', {
      fontFamily: 'ThaleahFat',
      fontSize: '32px',
      color: '#ffffff'
    });

    // 🔫 Shot (Space)
    this.add.text(centerX - 100, centerY + 100, 'Space    : Shot', {
      fontFamily: 'ThaleahFat',      
      fontSize: '32px',
      color: '#ffffff'
    });

    // 💣 Bomb (Shift)
    this.add.text(centerX - 100, centerY + 130, 'Shift     : Bomb', {
      fontFamily: 'ThaleahFat',
      fontSize: '32px',
      color: '#ffffff'
    });

    let stage;

    if(this.stageKey === 'Stage1') stage = 'STAGE 1'

    // Stage 제목 텍스트
    const titleText = this.add.text(centerX, centerY, stage, {
      fontFamily: 'ThaleahFat',
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5);
    
    // 아래에서 위로 올라오듯 연출 (혹은 반대)
    this.tweens.add({
      targets: titleText,
      y: centerY - 50,
      alpha: { from: 0, to: 1 },
      duration: 1000,
      ease: 'Sine.easeOut',
      onComplete: () => {
        // 잠깐 보여준 후 Stage1으로 전환
        this.time.delayedCall(1500, () => {           
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start(this.stageKey, this.ship);
            });
        });
      }
    });

    // Stage 제목 텍스트
    const controlText = this.add.text(centerX, centerY, '', {
      fontFamily: 'ThaleahFat',
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5);    
  }
}