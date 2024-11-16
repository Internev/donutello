import Footer from "./Footer"
import Header from "./Header"
import { auth } from '@/auth'

export default async function AnimeLayout({
  children,
  modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const session = await auth()

  return (
    <>
      <Header session={session} />
      {children}
      {modal}
      <Footer />
    </>
  )
}