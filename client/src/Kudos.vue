
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
    <div id="container">
      <div id="graph-container">
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

  export default {
  name: 'Kudos',
  data () {
    return {
      rootId: null,
      manager: {},
      selectedUser: {},
      isLoading: true,
      allUsers: {},
      userNames: [],
      userImages: [],
      teamMembers: []
    }
  },
  methods: {
    getAllUsers() {
      axios.get(`/api/employees/`).then(function (response) {
         this.allUsers = response.data
         console.log("response ", response.data)
         for(var i = 0; i < this.allUsers.length; i++) {
          //console.log("zdej sm v foru ")
          this.userNames.push(this.allUsers[i].firstName +" "+ this.allUsers[i].lastName)
          this.userImages.push(this.allUsers[i].avatarUrl)
          //console.log("ime ", this.allUsers[i].firstName +" "+ this.allUsers[i].lastName)
          //console.log("avatar ", this.allUsers[i].avatarUrl)

          // MANAGER ID:
          var manager_id = "0be23e70-2304-4737-abc5-2f8055e9d801"
          if(this.allUsers[i].managerId === manager_id) {
            this.teamMembers.push(this.allUsers[i])
          }
         }
      }.bind(this))
    },
    getAllManagers() {
      //axios.get(`/api/employees/`).then(function (response) {
    }
  },
  mounted () {
    var that = this
    that.getAllUsers()

    sigma.utils.pkg('sigma.canvas.nodes');
    sigma.canvas.nodes.image = (function() {
      var _cache = {},
          _loading = {},
          _callbacks = {};

      var renderer = function(node, context, settings) {
        var args = arguments,
            prefix = settings('prefix') || '',
            size = node[prefix + 'size'],
            color = node.color || settings('defaultNodeColor'),
            url = node.url;

        if (_cache[url]) {
          context.save();
          context.beginPath();
          context.arc(
            node[prefix + 'x'],
            node[prefix + 'y'],
            node[prefix + 'size'],
            0,
            Math.PI * 2,
            true
          );
          context.closePath();
          context.clip();
          context.drawImage(
            _cache[url],
            node[prefix + 'x'] - size,
            node[prefix + 'y'] - size,
            2 * size,
            2 * size
          );

          context.restore();
          context.beginPath();
          context.arc(
            node[prefix + 'x'],
            node[prefix + 'y'],
            node[prefix + 'size'],
            0,
            Math.PI * 2,
            true
          );
          context.lineWidth = size / 5;
          context.strokeStyle = node.color || settings('defaultNodeColor');
          context.stroke();
        } else {
          sigma.canvas.nodes.image.cache(url);
          sigma.canvas.nodes.def.apply(
            sigma.canvas.nodes,
            args
          );
        }
      };

      renderer.cache = function(url, callback) {
        if (callback)
          _callbacks[url] = callback;

        if (_loading[url])
          return;

        var img = new Image();

        img.onload = function() {
          _loading[url] = false;
          _cache[url] = img;

          if (_callbacks[url]) {
            _callbacks[url].call(this, img);
            delete _callbacks[url];
          }
        };

        _loading[url] = true;
        img.src = url;
      };

      return renderer;
      })();

      var i,
          s,
          img,
          N = 10,
          E = 20,
          g = {
            nodes: [],
            edges: []
          },
          urls = [
            'pics/profile.jpg',
            'pics/profile2.jpg',
            'pics/profile3.jpg',
            'pics/profile4.jpg'
          ],
          loaded = 0,
          colors = [
            '#4c9689',
            '#35b18a',
            '#3480bb',
            '#4d394b'
          ];

          var x;

      for (i = 0; i < N; i++) {
        img = Math.random();
        g.nodes.push({
          id: 'n' + i,
          label: 'Oseba ' + i,
          type: img ? 'image' : 'def',
          url: img ? urls[Math.floor(Math.random() * urls.length)] : null,
          x: 2+i/5,
          y: i%2==0 ? i/13:2+i/17,
          size: i%2==0 ? i+i/2:i/4,
          color: '#4' + i + '9689'
        });
        console.log(Math.random());
      }

      for (i = 0; i < E; i++)
        g.edges.push({
          id: 'e' + i,
          source: 'n' + (Math.random() * N | 0),
          target: 'n' + (Math.random() * N | 0),
          size: 10
        });

      urls.forEach(function(url) {
        sigma.canvas.nodes.image.cache(
          url,
          function() {
            if (++loaded === urls.length)
              s = new sigma({
                graph: g,
                renderer: {
                  container: document.getElementById('graph-container'),
                  type: 'canvas'
                },
                settings: {
                  minNodeSize: 20,
                  maxNodeSize: 30,
                }
              });
          }
        );
      });
    }
  }

</script>

