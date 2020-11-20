<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/avatar.jpg" alt="">
            </div>
            <div>
                <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="100px" class="login_form">
                    <el-form-item label="用户名" prop="username">
                        <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item class="btns">
                        <el-button type="primary"  @click="login('loginFormRef')">登录</el-button>
                        <el-button type="danger" @click="resetForm('loginFormRef')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在3到15个字符', trigger: 'blur'}
        ]

      },
      loginForm: {
        username: 'root',
        password: 'root'
      }
    }
  },
  methods: {
    resetForm (loginFormRef) {
      this.$refs[loginFormRef].resetFields()
    },
    login (loginFormRef) {
      this.$refs[loginFormRef].validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登陆成功')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width:450px;
    height:300px;
    background-color: #fff;
    border-radius: 3px;
    position:absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);

    .avatar_box{
    height: 100px;
    width: 100px;
    border: #fff 1px solid;
    background-color:#fff;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    img{
        height: 100%;
        width:100%;
        border-radius: 50%;
        background-color:#eee;
    }
}
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 90%;
    padding: 0 10px;
}
.btns{
    display: flex;
    justify-content: center;
}
</style>
