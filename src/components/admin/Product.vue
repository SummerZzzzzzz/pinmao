<template>
	<div class="container">
		<!--商品dialog-->
		<!--传过来的参数要放在组件上边-->
		<productdialog :product="product" :dialogFormVisible="dialogFormVisible" v-on:submitDialog="submit($event)"
		 v-on:closeDialog="dialogFormVisible = $event"></productdialog>
		<el-button type="primary" @click="create()">创建</el-button>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column v-for="title in titles" fixed :prop="title.prop" :label="title.label" :width="title.width">
			</el-table-column>

			<el-table-column  label="操作" width="200">
				<template slot-scope="scope">
					<el-button @click="handleShow(scope.row)" type="text" size="small">查看</el-button>
					<el-button @click="handleDelete(scope.$index,scope.row)" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="page" background layout="prev, pager, next" @current-change="change" :total="total">
		</el-pagination>

	</div>
</template>

<script>
	import productdialog from "@/components/admin/ProductDialog"
	export default {
		name: "product",
		components: {
			productdialog
		},
		data: function() {
			return {
				total: 0,
				titles: [{
						prop: "productId",
						label: "商品Id",
						width: "500"
					},
					{
						prop: "productName",
						label: "商品名称",
						width: "500"
					},
					{
						prop: "productPrice",
						label: "商品价格",
						width: "500"
					}
				],
				tableData: [],
				dialogFormVisible: false,
				product: {
					productId: -1
				} //默认值是-1，-1才是插入
			}
		},
		mounted: function() {
			this.find(1);
		},
		methods: {
			//解决每次点击保留以前数据的bug
			create: function() {
				this.dialogFormVisible = true;
				this.product = {
					productId: "-1"
				}
			},
			//查看每页的数据
			find: function(page) {
				this.$http.get(this.$urls.findallproducts, {
					page: page,
					count: 10
				}, (response) => {
					if (response.data.code == '200') {
						//插入成功接收categoryId
						if (response.data.ob != null && response.data.ob != "") {
							this.tableData = response.data.ob.products;
							this.total = response.data.ob.total;
						}
						//this.$Notice.message(response.data.message,'success');
					} else {
						this.$Notice.message(response.data.message, 'error');
					}
				});
			},
			//实现分页
			change: function(page) {
				this.find(page);
			},
			//添加或更新
			submit: function(ob) {
				this.$http.get(this.$urls.insertproduct, {
					product: ob.product
				}, (response) => {
					if (response.data.code == '200') {
						this.dialogFormVisible = ob.ifClose; //插入成功之后，关闭弹出框
						//插入成功接收categoryId
						this.$Notice.message(response.data.message, 'success');
						if (ob.product.productId == -1) { //执行插入操作
							ob.product.productId = response.data.ob; //插入成功之后的商品Id
							this.tableData.push(ob.product); //将传过来的product插入到tableData中
						}
					} else {
						this.$Notice.message(response.data.message, 'error');
					}
				});
			},
			handleDelete(index, row) {
				//deleteproduct
				this.$http.get(this.$urls.deleteproduct, {
					productId: row.productId
				}, (response) => {
					if (response.data.code == '200') {
						this.tableData.splice(index, 1); //进行移除
						//成功之后给个提示
						this.$Notice.message(response.data.message, 'success');
					} else {
						this.$Notice.message(response.data.message, 'error');
					}
				});
			},
			handleShow: function(row) {
				this.dialogFormVisible = true; //查看信息
				this.product = row; //将每一行的信息展示出来
			}
		}
	}
</script>

<style>
	.container {
		height: 85vh;
		/* overflow-y: scroll; */
	}
	el-menu{
		height: 85vh !important;
	}
	.page{
		text-align: center;
	}
    el-table{
		overflow-y: scroll;
	}
	element.style {
		height: 800px !important;
		border: 1px solid rgb(238, 238, 238);
	}
</style>
