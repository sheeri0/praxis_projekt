<template>
<div>
<h1 class="text-center">{{ msg }}</h1>
<div class="d-flex align-items-center flex-column">
    <b-card no-body class="mb-1 col-6">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="dark">Czym jest FixATime?</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel" visible>
        <b-card-body>
          <b-card-text>Stworzyliśmy aplikację, która ma pomóc w organizacji czasu.
          Po zalogowaniu się otrzymasz dostęp do wyznaczonej przez szefa listy zadań.
          Możesz swobodnie dodawać własne pomocnicze zadania, oznaczać je jako ulubione i nadzorować czas nad nimi spędzony.
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1 col-6">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-2 variant="dark">Zakładka Bieżące</b-button>
      </b-card-header>
      <b-collapse id="accordion-2"  accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>Zakładka wyświetla aktualnie wybrane zadanie i jego właściwości. Możesz je zacząć, zatrzymać lub zakończyć.  <br>
            <b>Po zakończeniu zadania jedyny sposób na rozpoczęcie go ponownie to przywrócenie go z kosza!</b> <br>
            Aby wyczyścić widok należy wcisnąć guzik <b> "Wyczyść" </b> znajdujący się w prawym górnym rogu.
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1 col-6">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-3 variant="dark">Zakładka Zmień</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>Zakładka umożliwia wybranie zadania.
            Tło koloru jest powiązane z przynależnością do projektu - ułatwia to rozróżnienie zadań. <br>
            Intensywność koloru zadania określa jego priorytet - im większa, tym zadanie jest <b>ważniejsze</b>. <br>
            Kliknięcie gwiazdki ustala zadanie jako <b>ulubione</b>.
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1 col-6">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-4 variant="dark">Zakładka Ulubione</b-button>
      </b-card-header>
      <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>Zakładka wyświetla ulubione zadania. <br>
          Odznaczenie gwiazdki spowoduje usunięcie jej z listy ulubionych.
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1 col-6">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-5 variant="dark">Zakładka Kosz</b-button>
      </b-card-header>
      <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>Tutaj znajdują sie zakończone zadania. <br>
          Poprzez naciśnięcie guzika <b>"Przywróć"</b> powraca ono do listy dostępnych zadań, skąd można wybrać je ponownie.
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1 col-6">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-6 variant="dark">Zakładka Nowe</b-button>
      </b-card-header>
      <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>Zakładka umożliwia dodanie nowych, pomocniczych zadań. <br>
          Należy wpisać nazwę nowego zadania, wybrać projekt do którego należy, jak również wpisać jego priorytet od 0 do 5.
          Data jest opcjonalna.
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</div>
</template>

<script>
export default {
  name: 'About',
  data() {
      return {
        msg: "FAQ"
    }
    }
}
</script>

<style scoped>
p {
  line-height: 35px;
}

@media (min-width: 992px) {
  div div, button {
    font-size:22px;
  }
}
</style>
