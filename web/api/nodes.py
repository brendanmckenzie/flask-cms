from datetime import datetime
from flask import request
from cms.model import Session, Node, Document, DocumentVersion
from . import cms_api, json_response
from .. import requires_admin


@cms_api.route('/nodes', methods=['GET'])
@requires_admin
def nodes():
    db = Session()
    try:
        ent = db.query(Node).all()

        return json_response([a.todict() for a in ent])
    finally:
        db.close()


@cms_api.route('/node/<int:id>', methods=['GET'])
@requires_admin
def node_get(id):
    db = Session()
    try:
        ent = db.query(Node).get(id)

        return json_response(ent.todict())
    finally:
        db.close()


@cms_api.route('/node/<int:id>', methods=['POST'])
@requires_admin
def node_update(id):
    db = Session()
    try:
        ent = db.query(Node).get(id)

        ent.alias = request.json['alias']

        ent.document.modified = datetime.utcnow()
        ent.document.template = request.json['document']['template']
        ent.document.type_id = request.json['document']['docType']['id']

        version = ent.document.latest_version()
        version.data = request.json['document']['data']
        version.modified = datetime.utcnow()

        db.commit()

        return json_response(ent.todict())
    finally:
        db.close()


@cms_api.route('/nodes', methods=['POST'])
@requires_admin
def node_create():
    db = Session()
    try:
        document = Document()
        document.template = request.json['document']['template']
        document.type_id = request.json['document']['docType']['id']

        version = DocumentVersion()
        version.document = document
        version.data = request.json['document']['data']

        node = Node()
        node.document = document
        node.alias = request.json['alias']

        if 'parent' in request.json:
            node.parent_id = request.json['parent']['id']
        node.path = []  # TODO: this will help building trees later.

        db.add(node)
        db.add(document)
        db.commit()

        return json_response({'id': node.id})
    finally:
        db.close()
