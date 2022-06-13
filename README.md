# Progetto Programmazione Avanzata 2022 - Angelini, Di Silvestre

## Obiettivo del progetto
Il servizio back-end realizzato consente agli utenti di effettuare prenotazioni di slot temporali associati ad eventi di vario genere. In particolare, il sistema permette di effettuare chiamate per:
* Creare un nuovo evento
* Restituire la lista degli eventi associati all’utente
*	Cancellare un evento se non è stata inserita alcuna preferenza
* Chiudere un evento, ovvero non consentire più alcuna votazione
* Restituire le prenotazioni associate all’evento
* Consentire ad un utente di effettuare le prenotazioni
* Permettere ad un utente admin di ricaricare il credito di un utente (utilizzato per creare eventi)

Ogni azione corrisponde a una differente richiesta HTTP (GET o POST) che deve essere, o meno, autenticata tramite token [JWT](http://jwtbuilder.jamiekurtz.com/).

Il client si intefraccerà con il servizio tramite un API testing (ad esempio Postman o cURL) che sarà in ascolto sulla porta 8080 di un webserver generato da Docker, il quale comporrà due container, rispettivamente eseguiti a partire da un'immagine Node.js e da un'immagine MySQL.

## Dettagli delle richieste
La seguente tabella mostra le richieste possibili:

|    TIPO        |ROTTA                          |TOKEN JWT     |
|----------------|-------------------------------|--------------|
|POST            |/create-event                  |SI|
|GET             |/show-events                   |SI|
|POST            |/delete-event                  |SI|
|POST            |/close-event                   |SI|
|GET             |/show-bookings                 |SI|
|POST            |/book                          |NO|
|POST            |/refill                        |SI|
 

### Creare un evento (create-event)
Tramite questa richiesta è possibile creare un nuovo evento.\
~~~
Da effettuare tramite token JWT che deve contenere un payload JSON con la seguente struttura:
{
  "title": "Riunione di Reparto",
  "owner": "giordano@email.com",
  "datetimes": [
    "2022-06-11T15:00:00+01:00",
    "2022-06-18T15:00:00+01:00",
    "2022-06-25T15:00:00+01:00"
  ],
  "modality": 1,
  "latitude": 43.6174457,
  "longitude": 13.4789451,
  "link": "https://meet.google.com",
  "sender_role": "user",
  "sender_id": "giordano@email.com"
}
~~~
*Le coordinate e il link possono essere omessi o avere valore 'null'

La modalità di un evento può assumere valore:
* 1: Nessuna restrizione sulla prenotazione (tutti possono prenotare qualsiasi slot); serve per trovare la soluzione più “gettonata”
* 2: Vincolare ad ogni slot una sola preferenza; serve per limitare che più utenti possano prenotare lo stesso slot
* 3: Vincolare per un utente un singolo slot (evitare che un utente possa occupare più slot)

### Mostrare eventi (show-events)
Tramite questa richiesta è possibile ottenere la lista di eventi organizzati da uno specifico utente suddivisi per attivi (iscrizioni aperte) e inattivi (iscrizioni chiuse).\
~~~
Da effettuare tramite token JWT che deve contenere un payload JSON con la seguente struttura:
{
  "owner": "giordano@email.com",
  "sender_role": "user",
  "sender_id": "giordano@email.com"
}
~~~

### Cancellare eventi (delete-event)
Tramite questa richiesta è possibile cancellare un evento per il quale non sia stata ancora espressa alcuna preferenza.\
~~~
Da effettuare tramite token JWT che deve contenere un payload JSON con la seguente struttura:
{
  "owner": "giordano@email.com",
  "sender_role": "user",
  "sender_id": "giordano@email.com"
}
~~~






















## UML
### Class Diagram

* **it.SpringBootAPI.ADSProjectOOP**
<img src = "ADSProjectOOP/UML/02)%20ADSProjectOOP.png">

* **Application**
<img src = "ADSProjectOOP/UML/10)%20Application.png" width = 400>

* **it.SpringBootAPI.ADSProjectOOP.controller**
<img src = "ADSProjectOOP/UML/09)%20Controller.png" width = 400>

* **it.SpringBootAPI.ADSProjectOOP.fetch**
<img src = "ADSProjectOOP/UML/03)%20FetchClass.png" width = 200>

* **it.SpringBootAPI.ADSProjectOOP.model**
<img src = "ADSProjectOOP/UML/04)%20User%26FrontUser.png" width = 500>

* **it.SpringBootAPI.ADSProjectOOP.database**
<img src = "ADSProjectOOP/UML/05)%20FrontDatabase%26Database.png" width = 500>

* **it.SpringBootAPI.ADSProjectOOP.util.stats**
<img src = "ADSProjectOOP/UML/07)%20DescriptionStats.png" width = 400>

* **it.SpringBootAPI.ADSProjectOOP.util.filters**
<img src = "ADSProjectOOP/UML/06)%20Filter.png">

* **it.SpringBootAPI.ADSProjectOOP.exceptions**
<img src = "ADSProjectOOP/UML/08)%20Exception.png" width = 500>

### Sequence Diagram
* **Chiamata GET /metadata :**
Il Controller esegue una chiamata `getMetadata()` a Database che, passando per User, richiama la FetchClass ottenendo i friends Twitter e restituisce al Controller un Vector di User contenente i metadati degli stessi.
<img src = "ADSProjectOOP/UML/Sequence%20Diagram/metadata.png">

* **Chiamata GET /friends :**
Il Controller esegue una chiamata `getFriends()` a FrontDatabase che, passando per FrontUser, richiama la FetchClass ottenendo i friends Twitter e restituisce al Controller un Vector di User contenente i dati di interesse per il client (nome e descrizione) degli stessi.
<img src = "ADSProjectOOP/UML/Sequence%20Diagram/friends.png">

* **Chiamata GET /stats :**
Il Controller esegue una chiamata `getStats()` a DescriptionStats da cui il costruttore chiama le funzioni interne alla classe per inizializzare gli attributi relativi alle varie statistiche. Ogni funzione interna chiama a sua volta Database per prelevare i dati da analizzare.
<img src = "ADSProjectOOP/UML/Sequence%20Diagram/stats.jpg">

* **Chiamata GET /filter/description :**
Il Controller esegue una chiamata `getFilteredDescription()` alla superclasse Filter invocandone il metodo `filterVector()`. Tale metodo, dopo aver prelevato tutti i friends da Database (Vector di User), tramite un for, itera la chiamata al metodo `filter()` (overridato) per ogni elemento del vettore. Se il friend risulta positivo al filtro allora il suo elemento corrispondente di FrontDatabase viene caricato in un nuovo Vector di FrontUser. Questo vettore viene ritornato al Controller.</br ></br >_Le altre chiamate corrispondenti ai vari filtri (tranne `/filter/between`) sono assimilabili con quanto appena descritto e non sono riportate in questo documento per brevità dello stesso._
<img src = "ADSProjectOOP/UML/Sequence%20Diagram/filter_description.png">

* **Chiamata GET /filter/between :**
Il Controller esegue una chiamata `getFilteredGap()` alla superclasse Filter invocandone il metodo `filterVector()`. Tale metodo, dopo aver prelevato tutti i friends da Database (Vector di User), tramite un for, itera la chiamata al metodo `filter()` (overridato) per ogni elemento del vettore. In questo caso `filter()` invoca l'omonimo metodo di FilterCharacterLess e FilterCharacterMore per valutare se il numero di carattei della descrizione è interno al range dato. Se il friend risulta positivo al filtro allora il suo elemento corrispondente di FrontDatabase viene caricato in un nuovo Vector di FrontUser. Questo vettore viene ritornato al Controller.
<img src = "ADSProjectOOP/UML/Sequence%20Diagram/between.png">

## Note

### Software utilizzati
* [Eclipse](https://www.eclipse.org/) - ambiente di sviluppo integrato
* [Spring Boot](https://spring.io/projects/spring-boot) - framework per sviluppo applicazioni Java
* [Maven](https://maven.apache.org/) - strumento di gestione di progetti

### Autori
* Giordano Angelini: [Github](https://github.com/giordanoangelini)
* Cristian Di Silvestre: [Github](https://github.com/DiSilvestreCristian)
