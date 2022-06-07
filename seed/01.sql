DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS preference;

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
  ('antonio@email.com', 'Antonio', 'Bandello', 0, 0),
  ('giordano@email.com', 'Giordano', 'Angelini', 1, 10),
  ('cristian@email.com', 'Cristian', 'Di Silvestre', 1, 10);

INSERT INTO event (title, owner, modality, datetimes, status, latitude, longitude, link) VALUES
  ('Riunione di Staff', 'giordano@email.com', 1, '["2022-06-01T21:00:00+01:00","2022-06-02T21:00:00+01:00","2022-06-02T22:00:00+01:00"]', 1, NULL, NULL, NULL),
  ('Disponibilità sala studio', 'giordano@email.com', 2, '["2022-06-05+18:00:00+02:00","2022-06-05+19:00:00+01:00","2022-06-06T18:00:00+01:00"]', 1, NULL, NULL, NULL),
  ('Esame di Programmazione Avanzata', 'giordano@email.com', 3, '["2022-06-07T15:00:00+01:00","2022-06-08T15:00:00+01:00","2022-06-02T16:00:00+01:00"]', 1, NULL, NULL, NULL);

INSERT INTO preference (event_id, datetime, email, name, surname) VALUES
  (1, "2022-06-01T21:00:00+01:00", "mario@email.com", "Mario", "Rossi"),
  (1, "2022-06-01T21:00:00+01:00", "luigi@email.com", "Luigi", "Rossi"),
  (1, "2022-06-01T21:00:00+01:00", "giuseppe@email.com", "Giuseppe", "Rossi"),
  (1, "2022-06-02T22:00:00+01:00", "mario@email.com", "Mario", "Rossi"),
  (1, "2022-06-02T22:00:00+01:00", "luigi@email.com", "Luigi", "Rossi"),
  (1, "2022-06-02T21:00:00+01:00", "giuseppe@email.com", "Giuseppe", "Rossi");