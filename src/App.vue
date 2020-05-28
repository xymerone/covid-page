<template>
  <div id="app">
  <Nav/>
    <DataAll :alldata="data" />
    <ToDay  />
    <Footer />
  </div>
</template>

<script>
  import ToDay from "./components/ToDay.vue"
  import Footer from "./components/Footer.vue";
import Nav from "./components/Nav.vue";
import DataAll from "./components/DataAll.vue";
import axios from 'axios'
// import api  from 'novelcovid'
// api.all().then(console.log)
export default {
  name: 'App',
  data(){
    return {
      data: []
    }
  },
  components: {
    Nav, DataAll, ToDay, Footer
  },
  created: function () {
      axios.get('https://pomber.github.io/covid19/timeseries.json')
              .then( r => {
                this.data = r.data.Ukraine
                // console.log(r.data)
              });
  }
}
</script>
<style>
  html, #app{
    background: #202020;
    color: #DDDDDD;
  }
  .bg-c{
    background: #333333;
  }

</style>
