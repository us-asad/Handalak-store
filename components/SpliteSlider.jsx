import React from 'react';
import { Splide, SplideTrack } from '@splidejs/react-splide';
import { CustomArrowIcon } from 'subcomponents/Icons';

export default function SplideSlider({ images, options, children, className }) {
  return (
    <div className={className}>
      <Splide
        hasTrack={false}
        options={options}
      >
        <div className="splide__arrows splide__arrows--ltr">
          <button
            className="splide__arrow splide__arrow--prev !opacity-100 left-0"
            type="button"
            aria-label="Previous slide"
            aria-controls="splide01-track"
          >
            <CustomArrowIcon />
          </button>
          <button
            className="splide__arrow splide__arrow--next !opacity-100 right-0"
            type="button"
            aria-label="Next slide"
            aria-controls="splide1-track"
          >
            <CustomArrowIcon isRightArrow={true} className="text-red" />
          </button>
        </div>
        <SplideTrack>
          {children}
        </SplideTrack>
        {images && (
          <ul className="splide__pagination main-slider-splide-pagination -bottom-[21px]">
            {images?.map((_,i) => (
              <li key={i}>
                <button className="splide__pagination__page" type="button" aria-controls={`splide01-slide0${i}`} aria-label={`Go to slide ${i}`}></button>
              </li>  
            ))}
          </ul>
        )}
      </Splide>
    </div>
  )
}


/*




*/