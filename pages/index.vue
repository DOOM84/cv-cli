<template>
  <div>
    <BannerOne />
    <About :trainings="trainings" :age="age" />
    <Quote />
    <Technologies :skills="skills" />
    <Projects :projects="projects" />
    <BlogHome :posts="posts"/>
  </div>

</template>
<script>
  import BannerOne from "../components/BannerOne";
  import About from "../components/About";
  import Quote from "../components/Quote";
  import Technologies from "../components/Technologies";
  import Projects from "../components/Projects";
  import BlogHome from "../components/BlogHome";
  export default {
    head(){
      return {
        title: this.$getLang('sphere') + ' — ' + this.$getLang('welcome')+'!'
      }
    },
    data(){
      return {
        trainings: [],
        skills: [],
        age: '',
        projects: [],
        posts: [],
      }
    },
    components: {
      BlogHome,
      Projects,
      Technologies,
      Quote,
      About,
      BannerOne,
    },

    async asyncData({store}) {
      try {
        const {
          trainings, skills, age, projects, posts
        } = await store.dispatch('front/index');

        //console.log(trainings);

        return {
          trainings,
          skills,
          age,
          projects,
          posts,
        }
      } catch (err) {
        console.log(err.response);
        if(err.response.status === 404){
          //error({statusCode: 404, message: "Design not found"})
        }
      }
    }
  }
</script>
