import jwt from 'jsonwebtoken';

const isRouteAllowed = (pathname, token, query = {}) => {
  if (!pathname || !token) {
    console.error('Invalid pathname or token:', { pathname, token });
    return false;
  }

  try {
    const { role } = jwt.decode(token);

    if (!role) {
      console.error('Role missing in token:', token);
      return false;
    }

    // Only professors and admins can use preview mode
    if (query.preview === 'true' && role !== 'professor' && role !== 'admin') {
      return false;
    }

    // Professor or admin in preview mode can access client routes
    if ((role === 'professor' || role === 'admin') && query.preview === 'true') {
      return pathname.startsWith('/client');
    }

    // Admin without preview mode can only access admin routes
    if (role === 'admin') {
      return pathname.startsWith('/admin');
    }

    // Professor without preview mode can only access professor routes
    if (role === 'professor') {
      return pathname.startsWith('/professor');
    }

    // Client can only access client routes
    return pathname.startsWith(`/${role}`);
  } catch (error) {
    console.error('Token decoding error:', error);
    return false;
  }
};

export default isRouteAllowed;
