from flask import render_template
from . import cms


@cms.route('')
def home():
    return render_template('home.html')
