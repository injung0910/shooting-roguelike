let player;
let cursors;
let bullets;       // 전역에 선언
let lastFired = 0; // 연속 발사를 위한 시간 체크

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 800,
  backgroundColor: '#1d1d1d',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false, // 디버그 모드 활성화
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

function preload() {
  //this.load.image('tile1', '/assets/backgrounds/normal-city-1.png');
  //this.load.image('tile2', '/assets/backgrounds/normal-city-2.png');
  //this.load.image('tile3', '/assets/backgrounds/normal-city-3.png');
  //this.load.image('tile4', '/assets/backgrounds/normal-city-4.png');
  //this.load.image('tile5', '/assets/backgrounds/normal-forest-1.png');
  //this.load.image('tile6', '/assets/backgrounds/normal-forest-2.png');
  //this.load.image('cross', '/assets/backgrounds/normal-road.png');

  //this.load.image('cloud-1', '/assets/backgrounds/cloud-1.png');
  //this.load.image('cloud-2', '/assets/backgrounds/cloud-2.png');
  //this.load.image('cloud-3', '/assets/backgrounds/cloud-3.png');

  // 배경 이미지 로드
  this.load.image('background', '/assets/backgrounds/purple_background.png');

  this.load.image('tile1', '/assets/backgrounds/sample_01.png');
  this.load.image('tile2', '/assets/backgrounds/sample_02.png');
  this.load.image('tile3', '/assets/backgrounds/sample_03.png');
  this.load.image('tile4', '/assets/backgrounds/sample_04.png');

  this.load.image('stars1', '/assets/backgrounds/stars_1.png');
  this.load.image('stars2', '/assets/backgrounds/stars_2.png');

  this.load.image('planet_green', '/assets/backgrounds/planet_green.png');
  this.load.image('planet_grey', '/assets/backgrounds/planet_grey.png');
  this.load.image('planet_orange', '/assets/backgrounds/planet_orange.png');

  // 플레이어 스프라이트 시트 로드
  this.load.spritesheet('player', '/assets/player/Plane 01/Normal/planes_01A.png', {
    frameWidth: 96,
    frameHeight: 96
  });

  // 총알 이미지 로드
  this.load.spritesheet('bullets', '/assets/bullets/Projectiles/projectile-01.png', {
    frameWidth: 12,  // 한 프레임 너비 (이미지 반쪽)
    frameHeight: 20 // 전체 이미지 높이
  });

  // 적 스프라이트 시트 로드
  this.load.spritesheet('enemy1', '/assets/enemies/01 Bug (Animation)/Bug 1/bug_1.png', {
    frameWidth: 64,
    frameHeight: 64
  });

  this.load.spritesheet('enemy2', '/assets/enemies/01 Bug (Animation)/Bug 2/bug_2.png', {
    frameWidth: 64,
    frameHeight: 64
  });

  this.load.spritesheet('enemy3', '/assets/enemies/01 Bug (Animation)/Bug 3/bug_3.png', {
    frameWidth: 64,
    frameHeight: 64
  });

  this.load.spritesheet('enemy4', '/assets/enemies/01 Bug (Animation)/Bug 4/bug_4.png', {
    frameWidth: 64,
    frameHeight: 64
  });

  this.load.spritesheet('enemy5', '/assets/enemies/01 Bug (Animation)/Bug 5/bug_5.png', {
    frameWidth: 64,
    frameHeight: 64
  });

  this.load.spritesheet('enemy6', '/assets/enemies/01 Bug (Animation)/Bug 6/bug_6.png', {
    frameWidth: 64,
    frameHeight: 64
  });

  // 이펙트 스프라이트 시트 로드
  this.load.spritesheet('explosion1', '/assets/effects/Explosion/Small/explosion.png', {
    frameWidth: 100,
    frameHeight: 100
  });

  // 총알 이미지 로드
  this.load.spritesheet('enemyBullet', '/assets/bullets/Projectiles/projectile-04.png', {
    frameWidth: 12,  // 한 프레임 너비 (이미지 반쪽)
    frameHeight: 12 // 전체 이미지 높이
  });

  // 파워업 아이콘 로드
  this.load.spritesheet('powerup', '/assets/Icons/Power-Ups/icon-a-power.png', {
    frameWidth: 32,
    frameHeight: 32
  });

}

