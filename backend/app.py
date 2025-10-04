from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import math
import os

app = Flask(__name__)
CORS(app)

# Load meteor data
def load_meteors():
    data_path = os.path.join(os.path.dirname(__file__), 'data', 'meteors.json')
    with open(data_path, 'r') as f:
        return json.load(f)

@app.route('/meteors', methods=['GET'])
def get_meteors():
    """Get list of available meteors"""
    meteors = load_meteors()
    return jsonify(meteors)

@app.route('/simulate', methods=['POST'])
def simulate_impact():
    """Simulate meteor impact and return results"""
    data = request.json
    
    # Extract parameters
    diameter = data.get('diameter', 100)  # meters
    mass = data.get('mass', 1000000)  # kg
    velocity = data.get('velocity', 20000)  # m/s
    angle = data.get('angle', 45)  # degrees
    density = data.get('density', 3000)  # kg/m³
    lat = data.get('lat', 0)  # latitude
    lng = data.get('lng', 0)  # longitude
    
    # Calculate impact energy (kinetic energy in Joules)
    # E = 0.5 * m * v²
    energy = 0.5 * mass * (velocity ** 2)
    
    # Convert to kilotons of TNT (1 kiloton = 4.184 × 10^12 J)
    energy_kilotons = energy / (4.184e12)
    
    # Calculate crater dimensions
    # Simplified crater scaling law
    # Crater diameter (m) ≈ 1.25 * D^0.78 * (v^2 / g)^0.33
    g = 9.81  # gravitational acceleration
    crater_diameter = 1.25 * (diameter ** 0.78) * ((velocity ** 2) / g) ** 0.33
    
    # Crater depth is typically 1/5 to 1/3 of diameter
    crater_depth = crater_diameter / 4
    
    # Estimate casualties based on energy and population density
    # Simplified model: larger impacts affect larger areas
    affected_radius = math.sqrt(energy_kilotons) * 100  # radius in meters
    population_density = 100  # simplified: people per km²
    affected_area = math.pi * (affected_radius / 1000) ** 2  # km²
    casualties = int(affected_area * population_density)
    
    # Calculate earthquake magnitude using energy
    # Richter scale: M = (log10(E) - 4.8) / 1.5
    if energy > 0:
        quake_magnitude = (math.log10(energy) - 4.8) / 1.5
    else:
        quake_magnitude = 0
    
    # Clamp magnitude to reasonable range
    quake_magnitude = max(0, min(10, quake_magnitude))
    
    results = {
        "success": True,
        "impact_location": {
            "lat": lat,
            "lng": lng
        },
        "crater": {
            "diameter": round(crater_diameter, 2),
            "depth": round(crater_depth, 2),
            "unit": "meters"
        },
        "casualties": casualties,
        "velocity": velocity,
        "energy": {
            "joules": energy,
            "kilotons": round(energy_kilotons, 2)
        },
        "quake_magnitude": round(quake_magnitude, 2),
        "affected_radius": round(affected_radius, 2)
    }
    
    return jsonify(results)

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
