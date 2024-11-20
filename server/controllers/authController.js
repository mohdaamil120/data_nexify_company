const authService = require('../services/authService');

exports.getAuthUrl = async (req, res) => {
  try {
    const url = authService.getAuthUrl();
    res.status(200).send({ url });
  } catch (err) {
    res.status(401).send({ msg: 'Error in getting URL', error: err.message });
  }
};

exports.googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const user = await authService.googleCallback(code);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Authentication Failed', details: error.message });
  }
};
