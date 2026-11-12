import fs from 'fs';
import path from 'path';

export function dailyLogsPlugin() {
  return {
    name: 'daily-logs-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        
        // GET /api/logs?date=YYYY-MM-DD&user=manivasagam
        if (req.method === 'GET' && url.pathname === '/api/logs') {
          const date = url.searchParams.get('date');
          const user = url.searchParams.get('user');
          if (!date || !user) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'Missing date or user' }));
          }
          const safeUser = user.replace(/[^a-zA-Z0-9_-]/g, '');
          const safeDate = date.replace(/[^0-9-]/g, '');
          const logDir = path.resolve(process.cwd(), 'DailyLogs');
          const filePath = path.join(logDir, `${safeDate}_${safeUser}.json`);

          if (fs.existsSync(filePath)) {
            try {
              const data = fs.readFileSync(filePath, 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              return res.end(data);
            } catch (err) {
              res.statusCode = 500;
              return res.end(JSON.stringify({ error: 'Failed to read log' }));
            }
          } else {
            res.statusCode = 404;
            return res.end(JSON.stringify({ found: false }));
          }
        }

        // POST /api/logs
        if (req.method === 'POST' && url.pathname === '/api/logs') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body);
              const { date, user, data } = payload;
              if (!date || !user) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: 'Missing date or user in body' }));
              }
              const safeUser = user.replace(/[^a-zA-Z0-9_-]/g, '');
              const safeDate = date.replace(/[^0-9-]/g, '');
              const logDir = path.resolve(process.cwd(), 'DailyLogs');
              if (!fs.existsSync(logDir)) {
                fs.mkdirSync(logDir, { recursive: true });
              }
              const filePath = path.join(logDir, `${safeDate}_${safeUser}.json`);
              fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: true, file: `${safeDate}_${safeUser}.json` }));
            } catch (e) {
              res.statusCode = 500;
              return res.end(JSON.stringify({ error: e.message }));
            }
          });
          return;
        }

        // GET /api/logs/all - list all available logs
        if (req.method === 'GET' && url.pathname === '/api/logs/all') {
          const logDir = path.resolve(process.cwd(), 'DailyLogs');
          if (!fs.existsSync(logDir)) {
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ files: [] }));
          }
          const files = fs.readdirSync(logDir).filter(f => f.endsWith('.json'));
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ files }));
        }

        next();
      });
    }
  };
}
