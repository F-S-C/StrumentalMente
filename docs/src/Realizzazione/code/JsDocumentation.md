# Classes

<dl>
<dt><a href="#Main">Main</a></dt>
<dd></dd>
</dl>

# Functions

<dl>
<dt><a href="#openMobileNavigation">openMobileNavigation()</a></dt>
<dd><p>Apre la navbar in modalità &quot;mobile&quot;. Questa funzione è mantenuta solo per
consentire un eventuale eccessivo ridimensionamento della finestra.</p>
</dd>
<dt><a href="#setLinks">setLinks(firstSlideNumber, links)</a></dt>
<dd><p>Cambia i link e i nomi dell&#39;argomento precedente e quello successivo
a quello attuale</p>
</dd>
<dt><a href="#initialize">initialize(initial, base, totalNumberOfSlides)</a></dt>
<dd><p>Funzione che, al caricamento della pagina, si occupa di impostare il numero 
di tag section presenti all&#39;interno della pagina nella memoria locale del browser, di
impostare come sezione visibile corrente la prima (sempre all&#39;interno della memoria locale)
e di nascondere tutti i tag section successivi al primo.</p>
</dd>
<dt><a href="#changeTopic">changeTopic(topicName, [base])</a></dt>
<dd><p>Cambia l&#39;argomento correntemente mostrato.</p>
</dd>
<dt><a href="#initializeQuiz">initializeQuiz()</a></dt>
<dd><p>Inizializza la pagina del quiz.</p>
</dd>
<dt><a href="#changeQuizSlide">changeQuizSlide(finalSlide)</a></dt>
<dd><p>Cambia la slide del quiz attualmente mostrata.</p>
</dd>
<dt><a href="#playStopAudio">playStopAudio(audioTagId, buttonRef, stopButtonId)</a></dt>
<dd><p>Permette di avviare, mettere in pausa o stoppare un audio.</p>
</dd>
<dt><a href="#warnIfIncomplete">warnIfIncomplete(previousQuizId, previousQuizName, topicToOpenName, callback)</a></dt>
<dd><p>Mostra un messaggio all&#39;utente se il quiz propedeutico all&#39;argomento scelto
non è stato completato. Se l&#39;utente conferma di voler proseguire, viene
effettuata l&#39;azione richiesta, altrimenti non si attua alcuna azione.</p>
</dd>
<dt><a href="#setUpTitleBar">setUpTitleBar()</a></dt>
<dd><p>Gestisce gli eventi della titlebar.</p>
<p>Questa funzione gestisce gli eventi (riduci a icona, massimizza/minimizza,
chiudi) che sono acessibili tramite la titlebar.</p>
</dd>
<dt><a href="#showExitDialog">showExitDialog()</a></dt>
<dd><p>Mostra il dialogo di richiesta di conferma di uscita.</p>
</dd>
<dt><a href="#showExitFromQuizDialog">showExitFromQuizDialog(toOpen)</a></dt>
<dd><p>Mostra il dialogo di richiesta di conferma di uscita dal quiz.</p>
</dd>
<dt><a href="#showQuizDialog">showQuizDialog(nomeQuiz, score, total, return_link)</a></dt>
<dd><p>Mostra il dialogo con il punteggio dei quiz.</p>
</dd>
<dt><a href="#openInBrowser">openInBrowser(link)</a></dt>
<dd><p>Apre un link nel browser predefinito.</p>
</dd>
<dt><a href="#getUsername">getUsername()</a></dt>
<dd><p>Ritorna l&#39;username collegato a StrumentalMente.</p>
</dd>
<dt><a href="#setUsername">setUsername(newUsername)</a></dt>
<dd><p>Imposta l&#39;username dell&#39;utente.</p>
</dd>
<dt><a href="#getQuiz">getQuiz(id)</a></dt>
<dd><p>Ottiene il risultato del quiz scelto</p>
</dd>
<dt><a href="#openModal">openModal(content, [options], [windowIcon])</a></dt>
<dd><p>Apre una finestra modale mostrante il contenuto richiesto.</p>
</dd>
<dt><a href="#generateRandomQuestions">generateRandomQuestions()</a></dt>
<dd><p>La funzione genera una permutazione casuale dei numeri naturali
nell&#39;intervallo [0,3]. Ogni numero è utilizato per indicizzare il vettore
delle risposte (di ogni domanda), quindi la permutazione corrisponde alla
permutazione delle risposte a ogni domanda.</p>
</dd>
<dt><a href="#quizLoad">quizLoad(id)</a></dt>
<dd><p>Funzione di caricamento dei quiz che inizializza il punteggio dell&#39;utente, il punteggio massimo del
quiz e richiama la funzione inizializeQuiz. 
In caso di quiz che riguardano gli accordi, richiama la funzione di caricamento degli stessi.</p>
</dd>
<dt><a href="#quizVerify">quizVerify(return_link)</a></dt>
<dd><p>Richiama la funzione di Check delle risposte inoltre, se si tratta di un quiz che riguarda gli
accordi, richiama anche la funzione verify_and_store(). Infine visualizza la finestra di dialogo 
che mostra il punteggio ottenuto dall&#39;utente su quello massimo del quiz e richiede se uscire dal
quiz o verificare le risposte date.</p>
</dd>
<dt><a href="#quizCompare">quizCompare()</a></dt>
<dd><p>Mostra gli eventuali errori commessi dall&#39;utente mostrando le risposte corrette e le eventuali risposte sbagliate.
Nel caso di un quiz sugli accordi, mostra l&#39;accordo corretto al fianco di quello errato.</p>
</dd>
<dt><a href="#script_load">script_load()</a></dt>
<dd><p>Seleziona un numero casuale compreso tra 1 e 24 e ne sceglie il relativo accordo dall&#39;array degli accordi,
lo imposta come domanda nel quiz e lo inserisce in un altro array che contiene gli accordi &quot;pescati&quot;, ripetendo
il procedimento per le 5 domande totali richieste nel quiz.</p>
</dd>
<dt><a href="#verify_and_store">verify_and_store()</a></dt>
<dd><p>Verifica che le selezioni effettuate dall&#39;utente siano corrette in base all&#39;accordo presentatogli e
memorizza in un array se la selezione è corretta (1) o non corretta (0), disabilita le checkbox analizzate
e aumenta il punteggio (in caso di accordo corretto).</p>
</dd>
<dt><a href="#correct_chord">correct_chord()</a></dt>
<dd><p>In base al numero di accordo che l&#39;utente doveva riprodurre, ripristina la sequenza di selezioni
corretta negli schemi e ne blocca le modifiche.</p>
</dd>
<dt><a href="#script_load">script_load()</a></dt>
<dd><p>Seleziona un numero casuale compreso tra 1 e 24 e ne sceglie il relativo accordo dall&#39;array degli accordi,
lo imposta come domanda nel quiz e lo inserisce in un altro array che contiene gli accordi &quot;pescati&quot;, ripetendo
il procedimento per le 5 domande totali richieste nel quiz.</p>
</dd>
<dt><a href="#verify_and_store">verify_and_store()</a></dt>
<dd><p>Verifica che le selezioni effettuate dall&#39;utente siano corrette in base all&#39;accordo presentatogli e
memorizza in un array se la selezione è corretta (1) o non corretta (0), disabilita le checkbox analizzate
e aumenta il punteggio (in caso di accordo corretto).</p>
</dd>
<dt><a href="#correct_chord">correct_chord()</a></dt>
<dd><p>In base al numero di accordo che l&#39;utente doveva riprodurre, ripristina la sequenza di selezioni
corretta negli schemi e ne blocca le modifiche.</p>
</dd>
<dt><a href="#script_load">script_load()</a></dt>
<dd><p>Seleziona un numero casuale compreso tra 1 e 24 e ne sceglie il relativo accordo dall&#39;array degli accordi,
lo imposta come domanda nel quiz e lo inserisce in un altro array che contiene gli accordi &quot;pescati&quot;, ripetendo
il procedimento per le 5 domande totali richieste nel quiz.</p>
</dd>
<dt><a href="#verify_and_store">verify_and_store()</a></dt>
<dd><p>Verifica che le selezioni effettuate dall&#39;utente siano corrette in base all&#39;accordo presentatogli e
memorizza in un array se la selezione è corretta (1) o non corretta (0), disabilita le checkbox analizzate
e aumenta il punteggio (in caso di accordo corretto).</p>
</dd>
<dt><a href="#correct_chord">correct_chord()</a></dt>
<dd><p>In base al numero di accordo che l&#39;utente doveva riprodurre, ripristina la sequenza di selezioni
corretta negli schemi e ne blocca le modifiche.</p>
</dd>
<dt><a href="#selectFirstColumn">selectFirstColumn(j)</a></dt>
<dd><p>Seleziona (o deseleziona) tutte le checkbox della prima colonna nell&#39;accordo j-esimo (passato come 
parametro) in base al valore della prima checkbox dell&#39;accordo j-esimo, ovvero: se il valore della
prima checkbox è true (selezionato) deseleziona tutta la colonna, se è false la seleziona.</p>
</dd>
<dt><a href="#controlFirstColumn">controlFirstColumn(j)</a></dt>
<dd><p>Modifica il nome del bottone che permette all&#39;utente di applicare o rimuovere il barrè nei quiz
in modo da renderlo coerente con lo stato delle checkbox.</p>
</dd>
</dl>

