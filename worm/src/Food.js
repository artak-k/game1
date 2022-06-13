import config from '../config.js'
import Board from './Board.js'
import Worm from './Worm.js'

class Food {
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    static add() {
        const x = Food.randomInt(1, config.width - 2)
        const y = Food.randomInt(1, config.heigth - 2)
        const newFood = { x, y, isFood: true, isBorder: false }

        Worm.cells.forEach(cell => {
            if (newFood.x === cell.x && newFood.y === cell.y) {
                return Food.add()
            }
        })
        Board.matrix[newFood.y] = Board.matrix[newFood.y].map(pos => {
            if (pos.x === newFood.x) {
                pos = newFood
            }
            return pos
        })
        return newFood
    }
}

export default Food