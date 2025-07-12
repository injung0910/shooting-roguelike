import Player from '../objects/Player.js';
import BulletManager from '../objects/BulletManager.js'
import GameStatusManager from '../ui/GameStatusManager.js';
import EnemyManager from '../objects/EnemyManager.js';

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

    this.bulletManager = new BulletManager(this, this.ship); 

    this.statusManager = new GameStatusManager(this, this.ship);

    /*
    this.enemyManager = new EnemyManager(this);

    this.time.addEvent({
      delay: 2000, // 2초마다 등장
      callback: () => {
        this.enemyManager.spawnEnemy('bug1'); // grunt 외에 zigzag, tank 등 가능
      },
      loop: true
    });

    this.physics.add.overlap(
      this.bulletManager.bullets,
      this.enemyManager.enemies,
      this.handleBulletHitEnemy,
      null,
      this
    );
    */

    this.anims.create({
      key: 'bug1_fly',
      frames: this.anims.generateFrameNumbers('bug1', { start: 0, end: 5 }), // 프레임 범위는 이미지에 따라 조정
      frameRate: 10,
      repeat: -1
    });

  // 적 생성
    const enemy = this.physics.add.sprite(300, 200, 'bug1');
    enemy.play('bug1_fly');
    enemy.setVelocityY(100);
    enemy.setDepth(10);  


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

    // 발사키
    this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.isTouching = false;
    this.lastFired = 0;
    this.fireInterval = 300; // 300ms 간격    

    this.input.on('pointerdown', () => {
      this.isTouching = true;
    });

    this.input.on('pointerup', () => {
      this.isTouching = false;
    });
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

  }

  handleBulletHitEnemy(bullet, enemy) {
    bullet.setActive(false);
    bullet.setVisible(false);
    bullet.body.enable = false;

    enemy.takeDamage(this.player.attack); // 기체의 공격력
  }  
}
