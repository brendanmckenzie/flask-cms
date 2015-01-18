from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.automap import automap_base
from .. import config

engine = create_engine(config['db'], pool_size=20, client_encoding='utf8')

Session = sessionmaker(bind=engine)

metadata = MetaData(engine, schema='cms')

Base = automap_base(metadata=metadata)

from models import Document, DocumentType, DocumentVersion, Node, Media

Base.prepare(engine, reflect=True)


__all__ = ['Session', 'Base', 'Document', 'DocumentType',
           'DocumentVersion', 'Node', 'Media']
