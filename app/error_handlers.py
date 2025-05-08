from flask import jsonify

def register_error_handlers(app):
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"msg": "Not Found"}), 404

    @app.errorhandler(500)
    def internal_error(e):
        return jsonify({"msg": "Internal Server Error"}), 500