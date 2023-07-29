type Props = {
  children: React.ReactNode;
};

export default function PageWrapper({ children }: Props) {
  return (
    <main className="h-screen max-h-[100dvh] w-screen flex flex-col items-center my-auto">
      {children}
    </main>
  );
}
