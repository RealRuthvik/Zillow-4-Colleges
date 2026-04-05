from flask import Flask, jsonify, request, send_from_directory
import json
import os
from werkzeug.utils import secure_filename

app = Flask(__name__, static_url_path='', static_folder='static')

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DATA_JSON_PATH = 'database.json'
MAIN_SITE_JS_PATH = os.path.join(BASE_DIR, 'js', 'data.js')
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def initialize_db():
    if not os.path.exists(DATA_JSON_PATH):
        with open(DATA_JSON_PATH, 'w', encoding='utf-8') as f:
            json.dump([], f)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'css'), filename)

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'js'), filename)

@app.route('/uploads/<path:filename>')
def serve_uploads(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No filename"}), 400
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)
    return jsonify({"url": "/uploads/" + filename})

@app.route('/api/data', methods=['GET'])
def get_data():
    initialize_db()
    with open(DATA_JSON_PATH, 'r', encoding='utf-8') as f:
        return jsonify(json.load(f))

@app.route('/api/data', methods=['POST'])
def save_data():
    data = request.json
    with open(DATA_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

    js_content = "const COLLEGES = " + json.dumps(data, indent=2) + ";\n\n"
    js_content += "function getAllPlacementQuestions() {\n"
    js_content += "  const all = [];\n"
    js_content += "  COLLEGES.forEach(college => {\n"
    js_content += "    if (college.placementQuestions) {\n"
    js_content += "      college.placementQuestions.forEach(pq => {\n"
    js_content += "        all.push({ ...pq, collegeId: college.id, collegeName: college.shortName });\n"
    js_content += "      });\n"
    js_content += "    }\n"
    js_content += "  });\n"
    js_content += "  return all;\n"
    js_content += "}\n\n"
    js_content += "export { COLLEGES, getAllPlacementQuestions };\n"

    with open(MAIN_SITE_JS_PATH, 'w', encoding='utf-8') as f:
        f.write(js_content)

    return jsonify({"status": "success"})

if __name__ == '__main__':
    initialize_db()
    app.run(port=5000)