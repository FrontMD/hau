function mTable() {
    const linesCount = 5 // сколько строк оставлять в ячейке 
    const tables = document.querySelectorAll('[data-js="mTable"]')

    if(tables.length < 1) return

    const showMoreBtnLayout = `
                                <span class="show-more">
                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8112 6.1088V9.2192H8.7136V14.7488H5.2576V9.2192H0.16V6.1088H5.2576V0.579199H8.7136V6.1088H13.8112Z" fill="#015738"/>
                                    </svg>
                                    показать все
                                <span>
                                <span class="show-less">
                                    скрыть
                                <span>
                            `

    tables.forEach(table => {
        const cells = table.querySelectorAll('td')
        
        cells.forEach(cell => {
            let styles = window.getComputedStyle(cell)
            let cellLineHeight = parseFloat(styles["line-height"].replace(/[a-zA-Z]/g, ""))
            let cellContent = cell.innerHTML
            let cellContentWrap = document.createElement('div')
            let compressedСontentHeight = cellLineHeight * linesCount
            
            cellContentWrap.innerHTML = cellContent
            cell.innerHTML = ''
            cell.appendChild(cellContentWrap)

            if(cellContentWrap.offsetHeight > compressedСontentHeight) {
                cellContentWrap.classList.add('m-table__cell-content')
                cellContentWrap.setAttribute('data-height', cellContentWrap.offsetHeight)
                cellContentWrap.style.maxHeight = compressedСontentHeight + 'px'
                
                cell.classList.add('collapsed')

                
                let showMoreBtn = document.createElement('button')
                showMoreBtn.classList.add("m-table__showmore")
                showMoreBtn.innerHTML = showMoreBtnLayout
                console.log(cell)
                console.log(showMoreBtn)

                cell.appendChild(showMoreBtn)
            }
            
        })
    })
}