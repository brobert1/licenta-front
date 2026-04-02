import { Tab } from 'react-bootstrap';

const ChessTab = ({ children, icon, title, eventKey }) => {
  return (
    <Tab
      className="rounded-md"
      eventKey={eventKey}
      title={
        <div className="flex flex-row gap-2 items-center">
          <i className={icon}></i>
          {title}
        </div>
      }
    >
      {children}
    </Tab>
  );
};

export default ChessTab;
