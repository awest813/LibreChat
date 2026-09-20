import { SettingsTabValues } from 'librechat-data-provider';
import type { SettingEntry } from './types';
import DisplayUsernameMessages from '../SettingsTabs/Account/DisplayUsernameMessages';
import EnableTwoFactorItem from '../SettingsTabs/Account/TwoFactorAuthentication';
import ImportConversations from '../SettingsTabs/Data/ImportConversations';
import BackupCodesItem from '../SettingsTabs/Account/BackupCodesItem';
import FontSizeSelector from '../SettingsTabs/Chat/FontSizeSelector';
import DeleteAccount from '../SettingsTabs/Account/DeleteAccount';
import { ForkSettings } from '../SettingsTabs/Chat/ForkSettings';
import ChatDirection from '../SettingsTabs/Chat/ChatDirection';
import { DeleteCache } from '../SettingsTabs/Data/DeleteCache';
import { RevokeAllKeys } from '../SettingsTabs/Data/RevokeAllKeys';
import { ClearChats } from '../SettingsTabs/Data/ClearChats';
import SharedLinks from '../SettingsTabs/Data/SharedLinks';
import CodeArtifacts from '../SettingsTabs/Beta/CodeArtifacts';
import Avatar from '../SettingsTabs/Account/Avatar';
import ArchivedChats from '../SettingsTabs/General/ArchivedChats';
import UiScaleSelector from '../SettingsTabs/General/UiScaleSelector';
import SlashCommandSwitch from '../SettingsTabs/Commands/SlashCommandSwitch';
import PlusCommandSwitch from '../SettingsTabs/Commands/PlusCommandSwitch';
import AtCommandSwitch from '../SettingsTabs/Commands/AtCommandSwitch';
import Speech from '../SettingsTabs/Speech/Speech';
import { toggleControl, ThemeSetting, LangSetting } from './controls';
import store from '~/store';

const { GENERAL, CHAT, BETA, COMMANDS, SPEECH, DATA, ACCOUNT } = SettingsTabValues;

