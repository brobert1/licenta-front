import { momentAnnotations } from '@chess/constants/moment-annotations';
import { nagToSymbol } from '@chess/functions';
import { Button } from '@components';
import { classnames } from '@lib';
import { flatMap } from 'lodash';

const glyphTitle = (glyph) => flatMap(momentAnnotations).find((item) => item.nag === glyph)?.label;

const PgnTreeMobileItem = ({ activeRef, item, onMoveClick }) => {
  if (item.type !== 'move') {
    return (
      <span
        className="inline-flex shrink-0 items-baseline py-0 text-xs font-chess leading-none text-muted"
        key={item.key}
      >
        {item.text}
      </span>
    );
  }

  const { active, moment, text } = item;

  return (
    <span className="inline-flex shrink-0" ref={active ? activeRef : undefined}>
      <Button
        className={classnames(
          'inline-flex shrink-0 items-baseline rounded-md px-2 py-0.5 text-sm transition-colors',
          active ? 'bg-accent font-semibold text-white' : 'text-primary hover:bg-tertiary'
        )}
        key={item.key}
        onClick={() => onMoveClick(moment)}
      >
        <span className="font-chess">{text}</span>
        {moment.suffix && (
          <span className={classnames('ml-1 font-bold', active ? 'text-white' : 'text-green-500')}>
            {moment.suffix}
          </span>
        )}
        {moment.glyph && (
          <span
            className={classnames('ml-1 font-bold', active ? 'text-white' : 'text-green-500')}
            title={glyphTitle(moment.glyph)}
          >
            {nagToSymbol(moment.glyph)}
          </span>
        )}
      </Button>
    </span>
  );
};

export default PgnTreeMobileItem;
