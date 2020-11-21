<script>
import Icon from '@/components/svg/icon'

export default {
  name: 'DashboardIndex',
  components: { Icon },
  data: () => ({})
}
</script>

<template>
 <div>
   <div class="row col-6">
     <div class="m-cardDashboard">
       <div class="m-cardDashboard_icon">
         <icon name="ic-panel" class="m-icon m-icon--sm"></icon>
       </div>
       <div class="m-cardDashboard_title">Consultas</div>
       <div class="m-cardDashboard_description">25.315</div>
     </div>
     <div class="m-cardDashboard">
       <div class="m-cardDashboard_icon">
         <icon name="ic-panel" class="m-icon m-icon--sm"></icon>
       </div>
       <div class="m-cardDashboard_title">Pacientes</div>
       <div class="m-cardDashboard_description">1.915</div>
     </div>
   </div>
 </div>
</template>

<style lang="scss">
  @import '../../../../assets/scss/utilities/_all';

  .m-cardDashboard {
    position: relative;
    font: {
      size: $font-rem--sm;
      weight: normal;
    }
    @extend %rounded-corners;
    padding: pxToRem(20);
    min-height: pxToRem(120);
    box-shadow: 0 pxToRem(2) pxToRem(2) 0 rgba($color-dark-01, .15);
    width: 100%;

    display: grid;

    &_icon {
      position: absolute;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: pxToRem(12);
      text-align: center;
      border-radius: 50%;
      right: pxToRem(20);
      background: $color-warning;
    }

    &_title {
      color: $color-primary;
      font-weight: 500;
    }
    &_description {
      color: $color-gray;
    }
  }
</style>
