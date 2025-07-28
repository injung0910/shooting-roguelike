export default class SupportUnit extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'support_red'); // 수정됨

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDepth(19);
    this.setAlpha(0);

    this.play('plane2_support'); // 애니메이션 실행

    scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 500,
      ease: 'Power2'
    });

    this.offsetX = 0;
    this.bulletKey = 'missile4_anim';

    // 서포트 유닛용 bullet 그룹
    this.bullets = scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      maxSize: 30,
      runChildUpdate: true
    });

    this.fireRate = 500; // ms
    this.lastFired = 0;

  }

  fire() {
    const bullet = this.bullets.get(this.x, this.y - 10, this.bulletKey);

    // 충돌 그룹에 추가 (Stage1에서 넘겨준 그룹 사용)
    if (this.scene.supportBulletGroup) {
        this.scene.supportBulletGroup.add(bullet);
    }

    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.body.enable = true;
      bullet.setVelocityY(-300);

      bullet.play('missile4_anim'); // 애니메이션 재생
    }

  }    

  update(playerX, playerY, offsetX) {
    this.offsetX = offsetX;

    // 플레이어 기준으로 좌우 유지, 약간 부드럽게 따라다님
    this.x = Phaser.Math.Linear(this.x, playerX + offsetX, 0.1);
    this.y = Phaser.Math.Linear(this.y, playerY + 25, 0.1);

    // 자동 발사
    const now = this.scene.time.now;
    if (now > this.lastFired + this.fireRate) {
      this.fire();
      this.lastFired = now;
    }

    // 총알 정리 (카메라 밖이면 제거)
    const camera = this.scene.cameras.main;
    const buffer = 50;

    this.bullets.children.iterate(bullet => {
      if (
        bullet &&
        bullet.active &&
        (
          bullet.y < camera.worldView.top - buffer ||
          bullet.y > camera.worldView.bottom + buffer ||
          bullet.x < camera.worldView.left - buffer ||
          bullet.x > camera.worldView.right + buffer
        )
      ) {
        this.bullets.killAndHide(bullet);
        bullet.body.enable = false;
      }
    });  
  }

}