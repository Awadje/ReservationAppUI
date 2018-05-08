<template>
 <v-container fluid grid-list-md>
    <v-btn @click="$router.push({ name: 'HelloWorld'})" fab dark small color="primary">
      <v-icon dark>keyboard_arrow_left</v-icon>
    </v-btn>
      <v-layout row wrap>
        <v-flex
          v-for="table in tables"
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
               <v-btn icon @click="$router.push({ name: 'EditTableForm', params: { _id: table._id }})">
                <v-icon>mode_edit</v-icon>
              </v-btn>
                <v-btn icon @click="deleteTable(table._id)">
                <v-icon color="primary">delete</v-icon>
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
  computed: {
    ...mapState('tables', [
      'list'
    ]),
    ...mapGetters('tables', {
      findTablesInStore: 'find'
    }),
    tables () {
      return this.findTablesInStore({query: { $sort: {createdAt: 1} }}).data
    }
  },
  methods: {
    ...mapActions('tables', {
      findTables: 'find',
      removeTable: 'remove'
    }),
    deleteTable (id) {
      this.removeTable(id)
    }
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
