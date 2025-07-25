export default class Boss1 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'boss01', 0); // 기본은 0프레임

  }

  spawn() {
    const backgrounds = this.scene.backgroundGroup.getChildren();
    const bg = backgrounds.find(bg => bg.texture.key === 'stage1_30');
    if (!bg) {
      console.warn('stage1_30 배경이 존재하지 않습니다.');
      return;
    }

    const x = this.scene.scale.width / 2;
    const targetY = 150;

    this.setPosition(x, -100);
    this.setActive(true);
    this.setVisible(true);

    this.scene.physics.add.existing(this);
    this.setDepth(100); // ✅ 높게 설정
    this.scene.add.existing(this); // ✅ add 시 최상단에 그려짐

      // 천천히 내려오는 연출 추가
      this.scene.tweens.add({
        targets: this,
        y: targetY,
        duration: 1000,
        ease: 'Sine.easeOut',
      });
  }

  setupBossBackground() {
    this.scene.bossBackgroundGroup = this.scene.add.group();

    
    const bossBg0 = this.scene.add.image(0, 0, 'stage1_boss00').setOrigin(0).setDepth(5);
    console.log('bossBg0.height : ' + bossBg0.height);
    const bossBg1 = this.scene.add.image(0, -bossBg0.height, 'stage1_boss01').setOrigin(0).setDepth(5);
    const bossBg2 = this.scene.add.image(0, -bossBg0.height * 2, 'stage1_boss02').setOrigin(0).setDepth(5);
    const bossBg3 = this.scene.add.image(0, -bossBg0.height * 3, 'stage1_boss03').setOrigin(0).setDepth(5);
    const bossBg4 = this.scene.add.image(0, -bossBg0.height * 4, 'stage1_boss04').setOrigin(0).setDepth(5);
    const bossBg5 = this.scene.add.image(0, -bossBg0.height * 5, 'stage1_boss05').setOrigin(0).setDepth(5);

    this.scene.bossBackgroundGroup.add(bossBg0);
    this.scene.bossBackgroundGroup.add(bossBg1);
    this.scene.bossBackgroundGroup.add(bossBg2);
    this.scene.bossBackgroundGroup.add(bossBg3);
    this.scene.bossBackgroundGroup.add(bossBg4);
    this.scene.bossBackgroundGroup.add(bossBg5);    
  }

  update() {
    // 추후 이동 및 패턴 정의 가능
  }
}