<template>
  <section id="more" class="ban_bottom1 py-5">
    <div class="container py-lg-5">
      <div class="ban_bottom_top text-left py-lg-5 text-white">
        <h1 class="tittle text-white">
          {{$getLang('quote')}}
        </h1>
        <h1 class="text-right tittle text-white">{{$getLang('quote_author')}} </h1>
      </div>
    </div>
  </section>
</template>

<script>

    export default {
      name: "Quote",
    }
</script>

<style scoped>

</style>
