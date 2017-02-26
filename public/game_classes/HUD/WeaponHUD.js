class WeaponHUD {
  constructor() {
    this.element = new TextElement(new TextPosition(POSITIONS.X.RIGHT, POSITIONS.Y.BOTTOM, 30), new EventExpiration(), '0 / 0', new TextStyle("25px Gerogia"));
    framework.addEventListener("changeWeapon", this);
  }

  draw(ctx) {
    this.element.draw(ctx);
  }

  isExpired() {
    return false;
  }

  update(armedShip) {
    this.element.text = (armedShip._activeWeapon + 1) + '/' + armedShip._weapons.length;
    HUDHandler.getInstance().markElementsAsChanged();
  }

  notify(object, event) {
    if (event === 'changeWeapon' && object.constructor.name === 'PlayerShip')
      this.update(object);
  }
}
