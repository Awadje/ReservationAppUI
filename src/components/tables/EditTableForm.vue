<template>
  <v-container>
    <v-form v-model="valid" ref="form" lazy-validation
    v-for="table in tables" v-bind:key="table.name">
      <v-text-field
        label="Naam"
        v-model="table.name"
          :rules="[v => !!v || 'Naam is verplicht']"
        required
      ></v-text-field>
        <v-select
        label="Locatie"
        v-model="table.location"
        :items="locations"
        :rules="[v => !!v || 'Locatie is verplicht']"
        required
      ></v-select>
      <v-radio-group v-model="radioGroup">
      <v-radio
        v-for="property in properties"
        :key="property"
        :label="property"
        :value="property"
      ></v-radio>
      </v-radio-group>
         <v-text-field
        label="Grootte"
        v-model="table.size"
        required
      ></v-text-field>
       <v-btn color="green" dark @click="editTable(table._id)" :disabled="!valid">Aanpassen</v-btn>
      <v-btn color="primary" dark to="/tables">Terug</v-btn>
    </v-form>
  </v-container>
</template>

<script>
 import { mapActions, mapState } from 'vuex'

 export default {
   data: () => ({
     valid: true,
     name: '',
     location: '',
     size: '',
     locations: [
       'Bij het raam',
       'In het midden',
       'Achter in het restaurant',
       'In een hoek'
     ],
     properties: [
       'Ronde Tafel',
       'Dichtbij de muziek',
       'Romantisch voor twee'
     ],
     checkbox: true,
     radioGroup: 1,
     tableToEdit: [],
     tables: []
   }),
   computed: {
     ...mapState('tables', [
       'list'
     ])
   },
   mounted () {
     this.getTable()
   },
   methods: {
     ...mapActions('tables', {
       getTableById: 'get',
       editSelectedTable: 'patch'
     }),
     getTable () {
       this.getTableById(this.$route.params._id)
       console.log(this.$route.params._id)
     },
     editTable (id) {
       this.editSelectedTable(id)
       console.log('Table Updated')
     }
   },
   clear () {
     this.$refs.form.reset()
   }
 }
</script>