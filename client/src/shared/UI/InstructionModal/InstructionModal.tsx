// src/shared/UI/InstructionModal.tsx
import React, { useState } from 'react';
import { Modal, Box, Typography, Tabs, Tab, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './InstructionModal.scss';

interface InstructionModalProps {
  open: boolean;
  handleClose: () => void;
}

const InstructionModal: React.FC<InstructionModalProps> = ({ open, handleClose }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
          <Tab label="Техподдержка" />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <Typography>
            Здесь вы можете найти информацию о нашем сайте.
            {/* Добавьте ваш текст о сайте */}
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography>
            Здесь вы можете прочитать отзывы.
            {/* Добавьте ваш текст отзывов */}
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Typography>
            Здесь вы можете найти информацию о техподдержке.
            {/* Добавьте ваш текст техподдержки */}
          </Typography>
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
