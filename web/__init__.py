from flask import Blueprint

cms = Blueprint('cms', __name__,
                template_folder='../../cms/templates',
                static_folder='../../cms/static',
                url_prefix='/cms')

import views
import api

__all__ = ['views', 'api']
