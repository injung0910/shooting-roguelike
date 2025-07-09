export default class Enemy {
  constructor(scene, x, y, type = 'enemy1', pattern = 'straight') {
    this.scene = scene;
    this.type = type;
    this.pattern = pattern;

    // 타입별 속성 설정
    const config = this.getTypeConfig(type);

    this.hp = config.hp;
    this.speed = config.speed;
    this.animationKey = config.animation;

    // 스프라이트 생성
    this.sprite = scene.physics.add.sprite(x, y, type);
    this.sprite.setData('ref', this); // 참조 저장
    this.sprite.play(this.animationKey);

    this.initPattern();
  }

  getTypeConfig(type) {
    // 타입별 체력, 속도, 애니메이션 키 등 설정
    const configs = {
      enemy1: { hp: 3, speed: 1.5, animation: 'enemy1' },
      enemy2: { hp: 5, speed: 1.0, animation: 'enemy2' },
      enemy3: { hp: 2, speed: 2.0, animation: 'enemy3' },
      // 필요에 따라 추가
    };

    return configs[type] || { hp: 1, speed: 1.5, animation: type }; // 기본값
  }

  initPattern() {
    switch (this.pattern) {
      case 'zigzag':
        this.direction = 1;
        break;
      case 'chase':
        break;
      case 'straight':
      default:
        break;
    }
  }

  update() {
    if (!this.sprite.active) return;

    switch (this.pattern) {
      case 'zigzag':
        this.sprite.x += this.direction * 2;
        if (
          this.sprite.x <= 0 ||
          this.sprite.x >= this.scene.scale.width
        ) {
          this.direction *= -1;
        }
        this.sprite.y += this.speed;
        break;

      case 'chase':
        if (this.scene.player?.sprite) {
          const dx = this.scene.player.sprite.x - this.sprite.x;
          this.sprite.x += dx * 0.02;
        }
        this.sprite.y += this.speed;
        break;

      case 'straight':
      default:
        this.sprite.y += this.speed;
        break;
    }
  }

  takeDamage(damage = 1) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.destroy();
    }
  }

  destroy() {
    this.sprite.destroy();
    // 폭발 이펙트 등도 여기에서 처리 가능
  }
}