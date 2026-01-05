import {
  DrillLayout,
  DrillLayoutLarge,
  DrillLayoutSmall,
  InteractiveLayout,
  InteractiveLayoutLarge,
  InteractiveLayoutSmall,
  StudyLayout,
  StudyLayoutLarge,
  StudyLayoutSmall,
} from '@components/Study';
import { DrillProvider } from '@contexts/DrillContext';

const LAYOUTS = {
  small: {
    interactive: InteractiveLayoutSmall,
    drill: DrillLayoutSmall,
    study: StudyLayoutSmall,
  },
  medium: {
    interactive: InteractiveLayout,
    drill: DrillLayout,
    study: StudyLayout,
  },
  large: {
    interactive: InteractiveLayoutLarge,
    drill: DrillLayoutLarge,
    study: StudyLayoutLarge,
  },
};

const StudyLessonContent = ({ size, layoutType, layoutProps }) => {
  const Layout = LAYOUTS[size][layoutType] || LAYOUTS[size].study;

  if (!Layout) return null;

  if (layoutType === 'drill') {
    return (
      <DrillProvider key={layoutProps.chapterKey}>
        <Layout {...layoutProps} />
      </DrillProvider>
    );
  }

  return <Layout key={layoutProps.chapterKey} {...layoutProps} />;
};

export default StudyLessonContent;
