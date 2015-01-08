import os
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.automap import automap_base

engine = create_engine('postgresql://:5433/cms_dev', pool_size=20, client_encoding='utf8')

Session = sessionmaker(bind=engine)

metadata = MetaData(engine, schema='cms')

Base = automap_base(metadata=metadata)

from models import Document, DocumentType, DocumentVersion, Node

Base.prepare(engine, reflect=True)


__all__ = ['Session', 'Base', 'Document', 'DocumentType',
           'DocumentVersion', 'Node']
