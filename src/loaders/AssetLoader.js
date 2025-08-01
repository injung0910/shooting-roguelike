// public/src/loaders/AssetLoader.js

// 이미지, 스프라이트 시트는 여기서
export function loadAllAssets(scene) {
  loadBackgrounds(scene);
  loadStage1(scene);
  loadPlayer(scene);
  loadEnemies(scene);
  loadBullets(scene);
  loadEffects(scene);
  loadIcons(scene);
  loadUI(scene);
  loadSupportUnits(scene);
  loadBosses(scene);
  loadAllBGM(scene);
  loadAllSFX(scene);
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

  scene.load.atlas('tile1', '/assets/backgrounds/normal-spritesheet.png', '/assets/backgrounds/normal-spritesheet.json');
  scene.load.atlas('tile2', '/assets/backgrounds/dark-spritesheet.png', '/assets/backgrounds/dark-spritesheet.json');
}

// stage1
function loadStage1(scene) {
  for (let i = 1; i <= 30; i++) {
    const key = `stage1_${String(i).padStart(2, '0')}`;
    scene.load.image(key, `/assets/backgrounds/stage1/${key}.png`);
  }  

  for (let i = 0; i <= 5; i++) {
    const key = `stage1_boss${String(i).padStart(2, '0')}`;
    scene.load.image(key, `/assets/backgrounds/stage1/${key}.png`);
  }  
}

