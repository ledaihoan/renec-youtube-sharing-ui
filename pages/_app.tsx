import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { theme } from '@/theme';
import { HtmlHead } from '@/components/Layout/HtmlHead';
import BaseBodyLayout from '@/components/Layout/BaseBodyLayout';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <MantineProvider theme={theme}>
          <HtmlHead />
          <BaseBodyLayout Component={Component} pageProps={pageProps} />
        </MantineProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
