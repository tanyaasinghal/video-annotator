# 🎥 Video Annotator

A schema-driven desktop application for annotating videos.

Built with **Electron**, **React**, and **Material UI**, Video Annotator is designed for efficiently labeling large video datasets while keeping everything completely offline. The application is fully schema-driven, allowing it to be adapted for different annotation tasks simply by modifying a JSON schema.

---

## ✨ Features

- 🎥 Annotate videos one at a time
- 📂 Open any folder containing videos
- 🧩 Fully schema-driven annotation interface
- 📝 Automatically creates `annotation-schema.json` if it doesn't exist
- 💾 Automatically creates and saves `labels.json`
- 📊 Export annotations to Excel (`.xlsx`)
- ⌨️ Keyboard shortcuts for fast navigation
  - **A** → Previous Video
  - **D** → Next Video
- 🖥️ Works completely offline
- 💻 Cross-platform (Windows & macOS)

---

# 🚀 Installation

## Prerequisites

Make sure you have the following installed:

- Node.js (v18 or later recommended)
- npm

Clone the repository:

```bash
git clone https://github.com/<your-username>/video-annotator.git
```

Navigate to the project directory:

```bash
cd video-annotator
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

The Electron application will launch automatically.

---

# 📂 How to Use

1. Launch the application.

2. Click **Open Folder**.

3. Select a folder containing your videos.

4. If the folder does not already contain:

```
annotation-schema.json
labels.json
```

the application will automatically create them.

5. Annotate your videos.

6. Click **Export Excel** to export all annotations.

---

# 📁 Dataset Structure

Each dataset is completely self-contained.

```
Dataset/

├── video1.mp4
├── video2.mp4
├── video3.mp4
├── annotation-schema.json
└── labels.json
```

Everything required for annotation lives alongside the videos.

---

# 🧩 Annotation Schema

The application is entirely driven by `annotation-schema.json`.

### Simple Category

```json
{
  "id": "shotElevation",
  "name": "Shot Elevation",
  "type": "simple",
  "options": [
    "Grounded",
    "Aerial"
  ]
}
```

### Grouped Category

```json
{
  "id": "shotClassification",
  "name": "Shot Classification",
  "type": "group",
  "groups": [
    {
      "name": "Vertical Bat",
      "options": [
        "Cover Drive",
        "Straight Drive"
      ]
    }
  ]
}
```

New categories can be added simply by modifying the schema.

No code changes are required.

---

# 📝 Labels Format

Annotations are stored in `labels.json`.

Example:

```json
{
  "video1.mp4": {
    "shotElevation": "Grounded",
    "shotClassificationGroup": "Vertical Bat",
    "shotClassification": "Cover Drive",
    "shotDirectionGroup": "Offside",
    "shotDirection": "Cover"
  }
}
```

---

# 📊 Excel Export

Annotations can be exported to Excel with one row per video.

| Video Name | Shot Elevation | Shot Classification Group | Shot Classification | Shot Direction Group | Shot Direction |
|------------|----------------|---------------------------|---------------------|----------------------|----------------|
| video1.mp4 | Grounded | Vertical Bat | Cover Drive | Offside | Cover |

---

# ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **A** | Previous Video |
| **D** | Next Video |

---

# 🏗️ Building

To create production builds:

### Windows

```bash
npm run build:win
```

### macOS

```bash
npm run build:mac
```

> **Note:** Pre-built installers (`.exe` and `.dmg`) will be added in a future release.

---

# 🛠️ Built With

- Electron
- React
- Material UI
- Zustand
- SheetJS (xlsx)

---

# 🤝 Contributing

Contributions, bug reports, and feature requests are welcome.

If you'd like to improve the application, feel free to fork the repository, open an issue, or submit a pull request.

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates further development.