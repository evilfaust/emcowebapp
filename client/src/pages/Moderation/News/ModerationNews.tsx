import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NewsSmall } from "shared/UI/NewsComponent";
import { Container, Grid } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import "./ModerationNews.scss";

interface News {
  id: number;
  name: string;
  discription: string;
  images: string[];
  small_discription: string;
}

const ModerationNews: React.FC = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/news/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });
      const formattedNews = response.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        small_discription: item.small_discription,
        discription: item.discription,
        images: [
          item.images,
          item.images2,
          item.images3,
          item.images4,
          item.images5,
          item.images6,
        ].reduce((acc: string[], val: string | undefined) => {
          if (val) {
            acc.push(`http://localhost:8000${val}`); // Формирование правильного пути к изображениям
          }
          return acc;
        }, []),
      }));
      setNewsList(formattedNews);
      setLoading(false);
    } catch (error) {
      setError('Ошибка при загрузке новостей');
      setLoading(false);
    }
  };

  const handleDeleteNews = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/news/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });
      setNewsList(newsList.filter(news => news.id !== id));
    } catch (error) {
      setError('Ошибка при удалении новости');
    }
  };

  const handleEditNews = (id: number) => {
    navigate(`/moderation/news/${id}/edit`);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container maxWidth="lg" className="moderation-news-container">
      <Grid container spacing={3} justifyContent="center">
        {newsList.map((newsItem) => (
          <Grid key={newsItem.id} item xs={12} className="news-item">
            <Link to={`/news/${newsItem.id}`} style={{ textDecoration: 'none' }}>
              <NewsSmall
                id={newsItem.id}
                title={newsItem.name}
                description={newsItem.small_discription}
                image={newsItem.images.length > 0 ? newsItem.images[0] : ''}
              />
            </Link>
            <div className="news-actions">
              <button onClick={() => handleEditNews(newsItem.id)}>Редактировать</button>
              <button onClick={() => handleDeleteNews(newsItem.id)}>Удалить</button>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ModerationNews;
