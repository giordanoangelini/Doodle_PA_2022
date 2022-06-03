# Test del progetto (cURL)

/create-event (Autenticazione JWT)
~~~
curl -X POST -H "Authentication: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXRsZSI6IlJpdW5pb25lIGRpIFNUQUZGIiwib3duZXIiOiIxIiwiZGF0ZXRpbWVzIjpbIjIwMjItMDYtMDEgMjE6MDA6MDAiLCIyMDIyLTA2LTAyIDIxOjAwOjAwIiwiMjAyMi0wNi0wMiAyMjowMDowMCJdLCJnbXQiOiIrMiIsInN0YXR1cyI6MSwibW9kYWxpdHkiOiIxIiwibGF0aXR1ZGUiOjQzLjUyLCJsb25naXR1ZGUiOjEzLjM2LCJsaW5rIjoiaHR0cHM6Ly9tZWV0LmNvbSJ9.tCJIC8Hp7oM6Csgq-0SZey-dJfV1E57duaPEZX2zuLY" localhost:8080/create-event
~~~

/show-events (Autenticazione JWT)
~~~
curl -X GET -H "Content-Type: application/json" -d '{"id":2}' localhost:3000/show-events 
~~~