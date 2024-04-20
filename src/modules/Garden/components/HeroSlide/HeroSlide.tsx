import classNames from "classnames/bind";
import "./HeroSlide.scss";

import "swiper/css";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Button from "~/components/Button";
import imgSlide1a from "~/access/images/imgSlide1a.png";
import imgSlide1b from "~/access/images/imgSlide1b.png";
import imageSlide1 from "~/access/images/imageSlide1.png";
import image8 from "~/access/images/image8.png";


function HeroSlide() {
  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
      >
        <SwiperSlide>
          <HeroSlideItem
            title={"Sen Đá Giva"}
            desc={
              "Sen Đá Giva (tên khoa học: Echeveria Agavoides) có màu xanh tươi đặc trưng, đầu lá như những chiếc gai nhọn mọc xen kẽ nhau một cách cân đối. Lá cây mọc đều xung quanh gốc, xếp xòe ra rất đẹp…"
            }
            image={imgSlide1a}
            image2={imgSlide1b}
          />
        </SwiperSlide>

        <SwiperSlide>
          <HeroSlideItem
            title={"Sen Đá Thái"}
            desc={
              "Sen Đá Thái (tên khoa học: Echeveria Blue Atoll) có nguồn gốc từ Mexico. Hiện nay cây rất được ưa chuộng trồng tại Việt Nam bởi đặc tính dễ thích nghi với môi trường và đặc điểm hình dáng thu hút…"
            }
            image={imageSlide1}
          />
        </SwiperSlide>

        <SwiperSlide>
          <HeroSlideItem
            title={"Hoa cầm tay cô dâu Chân Tình"}
            desc={
              "Có khoảng khắc nào hạnh phúc hơn giấy phút chàng nói tiếng tỏ tình? Nếu có chỉ có thể là lúc chàng nói lời cầu hôn, là hạnh phúc vỡ òa. Cảm xúc của cô gái đón nhận tình yêu trong khoảng khắc cầu hôn là cảm ứng cho thiết kế hoa Chân Tình."
            }
            image={image8}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

type propsHeroSileItem = {
  title: string;
  desc: string;
  image: string;
  image2?: string;
};

function HeroSlideItem({ title, desc, image, image2 }: propsHeroSileItem) {
  return (
    <div className="container">
      <div className="hero-slide_item">
        <div className="hero-slide_item__content">
          <h1 className="hero-slide_item__content__title">{title}</h1>
          <div className="hero-slide_item__content__desc">{desc}</div>
          <Button to="/products" primary large className="hero-slide_item__content__btn-order">
            Mua ngay
          </Button>
        </div>

        <div className="hero-slide_item__content__image">
          {image2 && <img src={image2} alt="image" className="image2"/>}
          <img src={image} alt="image" className="image1"/>
        </div>
      </div>
    </div>
  );
}

export default HeroSlide;
