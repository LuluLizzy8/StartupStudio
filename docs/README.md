# NoticeMe Landing Page with Waitlist

A modern, responsive landing page for NoticeMe with integrated waitlist functionality.

## 📁 Files

- `index.html` - Main landing page with waitlist form
- `style.css` - Complete styling with brand colors
- `server.js` - Express backend to handle waitlist submissions
- `package.json` - Node.js dependencies
- `waitlist.json` - (Auto-created) Stores all waitlist signups

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ installed on your system

### Setup & Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

The landing page will load, and the waitlist form will be fully functional.

## 📊 API Endpoints

### Get All Waitlist Entries
```
GET /api/waitlist
```
Returns all signups with count and details.

**Response:**
```json
{
  "success": true,
  "count": 42,
  "data": [
    {
      "id": "1708876234567",
      "name": "John Doe",
      "email": "john@example.com",
      "schoolYear": "junior",
      "timestamp": "2026-02-25T10:30:34.567Z",
      "position": 1
    }
  ]
}
```

### Add to Waitlist
```
POST /api/waitlist
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "schoolYear": "sophomore"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully added to waitlist",
  "data": {
    "id": "1708876234567",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "schoolYear": "sophomore",
    "timestamp": "2026-02-25T10:30:34.567Z",
    "position": 1
  }
}
```

### Get Waitlist Statistics
```
GET /api/waitlist/stats
```
Returns signup count and breakdown by school year.

**Response:**
```json
{
  "success": true,
  "totalSignups": 42,
  "bySchoolYear": {
    "college-freshman": 8,
    "sophomore": 12,
    "junior": 15,
    "senior": 7
  },
  "lastEntry": { ... }
}
```

### Remove Entry (Testing/Admin)
```
DELETE /api/waitlist/{id}
```
Remove a specific entry by ID.

## 📝 Data Storage

Waitlist entries are stored in `waitlist.json` in a simple JSON format. This is perfect for starting out, and you can migrate to a proper database (MongoDB, PostgreSQL, etc.) later without changing the API.

### Sample waitlist.json
```json
[
  {
    "id": "1708876234567",
    "name": "John Doe",
    "email": "john@example.com",
    "schoolYear": "junior",
    "timestamp": "2026-02-25T10:30:34.567Z",
    "position": 1
  },
  {
    "id": "1708876345678",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "schoolYear": "sophomore",
    "timestamp": "2026-02-25T10:31:45.678Z",
    "position": 2
  }
]
```

## 🎨 Brand Colors

- **Primary Blue:** `#4C6FFF`
- **Secondary Green:** `#6BCB77`
- **Warm Highlight:** `#FFB86B`
- **Light Background:** `#F7F9FC`

## 🔒 Security Notes

For production, consider adding:
- Email verification (confirmation links)
- Rate limiting to prevent spam
- CORS restrictions
- Authentication for admin endpoints
- Database encryption for sensitive data
- Environment variables for configuration

## 🚀 Future Enhancements

- [ ] Email confirmation verification
- [ ] Admin dashboard to view and manage signups
- [ ] CSV export of waitlist
- [ ] Email notifications when product launches
- [ ] Referral tracking
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Analytics dashboard

## 📧 Support

For questions or issues, please check the code comments or contact the development team.
