import "./index.scss"
import { NewsImg } from "shared/UI/NewsIMG";
import { NewsText } from "shared/UI/NewsText";
import { NewsTitle } from "shared/UI/NewsTitle";

function NewsLetter() {
    return (
        <div>
            <NewsTitle/>
            <NewsImg/>
            <NewsText/>
        </div>
    )
}

export default NewsLetter