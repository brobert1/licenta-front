import { Button, Pill } from '@components';
import { AddHeader, Headers } from '.';
import { TagsModal } from '@components/Modals';
import { useDisclosure } from '@hooks';
import { useStudyContext } from '@contexts/StudyContext';

const Tags = ({ moments, tree, setTree }) => {
  const { isOpen, show, hide } = useDisclosure();
  const { study } = useStudyContext();

  const studyTags = study?.tags || [];

  return (
    <>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-1">
          {studyTags.map((tag) => (
            <Pill key={tag._id} className="bg-blue-100 text-blue-800">
              {tag.name}
            </Pill>
          ))}
          <Button
            onClick={show}
            className="text-blue-400 hover:text-blue-300 text-sm cursor-pointer transition-colors duration-150 ml-2"
          >
            Manage tags
          </Button>
        </div>
        <Headers moments={moments} tree={tree} setTree={setTree} />
        <AddHeader moments={moments} tree={tree} setTree={setTree} />
      </div>
      <TagsModal isOpen={isOpen} hide={hide} initialSelectedTags={studyTags} />
    </>
  );
};

export default Tags;
