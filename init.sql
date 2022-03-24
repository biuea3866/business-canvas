CREATE DATABASE OPEN_API;

use OPEN_API;

create TABLE resources(
    type VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    resource_id INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY
);

create TABLE doc_metadata(
    type VARCHAR(100) NOT NULL,
    creator VARCHAR(100) NOT NULL,
    origin VARCHAR(100) NOT NULL,
    resource_id INT(100) NOT NULL REFERENCES resources(resource_id),
    doc_meta_id INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY
);

create TABLE file_metadata(
    path VARCHAR(100) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size INT(100) NOT NULL,
    resource_id INT(100) NOT NULL REFERENCES resources(resource_id),
    file_meta_id INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY
);


create TABLE url_metadata(
    path VARCHAR(100) NOT NULL,
    url_meta_id INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    resource_id INT(100) NOT NULL REFERENCES resources(resource_id)
);

create TABLE doc_links(
    resource_ids INT(100) NOT NULL,
    resource_id INT(100) NOT NULL REFERENCES resources(resource_id)
);