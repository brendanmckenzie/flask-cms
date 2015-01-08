from flask import render_template, g, abort
from . import cms, requires_admin


@cms.route('')
@requires_admin
def home():
    return render_template('home.html')
