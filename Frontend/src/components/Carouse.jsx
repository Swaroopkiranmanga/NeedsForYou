

import Carousel from 'react-bootstrap/Carousel';

function DarkVariantExample() {
  return (
    <Carousel data-bs-theme="dark"  data-ride="carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://ideogram.ai/assets/image/lossless/response/JxSWTd9XRvS3p_aGx9VaGA"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5></h5>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://ideogram.ai/assets/image/lossless/response/dBVvPLFrSUuPmOaiCjbaeQ"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Exclusive Products</h5>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://ideogram.ai/assets/image/lossless/response/j3xLuH76Q_iQCxGXNxazow"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Featured Products</h5>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;