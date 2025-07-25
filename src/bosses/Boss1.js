export default class Boss1 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'boss01', 0); // 기본은 0프레임

    scene.physics.add.existing(this);
    this.setDepth(20);

  }

  spawn() {
    const backgrounds = this.scene.backgroundGroup.getChildren();
    const bg = backgrounds.find(bg => bg.texture.key === 'stage1_30'); // 강제로 stage1_01 사용

    if (!bg) {
      console.warn('stage1_01 배경이 존재하지 않습니다.');
      return;
    }

    const x = this.scene.scale.width / 2;
    const y = bg.y + 150;

    this.setPosition(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.play('boss01_anim');

    this.scene.physics.add.existing(this);
    this.scene.backgroundContainer.add(this);

    console.log('[보스 테스트 소환] 위치:', x, y);
  }

  update() {
    // 추후 이동 및 패턴 정의 가능
  }
}