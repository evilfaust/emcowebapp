import "./index.scss"
import NewsImage from "shared/images/main-mobile.png";


export const NewsImg = () =>{
    return(
        <div className="NewsImg">
            <img src={NewsImage} alt="" />
        </div>
    )
}