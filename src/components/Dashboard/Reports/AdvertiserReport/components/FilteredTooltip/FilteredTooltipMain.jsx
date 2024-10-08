import style from '../../AdvChartTable.module.scss'
import React from 'react'

function FilteredTooltipMain({ children, handleProfileClick }) {
  return (
    <>
      <div style={{ display: 'grid', marginLeft: '10px' }}>
        <div style={{ fontSize: '10px' }}>Выбрать период</div>
        <button className={style.profile__wrapper} onClick={handleProfileClick}>
          {/*<Filter style={{width: '20px', height: '20px'}}/>*/}
          Filter
        </button>
      </div>
      {children}
    </>
  )
}

export default FilteredTooltipMain
