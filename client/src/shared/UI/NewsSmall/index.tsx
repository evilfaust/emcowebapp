import "./index.scss";
import NewsImage from "shared/images/main-mobile.png";
import { Card } from "react-bootstrap";

export const NewsSmall = () => {
  return (
    <Card>
      <Card.Img variant="top" src={NewsImage} />

      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        {
          "аввввввввввввввввввввавввввввввввввввввввваввввввввввввввввввввавввввввввввввввввввв"
        }
      </Card.Text>
    </Card>
  );
};
