<template>
  <div id="app">
    <div v-if="!isLoading">
      <div class="group mananger">
        <p class="role">MANAGER</p>
        <transition name="slide-fade">
          <user @click.native="setActiveUser(manager.id, manager.managerId)" :user-id="manager.id" v-if="!!manager" :key="`manager-${manager.id}`"/>
        </transition>
      </div>
      <div class="group">
        <p class="role">{{ selectedUser.department || "&nbsp;" | uppercase}}</p>
        <transition name="slide-fade">
          <div class="current" :key="`manager-${manager.id}`">
            <user @click.native="getUser(subordinate)" class="current--subordinate" 
                :status="subordinate == selectedUser.id" :user-id="subordinate"
                v-for="subordinate in manager.subordinates"
                :key="subordinate.id"/>
          </div>
        </transition>
      </div>
      <div class="group">
        <p class="role">SUBORDINATES</p>
        <transition name="slide-fade">
          <div class="subordinates" v-if="selectedUser.subordinates.length > 0" :key="`subordinates-${selectedUser.id}`">
              <user @click.native="setActiveUser(subordinate, selectedUser.id)" :user-id="subordinate" v-for="subordinate in selectedUser.subordinates" :key="subordinate.id" class="subordinate"/>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import User from './User'

export default {
  name: 'app',
  components: {
    'user' : User
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
    var that = this

    axios.get(`/api/boss`).then(function (response) {
      that.rootId = response.data.id

      axios.get(`/api/employees/${that.rootId}`).then(function (response) {
        that.manager = response.data
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
