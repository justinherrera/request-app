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
  
    // TODO: create a centered modal that confirms if submit is successful
    // name it as "napakiusap ko na"

    const client = twilio(accountSid, authToken);
    
    await client.messages
      .create({
          to,
          from: '+18148139589',
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