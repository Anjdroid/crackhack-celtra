<template>

  <div id="app">

  <div>
     <div class="w3-sidebar w3-text-white sidebar w3-purple w3-bar-block sides" id="mySidebar">
      <a href="" style="font-size: 40px;"><b><span>#kudos</span></b></a>
      <a href="#" @click="clickProfile"><span>My profile</span></a>
      <a href="#" @click="clickVisualization"><span>Visualization</span></a>
    </div>

    <div v-if="activeView == 'profile'">
      <User/>
    </div>

    <div v-else>
      <Kudos/>
    </div>
  </div>
  </div>
</template>

<script>
import User from './User'
import Kudos from './Kudos'


export default {
  name: 'App',
  components: {
    User,
    Kudos
  },
  data () {
    return {
      activeView: "profile",
    }
  },
  mounted () {
  },
  methods: {
    clickProfile() {
      this.activeView = "profile"
    },
    clickVisualization() {
      this.activeView = "visualization"
    }
  }
}
</script>
