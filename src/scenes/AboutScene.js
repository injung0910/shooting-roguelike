export default class AboutScene extends Phaser.Scene {
  constructor() {
    super('AboutScene');
  }

  create() {
    
    this.cameras.main.fadeIn(500, 0, 0, 0);
    
    // 1. iframe 생성
    const iframe = document.createElement('iframe');
    iframe.src = 'about.html';
    iframe.width = '600';
    iframe.height = '800';
    iframe.style.border = '2px solid #ffffff';
    iframe.style.borderRadius = '12px';
    iframe.style.backgroundColor = '#000000';

    const iframeObj = this.add.dom(this.scale.width / 2, this.scale.height / 2, iframe).setOrigin(0.5);

    // 2. back 버튼 (DOM 요소로 생성)
    const backButton = document.createElement('button');
    backButton.innerText = '⬅ Back';
    backButton.style.fontSize = '20px';
    backButton.style.padding = '6px 16px';
    backButton.style.borderRadius = '8px';
    backButton.style.border = 'none';
    backButton.style.background = '#ffcc00';
    backButton.style.color = '#000';
    backButton.style.fontWeight = 'bold';
    backButton.style.cursor = 'pointer';

    const backDom = this.add.dom(this.scale.width - 100, 40, backButton).setOrigin(0.5);

    // 3. 항상 위에 보이도록 zIndex 설정
    iframeObj.node.style.zIndex = '1';
    backDom.node.style.zIndex = '2'; // back 버튼을 더 위로

    // 4. 클릭 이벤트
    backButton.addEventListener('click', () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('BootScene');
      });
    });

    // 5. ESC / Backspace 키도 처리
    this.input.keyboard.on('keydown', (event) => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('BootScene');
      });
    });

    // 6. iframe에서 postMessage로 돌아오는 경우도 처리
    window.addEventListener('message', (event) => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('BootScene');
      });
    });
  }
}