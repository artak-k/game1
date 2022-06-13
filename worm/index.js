import config from './config.js'
import Game from './src/Game.js'

const { width, heigth, messages,keys } = config

const game = new Game({ width, heigth })
game.start()

process.stdin.on('keypress', (_, key) => {
    if (key.ctrl && key.name === keys.c) {
        console.log(messages.turnedOff)
        process.exit()
    }
})