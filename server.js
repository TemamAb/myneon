const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DASHBOARD_PATH = path.join(__dirname, 'myneon', 'monitoring', 'production', 'PRODUCTIONDASHBOARD.HTML.html');

const server = http.createServer((req, res) => {
  // Always serve the dashboard
  fs.readFile(DASHBOARD_PATH, (err, data) => {
    if (err) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <body style="font-family: Arial, sans-serif; padding: 40px; text-align: center;">
            <h1>íº€ Dashboard Loading...</h1>
            <p>Production dashboard initializing</p>
            <p>Path: ${DASHBOARD_PATH}</p>
            <p><small>All mock data removed - Ready for live integration</small></p>
          </body>
        </html>
      `);
      return;
    }
    
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`âœ… Production Dashboard Server running on port ${PORT}`);
  console.log(`í³Š Serving: ${DASHBOARD_PATH}`);
  console.log(`í¾¯ All mock data removed - Metrics reset to zero`);
  console.log(`íº€ Ready for blockchain data integration`);
});
