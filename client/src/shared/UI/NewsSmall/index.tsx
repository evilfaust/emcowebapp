import "./index.scss";
import NewsImage from "shared/images/main-mobile.png";
import { Card } from "react-bootstrap";
import { INewsProps } from "./types";
export const NewsSmall: React.FC<INewsProps> = ({
  id,
  title,
  description,
  image,
}) => {
  return (
    <Card key={id}>
      <Card.Img variant="top" src={image} />

      <Card.Title>{title}</Card.Title>
      <Card.Text>{description}</Card.Text>
    </Card>
  );
};
