import { sanitizeHtml } from '@functions';
import parse from 'html-react-parser';

const CourseAboutCard = ({ course }) => {
  const html = course.description || '';

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm min-w-0">
      <h2 className="mb-4 text-lg font-semibold text-primary">About this course</h2>
      <div className="prose prose-gray max-w-none first-letter:uppercase text-muted break-words overflow-wrap-anywhere">
        {parse(sanitizeHtml(html))}
      </div>
    </div>
  );
};

export default CourseAboutCard;
