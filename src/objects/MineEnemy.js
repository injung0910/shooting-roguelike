export default class MineEnemy {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, 'mineEnemy');
    this.sprite.setImmovable(true);
    this.sprite.setData('type', 'mine');

    // 충돌 체크
    scene.physics.add.overlap(this.sprite, scene.player.sprite, this.onPlayerCollide, null, this);
  }

  onPlayerCollide(mine, player) {
    // 폭발 이펙트
    const explosion = this.scene.add.sprite(mine.x, mine.y, 'explosion1');
    explosion.setScale(0.5);
    explosion.play('explosion1');
    explosion.on('animationcomplete', () => explosion.destroy());

    // 플레이어 피해 처리
    player.disableBody(true, true);

    // 지뢰 제거
    mine.destroy();
  }

  update() {
    // 필요 시 특정 행동 추가
    // 예: proximity trigger 또는 깜빡임
  }
}