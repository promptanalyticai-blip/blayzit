interface Props {
  children: React.ReactNode;
  disabled?: boolean;
}

export default function Button({ children, disabled }: Props) {
  return (
    <button className="btn-premium" disabled={disabled}>
      {children}
    </button>
  );
}
