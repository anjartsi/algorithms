<template lang='pug'>
  div.row
    div.col-xs-1
      h5(:style='{color: this.$parent.colors[i]}') {{isGender}}
        sub {{i}}
    div(
      @mouseup='dragStop'
      @mouseleave='dragStop'
      ).col-xs-11#boxContainer
      preference-box(
        v-for='j in n'
        :isGender='isGender' 
        :likesGender='likesGender'
        :n='n'
        :j='j'
        :key='j'
        :preference-box='PreferenceListRow[j-1]'
        v-on:boxMouseDown='dragStart'
        v-on:boxMouseUp='dragStop'
        v-on:boxMouseEnter='dragCommence'
        v-on:boxMouseLeave=''
        )
</template>

<script>
  import PreferenceBox from './PreferenceBox'
  export default {
    components: {
      PreferenceBox
    },
    // end components
    props: [
      'PreferenceListRow',
      'isGender',
      'likesGender',
      'n',
      'i'
    ],
    // end props
    data () {
      return {
        dragging: false,
        boxToDrag: null
      }
    },
    // end data
    methods: {
      dragStart (j) {
        this.dragging = true
        this.boxToDrag = j
      },
      dragCommence (j) {
        if (this.dragging) {
          this.reorder(this.boxToDrag, j)
          this.boxToDrag = j
        }
      },
      dragStop (event) {
        this.dragging = false
        this.boxToDrag = null
      },
      reorder (j1, j2) {
        this.$emit('reorderBoxes', this.isGender, this.i - 1, j1 - 1, j2 - 1)
      }
    }
  }
</script>

<style scoped>
  div.row {
    border-bottom: 1px solid black;
    -webkit-user-select: none;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  #boxContainer {
    height: 4em;
  }
  h5 {
    font-weight: bold;
    height: 100%;
    line-height: 2em;
    white-space: nowrap;
  }
</style>