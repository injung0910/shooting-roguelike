import Player from '../objects/Player.js';
import EnemyManager from '../objects/EnemyManager.js';
import ItemManager from '../objects/ItemManager';
import GroundEnemyManager from '../objects/GroundEnemyManager.js';
import MineEnemyManager from '../objects/MineEnemyManager.js';
import Boss1 from '../bosses/Boss1.js'; // 경로 확인

// Stage1.js 상단
const DEBUG_BOSS_ONLY = false;

export default class Stage1 extends Phaser.Scene {
  constructor(scene) {
    super({ key: 'Stage1' });
  }

  init(data) {
    this.ship = data;
  }

  create() {

    this.game.effectManager.setScene(this);
    
    this.inputEnabled = true;

    // 고정 배경 3종
    this.fixedBG1 = this.add.image(0, 0, 'purple_background').setOrigin(0).setDisplaySize(600, 800).setScrollFactor(0);
    this.fixedBG2 = this.add.image(0, 0, 'stars_1').setOrigin(0).setDisplaySize(600, 800).setScrollFactor(0);
    this.fixedBG3 = this.add.image(0, 0, 'stars_2').setOrigin(0).setDisplaySize(600, 800).setScrollFactor(0);

    // 배경 그룹 생성
    this.backgroundGroup = this.add.group();

    // Player 생성 시 ship 이름 전달
    this.player = new Player(this, 300, 700, this.ship);

    // 적
    this.enemyManager = new EnemyManager(this);

    // 지상 적
    this.groundEnemyManager = new GroundEnemyManager(this);

    // 지뢰
    this.mineEnemyManager = new MineEnemyManager(this);

    // 아이템 처리
    this.itemManager = new ItemManager(this);
    this.itemManager.initCollision(this.player);

    // 서포트
    this.supportBulletGroup = this.physics.add.group();

    if (DEBUG_BOSS_ONLY) {

      const bgKeys = ['stage1_30']; // 🔹 테스트용: 이 배열에 필요한 배경만 추가

      bgKeys.forEach((key, index) => {
        const bg = this.add.image(0, -800 * index, key).setOrigin(0, 0);
        this.backgroundGroup.add(bg);
      });

      this.triggerBossWarning();
      return; // 나머지 스폰 무시
    }

    // 배경 순서 배열
    const backgroundOrder = [
      'stage1_01', 'stage1_02', 'stage1_03', 'stage1_04', 'stage1_05', 'stage1_06', 'stage1_07', 'stage1_08',
      'stage1_09', 'stage1_10', 'stage1_11', 'stage1_12', 'stage1_13', 'stage1_14', 'stage1_15', 'stage1_16',
      'stage1_17', 'stage1_18', 'stage1_19', 'stage1_20', 'stage1_21', 'stage1_22', 'stage1_23', 'stage1_24',
      'stage1_25', 'stage1_26', 'stage1_27', 'stage1_28', 'stage1_29', 'stage1_30'
    ];


    backgroundOrder.forEach((key, i) => {
      const bg = this.add.image(0, -800 * i, key)
        .setOrigin(0, 0)
        .setDisplaySize(600, 800);
      this.backgroundGroup.add(bg);
    });

    // 오류로 존재할 경우 삭제
    if (this.backgroundContainer) {
      this.backgroundContainer.destroy(true);
    }

    // 컨테이너에 배경 묶기
    this.backgroundContainer = this.add.container(0, 0, this.backgroundGroup.getChildren());

    // 스테이지 적 스폰 셋팅
    const spawnData = [
      { key: 'stage1_01', type: 'bug2', x: 100, delay: 0 },
      { key: 'stage1_01', type: 'bug1', x: 150, delay: 0 },
      { key: 'stage1_01', type: 'bug1', x: 200, delay: 0 },
      { key: 'stage1_01', type: 'bug1', x: 400, delay: 2000 },
      { key: 'stage1_01', type: 'bug1', x: 450, delay: 2000 },
      { key: 'stage1_01', type: 'bug2', x: 500, delay: 2000 },

      { key: 'stage1_06', type: 'bug3', x: 50, delay: 0 },
      { key: 'stage1_06', type: 'bug2', x: 100, delay: 0 },
      { key: 'stage1_06', type: 'bug3', x: 150, delay: 0 },
      { key: 'stage1_06', type: 'bug3', x: 450, delay: 0 },      
      { key: 'stage1_06', type: 'bug2', x: 500, delay: 0 },
      { key: 'stage1_06', type: 'bug3', x: 550, delay: 0 },

      { key: 'stage1_10', type: 'bug2', x: 100, delay: 0 },
      { key: 'stage1_10', type: 'bug3', x: 150, delay: 0 },
      { key: 'stage1_10', type: 'bug3', x: 200, delay: 0 },
      { key: 'stage1_10', type: 'bug3', x: 400, delay: 0 },
      { key: 'stage1_10', type: 'bug3', x: 450, delay: 0 },
      { key: 'stage1_10', type: 'bug2', x: 500, delay: 0 },

      { key: 'stage1_04', type: 'danger2', x: 500, delay: 2000 },
      { key: 'stage1_04', type: 'danger2', x: 500, delay: 2200 },
      { key: 'stage1_04', type: 'danger2', x: 500, delay: 2400 },

      { key: 'stage1_04', type: 'danger2', x: 100, delay: 5000 },
      { key: 'stage1_04', type: 'danger2', x: 100, delay: 5200 },
      { key: 'stage1_04', type: 'danger2', x: 100, delay: 5400 },

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

      { key: 'stage1_06', type: 'emperor_4', x: 250, delay: 11000 },
      { key: 'stage1_06', type: 'emperor_4', x: 350, delay: 11000 },

      { key: 'stage1_08', type: 'emperor_3', x: 250, delay: 15000 },
      { key: 'stage1_08', type: 'emperor_3', x: 350, delay: 15000 },

      { key: 'stage1_08', type: 'emperor_1', x: 300, delay: 20000 },

      { key: 'stage1_09', type: 'emperor4', x: 200, delay: 30000 },
      { key: 'stage1_09', type: 'emperor4', x: 400, delay: 30000 },

      { key: 'stage1_20', type: 'emperor3', x: 100, delay: 70000 },
      { key: 'stage1_20', type: 'emperor1', x: 300, delay: 70000 },
      { key: 'stage1_20', type: 'emperor3', x: 500, delay: 70000 }
    ];

    this.enemyManager.spawnEnemies(spawnData);

    // 경고음
    const warningData = [
      { key: 'stage1_06', delay: 13500, duration: 2000, xMin: 200, xMax: 400, text: 'ENEMY APPROACHING' },
      { key: 'stage1_08', delay: 19500, duration: 2000, xMin: 200, xMax: 400, text: 'ENEMY APPROACHING' },
      { key: 'stage1_08', delay: 24500, duration: 2000, xMin: 200, xMax: 400, text: 'ENEMY APPROACHING' },
      { key: 'stage1_25', delay: 95000, duration: 2000, xMin: 0,   xMax: 600, text: 'ASTEROID APPROACHING' }
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
    this.bossTriggered = false; // 경고/보스 음악 중복 방지

    this.enemyBaseGroup = this.physics.add.group();


    // 스테이지 적 스폰 셋팅
    const groundSpawnData = [
      { key: 'stage1_03', x: 129, y: 175, b: 'tankbase_1', c: 'tankcannon_1a' },
      { key: 'stage1_03', x: 129, y: 255, b: 'tankbase_1', c: 'tankcannon_1a' },
      { key: 'stage1_03', x: 478, y: 175, b: 'tankbase_1', c: 'tankcannon_1a' },
      { key: 'stage1_03', x: 478, y: 255, b: 'tankbase_1', c: 'tankcannon_1a' },

      { key: 'stage1_09', x: 129, y: 535, b: 'tankbase_1', c: 'tankcannon_2a' },
      { key: 'stage1_09', x: 129, y: 610, b: 'tankbase_1', c: 'tankcannon_2a' },
      { key: 'stage1_09', x: 478, y: 535, b: 'tankbase_1', c: 'tankcannon_2a' },
      { key: 'stage1_09', x: 478, y: 610, b: 'tankbase_1', c: 'tankcannon_2a' },

      { key: 'stage1_13', x: 90, y: 50, b: 'tankbase_5', c: 'tankcannon_3a' },
      { key: 'stage1_13', x: 90, y: 250, b: 'tankbase_5', c: 'tankcannon_3a' },
      { key: 'stage1_13', x: 90, y: 450, b: 'tankbase_5', c: 'tankcannon_3a' },
      { key: 'stage1_13', x: 90, y: 650, b: 'tankbase_5', c: 'tankcannon_3a' },
      { key: 'stage1_14', x: 90, y: 50, b: 'tankbase_5', c: 'tankcannon_3a' },
      { key: 'stage1_14', x: 90, y: 250, b: 'tankbase_5', c: 'tankcannon_3a' },
      { key: 'stage1_14', x: 90, y: 450, b: 'tankbase_5', c: 'tankcannon_3a' },
      { key: 'stage1_14', x: 90, y: 650, b: 'tankbase_5', c: 'tankcannon_3a' },

      { key: 'stage1_15', x: 510, y: 50, b: 'tankbase_5', c: 'tankcannon_3a' },
      { key: 'stage1_15', x: 510, y: 250, b: 'tankbase_5', c: 'tankcannon_3a' },
      { key: 'stage1_15', x: 510, y: 450, b: 'tankbase_5', c: 'tankcannon_3a' },
      { key: 'stage1_15', x: 510, y: 650, b: 'tankbase_5', c: 'tankcannon_3a' },
      { key: 'stage1_16', x: 510, y: 50, b: 'tankbase_5', c: 'tankcannon_3a' },
      { key: 'stage1_16', x: 510, y: 250, b: 'tankbase_5', c: 'tankcannon_3a' },
      { key: 'stage1_16', x: 510, y: 450, b: 'tankbase_5', c: 'tankcannon_3a' },
      { key: 'stage1_16', x: 510, y: 650, b: 'tankbase_5', c: 'tankcannon_3a' },

      { key: 'stage1_18', x: 90, y: 50, b: 'tankbase_2', c: 'tankcannon_3a' },
      { key: 'stage1_18', x: 90, y: 450, b: 'tankbase_2', c: 'tankcannon_3a' },
      { key: 'stage1_18', x: 510, y: 250, b: 'tankbase_2', c: 'tankcannon_3a' },
      { key: 'stage1_18', x: 510, y: 650, b: 'tankbase_2', c: 'tankcannon_3a' },

      { key: 'stage1_19', x: 90, y: 50, b: 'tankbase_2', c: 'tankcannon_3a' },
      { key: 'stage1_19', x: 90, y: 450, b: 'tankbase_2', c: 'tankcannon_3a' },
      { key: 'stage1_19', x: 510, y: 250, b: 'tankbase_2', c: 'tankcannon_3a' },
      { key: 'stage1_19', x: 510, y: 650, b: 'tankbase_2', c: 'tankcannon_3a' }

    ];

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

    this.physics.add.overlap(
      this.supportBulletGroup,
      this.enemyBaseGroup,
      (bullet, base) => {
        this.groundEnemyManager.handleGroundEnemyHit(bullet, base);
      },
      null,
      this
    );


    const mineSpawnData = [
      { key: 'stage1_13', x: 300, y: 200, type: 'passive' },
      //{ key: 'stage1_13', x: 400, y: 50, type: 'passive' },
      { key: 'stage1_13', x: 500, y: 200, type: 'passive' },

      { key: 'stage1_13', x: 300, y: 500, type: 'passive' },
      { key: 'stage1_13', x: 400, y: 350, type: 'passive' },
      { key: 'stage1_13', x: 500, y: 500, type: 'passive' },

      { key: 'stage1_13', x: 300, y: 800, type: 'passive' },
      { key: 'stage1_13', x: 400, y: 650, type: 'passive' },
      { key: 'stage1_13', x: 500, y: 800, type: 'passive' },
    
      { key: 'stage1_14', x: 300, y: 200, type: 'passive' },
      //{ key: 'stage1_14', x: 400, y: 50, type: 'passive' },
      { key: 'stage1_14', x: 500, y: 200, type: 'passive' },

      { key: 'stage1_14', x: 300, y: 500, type: 'passive' },
      { key: 'stage1_14', x: 400, y: 350, type: 'passive' },
      { key: 'stage1_14', x: 500, y: 500, type: 'passive' },

      { key: 'stage1_14', x: 300, y: 800, type: 'passive' },
      { key: 'stage1_14', x: 400, y: 650, type: 'passive' },
      { key: 'stage1_14', x: 500, y: 800, type: 'passive' },      

      { key: 'stage1_15', x: 100, y: 200, type: 'suicide' },
      { key: 'stage1_15', x: 200, y: 50, type: 'suicide' },
      { key: 'stage1_15', x: 300, y: 200, type: 'suicide' },

      { key: 'stage1_15', x: 100, y: 500, type: 'suicide' },
      { key: 'stage1_15', x: 200, y: 350, type: 'suicide' },
      { key: 'stage1_15', x: 300, y: 500, type: 'suicide' },

      //{ key: 'stage1_15', x: 100, y: 800, type: 'suicide' },
      { key: 'stage1_15', x: 200, y: 650, type: 'suicide' },
      //{ key: 'stage1_15', x: 300, y: 800, type: 'suicide' },
    
      { key: 'stage1_16', x: 100, y: 200, type: 'suicide' },
      { key: 'stage1_16', x: 200, y: 50, type: 'suicide' },
      { key: 'stage1_16', x: 300, y: 200, type: 'suicide' },

      { key: 'stage1_16', x: 100, y: 500, type: 'suicide' },
      { key: 'stage1_16', x: 200, y: 350, type: 'suicide' },
      { key: 'stage1_16', x: 300, y: 500, type: 'suicide' },

      //{ key: 'stage1_16', x: 100, y: 800, type: 'suicide' },
      { key: 'stage1_16', x: 200, y: 650, type: 'suicide' },
      //{ key: 'stage1_16', x: 300, y: 800, type: 'suicide' },

      { key: 'stage1_17', x: 20, y: 100, type: 'passive' },
      { key: 'stage1_17', x: 20, y: 200, type: 'passive' },
      { key: 'stage1_17', x: 20, y: 300, type: 'passive' },
      { key: 'stage1_17', x: 20, y: 400, type: 'passive' },
      { key: 'stage1_17', x: 20, y: 500, type: 'passive' },
      { key: 'stage1_17', x: 20, y: 600, type: 'passive' },
      { key: 'stage1_17', x: 20, y: 700, type: 'passive' },
      //{ key: 'stage1_17', x: 20, y: 800, type: 'passive' },

      { key: 'stage1_17', x: 580, y: 100, type: 'passive' },
      { key: 'stage1_17', x: 580, y: 200, type: 'passive' },
      { key: 'stage1_17', x: 580, y: 300, type: 'passive' },
      { key: 'stage1_17', x: 580, y: 400, type: 'passive' },
      { key: 'stage1_17', x: 580, y: 500, type: 'passive' },
      { key: 'stage1_17', x: 580, y: 600, type: 'passive' },
      { key: 'stage1_17', x: 580, y: 700, type: 'passive' },
      //{ key: 'stage1_17', x: 580, y: 800, type: 'passive' },

      { key: 'stage1_17', x: 100, y: 600, type: 'suicide' },
      { key: 'stage1_17', x: 200, y: 700, type: 'suicide' },
      { key: 'stage1_17', x: 300, y: 600, type: 'suicide' },
      { key: 'stage1_17', x: 400, y: 700, type: 'suicide' },
      { key: 'stage1_17', x: 500, y: 600, type: 'suicide' },

      { key: 'stage1_17', x: 200, y: 500, type: 'suicide' },
      { key: 'stage1_17', x: 400, y: 500, type: 'suicide' },

      { key: 'stage1_17', x: 100, y: 400, type: 'suicide' },
      { key: 'stage1_17', x: 200, y: 300, type: 'suicide' },
      { key: 'stage1_17', x: 300, y: 400, type: 'suicide' },
      { key: 'stage1_17', x: 400, y: 300, type: 'suicide' },
      { key: 'stage1_17', x: 500, y: 400, type: 'suicide' },

      { key: 'stage1_17', x: 100, y: 200, type: 'suicide' },
      { key: 'stage1_17', x: 200, y: 100, type: 'suicide' },
      { key: 'stage1_17', x: 300, y: 200, type: 'suicide' },
      { key: 'stage1_17', x: 400, y: 100, type: 'suicide' },
      { key: 'stage1_17', x: 500, y: 200, type: 'suicide' },           

    ];

    this.mineEnemyManager.spawnMine(mineSpawnData);

    // 충돌 설정
    this.physics.add.overlap(
      this.player,
      this.mineEnemyManager.mines,
      (player, mine) => this.mineEnemyManager.handlePlayerCollision(mine, player),
      null,
      this
    );

  }

  triggerBossWarning() {
    this.inputEnabled = false; // 조작 비활성화

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

    // 화면 중앙으로
    this.tweens.add({
      targets: this.player,
      x: 300, // 화면 중앙
      duration: 2000, // 2초 동안 이동
      ease: 'Power2',
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

    // 보스 전용 배경
    this.bossBackgroundGroup = this.add.group();

    this.bossGroup = this.physics.add.group();
    // create 등에서 한 번 선언
    this.boss = new Boss1(this);
    this.bossGroup.add(this.boss);

    this.physics.add.overlap(
      this.player.bulletManager.bullets,
      this.bossGroup,
      (bullet, bossGroup) => {
        this.boss.handleBossHit(bullet, bossGroup);
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.supportBulletGroup,
      this.bossGroup,
      (bullet, bossGroup) => {
        this.boss.handleBossHit(bullet, bossGroup);
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.player.bulletManager.missileGroup,
      this.bossGroup,
      (bullet, bossGroup) => {
        this.boss.handleBossHit(bullet, bossGroup);
      },
      null,
      this
    );

    // 보스 등장
    this.boss.spawn(); // 보스 등장!    

    // 보스 총알과 플레이어 충돌 처리
    this.physics.add.overlap(
      this.boss.bossBulletManager.bullets, // 보스가 발사한 총알
      this.player,
      (player, bullet) => {
        bullet.disableBody(true, true); // 총알 제거
        player.takeHitFromEnemy();      // 플레이어 데미지 처리
      },
      null,
      this
    );

    // 보스 미사일과 플레이어 충돌 처리
    this.physics.add.overlap(
      this.boss.missiles,
      this.player,
      (player, missile) => {
        missile.disableBody(true, true); // 미사일 제거
        player.takeHitFromEnemy();      // 플레이어 데미지 처리
      },
      null,
      this
    );

    // Stage1.js에서 그룹 생성
    this.bossLaserGroup = this.physics.add.group();

    // 충돌 처리
    this.physics.add.overlap(this.player, this.bossLaserGroup, (player, laser) => {
      player.takeHitFromEnemy();
    }, null, this);

    this.minibotGroup = this.physics.add.group();

    this.physics.add.overlap(
      this.player.bulletManager.bullets,
      this.minibotGroup,
      (bullet, minibot) => {
        bullet.disableBody(true, true);
        minibot.takeDamage?.(bullet.damage || 10); // 미니봇에게 데미지 전달
      },
      null,
      this
    );

    // 3초 후 보스 BGM 전환
    this.time.delayedCall(5000, () => {
      // 경고음 반복 중지
      if (this.warningSFXTimer) {
        this.warningSFXTimer.remove(false);
      }

      this.game.audioManager.playBGM('bgm_boss01'); // 보스 음악 재생

      this.inputEnabled = true; // ✅ 조작 다시 활성화

      // 보스전 시작
      this.boss.executePattern();

    });

  }

  update(time, delta) {

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

    // 보스 배경 스크롤
    if (this.bossBackgroundGroup && this.boss && this.boss.active) {
      const bossScrollSpeed = 400; // px/sec 원하는 보스 배경 스피드

      this.bossBackgroundGroup.getChildren().forEach(bg => {
        bg.y += bossScrollSpeed * (delta / 1000);

        if (bg.y >= this.scale.height) {
          const minY = Math.min(...this.bossBackgroundGroup.getChildren().map(b => b.y));
          bg.y = minY - bg.height;
        }
      });
    }

    // 조작 제한 중이면 아무 것도 하지 않음
    if (!this.inputEnabled) return;

    if (this.player) {
      this.player.update();
    }

    if (this.enemyManager) {
      this.enemyManager.update();
    }

    if (this.mineEnemyManager) {
      this.mineEnemyManager.update();
    }

    if (this.boss && this.boss.active) {
      this.boss.update();
    }

    this.itemManager.update();

    if (this.groundEnemyManager) {
      this.groundEnemyManager.update(time, delta);
    }
  }

}
