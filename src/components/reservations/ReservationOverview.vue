<template>
  <v-container grid-list-xl >
      <v-select
        label="Selecteer een dag"
        :items="reservations"
        :filer="customFilter"
        item-text="reservation"
        v-model="searchResults"
        autocomplete
      >
       <v-list-tile-content slot="item" slot-scope="reservations">
         <v-list-tile-title  @click="setDateFilter(reservations.item.reservation)" v-html="reservations.item.reservation"> </v-list-tile-title>
       </v-list-tile-content>
      </v-select>
  <v-container grid-list-xl >
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-data-iterator
          content-tag="v-layout"
          row
          wrap
          :items="reservations"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
        >
          <v-flex
            slot="item"
            slot-scope="reservations"
            xs12
            sm6
            md4
            lg3
          >             
            <v-card v-if="customFilter === reservations.item.reservation">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <v-card-title primary-title >
                      <div>
                        <div class="headline">
                          {{ reservations.item.name }}
                        </div>
                        <div> {{ reservations.item.email }}</div>
                        <span class="grey--text">{{ reservations.item.reservation  }}</span>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                  <v-icon>info_outline</v-icon>
                  <v-icon>mode_edit</v-icon>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-data-iterator> 
      </v-layout>   
    </v-slide-y-transition>
  </v-container>
  </v-container>
</template>

<script>
import { ReservationAPI } from '@/services'

export default {
  name: 'App',
  data () {
    return {
      rowsPerPageItems: [8, 12, 16, 20, 24],
      pagination: {
        rowsPerPage: 12
      },
      searchResults: [],
      reservations: [
        {
          name: 'Awad',
          email: 'test@test.nl',
          phone: '1234',
          reservation: '31-5',
          flex: 6
        }
      ]
    }
  },
  mounted () {
    this.getReservationList()
    this.setDateFilter(this.reservations.reservation)
  },
  methods: {
    getReservationList () {
      ReservationAPI.get(`reservation/list`)
        .then(response => {
          this.reservations = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    setDateFilter (date) {
      this.customFilter = date
      return this.customFilter
    },
    customFilter (item, queryText, itemText) {
      const hasValue = val => val != null ? val : ''
      const text = hasValue(item.reservation)
      const query = hasValue(queryText)
      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    }
  }
}
</script> 