import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Overview',
      collapsed: false,
      items: [
        'overview/index',
        'overview/account-models',
        'overview/how-it-works',
        'overview/security',
        'overview/use-cases',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/index',
        'getting-started/quickstart',
        'getting-started/authentication',
        'getting-started/conventions',
        'getting-started/test-funds',
        'getting-started/rest-api',
        'getting-started/server-sdk',
        'getting-started/custody-signing',
        'getting-started/client-sdk',
        'getting-started/react-hooks',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api-reference/index',
        'api-reference/vault-endpoints',
        'api-reference/accounts',
        'api-reference/transaction-endpoints',
        'api-reference/positions-earnings',
        'api-reference/analytics',
        'api-reference/treasury',
        'api-reference/webhook-endpoints',
        'api-reference/sandbox',
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
        'resources/core-flows',
        'resources/onboarding-checklist',
        'resources/versioning',
        'resources/glossary',
        'resources/changelog',
      ],
    },
  ],
};

export default sidebars;
