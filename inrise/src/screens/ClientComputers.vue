<template>
  <div className="flex flex-row">
    <HomeContentView>
      <HomeMenu></HomeMenu>
      <HeaderRectangles></HeaderRectangles>
      <p style="white-space: nowrap" className="text-3xl font-normal">
        Customize o computador do seu jeito <br> e a InRise monta e leva até você!
      </p>
      <HomeSteps></HomeSteps>
      <HomeLargeButton></HomeLargeButton>
      <div @click="goToPrebuilts">
        <HomeTextHeader text="Ver computadores prontos"></HomeTextHeader>
      </div>

    </HomeContentView>
    <HomeImageView></HomeImageView>
  </div>
</template>

<script>
import HomeContentView from '../components/HomeContentView.vue';
import HomeMenu from '../components/HomeMenu.vue';
import HeaderRectangles from '../components/HeaderRectangles.vue';
import HomeSteps from '../components/HomeSteps.vue';
import HomeLargeButton from '../components/HomeLargeButton.vue';
import HomeTextHeader from '../components/HomeTextHeader.vue';
import HomeImageView from '../components/HomeImageView.vue';

export default {
  name: 'ClientComputers',
  components: {
    HomeContentView,
    HomeMenu,
    HeaderRectangles,
    HomeSteps,
    HomeLargeButton,
    HomeTextHeader,
    HomeImageView
  },
  methods: {
    goToPrebuilts() {
      this.$router.push({ name: 'ClientPcPrebuiltPicker' });
    }
  }
}
</script>

<style scoped></style>