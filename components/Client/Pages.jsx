import { MenuItem } from '.';

const Pages = () => {
  return (
    <>
      <MenuItem href="/client" level="1">
        Dashboard
      </MenuItem>
      <MenuItem href="/client/courses" level="1">
        Courses
      </MenuItem>
      <MenuItem href="/client/quizzes" level="1">
        Quizzes
      </MenuItem>
      <MenuItem href="/client/account" level="1">
        My account
      </MenuItem>
    </>
  );
};

export default Pages;
