import config from '../config.js'
import Board from './Board.js'
import Food from './Food.js'

const { startSize, speed, keys } = config

class Worm {
    static cells = []
    static counter = 0
    static speed = speed
    static food
    static currInterval
    static prevInterval
    static isPaused = false
    static head(heigth, width) {
        const x = Math.round((width - 2) / 2)
        const y = Math.round((heigth - 2) / 2)
        const head = { x, y, isWorm: true, isBorder: false }

        Worm.cells.push(head)
        Worm.create(head.x)
    }
    static create(x) {
        for (let i = 1; i < startSize; i++) {
            Worm.cells.push({ ...Worm.cells[0], x: x + i })
        }
    }

    static add() {
        for (let y = 0; y < Board.matrix.length; y++) {
            for (let x = 0; x < Board.matrix[y].length; x++) {
                if (y !== Worm.cells.y && x !== Worm.cells.x) {
                    Board.matrix[y][x].isWorm = false
                }
            }
        }
        for (let i = 0; i < Worm.cells.length; i++) {
            Board.matrix[Worm.cells[i].y] = Board.matrix[Worm.cells[i].y].map(pos => {
                if (pos.x === Worm.cells[i].x) {
                    pos.isWorm = true
                }
                return pos
            })
        }
    }

    static eat() {
        let tail = Worm.cells[Worm.cells.length - 1]
        Board.matrix[Worm.food.y][Worm.food.x].isFood = false
        const newTail = { x: tail.x + 1, y: tail.y, isWorm: true }
        tail = newTail
        Worm.cells.push(newTail)
        Worm.counter++
        Worm.food = Food.add()
    }
    static pause() {
        Worm.isPaused = true
        return
    }
    static createInterval(key) {
        return setInterval(() => {
            Worm.isPaused = false
            if (Worm.cells[0].x === Worm.food.x && Worm.cells[0].y === Worm.food.y && Worm.food.isFood) {
                Worm.eat()
            }
         
            const newHead = { ...Worm.cells[0] }

            if (key === keys.left) {
                newHead.x = newHead.x - 1
            } else if (key === keys.up) {
                newHead.y = newHead.y - 1
            } else if (key === keys.down) {
                newHead.y = newHead.y + 1
            } else if (key === keys.right) {
                newHead.x = newHead.x + 1
            } else if (key === keys.pause) {
                return Worm.pause()
            }
            Worm.cells = [newHead, ...Worm.cells]
            Worm.cells.pop()
        }, Worm.speed)
    }

    static move(key) {
        Worm.prevInterval = Worm.currInterval
        clearInterval(Worm.prevInterval)
        Worm.currInterval = Worm.createInterval(key)
    }
}

export default Worm