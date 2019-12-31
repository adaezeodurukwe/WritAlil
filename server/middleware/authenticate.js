import Helpers from '../utils/helpers';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).send({
        status: 'error',
        message: 'unauthorized',
      });
    }

    const token = authorization.split(' ')[1];
    const unsigned = await Helpers.verifyToken(token);
    
    req.userId = unsigned.id;
    req.userName = unsigned.userName;

    return next();
  } catch (error) {
    return res.status(401).send({
      status: 401,
      message: error.message,
    });
  }
};
