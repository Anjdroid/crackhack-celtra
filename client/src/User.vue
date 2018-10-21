
<template>
  <div id="app">
   

    <div class="w3-sidebar sidebar w3-beige w3-bar-block w3-card sides2" style="width:20%; right:0;" id="mySidebar">
      <a href=""><span><b>Kudos of the month</b></span></a>
        <ul class="info2 received2">
            <li><img src="pics/profile2.jpg"><b>50 kudos</b><a href="">#timotej</a></li>
            <li><img src="pics/profile3.jpg"><b>45 kudos</b><a href="">#petra</a></li>
            <li><img src="pics/profile4.jpg"><b>39 kudos</b><a href="">#ana</a></li>
        </ul>
      <a href=""><span><b>Live kudos</b></span></a>
        <ul class="info2 received2">
            <li><a href="">#timotej</a>Your ideas were really helpful! Many thanks!</li></li>
            <li><a href="">#petra</a>Thank you for your help with database!</li></li>
            <li><a href="">#tadej</a>With your knowledge we are able to save so much time!</li></li>
          </ul>
    </div>
   
    <!--user user-id="userId"></user-->

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

export default {
  name: 'User',
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


