import { validateEmail } from './validateEmail'

const validation = {
  checkUserInput(req, res, next) {
    let { email, password, name, phoneNumber } = req.body;
    if(!email && !name && !password && !phoneNumber ) {
      return res.status(400).json({
        "message": "The fields are required. (email, name, password, phoneNumber)",
        "field": "req.body",
        "status": "400"
      });
    }
    else if (!name.trim() || !email.trim()) {
      return res.status(400).json({
        "message": "The fields(email or name) are required.",
        "field": "req.body",
        "status": "400"
      });
    } else if (!validateEmail(email.trim())) {
      return res.status(400).json({
        'message': 'The email is invalid.',
        'field': 'email',
        'status': '400'
      })
    }  else if (!phoneNumber.trim() ) {
      return res.status(400).json({
        "message": "The phoneNumber is required.",
        "field": "phoneNumber",
        "status": "400"
      });
    } else if (!password.trim()) {
      return res.status(400).json({
        "message": "The password are required.",
        "field": "password",
        "status": "400"
      });
    }
    next()
  },
}

export default validation;
