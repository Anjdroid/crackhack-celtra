<template>
  <div id="app">
    <div class="w3-sidebar w3-text-white sidebar w3-purple w3-bar-block sides" id="mySidebar">
          <a href=""><span>My profile</span></a>
          <a href="" style="color: lightgray"><span>Visualization</span></a>
        </div>

        <user user-id="userId"></user>

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
              <ul class="info recieved">
                <li><img src="pics/profile2.jpg"> <a href="">#hackathon</a>Your ideas were really helpful! Many thanks!</li>
                <li><img src="pics/profile3.jpg"> <a href="">#celtra</a>Thank you for your help with database!</li>
                <li><img src="pics/profile2.jpg"> <a href="">#hackathon</a>With your knowledge we are able to save so much time!</li>
              </ul>
            <h3><b>Given kudos</b></h3>
              <ul class="info recieved">
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
import User from './User'
import Kudos from './Kudos'

export default {
  name: 'app',
  components: {
    'user' : User,
    'kudos' : Kudos
  },
  data () {
    return {
      rootId: null,
      manager: {},
      selectedUser: {},
      isLoading: true
    }
  },
  mounted () {
  // tuki greš iskat u bazo stvari, potem jih bindaš na this.neki(npr. product)
    var that = this

    axios.get(`/api/boss`).then(function (response) {
      that.rootId = response.data.id

      axios.get(`/api/employees/${that.rootId}`).then(function (response) {
        that.manager = response.data
        that.userId = response.data.subordinates[0];
        that.getUser(response.data.subordinates[0])
      })
    })
  },
  methods: {
    setActiveUser (userId, managerId) {
      if (managerId) {
        axios.get(`/api/employees/${managerId}`).then(function (response) {
          this.manager = response.data
          this.getUser(userId)
        }.bind(this))
      }
    },
    getUser (userId) {
      axios.get(`/api/employees/${userId}`).then(function (response) {
        this.selectedUser = response.data
        this.isLoading = false
      }.bind(this))
    }
  },
  filters: {
    uppercase: function (value) {
      if (!value) return ''
      return value.toUpperCase()
    }
  }
}
</script>

<style>
body {
  margin: 0;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.group {
  border: .1px dotted #efefef;
  height: 33vh;
  min-height: 33vh;
}

.group:nth-child(even) {
    background: #42b983a0;
}

.role {
  transform: rotate(90deg);
  position: relative;
  top: 13vh;
  right: 49%;
}

.current {
  display: flex;
  overflow: auto;
  overflow-y: hidden;
}

.current--subordinate {
  flex: 1;
}

.subordinates {
  display: flex;
  overflow: auto;
  overflow-y: hidden;
}

::-webkit-scrollbar {
  background: #CCF6ED;
  border-radius: 4px;
  height: 8px;
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: #21BB9A;
  border-radius: 4px;
}

.subordinate {
  flex: 1;
}

.slide-fade-enter-active {
  transition: all .5s ease .8s;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
