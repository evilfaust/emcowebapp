export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "second" | "outlined";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
