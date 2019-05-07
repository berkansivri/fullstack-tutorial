<template>
  <div id="app">
    <img width="50" alt="Vue logo" src="./assets/logo.png">
    <br />
    <p>{{hello}}</p>
    <div role="group">
      <button type="button" @click="getLaunches">Get Launches</button>
      <button type="button">Get Launch By Id</button>
      <button type="button">Me</button>
    </div>
    <p v-for="launch in launches">{{launch.site}}</p>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "app",
  data() {
    return {
      launch: {},
      launches: {}
    };
  },
  methods: {
    getLaunches() {
      console.log("get");
      var data = this.$apollo.query({
        query: gql`
          query {
            launches {
              site
            }
          }
        `
      });
      console.log(data.then(val => {console.log(val)}));
      // console.log(data);
    }
  },
  apollo: {
    hello: gql`
      query {
        hello
      }
    `,
    launch: gql`
      query {
        launch(id: 1) {
          site
        }
      }
    `, 
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
