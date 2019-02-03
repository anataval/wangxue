<template>
  <el-card>
    <!-- 面包屑 -->
    <mybread firstnav="用户管理" lastnav="用户列表"></mybread>
    <!-- 搜素区域 -->
    <el-row class="myrow">
      <!-- 一行 两列-->
      <el-col :span="8">
        <!--输入框  -->
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <!-- 按钮 -->
          <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
        </el-input>
      </el-col>
      <el-col :span="16">&nbsp;&nbsp;
        <!-- 添加按钮 -->
        <el-button type="success" plain @click="addDialog=true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 列表区域 -->
    <el-table class="mytable" :data="tableData" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <!-- 用户状态 -->
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <!-- 一旦设置了 template 标签， prop 属性就会失效，如果要得到数据源，需要从 scope.row 中去取 -->
          <el-switch
            @change="statuChange(scope.row.id, scope.row.mg_state)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
          <!-- {{ scope.row }} -->
        </template>
      </el-table-column>
      <!-- 三个操作 ，有按钮的列，都需要一个用一个template包裹？-->
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <div>
            <el-button @click="openEidt(scope.row.id)" size="mini" plain type="primary" icon="el-icon-edit"></el-button>
            <el-button @click="del(scope.row.id)" size="mini" plain type="danger" icon="el-icon-delete"></el-button>
            <el-button @click="openRole(scope.row.id)" size="mini" plain type="success" icon="el-icon-check"></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10,]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加面板 -->
    <el-dialog title="添加用户" :visible.sync="addDialog">
      <el-form :model="addObj">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="addObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input type="password" v-model="addObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="addObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="addObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancle">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改面板 -->
     <el-dialog title="修改用户" :visible.sync="editDialog">
      <el-form :model="editObj">
        <el-form-item label="用户名" label-width="100px">
          <el-input :disabled="true" v-model="editObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="editObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="editObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog=false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色面板 -->
    <el-dialog title="分配角色" :visible.sync="roleDialog">
      <el-form :model="roleObj">
        <el-form-item label="用户名" label-width="100px">
          <label>{{roleObj.username}}</label>
        </el-form-item>
        <el-form-item label="分配角色" label-width="100px">
          <!-- 
                  el-select：
                  el-option：下拉选项
                    label: 显示的文本
                    value：文本对应的 value 值
                 -->

          {{ roleObj.rid }}
          <el-select v-model="roleObj.rid" placeholder="请选择">
            <el-option :disabled="true" label="请选择角色" :value="-1"></el-option>
            <el-option v-for="item in dropData" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialog=false">取 消</el-button>
        <el-button type="primary" @click="role">确 定</el-button>
      </div>
    </el-dialog>
    
  </el-card>

</template>

