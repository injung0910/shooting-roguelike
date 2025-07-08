import Player from '../objects/Player';
import BulletManager from '../objects/BulletManager';  // 여러 발사 방식이 있다면 Manager로 묶어도 좋음
import EnemyManager from '../objects/EnemyManager';
import Explosion from '../objects/Explosion';
import Powerup from '../objects/Powerup';
import Stage1 from '../stages/Stage1';
import Boss1 from '../bosses/Boss1';
import { loadAllAssets } from '../loaders/AssetLoader.js';


export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    loadAllAssets(this); // 에셋 로딩을 분리해서 처리
  }

  create() {
    this.stage = new Stage1(this);        // 배경 + 타일 + 행성 등
    this.player = new Player(this);       // 플레이어
    this.enemyManager = new EnemyManager(this); // 적 생성 및 공격
    this.bulletManager = new BulletManager(this, this.player); // 총알 발사 등
    this.powerupManager = new Powerup(this, this.player);      // 파워업 충돌 처리 등

    // 충돌 처리도 여기서 등록
  }

  update(time, delta) {
    if (this.stage.update) this.stage.update(delta);
    if (this.player.update) this.player.update();
    if (this.enemyManager.update) this.enemyManager.update();
    if (this.bulletManager.update) this.bulletManager.update(time);
  }
}