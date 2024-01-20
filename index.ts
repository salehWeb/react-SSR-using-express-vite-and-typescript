import express from 'express'
import serve from './router';

const app = express()
const port = 3000

app.set('trust proxy', true)
app.use(express.static("./dist/client"))
app.use("/api", async (req, res) => {
  const Ip = getClientIp(req);
  res.status(200).json({massage: `your ip is ${Ip}`})
})

app.use("/", async (req, res) => {
console.log(req)
  await serve(req, res)
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})


function getClientIp(req: express.Request) {
  let clientIp = req.headers['x-client-ip'];

  // X-Forwarded-For
  if (!clientIp) {
    const forwardedFor = req.headers['x-forwarded-for'];
    if (forwardedFor) {
      const ipList = forwardedFor.split(',');
      clientIp = ipList[0].trim();
    }
  }

  // CF-Connecting-IP
  if (!clientIp) {
    clientIp = req.headers['cf-connecting-ip'];
  }

  // Fastly-Client-Ip
  if (!clientIp) {
    clientIp = req.headers['fastly-client-ip'];
  }

  // True-Client-Ip
  if (!clientIp) {
    clientIp = req.headers['true-client-ip'];
  }

  // X-Real-IP
  if (!clientIp) {
    clientIp = req.headers['x-real-ip'];
  }

  // X-Cluster-Client-IP
  if (!clientIp) {
    clientIp = req.headers['x-cluster-client-ip'];
  }

  // X-Forwarded, Forwarded-For, and Forwarded
  if (!clientIp) {
    const xForwarded = req.headers['x-forwarded'] || req.headers['forwarded-for'] || req.headers['forwarded'];
    if (xForwarded) {
      const ipList = xForwarded.split(',');
      clientIp = ipList[0].trim();
    }
  }

  // appengine-user-ip
  if (!clientIp) {
    clientIp = req.headers['appengine-user-ip'];
  }

  // req.connection.remoteAddress
  if (!clientIp && req.connection) {
    clientIp = req.connection.remoteAddress;
  }

  // req.socket.remoteAddress
  if (!clientIp && req.socket) {
    clientIp = req.socket.remoteAddress;
  }

  // req.connection.socket.remoteAddress
  if (!clientIp && req.connection && req.connection.socket) {
    clientIp = req.connection.socket.remoteAddress;
  }

  // req.info.remoteAddress (Assuming you are using Hapi.js)
  if (!clientIp && req.info) {
    clientIp = req.info.remoteAddress;
  }

  // Cf-Pseudo-IPv4
  if (!clientIp) {
    clientIp = req.headers['cf-pseudo-ipv4'];
  }

  // request.raw (Fastify)
  if (!clientIp && req.raw) {
    clientIp = req.raw.ip;
  }

  return clientIp;
}
