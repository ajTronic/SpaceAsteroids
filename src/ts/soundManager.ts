import P5 from "p5"

class SoundManager {
    game: P5

    constructor(game: P5) {
        this.game = game
    }

    async playShotSound() {
        let soundUrl = require("url:../assets/shot.wav")
        let sound = new Audio(soundUrl)
        sound.load()
        await sound.play()
    }
}

export default SoundManager