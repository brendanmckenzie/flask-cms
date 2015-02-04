from datetime import datetime
import hashlib
from flask import request
import tinys3
from cms import config
from cms.model import Session, Media
from . import cms_api, json_response
from .. import requires_admin, empty_response


@cms_api.route('/media', methods=['GET'])
@requires_admin
def all_media():
    db = Session()
    try:
        ent = db.query(Media).all()

        return json_response([a.todict() for a in ent])
    finally:
        db.close()


@cms_api.route('/media', methods=['POST'])
@requires_admin
def media_upload():
    db = Session()
    try:
        ret = []

        bucket = config['s3']['bucket']
        s3 = tinys3.Connection(config['s3']['access_key'],
                               config['s3']['secret_key'],
                               tls=True)

        for fd in request.files.getlist('file'):
            # fd = request.files[name]
            # generate md5 hash
            m = hashlib.new('md5')
            m.update(fd.read())
            hash = m.hexdigest()
            path = hash[0:2] + hash[2:]
            # upload to s3
            s3.upload('media/' + path, fd, bucket)
            # store in database

            ent = Media()
            ent.created = datetime.utcnow()
            ent.modified = datetime.utcnow()
            ent.hash = hash
            ent.alias = fd.filename

            db.add(ent)

            db.commit()

            ret += [ent]

        return json_response([e.todict() for e in ret])
    finally:
        db.close()


@cms_api.route('/media/<int:id>', methods=['DELETE'])
@requires_admin
def media_delete(id):
    db = Session()
    try:
        ent = db.query(Media).get(id)

        db.delete(ent)

        db.commit()

        return empty_response()
    finally:
        db.close()
