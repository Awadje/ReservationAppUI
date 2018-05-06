<template>
<v-app light>
  <v-content>
    <v-container grid-list-xl text-xs-center>
        <v-btn @click="$router.push({ name: 'Tables'})" fab dark small color="primary">
      <v-icon dark>keyboard_arrow_left</v-icon>
    </v-btn>
  <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-card>
           <v-alert v-if="doubleReservation" type="error" v-model="doubleReservation" icon="warning" :value="true" outline dismissible>
              {{doubleReservation}}
            </v-alert>
            <v-alert v-if="doubleSlot" type="error" v-model="doubleSlot" icon="warning" :value="true" outline dismissible>
              {{doubleSlot}}
            </v-alert>
            <v-alert v-if="savedReservation" type="success" v-model="savedReservation" icon="check_circle" :value="true" outline dismissible>
              {{savedReservation}}
            </v-alert>
            <v-alert v-if="formNotValid" type="error" v-model="formNotValid" icon="warning" :value="true" outline dismissible>
              {{formNotValid}}
            </v-alert>
          <v-stepper v-model="e6" vertical>
            <v-stepper-step step="1" v-bind:complete="e6 > 1" editable>
              Kies de datum van de reservering</v-stepper-step>
            <v-stepper-content step="1">
              <v-flex xs11 sm5>
                <v-dialog persistent max-width="290" v-model="modal">
                  <v-text-field slot="activator" label="Kies een datum" v-model="date" prepend-icon="event" readonly></v-text-field>
                  <v-date-picker v-model="date" :allowed-dates="setAvailableDays ()" scrollable actions>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary"  @click.native="e6 = 2"  @click="modal = false">OK</v-btn>
                      </v-card-actions>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
            </v-stepper-content>
            <v-stepper-step step="2" ditable v-bind:complete="e6 > 2">Hoe laat kommen de gasten ?</v-stepper-step>
            <v-stepper-content step="2">
              <v-radio-group v-on:change="formatDate" v-model="selected">
                <v-radio v-for ="slot in tableSlots" :key="slot.id" :label="`${slot.time}`" @click.native="e6 = slot.click_state" :value="`${slot.id}`" :disabled="slot.state"></v-radio>
              </v-radio-group>
            </v-stepper-content>
            <v-stepper-step step="3" editable v-bind:complete="e6 > 3">Vul contact gegevens van de klant in</v-stepper-step>
            <v-stepper-content step="3">
              <form  ref="form">
              <v-text-field name="firstname" label="Voornaam" v-model="firstname" v-validate ="'required|alpha'" />
              <span v-show="errors.has('firstname')" class="error_msg">{{ errors.first('firstname') }}</span>

              <v-text-field name="lastname" label="Achternaam"  v-model="lastname" v-validate ="'required|alpha'"/>
              <span v-show="errors.has('lastname')" class="error_msg">{{ errors.first('lastname') }}</span>

              <v-text-field name="email" label="Email" v-model="email" v-validate="'required|email'"></v-text-field>
              <span v-show="errors.has('email')" class="error_msg">{{ errors.first('email') }}</span>

              <v-text-field name="phone" label="Telefoon" v-model="phone" v-validate="'required|numeric'" />
                <span v-show="errors.has('phone')" class="error_msg">{{ errors.first('phone') }}</span>
                <v-spacer></v-spacer>
              <v-btn block color="primary" @click ="submit ()" @click.native="e6 = 0">RESERVEREN</v-btn>
            </form>
            </v-stepper-content>
          </v-stepper>
        </v-card>

      </v-flex>
      </v-layout>
    </v-container>
  </v-content>

  <v-footer app></v-footer>
</v-app>
</template>

