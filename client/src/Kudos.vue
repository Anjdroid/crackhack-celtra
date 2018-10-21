<template>
  <div id="app">
    <div class="w3-sidebar w3-text-white sidebar w3-purple w3-bar-block sides" id="mySidebar">
      <a href="" style="font-size: 40px;"><b><span>#kudos</span></b></a>
      <a href=""><span>My profile</span></a>
      <a href="" style="color: lightgray"><span>Visualization</span></a>
    </div>

    <kudos></kudos>

    <div class="w3-main w3-container" >
        <div class="w3-container" style="margin-left:230px; margin-top: 30px; text-align: justify;" >
          <div class="one"><img src="pics/profile.jpg"></div>
          <div class="two">
            <h3><b>{{ `${selectedUser.firstName} ${selectedUser.lastName}` }}</b></h3>
          <ul class="info">
            <li>Celtra Ljubljana.</li>
            <li>Project manager.</li>
            <li>Always ready to help!</li>
          </ul>
        </div>
        <h3><b>My projects</b></h3>
        <div class="buttons">
          <button>#celtra</button>
          <button>#slack</button>
          <button>#hackathon</button>
        </div>
        <h3><b>Received kudos</b></h3>
          <ul class="info received">
            <li><img src="pics/profile2.jpg"> <a href="">#hackathon</a>Your ideas were really helpful! Many thanks!</li>
            <li><img src="pics/profile3.jpg"> <a href="">#celtra</a>Thank you for your help with database!</li>
            <li><img src="pics/profile2.jpg"> <a href="">#hackathon</a>With your knowledge we are able to save so much time!</li>
          </ul>
        <h3><b>Given kudos</b></h3>
          <ul class="info received">
            <li><img src="pics/profile4.jpg"> <a href="">#celtra</a>Thank you for your help with frontend!</li>
            <li><img src="pics/profile3.jpg"> <a href="">#hackathon</a>With your skills we are able to save so much time!</li>
            <li><img src="pics/profile2.jpg"> <a href="">#hackathon</a>Your ideas were really helpful! So grateful!</li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Kudos from './Kudos'

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
    axios.get(`http://localhost:5001/api/kudos?beneficiaryId=${this.userId}`).then(function (response) {
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
