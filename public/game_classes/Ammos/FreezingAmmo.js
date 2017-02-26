class FreezingAmmo extends BaseAmmo {
  constructor(damage, image, speed) {
    super(damage, image, speed);
  }

  effect() {
    return (entity) => {
      entity.modifyHp(-this.damage);
      entity.setTemporarySpeed(0, 60);
    };
  }
}
