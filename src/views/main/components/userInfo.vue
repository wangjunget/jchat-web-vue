<template>
  <el-dialog :visible.sync="_isShowUserInfo" width="320px" class="self-info">
    <div class="self-info-container modal-content clearfix">
      <span class="modal-close"></span>
      <span class="self-info-more"></span>
      <!-- <info-menu-component [hidden]="!infoMenu.show" [menu]="infoMenu" (selectMenuItem)="selectMenuItemEmit($event)"></info-menu-component> -->
      <div class="self-info-avatar">
        <div class="self-info-show-avatar">
          <img :src="selfInfo.avatarUrl" avatarLoad alt="" />
        </div>
        <!-- <div [hidden]="!isEdit">
                <label for="selfAvatarInput" [ngClass]="{'camera-shadow': cameraShadow}">
                    <img  alt="">
                </label>
            </div> -->
        <!-- <input spellcheck="false" (change)="selfAvatarChange()" type="file" id="selfAvatarInput" #selfAvatarInput style="display:none;"> -->
        <p
          class="self-info-avatar-username"
          :title="selfInfo.nickname ? selfInfo.nickname : selfInfo.username"
        >
          {{ selfInfo.nickname ? selfInfo.nickname : selfInfo.username }}
        </p>
        <div class="self-info-signature">
          <!-- <input spellcheck="false" maxlength="30" [ngModel]="selfInfo.info.signature" (change)="signatureChange($event)" class="self-info-input input-focus" [hidden]="!isEdit" spellcheck="false" type="text" placeholder="输入个性签名"> -->
          <!-- <p [hidden]="isEdit" [title]="selfInfo.info.signature ? selfInfo.info.signature : '暂无签名'">{{selfInfo.signature ? (selfInfo.signature | ellipsis: 32) : '暂无签名'}}</p> -->
        </div>
      </div>
      <p class="self-info-p display-flex">
        <span class="self-info-fixed-width">用户名：</span>
        <!-- <span class="flex-1" [ngClass]="{'gray': isEdit}">{{selfInfo.username}}</span> -->
      </p>
      <p class="self-info-p display-flex">
        <span class="self-info-fixed-width">昵&ensp;&ensp;称：</span>
        <span hidden="isEdit" class="flex-1">{{
          selfInfo.nickname ? selfInfo.nickname : "无"
        }}</span>
        <!-- <input spellcheck="false" class="self-info-input input-focus" (change)="nicknameChange($event)" [hidden]="!isEdit" type="text" spellcheck="false" [ngModel]="selfInfo.info.nickname"> -->
      </p>
      <p class="self-info-p display-flex">
        <span class="self-info-fixed-width">性&ensp;&ensp;别：</span>
        <span hidden="isEdit" class="flex-1">{{
          selfInfo.gender === 0 ? "保密" : selfInfo.gender === 1 ? "男" : "女"
        }}</span>
        <!-- <select-component *ngIf="isEdit" [selectList]="sexList"></select-component> -->
      </p>
      <p class="self-info-p display-flex">
        <span class="self-info-fixed-width">地&ensp;&ensp;区：</span>
        <span hidden="isEdit" class="flex-1">{{
          selfInfo.region ? selfInfo.region : "无"
        }}</span>
        <!-- <input spellcheck="false" class="self-info-input input-focus" (change)="regionChange($event)" [hidden]="!isEdit" type="text" spellcheck="false" [ngModel]="selfInfo.info.region"> -->
      </p>
      <!-- <p class="modal-btn clearfix">
            <button [hidden]="isEdit" type="button" class="self-info-edit-btn btn-white" (click)="toEdit()">编辑</button>
            <button [hidden]="!isEdit" type="button" class="btn-cancel btn-white float-left" (click)="selfCancel()">取消</button>
            <button [hidden]="!isEdit" type="button" [ngClass]="{'loading': selfInfo.loading}" class="btn-confirm btn-active float-right" (click)="selfConfirm()">保存</button>
        </p> -->
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'userInfo',
  props: {
    isShowUserInfo: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      selfInfo: state => state.main.selfInfo
    }),
    _isShowUserInfo: {
      get () {
        return this.isShowUserInfo
      },
      set (value) {
        this.$emit('update:isShowUserInfo', value)
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.self-info-container {
  width: 320px;
  overflow: hidden;
  -webkit-box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  padding: 0 30px;
  color: #808080;
  .modal-close {
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    background-position: 9px 17px;
    &:hover {
      background: #eb424c url(../../../assets/images/modal-close-active.svg) 9px
        17px no-repeat;
    }
  }
  .self-info-more {
    position: absolute;
    top: 0;
    right: 40px;
    display: block;
    width: 40px;
    height: 40px;
    background: url(../../../assets/images/drop-down.svg) 11px 16px no-repeat;
    cursor: pointer;
    &:hover {
      background-color: #f3f7fb;
    }
  }
  .self-info-avatar {
    padding: 52px 0 19px 0;
    margin-bottom: 14px;
    text-align: center;
    border-bottom: 1px solid #e3e6eb;
    img {
      width: 100%;
    }
    .self-info-show-avatar {
      width: 60px;
      height: 60px;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
    }
    label {
      display: block;
      width: 60px;
      height: 60px;
      margin: 0 auto;
      position: relative;
      cursor: pointer;
      overflow: hidden;
      &:hover:after,
      &.camera-shadow:after {
        content: "";
        display: block;
        width: 24px;
        height: 19px;
        position: absolute;
        top: 0;
        left: 0;
        background: url(../../../assets/images/camera.svg) center center
          no-repeat;
        margin: 20px 0 0 18px;
      }
      &:hover:before,
      &.camera-shadow:before {
        content: "";
        display: block;
        width: 24px;
        height: 19px;
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
      }
    }
    .self-info-avatar-username {
      line-height: 26px;
      margin: 12px 0 6px;
      font-size: 18px;
      color: #0b1816;
      text-align: center;
    }
    .self-info-signature {
      line-height: 26px;
      font-size: 14px;
      input {
        width: 100%;
        height: 100%;
        border: 1px solid #e3e6eb;
        border-radius: 2px;
        font-size: 14px;
        padding-left: 12px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
    }
  }
  .self-info-p {
    line-height: 26px;
    margin-bottom: 12px;
    color: #808080;
    font-size: 14px;
    .self-info-fixed-width {
      width: 56px;
      text-align: justify;
    }
    .flex-1 {
      color: #000c0a;
      margin-left: 12px;
    }
    .flex-1.gray {
      color: #808080;
    }
    input {
      border: 1px solid #e3e6eb;
      border-radius: 2px;
      width: 160px;
      height: 26px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding-left: 12px;
      font-size: 14px;
      color: #000c0a;
    }
  }
  .modal-btn {
    margin: 25px 0 33px 0;
    .btn-cancel {
      width: 120px;
      margin: 0;
    }
    .btn-confirm {
      width: 120px;
      margin: 0;
      position: relative;
      &.loading:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
        background: url(../../../assets/images/message-loading.gif) center
          center no-repeat;
        background-size: 20px;
      }
    }
  }
  .self-info-edit-btn {
    width: 260px;
  }
}
</style>

<style lang="scss">
.self-info {
  .el-dialog {
    .el-dialog__body {
      padding: 0;
    }
    .el-dialog__header {
      display: none;
    }
  }
}
</style>