let tiles = [];
let tileIndex = 0;
const tileHeight = 800;
const scrollSpeed = 7;
let totalTilesCreated = 0;
const maxTiles = 12;

const tileOrder = [
  'tile1', 'tile1', 'tile1',
  'tile2', 'tile2', 'tile2',
  'tile3', 'tile3', 'tile3',
  'tile4', 'tile4', 'tile4',
];

let planetGroup;
let planetTimer = 0;
let planetInterval = 1000; // 1초마다 행성 생성
const planetKeys = ['planet_green', 'planet_grey', 'planet_orange'];

function create() {
  const { width, height } = this.sys.game.config;

  // 1. 배경
  this.add.image(0, 0, 'background')
    .setOrigin(0)
    .setDisplaySize(width, height);

      // 배경 위에 별 레이어
  this.add.image(0, 0, 'stars1')
    .setOrigin(0)
    .setDisplaySize(width, height); // 같은 크기로 맞춰줌

  
  // 최초 타일 생성 (tileOrder 순서대로)
  let currentY = -tileHeight * (maxTiles - 1); // 가장 위에서 시작

  // 타일 생성
  for (let i = 0; i < tileOrder.length; i++) {
    const key = tileOrder[i];
    const tile = this.add.image(0, -tileHeight * i, key)
      .setOrigin(0)
      .setDisplaySize(width, tileHeight);
    tiles.push(tile);
    currentY += tileHeight;
    totalTilesCreated++;
  }

    // 행성 그룹 생성
  planetGroup = this.add.group();

  // 플레이어
  this.anims.create({
    key: 'fly',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3}),
    frameRate: 10,
    repeat: -1
  });  

  // 왼쪽 기울기
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', { start: 4, end: 11 }),
    frameRate: 10,
    repeat: -1
  });

  // 오른쪽 기울기
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', { start: 12, end: 19 }),
    frameRate: 10,
    repeat: -1
  });

  player = this.physics.add.sprite(config.width / 2, config.height - 100, 'player');
  player.setScale(1); // 필요 시 크기 조정
  player.setCollideWorldBounds(true);
  player.play('fly');

  // 피격 판정 hitbox 축소 (폭, 높이, 오프셋X, 오프셋Y)
  player.body.setSize(20, 30);
  player.body.setOffset(39, 40);

  //총알
  this.physics.world.on('worldbounds', function (body) {
    const sprite = body.gameObject;
    if (sprite.texture.key === 'bullets') {
      sprite.destroy(); // 화면 밖으로 나간 총알 제거
    }
  });

  // 총알
  this.bullets = this.physics.add.group({
    classType: Phaser.Physics.Arcade.Sprite, // Sprite로 바꿔야 함
    maxSize: 100
  });

  // 모바일 터치로 플레이어 이동
  // 터치 입력 감지
  this.input.on('pointermove', (pointer) => {
    if (pointer.isDown) {
      player.x = pointer.x;
      player.y = pointer.y;
      isTouching = true;
    }
  });

  this.input.on('pointerup', () => {
    isTouching = false;
  });

  lastFired = 0;

  cursors = this.input.keyboard.createCursorKeys();

  // 적 애니메이션 생성
  this.anims.create({
    key: 'enemy1',
    frames: this.anims.generateFrameNumbers('enemy1', { start: 0, end: 5 }),
    frameRate: 8,
    repeat: -1
  });

  // 왼쪽 적 그룹 생성
  this.leftEnemies = this.physics.add.group();

  // 적 그룹 생성
  this.enemies = this.physics.add.group();

  // 왼쪽 적 먼저 생성
  spawnLeftEnemies(this);

  // 5초 뒤 오른쪽 적 생성
  this.time.delayedCall(5000, () => {
    spawnRightEnemies(this);
  });

  // 총알과 적이 충돌하면 둘 다 제거
  this.physics.add.overlap(this.bullets, this.enemies, handleBulletHitsEnemy, null, this);

  this.anims.create({
    key: 'explosion1',
    frames: this.anims.generateFrameNumbers('explosion1', { start: 0, end: 11 }),
    frameRate: 11,
    hideOnComplete: true
  });


  this.enemyBullets = this.physics.add.group({
    classType: Phaser.Physics.Arcade.Image,
    runChildUpdate: true,
    maxSize: 100
  });

  // 플레이어와 적 충돌 처리
  this.physics.add.overlap(this.enemyBullets, player, handlePlayerHitByEnemyBullet, null, this);

  this.time.addEvent({
    delay: 2000, // 2초마다
    callback: () => {
      this.enemies.children.iterate((enemy) => {
        if (enemy.active) {
          fireEnemyBullet.call(this, enemy.x, enemy.y);
        }
      });
    },
    callbackScope: this,
    loop: true
  });

  // 플레이어와 적 충돌 처리
  this.physics.add.overlap(player, this.enemies, handlePlayerHitsEnemy, null, this);

  // 파워업 그룹 생성
  // 파워업은 플레이어가 먹을 수 있는 아이템
  this.powerups = this.physics.add.group();

  this.anims.create({
    key: 'powerup_anim',
    frames: this.anims.generateFrameNumbers('powerup', { start: 0, end: 4 }),
    frameRate: 8,
    repeat: -1
  });

}

