/// <reference types="react-scripts" />

import 'react-i18next';
import { resources } from './utils/i18n';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: typeof resources;
  }
} 