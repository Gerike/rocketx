'use strict';

class TutorialBossAI {
  constructor(ship) {
    this.controlledShip = ship;
    this.timer = 0;
    this.attackCooldowns = [0, 0, 0];
    this.waiting = 0;
  }

  * initializeAI() {
    /*
     TODO:
     INDESTRUCTIBLE FRONT SHIELDS UP
     BOSS MOVES FROM THE RIGHT TO 3/4
     INDESTRUCTIBLE FRONT SHIELDS DOWN, FIGHT STARTS

     ATTACKS-VARIANTS:
     - PLAIN PROJECTILES 12 AT ONCE TO EVERY DIRECTION (EVERY 360/12 DEGREES); CD: 30F
     - MOVEMENT TRACKING PROJECTILES AIMING TOWARDS THE PLAYER (INITIAL DIRECTION WILL BE SET ON FIRE AND LINEAR PATH) 10-15 IN QUICK SUCCESSION; CD: 300F

     WHEN BOSS REACHES 50% HP
     SWITCHES TO SLOWING PROJECTILES INSTEAD PLAIN
     NEW ATTACK-VARIANT:
     EXPLODING BULLET WHICH AIMED TOWARDS THE PLAYER, EXPLODING AFTER REACHING THE PLAYER'S OLD(POSITION IN THE PLAYER WAS WHEN THE BULLET FIRED) POSITION, DESTRUCTING EVERYTHING IN A BIG RADIUS; CD: 300F

     WHEN BOSS REACHES 10% HP
     FIRERATE DOUBLED, USING ABILITIES TWICE AS MUCH
     */

    let shield = new Shield(1, 1, this.controlledShip, resources['shield']);
    yield () => {
      framework.entityHandler.attachEntity(shield, this.controlledShip)
    };

    let waypoints = new LinearPath(this.controlledShip.getX(), this.controlledShip.getY(), 270, 1, 200).getWaypoints();
    let next_wp = waypoints.next();
    while (!next_wp.done) {
      yield () => {
        this.controlledShip.x = next_wp.value.x;
        this.controlledShip.y = next_wp.value.y;
      };
      next_wp = waypoints.next();
    }

    yield() => {
      framework.requestDestroy(shield)
    };

    while (true) {
      this.timer += 1;
      this.waiting -= 1;
      let currentAttack = (this.attackCooldowns[0] < this.attackCooldowns[1]) ? 0 : 1;
      if (this.waiting <= 0 && this.attackCooldowns[currentAttack] <= this.timer) {
        switch (currentAttack) {
          case 0:
            yield* this.attackMove1();
            break;
          case 1:
            yield* this.attackMove2();
            break;
        }
      }
      else
        yield* this.idle()
    }
  }

  * idle() {
    yield () => {
    };
  }

  * attackMove1() {
    this.waiting = Math.floor(Math.random() * 30 + 10);
    this.attackCooldowns[0] = this.timer + this.waiting;
    yield () => {
      this.controlledShip.weapons[0].shoot();
    };
  }

  * attackMove2() {
    const projectile_count = 15;
    const delay_between_projectiles = 7;
    this.waiting = 150;
    this.attackCooldowns[1] = this.timer + 300 + Math.floor(Math.random() * 150 + 1);
    let wait = 0;
    let already_fired = 0;

    while (already_fired < projectile_count) {
      if (wait <= 0) {
        already_fired += 1;
        wait = delay_between_projectiles;
        yield () => {
          this.controlledShip.weapons[1].direction = Math.atan2(framework.entities[0].y - (this.controlledShip.y + this.controlledShip.img.height / 2), framework.entities[0].x - (this.controlledShip.x + this.controlledShip.img.width / 2)) * 180 / Math.PI + 88;
          this.controlledShip.weapons[1].shoot();
        };
      }
      else {
        wait -= 1;
        yield* this.idle();
      }
    }
  }
}
