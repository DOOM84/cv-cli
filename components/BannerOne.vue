<template>
  <div class="banner-area-inner">
    <div class="banner-inner-area banner-area1">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-8 col-lg-6 col-xl-3 offset-xl-2 order-xl-0 order-lg-0  order-1">
                    <!-- banner text -->
                    <div class="banner-text-inner">

                        <h4 class="text-white">{{$getLang('me')}}</h4>
                        <p class="text-white">{{$getLang('sphere')}}</p>
                    </div>
                    <!-- banner text -->
                </div>
                <div class="col-lg-5 offset-lg-1 col-md-4 text-center order-xl-1 order-lg-1   order-0">
                    <!-- banner image-->
                    <div>
                        <img style="border-radius: 50%;" src="/assets/img/banner/hero.jpg" alt="">
                    </div>
                    <!--End of banner image-->
                </div>
            </div>
        </div>
    </div>
      </div>
</template>

<script>
    export default {
        name: "BannerOne"
    }
</script>

<style scoped>

</style>
