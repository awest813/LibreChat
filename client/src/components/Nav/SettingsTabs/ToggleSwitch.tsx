import type { RecoilState } from 'recoil';
import { useRecoilState } from 'recoil';
import type { TranslationKeys } from '~/hooks';
import HoverCardSettings from './HoverCardSettings';
import useLocalize from '~/hooks/useLocalize';
import { Switch } from '~/components/ui';

interface ToggleSwitchProps {
  stateAtom: RecoilState<boolean>;
  localizationKey: TranslationKeys;
  hoverCardText?: TranslationKeys;
  switchId: string;
  onCheckedChange?: (value: boolean) => void;
}

const ToggleSwitch = ({
  stateAtom,
  localizationKey,
  hoverCardText,
  switchId,
  onCheckedChange,
}: ToggleSwitchProps) => {
  const [switchState, setSwitchState] = useRecoilState<boolean>(stateAtom);
  const localize = useLocalize();

  const handleCheckedChange = (value: boolean) => {
    setSwitchState(value);
    if (onCheckedChange) {
      onCheckedChange(value);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div>{localize(localizationKey)}</div>
        {hoverCardText && <HoverCardSettings side="bottom" text={hoverCardText} />}
      </div>
      <Switch
        id={switchId}
        checked={switchState}
        onCheckedChange={handleCheckedChange}
        className="ml-4"
        data-testid={switchId}
      />
    </div>
  );
};

export default ToggleSwitch;
