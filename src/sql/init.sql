CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';
CREATE EXTENSION IF NOT EXISTS 'pgcrypto';

CREATE TABLE IF NOT EXISTS application_user(
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    PASSWORD VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
)

INSERT INTO application_user (username, password) VALUES ('Gus', crypt('admin', 'my_salt'));