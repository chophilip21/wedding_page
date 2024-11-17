/**
 * @file translation.js
 * @description Contains translations for the website in English, Italian, and Polish, covering various sections such as navbar, RSVP, registry, and more.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

const translations = {
  // ENGLISH <---------------------------------------------------------------------------------------
  en: {
    couple: {
      her: "Karolina",
      him: "Emanuele",
    },
    navbar: {
      welcome: "Welcome",
      save_the_date: "Save the Date",
      schedule: "Wedding Timeline",
      info: "Details",
      rsvp: "RSVP",
      registry: "Registry",
      music: "Playlist",
    },
    welcome_section: {
      small_text: "The wedding of...",
      days: "Days",
      day: "Day",
      hours: "Hours",
      hour: "Hours",
      minutes: "Minutes",
      minute: "Minute",
      seconds: "Seconds",
      second: "second",
      button: "Save the Date",
    },
    saveTheDate_section: {
      title: "SAVE",
      title_cursive: "The Date",
      date: "26th of July 2025",
      place: "in Kolonia Łobudzice, Poland",
      story_1: "We Met",
      story_2: "We Got Engaged",
      story_3_future: "We Will Marry",
      story_3_past: "We Got Married",
    },
    schedule_section: {
      title: {
        main: "WEDDING",
        sub: "Timeline",
      },
      description:
        "The wedding celebration will start on Saturday, 26th of July, and end on Sunday, 27th of July 2025.",
      day_1: {
        title: "Day 1",
        events: {
          ceremony: {
            time: "4:00 PM",
            title: "Ceremony Begins",
            description: "Join us as we say 'I do' in a beautiful ceremony.",
          },
          dinner: {
            time: "5:00 PM",
            title: "Dinner Served",
            description:
              "Indulge in a delicious feast with family and friends.",
          },
          cake_cutting: {
            time: "10:00 PM",
            title: "Cake Cutting",
            description: "Savor the sweetness as we cut the cake together.",
          },
          party: {
            time: "All Night",
            title: "Eat, Drink, Dance, Repeat!",
            description:
              "Celebrate the night away with music, drinks, and joy!",
          },
        },
      },
      day_2: {
        title: "Day 2",
        events: {
          party_continues: {
            time: "2:00 PM - 10:00 PM",
            title: "Eat, Drink, Dance, Repeat!",
            description:
              "Continue the festivities with more food, drinks, and dancing.",
          },
        },
      },
    },
    info_section: {
      title: {
        main: "THE",
        sub: "Details",
      },
      details: {
        when_where: "When & Where",
        dates: ["Dates: ", { bold: true, text: "26th and 27th of July 2025" }],
        location: [
          "Location: ",
          { bold: true, text: "Kolonia Łobudzice, Poland" },
        ],
        same_location:
          "Ceremony, Party and Accommodations are held in the same location.",
        no_white_dresses: ["Please ", { bold: true, text: "No white dresses" }],
      },
      accommodations: {
        title: "Accommodations",
        description_1: [
          "For our out-of-town guests, we are pleased to offer accommodation at the venue for ",
          {
            bold: true,
            text: "Friday 25th July, Saturday 26th July, and Sunday 27th July.",
          },
          " If you need accommodation for additional days, please let us know, and we can help you arrange it, though the cost for extra nights will be at your own expense.",
        ],
        breakfast: [
          { bold: true, text: "Breakfast" },
          " is included with your stay and will be served from ",
          { bold: true, text: "7 AM to 11 AM" },
          " each morning.",
        ],
      },
      travel_transport: {
        title: "Travel & Transportation",
        description_1: [
          "We are organizing transportation from ",
          { bold: true, text: "Katowice Airport" },
          " to the venue on ",
          { bold: true, text: "Friday, 25th July" },
          " and recommend all guests arrive by ",
          { bold: true, text: "3PM" },
          ". We’ll wait for everyone. On ",
          { bold: true, text: "Monday, 28th July" },
          ", we’ll provide transport back to the airport (time to be arranged).",
        ],
        description_2: [
          "If you arrive at a different airport or outside the scheduled times, you’ll need to arrange your own transport. The easiest option is to take a train or bus to ",
          { bold: true, text: "Belchatow Central" },
          ", then a bus to ",
          { bold: true, text: "XXX Road" },
          ", just a 3-minute walk from the venue.",
        ],
      },
      additional_info:
        "We will let you know more information about the accommodation and transportation in private. Or you can always contact us to ask more details.",
    },
    rsvp_section: {
      top_title: "RSVP",
      title: { main: "Confirm your", sub: "Attendance" },
      description_1: [
        "Please RSVP by ",
        { bold: true, text: "15th May 2025" },
        " to let us know if you will be attending. Simply search for your name on the form and confirm whether you will be joining us or not.",
      ],
      description_2:
        "You can also let us know if you have any special requests, such as dietary restrictions or other needs. We want to make sure everyone is comfortable and has a great time!",
      label: "Search your name in the guests list",
      placeholder: "Search for your name",
      no_found: "No guests found with this name",
      multiple_guests_1: {
        hi: "Hi ",
        you: " You, ",
        and: " and ",
        are_invited:
          ", are warmly invited to join us on our special day. Celebrating with all of you will make it unforgettable!",
      },
      multiple_guests_2:
        "Select who is attending the wedding. We hope all of you can make it.",
      single_guest_1: {
        hi: "Hi ",
        are_invited: " We're delighted to have you on our guest list!",
      },
      single_guest_2: "Are you attending the wedding?",
      answers: { yes: "Yes", no: "No", unknown: "Don't know yet" },
      note_placeholder: "Would you like to leave a note?",
      rsvp_success: {
        thanks: "Thank you!",
        submitted: " Your RSVP has been submitted.",
        change_by: [
          "Remember that you can change the attendancy any time by ",
          { bold: true, text: "15th May 2025" },
          ".",
        ],
      },
      error_enter_name: "Please enter your answer before submitting",
      error_submitting: "Error submitting RSVP. Please try again.",
      button: {
        submit: "Send RSVP",
        loading: "Loading...",
      },
    },
    registry_section: {
      title: { main: "GIFT", sub: "Registry" },
      description_1:
        "Your presence at our wedding is the greatest gift we could ask for.",
      description_2:
        "However, if you wish to honor us with a gift, we would greatly appreciate a monetary contribution to help us build our future together.",
      description_3:
        "We kindly ask our international guests to consider sending their gift via IBAN transfer or a similar method such as Revolut. For our Polish guests, contributions can be made online or given in cash at the wedding, whichever is more convenient.",
      description_4:
        "To access the IBAN details, please click the button below and enter the password you received with the invitation, or contact us directly for further information.",
      description_5:
        "In lieu of flowers, which we already have in abundance, we would be delighted to receive scratch cards or lottery tickets as a fun and exciting way to celebrate our new beginning.",
      button: "Access Gift Transfer Info",
      thanks: "THANK YOU",
      error_from_api: "There is a problem. Try again later or contact us",
      error_incorrect_password: "Incorrect password",
      error_insert_password: "Insert password",
      account_holder: "Account Holder: ",
      iban: "IBAN: ",
      bank_name: "Bank: ",
      bic: "BIC: ",
      sort_code: "Sort Code: ",
      account_number: "Account Number: ",
      eur: "Eur",
      gbp: "Pound",
      pln: "Zlotych",
      toast_copied: "Copied to clipboard",
      toast_error: "Couldn't copy it",
      dialog_title: {
        before: "Enter the password",
        after: "The password is correct",
      },
      placeholder: "Enter password",
      submit_button: { submit: "Submit", loading: "Checking..." },
      copy_all: "Copy All",
    },
    music_section: {
      title: { main: "OUR", sub: "Playlist" },
      description:
        "Help us shape the perfect soundtrack! Share your favorite songs for background vibes or dance floor fun, and we'll add them to our wedding playlist.",
      placeholder: "Enter the song name",
      small_note: "* Some songs can't play here, but you can still add them.",
      toast_success: {
        title: "Song Added to the Playlist",
        description: "Would you like to add another song?",
      },
      toast_error: {
        title: "Unable to Add Song",
        description:
          "We're sorry, but something went wrong on our end. Please try again later.",
      },
    },
    footer: {
      text_1: "Website created with ",
      text_2: "by ",
    },
    not_found: {
      message: "The page you are looking for does not exist.",
      button: "Go Back",
    },
  },

  // ITALIAN <---------------------------------------------------------------------------------------
  it: {
    couple: {
      her: "Karolina",
      him: "Emanuele",
    },
    navbar: {
      welcome: "Benvenuti",
      save_the_date: "Segna la Data",
      schedule: "Timeline Matrimonio",
      info: "Dettagli",
      rsvp: "RSVP",
      registry: "Lista Nozze",
      music: "Playlist",
    },
    welcome_section: {
      small_text: "Il matrimonio di...",
      days: "Giorni",
      day: "Giorno",
      hours: "Ore",
      hour: "Ora",
      minutes: "Minuti",
      minute: "Minuto",
      seconds: "Secondi",
      second: "secondo",
      button: "Segna la Data",
    },
    saveTheDate_section: {
      title: "SEGNA",
      title_cursive: "La Data",
      date: "26 Luglio 2025",
      place: "a Kolonia Łobudzice, Polonia",
      story_1: "Ci Siamo Conosciuti",
      story_2: "Ci Siamo Fidanzati",
      story_3_future: "Ci Sposiamo",
      story_3_past: "Ci Siamo Sposati",
    },
    schedule_section: {
      title: {
        main: "TIMELINE",
        sub: "Matrimonio",
      },
      description:
        "La cerimonia inizia Sabato 26, e finisce Domenica 27 Luglio 2025.",
      day_1: {
        title: "Giorno 1",
        events: {
          ceremony: {
            time: "16:00",
            title: "Inizio della Cerimonia",
            description:
              "Unisciti a noi mentre ci diciamo 'Sì' in una bellissima cerimonia.",
          },
          dinner: {
            time: "17:00",
            title: "Cena Servita",
            description: "Goditi una deliziosa cena con famiglia e amici.",
          },
          cake_cutting: {
            time: "22:00",
            title: "Taglio della Torta",
            description:
              "Assapora la dolcezza mentre tagliamo la torta insieme.",
          },
          party: {
            time: "Tutta la notte",
            title: "Mangia, Bevi, Balla, Ripeti!",
            description: "Festeggia tutta la notte con musica, drink e gioia!",
          },
        },
      },
      day_2: {
        title: "Giorno 2",
        events: {
          party_continues: {
            time: "14:00 - 22:00",
            title: "Mangia, Bevi, Balla, Ripeti!",
            description:
              "Continua i festeggiamenti con altro cibo, drink e balli.",
          },
        },
      },
    },
    info_section: {
      title: {
        main: "I",
        sub: "Dettagli",
      },
      details: {
        when_where: "Quando e Dove",
        dates: ["Date: ", { bold: true, text: "26 e 27 Luglio 2025" }],
        location: [
          "Luogo: ",
          { bold: true, text: "Kolonia Łobudzice, Polonia" },
        ],
        same_location:
          "Cerimonia, festa e alloggio si terranno nello stesso luogo.",
        no_white_dresses: [
          "Per favore, ",
          { bold: true, text: "niente vestiti bianchi" },
        ],
      },
      accommodations: {
        title: "Alloggi",
        description_1: [
          "Per i nostri ospiti fuori città, offriamo alloggio nella sede per ",
          {
            bold: true,
            text: "Venerdì 25 Luglio, Sabato 26 Luglio e Domenica 27 Luglio.",
          },
          " Se hai bisogno di alloggio per giorni aggiuntivi, faccelo sapere e ti aiuteremo a organizzarlo, ma il costo per le notti extra sarà a tuo carico.",
        ],
        breakfast: [
          { bold: true, text: "La colazione" },
          " è inclusa nel soggiorno e verrà servita dalle ",
          { bold: true, text: "7 alle 11" },
          " ogni mattina.",
        ],
      },
      travel_transport: {
        title: "Viaggi e Trasporti",
        description_1: [
          "Stiamo organizzando il trasporto dall'aeroporto di ",
          { bold: true, text: "Katowice" },
          " alla sede per ",
          { bold: true, text: "Venerdì 25 Luglio" },
          " e consigliamo di arrivare entro le ",
          { bold: true, text: "15:00" },
          ". Lunedí ",
          { bold: true, text: "28 Luglio" },
          ", forniremo il trasporto di ritorno all'aeroporto (orario da concordare).",
        ],
        description_2: [
          "Se arrivi in un altro aeroporto o fuori dagli orari programmati, dovrai organizzare il trasporto autonomamente. L'opzione più semplice è prendere un treno o autobus per ",
          { bold: true, text: "Belchatow Central" },
          ", poi un autobus per ",
          { bold: true, text: "Via XXX" },
          ", a soli 3 minuti a piedi dalla sede.",
        ],
      },
      additional_info:
        "Ti faremo sapere maggiori informazioni sugli alloggi e trasporti in privato. Puoi anche contattarci per ulteriori dettagli.",
    },
    rsvp_section: {
      top_title: "RSVP",
      title: { main: "Conferma la tua", sub: "Presenza" },
      description_1: [
        "Conferma la tua presenza entro il ",
        { bold: true, text: "15 maggio 2025" },
        " per farci sapere se parteciperai. Cerca il tuo nome nel modulo e conferma se parteciperai o meno.",
      ],
      description_2:
        "Puoi anche farci sapere se hai richieste speciali, come restrizioni dietetiche o altre necessità. Vogliamo assicurarci che tutti siano a proprio agio e si divertano!",
      label: "Cerca il tuo nome nella lista degli invitati",
      placeholder: "Cerca il tuo nome",
      no_found: "Nessun invitato trovato con questo nome",
      multiple_guests_1: {
        hi: "Ciao",
        you: " Tu ",
        and: " e ",
        are_invited:
          ", siete calorosamente invitati a partecipare al nostro giorno speciale. Festeggiare con tutti voi lo renderà indimenticabile!",
      },
      multiple_guests_2:
        "Seleziona chi parteciperà al matrimonio. Speriamo possiate venire tutti.",
      single_guest_1: {
        hi: "Ciao ",
        are_invited:
          " Siamo felici di averti nella nostra lista degli invitati!",
      },
      single_guest_2: "Parteciperai al matrimonio?",
      answers: { yes: "Sì", no: "No", unknown: "Non so ancora" },
      note_placeholder: "Vuoi lasciare un messaggio?",
      rsvp_success: {
        thanks: "Grazie!",
        submitted: " La tua conferma è stata inviata.",
        change_by: [
          "Ricorda che puoi cambiare la tua partecipazione fino al ",
          { bold: true, text: "15 maggio 2025" },
          ".",
        ],
      },
      error_enter_name: "Per favore inserisci la tua risposta prima di inviare",
      error_submitting: "Errore nell'invio della conferma. Per favore riprova.",
      button: {
        submit: "Invia RSVP",
        loading: "Un Momento...",
      },
    },
    registry_section: {
      title: { main: "LISTA", sub: "Nozze" },
      description_1:
        "La vostra presenza al nostro matrimonio è il regalo più grande che possiamo desiderare.",
      description_2:
        "Tuttavia, se desiderate onorarci con un dono, vi saremmo grati per un contributo economico per aiutarci a costruire il nostro futuro insieme.",
      description_3:
        "Chiediamo gentilmente ai nostri ospiti internazionali di considerare l'invio del loro dono tramite bonifico IBAN o un metodo simile come Revolut. Per i nostri ospiti polacchi, i contributi possono essere effettuati online o consegnati in contanti durante il matrimonio, a seconda della vostra comodità.",
      description_4:
        "Per accedere ai dettagli IBAN, fate clic sul pulsante qui sotto ed inserite la password ricevuta con l'invito, oppure contattateci direttamente per ulteriori informazioni.",
      description_5:
        "Invece dei fiori, che già abbiamo in abbondanza, ci farebbe piacere ricevere dei gratta e vinci o biglietti della lotteria come un modo divertente per celebrare il nostro nuovo inizio.",
      button: "Accedi ai dettagli bancari",
      thanks: "GRAZIE",
      error_from_api:
        "Si è verificato un problema. Riprova più tardi o contattaci",
      error_incorrect_password: "Password errata",
      error_insert_password: "Inserisci la password",
      account_holder: "Intestatario: ",
      iban: "IBAN: ",
      bank_name: "Banca: ",
      bic: "BIC: ",
      sort_code: "Codice Sort: ",
      account_number: "Numero di conto: ",
      eur: "Euro",
      gbp: "Sterlina",
      pln: "Zloty",
      toast_copied: "Copiato negli appunti",
      toast_error: "Non è stato possibile copiare",
      dialog_title: {
        before: "Inserisci la password",
        after: "La password è corretta",
      },
      placeholder: "Inserisci la password",
      submit_button: { submit: "Invia", loading: "Verifica in corso..." },
      copy_all: "Copia tutto",
    },
    music_section: {
      title: { main: "LA", sub: "Playlist" },
      description:
        "Aiutaci a creare la colonna sonora perfetta! Condividi le tue canzoni preferite per un bel sottofond o per divertirti sulla pista da ballo, e le aggiungeremo alla nostra playlist di matrimonio.",
      placeholder: "Cerca canzoni",
      small_note:
        "* Alcune canzoni non possono essere riprodotte qui, ma puoi comunque aggiungerle.",
      toast_success: {
        title: "Canzone aggiunta alla Playlist",
        description: "Vuoi aggiungerne un'altra?",
      },
      toast_error: {
        title: "Impossibile aggiungere la canzone",
        description:
          "Siamo spiacenti, ma qualcosa è andato storto da parte nostra. Per favore, riprova più tardi.",
      },
    },
    footer: {
      text_1: "Sito creato con ",
      text_2: "da ",
    },
    not_found: {
      message: "La pagina che stai cercando non esiste.",
      button: "Torna Indietro",
    },
  },

  // POLISH <---------------------------------------------------------------------------------------
  pl: {
    couple: {
      her: "Karoliny",
      him: "Emanuela",
    },
    navbar: {
      welcome: "Witamy",
      save_the_date: "Zapisz Datę",
      schedule: "Harmonogram",
      info: "Bliższe Dane",
      rsvp: "RSVP",
      registry: "Lista Prezentów",
      music: "Lista Odtwarzania",
    },
    welcome_section: {
      small_text: "Ślub...",
      days: "dni",
      day: "dzień",
      hours: "godziny",
      hour: "godzina",
      minutes: "minuty",
      minute: "Minuta",
      seconds: "sekundy",
      second: "sekunda",
      button: "Zapisz Datę",
    },
    saveTheDate_section: {
      title: "ZAPISZ", //DATĘ
      title_cursive: "Datę",
      date: "26 lipca 2025",
      place: "w Kolonii Łobudzice, Polska",
      story_1: "Spotkaliśmy Się",
      story_2: "Zaręczyliśmy Się",
      story_3_future: "Weźmiemy Ślub",
      story_3_past: "Pobraliśmy Się",
    },
    schedule_section: {
      title: {
        main: "WESELE",
        sub: "Timeline",
      },
      description:
        "Ślub oraz wesele odbędą się 26 lipca 2025 roku. Następnego dnia serdecznie zapraszamy na poprawiny!",
      day_1: {
        title: "Dzień 1",
        events: {
          ceremony: {
            time: "16:00",
            title: "Rozpoczęcie Ceremonii",
            description:
              "Dołącz do nas, gdy powiemy sobie 'Tak' podczas pięknej ceremonii.",
          },
          dinner: {
            time: "17:00",
            title: "Obiad Podany",
            description:
              "Rozkoszuj się pysznym posiłkiem z rodziną i przyjaciółmi.",
          },
          cake_cutting: {
            time: "22:00",
            title: "Krojenie Tortu",
            description: "Delektuj się słodkościami, gdy razem kroimy tort.",
          },
          party: {
            time: "Całą noc",
            title: "Jedz, Pij, Tańcz, Powtarzaj!",
            description: "Świętuj całą noc z muzyką, napojami i radością!",
          },
        },
      },
      day_2: {
        title: "Dzień 2",
        events: {
          party_continues: {
            time: "14:00 - 22:00",
            title: "Jedz, Pij, Tańcz, Powtarzaj!",
            description:
              "Kontynuuj zabawę z większą ilością jedzenia, napojów i tańców.",
          },
        },
      },
    },
    info_section: {
      title: {
        main: "Oto",
        sub: "Szczegóły",
      },
      details: {
        when_where: "Kiedy i Gdzie",
        dates: ["Daty: ", { bold: true, text: "26 i 27 lipca 2025" }],
        location: [
          "Lokalizacja: ",
          { bold: true, text: "Kolonia Łobudzice, Polska" },
        ],
        same_location:
          "Ceremonia, przyjęcie i zakwaterowanie odbędą się w tym samym miejscu.",
        no_white_dresses: [
          "Prosimy, ",
          { bold: true, text: "bez białych sukienek" },
        ],
      },
      accommodations: {
        title: "Zakwaterowanie",
        description_1: [
          "Dla naszych gości spoza miasta oferujemy zakwaterowanie w miejscu ślubu w dniach ",
          {
            bold: true,
            text: "Piątek, 25 lipca, Sobota, 26 lipca i Niedziela, 27 lipca.",
          },
          " Jeśli potrzebujesz zakwaterowania na dodatkowe dni, daj nam znać, a pomożemy Ci je zorganizować, ale koszt za dodatkowe noce będzie na Twój rachunek.",
        ],
        breakfast: [
          { bold: true, text: "Śniadanie" },
          " jest wliczone w cenę pobytu i będzie serwowane od ",
          { bold: true, text: "7:00 do 11:00" },
          " każdego ranka.",
        ],
      },
      travel_transport: {
        title: "Podróż i Transport",
        description_1: [
          "Organizujemy transport z lotniska ",
          { bold: true, text: "Katowice" },
          " do miejsca ślubu w piątek, 25 lipca. Zalecamy, aby wszyscy goście przybyli przed godziną ",
          { bold: true, text: "15:00" },
          ". Poczekamy na wszystkich. W poniedziałek ",
          { bold: true, text: "28 lipca" },
          ", zapewnimy transport z powrotem na lotnisko (godzina do ustalenia).",
        ],
        description_2: [
          "Jeśli przylecisz na inne lotnisko lub poza wyznaczonymi godzinami, będziesz musiał samodzielnie zorganizować transport. Najłatwiejszą opcją jest pociąg lub autobus do ",
          { bold: true, text: "Belchatow Central" },
          ", a następnie autobus do ",
          { bold: true, text: "ulicy XXX" },
          ", zaledwie 3 minuty spacerem od miejsca wesela.",
        ],
      },
      additional_info:
        "Więcej informacji na temat zakwaterowania i transportu przekażemy Ci prywatnie. Możesz się z nami skontaktować, aby uzyskać więcej szczegółów.",
    },
    rsvp_section: {
      top_title: "RSVP",
      title: { main: "Potwierdź swoją", sub: "Obecność" },
      description_1: [
        "Prosimy o potwierdzenie obecności do ",
        { bold: true, text: "15 maja 2025" },
        " aby poinformować nas, czy będziesz uczestniczyć. Wyszukaj swoje imię w formularzu i potwierdź, czy dołączysz do nas, czy nie.",
      ],
      description_2:
        "Możesz również poinformować nas o wszelkich specjalnych potrzebach, takich jak ograniczenia dietetyczne lub inne wymagania. Chcemy upewnić się, że wszyscy czują się komfortowo i dobrze się bawią!",
      label: "Wyszukaj swoje imię na liście gości",
      placeholder: "Wyszukaj swoje imię",
      no_found: "Nie znaleziono gości o tym imieniu",
      multiple_guests_1: {
        hi: "Cześć ",
        you: "! Ty ",
        and: " i ",
        are_invited:
          ", jesteście serdecznie zaproszeni, by dołączyć do nas w tym wyjątkowym dniu. Świętowanie z wami wszystkimi sprawi, że będzie niezapomniane!",
      },
      multiple_guests_2:
        "Wybierz, kto weźmie udział w weselu. Mamy nadzieję, że wszyscy będziecie mogli przyjść.",
      single_guest_1: {
        hi: "Cześć",
        are_invited: " Cieszymy się, że jesteś na naszej liście gości!",
      },
      single_guest_2: "Czy weźmiesz udział w weselu?",
      answers: { yes: "Tak", no: "Nie", unknown: "Jeszcze nie wiem" },
      note_placeholder: "Chcesz zostawić wiadomość?",
      rsvp_success: {
        thanks: "Dziękujemy!",
        submitted: " Twoje potwierdzenie zostało przesłane.",
        change_by: [
          "Pamiętaj, że możesz zmienić swoją obecność do ",
          { bold: true, text: "15 maja 2025" },
          ".",
        ],
      },
      error_enter_name: "Proszę podać odpowiedź przed wysłaniem",
      error_submitting: "Błąd podczas wysyłania RSVP. Spróbuj ponownie.",
      button: {
        submit: "Wyślij RSVP",
        loading: "Ładowanie...",
      },
    },
    registry_section: {
      title: { main: "PREZENT", sub: "Lista" },
      description_1:
        "Twoja obecność na naszym ślubie jest największym prezentem, o jaki moglibyśmy prosić.",
      description_2:
        "Jeśli jednak chcielibyście nas uhonorować prezentem, bylibyśmy wdzięczni za wkład pieniężny, aby pomóc nam budować wspólną przyszłość.",
      description_3:
        "Uprzejmie prosimy naszych międzynarodowych gości o rozważenie przesłania prezentu za pomocą przelewu IBAN lub podobnej metody, takiej jak Revolut. Dla naszych gości z Polski, wkłady można przekazać online lub w gotówce na weselu, w zależności od tego, co jest wygodniejsze.",
      description_4:
        "Aby uzyskać dostęp do danych IBAN, kliknij poniższy przycisk i wprowadź hasło, które otrzymałeś wraz z zaproszeniem, lub skontaktuj się z nami bezpośrednio w celu uzyskania dalszych informacji.",
      description_5:
        "Zamiast kwiatów, których mamy już w nadmiarze, z przyjemnością przyjmiemy zdrapki lub losy na loterię jako zabawny i ekscytujący sposób na uczczenie naszego nowego początku.",
      button: "Dostęp do danych przelewu",
      thanks: "DZIĘKUJEMY",
      error_from_api:
        "Wystąpił problem. Spróbuj ponownie później lub skontaktuj się z nami",
      error_incorrect_password: "Nieprawidłowe hasło",
      error_insert_password: "Wprowadź hasło",
      account_holder: "Właściciel konta: ",
      iban: "IBAN: ",
      bank_name: "Bank: ",
      bic: "BIC: ",
      sort_code: "Kod sortowania: ",
      account_number: "Numer konta: ",
      eur: "Euro",
      gbp: "Funt",
      pln: "Złoty",
      toast_copied: "Skopiowano do schowka",
      toast_error: "Nie udało się skopiować",
      dialog_title: { before: "Wprowadź hasło", after: "Hasło jest poprawne" },
      placeholder: "Wprowadź hasło",
      submit_button: { submit: "Wyślij", loading: "Sprawdzanie..." },
      copy_all: "Kopiuj wszystko",
    },
    music_section: {
      title: { main: "NASZA", sub: "Playlist" },
      description:
        "Pomóż nam stworzyć idealną ścieżkę dźwiękową! Podziel się swoimi ulubionymi piosenkami na tle lub na parkiet, a dodamy je do naszej playlisty weselnej.",
      placeholder: "Wpisz nazwę utworu",
      small_note:
        "* Niektóre piosenki nie mogą być odtworzone tutaj, ale nadal możesz je dodać.",
      toast_success: {
        title: "Piosenka dodana do Playlisty",
        description: "Czy chcesz dodać kolejną piosenkę?",
      },
      toast_error: {
        title: "Nie udało się dodać piosenki",
        description:
          "Przepraszamy, coś poszło nie tak po naszej stronie. Spróbuj ponownie później.",
      },
    },
    footer: {
      text_1: "Strona stworzona z ",
      text_2: "przez ",
    },
    not_found: {
      message: "Strona, której szukasz, nie istnieje.",
      button: "Wróć",
    },
  },
};

export default translations;
