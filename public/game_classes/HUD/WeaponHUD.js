class WeaponHUD {
  constructor(){
    this.element = new TextElement(new TextPosition(POSITIONS.X.RIGHT, POSITIONS.Y.BOTTOM, 30), new EventExpiration(), '0 / 0', new TextStyle("25px Gerogia"));
    framework.entityHandler.addEventListener("changeWeapon", this);
  }
  draw(ctx){
    this.element.draw(ctx);
  }

  isExpired(){
    return false;
  }

  update(armedShip){
    this.element.text = (armedShip.activeWeapon + 1) + '/' + armedShip.weapons.length;
    framework.drawer.markElementsAsChanged();
  }
  notify(object, event){
    this.update(object);
  }
}
