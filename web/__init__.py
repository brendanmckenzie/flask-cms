import os
from flask import Blueprint

path = os.path.dirname(os.path.realpath(__file__))

cms = Blueprint('cms', __name__,
                template_folder=path + '/../templates',
                static_folder=path + '/../static',
                url_prefix='/cms')

import views
import api

__all__ = ['views', 'api']
