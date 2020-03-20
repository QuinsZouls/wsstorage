function verifyConnection(info, cb) {
  let Authorization = info.req.headers.authorization;
  if (!Authorization) {
    cb(false, 401, 'Unauthorized');
  } else {
    if (
      Authorization ===
      `Sharabiz ${process.env.USERNAME || 'root'}:${process.env.PASSWORD ||
        'root'}`
    ) {
      cb(true);
    } else {
      cb(false, 401, 'Unauthorized');
    }
  }
}

module.exports = verifyConnection;
