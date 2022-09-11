import GameObject from "./gameobject"
import controler from "../controls/controler.json" assert {type: "json"}
import P5 from "p5"

class Torpedo extends GameObject {
    finished: boolean

    constructor(p5: P5, pos: P5.Vector, angle: number) {
        let myVel = P5.Vector.fromAngle(angle)
        myVel.mult(controler.torpedo.speed)
        super(p5, p5.createVector(pos.x, pos.y), controler.torpedo.rad, myVel, () => {
            this.finished = true
        })
        this.finished = false
    }

    isFinished() {
        return this.finished
    }

    update() {
        this.pos.add(this.vel)
    }

    render() {
        this.game.push()
          this.game.stroke(globalThis.torpedoStroke)
          this.game.strokeWeight(this.rad)
          this.game.point(this.pos.x, this.pos.y)
        this.game.pop()
    }
}

export default Torpedo