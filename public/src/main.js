import Phaser from 'phaser';

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
  // mainScene.js 또는 preload() 안에서
  this.load.spritesheet('jet', '/assets/player_t1.png', {
    frameWidth: 512, // 프레임 하나의 너비
    frameHeight: 512 // 프레임 하나의 높이
  });

  this.load.image("background", "/assets/background.png");
  this.load.image('bullet', '/assets/bullet.png');  // 🔫 총알 이미지 추가
}

let background;

function create() {
  const backgroundWidth = this.scale.width; // 600
  const backgroundHeight = this.scale.height; // 800

  // 배경 이미지 추가 (1배 크기로 조정)
  background = this.add.tileSprite(0, 0, 1024, 1536, "background")
  .setOrigin(0);

  // 월드와 카메라 경계 설정
  this.physics.world.setBounds(0, 0, 600, 800);
  this.cameras.main.setBounds(0, 0, 600, 800);

  // 배경 원본 크기 기준으로 스케일 계산
  const bgOriginalWidth = 1024;
  const bgOriginalHeight = 1536;
  const scaleX = backgroundWidth / bgOriginalWidth;
  const scaleY = backgroundHeight / bgOriginalHeight;

  background.setScale(scaleX, scaleY); // 화면에 맞도록 비율 조정

  this.anims.create({
    key: 'jetBoost',
    frames: this.anims.generateFrameNumbers('jet', { start: 0, end: 2 }),
    frameRate: 6,
    repeat: -1 // 무한 반복
  });

  // 플레이어 추가
  player = this.physics.add.sprite(backgroundWidth / 2, backgroundHeight - 100, 'jet');
  player.setScale(0.15);
  player.setOrigin(0.5, 0.5);  // ← 정중앙 기준으로 설정
  player.setSize(120, 160);
  player.setOffset((512 - 120) / 2, (512 - 160) / 2);
  player.setCollideWorldBounds(true);
  player.anims.play('jetBoost'); // 애니메이션 재생

  //this.cameras.main.startFollow(player);
  cursors = this.input.keyboard.createCursorKeys();

    // 총알 그룹 생성
  bullets = this.physics.add.group({
    classType: Phaser.Physics.Arcade.Image,
    maxSize: 30,
    runChildUpdate: true
  });

}

function update(time) {
  // 배경을 아래로 스크롤 (y값 증가)
  background.tilePositionY -= 2;

  if (cursors.left.isDown) {
    player.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    player.setVelocityX(200);
  } else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-200);
  } else if (cursors.down.isDown) {
    player.setVelocityY(200);
  } else {
    player.setVelocityY(0);
  }
  
  // 총알 발사 (스페이스바)
  if (cursors.space.isDown && time > lastFired + 300) {
    fireBullet.call(this);
    lastFired = time;
  }
}

function fireBullet() {
  const bullet = bullets.get();

  if (bullet) {
    bullet
      .enableBody(true, player.x, player.y - 20, true, true)
      .setVelocityY(-400)
      .setDisplaySize(13, 20)
      .setCollideWorldBounds(true)
      .on('worldbounds', () => bullet.disableBody(true, true)); // 화면 밖으로 나가면 제거

    bullet.body.onWorldBounds = true;
  }
}