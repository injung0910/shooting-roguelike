import Player from '../objects/Player.js';
import EnemyManager from '../objects/EnemyManager.js';
import ItemManager from '../objects/ItemManager';
import GroundEnemyManager from '../objects/GroundEnemyManager.js';
import MineEnemyManager from '../objects/MineEnemyManager.js';


export default class Stage1 extends Phaser.Scene {
  constructor(scene) {
    super({ key: 'Stage1' });
  }

  init(data) {

    this.ship = data;
  }

  create(){

    // 고정 배경 3종
    this.fixedBG1 = this.add.image(0, 0, 'purple_background').setOrigin(0).setDisplaySize(600, 800).setScrollFactor(0);
    this.fixedBG2 = this.add.image(0, 0, 'stars_1').setOrigin(0).setDisplaySize(600, 800).setScrollFactor(0);
    this.fixedBG3 = this.add.image(0, 0, 'stars_2').setOrigin(0).setDisplaySize(600, 800).setScrollFactor(0);   
        // 배경 순서 배열
    const backgroundOrder = [
      'stage1_01', 'stage1_02', 'stage1_03', 'stage1_04', 'stage1_05', 'stage1_06', 'stage1_07', 'stage1_08',
      'stage1_09', 'stage1_10', 'stage1_11', 'stage1_12', 'stage1_13', 'stage1_14', 'stage1_15', 'stage1_16',
      'stage1_17', 'stage1_18', 'stage1_19', 'stage1_20', 'stage1_21', 'stage1_22', 'stage1_23', 'stage1_24',
      'stage1_25', 'stage1_26', 'stage1_27', 'stage1_28', 'stage1_29', 'stage1_30', 'stage1_31'
    ];    

    // 배경 그룹 생성
    this.backgroundGroup = this.add.group();
    backgroundOrder.forEach((key, i) => {
      const bg = this.add.image(0, -800 * i, key)
      .setOrigin(0, 0)
      .setDisplaySize(600, 800); 
      this.backgroundGroup.add(bg);
    });

    // 컨테이너에 배경 묶기
    this.backgroundContainer = this.add.container(0, 0, this.backgroundGroup.getChildren());
    

    // Player 생성 시 ship 이름 전달
    this.player = new Player(this, 300, 700, this.ship);
    
    this.enemyManager = new EnemyManager(this);

    //아이템 처리
    this.itemManager = new ItemManager(this);
    this.itemManager.initCollision(this.player);

    // 스테이지 적 스폰 셋팅
    const spawnData = [
      { key: 'stage1_01', type: 'bug3', x: 100, delay: 0 },
      { key: 'stage1_01', type: 'bug3', x: 150, delay: 0 },
      { key: 'stage1_01', type: 'bug3', x: 200, delay: 0 },
      { key: 'stage1_01', type: 'bug3', x: 400, delay: 2000 },
      { key: 'stage1_01', type: 'bug3', x: 450, delay: 2000 },
      { key: 'stage1_01', type: 'bug3', x: 500, delay: 2000 },

      { key: 'stage1_05', type: 'bug3', x: 50, delay: 0 },
      { key: 'stage1_05', type: 'bug3', x: 100, delay: 0 },
      { key: 'stage1_05', type: 'bug3', x: 500, delay: 0 },
      { key: 'stage1_05', type: 'bug3', x: 550, delay: 0 },

      { key: 'stage1_06', type: 'bug3', x: 50, delay: 0 },
      { key: 'stage1_06', type: 'bug3', x: 100, delay: 0 },
      { key: 'stage1_06', type: 'bug3', x: 500, delay: 0 },
      { key: 'stage1_06', type: 'bug3', x: 550, delay: 0 },      

      { key: 'stage1_04', type: 'danger2', x: 100, delay: 2000 },
      { key: 'stage1_04', type: 'danger2', x: 100, delay: 2200 },
      { key: 'stage1_04', type: 'danger2', x: 100, delay: 2400 },
      { key: 'stage1_04', type: 'danger2', x: 500, delay: 2000 },
      { key: 'stage1_04', type: 'danger2', x: 500, delay: 2200 },
      { key: 'stage1_04', type: 'danger2', x: 500, delay: 2400 },

      { key: 'stage1_04', type: 'danger2', x: 100, delay: 5000 },
      { key: 'stage1_04', type: 'danger2', x: 100, delay: 5200 },
      { key: 'stage1_04', type: 'danger2', x: 100, delay: 5400 },
      { key: 'stage1_04', type: 'danger2', x: 500, delay: 5000 },
      { key: 'stage1_04', type: 'danger2', x: 500, delay: 5200 },
      { key: 'stage1_04', type: 'danger2', x: 500, delay: 5400 },

      { key: 'stage1_06', type: 'danger2', x: 100, delay: 6000 },
      { key: 'stage1_06', type: 'danger2', x: 100, delay: 6200 },
      { key: 'stage1_06', type: 'danger2', x: 100, delay: 6400 },
      { key: 'stage1_06', type: 'danger2', x: 500, delay: 6000 },
      { key: 'stage1_06', type: 'danger2', x: 500, delay: 6200 },
      { key: 'stage1_06', type: 'danger2', x: 500, delay: 6400 },
      
      { key: 'stage1_08', type: 'danger2', x: 100, delay: 7000 },
      { key: 'stage1_08', type: 'danger2', x: 100, delay: 7200 },
      { key: 'stage1_08', type: 'danger2', x: 100, delay: 7400 },
      { key: 'stage1_08', type: 'danger2', x: 500, delay: 7000 },
      { key: 'stage1_08', type: 'danger2', x: 500, delay: 7200 },
      { key: 'stage1_08', type: 'danger2', x: 500, delay: 7400 },

      { key: 'stage1_06', type: 'emperor4_1', x: 250, delay: 11000 },
      { key: 'stage1_06', type: 'emperor4_1', x: 350, delay: 11000 },

      { key: 'stage1_08', type: 'emperor3_1', x: 250, delay: 15000 },
      { key: 'stage1_08', type: 'emperor3_1', x: 350, delay: 15000 },

      { key: 'stage1_08', type: 'emperor1_1', x: 300, delay: 20000 },

      { key: 'stage1_09', type: 'emperor4', x: 200,  delay: 30000 },
      { key: 'stage1_09', type: 'emperor4', x: 400,  delay: 30000 }
    ];

    this.enemyManager.spawnEnemies(spawnData);    

    // 경고음
    const warningData = [
      {key: 'stage1_06', delay: 13500, duration: 2000, xMin: 200, xMax: 400 },
      {key: 'stage1_08', delay: 19500, duration: 2000, xMin: 200, xMax: 400 },
      {key: 'stage1_08', delay: 24500, duration: 2000, xMin: 200, xMax: 400 }
    ]
    // 2초 후에 배경 이름에 sample_01이 포함된 경우, x: 200~400 사이에 경고 표시
    this.enemyManager.showEnemyWarning(warningData);

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


    // 픽셀 경계 흔들림 방지
    this.cameras.main.roundPixels = true;
    
     // 스크롤 속도 및 상태 초기화
    this.scrollSpeed = 202;
    this.backgroundHeight = 800 * 30; // 전체 배경 길이
    this.stopScroll = false;
    this.stopScroll = false;
    this.bossTriggered = false; // 경고/보스 음악 중복 방지
    
    this.enemyBaseGroup = this.physics.add.group();


    // 스테이지 적 스폰 셋팅
    const groundSpawnData = [
      { key: 'stage1_03', x: 129, y: 175, b:'tankbase_1', c:'tankcannon_1a'},
      { key: 'stage1_03', x: 129, y: 255, b:'tankbase_1', c:'tankcannon_1a' },
      { key: 'stage1_03', x: 478, y: 175, b:'tankbase_1', c:'tankcannon_1a' },
      { key: 'stage1_03', x: 478, y: 255, b:'tankbase_1', c:'tankcannon_1a' },

      { key: 'stage1_09', x: 129, y: 535, b:'tankbase_1', c:'tankcannon_2a' },
      { key: 'stage1_09', x: 129, y: 610, b:'tankbase_1', c:'tankcannon_2a' },
      { key: 'stage1_09', x: 478, y: 535, b:'tankbase_1', c:'tankcannon_2a' },
      { key: 'stage1_09', x: 478, y: 610, b:'tankbase_1', c:'tankcannon_2a' },

      { key: 'stage1_14', x: 90, y: 50,  b:'tankbase_5', c:'tankcannon_3a' },
      { key: 'stage1_14', x: 90, y: 250, b:'tankbase_5', c:'tankcannon_3a' },
      { key: 'stage1_14', x: 90, y: 450, b:'tankbase_5', c:'tankcannon_3a' },
      { key: 'stage1_14', x: 90, y: 650, b:'tankbase_5', c:'tankcannon_3a' },
      { key: 'stage1_15', x: 90, y: 50,  b:'tankbase_5', c:'tankcannon_3a' },
      { key: 'stage1_15', x: 90, y: 250, b:'tankbase_5', c:'tankcannon_3a' },
      { key: 'stage1_15', x: 90, y: 450, b:'tankbase_5', c:'tankcannon_3a' },
      { key: 'stage1_15', x: 90, y: 650, b:'tankbase_5', c:'tankcannon_3a' },
      
      { key: 'stage1_16', x: 510, y: 50,  b:'tankbase_5', c:'tankcannon_3a' },
      { key: 'stage1_16', x: 510, y: 250, b:'tankbase_5', c:'tankcannon_3a' },
      { key: 'stage1_16', x: 510, y: 450, b:'tankbase_5', c:'tankcannon_3a' },
      { key: 'stage1_16', x: 510, y: 650, b:'tankbase_5', c:'tankcannon_3a' },
      { key: 'stage1_17', x: 510, y: 50,  b:'tankbase_5', c:'tankcannon_3a' },
      { key: 'stage1_17', x: 510, y: 250, b:'tankbase_5', c:'tankcannon_3a' },
      { key: 'stage1_17', x: 510, y: 450, b:'tankbase_5', c:'tankcannon_3a' },
      { key: 'stage1_17', x: 510, y: 650, b:'tankbase_5', c:'tankcannon_3a' },

      { key: 'stage1_19', x: 90, y: 50,  b:'tankbase_2', c:'tankcannon_3a' },
      { key: 'stage1_19', x: 90, y: 450, b:'tankbase_2', c:'tankcannon_3a' },
      { key: 'stage1_19', x: 510, y: 250, b:'tankbase_2', c:'tankcannon_3a' },
      { key: 'stage1_19', x: 510, y: 650, b:'tankbase_2', c:'tankcannon_3a' },

      { key: 'stage1_20', x: 90, y: 50,  b:'tankbase_2', c:'tankcannon_3a' },
      { key: 'stage1_20', x: 90, y: 450, b:'tankbase_2', c:'tankcannon_3a' },
      { key: 'stage1_20', x: 510, y: 250, b:'tankbase_2', c:'tankcannon_3a' },
      { key: 'stage1_20', x: 510, y: 650, b:'tankbase_2', c:'tankcannon_3a' }

    ];

    // 지상 적
    this.groundEnemyManager = new GroundEnemyManager(this);
    this.groundEnemyManager.spawnGroundEnemies(groundSpawnData);

    this.physics.add.overlap(
      this.player.bulletManager.bullets,
      this.enemyBaseGroup,
      (bullet, base) => {
        this.groundEnemyManager.handleGroundEnemyHit(bullet, base);
      },
      null,
      this
    );


    const mineSpawnData = [
      { key: 'stage1_14', x: 300, y: 150, type : 'passive'},
      { key: 'stage1_14', x: 400, y: 300, type : 'passive'},
      { key: 'stage1_14', x: 500, y: 150, type : 'passive'},

      { key: 'stage1_14', x: 300, y: 450, type : 'passive'},
      { key: 'stage1_14', x: 400, y: 600, type : 'passive'},
      { key: 'stage1_14', x: 500, y: 450, type : 'passive'},
      
      { key: 'stage1_15', x: 300, y: 150, type : 'passive'},
      { key: 'stage1_15', x: 400, y: 300, type : 'passive'},
      { key: 'stage1_15', x: 500, y: 150, type : 'passive'},

      { key: 'stage1_15', x: 300, y: 450, type : 'passive'},
      { key: 'stage1_15', x: 400, y: 600, type : 'passive'},
      { key: 'stage1_15', x: 500, y: 450, type : 'passive'},

      { key: 'stage1_16', x: 100, y: 150, type : 'suicide'},
      { key: 'stage1_16', x: 200, y: 300, type : 'suicide'},
      { key: 'stage1_16', x: 300, y: 150, type : 'suicide'},

      { key: 'stage1_16', x: 100, y: 450, type : 'suicide'},
      { key: 'stage1_16', x: 200, y: 600, type : 'suicide'},
      { key: 'stage1_16', x: 300, y: 450, type : 'suicide'},

      { key: 'stage1_17', x: 100, y: 150, type : 'suicide'},
      { key: 'stage1_17', x: 200, y: 300, type : 'suicide'},
      { key: 'stage1_17', x: 300, y: 150, type : 'suicide'},

      { key: 'stage1_17', x: 100, y: 450, type : 'suicide'},
      { key: 'stage1_17', x: 200, y: 600, type : 'suicide'},
      { key: 'stage1_17', x: 300, y: 450, type : 'suicide'},

      { key: 'stage1_18', x: 100, y: 200, type : 'passive'},
      { key: 'stage1_18', x: 200, y: 300, type : 'passive'},
      { key: 'stage1_18', x: 300, y: 200, type : 'passive'},
      { key: 'stage1_18', x: 400, y: 300, type : 'passive'},
      { key: 'stage1_18', x: 500, y: 200, type : 'passive'},

      { key: 'stage1_18', x: 200, y: 100, type : 'passive'},
      { key: 'stage1_18', x: 400, y: 100, type : 'passive'},

      { key: 'stage1_18', x: 100, y: 600, type : 'suicide'},
      { key: 'stage1_18', x: 200, y: 700, type : 'suicide'},
      { key: 'stage1_18', x: 300, y: 600, type : 'suicide'},
      { key: 'stage1_18', x: 400, y: 700, type : 'suicide'},
      { key: 'stage1_18', x: 500, y: 600, type : 'suicide'},

      { key: 'stage1_18', x: 200, y: 500, type : 'suicide'},
      { key: 'stage1_18', x: 400, y: 500, type : 'suicide'},

    ];

    this.mineEnemyManager = new MineEnemyManager(this);
    this.mineEnemyManager.spawnMine(mineSpawnData);

    // 충돌 설정
    this.physics.add.overlap(
      this.player,
      this.mineEnemyManager.mines,
      (player, mine) => this.mineEnemyManager.handlePlayerCollision(mine, player),
      null,
      this
    );

    // 구름
    //this.cloudGroup = this.add.group();

    // 일정 간격으로 구름 생성
    /*
    this.time.addEvent({
      delay: 3000, // 1.5초마다 생성
      callback: this.spawnRandomCloud,
      callbackScope: this,
      loop: true
    });
    */
  }

