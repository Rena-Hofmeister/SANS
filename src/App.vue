<template>
  <img alt="SI logo" src="./assets/siLogo.jpeg" />
  <div>
    <input v-model="longUrl" placeholder="Input URL" />
    <button v-on:click="getLinkData">Get Short Link</button>
  </div>
  <div>
    <a v-show="urlGenerated" :href='this.longUrl'>{{this.urlData.shortUrl}}</a>
  </div>
</template>

<script>

let urlObject = {};
/**
 * @desc Connects with the API that converts the long URL into a randomly generated short link
 * @param String Input of the long URL
 * @return String Object with the long URL and short link
 */
async function getLink(url) {
  const apiUrl = `${process.env.VUE_APP_ENDPOINT}longUrl?longUrl=${url}`;
  await fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      urlObject = data;
    });

  return urlObject;
}


export default {
  name: "App",
  data() {
    return {urlGenerated: false, urlData: {}, urlShort: "", urlLong: ""}
  },
  methods: {
    /**
     * @desc Error checking and setting the short link to show
     */
    async getLinkData() {
      const data = await getLink(this.longUrl);
      this.urlData = data;
      this.urlShort = data.shortUrl;
      this.longUrl = data.longUrl;

      if(!this.longUrl.includes('.com') || !this.longUrl.includes('.com') || !this.longUrl.includes('.com')) {
        alert('Please input a valid url');
        this.urlGenerated = false;
        return
      }

      if(!this.longUrl.includes('http')) {
        this.longUrl = `https://${this.longUrl}`;
        this.urlGenerated = true;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
