<template>
 <v-container fluid grid-list-md>
      <v-btn @click="$router.push({ name: 'HelloWorld'})" fab dark small color="primary">
      <v-icon dark>keyboard_arrow_left</v-icon>
    </v-btn>
      <v-layout row wrap>
        <v-flex
          v-bind="{ [`xs${table.flex}`]: true }"
          v-for="table in tables"
          :key="table.tableNumber"
        >
          <v-card>
            <v-card-media
              height="200px"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline"> Tafelnummer: </span>
                    <span class="headline" v-text="table.tableNumber"/>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-media>
            <v-card-title>
              <div>
                <span class="grey--text"> Tafel Grootte: {{ table.size }}</span><br>
                 <span> {{ table.location }}</span><br>
                 <span> {{ table.notes }}</span><br>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
<<<<<<< HEAD
              <v-btn icon @click="$router.push({ name: 'Reservation'})">
=======
              <v-btn icon>
>>>>>>> 9cbe49c... Add calemdar icon
                <v-icon>event_note</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>bookmark</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>share</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      availableSlots: [
        { id: 1, time: '5:00pm - 6:00 pm', click_state: 3, state: false },
        { id: 2, time: '6:00pm - 7:00 pm', click_state: 3, state: false },
        { id: 3, time: '7:00am - 8:00 pm', click_state: 3, state: false },
        { id: 4, time: '8:00pm - 9:00 pm', click_state: 3, state: false }
      ],
      tables: [
        {
          tableNumber: 7,
          size: 5,
          location: 'In de hoek',
          notes: 'Dichtbij live muziek',
          flex: 6,
          imgUrl: '/static/img/restaurant-table.png',
          availableSlots: [
            { id: 1, time: '5:00pm - 6:00 pm', click_state: 3, state: false },
            { id: 2, time: '6:00pm - 7:00 pm', click_state: 3, state: false },
            { id: 3, time: '7:00am - 8:00 pm', click_state: 3, state: false },
            { id: 4, time: '8:00pm - 9:00 pm', click_state: 3, state: false }
          ]}
      ]
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script> 