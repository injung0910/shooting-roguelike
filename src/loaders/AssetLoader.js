// public/src/loaders/AssetLoader.js


export function loadAllAssets(scene) {
  loadBackgrounds(scene);
  loadPlayer(scene);
  loadEnemies(scene);
  loadBullets(scene);
  loadEffects(scene);
  loadIcons(scene);
  loadUI(scene);
  loadSupportUnits(scene);
  loadBosses(scene)
}


// ✅ 1. 배경 이미지들
function loadBackgrounds(scene) {
  // 배경 이미지 목록 (키: 파일명 동일하게 사용)
  const backgroundImages = [
    'asteroid_01.png',
    'asteroid_02.png',
    'asteroid_03.png',
    'asteroid_04.png',
    'block_01_L.png',
    'block_01_R.png',
    'block_02_L.png',
    'block_02_R.png',
    'block_03_L.png',
    'block_03_R.png',
    'block_bottom_L.png',
    'block_bottom_R.png',
    'block_top_L.png',
    'block_top_R.png',
    'city-sample-1.png',
    'city-sample-2.png',
    'cloud-1.png',
    'cloud-2.png',
    'cloud-3.png',
    'dark-city-1.png',
    'dark-city-2.png',
    'dark-city-3.png',
    'dark-city-4.png',
    'dark-forest-1.png',
    'dark-forest-2.png',
    'dark-road.png',
    'dark-spritesheet.png',
    'enemy.png',
    'ground_01_L.png',
    'ground_01_R.png',
    'ground_02_L.png',
    'ground_02_R.png',
    'nebula_a_blue.png',
    'nebula_a_purple.png',
    'nebula_a_red.png',
    'nebula_b_blue.png',
    'nebula_b_purple.png',
    'nebula_b_red.png',
    'nebula_c_blue.png',
    'nebula_c_purple.png',
    'nebula_c_red.png',
    'nebula_collection.png',
    'normal-city-1.png',
    'normal-city-2.png',
    'normal-city-3.png',
    'normal-city-4.png',
    'normal-forest-1.png',
    'normal-forest-2.png',
    'normal-road.png',
    'normal-spritesheet.png',
    'not_tiled_space_BG.png',
    'pipes_sheet.png',
    'planet_green.png',
    'planet_grey.png',
    'planet_orange.png',
    'purple_background.png',
    'sample_01.png',
    'sample_02.png',
    'sample_03.png',
    'sample_04.png',
    'stars_1.png',
    'stars_2.png',
  ];

  backgroundImages.forEach(filename => {
    const key = filename.replace('.png', '');
    scene.load.image(key, `/assets/backgrounds/${filename}`);
  });


}

