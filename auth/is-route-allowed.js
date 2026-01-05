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

    // Only admins can use preview mode
    if (query.preview === 'true' && role !== 'admin') {
      return false;
    }

    // Admin in preview mode can access client routes
    if (role === 'admin' && query.preview === 'true') {
      return pathname.startsWith('/client');
    }

    // Admin WITHOUT preview mode can only access admin routes (not client routes)
    if (role === 'admin') {
      return pathname.startsWith('/admin');
    }

    // Client can only access client routes
    return pathname.startsWith(`/${role}`);
  } catch (error) {
    console.error('Token decoding error:', error);
    return false;
  }
};

export default isRouteAllowed;
