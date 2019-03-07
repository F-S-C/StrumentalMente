# Functions

<dl>
<dt><a href="#openChildWindow">openChildWindow(pageUrl, [windowIcon])</a></dt>
<dd><p>Apre una finestra &quot;figlia&quot; e modale.</p>
</dd>
<dt><a href="#createWindow">createWindow()</a></dt>
<dd><p>Crea la finestra principale.</p>
</dd>
<dt><a href="#promptModal">promptModal(parentWindow, [options], callback)</a></dt>
<dd><p>Creazione della finestra di dialogo.</p>
</dd>
<dt><a href="#openMobileNavigation">openMobileNavigation()</a></dt>
<dd><p>Apre la navbar in modalità &quot;mobile&quot;. Questa funzione è mantenuta solo per
consentire un eventuale eccessivo ridimensionamento della finestra.</p>
</dd>
<dt><a href="#drop">drop(name, [defaultLinkClass])</a></dt>
<dd><p>Permette, alla pressione di un bottone, di aprire una sottolista
della navbar.</p>
</dd>
<dt><a href="#setLinks">setLinks(links)</a></dt>
<dd><p>Cambia i link e i nomi dell&#39;argomento precedente e quello successivo
a quello attuale</p>
</dd>
<dt><a href="#initialize">initialize(initial, base)</a></dt>
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
<dt><a href="#showExitDialog">showExitDialog()</a></dt>
<dd><p>Mostra il dialogo di richiesta di conferma di uscita.</p>
</dd>
<dt><a href="#showQuizDialog">showQuizDialog(nomeQuiz, score, total)</a></dt>
<dd><p>Mostra il dialogo con il punteggio dei quiz.</p>
</dd>
<dt><a href="#openInBrowser">openInBrowser(link)</a></dt>
<dd><p>Apre un link nel browser predefinito.</p>
</dd>
<dt><a href="#openModal">openModal(content, [options], [windowIcon])</a></dt>
<dd><p>Apre una finestra modale mostrante il contenuto richiesto.</p>
</dd>
<dt><a href="#openOnKeyboardShortcut">openOnKeyboardShortcut(shortcut, content, [openAsModal])</a></dt>
<dd><p>Apre, tramite una shortcut da tastiera,
una finestra mostrante il contenuto richiesto.</p>
</dd>
<dt><a href="#accordo">accordo(nome, dita, tasto_iniziale)</a></dt>
<dd><p>Oggetto accordo.</p>
</dd>
<dt><a href="#script_load">script_load()</a></dt>
<dd><p>Seleziona un numero casuale compreso tra 1 e 7 e ne imposta l&#39;accordo da richiedere all&#39;utente.</p>
</dd>
<dt><a href="#replace_selected">replace_selected()</a></dt>
<dd><p>Ripristina le checkbox selezionate dall&#39;utente e il nome dell&#39;accordo richiesto durante il quiz.</p>
</dd>
<dt><a href="#verify_and_store">verify_and_store()</a></dt>
<dd><p>Verifica che le selezioni effettuate dall&#39;utente siano corrette in base all&#39;accordo presentatogli e
memorizza: se la selezione è corretta (1) o non corretta (0), le checkbox selezionate (e non) e 
l&#39;accordo che l&#39;utente doveva riprodurre.</p>
</dd>
<dt><a href="#correct_chord">correct_chord()</a></dt>
<dd><p>In base al numero di accordo che l&#39;utente doveva riprodurre, ripristina la sequenza di selezioni
corretta nello schema.</p>
</dd>
</dl>

<a name="openChildWindow"></a>

# openChildWindow(pageUrl, [windowIcon])
Apre una finestra "figlia" e modale.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pageUrl | <code>String</code> |  | L'URL della pagina da aprire (assoluto o relativo) |
| [windowIcon] | <code>String</code> | <code>./assets/icon.ico</code> | L'icona della finestra. |

<a name="createWindow"></a>

# createWindow()
Crea la finestra principale.

**Kind**: global function  
<a name="promptModal"></a>

# promptModal(parentWindow, [options], callback)
Creazione della finestra di dialogo.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| parentWindow | <code>BrowserWindow</code> | La finestra "genitore" |
| [options] | <code>Object</code> | Le opzioni della nuova finestra |
| callback | <code>\*</code> | La funzione da richiamare alla chiusura della finestra |

<a name="openMobileNavigation"></a>

# openMobileNavigation()
Apre la navbar in modalità "mobile". Questa funzione è mantenuta solo perconsentire un eventuale eccessivo ridimensionamento della finestra.

**Kind**: global function  
<a name="drop"></a>

