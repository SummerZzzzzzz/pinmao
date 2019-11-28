<template>
	<div class="containe">
		<!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="1">处理中心</el-menu-item>
		</el-menu> -->
		<el-dialog :modal="modal" :close-on-click-modal="closeonclickmodal" title="登录管理" :visible.sync="dialogFormVisible">
			<el-form :model="user">
				<el-form-item>
					<el-input placeholder="请输入用户名" v-model="user.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input show-password placeholder="请输入密码" v-model="user.password" autocomplete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				{{message}}
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="login()">确 定</el-button>

			</div>
		</el-dialog>


	</div>

</template>

<script>
	export default {
		name: "login",
		data: function() {
			return {
				modal: false,
				dialogFormVisible: true,
				closeonclickmodal: false,
				user: {
					username: 'admin',
					password: '123456',
				},
				message: ''
			}
		},
		methods: {
			login: function() {
				this.$http.post(this.$urls.adminlogin, {
						user: JSON.stringify(this.user)
					}, (result) => {
						console.log(result)
						if (result.data.code == 500) {
							this.message = result.data.message
						} else { //成功跳转
							console.log("result.data")
							console.log(result.data);
							this.$store.username = this.user.username;
							// this.$Token = result.data.ob.token;
							
							//將token放入緩存中
							sessionStorage.setItem("token",result.data.ob.token);
							//將username放入缓存中
							sessionStorage.setItem("username",this.user.username)
							
							this.$http.setToken(result.data.ob.token); //通过该方法传给axios，再传到后台
							window.location.href = "/#/admin"

						}
					}

				);

			}
		}
	}
</script>

<style>
	.containe {
		height: 100%;
		background: url("../../assets/adminloginbg.jpeg");
		background-repeat: no-repeat;
		background-size: 100% 100%;

	}

	.el-dialog {
		width: 800px;
		/* margin-left:70%; */
	}

	.el-input {
		display: flex;
		justify-content: center;
	}

	.el-icon-close {
		display: none;
	}
	.containe .el-dialog{
		width: 400px;
		margin-left:70%;
	}
</style>
