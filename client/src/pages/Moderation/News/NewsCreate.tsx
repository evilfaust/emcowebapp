import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './NewsEdit.scss';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
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

const NewsCreate: React.FC = () => {
  const [name, setName] = useState('');
  const [smallDescription, setSmallDescription] = useState('');
  const [description, setDescription] = useState('');
  const [newImages, setNewImages] = useState<(File | null)[]>(Array(6).fill(null));
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'small_discription':
        setSmallDescription(value);
        break;
      case 'discription':
        setDescription(value);
        break;
    }
  };

  const handleImageChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const updatedImages = [...newImages];
      updatedImages[index] = e.target.files[0];
      setNewImages(updatedImages);
    }
  };

  const handleSaveNews = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('small_discription', smallDescription);
    formData.append('discription', description);

    newImages.forEach((image, index) => {
      if (image) {
        formData.append(`images${index === 0 ? '' : index + 1}`, image);
      }
    });

    try {
      const response = await axios.post('http://localhost:8000/api/news/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Ответ от сервера при создании новости:', response.data);
      navigate('/moderation/news');
    } catch (error) {
      console.error('Ошибка при создании новости:', error);
    }
  };

  return (
    <Container>
      <h2>Создать новость</h2>
      <Label htmlFor="name">Название</Label>
      <TextInput
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
      />
      <Label htmlFor="small_discription">Маленькое описание (оно будет отображаться в списке новостей)</Label>
      <TextArea
        name="small_discription"
        value={smallDescription}
        onChange={handleInputChange}
      />
      <Label htmlFor="discription">Текст</Label>
      <TextArea
        name="discription"
        value={description}
        onChange={handleInputChange}
      />
      <ImageContainer>
        {newImages.map((image, index) => (
          <ImageBlock key={index} onClick={() => document.getElementById(`fileInput${index}`)?.click()}>
            {image ? (
              <NewsImage
                src={URL.createObjectURL(image)}
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

export default NewsCreate;
