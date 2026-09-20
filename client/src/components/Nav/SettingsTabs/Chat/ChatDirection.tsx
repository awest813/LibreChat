import React from 'react';
import { AlignLeft, AlignRight } from 'lucide-react';
import { useRecoilState } from 'recoil';
import SegmentedControl from '../../Settings/SegmentedControl';
import { useLocalize } from '~/hooks';
import store from '~/store';

const ChatDirection = () => {
  const [direction, setDirection] = useRecoilState(store.chatDirection);
  const localize = useLocalize();

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <span id="chat-direction-label">{localize('com_nav_chat_direction')}</span>
      </div>
      <SegmentedControl
        value={direction}
        onChange={setDirection}
        ariaLabel={localize('com_nav_chat_direction')}
        testId="chatDirection"
        options={[
          {
            value: 'LTR',
            label: localize('chat_direction_left_to_right'),
            icon: <AlignLeft className="h-3.5 w-3.5" aria-hidden="true" />,
          },
          {
            value: 'RTL',
            label: localize('chat_direction_right_to_left'),
            icon: <AlignRight className="h-3.5 w-3.5" aria-hidden="true" />,
          },
        ]}
      />
    </div>
  );
};

export default ChatDirection;
