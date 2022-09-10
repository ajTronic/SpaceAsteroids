import P5 from "p5"
import Asteroid from "./asteroid"

class GameObject {
    game: P5
    pos: P5.Vector
    rad: number
    vel: P5.Vector
    onEdge: any

    constructor(game: P5, pos: P5.Vector, rad: number, vel: P5.Vector, onEdge: any = undefined) {
        this.game = game
        this.pos = pos
        this.rad = rad
        this.vel = vel
        this.onEdge = onEdge
    }

    edges() {
        if (this.pos.x > this.game.width + this.rad) {
            if (!this.onEdge) {
                this.pos.x = -this.rad
            } else {
                this.onEdge()
            }
        } else if (this.pos.x < -this.rad) {
            if (!this.onEdge) {
                this.pos.x = this.game.width + this.rad
            } else {
                this.onEdge()
            }
        } else if (this.pos.y > this.game.height + this.rad) {
            if (!this.onEdge) {
                this.pos.y = -this.rad
            } else {
                this.onEdge()
            }
        } else if (this.pos.y < -this.rad) {
            if (!this.onEdge) {
                this.pos.y = this.game.height + this.rad
            } else {
                this.onEdge()
            }
        }
    }

    hits(asteroid: Asteroid) {
        if (this.game.abs(this.pos.x - asteroid.pos.x) > 500 || this.game.abs(this.pos.y - asteroid.pos.y) > 500) { // not even close
            return
        }

        let d = this.game.dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y)
        if (d < asteroid.rad) return true
        return false
    }
}

export default GameObject