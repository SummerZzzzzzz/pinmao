const axios = require('axios');
//const system = require('system')
import system from "./System.js"
const Qs = require('qs');
var token = "";
axios.defaults.baseURL = '/pinmaoserver'
var http = {
	upload:axios.defaults.baseURL ="/order",
	// base: axios.defaults.baseURL,
	get: function(url, params, fun) {
		if (url.indexOf(".do") != -1) {
			axios.defaults.baseURL = '/video'
		}else{
			axios.defaults.baseURL = '/pinmaoserver'
		}
		if (token == null || token == "")
			token = sessionStorage.getItem("token");
		Object.assign(params, {
			token: token
		});
		axios.get(url, {
				params: params
			})
			.then(function(response) {
				if (response.data.message == 400) {
					window.location.href = "/#/adminlogin"
					return;
				}
				fun(response);
			})
			.catch((error) => {
				console.log(error);
				system.notice.message('操作失败/网络异常', 'error');
				//调用dialog
			})
			.then(function() {
				//调用dialog
			});
	},

	post: function(url, params, fun) {
		
		if (token == null || token == "")
			token = sessionStorage.getItem("token");
		Object.assign(params, {
			token: token
		});
		var theparams =  Qs.stringify(params);
		if (url.indexOf(".do") != -1) {
			axios.defaults.baseURL = '/video'
			theparams = JSON.stringify(params);
			axios.post(url, theparams,{headers:{'Content-Type':'application/json'}})
				.then(function(response) {
					if (response.data.message == 400) {
						window.location.href = "/#/adminlogin"
						return;
					}
					fun(response);
				})
				.catch((error) => {
					console.log(error);
					system.notice.message('操作失败/网络异常', 'error');
					//调用dialog
				})
				.then(function() {
					//调用dialog
				});
		}else{
			axios.defaults.baseURL = '/pinmaoserver',
			axios.post(url, theparams)
				.then(function(response) {
					if (response.data.message == 400) {
						window.location.href = "/#/adminlogin"
						return;
					}
					fun(response);
				})
				.catch((error) => {
					console.log(error);
					system.notice.message('操作失败/网络异常', 'error');
					//调用dialog
				})
				.then(function() {
					//调用dialog
				});
		}
		


	},
	setToken: function(itoken) {
		token = itoken;
	}
}
export default http;
