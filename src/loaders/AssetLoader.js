// public/src/loaders/AssetLoader.js


export function loadAllAssets(scene) {
  loadBackgrounds(scene);
  loadPlayer(scene);
  loadEnemies(scene);
  loadBullets(scene);
  loadEffects(scene);
  loadPowerups(scene);
  loadUI(scene);
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
    scene.load.image(key, '/assets/backgrounds/${filename}');
  });
}

// ✅ 2. 플레이어
function loadPlayer(scene) {
    // 플레이어 생성
    scene.load.spritesheet('player1', '/assets/player/Plane 01/Normal/planes_01A.png', { frameWidth: 96, frameHeight: 96 });
    scene.load.spritesheet('player1_spin', '/assets/player/Plane 01/Normal/planes_01A_Spin.png', { frameWidth: 96, frameHeight: 96 });
    scene.load.spritesheet('player1_powerup', '/assets/player/Plane 01/Powered Up/planes_01B.png', { frameWidth: 96, frameHeight: 96 });
    scene.load.spritesheet('player1_powerup_spin', '/assets/player/Plane 01/Powered Up/planes_01B_Spin.png', { frameWidth: 96, frameHeight: 96 });
    
    scene.load.spritesheet('player2', '/assets/player/Plane 02/planes_02A.png', { frameWidth: 96, frameHeight: 96 });
    scene.load.spritesheet('player2_powerup', '/assets/player/Plane 02/planes_02B.png', { frameWidth: 96, frameHeight: 96 });

    scene.load.spritesheet('player3', '/assets/player/Plane 03/planes_03A.png', { frameWidth: 96, frameHeight: 96 });
    scene.load.spritesheet('player3_powerup', '/assets/player/Plane 03/planes_03B.png', { frameWidth: 96, frameHeight: 96 });

    scene.load.spritesheet('player4', '/assets/player/Plane 04/planes_04A.png', { frameWidth: 96, frameHeight: 96 });
    scene.load.spritesheet('player4_powerup', '/assets/player/Plane 04/planes_04B.png', { frameWidth: 96, frameHeight: 96 });
    
    scene.load.spritesheet('player5', '/assets/player/Plane 05/planes_05A.png', { frameWidth: 96, frameHeight: 96 });
    scene.load.spritesheet('player5_powerup', '/assets/player/Plane 05/planes_05B.png', { frameWidth: 96, frameHeight: 96 });

    scene.load.spritesheet('player6', '/assets/player/Plane 06/planes_06A.png', { frameWidth: 96, frameHeight: 96 });
    scene.load.spritesheet('player6_powerup', '/assets/player/Plane 06/planes_06B.png', { frameWidth: 96, frameHeight: 96 });

    scene.load.spritesheet('player7', '/assets/player/Plane 07/planes_07A.png', { frameWidth: 96, frameHeight: 96 });
    scene.load.spritesheet('player7_powerup', '/assets/player/Plane 07/planes_07B.png', { frameWidth: 96, frameHeight: 96 });

    scene.load.spritesheet('player8', '/assets/player/Plane 08/planes_08A.png', { frameWidth: 96, frameHeight: 96 });
    scene.load.spritesheet('player8_powerup', '/assets/player/Plane 08/planes_08B.png', { frameWidth: 96, frameHeight: 96 });

    scene.load.spritesheet('player9', '/assets/player/Plane 09/Normal/planes_09A.png', { frameWidth: 96, frameHeight: 96 });
    scene.load.spritesheet('player9_spin', '/assets/player/Plane 09/Normal/planes_09A_Spin.png', { frameWidth: 96, frameHeight: 96 });
    scene.load.spritesheet('player9_powerup', '/assets/player/Plane 09/Powered Up/planes_09B.png', { frameWidth: 96, frameHeight: 96 });
    scene.load.spritesheet('player9_powerup_spin', '/assets/player/Plane 09/Powered Up/planes_09B_Spin.png', { frameWidth: 96, frameHeight: 96 });
}

// ✅ 3. 적
function loadEnemies(scene) {
  for (let i = 1; i <= 6; i++) {
    scene.load.spritesheet('bug${i}', '/assets/enemies/01 Bug (Animation)/Bug ${i}/bug_${i}.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  // Enemy 02 Heavy 1~6까지 등록
  for (let i = 1; i <= 6; i++) {
    scene.load.image('heavy${i}', '/assets/enemies/02 Heavy/heavy_${i}.png');
  }
  
  // Enemy 02 Heavy 1~6까지 등록
  for (let i = 1; i <= 6; i++) {
    scene.load.image('heavy${i}', '/assets/enemies/02 Heavy/heavy_${i}.png');
  }
  
  // Enemy 03 Danger 1~6까지 등록
  for (let i = 1; i <= 6; i++) {
    scene.load.image('danger${i}', '/assets/enemies/03 Danger/danger_${i}.png');
  }

  // Enemy 04 Cannon 1~6까지 등록
  for (let i = 1; i <= 6; i++) {
    scene.load.image('cannon${i}`, `/assets/enemies/04 Cannon/cannon_${i}.png');
  }

  // Enemy 06 Wings 1~6까지 등록
  for (let i = 1; i <= 6; i++) {
    scene.load.image('wings${i}`, `/assets/enemies/06 Wings/wings_${i}.png');
  }

  // Enemy 07 Emperor 1~6까지 등록
  for (let i = 1; i <= 6; i++) {
    const index = i.toString().padStart(2, '0'); // 01, 02, ..., 06
    scene.load.image('emperor${i}`, `/assets/enemies/07 Emperor/emperor_${index}.png');
  }
  
  // minibeam
  scene.load.spritesheet('minibeam', '/assets/enemies/05 Mini/Beam/minibeam_sheet.png', {
    frameWidth: 64,
    frameHeight: 64,
  });


}

// ✅ 4. 총알
function loadBullets(image) {
  scene.load.spritesheet('bullets', '/assets/bullets/Projectiles/projectile-01.png', {
    frameWidth: 12,
    frameHeight: 20,
  });
  scene.load.spritesheet('enemyBullet', '/assets/bullets/Projectiles/projectile-04.png', {
    frameWidth: 12,
    frameHeight: 12,
  });
}

// ✅ 5. 이펙트 (폭발 등)
function loadEffects(scene) {
  scene.load.spritesheet('explosion1', '/assets/effects/Explosion/Small/explosion.png', {
    frameWidth: 100,
    frameHeight: 100,
  });
}

// ✅ 6. 파워업
function loadPowerups(scene) {
  scene.load.spritesheet('powerup', '/assets/Icons/Power-Ups/icon-a-power.png', {
    frameWidth: 32,
    frameHeight: 32,
  });
}

// ✅ 7. UI 관련 이미지 (있다면)
function loadUI(scene) {
  // scene.load.image('ui_healthbar', '/assets/ui/healthbar.png');
}