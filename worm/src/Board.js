class Board {
    static matrix = []

    static create(heigth, width) {
        const xAxis = width;
        const yAxis = heigth
        for (let y = 0; y < yAxis; y++) {
            let line = []
            for (let x = 0; x < xAxis; x++) {
                if (y === 0 || y === yAxis - 1 || x === 0 || x === xAxis - 1) {
                    line.push({ x, y, isBorder: true })
                } else {
                    line.push({ x, y, isBorder: false })
                }
            }
            Board.matrix.push(line)
        }
    }
}

export default Board