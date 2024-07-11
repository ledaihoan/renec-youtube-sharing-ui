import { Button, Drawer, Group, useMantineColorScheme } from '@mantine/core';
import { IconAdjustments, IconMoon, IconSettings, IconSun } from '@tabler/icons-react';
import { useState } from 'react';

export function ColorSchemeToggle() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const getButtonColor = () => {
    switch (colorScheme) {
      case 'light': return 'yellow';
      case 'dark': return 'blue';
      case 'auto': return 'grape';
      default: return 'gray';
    }
  };

  return (
    <>
      <Button
        onClick={() => setDrawerOpened(true)}
        style={{
          position: 'fixed',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          zIndex: 1000,
        }}
        color={getButtonColor()}
      >
        <IconSettings size={24} />
      </Button>
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title="Settings"
        padding="xl"
        size="sm"
        position="right"
      >
        <Group justify="center" mt="xl">
          <Button
            variant={colorScheme === 'light' ? 'filled' : 'outline'}
            color={colorScheme === 'light' ? 'yellow' : 'gray'}
            onClick={() => setColorScheme('light')}
            leftSection={<IconSun size={18} />}
          >
            Light
          </Button>
          <Button
            variant={colorScheme === 'dark' ? 'filled' : 'outline'}
            color={colorScheme === 'dark' ? 'blue' : 'gray'}
            onClick={() => setColorScheme('dark')}
            leftSection={<IconMoon size={18} />}
          >
            Dark
          </Button>
          <Button
            variant={colorScheme === 'auto' ? 'filled' : 'outline'}
            color={colorScheme === 'auto' ? 'grape' : 'gray'}
            onClick={() => setColorScheme('auto')}
            leftSection={<IconAdjustments size={18} />}
          >
            Auto
          </Button>
        </Group>
      </Drawer>
    </>

  );
}
