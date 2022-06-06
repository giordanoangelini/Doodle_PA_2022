## Test del progetto (cURL)

### /create-event (Autenticazione JWT)
~~~
curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXRsZSI6IlJpdW5pb25lIGRpIFNUQUZGIiwib3duZXIiOiJnaW9yZGFub0BlbWFpbC5jb20iLCJkYXRldGltZXMiOlsiMjAyMi0wNi0wMSAyMTowMDowMCIsIjIwMjItMDYtMDIgMjE6MDA6MDAiLCIyMDIyLTA2LTAyIDIyOjAwOjAwIl0sImdtdCI6IisyIiwic3RhdHVzIjoxLCJtb2RhbGl0eSI6MSwibGF0aXR1ZGUiOjQzLjUyLCJsb25naXR1ZGUiOjEzLjM2LCJsaW5rIjoiaHR0cHM6Ly9tZWV0LmNvbSJ9.4uGdI8aSdCz8Z_KYZDkSNEIY_pKG8DXdJw7UDW6qy0U" localhost:8080/create-event
~~~

### /show-events (Autenticazione JWT)
~~~
curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6Imdpb3JkYW5vQGVtYWlsLmNvbSJ9.6cu9JqpdJO7ooLco6WxIfxeLppzZR9Huw7frSAojZ_Q" localhost:8080/show-events
~~~

### /delete-event (Autenticazione JWT)
~~~
curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.EM2EfYMcytBnJejLjjEX4FiYCn8TNCTG7LeB40h1eGc" localhost:8080/delete-event
~~~

### /close-event (Autenticazione JWT)
~~~
curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.EM2EfYMcytBnJejLjjEX4FiYCn8TNCTG7LeB40h1eGc" localhost:8080/close-event
~~~

### /show-bookings (Autenticazione JWT)
~~~
curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.EM2EfYMcytBnJejLjjEX4FiYCn8TNCTG7LeB40h1eGc" localhost:8080/show-bookings
~~~

### /book
~~~
curl -X POST -H "Content-Type: application/json" -d '{"event_id":1,"datetimes":["2022-06-01 21:00:00","2022-06-02 21:00:00","2022-06-02 22:00:00"]}' localhost:8080/book 
~~~
~~~
curl -X POST -H "Content-Type: application/json" -d '{"event_id":2,"datetimes":["2022-06-05 18:00:00","2022-06-05 19:00:00","2022-06-06 18:00:00"]}' localhost:8080/book 
~~~
~~~
curl -X POST -H "Content-Type: application/json" -d '{"event_id":3,"datetimes":["2022-06-07 15:00:00"]}' localhost:8080/book 
~~~

### /refill (Autenticazione JWT)
~~~
curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdpb3JkYW5vQGVtYWlsLmNvbSIsInJlZmlsbCI6MTAwfQ.iIPCqdNAiuJ3ANqBS1xjiAjIMr1gYYVnMdnVHyBNjV4" localhost:8080/create-event
~~~