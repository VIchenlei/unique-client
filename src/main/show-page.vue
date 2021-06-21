<template>
  <div class="show-page">
    <header>
      <div class="show-head">
        <i></i>
        <span>通道编号：</span>
        <span>{{dataIndex}}</span>
      </div>
      <span>{{dataIndex>2?"出井信息识别":"入井信息识别"}}</span>
    </header>
    <page-success 
      ref="page-success"
      v-if="channelData.get(dataIndex)"
      :dataIndex="dataIndex"
      :cdata="showData">
    </page-success>
    <page-error 
      ref="page-error"
      v-if="!channelData.get(dataIndex)"
      :cdata="showData">
    </page-error>
  </div>
</template>
<script lang="ts">
import { mapState } from 'vuex';
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { PushChannelData } from '@/ts/utils/interfaceUtils';
import PageSuccess from '@/components/page-success.vue';
import PageError from '@/components/page-error.vue';

@Component({
  components: {
    PageSuccess,
    PageError,
  },
  computed: {
    ...mapState({
      channelData: (state: any) => state.channelData,
    }),
  },
})
export default class ShowPage extends Vue {
  @Prop() public dataIndex!: number;
  @Prop() public dataValue?: any;

  public channelData!: any;
  public showData: any = null;
  public channel: number = 1;

  @Watch('dataValue', { deep: true, immediate: true })
  public getDataValue(newVal: any, oldVal: any) {
    this.showData = newVal;
  }
}
</script>
<style lang="sass" scoped>
.show-page
  width: 100%
  height: 100%
  font-size: .16rem
  display: flex
  flex-direction: column
  header
    padding: .1rem
    display: flex
    flex: 0 0 .5rem
    align-items: center
    justify-content: space-between
    background: rgba(0, 153, 255, .4)
  .show-head
    i
      display: inline-block
      width: .24rem
      height: .24rem
      background: url('../assets/group.png') no-repeat center
      margin-right: .1rem
@media screen and (min-width:2160px)
  .show-page
    font-size: .3rem
</style>