  triggerBossWarning() {
    this.game.audioManager.stopBGM(); // 기존 배경음 끄기


    // 화면 깜빡임 연출, 텍스트 경고 등 원하면 추가
    this.warningText = this.add.text(300, 400, 'WARNING!', {
      fontFamily: 'ThaleahFat',
      fontSize: '64px',
      fill: '#ff0000',
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: this.warningText,
      alpha: { from: 0, to: 1 },
      duration: 500,
      yoyo: true,
      repeat: 5,
    });


    // 🔁 1초마다 경고음 반복 (5초 동안)
    this.warningSFXTimer = this.time.addEvent({
      delay: 1000,         // 1초 간격
      callback: () => {
        this.game.audioManager.playSFX('sfx_warning');
      },
      callbackScope: this,
      loop: true
    });

    // 3초 후 보스 BGM 전환
    this.time.delayedCall(5000, () => {
      // 경고음 반복 중지
      if (this.warningSFXTimer) {
        this.warningSFXTimer.remove(false);
      }

      this.game.audioManager.playBGM('bgm_boss01'); // 보스 음악 재생

      // 필요 시 보스 등장
      //this.startBossBattle(); // 또는 this.scene.start('BossScene') 등
    });
  }

  spawnRandomCloud() {
    const cloudKeys = ['cloud-1', 'cloud-2', 'cloud-3'];
    const key = Phaser.Utils.Array.GetRandom(cloudKeys);

    const x = Phaser.Math.Between(0, 600); // 화면 가로 랜덤
    const y = -50; // 위에서 시작
    const speed = Phaser.Math.Between(20, 60); // 천천히

    const cloud = this.add.image(x, y, key).setDepth(10); // 배경 뒤에
    cloud.speed = speed;
    cloud.setAlpha(Phaser.Math.FloatBetween(0.3, 0.5));
    cloud.setScale(Phaser.Math.FloatBetween(0.5, 1.2));

    // ✅ 랜덤 각도 추가
    const angle = Phaser.Math.Between(-30, 30); // -30도 ~ +30도
    cloud.setAngle(angle);

    this.cloudGroup.add(cloud);
  }

