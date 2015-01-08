from sqlalchemy.orm import relationship
from . import Base


class Document(Base):
    __tablename__ = 'document'

    version_collection = relationship("DocumentVersion", collection_class=set)

    def latest_version(self):
        versions = sorted(self.version_collection, key=lambda v: v.created, reverse=True)

        if any(versions):
            return versions[0]

    def todict(self):
        ret = {'id': self.id,
               'type_id': self.type_id,
               'template': self.template,
               'docType': self.documenttype.todict(),
               'data': None,
               'created': self.created,
               'modified': self.modified}

        latest = self.latest_version()
        if latest:
            ret['data'] = latest.data

        return ret


class DocumentType(Base):
    __tablename__ = 'document_type'

    def todict(self):
        return {'id': self.id,
                'name': self.name,
                'alias': self.alias,
                'fields': self.fields,
                'created': self.created,
                'modified': self.modified}


class DocumentVersion(Base):
    __tablename__ = 'document_version'

    def todict(self):
        return {'id': self.id,
                'document_id': self.document_id,
                'data': self.data,
                'is_current': self.is_current,
                'created': self.created,
                'modified': self.modified}


class Node(Base):
    __tablename__ = 'node'

    def todict(self):
        return {'id': self.id,
                'path': self.path,
                'alias': self.alias,
                'document_id': self.document_id,
                'parent_id': self.parent_id,
                'is_published': self.is_published,
                'published': self.published,
                'document': self.document.todict()}
