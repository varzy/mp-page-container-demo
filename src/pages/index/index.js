Component({
  data: {},

  methods: {
    onLoad() {
      this.refPostFab = this.selectComponent('#post_fab');
    },

    onPublish() {
      this.refPostFab.active();
    },
    handlePostFabReadied() {
      console.log('Index: Page Container Readied');
    },
    handlePostFabPublished() {
      console.log('Index: Page Container Published');
    },
    handlePostFabClosed() {
      console.log('Index: Page Container Closed');
    },
  },
});
