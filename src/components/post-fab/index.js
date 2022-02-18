Component({
  properties: {
  },

  data: {
    isPageContainerVisible: false,
    isPageContainerRealClose: false,
  },

  methods: {
    /**
     * 外部方法
     */
    active() {
      this.onTapFab();
    },

    /**
     * 内部方法
     */
    onTapFab() {
      this.triggerEvent('ready-publish');
      this.setData({ isPageContainerVisible: true });
    },
    realClosePageContainer() {
      this.setData({ isPageContainerRealClose: true, isPageContainerVisible: false });
    },
    async askSaveDraft() {
            // 如果内容为空，则不保存，直接关闭
            if (this.isFormEmpty()) {
              this.realClosePublisher();
              return;
            }

try {
  await wxp.showModal({
    message: '是否要保存草稿？'
  });

  wx.setStorageSync();
  this.realClosePublisher();
  wx.showToast({ title: '草稿保存成功' });
} catch {
  this.realClosePublisher();
}
    },

    /**
     * page-container 生命周期
     */
    onPageContainerBeforeEnter(e) {
      console.log(e);
    },
    onPageContainerEnter(e) {
      console.log(e);
    },
    onPageContainerAfterEnter(e) {
      console.log(e);
    },
    async onPageContainerBeforeLeave(e) {
      console.log(e);

      if (this.data.isPageContainerRealClose) {
        this.triggerEvent('close-publisher');
        return;
      }

      // 保持打开
      this.setData({ isPageContainerVisible: true });

      // 问询保存草稿
      this.askSaveDraft();
    },
    onPageContainerLeave(e) {
      console.log(e);
    },
    // 离开后重置 Publisher 内容
    onPageContainerAfterLeave(e) {
      console.log(e);

      if (this.data.isPageContainerRealClose)  {
        this.setData({ isPageContainerRealClose: false });
      }
    },
  }
})
