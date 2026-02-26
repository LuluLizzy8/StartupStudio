import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Path to waitlist file
const waitlistFile = path.join(__dirname, 'waitlist.json');

// Initialize waitlist file if it doesn't exist
if (!fs.existsSync(waitlistFile)) {
    fs.writeFileSync(waitlistFile, JSON.stringify([], null, 2));
}

// Helper function to read waitlist
function readWaitlist() {
    try {
        const data = fs.readFileSync(waitlistFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Helper function to write waitlist
function writeWaitlist(data) {
    fs.writeFileSync(waitlistFile, JSON.stringify(data, null, 2));
}

// GET /api/waitlist - Get all waitlist entries (admin only - add auth later)
app.get('/api/waitlist', (req, res) => {
    try {
        const waitlist = readWaitlist();
        res.json({
            success: true,
            count: waitlist.length,
            data: waitlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve waitlist'
        });
    }
});

// POST /api/waitlist - Add new entry to waitlist
app.post('/api/waitlist', (req, res) => {
    try {
        const { name, email, schoolYear, timestamp } = req.body;

        // Validation
        if (!name || !email || !schoolYear) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: name, email, schoolYear'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email address'
            });
        }

        const waitlist = readWaitlist();

        // Check if email already exists
        if (waitlist.some(entry => entry.email.toLowerCase() === email.toLowerCase())) {
            return res.status(409).json({
                success: false,
                error: 'Email already registered for waitlist'
            });
        }

        // Create new entry
        const newEntry = {
            id: Date.now().toString(),
            name: name.trim(),
            email: email.toLowerCase().trim(),
            schoolYear,
            timestamp: timestamp || new Date().toISOString(),
            position: waitlist.length + 1
        };

        // Add to waitlist
        waitlist.push(newEntry);
        writeWaitlist(waitlist);

        console.log(`✅ New waitlist entry: ${newEntry.name} (${newEntry.email})`);

        res.status(201).json({
            success: true,
            message: 'Successfully added to waitlist',
            data: newEntry
        });

    } catch (error) {
        console.error('Error processing waitlist submission:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to add to waitlist. Please try again.'
        });
    }
});

// GET /api/waitlist/stats - Get waitlist statistics
app.get('/api/waitlist/stats', (req, res) => {
    try {
        const waitlist = readWaitlist();
        const schoolYearCounts = {};

        waitlist.forEach(entry => {
            schoolYearCounts[entry.schoolYear] = (schoolYearCounts[entry.schoolYear] || 0) + 1;
        });

        res.json({
            success: true,
            totalSignups: waitlist.length,
            bySchoolYear: schoolYearCounts,
            lastEntry: waitlist[waitlist.length - 1] || null
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve statistics'
        });
    }
});

// DELETE /api/waitlist/:id - Remove entry (for testing/admin)
app.delete('/api/waitlist/:id', (req, res) => {
    try {
        const { id } = req.params;
        let waitlist = readWaitlist();
        const initialLength = waitlist.length;

        waitlist = waitlist.filter(entry => entry.id !== id);

        if (waitlist.length === initialLength) {
            return res.status(404).json({
                success: false,
                error: 'Entry not found'
            });
        }

        writeWaitlist(waitlist);

        res.json({
            success: true,
            message: 'Entry removed from waitlist'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to remove entry'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 NoticeMe server running at http://localhost:${PORT}`);
    console.log(`📝 Waitlist stored in: ${waitlistFile}\n`);
});