  spawnEnemies(time) {
    const camera = this.cameras.main;
    const backgrounds = this.backgroundGroup.getChildren();

    this.spawnData.forEach(config => {
      if (config.spawned) return;

      const bg = backgrounds.find(bg => bg.texture.key === config.key);
      if (!bg) return;

      // 카메라 안에 해당 배경이 들어왔을 때만
      const inView =
        bg.y > camera.worldView.y &&
        bg.y < camera.worldView.y + camera.height;

      if (inView && time > config.delay) {
        const x = bg.x + config.x;
        const y = bg.y + (config.y || 0);

        this.enemyManager.spawnEnemies(config.type, x, y); // 적 생성
        config.spawned = true;

        console.log(`🚀 spawn 시도: ${config.type} at ${config.key} (delay: ${config.delay})`);
      }
    });
  }

  update(time, delta){

    // 구름
    /*
    this.cloudGroup.children.iterate(cloud => {
      if (!cloud) return;

      cloud.y += cloud.speed * (delta / 1000);

      // 화면 아래로 벗어나면 제거
      if (cloud.y > 850) {
        this.cloudGroup.remove(cloud, true, true); // remove + destroy
      }
    });
    */

    // 배경
    if (this.backgroundContainer && !this.stopScroll) {
      this.backgroundContainer.y += this.scrollSpeed * (delta / 1000);

      // 배경 끝에 도달했는지 확인
      const maxScroll = this.backgroundHeight - 800; // 화면 기준 최하단

      // 끝 도달 처리
      if (this.backgroundContainer.y >= maxScroll && !this.bossTriggered) {
        this.backgroundContainer.y = maxScroll;
        this.stopScroll = true;
        this.bossTriggered = true;

        this.triggerBossWarning();
      }
    }

    if (this.player) {
      this.player.update();
    }
     
    if (this.enemyManager) {
      this.enemyManager.update();
    }

    this.itemManager.update();

    if (this.groundEnemyManager) {
      this.groundEnemyManager.update(time, delta);
    }
  }
    
}
