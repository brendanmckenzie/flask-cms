from flask import render_template
from . import cms


@cms.route('/cms')
def home():
    return render_template('home.html')
