/**
 * Created by Win10 on 2016. 12. 11..
 */
class LaserAmmo extends BaseAmmo{
  constructor(damage, img){
    super(damage, img, 0);
  }
  effect(){
    return (entity) => {
      entity.modifyHp(-this.damage);
    }
  }
}
