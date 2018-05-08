<template>
  <v-container>
    <v-form v-model="valid" ref="form" lazy-validation
    v-for="table in tables" v-bind:key="table._id">
      <v-text-field
        label="Naam"
        v-model="table.name"
        @keyup="typeSave(table)"
        :rules="[v => !!v || 'Naam is verplicht']"
        required
      ></v-text-field>
        <v-select
        label="Locatie"
        v-model="table.location"
        @change="clickSave(table)"
        :items="locations"
        :rules="[v => !!v || 'Locatie is verplicht']"
        required
      ></v-select>
        <v-select
        label="Eigenschappen"
        v-model="table.property"
        @change="clickSave(table)"
        :items="properties"
        :rules="[v => !!v || 'Locatie is verplicht']"
        required
      ></v-select>
         <v-text-field
        label="Grootte"
        v-model="table.size"
        @keyup="clickSave(table)"
        required
      ></v-text-field>
      <v-btn color="primary" dark to="/tables">Terug</v-btn>
    </v-form>
  </v-container>
</template>

<script>
 import { mapActions, mapState, mapGetters } from 'vuex'

 export default {
   data: () => ({
     editName: '',
     valid: true,
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
     valuesToEdit: {}
   }),
   computed: {
     ...mapState('tables', [
       'list'
     ]),
     ...mapGetters('tables', {
       findTablesInStore: 'find'
     }),
     tables () {
       return this.findTablesInStore({
         query: {
           _id: this.$route.params._id
         }
       }).data
     }
   },
   mounted () {
     this.getTable()
   },
   methods: {
     ...mapActions('tables', {
       getTableById: 'get',
       editSelectedTable: 'patch'
     }),
     typeSave (event) {
       console.log('key pressed')
       this.editSelectedTable([this.$store.getters['tables/list'][0]._id, this.$store.getters['tables/list'][0]])
     },
     clickSave (event) {
       console.log('item clicked')
       this.editSelectedTable([this.$store.getters['tables/list'][0]._id, this.$store.getters['tables/list'][0]])
     },
     getTable () {
       this.getTableById(this.$route.params._id)
       console.log(this.$route.params._id)
     },
     editTable (table) {
       console.log(table)
       this.editSelectedTable([table._id, table])
       console.log('Table Updated')
     }
   },
   clear () {
     this.$refs.form.reset()
   }
 }
</script>
