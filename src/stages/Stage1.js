import Player from '../objects/Player.js';
import EnemyManager from '../objects/EnemyManager.js';
import ItemManager from '../objects/ItemManager';

export default class Stage1 extends Phaser.Scene {
  constructor(scene) {
    super({ key: 'Stage1' });
  }

  init(data) {
    console.log('[Stage1] 받은 데이터:', data);

    this.ship = data;
  }

  create(){

    // Player 생성 시 ship 이름 전달
    this.player = new Player(this, 300, 700, this.ship);
    console.log('Player.scene:', this.player.scene); 
    
    this.enemyManager = new EnemyManager(this);

    //아이템 처리
    this.itemManager = new ItemManager(this);
    this.itemManager.initCollision(this.player);

    // 스테이지 적 스폰 셋팅
    const spawnData = [
      { type: 'bug1', x: 100, delay: 0 },
      { type: 'bug1', x: 150, delay: 0 },
      { type: 'bug1', x: 200, delay: 0 },
      { type: 'bug1', x: 400, delay: 2000 },
      { type: 'bug1', x: 450, delay: 2000 },
      { type: 'bug1', x: 500, delay: 2000 },
    ];

    this.enemyManager.spawnEnemiesFromData(spawnData);    

    //테스트용 무한루프
    this.time.addEvent({
      delay: 4000,       // 10초
      loop: true,        // 무한 반복
      callback: () => {
        this.enemyManager.spawnEnemiesFromData(spawnData);
      }
    });


    // 적 -> 플레이어 bullets 충돌처리
    this.physics.add.overlap(
      this.player,
      this.enemyManager.enemyBulletManager.bullets,
      (player, bullet) => {
        player.handleHit(bullet);
      },
      null,
      this
    );

    // 플레이어 -> 적 bullets 충돌처리
    this.physics.add.overlap(
      this.player.bulletManager.bullets,
      this.enemyManager.enemies,
      (bullet, enemy) => {
        this.enemyManager.handleEnemyHit(bullet, enemy);
      },
      null,
      this
    );    

    // 플레이어 적 충돌
    this.physics.add.overlap(
      this.player,
      this.enemyManager.enemies,
      this.enemyManager.handleEnemyPlayerCollision,
      null,
      this.enemyManager
    );

    // 서포트
    this.supportBulletGroup = this.physics.add.group();

    this.physics.add.overlap(
      this.supportBulletGroup,
      this.enemyManager.enemies,
      (bullet, enemy) => {
        this.enemyManager.handleEnemyHit(bullet, enemy);
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.player.bulletManager.missileGroup,
      this.enemyManager.enemies,
      (missile, enemy) => {
        this.enemyManager.applyDamage(enemy, missile.damage); // 관통탄도 데미지 적용
      },
      null,
      this
    );

    // 맵 타일
    this.tileWidth = 144;
    this.tileHeight = 144;
    const rows = Math.ceil(this.scale.height / this.tileHeight) + 1;
    const cols = Math.ceil(this.scale.width / this.tileWidth);

    this.crossTiles = [];

    this.clouds = [];

    const cloudKeys = ['cloud-1', 'cloud-2', 'cloud-3'];

    // 1. 전체 배경을 크로스로드 타일로 덮기
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols+1; x++) {
        const crosstile = this.add.image(x * this.tileWidth - 221 , y * this.tileHeight - 221, 'normal-road')
          .setOrigin(0)
          .setDisplaySize(144, 144);
        this.crossTiles.push(crosstile);
      }
    }

    this.bgTiles = [];

    // 사용할 타일 프레임 이름 목록
    const tileFrames = [
      'building1',
      'building2',
      'building3',
      'building4',
      'forest1',
      'forest2'
    ];

    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const frameName = Phaser.Utils.Array.GetRandom(tileFrames); // 랜덤 프레임 선택

        const tile = this.add.image(x * this.tileWidth, y * this.tileHeight, 'tile1', frameName)
          .setOrigin(0);

        this.bgTiles.push(tile);
      }
    }
    
    // 구름들을 배경과 타일 위, 플레이어 아래에 추가
    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(0, this.scale.width);
      const y = Phaser.Math.Between(0, this.scale.height);
      const key = Phaser.Utils.Array.GetRandom(cloudKeys);

      const cloud = this.add.image(x, y, key)
        .setAlpha(Phaser.Math.FloatBetween(0.3, 0.6))
        .setScale(Phaser.Math.FloatBetween(0.6, 1.2));

      this.clouds.push(cloud);
    }

  }

  update(time, delta){
    const scrollSpeed = 2;

    this.bgTiles.forEach(tile => {
      tile.y += scrollSpeed;

      if (tile.y >= this.scale.height) {
        tile.y = tile.y - (Math.ceil(this.scale.height / this.tileHeight) + 1) * this.tileHeight;
      }
    });

    this.crossTiles.forEach(tile => {
      tile.y += scrollSpeed;

      if (tile.y >= this.scale.height) {
        tile.y = tile.y - (Math.ceil(this.scale.height / this.tileHeight) + 1) * this.tileHeight;
      }
    });

    this.clouds.forEach(cloud => {
      cloud.y += 0.3;
      if (cloud.y > this.scale.height + 50) {
        cloud.y = -50;
        cloud.x = Phaser.Math.Between(0, this.scale.width);
      }
    });

    if (this.player) {
      this.player.update();
    }
     
    if (this.enemyManager) {
      this.enemyManager.update();
    }

    this.itemManager.update();

  }
    
}
