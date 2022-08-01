CREATE TABLE user_sessions(
id SERIAL PRIMARY KEY,
user_id integer REFERENCES users (id)
);