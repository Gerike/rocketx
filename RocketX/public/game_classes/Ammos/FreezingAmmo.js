/**
 * Created by Win10 on 2016. 12. 11..
 */
class FreezingAmmo extends BaseAmmo{
  constructor(damage, img, speed){
    super(damage, img, speed);
  }
  effect(){
    return (entity) => {
      entity.modifyHp(-this.damage);
      entity.setTemporarySpeed(0, 60);
    }
  }
}
