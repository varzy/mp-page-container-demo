const asyncTimeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const DRAFT_KEY = 'post:draft';

Component({
  properties: {},

  data: {
    isPageContainerVisible: false,
    isPageContainerRealClose: false,
    form: { content: '' },
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

      if (wx.getStorageSync(DRAFT_KEY)) this.loadDraftFromStorage();
    },
    loadDraftFromStorage() {
      try {
        const draft = JSON.parse(wx.getStorageSync(DRAFT_KEY));
        this.setData({ 'form.content': draft.content || '' });
      } catch (e) {
        wx.showToast({ title: '草稿恢复失败！', icon: 'none' });
        this.resetForm();
      }
    },
    realClosePageContainer() {
      this.setData({ isPageContainerRealClose: true, isPageContainerVisible: false });
    },
    resetForm() {
      this.setData({ 'form.content': '' });
    },
    realClose() {
      this.setData({ isPageContainerRealClose: true, isPageContainerVisible: false });
    },
    onContentInput(e) {
      this.setData({ 'form.content': e.detail.value });
    },
    async onPublish() {
      wx.showLoading({ title: '提交中' });
      await asyncTimeout(1000);
      wx.showToast({ title: '提交成功' });

      this.triggerEvent('published');

      this.realClosePageContainer();
    },
    onClose() {
      this.askSaveDraft();
    },
    async askSaveDraft() {
      // 如果内容为空，则不保存，直接关闭
      if (!this.data.form.content.trim()) {
        this.realClose();
        return;
      }

      const res = await wx.showModal({ content: '是否要保存草稿？' });

      if (res.confirm) {
        wx.setStorageSync(DRAFT_KEY, JSON.stringify({ ...this.data.form }));
        wx.showToast({ title: '草稿保存成功' });
      } else {
        wx.removeStorageSync(DRAFT_KEY);
      }

      this.realClose();
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

      if (this.data.isPageContainerRealClose) {
        this.setData({ isPageContainerRealClose: false });
        this.resetForm();
      }
    },
  },
});
