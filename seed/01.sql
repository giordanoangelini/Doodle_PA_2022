DROP TABLE IF EXISTS preference;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS user;

CREATE TABLE event (
  id int(11) NOT NULL,
  title varchar(100) NOT NULL,
  owner varchar(100) NOT NULL,
  modality int(1) NOT NULL,
  datetimes longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`datetimes`)),
  status int(1) NOT NULL DEFAULT 1,
  latitude float DEFAULT NULL,
  longitude float DEFAULT NULL,
  link varchar(100) DEFAULT NULL
);

CREATE TABLE preference (
  event_id int(11) NOT NULL,
  datetime varchar(25) NOT NULL,
  email varchar(100) NOT NULL,
  name varchar(30) NOT NULL,
  surname varchar(30) NOT NULL
);

CREATE TABLE user (
  email varchar(100) NOT NULL,
  name varchar(30) NOT NULL,
  surname varchar(30) NOT NULL,
  role varchar(5) NOT NULL,
  token int(11) NOT NULL
);

ALTER TABLE event
  ADD PRIMARY KEY (id),
  ADD KEY owner_email (owner);

ALTER TABLE preference
  ADD PRIMARY KEY (event_id, datetime, email);

ALTER TABLE user
  ADD PRIMARY KEY (email);

ALTER TABLE event
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE event
  ADD CONSTRAINT owner_id FOREIGN KEY (owner) REFERENCES user (email) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE preference
  ADD CONSTRAINT event_id FOREIGN KEY (event_id) REFERENCES event (id) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO user (email, name, surname, role, token) VALUES 
  ('antonio@email.com', 'Antonio', 'Bandello', 'admin', 0),
  ('giordano@email.com', 'Giordano', 'Angelini', 'user', 10),
  ('cristian@email.com', 'Cristian', 'Di Silvestre', 'user', 3),
  ('adriano@email.com', 'Adriano', 'Mancini', 'user', 10);;

INSERT INTO event (title, owner, modality, datetimes, status, latitude, longitude, link) VALUES
  ('Riunione di Staff', 'giordano@email.com', 1, '["2022-06-01T21:00:00+01:00","2022-06-02T21:00:00+01:00","2022-06-03T21:00:00+01:00","2022-06-04T21:00:00+01:00","2022-06-05T21:00:00+01:00"]', 1, NULL, NULL, NULL),
  ('Disponibilità sala studio', 'cristian@email.com', 2, '["2022-06-01T14:00:00+01:00","2022-06-01T15:00:00+01:00","2022-06-01T16:00:00+01:00","2022-06-01T17:00:00+01:00","2022-06-01T18:00:00+01:00"]', 1, NULL, NULL, NULL),
  ('Esame di Programmazione Avanzata', 'adriano@email.com', 3, '["2022-06-15T09:00:00+01:00","2022-06-15T09:30:00+01:00","2022-06-15T10:00:00+01:00","2022-06-15T10:30:00+01:00","2022-06-15T11:00:00+01:00"]', 1, NULL, NULL, NULL),
  ('Riunione Scout', 'giordano@email.com', 1, '["2022-06-01T15:00:00+01:00","2022-06-02T15:00:00+01:00","2022-06-03T15:00:00+01:00","2022-06-04T15:00:00+01:00","2022-06-05T15:00:00+01:00"]', 1, NULL, NULL, NULL),
  ('Riunione Scout', 'giordano@email.com', 1, '["2022-06-10T15:00:00+01:00","2022-06-11T15:00:00+01:00","2022-06-12T15:00:00+01:00","2022-06-13T15:00:00+01:00","2022-06-14T15:00:00+01:00"]', 1, NULL, NULL, NULL),
  ('Riunione Scout', 'giordano@email.com', 1, '["2022-06-20T15:00:00+01:00","2022-06-21T15:00:00+01:00","2022-06-22T15:00:00+01:00","2022-06-23T15:00:00+01:00","2022-06-24T15:00:00+01:00"]', 0, NULL, NULL, NULL);

INSERT INTO preference (event_id, datetime, email, name, surname) VALUES
  (1, "2022-06-01T21:00:00+01:00", "mario@email.com", "Mario", "Rossi"),
  (1, "2022-06-02T21:00:00+01:00", "mario@email.com", "Mario", "Rossi"),
  (1, "2022-06-03T21:00:00+01:00", "mario@email.com", "Mario", "Rossi"),
  (1, "2022-06-04T21:00:00+01:00", "mario@email.com", "Mario", "Rossi"),
  (1, "2022-06-05T21:00:00+01:00", "mario@email.com", "Mario", "Rossi"),
  (1, "2022-06-01T21:00:00+01:00", "luigi@email.com", "Luigi", "Rossi"),
  (1, "2022-06-02T21:00:00+01:00", "luigi@email.com", "Luigi", "Rossi"),
  (1, "2022-06-03T21:00:00+01:00", "luigi@email.com", "Luigi", "Rossi"),
  (1, "2022-06-01T21:00:00+01:00", "giuseppe@email.com", "Giuseppe", "Rossi"),
  (2, "2022-06-01T14:00:00+01:00", "mario@email.com", "Mario", "Rossi"),
  (2, "2022-06-01T15:00:00+01:00", "mario@email.com", "Mario", "Rossi"),
  (2, "2022-06-01T16:00:00+01:00", "giuseppe@email.com", "Giuseppe", "Rossi"),
  (3, "2022-06-15T09:00:00+01:00", "luigi@email.com", "Luigi", "Rossi");