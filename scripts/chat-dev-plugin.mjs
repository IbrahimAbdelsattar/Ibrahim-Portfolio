import { loadEnv } from 'vite';
import { handleChat } from '../api/chat.ts';

export function chatDevPlugin() {
  const names = ['OMNIROUTE_API_URL', 'OMNIROUTE_API_KEY', 'OMNIROUTE_MODEL'];
  const runtimeEnv = Object.fromEntries(names.map(name => [name, process.env[name]]));
  return {
    name: 'portfolio-chat-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.split('?')[0] !== '/api/chat') return next();
        const env = loadEnv('vercel', server.config.root, 'OMNIROUTE_');
        const config = Object.fromEntries(names.map(name => [name, runtimeEnv[name] || env[name]]));
        res.status = code => { res.statusCode = code; return res; };
        res.json = body => {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify(body));
          return res;
        };
        try {
          req.setEncoding('utf8');
          let body = '';
          for await (const chunk of req) {
            body += chunk.toString();
            if (body.length > 40000) return res.status(413).json({ error: 'Request is too large' });
          }
          req.body = body;
          await handleChat(req, res, config);
        } catch {
          if (!res.writableEnded) res.status(500).json({ error: 'Chat service is unavailable' });
        }
      });
    },
  };
}
