from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/run', methods=['POST'])
def run_cmd():
    cmd = request.json.get('command')
    try:
        res = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=60)
        return jsonify({'stdout': res.stdout, 'stderr': res.stderr, 'exit_code': res.returncode})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Listens on your Tailscale IP on port 5000
    app.run(host='0.0.0.0', port=5000)
