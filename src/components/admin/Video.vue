<template>
	<div class="container">
		
	<!--商品dialog-->
	<videodialog :video="video" :dialogFormVisible="dialogFormVisible" @sumitDialog="submit($event)" v-on:closeDialog="dialogFormVisible = $event"></videodialog>	
	<el-button type="primary"  @click="create()">创建</el-button>	
	<el-table :data="tableData" border style="width: 100%">
		<el-table-column v-for="title in titles" fixed :prop="title.prop" :label="title.label" :width="title.width">
		</el-table-column>
		
		<el-table-column label="操作" width="200">
			<template slot-scope="scope">
				<el-button @click="handleShow(scope.row)" type="text" size="small">查看</el-button>
			    <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
	<el-pagination class="center" @current-change="change"
  background
  layout="prev, pager, next"
  :total="total">
</el-pagination>
	</div>
</template>

<script>
	var count = 10;
	import videodialog from "@/components/admin/Videodialog"
	export default {
		name: "video",
		components:{
			videodialog
		},
		data: function() {
			return {
				total:0,
				titles: [{
						prop: "videoId",
						label: "视频Id",
						width: "300"
					},
					{
						prop: "title",
						label: "视频标题",
						width: "400"
					},
					{
						prop: "url",
						label: "视频路徑",
						width: "400"
					}
				],
				tableData: [],
				dialogFormVisible:false,
				video:{videoId:-1}
			}
		},
		mounted:function(){
			this.find(1);
		},
		methods: {
			find:function(page){
				this.$http.get("findallvideos/"+page+"/"+count+".do", {
					// page:page,count:10
				},(response)=>{
					if(response.data.code=='200'){
					//插入成功接收categoryId
					if(response.data.videos!=null&&response.data.videos!=""){
						this.tableData =response.data.videos;
						console.log(this.tableData);
						this.total =response.data.total; 
					}	
					//this.$Notice.message(response.data.message,'success');
					}else{
					this.$Notice.message(response.data.message,'error');	
					}
				});
			},
			//分页
			change:function(page){
				this.find(page);
			}
			,
			create:function(){
				this.dialogFormVisible = true;
				this.video = {videoId:"-1"};
			}
			,
			submit: function(ob) {
				this.$http.post(this.$urls.insertvideo, {
					video:ob.video
				}, (response) => {
					if (response.data.code == '200') {
						
						//插入成功接收categoryId
						this.dialogFormVisible = ob.ifClose;
						if(ob.video.videoId==-1){//插入
						console.log("123");
						ob.video.videoId = response.data.videoId;//视频id
						this.tableData.push(ob.video);
						}
						this.$Notice.message(response.data.message,'success');
					} else {
						
						this.$Notice.message(response.data.message, 'error');
					}
				});
			},
			  handleDelete(index, row) {
				  console.log(row.videoId);
				 this.$http.get("deletevideo/"+row.videoId+".do",{
				 }, (response) => {
				 	if (response.data.code == '200') {
						this.tableData.splice(index, 1);
				 		this.$Notice.message(response.data.message,'success');
				 	} else {
				 		this.$Notice.message(response.data.message, 'error');
				 	}
				 });
              },handleShow:function(row){
				  this.dialogFormVisible = true;
				  this.video = row;
			  }
		}
	}
</script>

<style>
	.container{
		width:100%;
	}
	.el-table{
	}
	.center{
		text-align: center;
	}
	/* .videodialog{
		width:300px;
	} */
</style>
