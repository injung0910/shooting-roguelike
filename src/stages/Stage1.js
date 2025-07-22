import Player from '../objects/Player.js';
import EnemyManager from '../objects/EnemyManager.js';
import ItemManager from '../objects/ItemManager';
import GroundEnemyManager from '../objects/GroundEnemyManager.js';


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

    // Player 생성 시 ship 이름 전달
    this.player = new Player(this, 300, 700, this.ship);
    
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


    // 배경 순서 배열
    /*
    const backgroundOrder = [
      'stage1_01', 'stage1_01', 'stage1_01', 'stage1_01',
      'stage1_02', 'stage1_02', 'stage1_02', 'stage1_02',
      'stage1_03',
      'stage1_04', 'stage1_04', 'stage1_04', 'stage1_04',
      'stage1_05',
      'stage1_06', 'stage1_06', 'stage1_06', 'stage1_06',
      'stage1_07',
      'stage1_08',
      'stage1_09', 'stage1_09', 'stage1_09', 'stage1_09',
      'stage1_10',
      'stage1_11', 'stage1_11', 'stage1_11', 'stage1_11',
      'stage1_12',
    ];    
    */

    const backgroundOrder = [
      'sample_01', 'sample_01', 'sample_01', 'sample_01',
      'sample_01', 'sample_01', 'sample_01', 'sample_01',
      'sample_01',
      'sample_01', 'sample_01', 'sample_01', 'sample_01',
      'sample_01',
      'sample_01', 'sample_01', 'sample_01', 'sample_01',
      'sample_01',
      'sample_01',
      'sample_01', 'sample_01', 'sample_01', 'sample_01',
      'sample_01',
      'sample_01', 'sample_01', 'sample_01', 'sample_01',
      'sample_01',
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

    // 픽셀 경계 흔들림 방지
    this.cameras.main.roundPixels = true;
    
     // 스크롤 속도 및 상태 초기화
    this.scrollSpeed = 202;
    this.backgroundHeight = 800 * 30; // 전체 배경 길이
    this.stopScroll = false;
    this.stopScroll = false;
    this.bossTriggered = false; // 경고/보스 음악 중복 방지
    
    this.enemyBaseGroup = this.physics.add.group();

    // 지상 적
    this.groundEnemyManager = new GroundEnemyManager(this);
    this.groundEnemyManager.createEnemies();

    this.physics.add.overlap(
      this.player.bulletManager.bullets,
      this.enemyBaseGroup,
      (bullet, base) => {
        this.groundEnemyManager.handleGroundEnemyHit(bullet, base);
      },
      null,
      this
    );

    // 구름
    this.cloudGroup = this.add.group();

    // 일정 간격으로 구름 생성
    this.time.addEvent({
      delay: 3000, // 1.5초마다 생성
      callback: this.spawnRandomCloud,
      callbackScope: this,
      loop: true
    });
    
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

  update(time, delta){

    // 구름
    this.cloudGroup.children.iterate(cloud => {
      if (!cloud) return;

      cloud.y += cloud.speed * (delta / 1000);

      // 화면 아래로 벗어나면 제거
      if (cloud.y > 850) {
        this.cloudGroup.remove(cloud, true, true); // remove + destroy
      }
    });

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
      this.groundEnemyManager.update();
    }
  }
    
}