// 2. 플레이어
function loadPlayer(scene) {
    // 플레이어 생성
    // 플레이어1 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player1', '/assets/player/Plane 01/Normal/planes_01A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어1 스프라이트 시트 로드 8프레임 (스핀)
    scene.load.spritesheet('player1_spin', '/assets/player/Plane 01/Normal/planes_01A_Spin.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어1 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player1_powerup', '/assets/player/Plane 01/Powered Up/planes_01B.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어1 파워업 스프라이트 시트 로드 8프레임 (스핀)
    scene.load.spritesheet('player1_powerup_spin', '/assets/player/Plane 01/Powered Up/planes_01B_Spin.png', { frameWidth: 96, frameHeight: 96 });
    
    // 플레이어2 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player2', '/assets/player/Plane 02/planes_02A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어2 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player2_powerup', '/assets/player/Plane 02/planes_02B.png', { frameWidth: 96, frameHeight: 96 });

    // 플레이어3 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player3', '/assets/player/Plane 03/planes_03A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어3 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player3_powerup', '/assets/player/Plane 03/planes_03B.png', { frameWidth: 96, frameHeight: 96 });

    // 플레이어4 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player4', '/assets/player/Plane 04/planes_04A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어4 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player4_powerup', '/assets/player/Plane 04/planes_04B.png', { frameWidth: 96, frameHeight: 96 });
    
    // 플레이어5 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player5', '/assets/player/Plane 05/planes_05A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어2 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player5_powerup', '/assets/player/Plane 05/planes_05B.png', { frameWidth: 96, frameHeight: 96 });

    // 플레이어6 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player6', '/assets/player/Plane 06/planes_06A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어6 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player6_powerup', '/assets/player/Plane 06/planes_06B.png', { frameWidth: 96, frameHeight: 96 });

    // 플레이어7 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player7', '/assets/player/Plane 07/planes_07A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어7 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player7_powerup', '/assets/player/Plane 07/planes_07B.png', { frameWidth: 96, frameHeight: 96 });

    // 플레이어8 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player8', '/assets/player/Plane 08/planes_08A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어8 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player8_powerup', '/assets/player/Plane 08/planes_08B.png', { frameWidth: 96, frameHeight: 96 });

    // 플레이어9 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player9', '/assets/player/Plane 09/Normal/planes_09A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어9 스프라이트 시트 로드 8프레임 (스핀)
    scene.load.spritesheet('player9_spin', '/assets/player/Plane 09/Normal/planes_09A_Spin.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어9 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('player9_powerup', '/assets/player/Plane 09/Powered Up/planes_09B.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어9 파워업 스프라이트 시트 로드 8프레임 (스핀)    
    scene.load.spritesheet('player9_powerup_spin', '/assets/player/Plane 09/Powered Up/planes_09B_Spin.png', { frameWidth: 96, frameHeight: 96 });
}

// 3. 적
function loadEnemies(scene) {
  // Enemy 01 Bug 1~6까지 등록 6프레임
  for (let i = 1; i <= 6; i++) {
    scene.load.spritesheet(`bug${i}`, `/assets/enemies/01 Bug (Animation)/Bug ${i}/bug_${i}.png`, {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  // Enemy 02 Heavy 1~6까지 등록
  for (let i = 1; i <= 6; i++) {
    scene.load.image(`heavy${i}`, `/assets/enemies/02 Heavy/heavy_${i}.png`);
  }
  
  // Enemy 03 Danger 1~6까지 등록
  for (let i = 1; i <= 6; i++) {
    scene.load.image(`danger${i}`, `/assets/enemies/03 Danger/danger_${i}.png`);
  }

  // Enemy 04 Cannon 1~6까지 등록
  for (let i = 1; i <= 6; i++) {
    scene.load.image(`cannon${i}`, `/assets/enemies/04 Cannon/cannon_${i}.png`);
  }

  // Enemy 06 Wings 1~6까지 등록
  for (let i = 1; i <= 6; i++) {
    scene.load.image(`wings${i}`, `/assets/enemies/06 Wings/wings_${i}.png`);
  }

  // Enemy 07 Emperor 1~6까지 등록
  for (let i = 1; i <= 6; i++) {
    const index = i.toString().padStart(2, '0'); // 01, 02, ..., 06
    scene.load.image(`emperor${i}`, `/assets/enemies/07 Emperor/emperor_${index}.png`);
  }
  
  // minibeam 3프레임
  scene.load.spritesheet('minibeam', '/assets/enemies/05 Mini/Beam/minibeam_sheet.png', {frameWidth: 64,frameHeight: 64,});

  // mini_1
  scene.load.image('mini_1', '/assets/enemies/05 Mini/Fire/mini_1.png');
  // rotating_flame_sheet 6프레임
  scene.load.spritesheet('rotating_flame_sheet', '/assets/enemies/05 Mini/Fire/rotating_flame_sheet.png', {frameWidth: 24,frameHeight: 24,});

  // mini_2
  scene.load.image('mini_2', '/assets/enemies/05 Mini/Bomb Mine/mini_2.png');
  // lightningShield 3프레임
  scene.load.spritesheet('lightningShield', '/assets/enemies/05 Mini/Bomb Mine/lightning_shield.png', {frameWidth: 64,frameHeight: 64,});

  // mini_4
  scene.load.image('mini_4', '/assets/enemies/05 Mini/Projectile/mini_4.png');
  scene.load.image('mini_4_p1', '/assets/enemies/05 Mini/Projectile/projectile_1.png');
  scene.load.image('mini_4_p2', '/assets/enemies/05 Mini/Projectile/projectile_2.png');

  // mini_5
  scene.load.image('mini_5', '/assets/enemies/05 Mini/Bomb Mine/mini_5.png');
  scene.load.image('mini_5_e1', '/assets/enemies/05 Mini/Bomb Mine/explosion_1.png');
  scene.load.image('mini_5_e2', '/assets/enemies/05 Mini/Bomb Mine/explosion_2.png');

  // mini_6
  scene.load.image('mini_6', '/assets/enemies/05 Mini/Ice/mini_6.png');
  scene.load.image('mini_6_p1', '/assets/enemies/05 Mini/Ice/projectile_ice.png');

  // tankbase 1~6까지 등록
  for (let i = 1; i <= 6; i++) {
    const index = i.toString().padStart(2, '0'); // 01, 02, ..., 06
    scene.load.image(`tankbase_${i}`, `/assets/enemies/08 tank/tankbase_${index}.png`);
  }

  // tankcannon_1a
  scene.load.image('tankcannon_1a', '/assets/enemies/08 tank/tankcannon-01A.png');
  // tankcannon_1b
  scene.load.image('tankcannon_1b', '/assets/enemies/08 tank/tankcannon-01B.png');
  // tankcannon_2a
  scene.load.image('tankcannon_2a', '/assets/enemies/08 tank/tankcannon-02A.png');
  // tankcannon_2b
  scene.load.image('tankcannon_2b', '/assets/enemies/08 tank/tankcannon-02B.png');
  // tankcannon_3a
  scene.load.image('tankcannon_3a', '/assets/enemies/08 tank/tankcannon-03A.png');
  // tankcannon_3b
  scene.load.image('tankcannon_3b', '/assets/enemies/08 tank/tankcannon-03B.png');


  // enemy1 3프레임
  scene.load.spritesheet('enemy1', '/assets/enemies/09 enemy/spritesheet_enemy_1.png', {frameWidth: 48,frameHeight: 48,});
  // enemy2 3프레임
  scene.load.spritesheet('enemy2', '/assets/enemies/09 enemy/spritesheet_enemy_2.png', {frameWidth: 48,frameHeight: 48,});
  // large_enemy
  scene.load.image('enemy3', '/assets/enemies/09 enemy/large_enemy.png');
}

// 4. 총알
function loadBullets(scene) {

  // 미사일1 스프라이트 시트 로드 3프레임
  scene.load.spritesheet('missile01', '/assets/bullets/Projectiles/missile-01.png', {frameWidth: 14,frameHeight: 33,});

  // 미사일2 스프라이트 시트 로드 3프레임
  scene.load.spritesheet('missile02', '/assets/bullets/Projectiles/missile-02.png', {frameWidth: 14,frameHeight: 32,});

  // 미사일3 스프라이트 시트 로드 3프레임
  scene.load.spritesheet('missile03', '/assets/bullets/Projectiles/missile-03.png', {frameWidth: 12,frameHeight: 34,});

  // 미사일4 스프라이트 시트 로드 3프레임
  scene.load.spritesheet('missile04', '/assets/bullets/Projectiles/missile-04.png', {frameWidth: 10,frameHeight: 32,});

  // 미사일5 스프라이트 시트 로드 3프레임
  scene.load.spritesheet('missile05', '/assets/bullets/Projectiles/missile-05.png', {frameWidth: 12,frameHeight: 35,});

  // 불릿1 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('bullets1', '/assets/bullets/Projectiles/projectile-01.png', {frameWidth: 12,frameHeight: 20,});

  // 불릿2 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('bullets2', '/assets/bullets/Projectiles/projectile-02.png', {frameWidth: 12,frameHeight: 11,});

  // 불릿3 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('bullets3', '/assets/bullets/Projectiles/projectile-03.png', {frameWidth: 32,frameHeight: 11,});

  // 불릿4 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('bullets4', '/assets/bullets/Projectiles/projectile-04.png', {frameWidth: 12,frameHeight: 12,});
  
  // 불릿5 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('bullets5', '/assets/bullets/Projectiles/projectile-05.png', {frameWidth: 6,frameHeight: 25,});

  // 불릿6-1 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('projectile06_01', '/assets/bullets/Projectiles/projectile-06-01.png', {frameWidth: 12,frameHeight: 26,});

  // 불릿6-2 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('projectile06_02', '/assets/bullets/Projectiles/projectile-06-02.png', {frameWidth: 12,frameHeight: 26,});

}

// 5. 이펙트 (폭발 등)
function loadEffects(scene) {
  // 폭발 small 스프라이트 시트 로드 12프레임
  scene.load.spritesheet('explosion_small', '/assets/effects/Explosion/Small/explosion.png', {frameWidth: 100,frameHeight: 100,});

  // 폭발 large 스프라이트 시트 로드 12프레임
  scene.load.spritesheet('explosion_large', '/assets/effects/Explosion/Large/explosion_large.png', {frameWidth: 250,frameHeight: 250,});

  // 폭발 white 스프라이트 시트 로드 12프레임
  scene.load.spritesheet('white_blast', '/assets/effects/Explosion/White Blast/white_blast.png', {frameWidth: 250,frameHeight: 250,});

  // 쉴드 스프라이트 시트 로드 6프레임
  scene.load.spritesheet('shield', '/assets/effects/Shield/shield.png', {frameWidth: 96,frameHeight: 96,});

  // large-thrusters 스프라이트 시트 로드 3프레임
  scene.load.spritesheet('large-thrusters', '/assets/effects/Thrusters/large-thrusters1-sheet.png', {frameWidth: 48,frameHeight: 32,});

}

// 6. 아이콘
function loadIcons(scene) {
  // 파워 아이콘 스프라이트 시트 로드 5프레임
  scene.load.spritesheet('powerup_item', '/assets/Icons/Power-Ups/icon-a-power.png', {frameWidth: 32,frameHeight: 32,});

  // 헬스 아이콘 스프라이트 시트 로드 5프레임
  scene.load.spritesheet('health_item', '/assets/Icons/Power-Ups/icon-a-health.png', {frameWidth: 32,frameHeight: 32,});

  // 쉴드 아이콘 스프라이트 시트 로드 5프레임
  scene.load.spritesheet('shield_item', '/assets/Icons/Power-Ups/icon-a-shield.png', {frameWidth: 32,frameHeight: 32,});

  // 스페셜 아이콘 스프라이트 시트 로드 5프레임
  scene.load.spritesheet('special_item', '/assets/Icons/Power-Ups/icon-a-special.png', {frameWidth: 32,frameHeight: 32,});

  // 스피드 아이콘 스프라이트 시트 로드 5프레임
  scene.load.spritesheet('speed_item', '/assets/Icons/Power-Ups/icon-a-speed.png', {frameWidth: 32,frameHeight: 32,});

  // 폭탄 아이콘 
  scene.load.image('icon-bomb_item', '/assets/Icons/icon-bomb.png');

  // plane1 부터 plane9까지 아이콘 로드
  for (let i = 1; i <= 9; i++) {
    const index = i.toString().padStart(2, '0'); // 01, 02, ..., 09
    scene.load.image(`icon-plane-${index}`, `/assets/Icons/icon-plane-${index}.png`);
  }

  // plane 아이콘 로드
  scene.load.image('icon-plane', '/assets/Icons/icon-plane.png');

}

// 7. UI 관련 이미지 (있다면)
function loadUI(scene) {
  scene.load.image('health_bar', '/assets/ui/health_bar.png');
  scene.load.image('health', '/assets/ui/health.png');

  scene.load.image('icon-health', '/assets/ui/icon-health.png');
  scene.load.image('icon-powerup', '/assets/ui/powerup.png');
}

// 8. support unit
function loadSupportUnits(scene) {
  
  // support_blue 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('support_blue', '/assets/support Units/support_units-blue.png', {frameWidth: 48,frameHeight: 48,});

  // support_green 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('support_green', '/assets/support Units/support_units-green.png', {frameWidth: 48,frameHeight: 48,});

  // support_grey 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('support_grey', '/assets/support Units/support_units-grey.png', {frameWidth: 48,frameHeight: 48,});

  // support_purple 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('support_purple', '/assets/support Units/support_units-purple.png', {frameWidth: 48,frameHeight: 48,});

  // support_red 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('support_red', '/assets/support Units/support_units-red.png', {frameWidth: 48,frameHeight: 48,});
}

// 9. bosses
function loadBosses(scene) {

  // boss01 스프라이트 시트 로드 8프레임
  scene.load.spritesheet('boss01', '/assets/enemies/Boss Enemies/Boss 01/boss-01-spritesheet.png', {frameWidth: 120,frameHeight: 480,});
  // boss01_bot 
  scene.load.image('boss01_bot', '/assets/enemies/Boss Enemies/Boss 01/boss-01-support-bot.png');

  // boss02
  scene.load.image('boss02', '/assets/enemies/Boss Enemies/Boss 02/boss-02.png');
  // boss02_boosters 스프라이트 시트 로드 4프레임
  scene.load.spritesheet('boss02_boosters', '/assets/enemies/Boss Enemies/Boss 02/boosters-animation.png', {frameWidth: 17,frameHeight: 24,});
  // boss02_cannon_double 스프라이트 시트 로드 3프레임
  scene.load.spritesheet('boss02_cannon_double', '/assets/enemies/Boss Enemies/Boss 02/cannon_double.png', {frameWidth: 42,frameHeight: 42,});
  // boss02_cannon_single 스프라이트 시트 로드 3프레임
  scene.load.spritesheet('boss02_cannon_single', '/assets/enemies/Boss Enemies/Boss 02/cannon_single.png', {frameWidth: 32,frameHeight: 32,});
}