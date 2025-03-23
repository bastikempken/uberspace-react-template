interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="border-solid border-1 p-2 cursor-pointer hover:bg-sky-50"
    >
      {children}
    </button>
  );
};

export default Button;
