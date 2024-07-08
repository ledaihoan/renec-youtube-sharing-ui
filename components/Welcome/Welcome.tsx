import { Title, Text, Anchor } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Mantine
        </Text>
      </Title>
      <Text c="black" ta="center" size="lg" maw={580} mx="auto" mt="xl">I&apos;m sorry as I have been doing another assessment of Silver8 at same
        time (1day earlier)
        and the process is so rush.
      </Text>
      <Text c="black" ta="center" size="lg" maw={580} mx="auto" mt="xl">I was believing that I can arrange time to complete both well
        so I did not inform about time arrangement issue. I know it&apos;s late now
        and it&apos;s all depend on your decision.
        If possible, please allow me to extend the deadline to end of 10th July 2024
      </Text>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This starter Next.js project includes a minimal setup for server side rendering, if you want
        to learn more on Mantine + Next.js integration follow{' '}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit index.tsx file.
      </Text>
    </>
  );
}
