import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type DefaultProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export interface IInputProps extends DefaultProps {
    id?: string;
    label?: string;
    
}