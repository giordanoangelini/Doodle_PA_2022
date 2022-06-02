DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS preference;

CREATE TABLE event (
  id int(11) NOT NULL,
  title varchar(100) NOT NULL,
  owner int(11) NOT NULL,
  gmt int(2) NOT NULL,
  modality int(1) NOT NULL,
  datetimes longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`datetimes`)),
  status int(1) NOT NULL,
  latitude float DEFAULT NULL,
  longitude float DEFAULT NULL,
  link varchar(100) DEFAULT NULL
);

CREATE TABLE preference (
  event_id int(11) NOT NULL,
  datetime datetime NOT NULL,
  email varchar(30) NOT NULL,
  name varchar(30) NOT NULL,
  surname varchar(30) NOT NULL
);

CREATE TABLE user (
  id int(11) NOT NULL,
  name varchar(30) NOT NULL,
  surname varchar(30) NOT NULL,
  role int(1) NOT NULL,
  token int(11) NOT NULL
);

ALTER TABLE event
  ADD PRIMARY KEY (id),
  ADD KEY owner_id (owner);

ALTER TABLE preference
  ADD PRIMARY KEY (event_id, datetime, email);

ALTER TABLE user
  ADD PRIMARY KEY (id);

ALTER TABLE event
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE user
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE event
  ADD CONSTRAINT owner_id FOREIGN KEY (owner) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE preference
  ADD CONSTRAINT event_id FOREIGN KEY (event_id) REFERENCES event (id) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO user (id, name, surname, role, token) VALUES 
  (NULL, 'Ciao', 'Ciao', '0', '1'),
  (NULL, 'Tre', 'Tre', '0', '1');