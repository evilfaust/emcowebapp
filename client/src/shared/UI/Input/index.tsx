import { InputProps } from "./types"


export const Input: React.FC<InputProps> = ({ label, input }) => {

    return (
        <div>
            <label>
                {label}
                <input type={input} /> 
            </label>
        </div>
    )
}