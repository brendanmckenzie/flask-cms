import datetime
from flask import Blueprint, json, Response

cms_api = Blueprint('cms_api', __name__, url_prefix='/cms/api')

DATETIME_FORMAT = '%Y-%m-%dT%H:%M'
DATE_FORMAT = '%Y-%m-%d'
JSON_DATETIME_FORMAT = '%Y-%m-%dT%H:%M:%S'


class JsonEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime(JSON_DATETIME_FORMAT)
        elif isinstance(obj, datetime.date):
            return obj.strftime(DATE_FORMAT)

        return json.JSONEncoder.default(self, obj)


def json_response(data):
    return Response(json.dumps(data, cls=JsonEncoder, separators=(',', ':')), mimetype='application/json')

import doctypes
import nodes
import templates
import routes
import media

__all__ = ['doctypes', 'nodes', 'templates', 'routes', 'media']
