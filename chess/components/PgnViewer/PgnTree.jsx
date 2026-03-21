import { momentAnnotations } from '@chess/constants/moment-annotations';
import { getMoveNumber, isMoveActive, nagToSymbol } from '@chess/functions';
import { classnames } from '@lib';
import { flatMap, isFunction, last, omit } from 'lodash';
import { Fragment, useEffect, useMemo, useRef } from 'react';
import { Comment, Move, Shape } from '.';

// Text color classes for annotations
const annotationTextColors = {
  '!!': 'text-emerald-400',
  '!': 'text-sky-400',
  '!?': 'text-lime-400',
  '?!': 'text-yellow-500',
  '?': 'text-orange-500',
  '??': 'text-red-700',
};

const chromePalettes = {
  default: {
    emptyHint: '',
    fillerRow: 'bg-secondary',
    moveNoBar: 'bg-primary border border-gray-600',
    moveRowActive: 'bg-accent text-white font-bold',
    moveRowBase: 'bg-secondary',
    moveRowHover: 'hover:bg-accent hover:text-white',
    root: 'bg-secondary text-tertiary',
  },
  gameplay: {
    emptyHint: 'text-grey',
    fillerRow: 'bg-gameplay-elevated text-grey',
    moveNoBar: 'bg-gameplay-control border border-white/10 text-white',
    moveRowActive: 'bg-tertiary-container text-white font-bold',
    moveRowBase: 'bg-gameplay-elevated text-grey',
    moveRowHover: 'hover:bg-gameplay-control hover:text-white',
    root: 'bg-gameplay text-grey',
  },
};

