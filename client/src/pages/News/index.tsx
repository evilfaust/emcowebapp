import { NewsSmall } from "shared/UI/NewsSmall";
import "./index.scss";

function News() {
  return (
    <div className="NewsLine flex">
      
      <ul>
        <li>
          <NewsSmall />
          <NewsSmall />
          <NewsSmall />
        </li>
        <li>
          <NewsSmall />
          <NewsSmall />
          <NewsSmall />
        </li>
      </ul>
    </div>
  );
}

export default News;
