import React,{memo,forwardRef} from 'react'
import style from './Dropdown.module.css'

const Select = forwardRef((props,ref) => {
    const {categoryName,category,change}={...props}
  return (
    (category==="No data") ? <span className={style.larFont}>No data</span> :
     (category.length===0) ?  "" : 
     <select className={`${style.selCat} ${style.larFont}`} ref={ref} onChange={change}>
      <option key={`---Select ${categoryName}----`} value="No data">---Select {categoryName}----</option>
      {category.map(item => {
        return <option key={item}>{item}</option>;
      })}
    </select> 
  )
})

export default memo(Select)