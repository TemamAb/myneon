const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Dashboard hub
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>AION Architect - Dashboard Hub</title>
            <style>
                body {
                    font-family: 'Inter', sans-serif;
                    background: #0f172a;
                    color: #f8fafc;
                    margin: 0;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                }
                .container {
                    max-width: 800px;
                    text-align: center;
                }
                h1 {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                }
                .dashboard-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    margin: 3rem 0;
                }
                @media (max-width: 768px) {
                    .dashboard-grid {
                        grid-template-columns: 1fr;
                    }
                }
                .dashboard-card {
                    background: #1e293b;
                    border: 1px solid #334155;
                    border-radius: 1rem;
                    padding: 2rem;
                    text-decoration: none;
                    color: inherit;
                    transition: all 0.3s;
                }
                .dashboard-card:hover {
                    border-color: #10b981;
                    transform: translateY(-5px);
                }
                .card-title {
                    font-size: 1.25rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    color: #10b981;
                }
                .card-desc {
                    color: #94a3b8;
                    margin-bottom: 1rem;
                }
                .status-badge {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    background: rgba(16, 185, 129, 0.1);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                    border-radius: 2rem;
                    font-size: 0.75rem;
                    font-weight: bold;
                }
                .footer {
                    margin-top: 3rem;
                    color: #64748b;
                    font-size: 0.875rem;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>AION ARCHITECT <span style="color: #10b981;">CORE v3.5</span></h1>
                <p>Quantum-Leap Arbitrage Infrastructure</p>
                
                <div class="dashboard-grid">
                    <a href="/production/production-dashboard.html" class="dashboard-card">
                        <div class="card-title">Ì∫Ä PRODUCTION DASHBOARD</div>
                        <p class="card-desc">Live blockchain integration. Real transactions only.</p>
                        <span class="status-badge">SECURE ‚Ä¢ LIVE ‚Ä¢ ZERO MOCK DATA</span>
                    </a>
                    
                    <a href="/simulation/simulation-dashboard.html" class="dashboard-card">
                        <div class="card-title">ÌæÆ SIMULATION DASHBOARD</div>
                        <p class="card-desc">Demo environment with mock data. Safe for testing.</p>
                        <span class="status-badge">DEMO ‚Ä¢ SAFE ‚Ä¢ MOCK DATA</span>
                    </a>
                </div>
                
                <div class="footer">
                    <p>Ì∫Ä Deployed on Render ‚Ä¢ Port: ${PORT}</p>
                    <p>Ì¥í Production dashboard ready for blockchain integration</p>
                </div>
            </div>
        </body>
        </html>
    `);
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        service: 'aion-architect',
        version: '3.5.0',
        timestamp: new Date().toISOString(),
        dashboards: {
            production: '/production/production-dashboard.html',
            simulation: '/simulation/simulation-dashboard.html'
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log('Ì∫Ä AION ARCHITECT PRODUCTION SERVER');
    console.log(`Ì≥ä Port: ${PORT}`);
    console.log(`ÌæØ Production Dashboard: http://localhost:${PORT}/production/production-dashboard.html`);
    console.log(`ÌæÆ Simulation Dashboard: http://localhost:${PORT}/simulation/simulation-dashboard.html`);
    console.log(`‚ù§Ô∏è  Health Check: http://localhost:${PORT}/health`);
    console.log('‚úÖ Ready for blockchain integration');
    console.log('‚úÖ ALL MOCK DATA REMOVED');
});
