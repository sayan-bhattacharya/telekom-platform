# Student & Recruiter Talent Match Platform

<div align="center">

[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](frontend/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js_/_Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](backend/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)]()
[![JWT](https://img.shields.io/badge/Security-JWT_Auth-black?style=for-the-badge&logo=json-web-tokens&logoColor=white)]()

**A dual-sided web platform enabling student video resumes, skill profiling, and recruiter candidate ranking.**

</div>

---

## 📌 System Overview

This application bridges student researchers and academic/industry recruiters. Students submit structured application packages containing video resumes, cover letters, and transcripts, while recruiters evaluate candidates using automated skill-match scoring and ranking tools.

---

## 🔄 Dual-Portal Workflow & Architecture

```mermaid
graph TD
    classDef student fill:#eff6ff,stroke:#1e40af,stroke-width:2px;
    classDef server fill:#f0fdf4,stroke:#15803d,stroke-width:2px;
    classDef recruiter fill:#fefce8,stroke:#a16207,stroke-width:2px;
    classDef db fill:#fdf2f8,stroke:#be185d,stroke-width:2px;

    subgraph StudentPortal ["🎓 Student Experience"]
        S_Register[Sign Up & Authentication] --> S_Profile[Profile & Video Resume Upload]
        S_Profile --> S_Apply[Job & Research Topic Application]
    end

    subgraph CoreBackend ["⚙️ Express.js & Media Gateway"]
        AuthMid[JWT Auth Middleware]
        MulterPipe[Multer Media & Document Pipeline]
        RankEngine[Candidate Matching & Ranking Algorithm]
    end

    subgraph DataStore ["💾 Storage & Persistence"]
        Mongo[(MongoDB Atlas Database)]
    end

    subgraph RecruiterPortal ["🏢 Recruiter Experience"]
        R_Login[Recruiter Authentication] --> R_Dash[Applicant Review Dashboard]
        R_Dash --> R_Eval[Video Playback & Candidate Scoring]
    end

    S_Register & S_Apply --> AuthMid
    S_Profile --> MulterPipe --> Mongo
    Mongo --> RankEngine --> R_Dash

    class S_Register,S_Profile,S_Apply student;
    class AuthMid,MulterPipe,RankEngine server;
    class R_Login,R_Dash,R_Eval recruiter;
    class Mongo db;
```

---

## 🚀 Setup & Local Execution

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB instance)

### Backend Configuration
```bash
cd backend
npm install

# Create .env file
# MONGODB_URI=your_mongodb_uri
# JWT_SECRET=your_jwt_secret
# PORT=5001

npm start
```

### Frontend Configuration
```bash
cd ../frontend
npm install
npm start
```

The frontend will run at `http://localhost:3000` and communicate with the backend at `http://localhost:5001`.

---

## 📬 Contact

- **Author**: Sayan Bhattacharya
- **Email**: [sayanpm17@gmail.com](mailto:sayanpm17@gmail.com)
- **LinkedIn**: [linkedin.com/in/snbhattacharya5](https://www.linkedin.com/in/snbhattacharya5/)
