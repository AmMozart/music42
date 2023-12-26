import { useEffect, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';

import styled from 'styled-components';

import {
  carouselItem,
  pictures,
  setShowCarousel,
} from './profilePictures.slice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { CloseButton } from '../../components';

const StyledCarouselPictures = styled.div`
  position: fixed;
  z-index: 99;
  top: 64px;
  left: 0;

  overflow: hidden;

  width: 100%;
  height: calc(100% - 64px);

  background: #000;

  & .carousel .slide img {
    height: 70vh;
    object-fit: contain;
  }

  & .carousel-root {
    height: 100%;
  }

  & .carousel-slider {
    height: 74%;
  }

  & .carousel .thumb img {
    max-height: 14vh;
  }
`;

const CarouselPictures = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const currentPictures = useAppSelector(pictures);

  const item = useAppSelector(carouselItem);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const closeCarousel = () => {
    dispatch(setShowCarousel({ isShow: false }));
  };

  return (
    <StyledCarouselPictures ref={carouselRef}>
      <CloseButton onClick={closeCarousel} />
      <Carousel infiniteLoop selectedItem={item}>
        {currentPictures.map((picture) => (
          <div key={picture.id}>
            <img src={`https://music42.com/${picture.url}/800`} />
          </div>
        ))}
      </Carousel>
    </StyledCarouselPictures>
  );
};

export default CarouselPictures;
