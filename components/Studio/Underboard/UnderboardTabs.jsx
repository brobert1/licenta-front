import { Tabs, Tab } from 'react-bootstrap';
import { Comments, Glyphs, Export, VideoTab } from '.';
import { Tags } from './Tags';
import { useProfile } from '@hooks';

const UnderboardTabs = ({ tree, current, setTree, moments }) => {
  const { me } = useProfile();

  return (
    <div className="w-full max-w-full bg-secondary rounded-md overflow-hidden">
      <Tabs defaultActiveKey="tags" className="actions-menu-tabs" variant="tabs">
        <Tab
          eventKey="tags"
          title={
            <div className="flex items-center gap-2">
              <i className="fas fa-tags"></i>
              <span className="hidden sm:inline">Tags</span>
            </div>
          }
        >
          <Tags moments={moments} tree={tree} setTree={setTree} />
        </Tab>
        <Tab
          eventKey="comments"
          title={
            <div className="flex items-center gap-2">
              <i className="fas fa-comment"></i>
              <span className="hidden sm:inline">Comments</span>
            </div>
          }
        >
          <Comments tree={tree} current={current} setTree={setTree} />
        </Tab>
        <Tab
          eventKey="glyphs"
          title={
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <i className="fas fa-exclamation"></i>
                <i className="fas fa-question"></i>
              </div>
              <span className="hidden sm:inline">Glyphs</span>
            </div>
          }
        >
          <Glyphs tree={tree} current={current} setTree={setTree} />
        </Tab>
        <Tab
          eventKey="export"
          title={
            <div className="flex items-center gap-2">
              <i className="fas fa-up-from-bracket"></i>
              <span className="hidden sm:inline">Export</span>
            </div>
          }
        >
          <Export />
        </Tab>
        {me?.role === 'admin' && (
          <Tab
            eventKey="video"
            title={
              <div className="flex items-center gap-2">
                <i className="fas fa-video"></i>
                <span className="hidden sm:inline">Video</span>
              </div>
            }
          >
            <VideoTab />
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default UnderboardTabs;
