import { NewsSmall } from "shared/UI/NewsSmall";
import "./index.scss";
import { news } from "./delete_after_connect_to_db";
import { Row, Col, Container } from "react-bootstrap";

function News() {
  return (
    <Container>
      <Row>
        {news.map((news) => (
          <Col xs={12} md={6} lg={4} xl={4} xxl={4}>
            <NewsSmall
              id={news.id}
              title={news.title}
              description={news.description}
              image={news.image}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default News;
