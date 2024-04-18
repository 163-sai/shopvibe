import React from 'react'
import { Link } from 'react-router-dom'
import style from "../../css/category.module.css"
import cat1 from '../../Images/cat1.jpeg'
import cat2 from '../../Images/content2.jpg'
import { Button } from 'react-bootstrap'

function Categories() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <div className={style.wholecat}>
        <h1>CATEGORY</h1>
        <div className={style.box}>
              <div className={style.cat1}>
                <img src={cat1} alt='electronics' />
                <Link className={style.boxs} to='/electronics'><Button variant='primary' style={{backgroundColor:'black', width:'fit-content'}}>ELECTRONICS</Button></Link> 
              </div> 
              <div className={style.cat1}>
                <img src={cat2} alt='fashion' />
                <Link className={style.boxs} to='/fashion'><Button variant='primary' style={{backgroundColor:'black', width:'fit-content'}}> FASHION</Button></Link> 
              </div> 
        </div>
    </div>
    </div>
  )
}

export default Categories