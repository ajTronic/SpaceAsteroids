// color pallete: 
// 8ecae6
// 219ebc
// 023047
// ffb703
// fb8500

import P5, { Vector } from "p5";
import "p5/lib/addons/p5.dom";
import Asteroid from "./asteroid";
import Ship from "./ship";
import controler from "../controls/controler.json" assert {type: "json"}
import Torpedo from "./torpedo";
import SoundManager from "./soundManager"

let ship: Ship;
let asteroids: Asteroid[] = []
let torpedos: Torpedo[] = []
let sm: SoundManager

globalThis.background = 10
globalThis.asteroidFill = "#7209b7"
globalThis.asteroidStroke = "#3a0ca3"
globalThis.shipFill = "#4361ee"
globalThis.shipStroke = "#3a0ca3"
globalThis.torpedoFill = "#7209b7"
globalThis.torpedoStroke = "#3a0ca3"


const breakupAsteroid = (asteroid: Asteroid) => {
    if (asteroid.rad > 15) {
        const newAsteroids = asteroid.breakup()
        asteroids.push(...newAsteroids)
    }
}

const sketch = (game: P5) => {
    game.setup = () => {
        game.createCanvas(game.windowWidth, game.windowHeight);

        ship = new Ship(game)
        sm = new SoundManager(game)

        for (let i = 0; i < 10; i++) {
            asteroids.push(new Asteroid(
                game,
                game.createVector(
                    game.random(game.width),
                    game.random(game.height),
                ),
                game.random(controler.asteroid.minRad, controler.asteroid.maxRad)
            ))
        }

        game.strokeWeight(2)
    };

    game.keyReleased = () => {
        ship.setRotation(0)
        ship.boosting(false)
    }

    game.keyTyped = () => {
        if (game.key == " ") {
            sm.playShotSound()
            torpedos.push(new Torpedo(game, ship.getData()[0], ship.getData()[1]))
        }
    }

    game.keyPressed = () => {
        if (game.keyIsDown(game.RIGHT_ARROW)) ship.setRotation(controler.ship.handling)
        if (game.keyIsDown(game.LEFT_ARROW)) ship.setRotation(-controler.ship.handling)
        if (game.keyIsDown(game.UP_ARROW)) ship.boosting(true)
    }

    game.draw = () => {
        game.background(globalThis.background);

        for (let i = torpedos.length - 1; i >= 0; i--) {
            const torpedo = torpedos[i]

            torpedo.edges()
            if (torpedo.isFinished()) {
                torpedos.splice(i, 1)
                break
            }

            torpedo.render()
            torpedo.update()

            for (let j = asteroids.length - 1; j >= 0; j--) {
                const asteroid = asteroids[j]

                if (torpedo.hits(asteroid)) {
                    breakupAsteroid(asteroid)
                    asteroids.splice(j, 1)
                    torpedos.splice(i, 1)
                    break
                }
            }
        }

        ship.update()
        ship.render()
        ship.turn()
        ship.edges()

        asteroids.forEach(asteroid => {
            asteroid.render()
            asteroid.update()
            asteroid.edges()

            if (ship.hits(asteroid)) {
                breakupAsteroid(asteroid)
                asteroids.splice(asteroids.indexOf(asteroid), 1)
            }
        })
    };
};

new P5(sketch);