export const authenticateTenant =  (req, res, next) => {
    if (req.headers.decoded.role != 'tenant') {
      return res.status(401).json({ message: 'Unauthorized user' })
    }
  
    req.headers['tenantId'] = req.headers.decoded.id;
    next();
  };
  