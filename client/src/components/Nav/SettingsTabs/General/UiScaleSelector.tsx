import { Minus, Plus } from 'lucide-react';
import { useRecoilState } from 'recoil';
import HoverCardSettings from '../HoverCardSettings';
import { applyUiScale, stepUiScale } from '~/utils/theme';
import { useLocalize } from '~/hooks';
import store from '~/store';

export default function UiScaleSelector() {
  const localize = useLocalize();
  const [uiScale, setUiScale] = useRecoilState(store.uiScale);

  const changeScale = (direction: -1 | 1) => {
    const next = stepUiScale(uiScale, direction);
    setUiScale(next);
    applyUiScale(next);
  };

  return (
    <div className="flex w-full items-center justify-between gap-3">
      <div className="flex items-center space-x-2">
        <div>{localize('com_nav_ui_scale')}</div>
        <HoverCardSettings side="bottom" text="com_nav_info_ui_scale" />
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-border-xheavy disabled:opacity-40"
          onClick={() => changeScale(-1)}
          disabled={uiScale <= 50}
          aria-label={localize('com_nav_ui_scale_decrease')}
          data-testid="ui-scale-decrease"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>
        <span
          className="min-w-[3.5rem] text-center text-sm tabular-nums text-text-primary"
          data-testid="ui-scale-value"
          aria-live="polite"
        >
          {uiScale}%
        </span>
        <button
          type="button"
          className="rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-border-xheavy disabled:opacity-40"
          onClick={() => changeScale(1)}
          disabled={uiScale >= 150}
          aria-label={localize('com_nav_ui_scale_increase')}
          data-testid="ui-scale-increase"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
