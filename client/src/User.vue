<template>
  <div class="user">
      <img :src="user.avatarUrl" alt="" class="image--cover" :class="{ 'active': status }"/>
      <p>{{ user.firstName }} {{ user.lastName }}</p>
      <img src="https://professionalorganizeraz.com/wp-content/uploads/2016/02/Kudos-300x300.png" class="kudos" @click.stop="showKudos = true"></img>
      <p class="job">{{ user.jobTitle }}</p>
      <span ref="dot" v-for="(item, index) in user.subordinates" class="dot"
        :style="`transform: rotate(${defaultTransform - index * 10 + (10 * user.subordinates.length / 2)}deg ) translate(90px);`">
      </span>

      <kudos :userId="user.id" v-if="showKudos" @close="showKudos = false"/>
  </div>
</template>

<script>
import axios from 'axios'
import User from './User'
import Kudos from './Kudos'

export default {
  name: 'user',
  components: {
    'user' : User,
    'kudos' : Kudos
  },
  props: {
    userId: {
      default: '',
      type: String
    },
    status: {
      default: false,
      type: Boolean
    }
  },
  created () {
    var that = this
    axios.get(`/api/employees/${this.userId}`).then(function (response) {
        that.user = response.data

        that.$nextTick().then(function () {
          if (that.status) {
            var circles = that.$refs.dot || 0

            for (var i = 0; i < circles.length; i++) {
              var circle = circles[i]
              var xMax = 500;
              var yMax = 300;
              var t = -95 - i * 10 + (10 * circles.length / 2)

              circle.keyframes = [{
                opacity: 0,
                transform: `rotate(${t}0deg) translate(-90px) rotate(${t}deg)`
              }, {
                opacity: 1,
                transform: `rotate(${t + 180}deg) translate(-90px) rotate(${t + 180}deg)`
              }];

              circle.animProps = {
                duration: 1000,
                easing: "cubic-bezier(0.42, 0, 0.58, 1)",
                iterations: 1
              }

              var animationPlayer = circle.animate(circle.keyframes, circle.animProps);
            }
          }
        })
    })
  },
  data () {
    return {
      isLoading: true,
      user: {},
      showKudos: false
    }
  },
  methods: {
    select (userId) {
      if (this.user.subordinates.length > 0) {
        this.$root.$emit('select-user', userId)
      }
    }
  },
  computed: {
    defaultTransform: function () {
      return this.status ? -275 : -95
    }
  },
  watch: {
    userId: function(newVal, oldVal) {
      axios.get(`/api/employees/${newVal}`).then(function (response) {
        this.user = response.data
      }.bind(this))
    },
    status: function(newVal, _) {
      var circles = this.$refs.dot

      if (!!circles) {
        for (var i = 0; i < circles.length; i++) {
          var circle = circles[i]
          var t = -95 - i * 10 + (10 * circles.length / 2)

          circle.keyframes = [{
            opacity: 0.5,
            transform: `rotate(${t + 180}deg) translate(-90px) rotate(${t + 180}deg)`
          }, {
            opacity: 1,
            transform: `rotate(${t}deg) translate(-90px) rotate(${t}deg)`
          }]

          circle.animProps = {
            duration: 1000,
            easing: "ease-in-out",
            iterations: 1
          }

          if (newVal) {
            circle.animate(circle.keyframes, circle.animProps)
          } else {
            circle.animate(circle.keyframes, circle.animProps).reverse()
          }
        }
      }
    }
  }
}
</script>

<style>
.image--cover {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 20px;

  object-fit: cover;
  object-position: center right;

  border: 8px solid #616161;
  opacity: 0.3;
}

.active {
  border: 8px solid #42b983;
  opacity: 1;
}

.user {
  position:relative;
}

.dot {
  height: 7px;
  width: 7px;
  background-color: #42b983;
  border-radius: 50%;
  display: block;
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  margin: -44px -3px;
  z-index: 5;
}

.kudos {
  float: left;
  position: absolute;
  left: 0;
  right: -165px;
  top: 10px;
  margin: auto;
  height: 2em;
  width: 2em;
  text-align: center;
}

.job {
  background: #42b983;
  text-align: center;
  border-radius: 30px 30px 30px 30px;
  color: white;
  padding: 5px 10px;
  font-weight: 900;
  width: fit-content;
  margin: auto;
}
</style>