<a name="Main"></a>

# Main
**Kind**: global class  
<a name="new_Main_new"></a>

## new Main()
La classe contenente la logica principale dell'applicazione.

<a name="openMobileNavigation"></a>

# openMobileNavigation()
Apre la navbar in modalità "mobile". Questa funzione è mantenuta solo perconsentire un eventuale eccessivo ridimensionamento della finestra.

**Kind**: global function  
<a name="setLinks"></a>

# setLinks(firstSlideNumber, links)
Cambia i link e i nomi dell'argomento precedente e quello successivoa quello attuale

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| firstSlideNumber | <code>number</code> | Il numero della prima slide dell'argomento corrente |
| links | <code>Object</code> | Le nuove impostazioni e link |
| links.previous | <code>String</code> | Il nome della pagina precedente |
| links.previousLink | <code>String</code> | Il link della pagina precedente (il nome del file *senza* l'estensione) |
| links.next | <code>String</code> | Il nome della pagina successiva |
| links.nextLink | <code>String</code> | Il link della pagina successiva (il nome del file *senza* l'estensione) |

<a name="initialize"></a>

# initialize(initial, base, totalNumberOfSlides)
Funzione che, al caricamento della pagina, si occupa di impostare il numero di tag section presenti all'interno della pagina nella memoria locale del browser, diimpostare come sezione visibile corrente la prima (sempre all'interno della memoria locale)e di nascondere tutti i tag section successivi al primo.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| initial | <code>String</code> |  | Il primo argomento |
| base | <code>String</code> | <code>./</code> | La cartella in cui sono situati i file degli argomenti (default: `./`) |
| totalNumberOfSlides | <code>number</code> |  | Il numero totale di pagine per la sezione. |

<a name="initialize..changeSlide"></a>

## initialize~changeSlide(slide)
La funzione, in base al valore assunto da slide cambia la sezione corrente inquella richiesta. Inoltre si occupa di aggiornare il numero della slidecorrente nella memoria temporanea del browser. Inoltre, in base al numero dislide, si occupa di rendere visibili (o nascondere) i relativi pulsanti dispostamento (avanti con id next, indietro con id back e quiz con id quiz).

**Kind**: inner method of [<code>initialize</code>](#initialize)  

| Param | Type | Description |
| --- | --- | --- |
| slide | <code>numer</code> | Il numero della slide da aprire. |

<a name="changeTopic"></a>

# changeTopic(topicName, [base])
Cambia l'argomento correntemente mostrato.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| topicName | <code>String</code> |  | Il prossimo argomento |
| [base] | <code>String</code> | <code>./</code> | La cartella in cui è situato il file dell'argomento |

<a name="initializeQuiz"></a>

# initializeQuiz()
Inizializza la pagina del quiz.

**Kind**: global function  
<a name="changeQuizSlide"></a>

# changeQuizSlide(finalSlide)
Cambia la slide del quiz attualmente mostrata.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| finalSlide | <code>number</code> | La slide da aprire in seguito alla richiesta di variazione della slide. Tale valore deve essere compreso nell'intervallo `[0, n]`, dove `n` è il numero di slide presenti nella pagina. |

<a name="playStopAudio"></a>

# playStopAudio(audioTagId, buttonRef, stopButtonId)
Permette di avviare, mettere in pausa o stoppare un audio.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| audioTagId | <code>String</code> | L'ID dell'elemento `<audio>` da controllare |
| buttonRef | <code>HTMLElement</code> | Un riferimento al bottone che richiama questa funzione |
| stopButtonId | <code>String</code> | L'ID del bottone di Stop. |

<a name="warnIfIncomplete"></a>

# warnIfIncomplete(previousQuizId, previousQuizName, topicToOpenName, callback)
Mostra un messaggio all'utente se il quiz propedeutico all'argomento sceltonon è stato completato. Se l'utente conferma di voler proseguire, vieneeffettuata l'azione richiesta, altrimenti non si attua alcuna azione.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| previousQuizId | <code>String</code> | L'id del quiz propedeutico |
| previousQuizName | <code>String</code> | Il nome del quiz (da comunicare all'utente) |
| topicToOpenName | <code>String</code> | Il nome dell'argomento che si vuole aprire |
| callback | <code>\*</code> | La funzione da eseguire se l'utente accetta di proseguire. |

<a name="setUpTitleBar"></a>

# setUpTitleBar()
Gestisce gli eventi della titlebar.Questa funzione gestisce gli eventi (riduci a icona, massimizza/minimizza,chiudi) che sono acessibili tramite la titlebar.

**Kind**: global function  

* [setUpTitleBar()](#setUpTitleBar)
    * [~init()](#setUpTitleBar..init)
    * [~toggleMaxRestoreButtons()](#setUpTitleBar..toggleMaxRestoreButtons)

<a name="setUpTitleBar..init"></a>

## setUpTitleBar~init()
Inizializza la titlebar.

**Kind**: inner method of [<code>setUpTitleBar</code>](#setUpTitleBar)  
<a name="setUpTitleBar..toggleMaxRestoreButtons"></a>

## setUpTitleBar~toggleMaxRestoreButtons()
Cicla tra i bottoni di massimizzazione e diminimizzazione della finestra alternativamente

**Kind**: inner method of [<code>setUpTitleBar</code>](#setUpTitleBar)  
<a name="showExitDialog"></a>

# showExitDialog()
Mostra il dialogo di richiesta di conferma di uscita.

**Kind**: global function  
<a name="showExitFromQuizDialog"></a>

# showExitFromQuizDialog(toOpen)
Mostra il dialogo di richiesta di conferma di uscita dal quiz.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| toOpen | <code>String</code> | Il file da aprire se è cliccato il tasto 'Sì'. Il percorso è relativo rispetto alla cartella principale. |

<a name="showQuizDialog"></a>

# showQuizDialog(nomeQuiz, score, total, return_link)
Mostra il dialogo con il punteggio dei quiz.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| nomeQuiz | <code>String</code> | Il nome del quiz. |
| score | <code>number</code> | Il punteggio ottenuto. |
| total | <code>number</code> | Il punteggio totale possibile. |
| return_link | <code>String</code> | Il file da aprire se è cliccato il tasto 'Ok'. Il percorso è relativo rispetto alla cartella principale. |

<a name="openInBrowser"></a>

# openInBrowser(link)
Apre un link nel browser predefinito.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| link | <code>String</code> | Il link da aprire |

<a name="getUsername"></a>

# getUsername()
Ritorna l'username collegato a StrumentalMente.

**Kind**: global function  
<a name="setUsername"></a>

# setUsername(newUsername)
Imposta l'username dell'utente.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| newUsername | <code>String</code> | Il nuovo username. |

<a name="getQuiz"></a>

# getQuiz(id)
Ottiene il risultato del quiz scelto

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | L'id del quiz di cui interessa il risultato. |

<a name="openModal"></a>

# openModal(content, [options], [windowIcon])
Apre una finestra modale mostrante il contenuto richiesto.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| content | <code>String</code> |  | Il link (assoluto o relativo) da aprire |
| [options] | <code>Object</code> |  | Le opzioni della nuova finestra |
| [windowIcon] | <code>String</code> | <code>./assets/icon.ico</code> | L'icona della finestra modale |

<a name="generateRandomQuestions"></a>

# generateRandomQuestions()
La funzione genera una permutazione casuale dei numeri naturalinell'intervallo [0,3]. Ogni numero è utilizato per indicizzare il vettoredelle risposte (di ogni domanda), quindi la permutazione corrisponde allapermutazione delle risposte a ogni domanda.

**Kind**: global function  
<a name="quizLoad"></a>

# quizLoad(id)
Funzione di caricamento dei quiz che inizializza il punteggio dell'utente, il punteggio massimo delquiz e richiama la funzione inizializeQuiz. In caso di quiz che riguardano gli accordi, richiama la funzione di caricamento degli stessi.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Indica quale quiz si sta svolgendo per permettere al programma di  memorizzarne l' esito. |

<a name="quizVerify"></a>

# quizVerify(return_link)
Richiama la funzione di Check delle risposte inoltre, se si tratta di un quiz che riguarda gliaccordi, richiama anche la funzione verify_and_store(). Infine visualizza la finestra di dialogo che mostra il punteggio ottenuto dall'utente su quello massimo del quiz e richiede se uscire dalquiz o verificare le risposte date.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| return_link | <code>String</code> | Indica in quale pagina si deve ritornare al completamento dei quiz. |

<a name="quizCompare"></a>

# quizCompare()
Mostra gli eventuali errori commessi dall'utente mostrando le risposte corrette e le eventuali risposte sbagliate.Nel caso di un quiz sugli accordi, mostra l'accordo corretto al fianco di quello errato.

**Kind**: global function  
<a name="script_load"></a>

# script\_load()
Seleziona un numero casuale compreso tra 1 e 24 e ne sceglie il relativo accordo dall'array degli accordi,lo imposta come domanda nel quiz e lo inserisce in un altro array che contiene gli accordi "pescati", ripetendoil procedimento per le 5 domande totali richieste nel quiz.

**Kind**: global function  
<a name="verify_and_store"></a>

# verify\_and\_store()
Verifica che le selezioni effettuate dall'utente siano corrette in base all'accordo presentatogli ememorizza in un array se la selezione è corretta (1) o non corretta (0), disabilita le checkbox analizzatee aumenta il punteggio (in caso di accordo corretto).

**Kind**: global function  
<a name="correct_chord"></a>

# correct\_chord()
In base al numero di accordo che l'utente doveva riprodurre, ripristina la sequenza di selezionicorretta negli schemi e ne blocca le modifiche.

**Kind**: global function  
<a name="script_load"></a>

# script\_load()
Seleziona un numero casuale compreso tra 1 e 24 e ne sceglie il relativo accordo dall'array degli accordi,lo imposta come domanda nel quiz e lo inserisce in un altro array che contiene gli accordi "pescati", ripetendoil procedimento per le 5 domande totali richieste nel quiz.

**Kind**: global function  
<a name="verify_and_store"></a>

# verify\_and\_store()
Verifica che le selezioni effettuate dall'utente siano corrette in base all'accordo presentatogli ememorizza in un array se la selezione è corretta (1) o non corretta (0), disabilita le checkbox analizzatee aumenta il punteggio (in caso di accordo corretto).

**Kind**: global function  
<a name="correct_chord"></a>

# correct\_chord()
In base al numero di accordo che l'utente doveva riprodurre, ripristina la sequenza di selezionicorretta negli schemi e ne blocca le modifiche.

**Kind**: global function  
<a name="script_load"></a>

# script\_load()
Seleziona un numero casuale compreso tra 1 e 24 e ne sceglie il relativo accordo dall'array degli accordi,lo imposta come domanda nel quiz e lo inserisce in un altro array che contiene gli accordi "pescati", ripetendoil procedimento per le 5 domande totali richieste nel quiz.

**Kind**: global function  
<a name="verify_and_store"></a>

# verify\_and\_store()
Verifica che le selezioni effettuate dall'utente siano corrette in base all'accordo presentatogli ememorizza in un array se la selezione è corretta (1) o non corretta (0), disabilita le checkbox analizzatee aumenta il punteggio (in caso di accordo corretto).

**Kind**: global function  
<a name="correct_chord"></a>

# correct\_chord()
In base al numero di accordo che l'utente doveva riprodurre, ripristina la sequenza di selezionicorretta negli schemi e ne blocca le modifiche.

**Kind**: global function  
<a name="selectFirstColumn"></a>

# selectFirstColumn(j)
Seleziona (o deseleziona) tutte le checkbox della prima colonna nell'accordo j-esimo (passato come parametro) in base al valore della prima checkbox dell'accordo j-esimo, ovvero: se il valore dellaprima checkbox è true (selezionato) deseleziona tutta la colonna, se è false la seleziona.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>number</code> | Indica il numero di slide su cui la funzione deve operare. |

<a name="controlFirstColumn"></a>

# controlFirstColumn(j)
Modifica il nome del bottone che permette all'utente di applicare o rimuovere il barrè nei quizin modo da renderlo coerente con lo stato delle checkbox.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>number</code> | Indica il numero di slide su cui la funzione deve operare. |

