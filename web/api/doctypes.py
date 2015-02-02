import os
from datetime import datetime
from flask import request, json
from cms.model import Session, DocumentType
from . import cms_api, json_response, file_response
from .. import requires_admin


@cms_api.route('/doc-types', methods=['GET'])
@requires_admin
def doc_types():
    db = Session()
    try:
        ents = db.query(DocumentType).all()

        return json_response([a.todict() for a in ents])
    finally:
        db.close()


@cms_api.route('/field-types', methods=['GET'])
@requires_admin
def field_types():
    path = os.path.dirname(os.path.realpath(__file__))
    editors_path = path + '/../../static/editors'
    files = os.listdir(editors_path)

    files = [f[:-5] for f in files]

    return json_response(files)


@cms_api.route('/doc-types', methods=['POST'])
@requires_admin
def doc_type_create():
    db = Session()
    try:
        ent = DocumentType()
        ent.created = datetime.utcnow()
        ent.modified = datetime.utcnow()
        ent.name = request.json.get('name')
        ent.alias = request.json.get('alias')
        ent.fields = request.json.get('fields', [])

        db.add(ent)
        db.commit()

        return json_response({'id': ent.id})
    finally:
        db.close()


@cms_api.route('/doc-type/<int:id>', methods=['GET'])
@requires_admin
def doc_type_get(id):
    db = Session()
    try:
        ent = db.query(DocumentType).get(id)
        return json_response(ent.todict())
    finally:
        db.close()


@cms_api.route('/doc-type/<int:id>', methods=['POST'])
@requires_admin
def doc_type_update(id):
    db = Session()
    try:
        ent = db.query(DocumentType).get(id)
        ent.modified = datetime.utcnow()
        ent.name = request.json.get('name')
        ent.alias = request.json.get('alias')
        ent.fields = request.json.get('fields', [])
        db.commit()

        return json_response(ent.todict())
    finally:
        db.close()


@cms_api.route('/doc-type/<int:id>/export', methods=['GET'])
@requires_admin
def doc_type_export(id):
    db = Session()
    try:
        ent = db.query(DocumentType).get(id)

        ret = ent.todict()

        del ret['id']

        return file_response(ret, ent.alias + '.cms-dt')
    finally:
        db.close()


@cms_api.route('/doc-type/import', methods=['POST'])
@requires_admin
def doc_type_import():
    db = Session()
    try:
        # lookup doc type by alias
        # if not found, create
        # if found, update

        ret = []

        for fd in request.files.getlist('file'):
            content = fd.read()
            data = json.loads(content)

            ent = db.query(DocumentType).filter(DocumentType.alias == data['alias']).first()

            if not ent:
                ent = DocumentType()
                ent.created = data['created']
                ent.modified = data['modified']
                ent.alias = data['alias']

                db.add(ent)

            ent.name = data['name']
            ent.fields = data['fields']

            ret += [ent.todict()]

        db.commit()

        return json_response(ret)
    finally:
        db.close()
