<template>
<div>
  <li v-for="urls in info" :key="urls" @click="doCopy" :style="showList">
    {{ urls.longUrl }} 
    <br>
    <a :href="'https://3000-amber-donkey-7c2g51i3.ws-us03.gitpod.io/' + urls.urlCode">{{ 'https://3000-amber-donkey-7c2g51i3.ws-us03.gitpod.io/' + urls.urlCode }}</a>
  </li>
  <a class="listHistory" @click="listHistory">open history</a>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ShowAddress',
  props: ['longUrl'],
  data () {
    return {
      info: '',
      listUrl: '',
      showList: '',
      message: 'Copy These Text',
    }
  },
  methods: {
    listHistory () {
      if (this.showList != "display: none") {
      this.showList = "display: block";
      } else if (this.showList != "display: block") {
        this.showList = "display: none";
      }
    },
    doCopy: function () {
        this.$copyText(this.message).then(function (e) {
          alert('Copied')
          console.log(e)
        }, function (e) {
          alert('Can not copy')
          console.log(e)
        })
      },
    async submit () {
    await axios
      .get('https://3000-amber-donkey-7c2g51i3.ws-us03.gitpod.io/api/url/list/')
      .then(response => {
        this.info = response.data.reverse();
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
    }
  },
  mounted () {
    this.submit()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  display: none;
  width: 50%;
  border-radius: 5px;
  margin: 0 auto;
  list-style-type: none;
  padding: 12px;
  background: rgba(255,255,255,0.6);
  margin-bottom: 12px;
  box-shadow:  0 0 10px  rgba(0,0,0,0.6);
      -moz-box-shadow: 0 0 10px  rgba(0,0,0,0.6);
      -webkit-box-shadow: 0 0 10px  rgba(0,0,0,0.6);
      -o-box-shadow: 0 0 10px  rgba(0,0,0,0.6);
}
li:first-child {
  background: rgba(255,255,255,1);
  display:block;
}
li:hover {
  background:rgba(255,255,255,.8);
}
.listHistory {
  color: white;
}
</style>
