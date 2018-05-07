<template>
 <v-container fluid grid-list-md>
    <v-btn @click="$router.push({ name: 'HelloWorld'})" fab dark small color="primary">
      <v-icon dark>keyboard_arrow_left</v-icon>
    </v-btn>
      <v-layout row wrap>
        <v-flex
          v-for="table in tables.data"
          v-bind="{ [`xs${table.flex}`]: true }"
          :key="table._id"
          :v-model="table"
        >
          <v-card>
            <v-card-media
              height="200px"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline" v-text="table.name"/>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-media>
            <v-card-title>
              <div>
                <span class="grey--text"> Tafel Grootte: {{ table.size }}</span><br>
                 <span> {{ table.location }}</span><br>
                 <span> {{ table.properties }}</span><br>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon @click="$router.push({ name: 'Reservation'})">
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
        <v-btn @click="$router.push({ name: 'TableForm'})" fab dark small color="primary">
          <v-icon dark>add</v-icon>
        </v-btn>
    </v-container>
</template>

<script>
// import { TableAPI } from '@/services'
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.tables.data)
  },
  computed: {
    ...mapState('tables', [
      'list'
    ]),
    ...mapGetters('tables', {
      findTablesInStore: 'find'
    }),
    tables () {
      return this.findTablesInStore({query: { $sort: {createdAt: 1} }})
    }
  },
  methods: {
    ...mapActions('tables', {
      findTables: 'find'
    })
  },
  created () {
    this.findTables({
      query: {
        $sort: {createdAt: -1},
        $limit: 25
      }
    })
  }
}
</script>
