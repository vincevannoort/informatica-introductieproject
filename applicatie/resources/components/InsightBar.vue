<template>
  <box :title="'Insight'">
    <div class="columns">
      <div class="relation-insight-sidebox-list column">
        <ul>
          <li>Strongly supportive</li>
          <li>Supportive</li>
          <li>Interested</li>
          <li>Will go along</li>
          <li>Neutral</li>
          <li>Probably won't resist</li>
          <li>Uninterested</li>
          <li>Negative</li>
          <li>Very negative</li>
        </ul>
      </div>
      <div class="relation-insight-sidebox-bar column">
        <div class="relation-insight">
          <div class="relation-insight-bar" :style="{ height: (insight/10) + '%' }" />
        </div>
      </div>
    </div>
  </box>
</template>

<script>
export default {
  props: {
    insight: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss">
  .relation-insight-sidebox-bar {
    display: flex;
    justify-content: flex-end;
  }

  .relation-insight-sidebox-list {
    display: flex;
    font-size: 13px;
    > ul {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
  }
</style>

