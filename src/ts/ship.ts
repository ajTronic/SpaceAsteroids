import P5 from "p5";
import GameObject from "./gameobject"
import controler from "../controls/controler.json" assert {type: "json"}

class Ship extends GameObject {
    heading: number
    rotation: number
    isBoosting: boolean

    constructor(game: P5) {
        super(game, game.createVector(game.width / 2, game.height / 2), controler.ship.rad, game.createVector(0, 0))
        this.heading = 0
        this.rotation = 0
        this.isBoosting = false
    }

    getData(): [P5.Vector, number] {
        return [this.pos, this.heading]
    }

    boosting(b: boolean) {
        this.isBoosting = b
    }

    boost() {
        const force = P5.Vector.fromAngle(this.heading)
        force.mult(controler.ship.speed)
        this.vel.add(force)
    }

    setRotation(angle: number) {
        this.rotation = angle
    }

    turn() {
        this.heading += this.rotation
    }

    update() {
        if (this.isBoosting) this.boost()
        this.pos.add(this.vel)
        this.vel.mult(controler.ship.slowdown)
    }

    render() {
        this.game.push()
        this.game.translate(this.pos.x, this.pos.y)
        this.game.rotate(this.heading + this.game.PI / 2)
        this.game.fill(globalThis.shipFill)
        this.game.strokeWeight(3)
        this.game.stroke(globalThis.shipStroke)
        this.game.triangle(
            -this.rad, this.rad,
            this.rad, this.rad,
            0, -this.rad
        )
        this.game.pop()
    }
}

export default Ship