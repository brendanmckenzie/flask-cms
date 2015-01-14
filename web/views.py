from flask import render_template, g, abort
from . import cms, requires_admin


@cms.route('')
@cms.route('/<path:path>')
@requires_admin
def home(path=None):
    return render_template('home.html')
