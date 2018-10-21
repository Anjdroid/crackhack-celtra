
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
            <li v-if="selectedUser.department" >Department: {{ `${selectedUser.department}` }}</li>
            <li>Job title: {{ `${selectedUser.jobTitle}` }}</li>
            <li>Always ready to help!</li>
          </ul>
        </div>
        <h3><b>My projects</b></h3>
        <div class="buttons">
            <button v-if="selectedUser.department">#{{ selectedUser.department }}</button>
            <button>#{{ selectedUser.jobTitle }}</button>
         </div>
        <h3><b>Received kudos</b></h3>
        <ul class="info received">
          <li v-for="kudo in allKudos" :key="kudo.id">
            <p> {{ `${kudo.username}` }} </p>
            <a href="" >#{{ kudo.department }}</a>
            {{ kudo.message }}
           </li>
          <li v-if="receivedKudos.length === 0">No kudos for you. Yet :)</li>
        </ul>
        <ul class="info received">
                    <li><img src="pics/profile2.jpg"> <a href="">#celtra</a>Some other kudos I got!</li>
                    <li><img src="pics/profile3.jpg"> <a href="">#celtra</a>You got this far only to got this far.</li>
                    <li><img src="pics/profile4.jpg"> <a href="">#hackaton</a>It all seems possible until you try it.</li>
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
          receivedKudos: {},
          isLoading: true,
          avatarUrl: null,
          numOfKudos: 5,
          liveKudo: null,
          topKudos: {},
          givenKudos: {},
          userName: null,
          name: null,
          allKudos : {},
          department: null
        }
      },
      mounted () {
      // tuki greš iskat u bazo stvari, potem jih bindaš na this.neki(npr. product)
        var that = this

        axios.get(`/api/boss`).then(function (response) {
          that.rootId = response.data.id

          axios.get(`/api/employees/${that.rootId}`).then(function (response) {
            that.manager = response.data
            that.userId = response.data.subordinates[0]
            that.getUser(response.data.subordinates[0])
            console.log("what", response.data.subordinates[0])
            console.log(that)
            that.getKudos(response.data.subordinates[0]).then(function (response) {
              that.allKudos = response.data
                        //console.log("m ", response.data)
             //console.log("that.allKudos "+JSON.stringify(that.allKudos))

                        for (var i = 0; i < that.allKudos.length; i++) {
                          console.log("sem v foru")
                          var n = that.getUserName(kudo.endorser);
                          var url = that.getUserAvatar(kudo.endorser);
                          var dept = that.getUserDepartment(kudo.endorser);
                          that.receivedKudos = {"username" : n, "avatarUrl" : url, "department" : dept, "message": allKudos[i].message};
                          console.log("jou "+this.receivedKudos)
                        }
            })

          })
        })
        //console.log("userid: ", this.userId);


      },
      methods: {
        setActiveUser (userId, managerId) {
          if (managerId) {
            axios.get(`/api/employees/${managerId}`).then(function (response) {
              this.manager = response.data
              this.getUser(userId)
              this.getKudos(userId)
            }.bind(this))
          }
        },
        getUser (userId) {
          axios.get(`/api/employees/${userId}`).then(function (response) {
            this.selectedUser = response.data
            this.isLoading = false
          }.bind(this))
        },
        getKudos (userId) {
        //var all_kudos = {}
          axios.get(`http://localhost:5003/api/kudos/?beneficiaryId=${userId}`).then(function (response) {
             console.log("je al ni? ", response.data)
             return response.data
           }.bind(this))
        },
        getUserName(userId) {
          axios.get(`/api/employees/${userId}`).then(function (response) {
             console.log("avatar res ", response.data)
             console.log("avatar  " , response.data.firstName)
             this.name = response.data
             return this.selectedUser.firstName +" "+this.selectedUser.lastName

          }.bind(this))
        },
        getUserAvatar(userId) {
          axios.get(`/api/employees/${userId}`).then(function (response) {
               console.log("avatar res ", response.data)
               console.log("avatar  " , response.data.avatarUrl)
               return this.response.data.avatarUrl
          }.bind(this))
        },
        getUserDepartment(userId) {
          axios.get(`/api/employees/${userId}`).then(function (response) {
               console.log("dept res ", response.data)
               console.log("dept  " , response.data.department)
               return this.response.data.department
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