// 2. 플레이어
function loadPlayer(scene) {
    // 플레이어 생성
    // 플레이어1 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane1', '/assets/player/Plane 01/Normal/planes_01A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어1 스프라이트 시트 로드 8프레임 (스핀)
    scene.load.spritesheet('plane1_spin', '/assets/player/Plane 01/Normal/planes_01A_Spin.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어1 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane1_powerup', '/assets/player/Plane 01/Powered Up/planes_01B.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어1 파워업 스프라이트 시트 로드 8프레임 (스핀)
    scene.load.spritesheet('plane1_powerup_spin', '/assets/player/Plane 01/Powered Up/planes_01B_Spin.png', { frameWidth: 96, frameHeight: 96 });
    
    // 플레이어2 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane2', '/assets/player/Plane 02/planes_02A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어2 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane2_powerup', '/assets/player/Plane 02/planes_02B.png', { frameWidth: 96, frameHeight: 96 });

    // 플레이어3 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane3', '/assets/player/Plane 03/planes_03A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어3 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane3_powerup', '/assets/player/Plane 03/planes_03B.png', { frameWidth: 96, frameHeight: 96 });

    // 플레이어4 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane4', '/assets/player/Plane 04/planes_04A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어4 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane4_powerup', '/assets/player/Plane 04/planes_04B.png', { frameWidth: 96, frameHeight: 96 });
    
    // 플레이어5 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane5', '/assets/player/Plane 05/planes_05A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어2 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane5_powerup', '/assets/player/Plane 05/planes_05B.png', { frameWidth: 96, frameHeight: 96 });

    // 플레이어6 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane6', '/assets/player/Plane 06/planes_06A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어6 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane6_powerup', '/assets/player/Plane 06/planes_06B.png', { frameWidth: 96, frameHeight: 96 });

    // 플레이어7 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane7', '/assets/player/Plane 07/planes_07A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어7 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane7_powerup', '/assets/player/Plane 07/planes_07B.png', { frameWidth: 96, frameHeight: 96 });

    // 플레이어8 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane8', '/assets/player/Plane 08/planes_08A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어8 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane8_powerup', '/assets/player/Plane 08/planes_08B.png', { frameWidth: 96, frameHeight: 96 });

    // 플레이어9 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane9', '/assets/player/Plane 09/Normal/planes_09A.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어9 스프라이트 시트 로드 8프레임 (스핀)
    scene.load.spritesheet('plane9_spin', '/assets/player/Plane 09/Normal/planes_09A_Spin.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어9 파워업 스프라이트 시트 로드 20프레임
    scene.load.spritesheet('plane9_powerup', '/assets/player/Plane 09/Powered Up/planes_09B.png', { frameWidth: 96, frameHeight: 96 });
    // 플레이어9 파워업 스프라이트 시트 로드 8프레임 (스핀)    
    scene.load.spritesheet('plane9_powerup_spin', '/assets/player/Plane 09/Powered Up/planes_09B_Spin.png', { frameWidth: 96, frameHeight: 96 });    
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
  scene.load.image('mini_2', '/assets/enemies/05 Mini/Lightning/mini_2.png');
  // lightningShield 3프레임
  scene.load.spritesheet('lightningShield', '/assets/enemies/05 Mini/Lightning/lightning_shield.png', {frameWidth: 64,frameHeight: 64,});

  // mini_4
  scene.load.image('mini_4', '/assets/enemies/05 Mini/Projectile/mini_4.png');
  scene.load.image('mini_4_p1', '/assets/enemies/05 Mini/Projectile/projectile_1.png');
  scene.load.image('mini_4_p2', '/assets/enemies/05 Mini/Projectile/projectile_2.png');

  // mini_5
  scene.load.image('mini_5', '/assets/enemies/05 Mini/Bomb Mine/mini_5.png');
  scene.load.image('mini_5_e1', '/assets/enemies/05 Mini/Bomb Mine/explosion_1.png');
  scene.load.image('mini_5_e2', '/assets/enemies/05 Mini/Bomb Mine/explosion_2.png');
  scene.load.spritesheet('mini_5_explosion', '/assets/enemies/05 Mini/Bomb Mine/mine_explosion.png', {frameWidth: 64,frameHeight: 64,});

  // mini_6
  scene.load.image('mini_6', '/assets/enemies/05 Mini/Ice/mini_6.png');
  scene.load.image('mini_6_p1', '/assets/enemies/05 Mini/Ice/projectile_ice.png');

  // tankbase 1~6까지 등록
  for (let i = 1; i <= 5; i++) {
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
  scene.load.spritesheet('bullets4_1', '/assets/bullets/Projectiles/projectile-04.png', {frameWidth: 12,frameHeight: 12,});
  scene.load.spritesheet('bullets4_2', '/assets/bullets/Projectiles/projectile-04.png', {frameWidth: 12,frameHeight: 12,});
  scene.load.spritesheet('bullets4_3', '/assets/bullets/Projectiles/projectile-04.png', {frameWidth: 12,frameHeight: 12,});
  scene.load.spritesheet('bullets4_4', '/assets/bullets/Projectiles/projectile-04.png', {frameWidth: 12,frameHeight: 12,});
  
  // 불릿5 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('bullets5', '/assets/bullets/Projectiles/projectile-05.png', {frameWidth: 6,frameHeight: 25,});

  // 불릿6-1 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('projectile06_01', '/assets/bullets/Projectiles/projectile-06-01.png', {frameWidth: 12,frameHeight: 26,});

  // 불릿6-2 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('projectile06_02', '/assets/bullets/Projectiles/projectile-06-02.png', {frameWidth: 12,frameHeight: 26,});

  scene.load.spritesheet('enemy_bullet1', '/assets/bullets/Projectiles/enemy_bullet.png', {frameWidth: 16,frameHeight: 16,});
  scene.load.spritesheet('enemy_bullet2', '/assets/bullets/Projectiles/enemy_bullet2.png', {frameWidth: 16,frameHeight: 16,});
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
  scene.load.spritesheet('large-thrusters', '/assets/effects/Large Thrusters/large-thrusters1-sheet.png', {frameWidth: 48,frameHeight: 32,});

  // charging50 121프레임
  scene.load.spritesheet('charging50', '/assets/effects/charging_50x50px.png', {frameWidth: 50,frameHeight: 50,});
  // charging100 121프레임
  scene.load.spritesheet('charging100', '/assets/effects/charging_100x100px.png', {frameWidth: 100,frameHeight: 100,});
  // charging200 121프레임
  scene.load.spritesheet('charging200', '/assets/effects/charging_200x200px.png', {frameWidth: 200,frameHeight: 200,});
  // charging400 121프레임
  scene.load.spritesheet('charging400', '/assets/effects/charging_400x400px.png', {frameWidth: 400,frameHeight: 400,});

  // fireCircle50 62프레임
  scene.load.spritesheet('fireCircle50', '/assets/effects/fire_circles_50x50px.png', {frameWidth: 50,frameHeight: 50,});
  // fireCircle100 121프레임
  scene.load.spritesheet('fireCircle100', '/assets/effects/fire_circles_100x100.png', {frameWidth: 100,frameHeight: 100,});
  // fireCircle200 121프레임
  scene.load.spritesheet('fireCircle200', '/assets/effects/fire_circles_200x200.png', {frameWidth: 200,frameHeight: 200,});
  // fireCircle400 121프레임
  scene.load.spritesheet('fireCircle400', '/assets/effects/fire_circles_400x400.png', {frameWidth: 400,frameHeight: 400,});  

  // dust50 62프레임
  scene.load.spritesheet('dust50', '/assets/effects/dust_burst_real_50x50px.png', {frameWidth: 50,frameHeight: 50,});
  // dust100 62프레임
  scene.load.spritesheet('dust100', '/assets/effects/dust_burst_real_100x100px.png', {frameWidth: 100,frameHeight: 100,});
  // dust200 62프레임
  scene.load.spritesheet('dust200', '/assets/effects/dust_burst_real_200x200px.png', {frameWidth: 200,frameHeight: 200,});
  // dust400 62프레임
  scene.load.spritesheet('dust400', '/assets/effects/dust_burst_real_400x400px.png', {frameWidth: 400,frameHeight: 400,});

  // fire50 62프레임
  scene.load.spritesheet('fire50', '/assets/effects/fire_50x50px.png', {frameWidth: 50,frameHeight: 50,});
  // fire100 62프레임
  scene.load.spritesheet('fire100', '/assets/effects/fire_100x100px.png', {frameWidth: 100,frameHeight: 100,});
  // fire200 62프레임
  scene.load.spritesheet('fire200', '/assets/effects/fire_200x200px.png', {frameWidth: 200,frameHeight: 200,});  
  // fire400 62프레임
  scene.load.spritesheet('fire400', '/assets/effects/fire_400x400px.png', {frameWidth: 400,frameHeight: 400,});
  
  // fireFloor50 62프레임
  scene.load.spritesheet('fireFloor50', '/assets/effects/fire_floor_50x50px.png', {frameWidth: 50,frameHeight: 50,});
  // fireFloor100 62프레임
  scene.load.spritesheet('fireFloor100', '/assets/effects/fire_floor_100x100px.png', {frameWidth: 100,frameHeight: 100,});
  // fireFloor200 62프레임
  scene.load.spritesheet('fireFloor200', '/assets/effects/fire_floor_200x200px.png', {frameWidth: 200,frameHeight: 200,});
  // fireFloor400 62프레임
  scene.load.spritesheet('fireFloor400', '/assets/effects/fire_floor_400x400px.png', {frameWidth: 400,frameHeight: 400,});

  // smokeFloor 62프레임
  scene.load.spritesheet('smokeFloo50', '/assets/effects/smoke_floor_50x50px.png', {frameWidth: 50,frameHeight: 50,});
  // smokeFloor 62프레임
  scene.load.spritesheet('smokeFloor100', '/assets/effects/smoke_floor_100x100px.png', {frameWidth: 100,frameHeight: 100,});
  // smokeFloor 62프레임
  scene.load.spritesheet('smokeFloor200', '/assets/effects/smoke_floor_200x200px.png', {frameWidth: 200,frameHeight: 200,});
  // smokeFloor 62프레임
  scene.load.spritesheet('smokeFloor400', '/assets/effects/smoke_floor_400x400px.png', {frameWidth: 400,frameHeight: 400,});

  // explosion50 38프레임
  scene.load.spritesheet('explosion50', '/assets/effects/explosion_50x50px.png', {frameWidth: 50,frameHeight: 50,});
  // explosion100 38프레임
  scene.load.spritesheet('explosion100', '/assets/effects/explosion_100x100px.png', {frameWidth: 100,frameHeight: 100,});
  // explosion200 38프레임
  scene.load.spritesheet('explosion200', '/assets/effects/explosion_200x200px.png', {frameWidth: 200,frameHeight: 200,});  
  // explosion400 38프레임
  scene.load.spritesheet('explosion400', '/assets/effects/explosion_400x400px.png', {frameWidth: 400,frameHeight: 400,});

  // explosionOrb50 38프레임
  scene.load.spritesheet('explosionOrb50', '/assets/effects/explosion_orb_50x50px.png', {frameWidth: 50,frameHeight: 50,});
  // explosionOrb100 38프레임
  scene.load.spritesheet('explosionOrb100', '/assets/effects/explosion_orb_100x100px.png', {frameWidth: 100,frameHeight: 100,});
  // explosionOrb200 38프레임
  scene.load.spritesheet('explosionOrb200', '/assets/effects/explosion_orb_200x200px.png', {frameWidth: 200,frameHeight: 200,});  
  // explosionOrb400 38프레임
  scene.load.spritesheet('explosionOrb400', '/assets/effects/explosion_orb_400x400px.png', {frameWidth: 400,frameHeight: 400,});  

  // hitClaws50 60프레임
  scene.load.spritesheet('hitClaws50', '/assets/effects/hit_claws_50x50px.png', {frameWidth: 50,frameHeight: 50,});
  // hitClaws100 60프레임
  scene.load.spritesheet('hitClaws100', '/assets/effects/hit_claws_100x100px.png', {frameWidth: 100,frameHeight: 100,});
  // hitClaws200 60프레임
  scene.load.spritesheet('hitClaws200', '/assets/effects/hit_claws_200x200px.png', {frameWidth: 200,frameHeight: 200,});  
  // hitClaws400 60프레임
  scene.load.spritesheet('hitClaws400', '/assets/effects/hit_claws_400x400px.png', {frameWidth: 400,frameHeight: 400,});    

  // thunder50 40프레임
  scene.load.spritesheet('thunder50', '/assets/effects/thunder_50x50px.png', {frameWidth: 50,frameHeight: 50,});
  // thunder100 40프레임
  scene.load.spritesheet('thunder100', '/assets/effects/thunder_100x100px.png', {frameWidth: 100,frameHeight: 100,});
  // thunder200 40프레임
  scene.load.spritesheet('thunder200', '/assets/effects/thunder_200x200px.png', {frameWidth: 200,frameHeight: 200,});  
  // thunder400 40프레임
  scene.load.spritesheet('thunder400', '/assets/effects/thunder_400x400px.png', {frameWidth: 400,frameHeight: 400,});

  // snow50 40프레임
  scene.load.spritesheet('snow50', '/assets/effects/top_snow_50x50px.png', {frameWidth: 50,frameHeight: 50,});
  // snow100 40프레임
  scene.load.spritesheet('snow100', '/assets/effects/top_snow_100x100px.png', {frameWidth: 100,frameHeight: 100,});
  // snow200 40프레임
  scene.load.spritesheet('snow200', '/assets/effects/top_snow_200x200px.png', {frameWidth: 200,frameHeight: 200,});  
  // snow400 40프레임
  scene.load.spritesheet('snow400', '/assets/effects/top_snow_400x400px.png', {frameWidth: 400,frameHeight: 400,});

  // boss_laser 13프레임
  scene.load.spritesheet('boss_laser', '/assets/effects/boss_laser.png', {frameWidth: 100,frameHeight: 1100,});

}

// 6. 아이콘
function loadIcons(scene) {
  // 파워 아이콘 스프라이트 시트 로드 5프레임
  scene.load.spritesheet('item-power', '/assets/Icons/Power-Ups/icon-a-power.png', {frameWidth: 32,frameHeight: 32,});

  // 폭탄 아이콘 스프라이트 시트 로드 5프레임
  scene.load.spritesheet('item-bomb', '/assets/Icons/Power-Ups/icon-a-bomb.png', {frameWidth: 32,frameHeight: 32,});

  // 헬스 아이콘 스프라이트 시트 로드 5프레임
  scene.load.spritesheet('item-health', '/assets/Icons/Power-Ups/icon-a-health.png', {frameWidth: 32,frameHeight: 32,});

  // 쉴드 아이콘 스프라이트 시트 로드 5프레임
  scene.load.spritesheet('item-shield', '/assets/Icons/Power-Ups/icon-a-shield.png', {frameWidth: 32,frameHeight: 32,});

  // 스페셜 아이콘 스프라이트 시트 로드 5프레임
  scene.load.spritesheet('item-special', '/assets/Icons/Power-Ups/icon-a-special.png', {frameWidth: 32,frameHeight: 32,});

  // 스피드 아이콘 스프라이트 시트 로드 5프레임
  scene.load.spritesheet('item-speed', '/assets/Icons/Power-Ups/icon-a-speed.png', {frameWidth: 32,frameHeight: 32,});

  // 폭탄 아이콘 
  scene.load.image('icon-bomb', '/assets/Icons/icon-bomb.png');

  // plane1 부터 plane9까지 아이콘 로드
  for (let i = 1; i <= 9; i++) {
    const index = i.toString().padStart(2, '0'); // 01, 02, ..., 09
    scene.load.image(`icon-plane${i}`, `/assets/Icons/icon-plane-${index}.png`);
  }

  // plane 아이콘 로드
  scene.load.image('icon-plane', '/assets/Icons/icon-plane.png');

}

// 7. UI 관련 이미지 (있다면)
function loadUI(scene) {
  scene.load.image('health_bar', '/assets/ui/health_bar.png');
  scene.load.image('health', '/assets/ui/health.png');

  scene.load.image('icon-health', '/assets/ui/icon-health.png');
  scene.load.image('icon-powerup', '/assets/ui/icon-powerup.png');
}

// 8. support unit
function loadSupportUnits(scene) {
  
  // support_blue 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('support_blue', '/assets/supportUnits/support_units-blue.png', {frameWidth: 48,frameHeight: 48,});

  // support_green 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('support_green', '/assets/supportUnits/support_units-green.png', {frameWidth: 48,frameHeight: 48,});

  // support_grey 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('support_grey', '/assets/supportUnits/support_units-grey.png', {frameWidth: 48,frameHeight: 48,});

  // support_purple 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('support_purple', '/assets/supportUnits/support_units-purple.png', {frameWidth: 48,frameHeight: 48,});

  // support_red 스프라이트 시트 로드 2프레임
  scene.load.spritesheet('support_red', '/assets/supportUnits/support_units-red.png', {frameWidth: 48,frameHeight: 48,});
}

// 9. bosses
function loadBosses(scene) {

  // boss01 스프라이트 시트 로드 8프레임
  scene.load.spritesheet('boss01', '/assets/enemies/Boss Enemies/Boss 01/boss-01-spritesheet.png', {frameWidth: 240,frameHeight: 240,});
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

// 10. bgm
function loadAllBGM(scene) {
  scene.load.audio('bgm_boss01', '/assets/audio/bgm/bgm_boss01.ogg');
  scene.load.audio('bgm_clear', '/assets/audio/bgm/bgm_clear.ogg');
  scene.load.audio('bgm_continue', '/assets/audio/bgm/bgm_continue.ogg');
  scene.load.audio('bgm_credit', '/assets/audio/bgm/bgm_credit.ogg');
  scene.load.audio('bgm_gameover', '/assets/audio/bgm/bgm_gameover.ogg');
  scene.load.audio('bgm_score', '/assets/audio/bgm/bgm_score.ogg');
  scene.load.audio('bgm_shipselect', '/assets/audio/bgm/bgm_shipselect.ogg');
  scene.load.audio('bgm_title', '/assets/audio/bgm/bgm_title.ogg');
  scene.load.audio('bgm_Stage1', '/assets/audio/bgm/bgm_stage01.ogg');
}

// sfx
function loadAllSFX(scene) {
  scene.load.audio('sfx_bullets1', '/assets/audio/sfx/sfx_bullet1.wav');
  scene.load.audio('sfx_bullets3', '/assets/audio/sfx/sfx_bullet3.wav');
  scene.load.audio('sfx_bullets5', '/assets/audio/sfx/sfx_bullet5.wav');
  scene.load.audio('sfx_enemy_explosion', '/assets/audio/sfx/sfx_enemy_explosion.wav');
  scene.load.audio('sfx_ship_select', '/assets/audio/sfx/sfx_ship_select.wav');
  scene.load.audio('sfx_player_explosion', '/assets/audio/sfx/sfx_player_explosion.wav');
  scene.load.audio('sfx_powerup', '/assets/audio/sfx/sfx_powerup.wav');
  scene.load.audio('sfx_powerup_etc', '/assets/audio/sfx/sfx_powerup_etc.wav');
  scene.load.audio('sfx_support_powerup', '/assets/audio/sfx/sfx_support_powerup.wav');
  scene.load.audio('sfx_ui_select', '/assets/audio/sfx/sfx_ui_select.wav');
  scene.load.audio('sfx_ui_success', '/assets/audio/sfx/sfx_ui_success.wav');
  scene.load.audio('sfx_falcon_select', '/assets/audio/sfx/sfx_falcon_select.wav');
  scene.load.audio('sfx_cryphix_select', '/assets/audio/sfx/sfx_cryphix_select.wav');
  scene.load.audio('sfx_hawk_select', '/assets/audio/sfx/sfx_hawk_select.wav');
  scene.load.audio('sfx_falcon_bomb', '/assets/audio/sfx/sfx_falcon_bomb.wav');
  scene.load.audio('sfx_cryphix_bomb', '/assets/audio/sfx/sfx_cryphix_bomb.wav');
  scene.load.audio('sfx_hawk_bomb', '/assets/audio/sfx/sfx_hawk_bomb.wav');
  scene.load.audio('sfx_Falcon_down', '/assets/audio/sfx/sfx_falcon_down.wav');
  scene.load.audio('sfx_Cryphix_down', '/assets/audio/sfx/sfx_cryphix_down.wav');
  scene.load.audio('sfx_Hawk_down', '/assets/audio/sfx/sfx_hawk_down.wav');
  scene.load.audio('sfx_warning', '/assets/audio/sfx/sfx_warning.wav');
  scene.load.audio('sfx_mine_explosion', '/assets/audio/sfx/sfx_mine_explosion.wav');
  scene.load.audio('sfx_mid1_explosion', '/assets/audio/sfx/sfx_mid1_explosion.wav');
  scene.load.audio('sfx_mid2_explosion', '/assets/audio/sfx/sfx_mid2_explosion.wav');
  scene.load.audio('sfx_boss_charge', '/assets/audio/sfx/sfx_boss_charge.wav');
  scene.load.audio('sfx_boss_laser', '/assets/audio/sfx/sfx_boss_laser.wav');
  scene.load.audio('sfx_boss_missile', '/assets/audio/sfx/sfx_boss_missile.wav');
}

// 애니메이션 생성은 여기서
export function createAllAnimations(scene) {
    // preview용 player 생성
    scene.anims.create({
      key: 'plane2_anim',
      frames: scene.anims.generateFrameNumbers('plane2', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });

    // preview용 player 생성
    scene.anims.create({
      key: 'plane2_powerup_anim',
      frames: scene.anims.generateFrameNumbers('plane2_powerup', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });

    scene.anims.create({
      key: 'plane2_idle',
      frames: scene.anims.generateFrameNumbers('plane2', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'plane2_left',
      frames: scene.anims.generateFrameNumbers('plane2', { start: 4, end: 11 }),
      frameRate: 15,
      repeat: -1
    });

    scene.anims.create({
      key: 'plane2_right',
      frames: scene.anims.generateFrameNumbers('plane2', { start: 12, end: 19 }),
      frameRate: 15,
      repeat: -1
    });        

    scene.anims.create({
      key: 'plane2_powerup_idle',
      frames: scene.anims.generateFrameNumbers('plane2_powerup', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'plane2_powerup_left',
      frames: scene.anims.generateFrameNumbers('plane2_powerup', { start: 4, end: 11 }),
      frameRate: 15,
      repeat: -1
    });

    scene.anims.create({
      key: 'plane2_powerup_right',
      frames: scene.anims.generateFrameNumbers('plane2_powerup', { start: 12, end: 19 }),
      frameRate: 15,
      repeat: -1
    });    

    // preview용 player 생성
    scene.anims.create({
      key: 'plane9_anim',
      frames: scene.anims.generateFrameNumbers('plane9', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });

    // preview용 player 생성
    scene.anims.create({
      key: 'plane9_powerup_anim',
      frames: scene.anims.generateFrameNumbers('plane9_powerup', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });

    scene.anims.create({
      key: 'plane9_idle',
      frames: scene.anims.generateFrameNumbers('plane9', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'plane9_left',
      frames: scene.anims.generateFrameNumbers('plane9', { start: 4, end: 11 }),
      frameRate: 15,
      repeat: -1
    });

    scene.anims.create({
      key: 'plane9_right',
      frames: scene.anims.generateFrameNumbers('plane9', { start: 12, end: 19 }),
      frameRate: 15,
      repeat: -1
    });      


    scene.anims.create({
      key: 'plane9_powerup_idle',
      frames: scene.anims.generateFrameNumbers('plane9_powerup', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'plane9_powerup_left',
      frames: scene.anims.generateFrameNumbers('plane9_powerup', { start: 4, end: 11 }),
      frameRate: 15,
      repeat: -1
    });

    scene.anims.create({
      key: 'plane9_powerup_right',
      frames: scene.anims.generateFrameNumbers('plane9_powerup', { start: 12, end: 19 }),
      frameRate: 15,
      repeat: -1
    });       

    // preview용 player 생성
    scene.anims.create({
      key: 'plane6_anim',
      frames: scene.anims.generateFrameNumbers('plane6', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });

    // preview용 player 생성
    scene.anims.create({
      key: 'plane6_powerup_anim',
      frames: scene.anims.generateFrameNumbers('plane6_powerup', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });

    scene.anims.create({
      key: 'plane6_idle',
      frames: scene.anims.generateFrameNumbers('plane6', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'plane6_left',
      frames: scene.anims.generateFrameNumbers('plane6', { start: 4, end: 11 }),
      frameRate: 15,
      repeat: -1
    });

    scene.anims.create({
      key: 'plane6_right',
      frames: scene.anims.generateFrameNumbers('plane6', { start: 12, end: 19 }),
      frameRate: 15,
      repeat: -1
    });   

    scene.anims.create({
      key: 'plane6_powerup_idle',
      frames: scene.anims.generateFrameNumbers('plane6_powerup', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'plane6_powerup_left',
      frames: scene.anims.generateFrameNumbers('plane6_powerup', { start: 4, end: 11 }),
      frameRate: 15,
      repeat: -1
    });

    scene.anims.create({
      key: 'plane6_powerup_right',
      frames: scene.anims.generateFrameNumbers('plane6_powerup', { start: 12, end: 19 }),
      frameRate: 15,
      repeat: -1
    });   

    // preview용 bullet 생성
    scene.anims.create({
      key: 'bullets3_anim',
      frames: scene.anims.generateFrameNumbers('bullets3', { start: 0, end: 1 }),
      frameRate: 8,
      repeat: -1
    });

    // preview용 bullet 생성
    scene.anims.create({
      key: 'bullets5_anim',
      frames: scene.anims.generateFrameNumbers('bullets5', { start: 0, end: 1 }),
      frameRate: 8,
      repeat: -1
    });

    // preview용 bullet 생성
    scene.anims.create({
      key: 'bullets1_anim',
      frames: scene.anims.generateFrameNumbers('bullets1', { start: 0, end: 1 }),
      frameRate: 8,
      repeat: -1
    });

    // 폭발 애니메이션
    scene.anims.create({
      key: 'explosion_small',
      frames: scene.anims.generateFrameNumbers('explosion_small', { start: 0, end: 11 }),
      frameRate: 11,
      hideOnComplete: true
    });

    scene.anims.create({
      key: 'explosion_large',
      frames: scene.anims.generateFrameNumbers('explosion_large', { start: 0, end: 11 }),
      frameRate: 11,
      hideOnComplete: true
    });     

    // bug 1~6
    for (let i = 1; i <= 6; i++) {
      const key = `bug${i}`;
      scene.anims.create({
        key,
        frames: scene.anims.generateFrameNumbers(key, { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
      });
    }

    // 파워업 아이템
    scene.anims.create({
      key: 'item-power-anim',
      frames: scene.anims.generateFrameNumbers('item-power', { start: 0, end: 4 }),
      frameRate: 6,
      repeat: -1
    });

    // 폭탄 아이템
    scene.anims.create({
      key: 'item-bomb-anim',
      frames: scene.anims.generateFrameNumbers('item-bomb', { start: 0, end: 4 }),
      frameRate: 6,
      repeat: -1
    });

    // 폭발 애니메이션
    scene.anims.create({
      key: 'explosion200',
      frames: scene.anims.generateFrameNumbers('explosion200', { start: 0, end: 39 }),
      frameRate: 20,
      hideOnComplete: true
    });

    // 폭발 애니메이션
    scene.anims.create({
      key: 'explosion400',
      frames: scene.anims.generateFrameNumbers('explosion400', { start: 0, end: 39 }),
      frameRate: 20,
      hideOnComplete: true
    });

    // 번개 애니메이션
    scene.anims.create({
      key: 'thunder200',
      frames: scene.anims.generateFrameNumbers('thunder200', { start: 50, end: 89 }),
      frameRate: 40,
      hideOnComplete: true
    });

    //
    scene.anims.create({
      key: 'thunder400',
      frames: scene.anims.generateFrameNumbers('thunder400', { start: 50, end: 89 }),
      frameRate: 40,
      hideOnComplete: true
    });

    // 
    scene.anims.create({
      key: 'fireCircle200',
      frames: scene.anims.generateFrameNumbers('fireCircle200', { start: 0, end: 63 }),
      frameRate: 192,
      hideOnComplete: true,
      repeat: 3,
    });

    // 
    scene.anims.create({
      key: 'plane2_support',
      frames: scene.anims.generateFrameNumbers('support_red', { start: 0, end: 1 }),
      frameRate: 6,
      repeat: -1
    });   
    
    scene.anims.create({
      key: 'plane9_support',
      frames: scene.anims.generateFrameNumbers('support_blue', { start: 0, end: 1 }),
      frameRate: 6,
      repeat: -1
    });
    
    scene.anims.create({
      key: 'plane6_support',
      frames: scene.anims.generateFrameNumbers('support_grey', { start: 0, end: 1 }),
      frameRate: 6,
      repeat: -1
    });

    // preview용 missile 생성
    scene.anims.create({
      key: 'missile2_anim',
      frames: scene.anims.generateFrameNumbers('missile02', { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1
    });

    scene.anims.create({
      key: 'missile3_anim',
      frames: scene.anims.generateFrameNumbers('missile03', { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1
    });

    scene.anims.create({
      key: 'missile4_anim',
      frames: scene.anims.generateFrameNumbers('missile04', { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1
    });

    scene.anims.create({
      key: 'lightningShield',
      frames: scene.anims.generateFrameNumbers('lightningShield', { start: 0, end: 2 }),
      frameRate: 15,
      repeat: -1
    });

        // 
    scene.anims.create({
      key: 'rotating_flame_sheet',
      frames: scene.anims.generateFrameNumbers('rotating_flame_sheet', { start: 0, end: 5 }),
      frameRate: 30,
      hideOnComplete: true,
      repeat: -1,
    });


    scene.anims.create({
      key: 'dust50',
      frames: scene.anims.generateFrameNumbers('dust50', { start: 60, end: 120 }),
      frameRate: 60,
      hideOnComplete: true,
      repeat: 3,
    });

    scene.anims.create({
      key: 'fireFloor100',
      frames: scene.anims.generateFrameNumbers('fireFloor100', { start: 0, end: 58 }),
      frameRate: 60,
      hideOnComplete: true,
      repeat: 3,
    });    

    scene.anims.create({
      key: 'minibeam',
      frames: scene.anims.generateFrameNumbers('minibeam', { start: 0, end: 2 }),
      frameRate: 6,
      repeat: -1
    });

    scene.anims.create({
      key: 'mini_5_explosion',
      frames: scene.anims.generateFrameNumbers('mini_5_explosion', { start: 0, end: 1 }),
      frameRate: 6,
      repeat: 0
    });

    scene.anims.create({
      key: 'boss01_anim',
      frames: scene.anims.generateFrameNumbers('boss01', {start: 0,end: 7 }),
      frameRate: 8, // 초당 프레임
      repeat: 0
    });

    scene.anims.create({
      key: 'charging100',
      frames: scene.anims.generateFrameNumbers('charging100', { start: 0, end: 120 }),
      frameRate: 120,
      repeat: -1
    });

    scene.anims.create({
      key: 'boss_laser_anim',
      frames: scene.anims.generateFrameNumbers('boss_laser', { start: 0, end: 15 }),
      frameRate: 16,
      repeat: 0
    });
}