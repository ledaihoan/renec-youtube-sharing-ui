import { AppShell } from '@mantine/core';
import BodyHeader from '@/components/Layout/BodyHeader';

export default function BaseBodyLayout({ Component, pageProps }: any) {
  return (
    <AppShell>
      <AppShell.Header h={60}>
        <BodyHeader />
      </AppShell.Header>
      <AppShell.Main>
        <Component {...pageProps} />
      </AppShell.Main>
    </AppShell>
  );
}
