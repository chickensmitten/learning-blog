import { destroyCookies } from 'lib/cookie';

async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).end();
  destroyCookies(res)
  res.end();
}

export default handler;