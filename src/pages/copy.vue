<template>
  <div class="modal-email" transition="modal">
    <div class="modal-email-wrapper">
      <div class="modal-email-container">
          <div class="modal-email-title">
            <span>发送至邮箱</span>
            <span class="modal-email-close">X</span>
          </div>
          <div class="modal-email-content">
            <div class="modal-email-label">To:</div>
            <div class="modal-email-span" v-if="emailObj.length!=0">
              <i v-for="(item,index) in emailObj">
                <span  :class="[{'success-span':item.emailFlag==true},{'defeat-span':item.emailFlag==false}]"
                      v-if="item.emails !=''"  @click.stop="editEmail(item)" :id="index">{{item.emails}}</span>
                <div :name="index"  @click.stop="deleteEmail(index)">X</div>
              </i>
            </div>
            <div class="modal-email-input"><input type="email" v-model="email" @keyup.enter="emailVerify"/></div>
          </div>
          <div class="modal-email-btn">
            <button :class="[{'email-none-btn':disFlag==true},{'email-content-btn':disFlag==false}]"  type="button" :disabled="disFlag" @click="send">发送</button>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {find, findIndex} from 'lodash'
  import { quote, url, objectify, merge } from 'style-helper'
  Vue.use(find)
  Vue.use(quote)
  Vue.use(url)
  Vue.use(objectify)
  Vue.use(merge)
  Vue.use(findIndex)
  export default {
    components: {
    findIndex,
    find,
    quote,
    url,
    objectify,
    merge
    },
    computed: {},
    data () {
      return {email: '',
        emailObj: [],
        selIndex: '',
        oldIndex: '',
        emailFlag: false,
        disFlag: true
      }
    },
    methods: {
      emailVerify () {
        let filter = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        this.emailFlag = filter.test(this.email)
        if (this.email !== null) {
          this.emailObj.push({'emailFlag': this.emailFlag, 'emails': this.email})
        }
        this.email = ''
        let falseVal = find(this.emailObj, {'emailFlag': false})
        if (falseVal === undefined) {
          this.disFlag = false
        }
      },
      editEmail (item) {
        let index = findIndex(this.emailObj, {emails: item.emails})
        let newIndex = document.getElementById(index)
        let newColse = document.getElementsByName(index)[0]
        newIndex.style.color = '#ffffff'
        if (item.emailFlag === true) {
          newIndex.style.backgroundColor = '#3990d8'
          newColse.style.color = '#3990d8'
        } else {
          newIndex.style.backgroundColor = '#f56c6a'
          newColse.style.color = '#f56c6a'
        }

        if (this.selIndex !== '' || this.selIndex !== index) {
          newColse.style.display = 'block'
          this.selIndex = index
          if (this.oldIndex !== '') {
            let old = document.getElementById(this.oldIndex)
            document.getElementsByName(this.oldIndex)[0].style.display = 'none'
            old.style.backgroundColor = ''
            old.style.color = ''
          }
        }
      },
      deleteEmail (index) {
        if (index === this.oldIndex) {
          this.emailObj.splice(index, 1)
          this.selIndex = ''
          this.oldIndex = ''
          document.getElementsByName(index)[0].style.display = 'none'
          document.getElementById(index).style.backgroundColor = ''
          document.getElementById(index).style.color = ''
        }
        let falseVal = find(this.emailObj, {'emailFlag': false})
        if (falseVal === undefined) {
          this.disFlag = false
        }
      },
      send () {
        console.log(this.emailObj)
      }
    },
    watch: {
      selIndex (oldVal, newVal) {
        this.oldIndex = oldVal
      }
    },
    props: {
    }

  }

</script>

<style lang="scss">
    .modal-email {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .2);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-email-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-email-container{
    width: 90%;
    margin: 0px 5%;
    background-color: #ffffff;
    box-shadow: 0 px2rem(2px) px2rem(10px) 0 #787983;
    overflow: hidden;
  }
  .modal-email-title{
       height: px2rem(56px);
       line-height: px2rem(56px);
    border-bottom: solid 0.5px #e5e5e5;
     }
  .modal-email-title:first-child {
    font-size: 16px;
    color: #262833;
    padding: 0 0 0 35%;}
  .modal-email-close{
    padding: 0 0 0 43%;
    color: #262833;
  }
  .modal-email-content{
    margin: px2rem(35px) px2rem(30px) px2rem(0px) px2rem(30px);
    display: inline-block;
    overflow: hidden;
    border-bottom: solid 0.5px #787983;
    width: 84%;
  }
.modal-email-label{
  font-size: px2rem(14px);
  color: #bbbdbf;
  float: left;
  line-height: px2rem(30px);
}
.modal-email-span{
  float: left;
  width: 90%;
  margin-left: px2rem(5px);
  overflow: hidden;
  i{
    display: block;
    float: left;
    overflow: hidden;
  }
  span{    padding: px2rem(3px) px2rem(6px);
    border-radius: px2rem(2px) 0 0 px2rem(2px);
    display: block;
    float: left;
    margin-left: px2rem(4px);
    margin-bottom: px2rem(3px);
  }
  div{
    padding: px2rem(2px);
    display: none;
    margin-right: px2rem(2px);
    width: 20px;
    float: left;
    text-align: center;
    background:  #fff;
    border-radius:0 px2rem(2px)  px2rem(2px)  0;
    border: px2rem(.5px) solid;
    margin-bottom: px2rem(3px);
  }
}
  .modal-email-input {
    float: left;
    margin-left: px2rem(5px);
    input {
      height: px2rem(25px);
      width: px2rem(265px);
      border: 0px;
      outline: none;
      font-size: px2rem(14px);
    }
  }
  .modal-email-btn {
    width: 100%;
    text-align: center;
    margin: px2rem(32px) 0px px2rem(20px) 0px;
    button {
      margin: 0 auto;
      width: 85%;
      height: px2rem(40px);
      border-radius: px2rem(4px);
      color: #ffffff;
      border: 0;
      outline: none;
    }
  }
  .email-content-btn{
    background-color: #3990d8;
  }
  .email-none-btn{
    background-color: #bbbdbf;
  }
  .success-span{
    color:#3990d8;
    background-color: rgba(57, 143, 215, 0.2);
  }
  .defeat-span{
    color: #f46c6a;
    background-color: rgba(245,100,98,.2);
  }
</style>