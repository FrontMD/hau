function mTable() {
    const linesCount = 6 // сколько строк оставлять в ячейке 
    const tables = document.querySelectorAll('[data-js="mTable"]')

    if(tables.length < 1) return

    tables.forEach(table => {
        const cells = table.querySelectorAll('td')
        
        cells.forEach(cell => {
            let styles = window.getComputedStyle(cell)
            let cellLineHeight = parseFloat(styles["line-height"].replace(/[a-zA-Z]/g, ""))
            let cellContent = cell.innerHTML
            let cellContentWrap = document.createElement('div')

            cellContentWrap.innerHTML = cellContent
            cell.innerHTML = ''
            cell.appendChild(cellContentWrap)

            if(cellContentWrap.offsetHeight > cellLineHeight * linesCount) {
                console.log(cellContentWrap.offsetHeight)
                console.log(cellLineHeight * 5)
                console.log(cell)
            }
            
        })
    })
}