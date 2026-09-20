import { createElement } from 'react';
import { MessageSquare, Command } from 'lucide-react';
import { SettingsTabValues } from 'librechat-data-provider';
import { GearIcon, DataIcon, SpeechIcon, UserIcon, ExperimentIcon } from '~/components/svg';
import type { ComponentType, ReactNode } from 'react';
import type { TranslationKeys } from '~/hooks';

export type SettingsTab =
  | SettingsTabValues.GENERAL
  | SettingsTabValues.CHAT
  | SettingsTabValues.BETA
  | SettingsTabValues.COMMANDS
  | SettingsTabValues.SPEECH
  | SettingsTabValues.DATA
  | SettingsTabValues.ACCOUNT;

export type SectionId =
  | 'appearance'
  | 'layout'
  | 'sending'
  | 'messages'
  | 'conversations'
  | 'commands'
  | 'beta'
  | 'speech'
  | 'data'
  | 'danger'
  | 'profile'
  | 'security';

export interface SettingsContextValue {
  hasAccessToPrompts: boolean;
  hasAccessToMultiConvo: boolean;
  isLocalProvider: boolean;
  twoFactorEnabled: boolean;
}

export interface SettingEntry {
  id: string;
  tab: SettingsTab;
  section: SectionId;
  labelKey: TranslationKeys;
  keywords?: string[];
  Component: ComponentType;
  show?: (ctx: SettingsContextValue) => boolean;
  bare?: boolean;
}

export interface SectionMeta {
  id: SectionId;
  labelKey: TranslationKeys;
  danger?: boolean;
}

export interface TabMeta {
  id: SettingsTab;
  labelKey: TranslationKeys;
  icon: ReactNode;
  sections: SectionMeta[];
}

export const TABS: TabMeta[] = [
  {
    id: SettingsTabValues.GENERAL,
    labelKey: 'com_nav_setting_general',
    icon: createElement(GearIcon),
    sections: [
      { id: 'appearance', labelKey: 'com_ui_settings_section_appearance' },
      { id: 'layout', labelKey: 'com_ui_settings_section_layout' },
    ],
  },
  {
    id: SettingsTabValues.CHAT,
    labelKey: 'com_nav_setting_chat',
    icon: createElement(MessageSquare, { className: 'icon-sm', 'aria-hidden': true }),
    sections: [
      { id: 'sending', labelKey: 'com_ui_settings_section_sending' },
      { id: 'messages', labelKey: 'com_ui_settings_section_messages' },
      { id: 'conversations', labelKey: 'com_ui_settings_section_conversations' },
    ],
  },
  {
    id: SettingsTabValues.BETA,
    labelKey: 'com_nav_setting_beta',
    icon: createElement(ExperimentIcon),
    sections: [{ id: 'beta', labelKey: 'com_ui_settings_section_beta' }],
  },
  {
    id: SettingsTabValues.COMMANDS,
    labelKey: 'com_nav_commands',
    icon: createElement(Command, { className: 'icon-sm', 'aria-hidden': true }),
    sections: [{ id: 'commands', labelKey: 'com_ui_settings_section_commands' }],
  },
  {
    id: SettingsTabValues.SPEECH,
    labelKey: 'com_nav_setting_speech',
    icon: createElement(SpeechIcon, { className: 'icon-sm' }),
    sections: [{ id: 'speech', labelKey: 'com_ui_settings_section_speech' }],
  },
  {
    id: SettingsTabValues.DATA,
    labelKey: 'com_nav_setting_data',
    icon: createElement(DataIcon),
    sections: [
      { id: 'data', labelKey: 'com_ui_settings_section_data' },
      { id: 'danger', labelKey: 'com_ui_settings_section_danger_zone', danger: true },
    ],
  },
  {
    id: SettingsTabValues.ACCOUNT,
    labelKey: 'com_nav_setting_account',
    icon: createElement(UserIcon),
    sections: [
      { id: 'profile', labelKey: 'com_ui_settings_section_profile' },
      { id: 'security', labelKey: 'com_ui_settings_section_security' },
      { id: 'danger', labelKey: 'com_ui_settings_section_danger_zone', danger: true },
    ],
  },
];

export const SETTINGS_TAB_ORDER = TABS.map((tab) => tab.id);
