import React from 'react'
import { Link } from 'react-router-dom'
import style from "../../css/category.module.css"
import cat1 from '../../Images/mobile.jpg'
import cat2 from '../../Images/laptop.jpg'
import cat3 from '../../Images/smartwatch.jpg'

import { Container, Text ,Title} from '@mantine/core';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ban from '../../Images/homebanner.webp';
import ban1 from '../../Images/homebanner1.webp';
import ban2 from '../../Images/homebanner2.webp';
import ban3 from '../../Images/homebanner3.webp';
import { Button } from 'react-bootstrap'

const banners = [ban,ban1, ban2, ban3];

function Electronics() {

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
    <>
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Container>
    <div className={style.wholecat}>
        <h1>ELECTRONICS</h1>
        <div className={style.box}>
              <div className={style.cat1}>
                <img src={cat1} alt='mobile'/>
                <Link className={style.boxs} to='/mobileproducts'><Button variant='primary' style={{backgroundColor:'black', width:'fit-content'}}> MOBILE</Button></Link> 
              </div> 
              <div className={style.cat1}>
                <img src={cat2} alt='laptop'/>
                <Link className={style.boxs} to='/laptopproducts'><Button variant='primary' style={{backgroundColor:'black', width:'fit-content'}}> LAPTOP</Button></Link> 
              </div> 
              <div className={style.cat1}>
                <img src={cat3} alt='smartwatch'/>
                <Link className={style.boxs} to='/smartwatchproducts'><Button variant='primary' style={{backgroundColor:'black', width:'fit-content'}}> SMART WATCH</Button></Link> 
              </div> 
        </div>
    </div>
    </Container>
    <Container style={{ marginTop: '50px', textAlign: 'center' }}>
      <Text align="center">Explore Mens Fashion</Text>
      <Link to='/menfashion'>
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index}>
            <img src={banner} alt={`Banner ${index}`} style={{ width: '100%', maxHeight: '700px', objectFit: 'cover' }} />
          </div>
        ))}
      </Slider>
      </Link>
      </Container>
    </div>
    </>
  )
}

export default Electronics
