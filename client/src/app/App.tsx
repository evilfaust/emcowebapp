import { CssBaseline, Fab } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingSpinner } from "shared/UI";
import { Footer, MobileNavigation, Navigation } from "widgets";
import AdminRoute from "shared/hooks/AdminRoute";
import Moderation from "pages/Moderation/index";
import { NotificationProvider } from "shared/notifications/NotificationContext";
import InstructionModal from "shared/UI/InstructionModal/InstructionModal";
import InfoIcon from '@mui/icons-material/Info'; // Иконка информации

const Main = React.lazy(() => import("pages/Main/index"));
const Map = React.lazy(() => import("pages/Map/index"));
const News = React.lazy(() => import("pages/News/index"));
const NewsDetail = React.lazy(() => import("pages/News/NewsDetail"));
const Register = React.lazy(() => import("pages/Register/index"));
const Login = React.lazy(() => import("pages/Login/index"));
const Profile = React.lazy(() => import("pages/Profile/index"));
const VideoGallery = React.lazy(() => import("pages/VideoGallery/VideoGallery"));
const TruckComplaints = React.lazy(() => import("pages/TruckComplaints/index"));

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const isNewUser = localStorage.getItem('isNewUser') !== 'false';
    if (isNewUser) {
      setIsModalOpen(true);
      localStorage.setItem('isNewUser', 'false');
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <NotificationProvider>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <CssBaseline />
        <Navigation />
        <InstructionModal open={isModalOpen} handleClose={handleCloseModal} />
        <Fab 
          color="primary" 
          aria-label="info" 
          onClick={handleOpenModal} 
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          <InfoIcon />
        </Fab>
        {/* <MobileNavigation /> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="map" element={<Map />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="video-gallery" element={<VideoGallery />} />
          <Route path="truck-complaints" element={<TruckComplaints />} />
          <Route path="moderation/*" element={<AdminRoute />}>
            <Route path="*" element={<Moderation />} />
          </Route>
          <Route path="*" element={<Main />} />
        </Routes>
        {/* <Footer /> */}
      </Suspense>
    </NotificationProvider>
  );
}

export default App;
