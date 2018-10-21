<template>
  <div v-on:keydown.esc="close()" tabindex="0">
    <div class="kudos-list">
      <h2>Kudos</h2>
      <ul>
        <li v-for="kudo in kudos" >
          {{ kudo.message }}
        </li>
        <li v-if="kudos.length === 0">No kudos for you. Yet :)</li>
      </ul>
    </div>
    <div class="overlay" @click.stop/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'kudos',
  props: {
    userId: {
      default: '',
      type: String
    }
  },
  created () {
    var that = this
    axios.get(`http://localhost:5003/api/kudos?beneficiaryId=${this.userId}`).then(function (response) {
      that.kudos = response.data
      that.$el.focus()
    })
  },
  data () {
    return {
      kudos: [],
    }
  },
  methods: {
    close (event) {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  background: #000;
  opacity: 0.2;
}

.kudos-list {
  width: 600px;
  height: auto;
  margin: auto;
  position: fixed;
  left: 0;
  right: 0;
  top: 30%;
  z-index: 100;
  background: #fff;
  pointer-events:none;
}

ul {
  list-style: none;
}

li:nth-child(even) {
  background: #42b983;
}

li:nth-child(odd) {
  background: #00000022;
}

li {
  padding: 10px;
  width: 90%;
  margin: 10px 10px 10px 0px;
}
</style>
