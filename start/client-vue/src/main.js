import Vue from "vue";
import App from "./App.vue";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import VueApollo from 'vue-apollo'

Vue.config.productionTip = false;

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/"
});
const apolloClient = new ApolloClient({
  cache,
  link
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
