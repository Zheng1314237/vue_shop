<template>
    <el-container class="contain">
    <el-header>
      <div>
        <img src="../assets/logo.jpg" class="home_img" alt=""/>
        <span>电商系统</span>
      </div>
      <div>
        <el-button type="info" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
          <!-- 侧边栏菜单 -->
          <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
      background-color="rgb(95, 245, 207)"
      text-color="#000"
      active-text-color="#ffd04b"
      :default-active="activePath"
      router
      unique-opened :collapse="isCollapse" :collapse-transition="false">
      <el-submenu index="item.index+''"  v-for="item in menuList" :key="item.id" >
        <template slot="title">
          <!-- 图标 -->
          <i class="iconsObj['1']"></i>
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item index="'/'+subItem.path+''" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{subItem}}</span>
            </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menuList: [],
      iconsObj: {
        '1': 'el-icon-search'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('active')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      const {data: res} = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    saveNavState (activePath) {
      window.sessionStorage.setItem('active', activePath)
    }
  }
}
</script>

<style lang="less" scoped>
.el-header{
  background-color: rgb(231, 253, 152);
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  color: rgb(5, 0, 0);
  font-size: 30px;
  align-items: center;
  >div{
    display:flex;
    align-items: center;
  }
}
.el-aside{
  background-color:rgb(95, 245, 207) ;
  .el-menu{
    border-right: 0px;
  }
}
.el-main{
  background-color:rgb(238, 236, 236) ;
}
.contain{
  height: 100%;
}
.home_img{
  height:50px;
  width: 50px;
}
.toggle-button{
  background-color:#4a5064 ;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;

}
</style>
