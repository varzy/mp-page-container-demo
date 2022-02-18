Component({
  data: {

  },

  methods: {
    onLoad() {
      this.refPostFab = this.selectComponent('#post_fab');
    },

    onPublish() {
      this.refPostFab.active();
    }
  }
})
