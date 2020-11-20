<template>
<div>
    <!-- 面包屑导航数据 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>
<!-- 卡片视图区 -->
<el-card class="box-card">
     <el-row :gutter="20">
  <el-col :span="7">
       <el-input placeholder="请输入内容"  clearable @clear="getUserList" v-model="queryInfo.query">
    <el-button slot="append" icon="el-icon-search"  @click="getUserList"></el-button>
  </el-input>
  </el-col>
  <el-col :span="4">
      <el-button type="primary" @click="dialogVisible=true"> 添加用户</el-button>
  </el-col>
</el-row>
<!-- 用户列表导入 -->
<el-table :data="userList" border stripe >
     <el-table-column type="index"></el-table-column>
    <el-table-column label="姓名" prop="username"></el-table-column>
    <el-table-column label="邮箱" prop="email"></el-table-column>
    <el-table-column label="电话" prop="mobile"></el-table-column>
    <el-table-column label="角色" prop="role_name"></el-table-column>
    <el-table-column label="状态" >
        <template slot-scope="scope">
            {{scope.row.ms.state}}
            <el-switch
                v-model="scope.row.mgstste" @change="userStateChange(scope.row)">
            </el-switch>
        </template>
    </el-table-column>
    <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button @click="showEditDialog(scope.row.id)" type="primary" size="small" icon="el-icon-edit"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" @click="deleteMessage(scope.row.id)" size="small" icon="el-icon-delete"></el-button>
            <!-- 分配角色 -->
            <el-tooltip content="分配角色" :enterable="false" placement="top">
            <el-button type="warning" size="small" icon="el-icon-setting"></el-button>
            </el-tooltip>
        </template>
    </el-table-column>
</el-table>
<!-- 分页区域 -->
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pageNum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>

<el-dialog
  title="添加用户"
  :visible.sync="dialogVisible"
  width="30%"
  @close="addDialogClose"
  >
  <!-- 内容主题区域 -->
  <el-form :model="addForm" :rules="rules" ref="addFormRef" label-width="70px">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addForm.username" placeholder="用户名"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="addForm.password" placeholder="密码"></el-input>
  </el-form-item>
   <el-form-item label="邮箱" prop="email">
    <el-input v-model="addForm.email" placeholder="邮箱"></el-input>
  </el-form-item>
   <el-form-item label="手机" prop="mobile">
    <el-input v-model="addForm.mobile" placeholder="电话"></el-input>
  </el-form-item>
  </el-form>
  <!-- 底部区 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser = false">确 定</el-button>
  </span>
</el-dialog>
<!-- 修改部分的对话框 -->
<el-dialog
  title="修改用户"
  :visible.sync="editdialogVisible"
  :before-close="handleClose"
  width="50%">
  <el-form :model="editForm" label-width="70px" :rules="editFormRules" ref="editFormRef">
  <el-form-item label="用户名">
    <el-input v-model="editForm.username" disabled placeholder="用户名"></el-input>
  </el-form-item>
   <el-form-item label="邮箱" prop="email">
    <el-input v-model="editForm.email" placeholder="邮箱"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="editForm.mobile" placeholder="手机号"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editdialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 2
      },
      userList: [],
      total: 0,
      // 控制对话框的显示和关闭
      dialogVisible: false,
      editdialogVisible: false,
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {max: 10, min: 3, message: '用户名在3~10个字符'}],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {max: 10, min: 3, message: '用户名在3~10个字符'}],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '请输入正确的格式', trigger: ['blur', 'change']}],
        mobile: [
          {required: true, message: '请输入手机', trigger: 'blur'},
          {max: 11, min: 8, message: '用户名在8~11个字符'}]
      },
      editFormRules: {
        eamil: [{required: true, message: '请输入密码', trigger: 'blur'},
          {max: 10, min: 3, message: '用户名在3~10个字符'}],
        mobile: [
          {required: true, message: '请输入手机', trigger: 'blur'},
          {max: 11, min: 8, message: '用户名在8~11个字符'}]
      },
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editForm: {
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const {data: res} = this.$http.get('user', {params: this.queryInfo})
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 监听pagesize改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getUserList()
    },
    // 监听当前页改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getUserList()
    },
    userStateChange (userInfo) {
      const {data: res} = this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('更新用户的状态失败')
      }
      this.$message.success('更新状态成功')
    },
    // 监听对话框的关闭
    addDialogClose () {
      this.$refs.addFormRef.resetFields()
    },
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return this.$message.error('验证失败，请重新校验')
        const {data: res} = this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) return this.$message.error('添加用户失败')
        this.dialogVisible = false
        this.getUserList()
      })
    },
    // 展示修改对话框
    async showEditDialog (id) {
      const {data: res} = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) return this.$message.error('查询用户信息失败')
      this.editForm = res.data
    },
    handleClose () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户
    editUserInfo () {
      this.$refs.editForm.validate(valid => {
        if (!valid) return this.$message.error('用户格式有误，请重新检查')
        this.$http.put('users/' + this.editForm.id, {email: this.editForm.email, mobile: this.editForm.mobile})
      })
      // 关闭对话框
      this.getUserList()
      this.$message.success('修改用户成功')
    },
    deleteMessage (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