# drop(name, [defaultLinkClass])
Permette, alla pressione di un bottone, di aprire una sottolistadella navbar.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | L'ID della lista che si vuole controllare |
| [defaultLinkClass] | <code>String</code> | La classe iniziale del bottone |

<a name="setLinks"></a>

# setLinks(links)
Cambia i link e i nomi dell'argomento precedente e quello successivoa quello attuale

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| links | <code>Object</code> | Le nuove impostazioni e link |
| links.previous | <code>String</code> | Il nome della pagina precedente |
| links.previousLink | <code>String</code> | Il link della pagina precedente (il nome del file *senza* l'estensione) |
| links.next | <code>String</code> | Il nome della pagina successiva |
| links.nextLink | <code>String</code> | Il link della pagina successiva (il nome del file *senza* l'estensione) |

<a name="initialize"></a>

# initialize(initial, base)
Funzione che, al caricamento della pagina, si occupa di impostare il numero di tag section presenti all'interno della pagina nella memoria locale del browser, diimpostare come sezione visibile corrente la prima (sempre all'interno della memoria locale)e di nascondere tutti i tag section successivi al primo.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| initial | <code>String</code> |  | Il primo argomento |
| base | <code>String</code> | <code>./</code> | La cartella in cui sono situati i file degli argomenti (default: `./`) |

<a name="initialize..changeSlide"></a>

## initialize~changeSlide(slide)
La funzione, in base al valore assunto da slide (true/false) cambia la sezione corrente in quella precedente (in caso di slide = false)o in quella successiva (in caso di slide = true). Inoltre si occupa di aggiornare il numero della slide corrente nella memoria temporaneadel browser. Inoltre, in base al numero di slide, si occupa di renderevisibili (o nascondere) i relativi pulsanti di spostamento(avanti con id next, indietro con id back e quiz con id quiz).

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

<a name="showExitDialog"></a>

# showExitDialog()
Mostra il dialogo di richiesta di conferma di uscita.

**Kind**: global function  
<a name="showQuizDialog"></a>

# showQuizDialog(nomeQuiz, score, total)
Mostra il dialogo con il punteggio dei quiz.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| nomeQuiz | <code>String</code> | Il nome del quiz. |
| score | <code>number</code> | Il punteggio ottenuto. |
| total | <code>number</code> | Il punteggio totale possibile. |

<a name="openInBrowser"></a>

# openInBrowser(link)
Apre un link nel browser predefinito.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| link | <code>String</code> | Il link da aprire |

<a name="openModal"></a>

# openModal(content, [options], [windowIcon])
Apre una finestra modale mostrante il contenuto richiesto.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| content | <code>String</code> |  | Il link (assoluto o relativo) da aprire |
| [options] | <code>Object</code> |  | Le opzioni della nuova finestra |
| [windowIcon] | <code>String</code> | <code>./assets/icon.ico</code> | L'icona della finestra modale |

<a name="openOnKeyboardShortcut"></a>

# openOnKeyboardShortcut(shortcut, content, [openAsModal])
Apre, tramite una shortcut da tastiera,una finestra mostrante il contenuto richiesto.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| shortcut | <code>String</code> |  | La shortcut da utilizzare |
| content | <code>String</code> |  | Il link (assoluto o relativo) da aprire |
| [openAsModal] | <code>boolean</code> | <code>false</code> | Se è `true`, la finestra sarà aperta come modale,  altrimenti sarà aperta nella stessa finestra. |

<a name="accordo"></a>

# accordo(nome, dita, tasto_iniziale)
Oggetto accordo.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| nome | <code>String</code> | Stringa che indica il nome dell'accordo |
| dita | <code>Boolean</code> | Sequenza di valori logici che indicano se la checkbox corrispondente è stata selezionata o meno |
| tasto_iniziale | <code>number</code> | Indica il numero del capotasto iniziale dell'accordo |

<a name="script_load"></a>

# script\_load()
Seleziona un numero casuale compreso tra 1 e 7 e ne imposta l'accordo da richiedere all'utente.

**Kind**: global function  
<a name="replace_selected"></a>

# replace\_selected()
Ripristina le checkbox selezionate dall'utente e il nome dell'accordo richiesto durante il quiz.

**Kind**: global function  
<a name="verify_and_store"></a>

# verify\_and\_store()
Verifica che le selezioni effettuate dall'utente siano corrette in base all'accordo presentatogli ememorizza: se la selezione è corretta (1) o non corretta (0), le checkbox selezionate (e non) e l'accordo che l'utente doveva riprodurre.

**Kind**: global function  
<a name="correct_chord"></a>

# correct\_chord()
In base al numero di accordo che l'utente doveva riprodurre, ripristina la sequenza di selezionicorretta nello schema.

**Kind**: global function  
