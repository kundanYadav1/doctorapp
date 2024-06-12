import React, { useState, useEffect } from 'react';
import './SliderAndNews.css'
// import 'bootstrap/dist/css/bootstrap.min.css';


const SliderAndNews = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // useEffect for slides
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 6000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentSlide, slides.length]);

    return (
        <div className='sliderandnews'>
            <div className='left'>
                <img className="images" src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
            </div>
            <div className='right'>
                <div className='outerright'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste 
                        consectetur reprehenderit expedita doloribus a. Sequi quasi asperiores 
                        eligendi voluptas qui enim commodi excepturi! Modi corrupti quia, aliquam 
                        distinctio in commodi? Assumenda dignissimos dolores minus similique optio,
                         commodi ea. Ducimus, cupiditate?</p>
                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste 
                        consectetur reprehenderit expedita doloribus a. Sequi quasi asperiores 
                        eligendi voluptas qui enim commodi excepturi! Modi corrupti quia, aliquam 
                        distinctio in commodi? Assumenda dignissimos dolores minus similique optio,
                         commodi ea. Ducimus, cupiditate?</p>
                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste 
                        consectetur reprehenderit expedita doloribus a. Sequi quasi asperiores 
                        eligendi voluptas qui enim commodi excepturi! Modi corrupti quia, aliquam 
                        distinctio in commodi? Assumenda dignissimos dolores minus similique optio,
                         commodi ea. Ducimus, cupiditate?</p>
                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste 
                        consectetur reprehenderit expedita doloribus a. Sequi quasi asperiores 
                        eligendi voluptas qui enim commodi excepturi! Modi corrupti quia, aliquam 
                        distinctio in commodi? Assumenda dignissimos dolores minus similique optio,
                         commodi ea. Ducimus, cupiditate?</p>
                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste 
                        consectetur reprehenderit expedita doloribus a. Sequi quasi asperiores 
                        eligendi voluptas qui enim commodi excepturi! Modi corrupti quia, aliquam 
                        distinctio in commodi? Assumenda dignissimos dolores minus similique optio,
                         commodi ea. Ducimus, cupiditate?</p>
                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste 
                        consectetur reprehenderit expedita doloribus a. Sequi quasi asperiores 
                        eligendi voluptas qui enim commodi excepturi! Modi corrupti quia, aliquam 
                        distinctio in commodi? Assumenda dignissimos dolores minus similique optio,
                         commodi ea. Ducimus, cupiditate?</p>
                </div>
            </div>
        </div>
    )
}

export default SliderAndNews