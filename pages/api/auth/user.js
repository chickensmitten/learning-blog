import Iron from '@hapi/iron';
import { getAuthToken } from 'lib/cookie';

async function handler(req, res) {
  let user;
  try {
    user = await Iron.unseal(
      getAuthToken(req.cookies),
      process.env.ENCRYPTION_SECRET,
      Iron.defaults,
    );
  } catch (error) {
    res.status(401).end();
  }

  // now we have access to the data inside of user
  // and we could make database calls or just send back what we have
  // in the token.

  res.json(user);
};

export default handler;