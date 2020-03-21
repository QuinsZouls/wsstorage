function verifyConnection(info, cb) {
  let Authorization = info.req.headers.authorization;
  if (!Authorization) {
    cb(false, 401, 'Unauthorized');
  } else {
    if (
      Authorization ===
      `Sharabiz ${process.env.AUTH_USERNAME}:${process.env.AUTH_PASSWORD}`
    ) {
      cb(true);
    } else {
      cb(false, 401, 'Unauthorized');
    }
  }
}

module.exports = verifyConnection;
