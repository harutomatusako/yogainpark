import "@/app/globals.css";

import { RootProviders } from "@/_components/root-providers"
import Header from "@/app/_components/Header"

type Props = {
  children: React.ReactNode
}

export default function RootLayout(props: Props) {
  return (
    <html lang="ja">
      <body>
        <RootProviders>
          <Header />
          {props.children}
        </RootProviders>
      </body>
    </html>
  )
}
