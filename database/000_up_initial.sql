create schema cms;

create table cms.document_type (
    id serial not null primary key,
    name varchar(128) not null,
    alias varchar(128) not null,
    fields jsonb,

    created timestamp not null default current_timestamp,
    modified timestamp not null default current_timestamp
);

create table cms.document (
    id serial not null primary key,
    type_id integer not null references cms.document_type ( id ),
    template varchar(255) not null,

    created timestamp not null default current_timestamp,
    modified timestamp not null default current_timestamp
);

create table cms.document_version (
    id serial not null primary key,
    document_id integer not null references cms.document ( id ),
    data jsonb,
    is_current boolean not null default 'false',

    created timestamp not null default current_timestamp,
    modified timestamp not null default current_timestamp
);

create table cms.node (
    id serial not null primary key,
    path integer[] not null,
    parent_id integer references cms.node ( id ),
    alias varchar(128) not null,
    document_id integer not null references cms.document ( id ),
    is_published boolean not null default 'false',
    published timestamp
);
