function mTable() {
    const linesCount = getComputedStyle(document.body).getPropertyValue('--m-table-max-rows');
    const tables = document.querySelectorAll('[data-js="mTable"]')

    if(tables.length < 1) return

    const showMoreBtnLayout = `
                                <span class="show-more">
                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8112 6.1088V9.2192H8.7136V14.7488H5.2576V9.2192H0.16V6.1088H5.2576V0.579199H8.7136V6.1088H13.8112Z" fill="#015738"/>
                                    </svg>
                                    показать все
                                </span>
                                <span class="show-less">
                                    скрыть
                                </span>
                            `

    tables.forEach(table => {
        const cells = table.querySelectorAll('td')
        let compressedСontentHeight = 0
        
        cells.forEach(cell => {
            let styles = window.getComputedStyle(cell)
            let cellLineHeight = parseFloat(styles["line-height"].replace(/[a-zA-Z]/g, ""))
            let cellContent = cell.innerHTML
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