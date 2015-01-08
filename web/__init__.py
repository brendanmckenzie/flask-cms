from flask import Blueprint

cms = Blueprint('cms', __name__)

import views
import api

__all__ = ['views', 'api']
