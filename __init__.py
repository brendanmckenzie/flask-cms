from flask import render_template, abort
from sqlalchemy import and_

main_app = None
config = {}
config['template_root'] = 'cms_content/'
config['s3'] = {}


def get_node_from_hier(db, hier):
    # eventually this will be nice and efficient
    from .model import Node
    cur_node = None
    for alias in hier:
        node = None
        if cur_node is None:
            node = db.query(Node).filter(and_(Node.alias == alias, Node.parent_id == None))
        else:
            node = db.query(Node).filter(and_(Node.alias == alias, Node.parent_id == cur_node.id))
        if any(node):
            cur_node = node[0]
        else:
            return None

    return cur_node


def init_cms(app, db, s3_config, template_root=None):
    global main_app

    main_app = app

    config['db'] = db
    if template_root:
        config['template_root'] = template_root

    if s3_config:
        config['s3'] = s3_config

    from web import cms
    from web.api import cms_api

    app.register_blueprint(cms)
    app.register_blueprint(cms_api)

    @app.route('/')
    @app.route('/<path:path>')
    def render_node(path=None):
        from .model import Session
        db = Session()
        try:
            hier = (path or '').split('/')
            if hier == ['']:
                hier = ['home']

            node = get_node_from_hier(db, hier)
            if node is None:
                abort(404)
            else:
                data = node.document.latest_version().data
                template = config['template_root'] + node.document.template
                return render_template(template, **data)
        finally:
            db.close()
