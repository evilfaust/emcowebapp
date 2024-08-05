import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface NewsDetail {
  id: number;
  name: string;
  discription: string; // Специально не меняем имя поля discription
  small_discription: string;
  images: string[];
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const NewsImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const CarouselContainer = styled.div`
  touch-action: pan-y; /* Предотвращает горизонтальную прокрутку */
`;

const Description = styled.p`
  margin-bottom: 15px;

  &.html-content {
    p {
      margin-bottom: 10px;
    }
    ul {
      margin-left: 20px;
    }
  }
`;

const NewsDetailComponent: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [newsItem, setNewsItem] = useState<NewsDetail | null>(null);

  useEffect(() => {
    if (id) {
      const newsId = parseInt(id, 10);
      if (!isNaN(newsId)) {
        axios.get(`https://jurikartiweb.ru/api/news/${newsId}/`)
          .then(response => {
            console.log('Ответ от API:', response.data);
            const formattedNewsItem: NewsDetail = {
              id: response.data.id,
              name: response.data.name,
              discription: response.data.discription,
              small_discription: response.data.small_discription,
              images: [
                response.data.images,
                response.data.images2,
                response.data.images3,
                response.data.images4,
                response.data.images5,
                response.data.images6,
              ].reduce((acc, val) => {
                if (val) {
                  acc.push(`https://jurikartiweb.ru${val}`);
                }
                return acc;
              }, []),
            };
            setNewsItem(formattedNewsItem);
          })
          .catch(error => {
            console.error('Ошибка при получении деталей новости:', error);
          });
      } else {
        console.error('Некорректный id для новости:', id);
      }
    }
  }, [id]);

  if (!newsItem) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2>{newsItem.name}</h2>
      {newsItem.images.length > 0 && (
        <CarouselContainer>
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            showStatus={false}
            showIndicators={true}
            showThumbs={false}
          >
            {newsItem.images.map((image, index) => (
              <div key={index}>
                <NewsImage src={image} alt={`Фото ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </CarouselContainer>
      )}
      <Description className="html-content" dangerouslySetInnerHTML={{ __html: newsItem.discription }} />
      <Description>{newsItem.small_discription}</Description>
    </Container>
  );
}

export default NewsDetailComponent;