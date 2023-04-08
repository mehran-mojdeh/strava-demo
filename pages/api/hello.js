// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import token_manager from './strava_modules/token_manager';
export default function handler(req, res) {
  
  res.status(200).json({ name: 'John Doe' })
}
