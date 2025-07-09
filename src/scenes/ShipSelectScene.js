export default class ShipSelectScene extends Phaser.Scene {
  constructor() {
    super('ShipSelectScene');
  }

  create() {
    this.add.text(180, 50, 'Select Your Ship', { fontSize: '24px', fill: '#fff' });

    for (let i = 1; i <= 9; i++) {
      const key = `player${i.toString().padStart(2, '0')}`;
      const x = 100 + ((i - 1) % 3) * 150;
      const y = 150 + Math.floor((i - 1) / 3) * 150;

      this.add.image(x, y, key)
        .setInteractive()
        .on('pointerdown', () => {
          this.scene.start('MainScene', { selectedPlayer: key });
        });
    }
  }
}