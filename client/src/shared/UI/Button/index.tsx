import { InputProps } from "./types"

export const Button: React.FC<InputProps> = ({ button, input }) => {
    return (
        <div>        <button>
            {button}
            <input type={input} />
        </button>
        </div>)


}