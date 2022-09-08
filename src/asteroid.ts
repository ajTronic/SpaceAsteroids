import P5 from "p5";
import GameObject from "./gameobject"
import controler from "./controls/controler.json" assert {type: "json"}

class Asteroid extends GameObject {
    total: number
    offset: number[]
    id: number = Math.floor(Math.random() * 100)

    constructor(game: P5, pos: P5.Vector, rad: number) {
        let myVel = P5.Vector.random2D()      
        myVel.mult(controler.asteroid.speed)
        super(game, pos, rad, myVel)

        this.total = Math.floor(game.random(5, 15))
        this.offset = []

        for (let i = 0; i < this.total; i++) this.offset.push(game.random(-this.rad * 0.3, this.rad * 0.3))
    }

    update() {
        this.pos.add(this.vel)
    }

    breakup() {
        let newAsteroids = []
        let numNew = Math.floor(this.game.random(2, 4))
        for (let i = 0; i < numNew; i++) {
            newAsteroids[i] = new Asteroid(this.game, this.pos.copy(), this.rad / numNew)
        }
        return newAsteroids
    }

    render() {
        this.game.push()
        this.game.stroke(255)
        this.game.fill(10)
        this.game.translate(this.pos.x, this.pos.y)
        this.game.beginShape()
        for (let i = 0; i < this.total; i++) {
            let angle = this.game.map(i, 0, this.total, 0, this.game.TWO_PI)
            let x = this.rad * this.game.cos(angle) + this.offset[i]
            let y = this.rad * this.game.sin(angle)
            this.game.vertex(x, y)
        }
        this.game.endShape(this.game.CLOSE)
        this.game.pop()
    }
}

export default Asteroid