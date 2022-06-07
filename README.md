## Test del progetto (cURL)

### /create-event (Autenticazione JWT)
~~~
curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXRsZSI6IlJpdW5pb25lIGRpIFNUQUZGIiwib3duZXIiOiJnaW9yZGFub0BlbWFpbC5jb20iLCJkYXRldGltZXMiOlsiMjAyMi0wNi0wMVQyMTowMDowMCswMTowMCIsIjIwMjItMDYtMDJUMjE6MDA6MDArMDE6MDAiLCIyMDIyLTA2LTAyVDIyOjAwOjAwKzAxOjAwIl0sIm1vZGFsaXR5IjoxLCJsYXRpdHVkZSI6NDMuNTIsImxvbmdpdHVkZSI6MTMuMzYsImxpbmsiOiJtZWV0LmNvbSIsInNlbmRlcl9yb2xlIjoidXNlciIsInNlbmRlcl9pZCI6Imdpb3JkYW5vQGVtYWlsLmNvbSJ9.Aue95I697k1rOAY5sVvy8OCM9ZmB4cvRzNc4M78SZBU" localhost:8080/create-event
~~~

### /show-events (Autenticazione JWT)
~~~
curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6Imdpb3JkYW5vQGVtYWlsLmNvbSIsInNlbmRlcl9yb2xlIjoidXNlciIsInNlbmRlcl9pZCI6Imdpb3JkYW5vQGVtYWlsLmNvbSJ9.w743SdlDmolMdLOX-SL6gc9NuyL4UI7APOMcja6jCvw" localhost:8080/show-events
~~~

### /delete-event (Autenticazione JWT)
~~~
curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJldmVudF9pZCI6Miwic2VuZGVyX3JvbGUiOiJ1c2VyIiwic2VuZGVyX2lkIjoiZ2lvcmRhbm9AZW1haWwuY29tIn0.NbjjpJWdagRj4oY0IiRhIfjjmTV--I-bUTqiRwmPfuU" localhost:8080/delete-event
~~~

### /close-event (Autenticazione JWT)
~~~
curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJldmVudF9pZCI6MSwic2VuZGVyX3JvbGUiOiJ1c2VyIiwic2VuZGVyX2lkIjoiZ2lvcmRhbm9AZW1haWwuY29tIn0.mjWvUur2jQGwaaOnjRmI0IvosmJhLuhp9UwSEbLAodk" localhost:8080/close-event
~~~

### /show-bookings (Autenticazione JWT)
~~~
curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJldmVudF9pZCI6MSwic2VuZGVyX3JvbGUiOiJ1c2VyIiwic2VuZGVyX2lkIjoiZ2lvcmRhbm9AZW1haWwuY29tIn0.mjWvUur2jQGwaaOnjRmI0IvosmJhLuhp9UwSEbLAodk" localhost:8080/show-bookings
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
curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdpb3JkYW5vQGVtYWlsLmNvbSIsInRva2VuIjoxMDAsInNlbmRlcl9pZCI6ImFudG9uaW9AZW1haWwuY29tIiwic2VuZGVyX3JvbGUiOiJhZG1pbiJ9.I12gZPLaXvMx-HzIWQIga2tB6BYpTPPr3LcxyhxSlOI" localhost:8080/create-event
~~~