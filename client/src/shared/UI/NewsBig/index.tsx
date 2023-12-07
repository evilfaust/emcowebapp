import "./index.scss"
import { NewsImg } from "shared/UI/NewsIMG";
import { NewsText } from "shared/UI/NewsText";
import {NewsTitle} from 'shared/UI/NewsTitle'

export const BigNews = () =>{
    return(
        <div className="BigBoard">
            <NewsTitle/>
            <NewsImg/>
            <NewsText/>
        </div>
    )
}