<script>
export default {
  data() {
    return {
      // 表格的数据源
      tableData: [],
      search: "",
      // 分页的当前页
      pagenum: 1,
      // 分页的页容量
      pagesize: 5,
      // 数据的总条数
      total: 0,
      // 控制添加面板
      addDialog: false,
      //添加面板中的数据对象
      addObj: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 控制修改面板
      editDialog: false,
      // 修改面板中的数据
      editObj: {},
      // 控制分配角色面板
      roleDialog: false,
      // 分配角色面板中的数据
      roleObj: {},
      // 下拉框中的数据源
      dropData: []
    }
  },
  methods: {
    //得到服务器里的数据
    async getAllList() {
      var res = await this.$http.get(
        `/users?query=${this.search}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`,
        {
          headers: {
            Authorization: window.localStorage.getItem("token")
          }
        }
      );
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.tableData = data.users;
        this.total = data.total;
      }
    },
    // 当页容量发生改变时，重新请求数据
    sizeChange(size) {
      // 将 size 设置给 pageize
      this.pagesize = size;
      // 更新数据
      this.getAllList();
    },
    // 当当前页发生改变时，重新请求数据
    currentChange(num) {
      // 将 num 设置 pagenum
      this.pagenum = num;
      // 重新请求数据
      this.getAllList();
    },
    searchData() {
      this.getAllList();
    },
    //添加面板中的确认
    async add() {
      var res = await this.$http.request({
        url: "/users",
        method: "post",
        data: {
          username: this.addObj.username,
          password: this.addObj.password,
          email: this.addObj.email,
          mobile: this.addObj.mobile
        },
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { meta } = res.data;
      if (meta.status === 201) {
        this.$message({
          message: meta.msg,
          type: "success"
        });
        this.getAllList();
      } else {
        this.$message.error(meta.msg);
      }
      //清除面板中的数据
      this.clearObj(this.addObj);
      this.addDialog = false;
    },
    // 清空对象
    clearObj(obj) {
      for (var item in obj) {
        obj[item] = "";
      }
    },
    //添加面板中的取消
    addCancle() {
      this.addDialog = false;
      this.clearObj(this.addObj);
    },
    async statuChange(id, type) {
      var res = await this.$http.request({
        url: `/users/${id}/state/${type}`,
        method: 'put',
        //找到token
        headers: {
          "Authorization": window.localStorage.getItem('token')
        }
      })
       var { meta } = res.data
      if (meta.status === 200) {
        this.$message({
          message: meta.msg,
          type: 'success'
        })
      } else {
        this.$message.error(meta.msg)
      }
    },
    //点击修改按钮，打开修改面板，填充相应的数据
    async openEidt(id){
      this.editDialog = true
      var res = await this.$http.request({
        url: `/users/${id}`,
        method: 'get',
        headers: {
          "Authorization": window.localStorage.getItem('token')
        }
      })
       var { meta, data } = res.data
      if (meta.status === 200) {
        this.editObj = data
      } else {
        this.$message.error(meta.msg)
      }
    },
    async edit(){
      var res = await this.$http.request({
        url: `/users/${this.editObj.id}`,
        method: 'put',
        headers: {
          "Authorization": window.localStorage.getItem('token')
        },
        data: {
          email: this.editObj.email,
          mobile: this.editObj.mobile
        }
      })
      var { meta } = res.data
      if (meta.status === 200){
         this.$message({
          message: meta.msg,
          type: 'success'
        })
        //编辑完，更新下数据并渲染
        this.getAllList()
      }else {
        this.$message.error(meta.msg)
      }
      //编辑完，关闭编辑面板
      this.editDialog = false
    },
    del(id){
    //提示是否删除
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () =>{
        var res = await this.$http.request({
          url: `/users/${id}`,
          method: 'delete',
          headers: {
             "Authorization": window.localStorage.getItem('token')
          }
        })
        var { meta } = res.data
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
          this.getAllList()
        } else {
          this.$message.error(meta.msg)
        }
      }).catch(() => {
       this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
   // 打开分配角色面板，填充对应数据
   async openRole(id){
     this.roleDialog = true
     this.getDropDown()
     var res = await this.$http.request({
       url:`/users/${id}`,
        method: 'get',
        headers: {
          "Authorization": window.localStorage.getItem('token')
        }
     })
     var { meta, data } = res.data
      if (meta.status === 200) {
        this.roleObj = data
        console.log(data)
      } else {
        this.$message.error(meta.msg)
      }
    },
    //动态得到下拉框中的数据
    async getDropDown(){
      var res = await this.$http.request({
        url: 'roles',
        method: 'get',
        headers: {
          "Authorization": window.localStorage.getItem('token')
        }
      })
      var { meta, data} = res.data
      if(meta.status === 200  ) {
        this.dropData = data
      }else{
        this.$message.error(meta.msg)
      }
    },
    //提交用户角色
    async role(){
      //得到用户的id
      var id = this.roleObj.id
      //分配的角色 id
      var rid = this.roleObj.id
      //发送请求
      var res = await this.$http.request({
        url: `/users/${id}/role`,
        method: 'put',
        data: {
          rid: rid
        },
        headers: {
          "Authorization": window.localStorage.getItem('token')
        }
      })
      var {meta} =res.data
      if (meta.status === 200){
        this.$message({
          message: meta.msg,
          type: 'success'
        })
      }else{
        this.$message.error(meta.msg)
      }
      this.roleDialog = false
    }
  },
  mounted() {
    this.getAllList();
  }
};
</script>

<style>
.myrow,
.mytable {
  margin: 15px 0;
}
</style>


