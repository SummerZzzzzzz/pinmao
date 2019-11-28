<template>
	<div class="productdialog">
		<el-dialog  :modal="modal" :close-on-click-modal="closeonclickmodal" :before-close="handleClose" title="商品管理"
		 :visible.sync="dialogFormVisible">
			<el-form :model="product">
				<el-form-item label="商品Id">
					<el-input :disabled="true" v-model="product.productId" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品名称">
					<el-input v-model="product.productName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品价格">
					<el-input v-model="product.productPrice" autocomplete="off"></el-input>
				</el-form-item>
				<div id="editor">
					<p></p>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="$emit('closeDialog',false)">取 消</el-button>
				<!-- <el-button type="primary" @click="$emit('submitDialog',{product:product,ifClose:false})">确 定</el-button> -->
				<el-button type="primary" @click="submit()">确 定</el-button>
		
			</div>
		</el-dialog>
	</div>
	
</template>

<script>
	export default {
		name: "productdialog",
		props: ["dialogFormVisible", "product"],
		data: function() {
			return {
				editor: null,
				drag: false, //是否启动拖拽上传
				modal: false,
				closeonclickmodal: false
			}
		},
		methods: {
			handleClose: function() {
				this.$emit('closeDialog', false);
			},
			submit: function() {
				this.product.productDes = this.editor.txt.html(); //获取内容
				this.$emit('submitDialog', {
					product: this.product,
					ifClose: false
				})
			}
		},
		updated: function() {
			//创建wangeditor
			console.log(document.getElementById("editor"));
			if (this.editor == null) {
				this.editor = new this.$Editor('#editor');
				this.editor.create();
			}
			if (this.editor != null) {
				this.editor.txt.html(this.product.productDes); //设置内容
			}


		}
	}
</script>

<style>
	/* .el-dialog {
		width: 70%;
		border: 2px solid black;
	} */

	#editor {
		width: 100% !important;
		height: 300px;
	}

	.el-dialog__wrapper {
		z-index: 2000 !important;
	}
	/* .productdialog .el-dialog{
		width: 600px !important;
	} */
	
</style>
