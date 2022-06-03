## Test del progetto (cURL)

### /create-event (Autenticazione JWT)
~~~
curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXRsZSI6IlJpdW5pb25lIGRpIFNUQUZGIiwib3duZXIiOiJnaW9yZGFub0BlbWFpbC5jb20iLCJkYXRldGltZXMiOlsiMjAyMi0wNi0wMSAyMTowMDowMCIsIjIwMjItMDYtMDIgMjE6MDA6MDAiLCIyMDIyLTA2LTAyIDIyOjAwOjAwIl0sImdtdCI6IisyIiwic3RhdHVzIjoxLCJtb2RhbGl0eSI6IjEiLCJsYXRpdHVkZSI6NDMuNTIsImxvbmdpdHVkZSI6MTMuMzYsImxpbmsiOiJodHRwczovL21lZXQuY29tIn0.c4NjX0sTVZcvZBpHgHUFlSEgxZ1YUKtc-nUV5YBtL-0" localhost:8080/create-event
~~~

### /show-events (Autenticazione JWT)
~~~
curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdpb3JkYW5vQGVtYWlsLmNvbSJ9.OFxFlr50kDDU2Ug84i_GwZXnPi50JVwSyQpkR5MEYww" localhost:8080/show-events
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