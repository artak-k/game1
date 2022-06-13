import readline from 'readline'
import Board from './Board.js'
import Worm from './Worm.js'
import Food from './Food.js'
import config from '../config.js'

const { empty, cell, food, border, keys, messages } = config
readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

class Game {
    constructor({ heigth, width }) {
        Board.create(heigth, width)
        Worm.head(heigth, width)
        this.heigth = heigth
        this.width = width
    }

    start() {
        Worm.food = Food.add()

        const mainInterval = setInterval(() => {
            console.clear()
            Worm.add()
            this.draw(Board.matrix)
            if (Worm.cells[0].x < 1 || Worm.cells[0].x > this.width - 2 || Worm.cells[0].y > this.heigth - 2 || Worm.cells[0].y < 1) {
                clearInterval(mainInterval)
                console.log(messages.info, Worm.counter)
                process.exit();
            }
            for (let i = 1; i < Worm.cells.length; i++) {
                if (Worm.cells[0].x === Worm.cells[i].x && Worm.cells[0].y === Worm.cells[i].y) {
                    clearInterval(mainInterval)
                    console.log(messages.gameOver, Worm.counter)
                    process.exit();
                }
            }
        }, Worm.speed)

        process.stdin.on('keypress', (str, key) => {
            if (Object.values(keys).includes(key.name)) {
                Worm.move(key.name)
            } else {
                console.log(messages.warning);
            }
        })
    }

    draw(matrix) {
        return matrix
            .map(line => [...new Map(line.map(item => [item.x, item])).values()])
            .map(line => line.map(pos => pos.isBorder ? border : pos.isFood ? food : pos.isWorm ? cell : empty))
            .forEach(line => console.log(line.join('')))
    }

}

export default Game
