from flask import url_for
from cms import main_app
from . import cms_api, json_response
from .. import requires_admin


@cms_api.route('/all-routes', methods=['GET'])
@requires_admin
def routes():
    ret = []
    for r in main_app.url_map.iter_rules():
        ret += [{'url': r.rule,
                 'name': r.endpoint,
                 'methods': list(r.methods)}]

    ret = sorted(ret, key=lambda r: r['url'])

    return json_response(ret)
