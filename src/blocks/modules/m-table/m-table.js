function mTable() {
    const linesCount = getComputedStyle(document.body).getPropertyValue('--m-table-max-rows');
    const tables = document.querySelectorAll('[data-js="mTable"]')
    const textSegment = 200 // на каждые textSegment символов ячейки
    const textCoef = 150 // прибавляем textCoef пикселей минимальной ширины на каждые textSegment символов ячейки
    const titleSegment = 100 // на каждые textSegment символов заголовка
    const titleCoef = 200 // прибавляем headCoef пикселей минимальной ширины на каждые textSegment символов заголовка

    if(tables.length < 1) return

    const showMoreBtnLayout = `                                
                                <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.748341 9.86383L2.8571 12.1503L6.60429 8.69424L9.14477 6.35118L7.03605 4.06472L3.28711 0L0.746637 2.34306L4.49554 6.40782L0.748341 9.86383Z" fill="currentColor"/>
                                </svg>
                                <span class="show-more">
                                показать все
                                </span>
                                <span class="show-less">
                                    скрыть
                                </span>
                            `

    tables.forEach(table => {
        const cells = table.querySelectorAll('td')
        const titles = table.querySelectorAll('th')
        let compressedСontentHeight = 0

        titles.forEach(title => {
            let titleContentLength = title.innerHTML.length

            if(titleContentLength > titleSegment) {
                title.style.minWidth = Math.round(parseInt(titleContentLength / titleSegment * titleCoef)) + 'px'
            }
        })
        
        cells.forEach(cell => {
            let styles = window.getComputedStyle(cell)
            let cellLineHeight = parseFloat(styles["line-height"].replace(/[a-zA-Z]/g, ""))
            let cellContent = cell.innerHTML

            if(cellContent.length > textSegment && !cellContent.includes('m-table-link')) {
                if(cellContent.length > 1000) {
                    cell.style.minWidth = Math.round(parseInt(cellContent.length / textSegment * (textCoef * 0.5))) + 'px'    
                } else {
                    cell.style.minWidth = Math.round(parseInt(cellContent.length / textSegment * textCoef)) + 'px'
                }
            }

            let cellContentWrap = document.createElement('div')
            
            compressedСontentHeight = cellLineHeight * linesCount
            cellContentWrap.innerHTML = cellContent
            cell.innerHTML = ''
            cell.appendChild(cellContentWrap)

            if(cellContentWrap.offsetHeight - 0.5 > compressedСontentHeight) {
                cellContentWrap.classList.add('m-table__cell-content')
                cellContentWrap.setAttribute('data-js', 'mTableCellContent')
                cellContentWrap.setAttribute('data-height', cellContentWrap.offsetHeight)
                cellContentWrap.style.maxHeight = compressedСontentHeight + 'px'
                
                cell.classList.add('collapsed')
                cell.setAttribute('data-js', 'mTableCell')

                let showMoreBtn = document.createElement('button')

                showMoreBtn.classList.add("m-table__showmore")
                showMoreBtn.setAttribute('data-js', 'mTableShowMore')
                showMoreBtn.innerHTML = showMoreBtnLayout
                cell.appendChild(showMoreBtn)
            }
            
        })

        mTableShowMoreControll(table, compressedСontentHeight)
    })
}

function mTableShowMoreControll(table, targetMaxHeight) {
    table.addEventListener('click', (e) => {
        let eTarget = e.target
        if(eTarget.closest('[data-js="mTableShowMore"]')) {
            let currentCell = eTarget.closest('[data-js="mTableCell"]')
            let currentContent = currentCell.querySelector('[data-js="mTableCellContent"]')

            if(currentCell.classList.contains('collapsed')) {
                currentCell.classList.remove('collapsed')
                currentContent.style.maxHeight = currentContent.getAttribute('data-height') + 'px'
            } else {
                currentContent.style.maxHeight = targetMaxHeight + 'px'

                setTimeout(() => {
                    currentCell.classList.add('collapsed')
                }, 200)
            }
        }
    })
}