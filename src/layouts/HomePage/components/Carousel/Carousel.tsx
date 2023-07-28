import "./Carousel.css";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../../util/urls";
import { ShirtModel } from "../../../../model/ShirtModel";

import { Navigation } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { CarouselShirt } from "../CarouselShirt/CarouselShirt";
import { SpinnerLoading } from "../../../Utils/SpinnerLoading/SpinnerLoading";
import { Link } from "react-router-dom";

export const Carousel = () => {
  const [shirts, setShirts] = useState<ShirtModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchShirts = async () => {
      const response = await fetch(`${BACKEND_URL}/shirts?page=0&size=9`);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseJson = await response.json();
      const responseData = await responseJson._embedded.shirts;
      setShirts(responseData);
      setIsLoading(false);
    };

    fetchShirts().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <SpinnerLoading />
    );
  }

  if (httpError) {
    return (
      <div className="http-error-container mobile-container">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="carousel">
      {/* Desktop */}
      <div className="desktop">
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          speed={1000}
          loop
          navigation
        >
          <SwiperSlide>
            <div className="carousel-slide">
              {shirts.slice(0, 3).map(shirt => <CarouselShirt shirt={shirt} key={shirt.id} />)}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="carousel-slide">
              {shirts.slice(3, 6).map(shirt => <CarouselShirt shirt={shirt} key={shirt.id} />)}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="carousel-slide">
              {shirts.slice(6, 9).map(shirt => <CarouselShirt shirt={shirt} key={shirt.id} />)}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Mobile */}
      <div className="mobile mobile-container">
      <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          speed={1000}
          loop
          navigation
          onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide>
            <div className="carousel-slide">
              <CarouselShirt shirt={shirts[0]} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="carousel-slide">
              <CarouselShirt shirt={shirts[1]} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="carousel-slide">
              <CarouselShirt shirt={shirts[2]} />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="carousel-view-more-container">
        <Link className="btn carousel-view-more-btn" to="clothing">View More</Link>
      </div>
    </div>
  );
}