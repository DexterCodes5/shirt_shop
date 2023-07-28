import { useEffect } from "react";
import { Carousel } from "./components/Carousel/Carousel";
import { CustomerService } from "./components/CustomerService/CustomerService";
import { ExploreTopShirts } from "./components/ExploreTopShirts/ExploreTopShirts";
import { Hero } from "./components/Hero/Hero";

export const HomePage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ExploreTopShirts />
      <div className="container">
        <Carousel />
        <Hero />
        <CustomerService />
      </div>
    </div>
  );
}