from flask import url_for
from cms import main_app, config
from . import cms_api, json_response
from .. import requires_admin


@cms_api.route('/templates', methods=['GET'])
@requires_admin
def templates():
    templates = main_app.jinja_env.loader.list_templates()

    templates = [t[len(config['template_root']):] for t in templates if t.startswith(config['template_root'])]

    return json_response(templates)