export const registry: SettingEntry[] = [
  {
    id: 'theme',
    tab: GENERAL,
    section: 'appearance',
    labelKey: 'com_nav_theme',
    keywords: ['dark', 'light', 'appearance', 'color', 'mode'],
    Component: ThemeSetting,
  },
  {
    id: 'language',
    tab: GENERAL,
    section: 'appearance',
    labelKey: 'com_nav_language',
    keywords: ['locale', 'translation'],
    Component: LangSetting,
  },
  {
    id: 'fontSize',
    tab: GENERAL,
    section: 'appearance',
    labelKey: 'com_nav_font_size',
    keywords: ['text', 'message', 'typography'],
    Component: FontSizeSelector,
  },
  {
    id: 'uiScale',
    tab: GENERAL,
    section: 'appearance',
    labelKey: 'com_nav_ui_scale',
    keywords: ['zoom', 'scale', 'size', 'accessibility'],
    Component: UiScaleSelector,
  },
  {
    id: 'chatDirection',
    tab: GENERAL,
    section: 'appearance',
    labelKey: 'com_nav_chat_direction',
    keywords: ['rtl', 'ltr', 'right', 'left'],
    Component: ChatDirection,
  },
  {
    id: 'enableUserMsgMarkdown',
    tab: GENERAL,
    section: 'layout',
    labelKey: 'com_nav_user_msg_markdown',
    keywords: ['markdown'],
    Component: toggleControl({
      stateAtom: store.enableUserMsgMarkdown,
      localizationKey: 'com_nav_user_msg_markdown',
      switchId: 'enableUserMsgMarkdown',
    }),
  },
  {
    id: 'autoScroll',
    tab: GENERAL,
    section: 'layout',
    labelKey: 'com_nav_auto_scroll',
    Component: toggleControl({
      stateAtom: store.autoScroll,
      localizationKey: 'com_nav_auto_scroll',
      switchId: 'autoScroll',
    }),
  },
  {
    id: 'hideSidePanel',
    tab: GENERAL,
    section: 'layout',
    labelKey: 'com_nav_hide_panel',
    keywords: ['sidebar', 'panel'],
    Component: toggleControl({
      stateAtom: store.hideSidePanel,
      localizationKey: 'com_nav_hide_panel',
      switchId: 'hideSidePanel',
    }),
  },
  {
    id: 'maximizeChatSpace',
    tab: GENERAL,
    section: 'layout',
    labelKey: 'com_nav_maximize_chat_space',
    keywords: ['width', 'layout'],
    Component: toggleControl({
      stateAtom: store.maximizeChatSpace,
      localizationKey: 'com_nav_maximize_chat_space',
      switchId: 'maximizeChatSpace',
    }),
  },
  {
    id: 'centerFormOnLanding',
    tab: GENERAL,
    section: 'layout',
    labelKey: 'com_nav_center_chat_input',
    Component: toggleControl({
      stateAtom: store.centerFormOnLanding,
      localizationKey: 'com_nav_center_chat_input',
      switchId: 'centerFormOnLanding',
    }),
  },
  {
    id: 'showScrollButton',
    tab: GENERAL,
    section: 'layout',
    labelKey: 'com_nav_scroll_button',
    Component: toggleControl({
      stateAtom: store.showScrollButton,
      localizationKey: 'com_nav_scroll_button',
      switchId: 'showScrollButton',
    }),
  },
  {
    id: 'archivedChats',
    tab: GENERAL,
    section: 'layout',
    labelKey: 'com_nav_archived_chats',
    keywords: ['archive', 'history'],
    Component: ArchivedChats,
  },
  {
    id: 'enterToSend',
    tab: CHAT,
    section: 'sending',
    labelKey: 'com_nav_enter_to_send',
    keywords: ['return', 'newline'],
    Component: toggleControl({
      stateAtom: store.enterToSend,
      localizationKey: 'com_nav_enter_to_send',
      switchId: 'enterToSend',
      hoverCardText: 'com_nav_info_enter_to_send',
    }),
  },
  {
    id: 'saveDrafts',
    tab: CHAT,
    section: 'sending',
    labelKey: 'com_nav_save_drafts',
    Component: toggleControl({
      stateAtom: store.saveDrafts,
      localizationKey: 'com_nav_save_drafts',
      switchId: 'saveDrafts',
      hoverCardText: 'com_nav_info_save_draft',
    }),
  },
  {
    id: 'showThinking',
    tab: CHAT,
    section: 'messages',
    labelKey: 'com_nav_show_thinking',
    keywords: ['reasoning', 'thoughts'],
    Component: toggleControl({
      stateAtom: store.showThinking,
      localizationKey: 'com_nav_show_thinking',
      switchId: 'showThinking',
    }),
  },
  {
    id: 'showCode',
    tab: CHAT,
    section: 'messages',
    labelKey: 'com_nav_show_code',
    Component: toggleControl({
      stateAtom: store.showCode,
      localizationKey: 'com_nav_show_code',
      switchId: 'showCode',
    }),
  },
  {
    id: 'latexParsing',
    tab: CHAT,
    section: 'messages',
    labelKey: 'com_nav_latex_parsing',
    keywords: ['math', 'katex'],
    Component: toggleControl({
      stateAtom: store.LaTeXParsing,
      localizationKey: 'com_nav_latex_parsing',
      switchId: 'latexParsing',
      hoverCardText: 'com_nav_info_latex_parsing',
    }),
  },
  {
    id: 'saveBadgesState',
    tab: CHAT,
    section: 'messages',
    labelKey: 'com_nav_save_badges_state',
    Component: toggleControl({
      stateAtom: store.saveBadgesState,
      localizationKey: 'com_nav_save_badges_state',
      switchId: 'showBadges',
      hoverCardText: 'com_nav_info_save_badges_state',
    }),
  },
  {
    id: 'modularChat',
    tab: CHAT,
    section: 'conversations',
    labelKey: 'com_nav_modular_chat',
    keywords: ['endpoint', 'switch'],
    Component: toggleControl({
      stateAtom: store.modularChat,
      localizationKey: 'com_nav_modular_chat',
      switchId: 'modularChat',
    }),
  },
  {
    id: 'forkSettings',
    tab: CHAT,
    section: 'conversations',
    labelKey: 'com_ui_fork',
    keywords: ['branch', 'split'],
    Component: ForkSettings,
  },
  {
    id: 'codeArtifacts',
    tab: BETA,
    section: 'beta',
    labelKey: 'com_ui_artifacts',
    keywords: ['code', 'preview', 'shadcn'],
    Component: CodeArtifacts,
    bare: true,
  },
  {
    id: 'atCommand',
    tab: COMMANDS,
    section: 'commands',
    labelKey: 'com_nav_at_command',
    keywords: ['mention', 'endpoint', '@'],
    Component: AtCommandSwitch,
  },
  {
    id: 'plusCommand',
    tab: COMMANDS,
    section: 'commands',
    labelKey: 'com_nav_plus_command',
    keywords: ['multi', '+'],
    Component: PlusCommandSwitch,
    show: (ctx) => ctx.hasAccessToMultiConvo,
  },
  {
    id: 'slashCommand',
    tab: COMMANDS,
    section: 'commands',
    labelKey: 'com_nav_slash_command',
    keywords: ['prompt', '/'],
    Component: SlashCommandSwitch,
    show: (ctx) => ctx.hasAccessToPrompts,
  },
  {
    id: 'speech',
    tab: SPEECH,
    section: 'speech',
    labelKey: 'com_nav_setting_speech',
    keywords: [
      'tts',
      'stt',
      'voice',
      'audio',
      'microphone',
      'playback',
      'transcribe',
      'conversation mode',
    ],
    Component: Speech,
    bare: true,
  },
  {
    id: 'importConversations',
    tab: DATA,
    section: 'data',
    labelKey: 'com_ui_import_conversation_info',
    keywords: ['import', 'upload', 'json'],
    Component: ImportConversations,
  },
  {
    id: 'sharedLinks',
    tab: DATA,
    section: 'data',
    labelKey: 'com_nav_shared_links',
    keywords: ['share'],
    Component: SharedLinks,
  },
  {
    id: 'revokeKeys',
    tab: DATA,
    section: 'data',
    labelKey: 'com_ui_revoke_info',
    keywords: ['api', 'credentials', 'keys'],
    Component: RevokeAllKeys,
  },
  {
    id: 'deleteCache',
    tab: DATA,
    section: 'data',
    labelKey: 'com_nav_delete_cache_storage',
    keywords: ['tts', 'cache'],
    Component: DeleteCache,
  },
  {
    id: 'clearChats',
    tab: DATA,
    section: 'danger',
    labelKey: 'com_nav_clear_all_chats',
    keywords: ['delete', 'reset'],
    Component: ClearChats,
  },
  {
    id: 'usernameDisplay',
    tab: ACCOUNT,
    section: 'profile',
    labelKey: 'com_nav_user_name_display',
    Component: DisplayUsernameMessages,
  },
  {
    id: 'avatar',
    tab: ACCOUNT,
    section: 'profile',
    labelKey: 'com_nav_profile_picture',
    keywords: ['avatar', 'photo'],
    Component: Avatar,
  },
  {
    id: 'twoFactor',
    tab: ACCOUNT,
    section: 'security',
    labelKey: 'com_nav_2fa',
    keywords: ['totp', 'authenticator', 'mfa'],
    Component: EnableTwoFactorItem,
    show: (ctx) => ctx.isLocalProvider,
  },
  {
    id: 'backupCodes',
    tab: ACCOUNT,
    section: 'security',
    labelKey: 'com_ui_backup_codes',
    Component: BackupCodesItem,
    show: (ctx) => ctx.isLocalProvider && ctx.twoFactorEnabled,
  },
  {
    id: 'deleteAccount',
    tab: ACCOUNT,
    section: 'danger',
    labelKey: 'com_nav_delete_account',
    keywords: ['remove', 'close'],
    Component: DeleteAccount,
  },
];
