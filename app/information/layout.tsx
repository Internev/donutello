import Footer from "./Footer"
import Header from "./Header"

export default function AnimeLayout({
  children,
  modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      {modal}
      <Footer />
    </>
  )
}