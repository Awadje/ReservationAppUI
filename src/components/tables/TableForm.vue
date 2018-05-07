
<template>
  <v-container>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        label="Naam"
        v-model="name"
          :rules="[v => !!v || 'Naam is verplicht']"
        required
      ></v-text-field>
        <v-select
        label="Locatie"
        v-model="location"
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
        v-model="size"
        required
      ></v-text-field>
      <v-btn @click="submit()" color="green" dark :disabled="!valid">Opslaan</v-btn>
      <v-btn color="primary" dark to="/tables">Terug</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
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
    radioGroup: 1
  }),
  computed: {
  },
  methods: {
    submit () {
      let newtable = {
        name: this.name,
        location: this.location,
        properties: this.property,
        size: this.size,
        flex: 6,
        available: true
      }
      this.addTable(newtable)
    },
    clear () {
      this.$refs.form.reset()
    },
    ...mapActions('tables', {
      addTable: 'create'
    })
  }
}
</script>
