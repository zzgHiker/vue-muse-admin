<template>
  <div class="login-box"
       @keyup.enter="doLogin">
    <div class="login-title">
      <h1>Log In</h1>
    </div>
    <div class="login-field">
      <mu-text-field label="User Name" v-model="username" labelFloat/>
    </div>
    <div class="login-field">
      <mu-text-field label="Password"
                     v-model="password"
                     :type="showPassword ? 'text' : 'password'"
                     labelFloat/>
    </div>
    <div class="login-buttons">
      <mu-raised-button label="Log In" primary
                        @click="doLogin"/>
      <mu-raised-button label="Sign Up" secondary
                        @click="doSignUp"/>
    </div>

    <mu-dialog :open="showLoading" dialogClass="loading">
      <mu-circular-progress :size="60"></mu-circular-progress>
    </mu-dialog>
    <mu-popup position="top" :overlay="false" :open="topPopup" popupClass="popup-top">
      <div :class="messageType">{{errorMessage}}</div>
    </mu-popup>
  </div>
</template>

<script>
  import {APP_ID} from '../config'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        showLoading: false,
        errorMessage: '',
        showPassword: false,
        topPopup: false,
        messageType: ''
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    watch: {
      topPopup(val) {
        if (val) {
          setTimeout(() => {
            this.topPopup = false
          }, 2000)
        }
      }
    },
    methods: {
      doLogin() {
        this.errorMessage = ''

        if (this.username && this.password) {
          this.showLoading = true
          this.$store.dispatch('login', {
            clientid: APP_ID,
            username: this.username,
            password: this.password
          }).then(() => {
            this.showLoading = false
            this.$router.push('/home')
          }).catch(error => {
            this.showLoading = false
            this.showMessage(error, 'error')
          })
        } else {
          this.showMessage('用户名／密码 不能为空', 'error')
        }
      },

      doSignUp() {
      },

      showMessage(msg, type) {
        this.errorMessage = msg
        this.messageType = type
        this.topPopup = true
      }
    }
  }
</script>
<style lang="less" type="text/less">
  .popup-top {
    width: 100%;
    opacity: .8;
    height: 48px;
    line-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 375px;
    background-color: #ececec;
    .error {
      color: red;
    }
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .login-box {
    max-width: 20rem;
    min-width: 10rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10rem;
    border: 1px solid lightgray;
    border-radius: 5px;
    text-align: center;
  }

  .login-buttons {
    margin: 10px 0;

    .mu-raised-button {
      margin: 0 10px;
    }
  }

</style>