<script>
/* eslint-disable*/
import moment from 'moment'
import { ReservationAPI } from '../../services'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'AppointmentScheduler',
  data () {
    return {
      date: null,
      time: null,
      modal: null,
      modal2: null,
      dialog: false,
      e6: null,
      e1: null,
      allowedDates: null,
      select: null,
      selectedSlots: [],
      doubleReservation: false,
      doubleSlot: false,
      savedReservation: false,
      formNotValid: false,
      tableSlots: [
        { id: 1, time: '17:00', click_state: 3, state: false },
        { id: 2, time: '17:15', click_state: 3, state: false },
        { id: 3, time: '17:30', click_state: 3, state: false },
        { id: 4, time: '17:45', click_state: 3, state: false },
        { id: 6, time: '18:00', click_state: 3, state: false },
        { id: 7, time: '18:15', click_state: 3, state: false },
        { id: 8, time: '18:30', click_state: 3, state: false },
        { id: 9, time: '18:45', click_state: 3, state: false },
        { id: 10, time: '19:00', click_state: 3, state: false },
        { id: 11, time: '19:15', click_state: 3, state: false },
        { id: 12, time: '19:30', click_state: 3, state: false },
        { id: 13, time: '19:45', click_state: 3, state: false },
        { id: 14, time: '20:00', click_state: 3, state: false },
        { id: 15, time: '20:15', click_state: 3, state: false },
        { id: 16, time: '20:30', click_state: 3, state: false },
        { id: 17, time: '20:45', click_state: 3, state: false },
        { id: 18, time: '21:00', click_state: 3, state: false },
      ],
      selected: null,
      ok: null,
      collapsed: null,
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      appointment: '',
      items: [
        { text: 'PM' }
      ],
      availableDays: {
        min: null,
        max: null
      }
    }
  },
  computed: {
    ...mapState('slots', [
      'slots'
    ]),
    ...mapGetters('slots', [
      'availableSlots'
    ])
  },
  mounted () {
    this.setAvailableDays()
    this.allSlots()
    console.log(this.doubleReservation)
    console.log(this.availableSlots)
  },
  beforeUpdate () {
    this.setTimeFormat()
  },
  updated () {
  },
  methods: {
    ...mapActions('slots', [
      'allSlots'
    ]),
    formatDate () {
      console.log('date for appointment:', moment(this.date, 'YYYY/MM/DD').format('DD/MM/YYYY'))
      console.log('Time for appointment:', this.selected)
      const day = moment(this.date, 'YYYY/MM/DD').format('dddd')
      const daynumber = moment(this.date, 'YYYY/MM/DD').format('Do')
      const month = moment(this.date, 'YYYY/MM/DD').format('MMMM')
      const year = moment(this.date, 'YYYY/MM/DD').format('YYYY')
      this.appointment = day + '    ' + daynumber + '    ' + month + '    ' + year + '   ' + 'between slots' + '   ' + this.selected & +this.selected + +8
    },
    submit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.addSlotToAPI()
          if (this.doubleSlots === false) {
          this.addReservationToAPI()
          } else {
            this.doubleReservation
          }
          return
        } this.formNotValid = ('Het formulier is niet compleet')
      })
    },
    setTimeFormat () {
      if (this.e1 === 'PM') {
        this.collapsed = true
        this.ok = null
        this.availableSlots()
        console.log('value', this.e1)
        this.e1 = null
      }
    },
    setAvailableDays () {
      const nowdate = new Date()
      const todaydate = new Date()
      const endofyear = new Date(todaydate.getFullYear(), 12, 31)
      const singleday = 1000 * 60 * 60 * 24
      const remainingdays = Math.ceil((endofyear.getTime() - todaydate.getTime()) / singleday)
      todaydate.setDate(nowdate.getDate() + remainingdays)
      this.availableDays.min = nowdate
      this.availableDays.max = todaydate
      this.allowedDates = this.availableDays
    },
    addReservationToAPI () {
      let newappointment = {
        name: this.firstname + ' ' + this.lastname,
        email: this.email,
        phone: this.phone,
        reservation: this.appointment,
        slot: this.selected
      }
      ReservationAPI.post('/reservation/create', newappointment)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
          this.doubleReservation = `Reservering met met nummer: ${this.phone} en/of e-mail: ${this.email} is al gemaakt vandaag`
        })
    },
    addSlotToAPI () {
      let newslot = {
        table_id : this.$route.params._id,
        slot_start: this.selected,
        slot_end: +this.selected + +8,
        slot_date: this.date,
        created_at: moment()
      }
      ReservationAPI.post('/slot/create', newslot)
        .then((response) => {
          console.log(response)
          this.savedReservation = 'Reservering geslaagd!'
        })
        .catch((error) => {
          console.log(error)
          this.doubleSlot = 'Kies een ander tijdstip deze is bezet'
        })
    },
    setSlots () {
      if (this.$store.getters.slots.availableSlots > 0) {
        this.selectedSlots = this.$store.getters.slots.availableSlots
      }
    },
  }
}
</script>