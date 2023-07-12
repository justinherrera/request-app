import twilio from "twilio"
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'OPTIONS') {
    // Respond to the preflight request
    res.status(200).send({});
    return;
  }

  if (req.method === 'POST') {
    const { to, body } = req.body 
    const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
    const authToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
    const accountPhone = process.env.REACT_APP_TWILIO_PHONE_NUMBER

    const client = twilio(accountSid, authToken);
    
    await client.messages
      .create({
          to,
          from: accountPhone,
          body,
      })
        .then(() => {
          res.status(200).send({ message: 'success' });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send({ message: 'failed' });
        })
  }
}

// export default (req, res) => {
//   res.statusCode = 200;
//   res.send({ message: "helloWorld" });
// };