let isTouching = false;

/// 게임 업데이트 루프
/// 매 프레임마다 호출됨
function update(time, delta) {
  // player가 없거나 죽었으면 업데이트 스킵
  if (!player || !player.active) {
    return;
  }

  const { width, height } = this.sys.game.config;

  for (let tile of tiles) {
    tile.y += scrollSpeed;
  }

  // 행성 생성 타이머
  planetTimer += delta;
  if (planetTimer >= planetInterval) {
    planetTimer = 0;

    // 랜덤 행성 생성
    const key = Phaser.Utils.Array.GetRandom(planetKeys);
    const x = Phaser.Math.Between(50, width - 50);
    const y = -50  ;
    const planet = game.scene.scenes[0].add.image(x, y, key)
      .setScale(0.3)
      .setAlpha(0.7);

    planetGroup.add(planet);
  }

  // 행성 이동 및 제거
  planetGroup.getChildren().forEach((planet) => {
    planet.y += scrollSpeed;
    if (planet.y > height + 50) {
      planet.destroy();
    }
  });

  if (cursors.left.isDown) {
    player.setVelocityX(-300);
    if (player.anims.currentAnim?.key !== 'left') {
      player.play('left');
    }
  } else if (cursors.right.isDown) {
    player.setVelocityX(300);
    if (player.anims.currentAnim?.key !== 'right') {
      player.play('right');
    }
  } else {
    player.setVelocityX(0);
    if (player.anims.currentAnim?.key !== 'fly') {
      player.play('fly');
    }
  }

  // 위아래 이동
  if (cursors.up.isDown) {
    player.setVelocityY(-300);
  } else if (cursors.down.isDown) {
    player.setVelocityY(300);
  } else {
    player.setVelocityY(0);
  }

  if (this.input.keyboard.checkDown(cursors.space, 200)) {
    fireBullet.call(this);
  }

    // 터치 중이면 자동 발사
  if (isTouching && time > lastFired + 200) {
    fireBullet.call(this);  // this 유지 위해 call
    lastFired = time;
  }

}

// 총알 발사 함수
// this: 현재 씬, player: 플레이어 객체
function fireBullet() {
  const bullet = this.bullets.get(player.x, player.y - 20, 'bullets', 1);
  if (bullet) {
    bullet.setActive(true);
    bullet.setVisible(true);
    bullet.setVelocityY(-500);
    bullet.setScale(1.5);
    bullet.setCollideWorldBounds(true);  // 화면 경계 감지 활성화
    bullet.body.onWorldBounds = true;    // worldbounds 이벤트 사용
  }

  // 적 제거
  this.enemies.children.iterate(enemy => {
    if (enemy && enemy.y > 900) {
      enemy.destroy();
    }
  });
}

