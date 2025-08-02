require('dotenv').config();

const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Unauthorized: No auth header' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  if (
    username !== process.env.BASIC_AUTH_USER ||
    password !== process.env.BASIC_AUTH_PASS
  ) {
    return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
  }

  next();
};

module.exports = basicAuth;
