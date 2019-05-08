<template>
  <div id="app">
    <img width="50" alt="Vue logo" src="./assets/logo.png">
    <br />
    <p>{{hello}}</p>
    <div role="group">
      <button type="button" @click="getLaunches">Get Launches</button>
      <v-popover popoverClass="popClass">
        <button>Get Launch By Id</button>
        <template slot="popover">
          <input class="tooltip-content" placeholder="Enter Id" v-model="launchId" />
          <button v-close-popover type="button" @click="getLaunch">Ok</button>
        </template>
      </v-popover>
    </div>
    <br>
    <table style="width:100%" v-if="launches.length > 0">
      <tr>
        <th v-for="head in headers" :key="head">{{head}}</th>
      </tr>
      <tr v-for="launch in launches" :key="launch.id">
        <td>{{launch.id}}</td>
        <td>{{launch.site}}</td>
        <td>{{launch.mission.name}}</td>
        <td>{{launch.rocket.name}}</td>
        <td>{{launch.isBooked}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {

  data() {
    return {
      launches: {},
      launch: {},
      headers: [],
      launchId: "",
    };
  },
  methods: {
    async getLaunches() {
      var response = await this.$apollo.query({
        query: gql`
          query {
            launches {
              id
              site
              mission {
                name
              }
              rocket {
                name
                type
              }
              isBooked
            }
          }
        `
      });
      this.headers = Object.getOwnPropertyNames(
        response.data.launches[0]
      ).filter(x => !x.includes("_"));
      this.launches = response.data.launches;
    },

    async getLaunch() {
      this.launches = [];
      var response = await this.$apollo.query({
        query: gql`
          query($id: ID!) {
            launch(id: $id) {
              id
              site
              mission {
                name
              }
              rocket {
                name
                type
              }
              isBooked
            }
          }
        `,
        variables: {
          id: this.launchId
        }
      });
      this.headers = Object.getOwnPropertyNames(response.data.launch).filter(
        x => !x.includes("_")
      );
      this.launches.push(response.data.launch);
    }, 
  },

  apollo: {
    hello: gql`
      query {
        hello
      }
    `
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
.v-popover {
  display: inline-block !important;
}
</style>
