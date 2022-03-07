<template>
  <img alt="Blockbuster logo" src="./assets/blockbuster-logo.png" />
  <div>
    <input v-model="movieTitle" placeholder="Movie Title" />
    <input v-model="movieFormat" placeholder="Format (VHS, DVD, etc.)" />
    <input v-model="movieLength" placeholder="Length (in minutes)" />
    <input v-model="movieReleaseYear" placeholder="Release Year" />
    <input v-model="movieRating" placeholder="Rating" />
  </div>
  <div>
    <button v-on:click="postMovieData">Add Movie</button>
  </div>
  <div>
    <a v-show="urlGenerated" :href='this.longUrl'>{{this.urlData.shortUrl}}</a>
  </div>
</template>

<script>

// let urlObject = {};
const url = `${process.env.VUE_APP_ENDPOINT}`;
const testData = {
  "title": "Anchorman",
  "year": "2003",
  "format": "DVD",
  "length": 120,
  "rating": 4
};

async function addMovie(){
      // Simple POST request with a JSON body using fetch
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin' : '*',
          'x-api-key' : 'z7FuNKC3WB9NO8QdDeyk3aFLd8hH2L7m7SWszyui'
        },
        body: JSON.stringify(testData)
      };
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => (this.postId = data.id));
      console.log("test");
      // const response = await fetch(url, {
      //   method: 'POST',
      //   mode: 'cors',
      //   headers: {
      //     'Content-Type' : 'application/json',
      //     'Access-Control-Allow-Origin' : '*',
      //     'x-api-key' : 'z7FuNKC3WB9NO8QdDeyk3aFLd8hH2L7m7SWszyui'
      //   },
      //   body: JSON.stringify(data)
      // });
      // return response.json();
    }

/**
 * @desc Connects with the API that converts the long URL into a randomly generated short link
 * @param String Input of the long URL
 * @return String Object with the long URL and short link
 */
// async function getLink(url) {
//   const apiUrl = `${process.env.VUE_APP_ENDPOINT}longUrl?longUrl=${url}`;
//   await fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       urlObject = data;
//     });

//   return urlObject;
// }

export default {
  name: "App",

  data() {
    return {urlGenerated: false, urlData: {}, urlShort: "", urlLong: ""}
  },


  methods: {
    /**
     * @desc Error checking and setting the short link to show
     */

    async postMovieData() {
      const data = await addMovie(testData)
      console.log(data);
    }
    // async getLinkData() {
    //   const data = await getLink(this.longUrl);
    //   this.urlData = data;
    //   this.urlShort = data.shortUrl;
    //   this.longUrl = data.longUrl;

    //   if(!this.longUrl.includes('.com') || !this.longUrl.includes('.com') || !this.longUrl.includes('.com')) {
    //     alert('Please input a valid url');
    //     this.urlGenerated = false;
    //     return
    //   }

    //   if(!this.longUrl.includes('http')) {
    //     this.longUrl = `https://${this.longUrl}`;
    //     this.urlGenerated = true;
    //   }
    // },
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
