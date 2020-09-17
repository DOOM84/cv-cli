<template>
  <div>
  <section class="pt-120 pb-115" id='about'>
        <div class="container">
          <div class="section-title text-center">
            <h2>{{ $getLang('about') }}</h2>
          </div>
          <!--<h2 class="text-center heading">ABOUT</h2>-->
          <div class="row pb-5" >
            <div class="col-lg-6 contact_grid_right" >
           <p>
             {{ $getLang('about_work') }}
          </p>
            </div>
            <div class="col-lg-6 " >
              <div class="row" ><div class="col-lg-12 " >
                <ul class="list-unstyled" >
                  <li >
                    <div class="row" >
              <div class="col-4" >
                <span>{{ $getLang('city_country') }}</span>
              </div>
                    <div class="col-8" >
                      <span>{{ $getLang('city_country_name') }}</span>
                    </div>
                    </div>
                  </li>
                  <li class="mt-1" ><div class="row" ><div class="col-4" >
                    <span >{{ $getLang('age') }}:</span></div>
                    <div class="col-8" >
                      <span>{{age}}</span>
                    </div></div></li>
                  <li class="mt-1" >
                    <div class="row" >
                      <div class="col-4" >
                        <span >{{ $getLang('languages') }}:</span></div>
                      <div class="col-8" ><span>
                        {{ $getLang('langs') }}
                      </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              </div>
            </div>
            </div>
          <div class="row  h-100">
            <div class="col-md-12  h-100">
              <div class="main-timeline4 h-100">
                <div class="timeline h-100" v-for="training in trainings" :key="training.id">
                  <a href="#" class="timeline-content">
                    <span class="year">{{training['year']}}</span>
                    <div class="inner-content">
                      <h3 class="title">{{training[$toLang('name')]}}</h3>
                      <p class="description">
                        {{training[$toLang('description')]}}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
  </section>
  </div>
</template>

<script>
  export default {
    name: "About",
    props: ['trainings', 'age'],
    data() {
      return {
      }
    },
  }
</script>

<style scoped>

</style>
