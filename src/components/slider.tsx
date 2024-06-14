import React from 'react';
import Slider from 'react-slick';
import slider1 from '../imgs/slider1.svg'
import '../pages/styels/slider.css';

const SliderComponent = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const items = [1, 2, 3, 4, 5, 6];

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {items.map((item, index) => (
                    <div key={index} className="card">
                        <img className="w-full h-full" src={slider1}/>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SliderComponent;
