import { Pill } from '@components';
import { ChessTab } from '@components/Study';
import { useEqualHeight } from '@hooks';
import { toaster } from '@lib';
import { useEffect } from 'react';
import { Tabs } from 'react-bootstrap';

const StudyPageSkeleton = ({ type }) => {
  useEffect(() => {
    if (type === 'error') {
      toaster.error('Error! Unable to load study data');
    }
  }, [type]);

  const { sourceRef, targetRef } = useEqualHeight();

  return (
    <div className="flex flex-col md:grid md:grid-cols-5 2xl:grid-cols-4 outline-none w-full gap-4">
      <div
        ref={targetRef}
        className="hidden 2xl:col-span-1 2xl:flex 2xl:flex-col overflow-hidden rounded-md"
      >
        <div className="relative flex flex-col flex-grow bg-secondary rounded-md h-full">
          <div className="flex flex-col flex-grow p-3 gap-2 overflow-hidden">
            <Pill type={type} className="h-6 w-3/4 rounded mb-3" />
            {Array.from({ length: 8 }).map((_, i) => (
              <Pill key={i} type={type} className="h-12 w-full rounded mb-2" />
            ))}
          </div>
        </div>
      </div>
      <div className="drill-layout-center md:col-span-3 2xl:col-span-2 flex flex-col gap-4">
        <div ref={sourceRef}>
          <div className="flex flex-col gap-4">
            <Pill type={type} className="w-full aspect-square rounded-md" />
          </div>
        </div>
      </div>
      <div
        ref={targetRef}
        className="hidden 2xl:col-span-1 2xl:flex 2xl:flex-col overflow-hidden rounded-md"
      >
        <div className="flex flex-col rounded-md bg-secondary overflow-hidden h-full">
          <div className="bg-tertiary">
            <Pill type={type} className="h-6 w-5/6 rounded m-2.5" />
          </div>
          <div className="flex flex-col flex-grow min-h-0 p-3 overflow-hidden">
            <div className="overflow-y-auto min-h-0 flex-grow space-y-2">
              <Pill type={type} className="h-4 w-1/2 rounded" />
              <Pill type={type} className="h-4 w-3/4 rounded" />
              <Pill type={type} className="h-4 w-1/2 rounded ml-4" />
              <Pill type={type} className="h-4 w-5/6 rounded" />
              <Pill type={type} className="h-4 w-1/2 rounded" />
              <Pill type={type} className="h-4 w-3/4 rounded" />
              <Pill type={type} className="h-4 w-full rounded" />
              <Pill type={type} className="h-4 w-1/2 rounded" />
              <Pill type={type} className="h-4 w-3/4 rounded ml-4" />
              <Pill type={type} className="h-4 w-5/6 rounded" />
              <Pill type={type} className="h-4 w-1/2 rounded" />
              <Pill type={type} className="h-4 w-3/4 rounded" />
            </div>
            <Pill type={type} className="h-10 w-full rounded mt-3" />
          </div>
        </div>
      </div>
      <div className="drill-layout-right flex flex-col col-span-2 2xl:hidden">
        <Tabs defaultActiveKey="moves" className="mb-2">
          <ChessTab icon="fas fa-chess" title="Moves" eventKey="moves">
            <div className="flex flex-col rounded-md bg-secondary overflow-hidden">
              <div className="bg-tertiary">
                <Pill type={type} className="h-6 w-5/6 rounded m-2.5" />
              </div>
              <div className="flex flex-col flex-grow min-h-0 p-3 overflow-hidden">
                <div className="overflow-y-auto min-h-0 flex-grow space-y-2">
                  <Pill type={type} className="h-4 w-1/2 rounded" />
                  <Pill type={type} className="h-4 w-3/4 rounded" />
                  <Pill type={type} className="h-4 w-1/2 rounded ml-4" />
                  <Pill type={type} className="h-4 w-5/6 rounded" />
                  <Pill type={type} className="h-4 w-1/2 rounded" />
                  <Pill type={type} className="h-4 w-3/4 rounded" />
                  <Pill type={type} className="h-4 w-full rounded" />
                  <Pill type={type} className="h-4 w-1/2 rounded" />
                </div>
                <Pill type={type} className="h-10 w-full rounded mt-3" />
              </div>
            </div>
          </ChessTab>
          <ChessTab icon="fas fa-files" title="Diagrams" eventKey="diagrams">
            <div className="relative flex flex-col flex-grow bg-secondary rounded-md h-full">
              <div className="flex flex-col flex-grow p-3 gap-2 overflow-hidden">
                <Pill type={type} className="h-6 w-3/4 rounded mb-3" />
                {Array.from({ length: 6 }).map((_, i) => (
                  <Pill key={i} type={type} className="h-12 w-full rounded mb-2" />
                ))}
              </div>
            </div>
          </ChessTab>
        </Tabs>
      </div>
    </div>
  );
};

export default StudyPageSkeleton;
