import React from 'react'
import { Link } from 'react-router-dom'
import style from "../../css/category.module.css"
import cat1 from '../../Images/menfashion.jpg'
import cat2 from '../../Images/womenfashion.jpeg'
import cat3 from '../../Images/kidfashion.jpeg'

import { Container, Text ,Title} from '@mantine/core';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ban7 from '../../Images/smartwatch.jpg'
import ban8 from '../../Images/mobile.jpg'
import ban9 from '../../Images/cat1.jpeg'
import { Button } from 'react-bootstrap'

const mobilebanners = [ban7, ban8, ban9];

function Fashion() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear'
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <div className={style.wholecat}>
        <h1>FASHION</h1>
        <div className={style.box}>
              <div className={style.cat1}>
                <img src={cat1} alt='men'/>
                <Link className={style.boxs} to='/menfashion'><Button variant='primary' style={{backgroundColor:'black', width:'fit-content'}}>MEN</Button></Link> 
              </div> 
              <div className={style.cat1}>
                <img src={cat2} alt='women'/>
                <Link className={style.boxs} to='/womenfashion'><Button variant='primary' style={{backgroundColor:'black', width:'fit-content'}}>WOMEN</Button></Link> 
              </div> 
              <div className={style.cat1}>
                <img src={cat3} alt='kids'/>
                <Link className={style.boxs} to='/kidfashion'><Button variant='primary' style={{backgroundColor:'black', width:'fit-content'}}>KIDS</Button></Link> 
              </div> 
        </div>
    </div>
    <Container style={{ marginTop: '50px', textAlign: 'center' }}>
      <Text align="center">Explore Electronics!</Text>
    <Link to='/electronics'>
      <Slider {...settings}>
        {mobilebanners.map((banner, index) => (
          <div key={index}>
            <img src={banner} alt={`Banner ${index}`} style={{ width: '100%', maxHeight: '700px', objectFit: 'cover' }} />
          </div>
        ))}
      </Slider>
      </Link>

    </Container>
    </div>
  )
}

export default Fashion
