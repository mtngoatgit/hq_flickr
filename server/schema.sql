CREATE TABLE photos (
  id serial primary key not null,
  flick_id varchar (70),
  owner varchar (70),
  secret varchar (70),
  server varchar (70),
  farm int,
  title text,
  description text,
  date_taken varchar (70),
  searchTerm text
);