// 적 생성 함수
// 왼쪽에서 적 생성
function spawnLeftEnemies(scene) {
  const leftPositions = [100, 150, 200];
  leftPositions.forEach(x => {
    const enemy = scene.enemies.create(x, -64, 'enemy1');
    enemy.play('enemy1');
    enemy.setVelocityY(50);

    // 왼쪽 그룹에도 추가
    //scene.leftEnemies.add(enemy);
  });
}

// 오른쪽에서 적 생성
function spawnRightEnemies(scene) {
  const rightPositions = [400, 450, 500];
  rightPositions.forEach(x => {
    const enemy = scene.enemies.create(x, -64, 'enemy1');
    enemy.play('enemy1');
    enemy.setVelocityY(50);
  });
}

// 총알이 적을 맞췄을 때 처리
// bullet: 총알, enemy: 적
function handleBulletHitsEnemy(bullet, enemy) {
  bullet.destroy();
  enemy.disableBody(true, true);

  const powerup = this.powerups.create(enemy.x, enemy.y, 'powerup');
  powerup.play('powerup_anim');
  powerup.setVelocityY(100);

  const explosion = enemy.scene.add.sprite(enemy.x, enemy.y, 'explosion1');
  explosion.setScale(0.5);
  explosion.play('explosion1');
  explosion.on('animationcomplete', () => explosion.destroy());

  const scene = enemy.scene;

  // 왼쪽 적 그룹 마지막 적이면 파워업 확정 드롭
  if (
    scene.leftGroup?.contains(enemy) &&
    scene.leftGroup.countActive(true) === 1
  ) {
    const powerup = scene.powerup.create(enemy.x, enemy.y, 'powerup');
    powerup.setVelocityY(100);
  }

  // 💡 왼쪽 그룹 전멸 체크
  if (
    scene.leftGroup &&
    scene.leftGroup.countActive(true) === 0 &&
    !leftEnemiesCleared
  ) {
    leftEnemiesCleared = true;

    // 다음 그룹 등장
    scene.time.delayedCall(2000, () => {
      spawnRightEnemies(scene);
      rightEnemiesSpawned = true;
    });
  }
}

// 적이 플레이어에게 총알을 발사하는 함수
// x, y: 적의 위치
function fireEnemyBullet(x, y) {
  const bullet = this.enemyBullets.get(x, y + 10, 'enemyBullet', 1);
  if (bullet) {
    bullet.setActive(true);
    bullet.setVisible(true);
    bullet.enableBody(true, x, y + 10, true, true); // 위치와 상태 초기화
    bullet.setVelocityY(200); // 아래로
    bullet.setScale(1);
    bullet.setCollideWorldBounds(true);

    // 화면 벗어나면 제거
    bullet.body.onWorldBounds = true;
    bullet.body.world.on('worldbounds', function(body) {
      if (body.gameObject === bullet) {
        bullet.destroy();
      }
    });
  }
}

// 플레이어가 적의 총알에 맞았을 때 처리
// bullet: 적의 총알, player: 플레이어
function handlePlayerHitByEnemyBullet(bullet, player) {
  bullet.destroy();      // 적 미사일 제거
  player.disableBody(true, true); // 플레이어 제거

  const explosion = player.scene.add.sprite(player.x, player.y, 'explosion1');
  explosion.setScale(0.5);
  explosion.play('explosion1');
  explosion.on('animationcomplete', () => {
    explosion.destroy();
  });

  // TODO: 게임 오버 처리 등 추가
}

// 플레이어가 적과 충돌했을 때 처리
function handlePlayerHitsEnemy(player, enemy) {
  // 플레이어 죽이기 (숨기거나 제거)
  player.disableBody(true, true);

  // 폭발 이펙트
  const explosion = player.scene.add.sprite(player.x, player.y, 'explosion1');
  explosion.setScale(0.5);
  explosion.play('explosion1');

  explosion.on('animationcomplete', () => {
    explosion.destroy();
  });

  // 적도 함께 제거하려면 아래도 활성화
  enemy.disableBody(true, true);
}