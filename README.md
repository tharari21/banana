CREATE TABLE user_sessions(
id SERIAL PRIMARY KEY,
user_id integer REFERENCES users (id)
);

Get IP address: 
`ipconfig getifaddr en0`

`TOMER_IP=10.129.2.168 npm run server`