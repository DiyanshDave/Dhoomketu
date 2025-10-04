# 🌠 Dhoomketu - Meteor Impact Simulator

**NASA Space Apps Challenge 2025: Meteor Madness**

A 3D web application for visualizing and simulating meteor impacts on Earth, built with React, Three.js, and Flask.

## 🚀 Features

- **3D Earth Visualization**: Interactive 3D globe with realistic textures
- **Selectable Meteors**: Choose from various meteor types with different compositions, sizes, and velocities
- **Impact Simulation**: Real-time physics-based impact calculations
- **Detailed Results**: Comprehensive impact analysis including:
  - Crater size and depth
  - Energy released (in Joules and TNT equivalent)
  - Estimated casualties
  - Earthquake magnitude
  - Impact velocity
  - Affected radius
- **Beautiful UI**: Modern, responsive interface with smooth animations

## 📁 Project Structure

```
Dhoomketu/
├── backend/              # Flask API server
│   ├── app.py           # Main Flask application
│   ├── data/
│   │   └── meteors.json # Sample meteor data
│   └── requirements.txt # Python dependencies
├── frontend/            # React + Vite application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   └── package.json     # Node.js dependencies
└── .github/
    └── workflows/       # GitHub Actions CI/CD
```

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- Python 3.9 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Running the Application

### Start the Backend

```bash
cd backend
python app.py
```

The Flask server will start at `http://localhost:5000`

### Start the Frontend

In a separate terminal:

```bash
cd frontend
npm run dev
```

The development server will start at `http://localhost:5173`

Open your browser and navigate to `http://localhost:5173` to use the application.

## 🎮 Usage

1. **Select a Meteor**: Click on one of the floating meteors orbiting Earth
2. **View Details**: Check the meteor's properties in the left panel (diameter, mass, composition, velocity, angle)
3. **Launch**: Click the "🚀 Launch" button to simulate the impact
4. **View Results**: See the detailed impact analysis in the right panel
5. **Reset**: Click "🔄 Reset" to start over

## 🔌 API Endpoints

### GET `/meteors`
Get list of available meteors

**Response:**
```json
[
  {
    "id": 1,
    "name": "Small Iron Meteor",
    "diameter": 10,
    "mass": 3000,
    "composition": "Iron",
    "density": 7800,
    "velocity": 17000,
    "angle": 45
  }
]
```

### POST `/simulate`
Simulate meteor impact

**Request Body:**
```json
{
  "diameter": 100,
  "mass": 1000000,
  "velocity": 20000,
  "angle": 45,
  "density": 3000,
  "lat": 0,
  "lng": 0
}
```

**Response:**
```json
{
  "success": true,
  "impact_location": {"lat": 0, "lng": 0},
  "crater": {"diameter": 1250.5, "depth": 312.6, "unit": "meters"},
  "casualties": 15000,
  "velocity": 20000,
  "energy": {"joules": 2e14, "kilotons": 47.8},
  "quake_magnitude": 6.5,
  "affected_radius": 692.0
}
```

### GET `/health`
Health check endpoint

## 🧪 Testing

### Frontend

```bash
cd frontend
npm run lint    # Run ESLint
npm run build   # Build for production
```

### Backend

```bash
cd backend
python -m py_compile app.py  # Check syntax
```

## 🚢 Deployment

### Build Frontend for Production

```bash
cd frontend
npm run build
```

The optimized production build will be in `frontend/dist/`

### Production Backend

For production deployment, use a WSGI server like Gunicorn:

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 🤝 Contributing

This project was created for the NASA Space Apps Challenge 2025. Contributions are welcome!

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- NASA Space Apps Challenge
- Three.js community
- React Three Fiber team

## 👥 Team

Built with ❤️ for NASA Space Apps Challenge 2025
