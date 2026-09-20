import { useEffect, useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { X, ChevronLeft } from 'lucide-react';
import { PermissionTypes, Permissions, SettingsTabValues } from 'librechat-data-provider';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useRecoilState } from 'recoil';
import type { TDialogProps } from '~/common';
import type { SettingsTab } from './types';
import { useAuthContext, useHasAccess, useLocalize, useMediaQuery } from '~/hooks';
import { SETTINGS_TAB_ORDER, TABS } from './types';
import Sidebar from './Sidebar';
import Content from './Content';
import store from '~/store';
import { cn } from '~/utils';

function isSettingsTab(value: string): value is SettingsTab {
  return SETTINGS_TAB_ORDER.includes(value as SettingsTab);
}

export default function SettingsDialog({ open, onOpenChange }: TDialogProps) {
  const localize = useLocalize();
  const { user } = useAuthContext();
  const isSmallScreen = useMediaQuery('(max-width: 767px)');
  const [storedTab, setStoredTab] = useRecoilState(store.settingsActiveTab);
  const [activeTab, setActiveTab] = useState<SettingsTab>(
    isSettingsTab(storedTab) ? storedTab : SettingsTabValues.GENERAL,
  );
  const [query, setQuery] = useState('');
  const [mobileDetail, setMobileDetail] = useState(false);

  const hasAccessToPrompts = useHasAccess({
    permissionType: PermissionTypes.PROMPTS,
    permission: Permissions.USE,
  });
  const hasAccessToMultiConvo = useHasAccess({
    permissionType: PermissionTypes.MULTI_CONVO,
    permission: Permissions.USE,
  });

  const ctx = useMemo(
    () => ({
      hasAccessToPrompts,
      hasAccessToMultiConvo,
      isLocalProvider: user?.provider === 'local',
      twoFactorEnabled: user?.twoFactorEnabled === true,
    }),
    [hasAccessToPrompts, hasAccessToMultiConvo, user?.provider, user?.twoFactorEnabled],
  );

  useEffect(() => {
    if (!open) {
      setQuery('');
      setMobileDetail(false);
    }
  }, [open]);

  const searching = query.trim().length > 0;
  const inDetail = isSmallScreen && mobileDetail && !searching;
  const showSidebar = !isSmallScreen || !inDetail;
  const showContent = !isSmallScreen || inDetail || searching;
  const activeMeta = TABS.find((tab) => tab.id === activeTab);

  const selectTab = (tab: SettingsTab) => {
    setActiveTab(tab);
    setStoredTab(tab);
    setQuery('');
    if (isSmallScreen) {
      setMobileDetail(true);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const currentIndex = SETTINGS_TAB_ORDER.indexOf(activeTab);
    const lastIndex = SETTINGS_TAB_ORDER.length - 1;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        selectTab(SETTINGS_TAB_ORDER[(currentIndex + 1) % SETTINGS_TAB_ORDER.length]);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        selectTab(
          SETTINGS_TAB_ORDER[
            (currentIndex - 1 + SETTINGS_TAB_ORDER.length) % SETTINGS_TAB_ORDER.length
          ],
        );
        break;
      case 'Home':
        event.preventDefault();
        selectTab(SETTINGS_TAB_ORDER[0]);
        break;
      case 'End':
        event.preventDefault();
        selectTab(SETTINGS_TAB_ORDER[lastIndex]);
        break;
    }
  };

  return (
    <Transition appear show={open}>
      <Dialog as="div" className="relative z-50" onClose={() => onOpenChange(false)}>
        <TransitionChild
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black opacity-50 dark:opacity-80" aria-hidden="true" />
        </TransitionChild>
        <TransitionChild
          enter="ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel
              className={cn(
                'flex max-h-[85vh] w-full flex-col overflow-hidden rounded-2xl bg-surface-dialog shadow-2xl',
                'md:h-[85vh] md:w-[56.25rem]',
              )}
            >
              <DialogTitle
                as="div"
                className="flex items-center justify-between border-b border-border-light p-5"
              >
                {inDetail ? (
                  <button
                    type="button"
                    onClick={() => setMobileDetail(false)}
                    className="-ml-1 flex items-center gap-1 rounded-lg p-1 text-text-primary transition-colors hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-border-xheavy"
                    aria-label={localize('com_ui_go_back')}
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    <span className="text-lg font-medium">
                      {activeMeta ? localize(activeMeta.labelKey) : localize('com_nav_settings')}
                    </span>
                  </button>
                ) : (
                  <h2 className="text-lg font-medium text-text-primary">
                    {localize('com_nav_settings')}
                  </h2>
                )}
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  aria-label={localize('com_ui_close_settings')}
                  className="rounded-lg p-1 text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-border-xheavy"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </DialogTitle>
              <Tabs.Root
                value={activeTab}
                onValueChange={(value) => {
                  if (isSettingsTab(value)) {
                    selectTab(value);
                  }
                }}
                orientation="vertical"
                className="flex flex-1 flex-col gap-4 overflow-hidden p-5 md:flex-row md:gap-6"
              >
                {showSidebar && (
                  <Sidebar
                    query={query}
                    onQueryChange={setQuery}
                    onSelectTab={selectTab}
                    onTabsKeyDown={handleKeyDown}
                    showChevron={isSmallScreen}
                    hideTabs={searching}
                  />
                )}
                {showContent && (
                  <div className="flex-1 overflow-y-auto md:pr-1">
                    {searching ? (
                      <Content activeTab={activeTab} query={query} ctx={ctx} />
                    ) : (
                      <Tabs.Content value={activeTab} tabIndex={-1} className="focus:outline-none">
                        <Content activeTab={activeTab} query={query} ctx={ctx} />
                      </Tabs.Content>
                    )}
                  </div>
                )}
              </Tabs.Root>
            </DialogPanel>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
