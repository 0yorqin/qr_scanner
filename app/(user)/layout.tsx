import Header from "@/components/Header";

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="lg:max-w-[1200px] md:max-w-[900px] mx-auto">
      <Header />
      {children}
      {modal}
    </div>
  );
}
