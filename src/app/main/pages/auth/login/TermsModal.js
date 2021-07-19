import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
	List,
	ListItem,
	ListItemText
} from '@material-ui/core';

export default function TermsModal({ open, setOpen, title }) {
	const handleClose = () => {
		setOpen(false);
	};

	const descriptionElementRef = React.useRef(null);
	React.useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				scroll="paper"
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
			>
				<DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
				<DialogContent dividers>
					{
						title === 'Privacy' ? (
							<>
								<DialogContentText tabIndex={-1}>
									Si prega di leggere attentamente le condizioni di utilizzo prima di accedere a questo sito web.
									eccezione, da parte dell'utente dei termini qui descritti ed eventuali loro modifiche, qualora si rendessero necessarie, che dovranno essere periodicamente verificate a cura dell'utente stesso per una sua migliore conoscenza e informazioneL'accesso e il suo utilizzo presuppongono l'accettazione di tutti i termini, condizioni e avvertenze, senza.
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									Chiediamo pertanto agli utenti che non dovessero accettare queste condizioni di utilizzo, di lasciare il sito immediatamente.
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									Questo Sito Web è realizzato, reso operativo e gestito da MONKEY BITS S.R.L., P.IVA 04446750160, email <a href={`mailto:monkeybits@pec.it`} className="mailto-color">monkeybits@pec.it</a> da ora definito: Edilcloud.io
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<b>1. Fonte dei dati personali</b>
									<Typography color="textSecondary">
										I dati personali in possesso di Edilcloud.io sono raccolti direttamente presso l’Interessato al momento dell’inserimento dei propri dati personali negli appositi campi previsti nel modulo web.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<b>2. Finalità del trattamento</b>
									<Typography color="textSecondary">
										I dati personali sono trattati secondo le seguenti finalità: a. adempimento di obblighi previsti dalla legge, da regolamenti o dalla normativa comunitaria; b. attività funzionali effettuate da Edilcloud.io , effettuate mediante e-mail quali newsletter per notificare funzionalità aggiuntive, manutenzioni oppure invii di backup in relazione ai quali l’Interessato ha facoltà di manifestare o meno il proprio consenso. Ciascun Interessato ha diritto quindi di rifiutare o revocare, in qualsiasi momento, il proprio consenso al trattamento, senza che questo comporti conseguenze pregiudizievoli nel rapporto e/o per l’esecuzione di prestazioni da Lei richieste prima del recesso.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<b>3. Modalità di trattamento dei dati</b>
									<Typography color="textSecondary">
										In relazione alle finalità descritte nel precedente paragrafo 2, il trattamento dei dati personali avviene mediante strumenti manuali, informatici e telematici con logiche strettamente correlate alle finalità sopra evidenziate e comunque in modo da garantire la sicurezza e la riservatezza dei dati stessi
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<b>4. Categorie di dati oggetto di trattamento</b>
									<Typography color="textSecondary">
										In relazione alle finalità descritte nel precedente paragrafo 2, Edilcloud.io tratta dati personali diversi da quelli "sensibili" e "giudiziari".
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<b>5. Categorie di soggetti ai quali i dati possono essere comunicati</b>
									<Typography color="textSecondary">
										I Suoi dati personali potranno inoltre essere resi noti, in caso di richiesta, alle Autorità Competenti in materia giuridico/legislativa secondo normativa vigente.
										I dati trattati da Edilcloud.io non sono oggetto di diffusione.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<b>6. Diritti dell'Interessato</b>
									<Typography color="textSecondary">
										La informiamo, infine, che la normativa in materia di protezione dei dati personali conferisce agli Interessati la possibilità di esercitare specifici diritti. In particolare, l'Interessato può ottenere:
									</Typography>
									<List component="nav">
										<ListItem className="flex items-start">
											<ListItemText primary="1." className="pr-20" />
											<ListItemText primary="conferma dell'esistenza o meno di dati che lo riguardano, anche se non ancora registrati, e la loro comunicazione in forma intelligibile;" />
										</ListItem>
										<ListItem className="flex items-start">
											<ListItemText primary="2." className="pr-20" />
											<ListItemText primary="informazioni circa l'origine dei dati personali, le finalità e le modalità del trattamento nonché la logica applicata in caso di trattamento effettuato con l'ausilio di strumenti elettronici;" />
										</ListItem>
										<ListItem className="flex items-start">
											<ListItemText primary="3." className="pr-20" />
											<ListItemText primary="indicazione degli estremi identificativi del Titolare e del Responsabile, nonché dei soggetti o delle categorie di soggetti ai quali i dati personali possono essere comunicati o che possono venirne a conoscenza;" />
										</ListItem>
										<ListItem className="flex items-start">
											<ListItemText primary="4." className="pr-20" />
											<ListItemText primary="la cancellazione, la trasformazione in forma anonima o il blocco dei dati trattati in violazione di legge, nonché l'aggiornamento, la rettificazione o, quando vi ha interesse, l'integrazione dei dati." />
										</ListItem>
									</List>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										L'Interessato può altresì opporsi, per motivi legittimi, al trattamento dei dati personali che lo riguardano.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										Le richieste di cui al precedente paragrafo 6 possono essere presentate per iscritto a Edilcloud.io mediante messaggio di posta elettronica inviata alla casella monkeybits@pec.it
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography className="text-blue-500">
										Informatica sui Cookies
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										Un cookie è un breve testo inviato al tuo browser da un sito web visitato. Quasi tutti i siti internet utilizzano i Cookies. 
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										Questa semplice tecnologia consente al sito di memorizzare informazioni sulla tua visita, come la tua lingua preferita, l'accesso effettuato alle aree utente e altre impostazioni. Servono inoltre per contare gli utenti del sito e per migliorarne le caratteristiche tecniche. Ciò può facilitare la tua visita successiva e aumentare l'utilità del sito a tuo favore.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										I cookie svolgono un ruolo importante. Senza di essi, l'utilizzo del Web sarebbe un'esperienza molto più frustrante.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										L'utente può facilmente configurare il proprio browser per non accettare cookies e per rendere anonima la propria navigazione.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										<b>Ecco come vengono utilizzati i Cookies su Edilcloud.io:</b>
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										I Cookies sono necessari per mantenere lo status della sessione una volta che l'utente ha effettuato la registrazione/accesso alla piattaforma, e quindi identificano l'utente attraverso un codice auto generato denominato "SESSION ID".
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										Sul sito e all'interno della piattaforma sono in funzione servizi di analisi del traffico e tracciamento delle registrazioni quali Google Analytics, Facebook, AdRoll. Si prega di far riferimento a Google/Facebook/AdRoll per l'informativa relativa ai trattamenti di cui è titolare. Per evitare ogni tracciamento di Google Analytics/Facebook/Twitter/AdRoll, è possibile utilizzare gli appositi tool messi a disposizione dal titolare del trattamento.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										<b>Come posso controllare l'installazione di Cookie?</b>
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										In aggiunta a quanto indicato in questo documento, l'Utente può gestire le preferenze relative ai Cookie direttamente all'interno del proprio browser ed impedire – ad esempio – che terze parti possano installarne. Tramite le preferenze del browser è inoltre possibile eliminare i Cookie installati in passato, incluso il Cookie in cui venga eventualmente salvato il consenso all'installazione di Cookie da parte di questo sito. È importante notare che disabilitando tutti i Cookie, il funzionamento di questo sito potrebbe essere compromesso. L'Utente può trovare informazioni su come gestire i Cookie nel suo browser ai seguenti indirizzi: Google Chrome, Mozilla Firefox, Apple Safari and Microsoft Windows Explorer. In caso di servizi erogati da terze parti, l'Utente può inoltre esercitare il proprio diritto ad opporsi al tracciamento informandosi tramite la privacy policy della terza parte, tramite il link di opt out se esplicitamente fornito o contattando direttamente la stessa.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										<b>Titolare del Trattamento dei Dati</b>
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										MONKEY BITS S.R.L. con sede legale in via Santa Liberata 11, Bariano (BG), Codice Fiscale e numero iscrizione al Registro Imprese di Bergamo n 04446750160, Partita IVA IT04446750160
										monkeybits@pec.it 
										Dal momento che l'installazione di Cookie e di altri sistemi di tracciamento operata da terze parti tramite i servizi utilizzati all'interno di questa Applicazione non può essere tecnicamente controllata dal Titolare, ogni riferimento specifico a Cookie e sistemi di tracciamento installati da terze parti è da considerarsi indicativo. Per ottenere informazioni complete, consulta la privacy policy degli eventuali servizi terzi elencati in questo documento.
										Vista l'oggettiva complessità legata all'identificazione delle tecnologie basate sui Cookie ed alla loro integrazione molto stretta con il funzionamento del web, l'Utente è invitato a contattare il Titolare qualora volesse ricevere qualunque approfondimento relativo all'utilizzo dei Cookie stessi e ad eventuali utilizzi degli stessi – ad esempio ad opera di terzi – effettuati tramite questo sito.
									</Typography>
								</DialogContentText>
							</>
						) : (
							<>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										Termini e condizioni generali
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										Le presenti condizioni generali (“Condizioni Generali” o “Contratto”) disciplinano i termini e le condizioni d’uso ai quali MONKEY BITS S.R.L. con sede legale in via Santa Liberata 11, Bariano (BG), Codice Fiscale e numero iscrizione al Registro Imprese di Bergamo n. 04446750160, Partita IVA 04446750160 (il “Fornitore” o “MONKEY BITS S.R.L.”) fornirà alla persona, fisica o giuridica, ovvero l'ente, pubblico o privato, ovvero l'associazione, individuata/o come cliente (il “Cliente”):
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										(i) il diritto di utilizzare, mediante accesso autenticato all’infrastruttura cloud messa a disposizione dal Fornitore, l’Applicazione Internet Edilcloud(alla quale il Cliente potrà accedere attraverso l’URL www.edilcloud  oppure tramite software dedicato, di seguito, definita “Applicazione”) ospitata sull’infrastruttura tecnologica tecnica del Fornitore (situata interamente all'interno del territorio europeo);
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										(ii) le funzionalità gestionali e di reportistica adatte all’uso professionale o per una piccola di seguito definiti i “Servizi Collegati” e, insieme all’Applicazione, “Edilcloud”).
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										Il presente Contratto è costituito dalle presenti Condizioni Generali e dagli altri documenti appresso indicati, che ne formano tutti, ad ogni effetto di legge, parte integrante e sostanziale:
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										Condizioni Generali
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										Listino Prezzi disponibile sul sito www.edilcloud.io.it/piani/
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										1. MODALITÀ DI STIPULAZIONE E PERFEZIONAMENTO DEL CONTRATTO
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										1.1 Il Contratto tra il Fornitore e l’Acquirente è perfezionato all’invio da parte di MONKEY BITS S.R.L. della Conferma di iscrizione comunicata a mezzo e-mail all'indirizzo di posta elettronica indicato dal Cliente durante la fase di registrazione secondo quanto meglio specificato nell’art. 4 del presente contratto. L’Iscrizione, previa integrale accettazione delle presenti Condizioni Generali da parte del Cliente, costituisce momento perfezionativo del Contratto e consente l’attivazione di Edilcloud da parte di MONKEY BITS S.R.L.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										1.2 Cliente prende atto ed accetta di non poter avanzare nei confronti di MONKEY BITS S.R.L. alcuna richiesta d’indennizzo, di risarcimento o pretesa di alcun genere. Resta inteso, in ogni caso, che l’accesso all’Applicazione o l’utilizzo dei Servizi Collegati da parte del Cliente attesta l’accettazione di tutti termini e condizioni di cui al presente Contratto.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										2. CORRISPETTIVI
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										2.1 Il Cliente è tenuto al pagamento dei corrispettivi per la fruizione di Edilcloud e dei Servizi Collegati indicati nel listino MONKEY BITS S.R.L. (che l’utente dichiara sin d’ora di conoscere e di seguito definito il “Listino”). Il Fornitore si riserva la facoltà di apportare modifiche al Listino fermo restando che il nuovo listino sarà applicato dopo la scadenza dei servizi a pagamento sottoscritto dal Cliente.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										3. PAGAMENTI
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										3.1 Il Cliente prende atto ed accetta che il pagamento potrà avvenire unicamente per mezzo di uno dei metodi indicati nell’apposita pagina web del Fornitore.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										3.2 In caso di mancato o ritardato pagamento di una qualsiasi somma dovuta ai sensi del presente Contratto, il Fornitore avrà diritto di sospendere immediatamente e senza ulteriore avviso ogni prestazione dovuta ai sensi del presente Contratto fino al ricevimento del dovuto.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										4. REGISTRAZIONE ED ATTIVAZIONE
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										4.1 Il Cliente può scegliere di registrarsi tramite (i) sistemi di autenticazione interni all’Applicazione, (ii) tramite accesso all’App Edilcloud dal proprio tablet o smartphone.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										4.2 Nei casi (i) e (ii) il Cliente dovrà inserire le proprie credenziali per accedere a Edilcloud. Tali credenziali sono costituite da uno username e da una password (Chiavi di accesso).
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										4.3 Il Cliente riceverà una mail di conferma all’indirizzo email tramite il quale si è registrato.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										4.4 Al primo accesso dovrà completare la registrazione inserendo username, indirizzo e chiave di accesso. Successivamente dovrà creare un’azienda inserendo Ragione Sociale, indirizzo, mail, sito internet e profilo fiscale della propria attività.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										4.5 Il Cliente si obbliga a custodire, conservare, utilizzare e mantenere segrete le Chiavi di Accesso con la massima cura e diligenza anche al fine di evitare l’utilizzo da parte di terzi non autorizzati. È fatto divieto al Cliente di cedere, a qualunque titolo, a terzi, le Chiavi di Accesso o consentire l’accesso attraverso i sistemi di autenticazione esterni previsti dall’Applicazione.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										4.6 A tale proposito, il Cliente prende atto ed accetta:
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										che la conoscenza da parte di terzi delle Chiavi di Accesso (o accesso attraverso sistemi di autenticazione esterni) potrebbe consentire a questi ultimi l’indebito utilizzo dell’Applicazione e dei Servizi Collegati;
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										che il Fornitore non risponderà dei danni arrecati al Cliente e/o a terzi dalla conoscenza, ovvero dall'utilizzo, delle Chiavi d’Accesso (o accesso attraverso sistemi di autenticazione esterni) da parte di terzi, anche in dipendenza della mancata osservanza di quanto sopra prescritto;
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										che qualsiasi attività realizzata utilizzando le Chiavi d’Accesso del Cliente (o accesso attraverso sistemi di autenticazione esterni) si considererà effettuata dal Cliente al quale le relative Chiavi d’Accesso sono associate e il Cliente sarà ritenuto responsabile di tale utilizzo.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										4.7 Il Cliente si obbliga comunque a manlevare e mantenere il Fornitore indenne da ogni pretesa che possa essere avanzata nei suoi confronti a qualsiasi titolo per le violazioni delle previsioni di cui al presente articolo 4.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										5. USO DELL’ APPLICAZIONE
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										5.1 Il Cliente ha la possibilità di attivare diversi tipi di abbonamenti a Edilcloud. 
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										5.2 Il Cliente avrà la possibilità di attivare un abbonamento a pagamento a Edilcloud di durata limitata. Per l’attivazione saranno necessari la sottoscrizione delle Condizioni Generali di Contratto.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										5.3 MONKEY BITS S.R.L. rende disponibile un periodo di prova durante il quale l’utente potrà utilizzare tutte le funzionalità fornite dal servizio. Per l’elenco delle funzionalità, dei servizi, delle caratteristiche e per la durata del periodo di prova si rimanda a quanto indicato nel Listino.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										5.4 Alla scadenza del periodo di prova, l’utente potrà scegliere se continuare ad usare i servizi offerti dal Fornitore e quindi procedere con l’acquisto dell’abbonamento a pagamento.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										5.5 L’utente può consentire l’accesso alle informazioni memorizzate in Edilcloud ad altri utenti solamente secondo le modalità previste dall’Applicazione e solo nei casi ivi previsti ed espressamente indicati.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										5.6 Il Cliente può utilizzare Edilcloud esclusivamente nei modi espressamente indicati nel presente Contratto ed in conformità alle norme di legge. Nel far ciò, il Cliente dovrà attenersi a qualsiasi limitazione tecnica dell’Applicazione e dei Servizi Collegati e alle modalità di utilizzo previste. A titolo esemplificativo e non esaustivo, il Cliente non potrà:
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										decodificare, decompilare o disassemblare l’Applicazione salvo che tali attività siano espressamente consentite da previsioni di legge e comunque nei limiti di tali previsioni;
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										pubblicare l’Applicazione per consentirne la duplicazione da parte di altri;
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										utilizzare Edilcloud in contrasto con norme di legge;
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										5.7 Il Cliente prende atto che per utilizzare Edilcloud dovrà dotarsi delle apparecchiature elettriche, elettroniche o di qualsivoglia altro genere, dei software, dei servizi telefonici e/o di rete e di quant’altro necessario e che, pertanto, Edilcloud non comprende l’erogazione da parte del Fornitore di strumenti necessari per l’accesso alla rete internet. Il Cliente si impegna inoltre a mantenere il Fornitore indenne da ogni pretesa che possa essere avanzata nei confronti di quest’ultimo a qualsiasi titolo o in qualsiasi modo collegate alla inidoneità dei sistemi hardware e/o di rete e/o di software atti a consentire la corretta fruizione di Edilcloud. Il Cliente riconosce che la rete internet non è controllata dal Fornitore e che, per la peculiare struttura della suddetta rete, nessuna entità pubblica o privata e neppure il Fornitore è in grado di garantire e monitorare le prestazioni e la funzionalità dei rami della rete e di controllare i contenuti delle informazioni che sono trasmesse mediante la propria rete. Per questo motivo nessuna responsabilità potrà essere imputata al Fornitore per la trasmissione o la ricezione di informazioni illegali di qualsiasi natura e specie.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										6. MALFUNZIONAMENTI O GUASTI
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										6.1 In caso di segnalazione di guasti o malfunzionamenti, il Cliente si impegna a fornire tutte le specifiche e le informazioni eventualmente richieste dal Fornitore.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										6.2 Nelle ipotesi di cui al precedente punto ove il reclamo lamentato dal Cliente sia riferito a problemi relativi all’infrastruttura cloud, il Fornitore si impegna a richiedere prontamente l’intervento del fornitore dell’infrastruttura e dei servizi cloud (di seguito il “Cloud Service Provider”), fermo restando che il Cliente non potrà vantare alcun tipo di pretesa nei confronti del Fornitore per qualsiasi disservizio che sia imputabile al Cloud Service Provider.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										7. ESECUZIONE DI EDILCLOUD
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										7.1 Il Cliente prende atto ed accetta che Edilcloud è fornito “così com’è” ed è caratterizzata da tecnologia in continua evoluzione; per questi motivi le caratteristiche tecniche di Edilcloud e le condizioni dell'offerta potranno essere modificate quando ciò sia reso necessario dall’evoluzione tecnologica e da esigenze di fornitura e/o organizzazione.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										7.2 Il Cliente fornisce sin d’ora la sua autorizzazione affinché l’Applicazione e i Servizi Correlati possano venir erogati in tutto o in parte da un Cloud Service Provider ovvero da altro soggetto individuato dal Fornitore.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										8. IDENTIFICAZIONE DEL CLIENTE
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										8.1 Il Cliente ha l’obbligo di comunicare al Fornitore tempestivamente i propri dati personali e garantisce che gli stessi siano corretti, aggiornati e veritieri. Il Cliente si impegna inoltre a comunicare tempestivamente ogni variazione dei dati personali utili alla corretta emissione dei documenti di vendita relativi all'acquisto dei servizi. In caso di dati errati, il Cliente è tenuto ad avvisare il Fornitore entro e non oltre il trentesimo giorno dall'emissione del documento.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										8.2 Il Cliente prende atto ed accetta che, qualora abbia comunicato al Fornitore dati falsi, non attuali o incompleti, quest’ultimo si riserva il diritto di sospendere l’accesso a Edilcloud e/o di risolvere il Contratto ai sensi dell’articolo 1456 del codice civile, trattenendo le somme pagate dal Cliente e riservandosi il diritto di chiedere il risarcimento del maggior danno. Resta in ogni caso inteso che tutti i dati comunicati dal Cliente al Fornitore saranno coperti dall’obbligo di riservatezza di cui al presente Contratto.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										9. RESTITUZIONE DEI DATI
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										9.1 Il Cliente potrà eseguire il backup dei propri dati elaborati mediante l’utilizzo dell’Applicazione in qualsiasi momento per tutta la durata del presente Contratto. Decorso tale termine i dati saranno ulteriormente recuperabili nel termine previsto dall'Accordo per la protezione dei dati personali di cui all'art. 25. Il Cliente prende atto che dalla cessazione del Contratto non sarà più possibile recuperare eventuali dati e/o informazioni e/o contenuti da egli immessi e/o trattati nell'infrastruttura virtuale e si impegna, ora per allora, a procurarsi tempestivamente prima della definitiva cessazione del Contratto una copia di tali dati e/o informazioni e/o contenuti con le modalità previste dall’Applicazione (es. esportazione Excel o PDF). In ogni caso per qualsiasi caso di cessazione del Contratto il Cliente solleva, ora per allora, il Fornitore da ogni e qualsiasi responsabilità per l'eventuale perdita o il danneggiamento totale o parziale di dati e/o informazioni e/o contenuti immessi e/o trattati dal cliente stesso.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										10. LIMITI ALL’UTILIZZO DI EDILCLOUD
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										10.1 Con l’attivazione di Edilcloud, il Cliente è ritenuto unico ed esclusivo responsabile per l’utilizzo di Edilcloud. Il Cliente riconosce di essere l’unico responsabile per i contenuti immessi, presenti, transitati e/o conservati sui server che ospitano Edilcloud e si obbliga ad utilizzare Edilcloud esclusivamente per scopi leciti e ammessi dalle disposizioni di legge di volta in volta applicabili, dalle regole di diligenza, della morale e dell’ordine pubblico ed in ogni caso, senza ledere qualsivoglia diritto di terzi.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										10.2 Il Fornitore non è tenuto alla verifica dei dati e dei contenuti conservati nell’infrastruttura virtuale, salvo che ciò si renda necessario per adempiere a disposizioni di legge, a richiesta dell’Autorità Giudiziaria o di altra Autorità competente o a specifica richiesta del Cliente per ragioni di supporto tecnico da egli richiesto e pertanto non può essere in alcun modo ritenuto responsabile per la natura e le caratteristiche di tali dati, né per eventuali loro errori e/o omissioni, nonché per eventuali danni diretti e/o indiretti derivanti al Cliente e/o a terzi dall’utilizzo dei dati stessi.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										10.3 Il Cliente si impegna a manlevare e tenere indenne il Fornitore da qualsiasi costo, onere spesa o danno che allo stesso possa essere cagionato a seguito di azioni di terzi, ivi incluse pubbliche autorità, conseguenti a violazione degli impegni di cui al presente articolo.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										10.4 Il Cliente dovrà attenersi ai limiti indicati nel proprio piano di cui i limiti sono visibili all’area del sito.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										Per tutto il periodo di BETA (periodo definito in corso d’opera da MONKEY BITS S.R.L.) i limiti indicati al punto 10.4 sono da considerarsi validi. Alla fine del suddetto periodo BETA, agli iscritti verrà mandata una mail per sottoscrivere un nuovo contratto, quindi con decorrenza dal 1° gennaio al 31 dicembre di ogni anno. Alla fine del periodo di beta saranno inviate le modifiche ai piani tariffari valide per l’anno corrente dal 1° gennaio al 31 dicembre di ogni anno.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										11. CASI DI SOSPENSIONE E/O INTERRUZIONE
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										11.1 Il Fornitore, anche mediante il Cloud Service Provider, farà ogni ragionevole sforzo per garantire la massima disponibilità del servizio Edilcloud. Il Cliente prende atto ed accetta che il Fornitore potrà sospendere e/o interrompere Edilcloud per garantire gli interventi di manutenzione ordinaria o straordinaria che si rendano opportuni e/o necessari sia ai locali che ospitano l’infrastruttura che ai server e/o apparecchiature ivi contenute. In tali casi, il Fornitore si impegna a ripristinare, o a fare in modo che il Cloud Services Provider ripristini, Edilcloud o l’infrastruttura virtuale, a seconda del caso, nel minor tempo possibile al fine di ridurre il disagio creato al Cliente.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										11.2 Il Fornitore, altresì, ha facoltà di sospendere e/o interrompere la fornitura dell’Applicazione e dei Servizi Collegati:
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										in caso di uso improprio o di violazioni del presente Contratto;
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										in caso di guasti e/o malfunzionamenti alla rete e agli apparati di fornitura di Edilcloud dipendenti da caso fortuito o forza maggiore o che comportino pericolo per la rete, per le persone e/o per le cose, nonché nel caso di modifiche e/o manutenzioni non programmabili e/o prevedibili e tecnicamente indispensabili;
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										qualora ricorrano motivate ragioni di sicurezza e/o garanzia di riservatezza;
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										in caso di errato o non conforme utilizzo di Edilcloud da parte dal Cliente o comunque mancati adempimenti del Cliente ad obblighi di legge in materia di utilizzo dei servizi informatici e della rete internet;
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										in caso di problemi di Edilcloud che non siano rimediabili senza sospendere o interrompere Edilcloud, in ogni caso informando il Cliente circa i tempi di intervento e di risoluzione delle problematiche riscontrate;
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										11.3 In ogni caso il Cliente dovrà comunicare al Fornitore entro 24 (ventiquattro) ore solari eventuali irregolarità o disfunzioni di Edilcloud. Eventuali danni causati da una comunicazione non tempestiva del Cliente non saranno imputabili al Fornitore.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										12. SERVICE LEVEL AGREEMENT (“SLA”)
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										12.1 Il Fornitore e il Cliente si danno reciprocamente atto che l’Accesso all’Applicazione Web e la fruizione dei Servizi Collegati saranno erogati dal Fornitore con la garanzia di un livello di disponibilità dei servizi pari al 99% del tempo 24 ore al giorno 7 giorni su 7 per tutto l’anno (Service Level Agreement, SLA).
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										13. GARANZIE E RESPONSABILITÀ
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										13.1 Gli obblighi e le responsabilità del Fornitore verso il Cliente sono quelli definiti dall’articolo precedente. In qualsiasi caso di violazione o inadempimento imputabile al Fornitore, lo stesso risponderà nei limiti previsti dallo SLA restando espressamente escluso, ora per allora, qualsiasi altro indennizzo o risarcimento al Cliente per danni diretti o indiretti di qualsiasi natura e specie. Il Cliente prende atto ed accetta, ora per allora, che in tutti i casi in cui non trova applicazione lo SLA, MONKEY BITS S.R.L. risponderà esclusivamente nei limiti della somma spesa dal Cliente negli ultimi 12 mesi.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										13.2 Il Cliente prende atto e accetta che il Fornitore non rilascia dichiarazioni e garanzie espresse o implicite sul fatto che Edilcloud sia adatta a soddisfare le esigenze del Cliente o che sia esente da errori. Il Cliente prende atto che il Fornitore, in nessun caso, potrà essere ritenuto responsabile per qualsiasi danno dovesse derivare al Cliente o a terzi in conseguenza di ritardi, mancato svolgimento o malfunzionamenti e/o interruzioni nell’erogazione di Edilcloud. In ogni caso, nei limiti massimi consentiti dalla legge, la responsabilità del Fornitore non potrà mai eccedere l’ammontare della somma spesa negli ultimi 12 mesi dal Cliente.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										13.3 Il Cliente prende altresì atto che il Fornitore in nessun caso potrà essere ritenuto responsabile per qualsiasi danno dovesse derivare al Cliente stesso o a terzi in conseguenza dell’uso di Edilcloud così come delle elaborazioni generate dall’Applicazione o mediante i Servizi Collegati, essendo il Cliente tenuto in ogni caso a verificare la correttezza delle elaborazioni ottenute utilizzando l’Applicazione o i Servizi Collegati.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										13.4 Senza pregiudizio per la generalità di quanto previsto dal presente articolo 3, il Cliente accetta e prende atto che in nessun caso il Fornitore potrà essere ritenuto responsabile in caso di guasti e/o malfunzionamenti alla rete né, in ogni caso, potrà essere ritenuto responsabile del risarcimento del danno per lucro cessante.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										14. PROPRIETÀ INTELLETTUALE
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										14.1 Il Cliente è tenuto ad utilizzare Edilcloud nel rispetto dei diritti di proprietà intellettuale e/o industriale del Fornitore e/o di terzi. Il Cliente accetta e riconosce che la titolarità dell’Applicazione, inclusi i codici sorgente e gli eventuali adattamenti, sviluppi e migliorie apportati dal Fornitore, della relativa documentazione, nonché tutti i diritti di utilizzazione economica sugli stessi, rimangano in capo al Fornitore. Qualsiasi materiale che formi oggetto di diritti di proprietà intellettuale e/o industriale in favore di terzi e che sia messo a disposizione del Cliente tramite Edilcloud, sarà utilizzato dal Cliente nel rispetto di tali diritti. Il Cliente assume ogni responsabilità in proposito, e si impegna a manlevare ed a tenere indenne, ora per allora, il Fornitore da qualsiasi conseguenza pregiudizievole.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										14.2 Nel caso in cui il Cliente violi i diritti di proprietà industriale o intellettuale del Fornitore e/o di terzi, il Fornitore si riserva il diritto di risolvere il Contratto ai sensi dell’articolo 1456 del codice civile.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										14.3 La titolarità di tutti i diritti sui marchi, loghi, nomi, e altri segni distintivi comunque associati a Edilcloud è del Fornitore e/o del Cloud Service Provider, con la conseguenza che il Cliente non potrà in alcun modo utilizzarli senza la preventiva autorizzazione scritta del Fornitore e/o del Cloud Service Provider.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										15. REGISTRO LOG
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										15.1 Con riferimento all’erogazione dell’Applicazione e dei Servizi Collegati, il Cliente prende espressamente atto ed accetta l’esistenza del Registro delle attività (LOG - dati relativi al traffico telematico), compilato e conservato dal Fornitore ovvero dal Cloud Service Provider, nei termini e con le modalità` stabilite dalla legge. Il predetto registro costituisce piena ed incontrovertibile prova dei fatti e degli atti compiuti dal Cliente di fronte al Fornitore e/o a terzi; esso ha carattere di riservatezza assoluta e potrà` essere esibito e/o fornito esclusivamente su richiesta dei soggetti espressamente indicati dalla Legge. Il Fornitore adotta tutte le misure tecniche ed organizzative necessarie a garantire la riservatezza dei registri di collegamento.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										16. DURATA
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										16.1 La durata del Contratto è convenuta dalla data di attivazione di Edilcloud per un periodo pari alla durata dell’abbonamento scelto come indicato nel Listino.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										17. RECESSO
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										17.1 Il Cliente qualificato come "consumatore” ai sensi dell’art. 3 del D.lgs. 206/2005 (cd. “Codice del Consumo”), ovvero colui che agisce per scopi estranei all'attività imprenditoriale o professionale, avrà facoltà di recedere entro 10 (dieci) giorni dal presente Contratto senza alcuna penalità, con comunicazione scritta inviata a mezzo raccomandata a.r. MONKEY BITS S.R.L. Via Santa Liberata 11, 24050, Bariano (BG) oppure a mezzo di posta elettronica certificata (PEC) all’indirizzo monkeybits@pec.it.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										17.2 MONKEY BITS S.R.L. si riserva la facoltà di recedere dal Contratto in qualsiasi momento e senza obbligo di motivazione, dandone comunicazione scritta al Cliente, con un preavviso di almeno 30 (trenta) giorni, fatto salvo il caso di eventi determinati da cause di forza maggiore, in virtù dei quali il Fornitore si riserva il diritto di recedere dal presente contratto con effetto immediato. Decorso il termine sopra indicato, il Contratto dovrà intendersi cessato e/o terminato e MONKEY BITS S.R.L. potrà in qualsiasi momento disattivare il Servizio senza ulteriore avviso e rimborsare al Cliente l'importo eventualmente già pagato. In ogni caso, resta espressamente esclusa ogni altra responsabilità di MONKEY BITS S.R.L. per l’esercizio del diritto di recesso e/o per il mancato utilizzo del Servizio da parte del Cliente ovvero il conseguente diritto di questi a pretendere ogni altro rimborso o indennizzo o risarcimento di qualsiasi tipo e genere.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										17.3 Il cliente prende atto che dopo la cessazione del contratto varrà quanto previsto all’art.9.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										18. RISOLUZIONE
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										18.1 L’inadempimento da parte del Cliente delle obbligazioni di cui agli articoli 8, 13 e 14 del presente Contratto, ove non determinato da caso fortuito o forza maggiore, comporterà la risoluzione di diritto del contratto ex art. 1456 c.c.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										18.2 È fatto comunque salvo il diritto del Fornitore di ottenere il risarcimento di tutti i danni subiti.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										18.3 Il Cliente potrà risolvere il contratto in qualsiasi momento, senza alcuna penalità e senza pretendere rimborsi, indennizzo o risarcimento, cancellando utente e dati attraverso i modi previsti dall'applicazione.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										18.4 Il Cliente ha la facoltà di non rinnovare il Contratto alla scadenza del periodo di licenza senza alcun preavviso e senza alcuna penalità.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										19. MODIFICHE UNILATERALI E UNICO CONTRATTO
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										19.1 Il Cliente prende atto ed accetta che l’Applicazione e i Servizi Collegati sono caratterizzati da tecnologia in continua evoluzione, per questi motivi MONKEY BITS S.R.L. si riserva il diritto di modificare in meglio le caratteristiche tecniche ed economiche dell’Applicazione e dei Servizi Collegati, degli strumenti ad essi correlati e di variare le condizioni del Contratto e dello SLA in qualsiasi momento, anche successivamente alla sua sottoscrizione, senza che ciò faccia sorgere obblighi di alcun genere in capo al Cliente.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										19.2 Qualora il Fornitore modifichi le condizioni contrattuali in qualsiasi parte, dette modifiche saranno comunicate al Cliente tramite e-mail o all’accesso all’Applicazione. Le predette modifiche avranno effetto decorsi 10 (dieci) giorni dalla data della loro comunicazione. Nello stesso termine il Cliente potrà esercitare la facoltà di recedere dal contratto con comunicazione scritta da inviarsi con le modalità e le tempistiche previste al precedente articolo 17. In mancanza di esercizio della facoltà di recesso da parte del Cliente, nei termini e nei modi sopra indicati, le variazioni si intenderanno da questi definitivamente conosciute ed accettate.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										19.3 MONKEY BITS S.R.L. potrà variare le caratteristiche tecniche, i sistemi, le risorse in conseguenza della normale evoluzione tecnologica delle componenti hardware e software garantendo al Cliente le medesime funzionalità di base.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										20. DICHIARAZIONI DEL CLIENTE
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										20.1 Il Cliente dichiara di avere tutti i diritti e poteri necessari per concludere e dare esecuzione piena ed efficace al presente Contratto.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										21. RISERVATEZZA DELLE INFORMAZIONI
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										21.1 Il Cliente si impegna a non divulgare ovvero rendere in alcun modo disponibili a terzi le informazioni confidenziali conosciute o gestite in relazione alla esecuzione e/o applicazione del presente Contratto in assenza di specifico consenso scritto del Fornitore.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										22. LEGGE APPLICABILE E FORO ESCLUSIVAMENTE COMPETENTE
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										22.1 Il presente Contratto è soggetto alla legge italiana.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										22.2 Qualora le Parti intendano adire l’Autorità giudiziaria ordinaria, il Foro competente è quello del luogo di residenza o di domicilio elettivo del Consumatore, inderogabile ai sensi dell’art. 33, comma 2, lett. u) del d.lgs. 206/2005. Laddove il Cliente non fosse qualificabile come “Consumatore”, il foro esclusivo con riferimento a qualsivoglia controversia relativa al presente Contratto, alla sua interpretazione o esecuzione, sarà il foro di Bergamo.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										23. RISOLUZIONE ONLINE DELLE CONTROVERSIE PER I CONSUMATORI
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										23.1 Il consumatore residente in Europa deve essere a conoscenza del fatto che la Commissione Europea ha istituito una piattaforma online che fornisce uno strumento di risoluzione alternativa delle controversie. Tale strumento può essere utilizzato dal consumatore europeo per risolvere in via non giudiziale ogni controversia relativa a e/o derivante da contratti di vendita di beni e servizi stipulati in rete. Di conseguenza, se sei un consumatore europeo, puoi usare tale piattaforma per la risoluzione di ogni disputa nascente dal contratto online stipulato con il Titolare. La piattaforma è disponibile al seguente link (http://ec.europa.eu/consumers/odr/). Il Titolare è disponibile a rispondere ad ogni quesito inoltrato via email all’indirizzo email pubblicato nel presente documento.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										24. DISPOSIZIONI FINALI
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										24.1 Il presente Contratto annulla e sostituisce ogni altra precedente intesa eventualmente intervenuta tra il Fornitore ed il Cliente riconducibile per qualsiasi motivo allo stesso utente (con la medesima email) ed avente ad oggetto il Servizio e costituisce la manifestazione ultima ed integrale degli accordi conclusi tra le Parti su tale oggetto. 
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										24.2 In nessun caso eventuali inadempimenti e/o comportamenti del Cliente difformi rispetto al Contratto potranno essere considerati quali deroghe al medesimo o tacita accettazione degli stessi, anche se non contestati dal Fornitore. L'eventuale inerzia del Fornitore nell'esercitare o far valere un qualsiasi diritto o clausola del Contratto, non costituisce rinuncia a tali diritti o clausole.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										24.3 A meno di espressa diversa indicazione nel Contratto, tutte le comunicazioni al Cliente potranno essere effettuate dal Fornitore indistintamente a mano, tramite posta elettronica, certificata e non, a mezzo di lettera raccomandata a.r., posta ordinaria ai recapiti indicati dal Cliente in fase di iscrizione o successivamente agendo sul pannello Utente presente nell’Applicazione e, in conseguenza, le medesime si considereranno da questi conosciute. Eventuali variazioni degli indirizzi e dei recapiti del Cliente compreso l'indirizzo e mail indicato in fase di ordine non comunicate al Fornitore con le modalità previste dal Contratto non saranno ad essa opponibili.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										24.4 Fatta eccezione per i casi specificatamente previsti in Contratto, tutte le comunicazioni che il Cliente intenda inviare al Fornitore relativamente al Contratto, ivi comprese le richieste di assistenza, dovranno essere inviate tramite l’area Supporto presente nell’Applicazione. Dall’area Supporto sarà infatti possibile inviare un ticket di intervento per richiedere assistenza tecnica, garantita negli abbonamenti.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										24.5 L’eventuale inefficacia e/o invalidità, totale o parziale, di una o più clausole del Contratto non comporterà l’invalidità delle altre, le quali dovranno ritenersi pienamente valide ed efficaci.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										24.6 Per quanto non espressamente previsto nel Contratto, le Parti fanno espresso rinvio, nei limiti in cui ciò sia possibile, alle norme di legge vigenti.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										24.7 Eventuali reclami in merito alla fornitura del Servizio, anche in merito al mancato rispetto dello SLA, dovranno essere indirizzati a MONKEY BITS S.R.L. tramite la mail monkeybits@pec.it Il Fornitore esaminerà il reclamo e fornirà risposta scritta entro 10 (dieci) giorni dal ricevimento del medesimo. Nel caso di reclami per fatti di particolare complessità, che non consentano una risposta esauriente nei termini di cui sopra, il Fornitore informerà il Cliente entro i predetti termini sullo stato di avanzamento della pratica. Il Cliente si impegna a non cedere il contratto a terzi senza previa autorizzazione scritta da parte del Fornitore.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										25. TRATTAMENTO DEI DATI PERSONALI
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										25.1 Con riferimento al trattamento da parte del Fornitore dei dati personali di soggetti terzi di cui il Cliente è titolare del trattamento e da quest'ultimo immessi o comunque trattati nell'esecuzione del Contratto ("Dati Personali di Terzi"), ai sensi del Regolamento Generale per la Protezione dei Dati Personale n. 619/2016 ("GDPR"), le Parti si danno atto e accettano di conformarsi a quanto previsto nell’"Accordo Principale per il Trattamento di Dati Personali – Master Data Processing Agreement" ("MDPA") allegato al presente Contratto (All. A)in essere tra le parti e disponibile su richiesta alla casella di posta <a href="mailto:monkeybits@pec.it" _target="blank" className="mailto-color">monkeybits@pec.it</a>.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										25.2 I dati personali del Cliente, o del personale del Cliente e raccolti ed elaborati dal Fornitore per finalità e con modalità proprie e del cui trattamento, pertanto, il Fornitore è Titolare ai sensi del GDPR ("Dati Personali del Cliente"), saranno trattati dal Fornitore in conformità a quanto riportato nell’informativa rilasciata in calce alle presenti Condizioni Generali dal Fornitore ai sensi dell’articolo 13 e 14 del GDPR.
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										MONKEY BITS S.R.L. 
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										P.IVA 04446750160
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										Via Santa Liberata 11
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										24050 - Bariano
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										Tel: 340/6849882
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										Sito Edilcloud.io: www.edilcloud.io
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										Sito Monkey bits srl: www.monkeybits.it
									</Typography>
								</DialogContentText>
								<DialogContentText tabIndex={-1}>
									<Typography color="textSecondary">
										Mail: monkeybits@pec.it
									</Typography>
								</DialogContentText>
							</>
						)
					}
					
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
