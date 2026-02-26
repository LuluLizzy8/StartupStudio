import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// For Vercel deployment: data can be temporarily stored but won't persist across rebuilds
// For production, use: Vercel PostgreSQL, MongoDB Atlas, or Vercel KV

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Use /tmp for Vercel (read-only filesystem outside /tmp)
// Local development falls back to project root
const waitlistFile = process.env.VERCEL 
  ? '/tmp/waitlist.json' 
  : path.join(__dirname, '../waitlist.json');

function readWaitlist() {
    try {
        if (fs.existsSync(waitlistFile)) {
            const data = fs.readFileSync(waitlistFile, 'utf8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error('Error reading waitlist:', error);
        return [];
    }
}

function writeWaitlist(data) {
    try {
        fs.writeFileSync(waitlistFile, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing waitlist:', error);
    }
}

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // POST - Add to waitlist
    if (req.method === 'POST') {
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

        return res.status(201).json({
            success: true,
            message: 'Successfully added to waitlist',
            data: newEntry
        });
    }

    // GET - Retrieve waitlist
    if (req.method === 'GET') {
        try {
            const waitlist = readWaitlist();
            
            // Support /api/waitlist?stats=true for statistics
            if (req.query.stats === 'true') {
                const schoolYearCounts = {};
                waitlist.forEach(entry => {
                    schoolYearCounts[entry.schoolYear] = (schoolYearCounts[entry.schoolYear] || 0) + 1;
                });

                return res.status(200).json({
                    success: true,
                    totalSignups: waitlist.length,
                    bySchoolYear: schoolYearCounts,
                    lastEntry: waitlist[waitlist.length - 1] || null
                });
            }

            return res.status(200).json({
                success: true,
                count: waitlist.length,
                data: waitlist
            });
        } catch (error) {
            console.error('Error retrieving waitlist:', error);
            return res.status(500).json({
                success: false,
                error: 'Failed to retrieve waitlist'
            });
        }
    }

    // DELETE - Remove entry (admin)
    if (req.method === 'DELETE') {
        try {
            const { id } = req.query;
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

            return res.status(200).json({
                success: true,
                message: 'Entry removed from waitlist'
            });
        } catch (error) {
            console.error('Error deleting entry:', error);
            return res.status(500).json({
                success: false,
                error: 'Failed to remove entry'
            });
        }
    }

    // Method not allowed
    return res.status(405).json({
        success: false,
        error: 'Method not allowed'
    });
}
