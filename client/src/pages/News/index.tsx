import { NewsSmall } from "shared/UI/NewsComponent";
import { news } from "./delete_after_connect_to_db";
import { Container, Grid } from "@mui/material";

import "./index.scss";

function News() {
  return (
    <Container maxWidth={"lg"}>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {news.map((news) => (
              <Grid key={news.id} item>
                <NewsSmall
                  id={news.id}
                  title={news.title}
                  description={news.description}
                  image={news.image}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default News;
