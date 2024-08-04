import React, { useState } from 'react';
import { Modal, Box, Typography, Tabs, Tab, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import './InstructionModal.scss';

interface InstructionModalProps {
  open: boolean;
  handleClose: () => void;
}

interface Review {
  text: string;
  date: string;
  userName: string;
}

const InstructionModal: React.FC<InstructionModalProps> = ({ open, handleClose }) => {
  const [tabValue, setTabValue] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewText, setReviewText] = useState('');
  const [userName, setUserName] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(event.target.value);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleReviewSubmit = () => {
    const newReview = {
      text: reviewText,
      date: new Date().toLocaleString(),
      userName: userName || 'Аноним' // Используем "Аноним", если имя пользователя не указано
    };
    setReviews([...reviews, newReview]);
    setReviewText('');
    setUserName('');
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
          <Typography>
            Здесь вы можете найти информацию о нашем сайте.
            {/* Добавьте ваш текст о сайте */}
          </Typography>
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
          <div className="review-list">
            {reviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                  <PersonIcon className="review-icon" />
                  <Typography variant="body2" className="review-username">
                    {review.userName}
                  </Typography>
                </div>
                <Typography variant="body1">{review.text}</Typography>
                <Typography variant="caption" color="textSecondary">{review.date}</Typography>
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
