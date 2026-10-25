import { loadEnv } from 'vite';
import { handleChat } from '../api/chat.ts';

export function chatDevPlugin() {
  const names = ['OPENROUTER_API_KEY', 'OPENROUTER_MODEL', 'OMNIROUTE_API_URL', 'OMNIROUTE_API_KEY', 'OMNIROUTE_MODEL',
    'AI_GATEWAY_API_KEY', 'AI_GATEWAY_MODEL', 'VERCEL_OIDC_TOKEN'];
  const runtimeEnv = Object.fromEntries(names.map(name => [name, process.env[name]]));
  return {
    name: 'portfolio-chat-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.split('?')[0] !== '/api/chat') return next();
        const env = loadEnv('vercel', server.config.root, ['OMNIROUTE_', 'OPENROUTER_', 'AI_GATEWAY_', 'VERCEL_OIDC_TOKEN']);
        const config = Object.fromEntries(names.map(name => [name, runtimeEnv[name] || env[name]]));
        res.status = code => { res.statusCode = code; return res; };
        res.json = body => {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify(body));
          return res;
        };
        try {
          const controller = new AbortController();
          res.once('close', () => controller.abort());
          req.setEncoding('utf8');
          let body = '';
          for await (const chunk of req) {
            body += chunk.toString();
            if (body.length > 40000) return res.status(413).json({ error: 'Request is too large' });
          }
          await handleChat({ method: req.method, url: req.url, headers: req.headers, body, signal: controller.signal }, res, config);
        } catch {
          if (!res.writableEnded) {
            if (res.headersSent) res.end();
            else res.status(500).json({ error: 'Chat service is unavailable' });
          }
        }
      });
    },
  };
}
