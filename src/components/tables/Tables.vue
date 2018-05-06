<template>
 <v-container fluid grid-list-md>
    <v-btn @click="$router.push({ name: 'HelloWorld'})" fab dark small color="primary">
      <v-icon dark>keyboard_arrow_left</v-icon>
    </v-btn>
      <v-layout row wrap>
        <v-flex
          v-for="(table, i) in tables"
          :key="table.name"
          v-bind="{ [`xs${table.flex}`]: true }"
        >
          <v-card>
            <v-card-media
              height="200px"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline" v-text="table.name"/>
                    <v-icon medium v-if="!table.active">lock_outline</v-icon>
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
              <v-btn icon @click="$router.push({ name: 'Reservation', params: { _id: table._id }})">
                <v-icon>event_note</v-icon>
              </v-btn>
              <v-btn icon @click="$router.push({ name: 'EditTableForm', params: { _id: table._id }})">
                <v-icon>mode_edit</v-icon>
              </v-btn>
              <v-btn icon v-show="table.active === true" @click="deactivateTable (table)">
                <v-icon v-show="table.active === true">lock_outline</v-icon>
              </v-btn>
              <v-btn icon v-show="!table.active" @click="reactivateTable (table)">
                  <v-icon v-show="!table.active">lock_open</v-icon>
              </v-btn>
                <v-btn icon @click="deleteTable (table, i)">
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
import { TableAPI } from '@/services'

export default {
  name: 'App',
  data () {
    return {
      tables: []
    }
  },
  mounted () {
    this.getTableList()
  },
  methods: {
    getTableList () {
      TableAPI.get(`table/list`)
        .then(response => {
          this.tables = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    deactivateTable (table) {
      TableAPI.put(`/table/deactivate/${table._id}`, {active: false}).then(result => {
        if (result.status === 200) {
          console.log('Table deactivated')
          table.active = false
        }
      })
    },
    reactivateTable (table) {
      TableAPI.put(`/table/activate/${table._id}`, {active: true}).then(result => {
        if (result.status === 200) {
          console.log('Table reactivated')
          table.active = true
        }
      })
    },
    deleteTable (table, index) {
      TableAPI.delete(`/table/${table._id}`).then(result => {
        if (result.status === 200) {
          console.log('deleted')
          this.tables.splice(index)
        }
      })
    }
  }
}
</script> 