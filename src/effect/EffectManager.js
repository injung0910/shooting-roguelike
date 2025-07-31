// EffectManager.js
export default class EffectManager {
    constructor(scene) {
        if (!scene) return; // scene 없으면 초기화 보류
        this.setScene(scene);
    }

    setScene(scene) {
        this.scene = scene;
        this.effects = scene.add.group({
            classType: Phaser.GameObjects.Sprite,
            maxSize: 50,
            runChildUpdate: false,
            maxSize: 50, // 무제한 또는 충분히 큰 값
        });
    }

    smallExplosion(x, y) {
        const effect = this.effects.get(x, y, 'explosion_small');
        effect.setActive(true);
        effect.setVisible(true);
        effect.setScale(1);
        effect.play('explosion_small');
        effect.once('animationcomplete', () => {
            this.effects.killAndHide(effect);
            effect.setActive(false);
            effect.setVisible(false);
        });
    }

    largeExplosion(x, y) {
        const effect = this.effects.get(x, y, 'explosion_large');
        effect.setActive(true);
        effect.setVisible(true);
        effect.setScale(1);
        effect.play('explosion_large');
        effect.once('animationcomplete', () => {
            this.effects.killAndHide(effect);
            effect.setActive(false);
            effect.setVisible(false);
        });
    }

    mineExplosion(x, y) {
        const effect = this.effects.get(x, y, 'mini_5_explosion');
        effect.setActive(true);
        effect.setVisible(true);
        effect.setScale(1);
        effect.play('mini_5_explosion');
        effect.once('animationcomplete', () => {
            this.effects.killAndHide(effect);
            effect.setActive(false);
            effect.setVisible(false);
        });
    }

    explosion4(x, y) {
        const effect = this.effects.get(x, y, 'explosion400');
        effect.setActive(true);
        effect.setVisible(true);        
        effect.setDepth(30);
        effect.setScale(2);
        effect.setAlpha(0.7);
        effect.play('explosion400');
        effect.once('animationcomplete', () => {
            this.effects.killAndHide(effect);
            effect.setActive(false);
            effect.setVisible(false);
        });
    }

    thunder4(x, y) {
        const effect = this.effects.get(x, y, 'thunder400');
        effect.setActive(true);
        effect.setVisible(true);        
        effect.setDepth(30);
        effect.setScale(2);
        effect.setAlpha(0.7);
        effect.play('thunder400');
        effect.once('animationcomplete', () => {
            this.effects.killAndHide(effect);
            effect.setActive(false);
            effect.setVisible(false);
        });
    }

    fireCircle2(x, y) {
        const effect = this.effects.get(x, y, 'fireCircle200');
        effect.setActive(true);
        effect.setVisible(true);
        effect.setDepth(30);
        effect.setAlpha(0.7);
        effect.play('fireCircle200');
        effect.once('animationcomplete', () => {
            this.effects.killAndHide(effect);
            effect.setActive(false);
            effect.setVisible(false);
        });

        this.scene.tweens.add({
            targets: effect,
            y: y - 1000,  // 얼마나 위로 이동할지
            duration: 1000,
            ease: 'Sine.easeOut',
        });
    }


    // 적이 맞았을 때 붉게 깜빡이는 처리
    flashRed(target, flashCount = 4, flashInterval = 100) {
        if (!target || !target.setTint || !target.clearTint) return;

        let count = 0;

        const flashTimer = this.scene.time.addEvent({
            delay: flashInterval,
            repeat: flashCount * 2 - 1, // on/off 반복
            callback: () => {
                if (!target.active) {
                    flashTimer.remove();
                    return;
                }

                if (count % 2 === 0) {
                    target.setTint(0xff0000);
                } else {
                    target.clearTint();
                }

                count++;
            }
        });
    }

    clearAll() {
        this.effectGroup.clear(true, true);
    }
}