import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'TBook RWA Platform',
  tagline: 'Embedded real-world-asset investing for fintechs — one API, webhooks, your keys',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://tbook-dev.github.io',
  baseUrl: '/tbook-docs/',

  organizationName: 'tbook-dev',
  projectName: 'tbook-docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    announcementBar: {
      id: 'v1_draft_contract',
      content:
        'v1 Draft — Integration Contract under review. Contents are normative for the upcoming sandbox release; the API is not yet live. Feedback via your TBook contact.',
      backgroundColor: '#fff8e6',
      textColor: '#5c4400',
      isCloseable: false,
    },
    colorMode: {
      disableSwitch: true,
      defaultMode: 'light',
    },
    navbar: {
      title: 'TBook RWA Platform',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/tbook-dev',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      copyright: `Copyright © ${new Date().getFullYear()} TBook. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      additionalLanguages: ['bash', 'json', 'typescript'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
