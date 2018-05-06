<template>
  <v-container>
    <v-form v-model="valid" ref="form" lazy-validation
    v-for="table in tableToEdit" v-bind:key="table.name">
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
       <v-btn color="green" dark @click="editTable(table)" :disabled="!valid">Aanpassen</v-btn>
      <v-btn color="primary" dark to="/tables">Terug</v-btn>
    </v-form>
  </v-container>
</template>

<script>
  import { TableAPI } from '@/services'

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
      tableToEdit: []
    }),
    computed: {
    },
    mounted () {
      this.getTableById()
    },
    methods: {
      getTableById () {
        TableAPI.get(`table/edit/${this.$route.params._id}`)
          .then(response => {
            console.log(response)
            this.tableToEdit = response.data
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      editTable (table) {
        TableAPI.put(`/tables/edit/`, table).then(result => {
          if (result.status === 200) {
            this.$router.push({name: 'Tables', params: { _id: table._id }})
            console.log('Table Updated')
          }
        })
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>