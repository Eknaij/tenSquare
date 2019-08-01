<template>
<div>
  <header class="head-login"> 
   <div class="wrapper"> 
    <div class="sui-navbar"> 
     <div class="navbar-inner"> 
      <a href="~/assets/index-login.html" class="sui-brand"> <img src="~/assets/img/asset-logo-black.png" alt="社交" /> </a> 
      <span class="login-text">| 登录注册</span> 
     </div> 
    </div> 
   </div>
  </header> 
  <div class="wrapper loginsign"> 
   <div class="item signup"> 
    <div class="form"> 
     <h3 class="loginsign-title">注册新账号</h3> 
     <form class="sui-form"> 
      <div class="control-group"> 
       <label for="inputname" class="control-label">名字</label> 
			 <div class="control-group">
				<label for="inputname" class="control-label">登录名</label>
				<div class="controls">
				<input type="text" id="inputname" v-model="pojo.loginname" placeholder="登录名" class="input-xlarge" required/>
				</div>
			</div>
       <div class="controls"> 
        <input type="text" id="inputname" v-model="pojo.nickname" placeholder="真实姓名或常用昵称" class="input-xlarge" required /> 
       </div> 
      </div> 
      <div class="different"> 
       <div class="radio-content"> 
        <div id="a1" class="phone"> 
         <div class="control-group number"> 
          <input type="text" v-model="pojo.mobile" placeholder="仅支持大陆手机号" class="input-xlarge" data-rules="required|mobile"/> 
         </div> 
         <div class="control-group code"> 
          <div class="input-append"> 
           <input id="appendedInputButton" type="text" placeholder="短信验证" class="span2 input-large msg-input" v-model="code" required /> 
           <button type="button" class="sui-btn msg-btn" @click="sendsms">获取验证码</button> 
          </div> 
         </div> 
         <div class="control-group"> 
          <label for="inputpassword" class="control-label">密码</label> 
          <div class="controls"> 
           <input type="text" id="inputpassword" placeholder="请输入6-16位密码" class="input-xlarge" v-model="pojo.password" required/> 
          </div> 
         </div> 
        </div> 
       </div> 
      </div> 
      <div class="control-group btn-signup"> 
       <label class="control-label"></label> 
       <div class="controls"> 
        <label> <input type="checkbox" v-model="checked"/><span class="type-text" style="font-size:12px;" required>同意协议并接受《服务条款》</span> </label> 
        <button type="button" class="sui-btn btn-danger btn-yes" @click="userRegister()" >注 册</button> 
       </div> 
      </div> 
     </form> 
    </div> 
   </div> 
   <div class="item"> 
    <div class="form"> 
     <h3 class="loginsign-title">用户登录</h3> 
     <form class="sui-form login-form"> 
      <div class="control-group"> 
       <label for="inputname" class="control-label" >手机号：</label> 
       <div class="controls"> 
        <input type="text" id="inputname" placeholder="11位手机号" class="input-xlarge" data-rules="required" v-model="mobile" /> 
       </div> 
      </div> 
      <div class="control-group"> 
       <label for="inputpassword" class="control-label">密码：</label> 
       <div class="controls"> 
        <input type="text" id="inputpassword" placeholder="输入登录密码" class="input-xlarge" v-model="password" /> 
       </div> 
      </div> 
      <div class="controls"> 
       <label> <input type="checkbox" name="remember-me" /><span class="type-text" style="font-size:12px;">记住登录状态</span> </label> 
       <button type="button" class="sui-btn btn-danger btn-yes" @click="userLogin()">登 录</button> 
      </div> 
      <div class="other-methods"> 
      </div> 
     </form> 
    </div> 
   </div> 
  </div>   
</div>
</template>

<script>
import '~/assets/css/page-sj-person-loginsign.css'
import userApi from '@/api/user'
import { setUser } from '@/utils/auth'
export default {
	data(){
		return {
			pojo: {},
			code:'',
			mobile: '',
			password: '',
			checked: true
		}
	},
	methods: {
		sendsms(){
			if(this.pojo.mobile==null||this.pojo.mobile==""){
				this.$message({
						message: '请填写正确的手机号',
						type: 'error'
					})
			}else{
				userApi.sendsms( this.pojo.mobile ).then(res => {
				this.$message({
					message: res.data.message,
					type: (res.data.flag?'success':'error')
				})
			})
			}
		},
		userRegister() {
			if(this.code==null||this.code==""||this.pojo==null||this.pojo==""){
				this.$message({
						message: '登录名、昵称、手机号、验证码、密码不能为空',
						type: 'error'
					})
			}
			else if(this.checked){
				userApi.register(this.pojo,this.code).then( res =>{
					if(res.data.flag){
						this.$message({
							message: '注册成功',
							type: 'success'
						})
						this.pojo={}
					}else{
						this.$message({
							message: '注册出错',
							type: 'error'
						})
					}
				})
			}
			else{
				this.$message({
						message: '请同意服务条款',
						type: 'error'
					})
			}
		},
		userLogin(){
			if(this.mobile==null||this.password==null||this.mobile==""||this.password==""){
				this.$message({
						message: '请输入用户名和密码',
						type: 'error'
					})
			}else{
				userApi.login(this.mobile,this.password).then( res=> {
				if(res.data.flag){
					//保存用户信息
					setUser(res.data.data.token, res.data.data.name,res.data.data.avatar)
					location.href='/manager' //用户中心
				}else{
					this.$message( {
						message: res.data.message,
						type: "error"
					})
					this.mobile=''
					this.password=''
				}
			})
			}
		}
	}
} 
</script>
