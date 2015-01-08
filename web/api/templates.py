from cms import main_app, config
from . import cms_api, json_response


@cms_api.route('/templates', methods=['GET'])
def get_templates():
    templates = main_app.jinja_env.loader.list_templates()

    templates = [t[len(config['template_root']):] for t in templates if t.startswith(config['template_root'])]

    return json_response(templates)
