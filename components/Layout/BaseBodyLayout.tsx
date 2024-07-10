import { AppShell } from '@mantine/core';
import BodyHeader from '@/components/Layout/BodyHeader';

export default function BaseBodyLayout({ Component, pageProps }: any) {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <BodyHeader />
      </AppShell.Header>
      <AppShell.Main mt={{ base: 50, sm: 10 }}>
        <Component {...pageProps} />
      </AppShell.Main>
    </AppShell>
  );
}
