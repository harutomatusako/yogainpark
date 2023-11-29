import { RootProviders } from '@/_components/root-providers'
import type { AppProps } from 'next/app'
import {AppHeader} from '@/_components/app-header'
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootProviders>
      <AppHeader />
      <Component {...pageProps} />
    </RootProviders>
  )
}