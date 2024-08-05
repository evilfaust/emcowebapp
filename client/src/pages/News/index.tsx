import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NewsSmall } from "shared/UI/NewsComponent";
import { Container, Grid } from "@mui/material";
import { Link } from 'react-router-dom';
import "./index.scss";

interface News {
  id: number;
  name: string;
  discription: string;
  images: string[];
  small_discription: string;
}

function News() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    axios.get('https://jurikartiweb.ru/api/news/')
      .then(response => {
        console.log('Ответ от API:', response.data);
        const formattedNews = response.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          small_discription: item.small_discription,
          images: [
            item.images,
            item.images2,
            item.images3,
            item.images4,
            item.images5,
            item.images6,
          ].reduce((acc: string[], val: string | undefined) => {
            if (val) {
              acc.push(`https://jurikartiweb.ru${val}`); // Добавление правильного URL URL
            }
            return acc;
          }, []),
        }));
        formattedNews.sort((a: News, b: News) => b.id - a.id);
        setNews(formattedNews);
      })
      .catch(error => {
        console.error('Ошибка при получении новостей:', error);
      });
  }, []);

  console.log('Список новостей:', news);

  return (
    <Container maxWidth="lg" className="news-container">
      <Grid container spacing={3} justifyContent="center">
        {news.map((newsItem) => (
          <Grid key={newsItem.id} item xs={12} className="news-item">
            <Link to={`/news/${newsItem.id}`} style={{ textDecoration: 'none' }}>
              <NewsSmall
                id={newsItem.id}
                title={newsItem.name}
                description={newsItem.small_discription}
                image={newsItem.images.length > 0 ? newsItem.images[0] : ''}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default News;
