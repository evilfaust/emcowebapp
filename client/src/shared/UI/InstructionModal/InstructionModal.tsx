import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Box, Typography, Tabs, Tab, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import './InstructionModal.scss';
import { getCsrfToken } from '../../../services/csrf'; // Импортируем функцию для получения CSRF-токена

interface InstructionModalProps {
  open: boolean;
  handleClose: () => void;
}

interface Review {
  id: number;
  text: string;
  phone: string;
  recipient: string;
  created_at: string;
  approved: boolean;
  user: string;
}

const InstructionModal: React.FC<InstructionModalProps> = ({ open, handleClose }) => {
  const [tabValue, setTabValue] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewText, setReviewText] = useState('');
  const [phone, setPhone] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get<Review[]>('http://localhost:8000/api/reviews/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });
      setReviews(response.data.filter(review => review.approved));
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleRecipientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipient(event.target.value);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleReviewSubmit = async () => {
    try {
      const csrfToken = getCsrfToken();
      await axios.post('http://localhost:8000/api/reviews/', {
        text: reviewText,
        phone,
        recipient,
        user: userName,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          'X-CSRFToken': csrfToken, // Добавляем CSRF-токен в заголовок
        },
        withCredentials: true,
      });
      setMessage('Ваш отзыв на модерации');
      setReviewText('');
      setPhone('');
      setRecipient('');
      setUserName('');
      fetchReviews(); // Перезагружаем список отзывов после добавления нового
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="instruction-modal">
        <IconButton
          onClick={handleClose}
          className="close-button"
        >
          <CloseIcon />
        </IconButton>
        <Tabs value={tabValue} onChange={handleTabChange} className="tabs">
          <Tab label="О сайте" />
          <Tab label="Отзывы" />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
          </Typography>
          <Typography variant="body1" paragraph>
            Этот сайт помощник по выявлению несанкционированных свалок. Этот проект разработан при поддержке сотрудников и учеников детского технопарка EMCO TECH.
          </Typography>
          <Typography variant="body1" paragraph>
            Мы стремимся помочь обществу в борьбе с загрязнением окружающей среды, предоставляя удобные инструменты для маркировки и отчетности о несанкционированных свалках. С нашей помощью пользователи могут эффективно взаимодействовать с местными властями и экологическими организациями, чтобы быстро и эффективно устранять такие проблемы.
          </Typography>
          <Typography variant="body1" paragraph>
            Наши цели включают повышение осведомленности об экологических проблемах и содействие в их решении. Мы верим, что совместными усилиями можем сделать наш мир чище и лучше для будущих поколений.
          </Typography>
          <Box className="images-placeholder" />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography>
            Здесь вы можете прочитать отзывы и оставить свой отзыв.
          </Typography>
          <div className="review-form">
            <TextField
              label="Ваше имя"
              value={userName}
              onChange={handleUserNameChange}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Ваш телефон"
              value={phone}
              onChange={handlePhoneChange}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Адресат"
              value={recipient}
              onChange={handleRecipientChange}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Ваш отзыв"
              multiline
              rows={4}
              value={reviewText}
              onChange={handleReviewChange}
              variant="outlined"
              fullWidth
            />
            <Button
              onClick={handleReviewSubmit}
              variant="contained"
              color="primary"
              disabled={!reviewText.trim()}
              sx={{ mt: 2 }}
            >
              Оставить отзыв
            </Button>
          </div>
          {message && <Typography sx={{ mt: 2, color: 'green', fontWeight: 'bold' }}>{message}</Typography>}
          <div className="review-list">
            {reviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                  <PersonIcon className="review-icon" />
                  <Typography variant="body2" className="review-username">
                    {review.user}
                  </Typography>
                </div>
                <Typography variant="body1">{review.text}</Typography>
                <Typography variant="caption" color="textSecondary">{new Date(review.created_at).toLocaleString()}</Typography>
              </div>
            ))}
          </div>
        </TabPanel>
      </Box>
    </Modal>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="tabpanel">
          {children}
        </Box>
      )}
    </div>
  );
};

export default InstructionModal;
