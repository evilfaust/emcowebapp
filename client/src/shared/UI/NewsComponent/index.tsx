import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { INewsProps } from "./types";

import "./index.scss";

export const NewsSmall: React.FC<INewsProps> = ({
  id,
  title,
  description,
  alt,
  image,
}) => {
  return (
    <Card key={id} sx={{ maxWidth: 345 }} className="card">
      <CardMedia component="img" image={image} alt={alt} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Card>
  );
};
