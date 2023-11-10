import { CssBaseline } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingSpinner } from "shared/UI";
import { Footer, MobileNavigation, Navbar } from "widgets";
import { Counter } from "pages/Main/components/counter/ui";
import axios from 'axios';

const Main = React.lazy(() => import("pages/Main/index"));
const Map = React.lazy(() => import("pages/Map/index"));
const News = React.lazy(() => import("pages/News/index"));
const Newsletter = React.lazy(() => import("pages/Newsletter/index"));

// Тут мы обьявляем джсону, что такие ваще есть
interface YouTubeVideo {
  title: string;
  channel: string;
}
function App() {
  const [details, setDetails] = useState<YouTubeVideo[]>([]);

  //тут мы тоже показываем, что надо брать данные с джанго сервака
  useEffect(() => {
    let data;
    axios.get('http://localhost:8000')
      .then(res => {
        data = res.data;
        setDetails(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (



    //ну вот собсна и сам код, который отображает выводы джанго
    //проблема только одна - мне так везде писать??? Яж повешусь...
    //Крч главное, что работает...
    <div>
      <header>Данные из Джанго</header>
      <hr></hr>
      {details.length > 0 ? (
        details.map((output, id) => (
          <div key={id}>
            <div>
              <h2>{output.title}</h2>
              <p>{output.channel}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}








      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Navbar />
        <MobileNavigation />
        <CssBaseline />
        <Counter />
        <Footer />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/news" element={<News />}>
            <Route path=":newsId" element={<Newsletter />} />
          </Route>
          <Route path="/map" element={<Map />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
