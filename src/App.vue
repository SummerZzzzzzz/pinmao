<template>
	<div id="app">
		<!--admin/shop -->
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	html {
		font-size: 10px;
	}

	html,
	body,
	#app,
	.el-container {
		height: 100%;
	}

	a {
		text-decoration: none;
		-webkit-tap-highlight-color: transparent;
		color: black;
	}
	

	ul {
		list-style: none;
	}
	
	element.style{
    height:1800vh !important;
	}
</style>
