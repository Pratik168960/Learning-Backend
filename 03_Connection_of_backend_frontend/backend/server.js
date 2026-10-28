// Using ES Modules (import) because we added "type": "module" in package.json
import express from 'express';

const app = express();

// Use environment port or default to 3000
const port = process.env.PORT || 3000;

// Root route
app.get('/', (req, res) => {
    res.send('Server is ready');
});

// GET route for jokes (Standardized with /api/v1/)
app.get('/api/jokes', (req, res) => {
    const jokes = [
        { id: 1, title: 'A joke', content: 'This is a joke' },
        { id: 2, title: 'Another joke', content: 'This is another joke' },
        { id: 3, title: 'Third joke', content: 'This is the third joke' },
        { id: 4, title: 'Fourth joke', content: 'This is the fourth joke' },
        { id: 5, title: 'Fifth joke', content: 'This is the fifth joke' }
    ];
    // Express automatically converts the array of objects into JSON
    res.send(jokes);
});

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});