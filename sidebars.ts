import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Overview',
      collapsed: false,
      items: [
        'overview/index',
        'overview/how-it-works',
        'overview/security',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/index',
        'getting-started/client-sdk',
        'getting-started/react-hooks',
        'getting-started/rest-api',
        'getting-started/server-sdk',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api-reference/index',
        'api-reference/vault-endpoints',
        'api-reference/transaction-endpoints',
        'api-reference/webhook-endpoints',
      ],
    },
    {
      type: 'category',
      label: 'Webhooks',
      items: [
        'webhooks/index',
        'webhooks/event-types',
        'webhooks/retry-policy',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        'resources/versioning',
        'resources/migration',
        'resources/glossary',
      ],
    },
  ],
};

export default sidebars;
