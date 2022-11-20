import { Carousel } from 'antd';
import React from 'react';
import './index.scss';

// Do cả chương trình chỉ có 1 list carousel
// Nên lưu thẳng vào đây để đỡ tốn chi phí query
const list = [
  'https://res.cloudinary.com/mang013022002/image/upload/v1668412964/SaleOff/carousels/a1_qzvez4.png',
  'https://res.cloudinary.com/mang013022002/image/upload/v1667805799/SaleOff/carousels/iphone-13-pro-max-case_o3d7t6.jpg',
  'https://res.cloudinary.com/mang013022002/image/upload/v1668413465/SaleOff/carousels/iphone-12-banner-1_jnkyvn_2_ocjtpb.png',
  'https://res.cloudinary.com/mang013022002/image/upload/v1666770395/SaleOff/carousels/popupimage-1676288705_da5ys9.jpg',
  'https://res.cloudinary.com/mang013022002/image/upload/v1668413786/SaleOff/carousels/sale11_w8yxdi.png',
  'https://res.cloudinary.com/mang013022002/image/upload/v1667555786/SaleOff/carousels/carcrycbe02_rpqqxv.webp',
  'https://res.cloudinary.com/mang013022002/image/upload/v1667555785/SaleOff/carousels/carvhqqe103_vjlcrq.webp',
  'https://res.cloudinary.com/mang013022002/image/upload/v1667555786/SaleOff/carousels/carousels04_ugkxff.webp',
  'https://res.cloudinary.com/mang013022002/image/upload/v1667805798/SaleOff/carousels/sub-bannerArtboard-1_hsve4g.jpg',
  'https://res.cloudinary.com/mang013022002/image/upload/v1667805798/SaleOff/carousels/collection-banner_iPhone_Cases_Desktop_ponxuq.jpg',
  'https://res.cloudinary.com/mang013022002/image/upload/v1667805797/SaleOff/carousels/iphone-evolution-blog-banner_wibvs9.jpg',

];

function SaleOff() {
  return (
    <Carousel className="Sale-Off" autoplay>
      {list.map((item, index) => (
        <img className="Sale-Off-img" src={item} key={index} />
      ))}
    </Carousel>
  );
}

export default SaleOff;
