def init_cms(app):
    from web import cms
    from web.api import cms_api

    app.register_blueprint(cms)
    app.register_blueprint(cms_api)
