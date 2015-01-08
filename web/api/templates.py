from cms import main_app
from . import cms_api, json_response

TEMPLATE_DIR_PREFIX = 'cms_content/'


@cms_api.route('/templates', methods=['GET'])
def get_templates():
    templates = main_app.jinja_env.loader.list_templates()

    templates = [t[len(TEMPLATE_DIR_PREFIX):] for t in templates if t.startswith(TEMPLATE_DIR_PREFIX)]

    return json_response(templates)
