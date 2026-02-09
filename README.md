# Eklavya Group Tution Website

**Official website for Eklavya Group Tution – 26 Years of Mathematical Excellence**

Mathematics coaching for Class 3-12, Board Exams & JEE preparation in Ahmedabad.

---

## 🚀 Quick Start

1. Clone the repository
2. Open `index.html` in a browser, or run a local server:
   ```bash
   npx serve .
   ```
3. Visit `http://localhost:3000`

---

## 📁 Project Structure

```
eklavya-group-tution-website/
├── index.html          # Main website (single page)
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # All JavaScript
├── data/               # ⭐ EDIT THESE TO UPDATE CONTENT
│   ├── achievements.json
│   ├── faculty.json
│   ├── events.json
│   └── gallery.json
└── images/             # Add your images here
```

---

## ✏️ How to Update Website Content

### 🏆 Update Student Achievements

Edit `data/achievements.json`:

```json
{
  "achievements": [
    {
      "id": 1,
      "icon": "🏆",
      "title": "Student Name - 98% in Boards",
      "description": "Class 12 CBSE Board Examination",
      "badge": "Board Exams",
      "year": "2025"
    }
  ]
}
```

### 👨‍🏫 Update Faculty Details

Edit `data/faculty.json`:

```json
{
  "mainFaculty": {
    "name": "Tushar Shah",
    "title": "Founder & Head Faculty",
    "image": "images/tushar-shah.jpg",  // Add photo path
    "bio": "Your bio here..."
  },
  "otherFaculty": [
    {
      "name": "Faculty Name",
      "subject": "Mathematics",
      "image": "images/faculty1.jpg"
    }
  ]
}
```

### 📢 Add Notices & Events

Edit `data/events.json`:

```json
{
  "notices": [
    {
      "id": 1,
      "title": "Admissions Open!",
      "description": "New batches starting soon",
      "important": true,
      "active": true
    }
  ],
  "events": [
    {
      "id": 1,
      "title": "Annual Day Celebration",
      "date": "2025-03-15",
      "location": "Jivrajpark Center",
      "active": true
    }
  ]
}
```

### 🖼️ Add Images

1. Add images to the `images/` folder
2. Reference them in JSON files like: `"image": "images/filename.jpg"`

---

## 📝 Step-by-Step Content Update Guide

### Adding a New Achievement:

1. Open `data/achievements.json`
2. Add a new object to the `achievements` array:
   ```json
   {
     "id": 7,
     "icon": "🌟",
     "title": "New Achievement Title",
     "description": "Description here",
     "badge": "Category",
     "year": "2025"
   }
   ```
3. Save the file
4. Commit and push to GitHub
5. Hostinger will auto-deploy (if enabled)

### Adding Faculty Photo:

1. Add photo to `images/` folder (e.g., `images/teacher.jpg`)
2. Open `data/faculty.json`
3. Update the `image` field:
   ```json
   "image": "images/teacher.jpg"
   ```
4. Save, commit, and push

---

## 📍 Locations

- Jivrajpark (2 centers)
- Dharnidhar (2 centers)

---

Made with ❤️ for Eklavya Group Tution
