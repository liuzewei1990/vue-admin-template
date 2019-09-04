<template>
  <div id="user-page">
    <common-table ref="commonTable" :api="tableApi" :query="query">
      <el-form ref="ruleForm" :model="query" :inline="true" slot="search">
        <el-form-item label="用户名称" prop="formCustomerNo" v-mar-b="0">
          <el-input size="small" v-model="query.realname" placeholder="用户名称"></el-input>
        </el-form-item>
        <el-form-item label="登录帐号" prop="formCustomerNo" v-mar-b="0">
          <el-input size="small" v-model="query.username" placeholder="登录帐号"></el-input>
        </el-form-item>
        <el-form-item label="状态" v-mar-b="0">
          <el-select size="small" v-model="query.status" placeholder="请选择状态">
            <el-option label="全部" value=""></el-option>
            <el-option :label="item.label" v-for="(item,key) in userStatus" :key="key" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-mar-b="0">
          <el-button type="primary" size="small" icon="el-icon-search" @click="handleClickSearchBtn">搜索</el-button>
        </el-form-item>
        <el-form-item v-mar-b="0">
          <el-button size="small">重置</el-button>
        </el-form-item>
      </el-form>

      <el-button slot="action" style="border-radius:0;" size="small" type="primary" icon="el-icon-plus" @click="addFormVisible = true">添加用户</el-button>

      <el-table-column class-name="_common_" prop="realname" label="用户名称" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column class-name="_common_" prop="username" label="登录帐号" :show-overflow-tooltip="true"></el-table-column>
      <!-- <el-table-column class-name="_common_" prop="type" label="当前角色" :show-overflow-tooltip="true"></el-table-column> -->
      <el-table-column class-name="_common_" label="状态">
        <template slot-scope="scope">
          <el-tag size="mini" :type="userStatus[scope.row.status].tag">{{userStatus[scope.row.status].label}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="_common_" prop="createTime" label="创建时间" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column class-name="_common_" label="操作" width="180">
        <template slot-scope="scope" v-if="scope.row.status !== 'DELETE'">
          <el-button class="_common_color_warning_" type="text" size="mini" @click="handleRoleAction(scope.row)">配置角色</el-button>
          <el-button class="_common_color_success_" type="text" size="mini" @click="handleEditAction(scope.row)">编辑</el-button>
          <el-button class="_common_color_blue_" type="text" size="mini" @click="handleDeleteAction(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </common-table>

    <!-- 新增 -->
    <el-dialog center title="新增用户" :visible.sync="addFormVisible" width="400px">
      <el-form size="small" :model="addForm" ref="addForm" :rules="addFormRules">
        <el-form-item label="用户名称" prop="realname" label-width="100px">
          <el-input v-model="addForm.realname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录帐号" prop="username" label-width="100px">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password" label-width="100px">
          <el-input type="password" v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword" label-width="100px">
          <el-input type="password" v-model="addForm.repassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="$refs['addForm'].resetFields()">重置</el-button>
        <el-button :loading="saveLoading" type="primary" @click="handleClickAddSaveBtn('addForm')">确定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="修改用户信息" center :visible.sync="editFormVisible" width="400px">
      <el-form size="small" :model="editForm" ref="editForm" :rules="editFormRules">
        <el-form-item label="用户名" prop="realname" label-width="100px">
          <el-input v-model="editForm.realname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户登录名" prop="username" label-width="100px">
          <el-input disabled v-model="editForm.username" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="handleClickEditSaveBtn('editForm')">确定</el-button>
      </div>
    </el-dialog>

    <!-- 角色列表 -->
    <el-dialog title="请选择角色" center :visible.sync="roleListVisible" width="400px">
      <el-tree v-loading="roleListLoading" class="el-tree-box" ref="elTree" :data="treeData" :show-checkbox="true" @check-change="checkChange" empty-text="" node-key="roleCode" :default-checked-keys="defaultCheckedKeys" :props="{label:'roleName'}" :check-on-click-node="true"></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleListVisible = false">取消</el-button>
        <el-button :loading="saveLoading" type="primary" :disabled="roleSaveBtnDisabled" @click="handleClickRoleSaveBtn()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserManages, postAddUser, patchEditUser, getRolesTree, patchConfigRole, deleteUserManage } from "@src/apis";
import CommonTable from '@src/components/CommonTable';

export default {
  components: { CommonTable },
  data () {
    return {
      tableApi: getUserManages,
      query: {
        page: 1,
        limit: 20,
        status: "TRUE"
      },

      userStatus: {
        "TRUE": { label: "启用", tag: "success" },
        "FLASE": { label: "未开启", tag: "warning" },
        "DELETE": { label: "已删除", tag: "danger" },
      },

      // 新增用户
      addFormVisible: false,
      saveLoading: false,
      addForm: {},
      addFormRules: {
        realname: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: this.validatePass, trigger: 'blur' }
        ],
        repassword: [
          { required: true, validator: this.validatePass2, trigger: 'blur' }
        ],
      },

      // 编辑
      editFormVisible: false,
      editForm: {},
      editFormRules: {
        realname: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入登录帐号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
      },

      // 选择角色
      roleListVisible: false,
      roleListLoading: false,
      treeData: [],
      defaultCheckedKeys: [],
      roleSaveBtnDisabled: true,

    }
  },
  mounted () {
    this.$refs.commonTable.loadData();
  },
  methods: {
    // 点击搜索按钮
    handleClickSearchBtn () {
      this.$refs.commonTable.refreshTableData();
    },

    // 点击表格编辑按钮
    handleEditAction (rowData) {
      this.editForm.realname = rowData.realname;
      this.editForm.username = rowData.username;
      this.editFormVisible = true;
    },

    // 点击表格删除按钮
    async handleDeleteAction (rowData) {
      this.$confirm("此操作将删除该条管理员数据, 是否继续?", "提示", { type: "warning" }).then(async () => {
        let data = await deleteUserManage(rowData.username);
        if (data.code == "00") {
          this.$message.success("删除成功！");
          this.$refs['commonTable'].loadData();
        } else {
          this.$message.error(data.msg);
        }
      })
    },

    // 新增用户保存
    async handleClickAddSaveBtn (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.saveLoading = true;
          let data = await postAddUser({ ...this.addForm });
          if (data.code == "00") {
            this.addFormVisible = false;
            this.$refs['addForm'].resetFields();
            this.$refs['commonTable'].refreshTableData();
            this.$message.success("添加成功！");
          } else {
            this.$message.error(data.msg);
          }
          this.saveLoading = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    // 编辑用户保存

    async handleClickEditSaveBtn (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.saveLoading = true;
          let data = await patchEditUser({ ...this.editForm });
          if (data.code == "00") {
            this.editFormVisible = false;
            this.$refs['editForm'].resetFields();
            this.$refs['commonTable'].loadData();
            this.$message.success("修改成功！");
          } else {
            this.$message.error(data.msg);
          }
          this.saveLoading = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    // 点击表格配置角色按钮
    async handleRoleAction (rowData) {
      this.roleListVisible = true;
      this.roleListLoading = true;
      this.treeData = [];
      this.defaultCheckedKeys = [];
      let data = await getRolesTree({ username: rowData.username });
      if (data instanceof Array) {
        this.treeData = data;
        this.defaultCheckedKeys = this.getDefaultCheckedKeys(data);
        this._cacheUsername = rowData.username;
        this.$nextTick(this.checkChange);
      } else {
        this.$message.error('"getRolesTree" 接口返回值出错');
      }
      this.roleListLoading = false;
    },

    // 找出treeData中默认选中的tree,并返回defaultCheckedKeys数组
    getDefaultCheckedKeys (treeData) {
      let _tmp = [];
      for (let index = 0; index < treeData.length; index++) {
        const tree = treeData[index];
        if (tree.checked === "TRUE") {
          _tmp.push(tree.roleCode);
        }
      }
      return _tmp;
    },

    // 监听节点checkd change事件,获取最新选中的keys 与 defaultCheckedKeys 对比是否有变化，决定保存按钮是否可点击
    checkChange () {
      let currCheckedKeys = this.$refs.elTree.getCheckedKeys();
      if (currCheckedKeys.join("") === this.defaultCheckedKeys.join("")) {
        this.roleSaveBtnDisabled = true;
      } else {
        this.roleSaveBtnDisabled = false;
      }
    },


    // 点击保存修改role
    async handleClickRoleSaveBtn () {
      let _currCheckedKeys = this.$refs.elTree.getCheckedKeys();
      let addRoleCodes = this.getAddRoleCodes(_currCheckedKeys, this.defaultCheckedKeys);
      let deleteRoleCodes = this.getDeleteRoleCodes(_currCheckedKeys, this.defaultCheckedKeys);
      // 注1：此处的接口提交是 addRoleCodes 为新选中的节点，不可以包含默认选中的节点,例如：原 [1,2,3] addRoleCodes 为[4]
      // 注2：此处的接口提交是 deleteRoleCodes 为默认选中的节点移除掉的节点, 例如：原 [1,2,3], deleteRoleCodes 为 [2]
      let data = await patchConfigRole({
        username: this._cacheUsername,
        addRoleCodes: addRoleCodes.join(","),
        deleteRoleCodes: deleteRoleCodes.join(",")
      });
      if (data.code == "00") {
        this.$message.success("角色配置成功");
        this.roleListVisible = false;
      } else {
        this.$message.error(data.msg);
      }
    },

    // 找出新增的keys
    getAddRoleCodes (_currCheckedKeys, defaultCheckedKeys) {
      let _tmp = [];
      for (let index = 0; index < _currCheckedKeys.length; index++) {
        const curKey = _currCheckedKeys[index];
        // 如果defaultCheckedKeys 数组中有 curKey 的话返回true
        if (!defaultCheckedKeys.some(x => x === curKey)) {
          _tmp.push(curKey);
        }
      }
      return _tmp;
    },

    // 找出移除的keys
    getDeleteRoleCodes (_currCheckedKeys, defaultCheckedKeys) {
      let _tmp = [];
      for (let index = 0; index < defaultCheckedKeys.length; index++) {
        const curKey = defaultCheckedKeys[index];
        // 如果defaultCheckedKeys 数组中有 curKey 的话返回true
        if (!_currCheckedKeys.some(x => x === curKey)) {
          _tmp.push(curKey);
        }
      }
      return _tmp;
    },

    // 验证密码
    validatePass (rule, value, callback) {
      if (value === '' || value === undefined) {
        callback(new Error('请输入密码'));
      } else {
        if (this.addForm.repassword !== '') {
          this.$refs.addForm.validateField('repassword');
        }
        callback();
      }
    },

    // 验证密码是否一样
    validatePass2 (rule, value, callback) {
      if (value === '' || value === undefined) {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.addForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
  }
}
</script>

<style>
</style>
