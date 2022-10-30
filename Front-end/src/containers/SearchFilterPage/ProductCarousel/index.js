import { Carousel } from 'antd';
import React from 'react';
import './index.scss';

// Do cả chương trình chỉ có 1 list carousel
// Nên lưu thẳng vào đây để đỡ tốn chi phí query
const list = [
  'https://res.cloudinary.com/dgewhp8gl/image/upload/v1666491673/products/EXB-500k-380x200_b9cz1l.png',
  'https://res.cloudinary.com/dgewhp8gl/image/upload/v1666491673/products/VNPay-Toan-bo-san-pham-380x200_bhipaq.png',
  'https://res.cloudinary.com/dgewhp8gl/image/upload/v1666491647/products/VnPaylaptop-380x200_py2nla.png',
  'https://res.cloudinary.com/dgewhp8gl/image/upload/v1666491647/products/VNPayAppleWatch-380x200_fhi2lg.png',
];

function ProductCarousel() {
  return (
    <Carousel className="Product-Carousel m-tb-24 bor-rad-8" autoplay>
      {list.map((item, index) => (
        <img
          className="Product-Carousel-img bor-rad-8"
          src={item}
          key={index}
        />
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
