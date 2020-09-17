<template>
  <section class="bg-2 pt-120 pb-120" id='technologies'>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-title text-center">
              <h2>
                {{$getLang('technologies')}}
              </h2>
            </div>
            <div class="progress-outer" v-for="skill in skills">
              <span>
                {{skill[$toLang('name')]}}
              </span>
              <div class="progress">
                <div class="progress-bar progress-bar-striped active" :style="'width:'+skill.rate+'%; ' + skill.color"></div>
                <div class="progress-value">{{skill.rate}}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script>
    export default {
        name: "Technologies",
      props: ['skills']
    }
</script>

<style scoped>

</style>