const PgnTree = ({
  tree,
  current,
  onMoveClick,
  onRightClick,
  autoScroll = true,
  analysis = false,
  chrome = 'default',
}) => {
  const palette = chromePalettes[chrome] ?? chromePalettes.default;
  const containerRef = useRef();
  const momentsDictionaryRef = useRef({});

  // Helper function to get annotation color
  const getAnnotationColor = (suffix) => {
    if (!analysis || !suffix) return null;
    return annotationTextColors[suffix] || null;
  };

  // Last moment from tree
  const lastMoment = useMemo(() => last(last(tree)), [tree]);

  useEffect(() => {
    if (autoScroll && containerRef.current && current?.index) {
      const childEl = momentsDictionaryRef.current[current?.index];
      if (childEl) {
        const container = containerRef.current;

        // Check if there's a parent with overflow-y-auto (desktop layout)
        let scrollTarget = container;
        let parent = container.parentElement;

        while (parent && parent !== document.body) {
          const styles = window.getComputedStyle(parent);
          if (styles.overflowY === 'auto' || styles.overflowY === 'scroll') {
            scrollTarget = parent;
            break;
          }
          parent = parent.parentElement;
        }

        // Calculate the relative position of the child element within the scroll target
        const childOffsetTop = childEl.getBoundingClientRect().top;
        const targetOffsetTop = scrollTarget.getBoundingClientRect().top;
        const relativeTop = childOffsetTop - targetOffsetTop;
        const scrollTop =
          scrollTarget.scrollTop +
          relativeTop -
          scrollTarget.clientHeight / 2 +
          childEl.clientHeight / 2;

        scrollTarget.scrollTo({
          top: scrollTop,
          behavior: 'smooth',
        });
      }
    }
  }, [current?.index, autoScroll]);

  const showMomentAsGrid = (moment, inBlockIndex, block) => {
    const { move, fen, index, shapes, comment, suffix, glyph } = moment;
    let { previous } = moment;
    if (!previous) {
      previous = block[inBlockIndex - 1];
    }
    const isActive = isMoveActive(current, moment);
    const isWhiteMove = fen?.split(' ')[1] === 'b';
    const shouldShowAddOn =
      (isWhiteMove && (comment || !block[inBlockIndex + 1])) ||
      (!isWhiteMove && (!previous?.move || previous?.comment));
    const shouldShowMoveNumber = move && (isWhiteMove || shouldShowAddOn);

    const annotationColor = getAnnotationColor(suffix);

    // Handle optional right-click event
    const handleRightClick = (event) => {
      if (isFunction(onRightClick)) {
        onRightClick(event, moment);
      }
    };

    return (
      <Fragment key={`${move}-${fen}-${index}`}>
        {move && (
          <>
            {shouldShowMoveNumber && (
              <div
                className={classnames(
                  'col-span-2 flex items-center justify-center',
                  palette.moveNoBar
                )}
              >
                <p>{getMoveNumber(fen)}.</p>
              </div>
            )}
            {!isWhiteMove && shouldShowAddOn && (
              <div className={classnames('col-span-5 flex items-center px-3 py-1', palette.fillerRow)}>
                <p>...</p>
              </div>
            )}
            <div
              ref={(el) => (momentsDictionaryRef.current[moment.index] = el)}
              className={classnames(
                'col-span-5 flex items-center px-3 py-1 cursor-pointer',
                isActive
                  ? palette.moveRowActive
                  : classnames(palette.moveRowBase, palette.moveRowHover),
                annotationColor
              )}
              onClick={() => onMoveClick(moment)}
              onContextMenu={handleRightClick}
            >
              <span className="font-chess">{move}</span>
              {suffix && (
                <span className={classnames('ml-1 font-bold', annotationColor || 'text-green-500')}>
                  {suffix}
                </span>
              )}
              {glyph && (
                <span
                  className={classnames('ml-1 font-bold', annotationColor || 'text-green-500')}
                  title={flatMap(momentAnnotations).find((item) => item.nag === glyph)?.label}
                >
                  {nagToSymbol(glyph)}
                </span>
              )}
              {shapes && <Shape extraClass="ml-2" />}
            </div>
            {isWhiteMove && shouldShowAddOn && moment.fen !== lastMoment?.fen && (
              <div className={classnames('col-span-5 flex items-center px-3 py-1', palette.fillerRow)}>
                <p>...</p>
              </div>
            )}
          </>
        )}
        {comment && (
          <div className={classnames('col-span-12 my-2 px-2', annotationColor)}>
            {showMomentAsBlock(omit(moment, ['move']), inBlockIndex, block)}
          </div>
        )}
      </Fragment>
    );
  };

  const showMomentAsBlock = (moment, inBlockIndex, block) => {
    const { comment, move, fen, shapes, index, suffix, glyph } = moment;
    let { previous } = moment;
    if (!previous) {
      previous = block[inBlockIndex - 1];
    }
    const isActive = isMoveActive(current, moment);
    const annotationColor = getAnnotationColor(suffix);

    // Handle optional right-click event
    const handleRightClick = (event) => {
      if (isFunction(onRightClick)) {
        onRightClick(event, moment);
      }
    };

    return (
      <Fragment key={`${move}-${fen}-${index}`}>
        {move && (
          <div
            ref={(el) => (momentsDictionaryRef.current[moment.index] = el)}
            className={classnames('inline', annotationColor)}
            onClick={() => onMoveClick(moment)}
            onContextMenu={handleRightClick}
          >
            <Move
              isActive={isActive}
              previous={previous}
              suffix={suffix}
              glyph={glyph}
              annotationColor={annotationColor}
              {...moment}
            />
          </div>
        )}
        {shapes && <Shape />}
        {comment && <Comment comment={comment} extraClass={annotationColor} />}
      </Fragment>
    );
  };

  const showBlock = (block = [], index, array) => {
    if (!block.length) {
      return null;
    }
    if (index) {
      block[0].previous = array[index - 1][array[index - 1].length - 1];
    }
    const isLowestDepth = block[0].depth === 1;
    const spacing = `${(block[0].depth - 1) * 0.75}rem`;

    return (
      <>
        {isLowestDepth ? (
          <div key={index} className="w-full grid grid-cols-12">
            {block.map(showMomentAsGrid)}
          </div>
        ) : (
          <div
            key={index}
            className="flex flex-wrap items-center gap-1 py-1"
            style={{ marginLeft: spacing }}
          >
            {block.map(showMomentAsBlock)}
          </div>
        )}
      </>
    );
  };

  return (
    <div
      ref={containerRef}
      id="pgn-tree"
      className={classnames(
        'flex-1 text-sm leading-relaxed min-h-0',
        palette.root
      )}
    >
      <div className="h-full flex flex-col">
        {tree.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center p-4">
            <p className={classnames(palette.emptyHint)}>No moves to display yet</p>
          </div>
        ) : (
          tree.map(showBlock)
        )}
      </div>
    </div>
  );
};

export default PgnTree;
