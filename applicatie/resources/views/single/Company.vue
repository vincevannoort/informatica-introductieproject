<template>
  <div>

    <main-view-title 
    :title="company.name" 
    :back="{ route: '/relations', name: 'relations'}"
    @edit="edit"
    @remove="remove"></main-view-title>

    <div class="columns">
      <div class="column is-10">
        <box-contacts 
        :title="'Contacts'" 
        :action="{ title: 'Add new contact', route: `/relations/${company.id}/contacts/create` }" 
        :contacts="company.contacts"></box-contacts>
      </div>
      <div class="column is-2">
        <box :title="'Insight'">
          <div class="columns">
            <div class="column">
              <ul class="relation-insight-list">
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
            <div class="column">
              <div class="relation-insight">
                <div class="relation-insight-bar" :style="{ height: company.insight_total + '%' }"></div>
              </div>
            </div>
          </div>
        </box>
      </div>
    </div>

    <box :title="'Proposals'">
    </box>

  </div>
</template>

<script>
  import Company from '../../controllers/CompanyController'

  export default {
    name: 'relation',
    data(){
      return {
        company: {}
      }
    },
    created() {
      this.show()
    },
    methods: {
      async show() {
        try {
          this.company = await Company.show({ id: this.$route.params.id })
        } catch(error) {
          console.error(error)
        }
      },
      async edit() {
        this.$router.push({ name: 'relations-edit', params: { id: this.$route.params.id } })
      },
      async remove() {
        try {
          await Company.destroy({ id: this.$route.params.id })
          this.$router.push({ name: 'relations-overview' })
        } catch(error) {
          console.error(error)
        }
      },
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables/colors";
  .relation-insight-list {
    font-size: 13px;
  }

  .relation-insight {
    display: inline-block;
    width: 12px;
    border-radius: 10px;
    height: 100%;
    background-color: darken($background-grey, 6%);
    display: flex;
    align-items: flex-end;
  }

  .relation-insight-bar {
    display: inline-block;
    float: left;
    width: 12px;
    border-radius: 10px;
    background: linear-gradient(to top, $red 0%,#ff0000 100%)
  }
</style>