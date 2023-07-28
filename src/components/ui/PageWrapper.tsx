type Props = {
  children: React.ReactNode;
};

export default function PageWrapper({ children }: Props) {
  return (
    <main className="h-screen w-screen flex flex-col items-center my-auo">
      {children}
    </main>
  );
}
