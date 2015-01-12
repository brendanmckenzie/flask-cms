import os
from flask import Blueprint, g, abort, Response
from functools import wraps

path = os.path.dirname(os.path.realpath(__file__))

cms = Blueprint('cms', __name__,
                template_folder=path + '/../templates',
                static_folder=path + '/../static',
                url_prefix='/cms')


def requires_admin(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user' not in g or not g.user:
            abort(401)
        elif not g.user.admin:
            abort(403)
        return f(*args, **kwargs)
    return decorated


def empty_response():
    return Response('', status=204)

import views
import api

__all__ = ['views', 'api']
