import { axios } from '@lib';
import getUserRole from './get-user-role';

/**
 * Guest-only guard: redirect authenticated users away from /guest pages.
 * No token or refresh failure => allow. Token valid => redirect to role dashboard.
 */
const checkGuest = async (context) => {
  const {
    req: { cookies, headers },
  } = context;
  const refreshToken = cookies[process.env.JWT_TOKEN_NAME];

  if (!refreshToken) {
    return { props: {} };
  }

  try {
    const { token } = await axios({
      data: {},
      headers: { cookie: headers.cookie },
      method: 'post',
      url: '/refresh-token',
      withCredentials: true,
    });

    const role = getUserRole(token);
    const destination = role ? `/${role}` : '/';
    return { redirect: { destination, permanent: false } };
  } catch {
    return { props: {} };
  }
};

export default checkGuest;
