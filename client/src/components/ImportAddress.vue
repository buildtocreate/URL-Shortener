<template>
<div>
  <form>
    <input type="text" v-model="longUrl" placeholder="Shorten your link" required>
    <button type="submit" @click.prevent="submit">Shorten!</button>
  </form>

  <div class="error" :style="errorColor">{{ urlError }}</div>
  <br>
  <ShowAddress :longUrl="longUrl" ref="form" />
</div>
</template>

<script>
import axios from 'axios';
import ShowAddress from '@/components/ShowAddress.vue'

export default {
  name: 'ImportAddress',
  components: {
    ShowAddress,
  },
  data () {
    return {
      longUrl: '',
      urlError: '',
      errorColor: '',
    }
  },
  methods: {
    async submit() {
      await axios.post('https://3000-amber-donkey-7c2g51i3.ws-us03.gitpod.io/api/url/shorten', 
        { longUrl: this.longUrl },
        { headers: { "Content-Type": "application/json" }})
      .then((response) => {
        this.errorColor = "background-color: rgba(75,181,67,1)"
        this.urlError = "Success";
        console.log(response);
      })
      .catch((error) => {
        this.errorColor = "background-color: rgba(255,15,15,1)"
        this.urlError = "Error: Please input a valid web address.";
        console.log(error);
      });
      this.$refs.form.submit()
      this.longURL = '';    
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  padding: 8px;
  border-radius: 25px;
  width: 50%;
  margin: 0 auto;
  background: rgba(255,255,255,0.9)
}
form input {
  width: 85%;
  border: none;
  border-radius: 25px;
  line-height: 24px;
  padding: 5px 5px;
}

input:focus {
  outline: none;
}
button {
  margin-left: 5px;
  background: rgba(255,255,255,0);
  width: 10%;
  border: none;
  line-height: 24px;
  padding: 5px 5px;
  border-radius: 3px;
}
button:hover {
  background: coral;
}
.error {
  padding: 8px;
  border-radius: 0 0 5px 5px; 
  width: 45%;
  margin: 0 auto;
  background: rgba(255,255,255,1);
}
</style>
