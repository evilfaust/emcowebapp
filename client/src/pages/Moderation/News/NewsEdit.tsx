import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './NewsEdit.scss';

interface News {
  id: number;
  name: string;
  small_discription: string;
  discription: string;
  images: string | null;
  images2?: string;
  images3?: string;
  images4?: string;
  images5?: string;
  images6?: string;
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ImageBlock = styled.div`
  position: relative;
  width: calc(33.33% - 10px);
  height: 200px;
  background: #f0f0f0;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const NewsImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const AddImage = styled.div`
  font-size: 24px;
  color: #ccc;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const NewsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [newsItem, setNewsItem] = useState<News | null>(null);
  const [newImages, setNewImages] = useState<(File | null)[]>(Array(6).fill(null));
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchNews(id);
    }
  }, [id]);

  const fetchNews = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/news/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });
      setNewsItem(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке новости:', error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewsItem({ ...newsItem!, [name]: value });
  };

  const handleImageChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const updatedImages = [...newImages];
      updatedImages[index] = e.target.files[0];
      setNewImages(updatedImages);
    }
  };

  const handleSaveNews = async () => {
    if (newsItem) {
      const formData = new FormData();
      formData.append('name', newsItem.name);
      formData.append('small_discription', newsItem.small_discription);
      formData.append('discription', newsItem.discription);

      newImages.forEach((image, index) => {
        if (image) {
          formData.append(`images${index === 0 ? '' : index + 1}`, image);
        }
      });

      try {
        const response = await axios.patch(`http://localhost:8000/api/news/${newsItem.id}/`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Ответ от сервера при сохранении новости:', response.data);
        navigate('/moderation/news');
      } catch (error) {
        console.error('Ошибка при сохранении новости:', error);
      }
    }
  };

  if (!newsItem) {
    return <div>Загрузка...</div>;
  }

  const imagesArray = [
    newsItem.images,
    newsItem.images2,
    newsItem.images3,
    newsItem.images4,
    newsItem.images5,
    newsItem.images6,
  ];

  return (
    <Container>
      <h2>Редактировать новость</h2>
      <Label htmlFor="name">Название</Label>
      <TextInput
        type="text"
        name="name"
        value={newsItem.name}
        onChange={handleInputChange}
      />
      <Label htmlFor="small_discription">Маленькое описание (оно будет отображаться в списке новостей)</Label>
      <TextArea
        name="small_discription"
        value={newsItem.small_discription}
        onChange={handleInputChange}
      />
      <Label htmlFor="discription">Текст</Label>
      <TextArea
        name="discription"
        value={newsItem.discription}
        onChange={handleInputChange}
      />
      <ImageContainer>
        {imagesArray.map((image, index) => (
          <ImageBlock key={index} onClick={() => document.getElementById(`fileInput${index}`)?.click()}>
            {image || newImages[index] ? (
              <NewsImage
                src={
                  newImages[index]
                    ? URL.createObjectURL(newImages[index]!)
                    : image
                      ? `http://localhost:8000${image}`
                      : ''
                }
                alt={`image-${index}`}
              />
            ) : (
              <AddImage>+</AddImage>
            )}
            <input
              id={`fileInput${index}`}
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => handleImageChange(index, e)}
            />
          </ImageBlock>
        ))}
      </ImageContainer>
      <button onClick={handleSaveNews}>Сохранить</button>
      <button onClick={() => navigate('/moderation/news')}>Отмена</button>
    </Container>
  );
};

export default NewsEdit;
