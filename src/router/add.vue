<template>
  <!-- 线上商户查询 -->
  <el-form id="dialogLoding" size="small" :model="addForm" ref="addForm" :rules="addFormRules" :label-position="labelPosition">
    <div class="span-box-2">
      <div class="add-form-box">
        <div class="title-back">机构信息</div>
        <div class="content">
          <el-row :gutter="30">
            <el-form-item label="服务商编号" prop="companyNo" :label-width="formLabelWidth">
              <el-input :disabled="companyNoDisabled" placeholder="服务商编号" @blur="companyNoBlur" v-model="addForm.companyNo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="机构商户号" prop="comCustomerNo" :label-width="formLabelWidth">
              <el-input @blur="setCache" placeholder="接入机构商户编号" v-model="addForm.comCustomerNo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="false" label="服务信息" prop="service" :label-width="formLabelWidth">
              <el-input  @blur="setCache" placeholder="服务信息" v-model="addForm.service" auto-complete="off"></el-input>
            </el-form-item>
          </el-row>
        </div>
      </div>
      <div class="add-form-box">
        <div class="title-back">商户分类</div>
        <div class="content">
          <el-form-item class="full-width" label="商户类型" prop="customerType" label-width="80px">
            <el-radio-group @change="customerTypeSelect" v-model="addForm.customerType">
              <el-radio label="1">企业/个体户</el-radio>
              <el-radio :disabled='true' label="0">个人</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item class="full-width" label="开通代付" prop="customerType" label-width="80px">
                <el-switch @change="setCache" :disabled="proxyFlagDis" v-model="addForm.proxyFlag" active-text="是" inactive-text="否" active-value="1" inactive-value="0">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="full-width" label="同步中付" prop="customerFrom" label-width="80px">
                <el-switch @change="setCache" v-model="addForm.customerFrom" active-text="是" inactive-text="否" :active-value="customerLOCAL" inactive-value="ZF_SYSN">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      
      </div>
    </div>
    <!-- <el-form-item class="full-width" label="支付方式" prop="payTypeArr" label-width="80px">
      <el-select
        v-model="payTypeArr"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="请选择支付方式">
        <el-option
          v-for="item in payOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item> -->
      <div class="add-form-box">
      <div class="title-back title-box">
        <span class="text">费率信息</span>
        <el-checkbox-group v-model="payTypeArr" class="title-content">
          <el-checkbox v-for="item in payOptions" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="content">
        <!-- addForm.proxyFlag==1 -->
        <el-row :gutter="30">
          <el-col v-if="formItemVisible(['wechatPay'])" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="微信扫码费率" prop="wechatScansRate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.wechatScansRate" :fetch-suggestions="querySearch" placeholder="请输入微信扫码费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col v-if="formItemVisible(['aliPay'])"  :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="支付宝扫码费率" prop="alipayScansRate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.alipayScansRate" :fetch-suggestions="querySearch" placeholder="请输入支付宝扫码费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col v-if="formItemVisible(['wechatPay'])"  :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="微信APP费率" prop="wechatAppRate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.wechatAppRate" :fetch-suggestions="querySearch" placeholder="请输入微信APP费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col v-if="formItemVisible(['aliPay'])"  :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="支付宝APP费率" prop="alipayAppRate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.alipayAppRate" :fetch-suggestions="querySearch" placeholder="请输入支付宝APP费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col v-if="formItemVisible(['wechatPay'])"  :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="微信H5费率" prop="wechatH5Rate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.wechatH5Rate" :fetch-suggestions="querySearch" placeholder="请输入微信H5费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col v-if="formItemVisible(['aliPay'])"  :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="支付宝H5费率" prop="alipayH5Rate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.alipayH5Rate" :fetch-suggestions="querySearch" placeholder="支付宝H5费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col v-if="formItemVisible(['unionPay'])"  :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="银联1000以下费率" prop="unionPayScansRate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.unionPayScansRate" :fetch-suggestions="querySearch" placeholder="银联1000以下费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col v-if="formItemVisible(['unionPay'])"  :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="银联1000以上费率" prop="unionPayScansUpRate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.unionPayScansUpRate" :fetch-suggestions="querySearch" placeholder="银联1000以上费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col v-if="formItemVisible(['qqPay'])"  :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="QQ费率" prop="qqScansRate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.qqScansRate" :fetch-suggestions="querySearch" placeholder="QQ费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col v-if="formItemVisible(['quickPay'])"  :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="快捷支付费率" prop="quickPayRate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.quickPayRate" :fetch-suggestions="querySearch" placeholder="快捷支付手续费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col v-if="formItemVisible(['quickPay'])"  :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="无卡快捷借记卡费率" prop="quickPayDebitRate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.quickPayDebitRate" :fetch-suggestions="querySearch" placeholder="无卡快捷借记卡手续费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col v-if="formItemVisible(['quickPay'])"  :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="无卡快捷贷记卡费率" prop="quickPayCreditRate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.quickPayCreditRate" :fetch-suggestions="querySearch" placeholder="无卡快捷贷记卡手续费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col v-if="formItemVisible(['quickPay'])"  :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="网关支付借记卡费率" prop="gateWayPayDebitRate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.gateWayPayDebitRate" :fetch-suggestions="querySearch" placeholder="网关支付借记卡手续费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col v-if="formItemVisible(['quickPay'])"  :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="网关支付贷记卡费率" prop="gateWayPayCreditRate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.gateWayPayCreditRate" :fetch-suggestions="querySearch" placeholder="网关支付贷记卡手续费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col v-if="addForm.settleMode=='T0'" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="T0提现手续费" prop="t0CashCostFixed" :label-width="formLabelWidth">
              <!-- <el-input v-model="addForm.t0CashCostFixed" auto-complete="off"></el-input> -->
              <el-autocomplete class="full-width" v-model="addForm.t0CashCostFixed" :fetch-suggestions="querySearch" placeholder="网关支付贷记卡手续费率%">
                <template slot="append">元</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="add-form-box">
      <div class="title-back">联系人方式</div>
      <div class="content">
        <div class="block-box">
          <div class="group-box">
            <el-form-item  label="联系人名称" :prop="(customerFrom!='ZF_SYSN'&&enterprise)?'contactName':''" :label-width="formLabelWidth">
              <el-input @blur="setCache" placeholder="联系人名称" v-model="addForm.contactName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系人座机" prop="contactPhone" :label-width="formLabelWidth">
              <el-input @blur="setCache" placeholder="联系人座机" v-model="addForm.contactPhone" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item label="联系人手机号" :prop="(customerFrom!='ZF_SYSN')?'contactMobile':''" :label-width="formLabelWidth">
              <el-input @blur="setCache" placeholder="联系人手机号" v-model="addForm.contactMobile" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系人邮箱" prop="contactEmail" :label-width="formLabelWidth">
              <el-input @blur="setCache" placeholder="联系人邮箱" v-model="addForm.contactEmail" auto-complete="off"></el-input>
            </el-form-item>
          </div>
        </div>

      </div>
    </div>
    <div class="add-form-box">
      <div class="title-back">基本信息</div>
      <div class="content">
        <div class="block-box">
          <div class="group-box">
            <el-form-item label="企业名称" prop="enterpriseName" :label-width="formLabelWidth">
              <el-input  :placeholder="enterpriseNameHolder" @blur="enterpriseNameBlur" v-model="addForm.enterpriseName" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box" v-if="enterprise">
            <el-form-item label="企业简称" prop="bussinessName" :label-width="formLabelWidth">
              <el-input @blur="setCache" :placeholder="bussinessNameHolder" v-model="addForm.bussinessName" auto-complete="off"></el-input>
            </el-form-item>
          </div>
         
          <div class="group-box" v-if="enterprise">
            <el-form-item label="经营地址" prop="bussinessAddress"  :label-width="formLabelWidth">
              <el-input @blur="setCache" placeholder="经营地址" v-model="addForm.bussinessAddress" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box" v-if="enterprise">
            <el-form-item label="社会信用代码" :prop="(customerFrom!='ZF_SYSN'&&enterprise)||formItemVisible(['qqPay'])?'taxNo':''" :label-width="formLabelWidth">
              <el-input @blur="setCache" placeholder="营业执照号/统一社会信用代码" v-model="addForm.taxNo" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box" v-if="enterprise">
            <el-form-item class="timestartandend-group" label="营业执照期限" :label-width="formLabelWidth">
              <div>
                <el-col :span="11">
                  <el-form-item prop="bussinessLicenseEffectiveBegin">
                    <el-date-picker @change="setCache" :clearable="false" placeholder="开始日期" value-format="yyyy-MM-dd" class="full-width" v-model="addForm.bussinessLicenseEffectiveBegin" type="date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="bussinessLicenseEffectiveEnd">
                    <el-date-picker @change="setCache" :clearable="false" placeholder="结束日期" value-format="yyyy-MM-dd" class="full-width" v-model="addForm.bussinessLicenseEffectiveEnd" type="date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </div>

            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item class="full-width" label="法人证件类型" :prop="(customerFrom!='ZF_SYSN'&&enterprise)||formItemVisible(['qqPay'])?'idType':''" :label-width="formLabelWidth">
              <el-select @change="setCache" placeholder="法人证件类型" size="small" v-model="addForm.idType">
                <el-option v-for="item in idTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item label="注册地址" :prop="(customerFrom!='ZF_SYSN')||formItemVisible(['aliPay'])?'registerAddress':''" :label-width="formLabelWidth">
              <el-input @blur="setCache" placeholder="注册地址" v-model="addForm.registerAddress" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item label="经营类型"  :prop="(customerFrom!='ZF_SYSN')||formItemVisible(['wechatPay','aliPay','qqPay'])?'category':''" :label-width="formLabelWidth">
              <el-select @change="setCache" placeholder="经营类型" class="full-width" size="small" v-model="addForm.category">
                <el-option v-for="item in slotsActions" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="group-box">
            <el-form-item :prop="(customerFrom!='ZF_SYSN'&&enterprise)||formItemVisible(['aliPay'])?'orgCode':''" label="所在地区" :label-width="formLabelWidth">
              <el-cascader class="full-width" placeholder="所在地区" :options="optionsArea" v-model="myarea">
              </el-cascader>
            </el-form-item>
          </div>

          <div class="group-box">
            <el-form-item label="客服电话"  :prop="(customerFrom!='ZF_SYSN')||formItemVisible(['wechatPay','aliPay','qqPay'])?'servicePhone':''" :label-width="formLabelWidth">
              <el-input @blur="setCache" placeholder="客服电话" v-model="addForm.servicePhone" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item label="法人证件号" :prop="(customerFrom!='ZF_SYSN'&&enterprise)||formItemVisible(['qqPay'])?'idCard':''" :label-width="formLabelWidth">
              <el-input  @blur="setCache" placeholder="法人证件号" v-model="addForm.idCard" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item class="timestartandend-group" label="证件有效期" :label-width="formLabelWidth">
              <div>
                <el-col :span="11">
                  <el-form-item prop="idNoEffectiveBegin">
                    <el-date-picker @change="setCache" :clearable="false" placeholder="开始日期" value-format="yyyy-MM-dd" class="full-width" v-model="addForm.idNoEffectiveBegin" type="date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="idNoEffectiveEnd">
                    <el-date-picker @change="setCache" :clearable="false" placeholder="结束日期" value-format="yyyy-MM-dd" class="full-width" v-model="addForm.idNoEffectiveEnd" type="date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </div>
            </el-form-item>
          </div>
          <!-- <p>{{customerFrom}}</p> -->
          <div class="group-box">
            <el-form-item v-if="enterprise" label="法人姓名" :prop="(customerFrom!='ZF_SYSN'&&enterprise)||formItemVisible(['aliPay','qqPay'])?'legalPerson':''" :label-width="formLabelWidth">
              <el-input   placeholder="法人姓名" @blur="legalPersonBlur" v-model="addForm.legalPerson" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box" v-if="formItemVisible(['unionPay'])">
            <el-form-item label="MCC" prop="mcc" :label-width="formLabelWidth">
              <el-input @blur="setCache" :placeholder="'请输入mcc'" v-model="addForm.mcc" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box" v-if="formItemVisible(['unionPay'])">
            <el-form-item label="地区码" prop="channelOrgCode" :label-width="formLabelWidth">
              <el-input @blur="setCache" :placeholder="'请输入地区码'" v-model="addForm.channelOrgCode" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box" v-if="formItemVisible(['unionPay'])">
            <el-form-item label="终端号" prop="terminalNo" :label-width="formLabelWidth">
              <el-input @blur="setCache" :placeholder="'请输入终端号'" v-model="addForm.terminalNo" auto-complete="off"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </div>
    <div class="add-form-box">
      <div class="title-back">结算信息</div>
      <div class="content">
        <div class="block-box">
          <div class="group-box">
            <el-form-item label="账户类型" :prop="(customerFrom!='ZF_SYSN')?'accountType':''" :label-width="formLabelWidth">
              <el-radio  :disabled="personal" v-model="addForm.accountType" label="0">对公</el-radio>
              <el-radio v-model="addForm.accountType" label="1">对私</el-radio>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item label="结算方式" :prop="(customerFrom!='ZF_SYSN')?'settleMode':''" :label-width="formLabelWidth">
              <el-radio v-model="addForm.settleMode" label="T1">T1</el-radio>
              <el-radio :disabled="true" v-model="addForm.settleMode" label="T0">T0</el-radio>
            </el-form-item>
          </div>
          <div class="group-box">
             <el-form-item label="账户名称" :prop="(customerFrom!='ZF_SYSN'&&enterprise)||formItemVisible(['aliPay','qqPay'])?'accountName':''" :label-width="formLabelWidth">
              <el-input  placeholder="账户名称" :disabled="accountNameDis" v-model="addForm.accountName" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item label="收款人账户号" :prop="(customerFrom!='ZF_SYSN'&&enterprise)||formItemVisible(['aliPay','qqPay'])?'accountNo':''" :label-width="formLabelWidth">
              <el-input  @blur="accountNoBlur" placeholder="收款人账户号" v-model="addForm.accountNo" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="full-group">
            <el-form-item  class="full-width" label="开户银行" prop="bankCode" :label-width="formLabelWidth">
              <el-autocomplete  class="full-width" v-model="addForm.bankName" :fetch-suggestions="bankChange" placeholder="开户银行" @select="bankSelect"></el-autocomplete>
            </el-form-item>
          </div>
          <div class="full-group">
            <el-form-item class="full-width" :label-width="formLabelWidth"  :prop="(customerFrom!='ZF_SYSN')||formItemVisible(['qqPay'])?'unionCode':''"  label="选择支行">
              <el-autocomplete class="full-width" v-model="addForm.branchName" :fetch-suggestions="branchChange" placeholder="选择支行(需要先选择开户行)" @select="branchSelect"></el-autocomplete>
            </el-form-item>
          </div>
          <!-- <div class="group-box">
            <el-form-item label="联行号" prop="unionCode" :label-width="formLabelWidth">
              <el-input placeholder="需要先选择支行" :disabled="true" v-model="addForm.unionCode" auto-complete="off"></el-input>
            </el-form-item>
          </div> -->

          <div v-if="enterprise&&privateperson" class="group-box">
            <el-form-item label="预留手机号" :prop="addForm.accountType=='1'?'reservedPhoneNo':''"   :label-width="formLabelWidth">
              <el-input @blur="setCache" placeholder="预留手机号" v-model="addForm.reservedPhoneNo" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div v-if="enterprise&&privateperson" class="group-box">
            <el-form-item label="持卡人证件号" :prop="addForm.accountType=='1'?'settleIdCard':''" :label-width="formLabelWidth">
              <el-input @blur="setCache" placeholder="持卡人证件号" v-model="addForm.settleIdCard" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box">
          </div>
        </div>
      </div>
    </div>

    <!-- 照片 -->
    <div class="add-form-box">
      <div class="title-back">上传图片</div>
      <div class="content">
        <div class="upload-group mcp-upload" ref="upImgBox">
          <div class="img-box" v-if="privateperson">
            <el-form-item  :prop="(customerFrom!='ZF_SYSN')?'settleCardImgId':''">
              <upload-img :isRequired="(customerFrom!='ZF_SYSN')"  :label="'结算卡照'" :upType="'SETTLE_CARD_IMG'" :imgKey="'settleCardImg'" :defaultImg='imgUrlList.settleCardImg' ref="SETTLE_CARD_IMG" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
            </el-form-item>
          </div>
          <div class="img-box" v-if="enterprise&&(company)">
            <el-form-item>
              <upload-img  :label="'开户许可证'" :upType="'ACCOUNT_OPENING_LICENSE'" :imgKey="'accountLicenseImg'" :defaultImg='imgUrlList.accountLicenseImg' ref="ACCOUNT_OPENING_LICENSE" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
            </el-form-item>
          </div>
          <div class="img-box" v-if="enterprise&&(company||privateperson)">
            <el-form-item  :prop="(customerFrom!='ZF_SYSN')||formItemVisible(['qqPay'])?'identityFrontImgId':''">
              <upload-img :isRequired="(customerFrom!='ZF_SYSN')||formItemVisible(['qqPay'])" :label="'法人身份证人像面'" :upType="'LEGAL_PERSON_ID_POSITIVE'" :imgKey="'identityFrontImg'" :defaultImg='imgUrlList.identityFrontImg' ref="LEGAL_PERSON_ID_POSITIVE" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
            </el-form-item>
          </div>
          <div class="img-box" v-if="enterprise&&(company||privateperson)">
            <el-form-item :prop="(customerFrom!='ZF_SYSN')||formItemVisible(['qqPay'])?'identityBackImgId':''">
              <upload-img :isRequired="(customerFrom!='ZF_SYSN')||formItemVisible(['qqPay'])"  :label="'法人身份证国徽面'" :upType="'LEGAL_PERSON_ID_BACK'" :imgKey="'identityBackImg'" :defaultImg='imgUrlList.identityBackImg' ref="LEGAL_PERSON_ID_BACK" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
            </el-form-item>
          </div>
          <div class="img-box" v-if="enterprise&&privateperson&&unCorporatePerson">
            <el-form-item>
              <upload-img  :label="'法人手持身份证照'" :upType="'APPLICANT_WITH_ID'" :imgKey="'identityHolderImg'" :defaultImg='imgUrlList.identityHolderImg' ref="APPLICANT_WITH_ID" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
            </el-form-item>
          </div>
          <div class="img-box" v-if="enterprise&&privateperson&&unCorporatePerson">
            <el-form-item>
              <upload-img  :label="'法人手持授权书照'" :upType="'HOLD_CERTIFICATE_IMG'" :imgKey="'holdCertificateImg'" :defaultImg='imgUrlList.holdCertificateImg' ref="HOLD_CERTIFICATE_IMG" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
            </el-form-item>
          </div>
          <div class="img-box" v-if="enterprise&&(company||privateperson)">
            <el-form-item :prop="(customerFrom!='ZF_SYSN')||formItemVisible(['qqPay'])?'bussinessLicenseImgId':''">
              <upload-img  :isRequired="(customerFrom!='ZF_SYSN')||formItemVisible(['qqPay'])" :label="'商户营业执照'" :upType="'BUSSINESS_LICENSE'" :imgKey="'bussinessLicenseImg'" :defaultImg='imgUrlList.bussinessLicenseImg' ref="BUSSINESS_LICENSE" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
            </el-form-item>
          </div>
          <div class="img-box" v-if="enterprise&&privateperson&&unCorporatePerson">
            <el-form-item :prop="(customerFrom!='ZF_SYSN')?'cardHolderFrontImgId':''">
              <upload-img  :isRequired="(customerFrom!='ZF_SYSN')" :label="'持卡人身份证人像面照'" :upType="'CARDHOLDER_ID_POSITIVE'" :imgKey="'cardHolderFrontImg'" :defaultImg='imgUrlList.cardHolderFrontImg' ref="CARDHOLDER_ID_POSITIVE" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
            </el-form-item>
          </div>
          <div class="img-box" v-if="enterprise&&privateperson&&unCorporatePerson">
            <el-form-item :prop="(customerFrom!='ZF_SYSN')?'cardHolderBackImgId':''">
              <upload-img  :isRequired="(customerFrom!='ZF_SYSN')" :label="'持卡人身份证国徽面照'" :upType="'CARDHOLDER_ID_BACK'" :imgKey="'cardHolderBackImg'" :defaultImg='imgUrlList.cardHolderBackImg' ref="CARDHOLDER_ID_BACK" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
            </el-form-item>
          </div>
          <div class="img-box" v-if="enterprise&&privateperson&&unCorporatePerson">
            <el-form-item :prop="(customerFrom!='ZF_SYSN')?'cardHolderIdImgId':''">
              <upload-img :isRequired="(customerFrom!='ZF_SYSN')" :label="'持卡人手持身份证合影照'" :upType="'CARDHOLDER_WITH_ID'" :imgKey="'cardHolderIdImg'" :defaultImg='imgUrlList.cardHolderIdImg' ref="CARDHOLDER_WITH_ID" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
            </el-form-item>
          </div>
          <div class="img-box" v-if="enterprise&&privateperson&&unCorporatePerson">
            <el-form-item>
               <upload-img :label="'授权书加公章照'" :upType="'CERTIFICATE_IMG'" :imgKey="'certificateImg'" :defaultImg='imgUrlList.certificateImg' ref="CERTIFICATE_IMG" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
            </el-form-item>
          </div>
          <div class="img-box" v-if="enterprise&&(company||privateperson)">
            <el-form-item :prop="(customerFrom!='ZF_SYSN')?'storeImgId':''">
              <upload-img :isRequired="(customerFrom!='ZF_SYSN')" :label="'店内照'" :upType="'STORE_IMG'" :imgKey="'storeImg'" :defaultImg='imgUrlList.storeImg' ref="STORE_IMG" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
            </el-form-item>
          </div>
          <div class="img-box" v-if="enterprise&&(company||privateperson)">
            <el-form-item :prop="(customerFrom!='ZF_SYSN')?'placeImgId':''">
                <upload-img  :isRequired="(customerFrom!='ZF_SYSN')" :label="'门头照'" :upType="'PLACE_IMG'" :imgKey="'placeImg'" :defaultImg='imgUrlList.placeImg' ref="PLACE_IMG" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
            </el-form-item>
          </div>
          <div class="img-box" v-if="enterprise&&(company||privateperson)">
            <el-form-item>
                <upload-img  :label="'收银台照'" :upType="'CASH_SPACE_IMG'" :imgKey="'cashSpaceImg'" :defaultImg='imgUrlList.cashSpaceImg' ref="CASH_SPACE_IMG" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
            </el-form-item>
          </div>
          <div class="img-box">
            <el-form-item>
              <upload-img :label="'其他照片'" :upType="'OTHERS'" :imgKey="'othersImg'" :defaultImg='imgUrlList.othersImg' ref="OTHERS" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
            </el-form-item>
          </div>
        </div>
      </div>
    </div>

  </el-form>

</template>
<style lang="scss">
// @import "../../../assets/scss-pc/dialog-detail.scss";
.upload-group {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
.paystatusSuccess {
  text-align: center;
  .msgbox {
    width: 100%;
    display: flex;
    .icon-box {
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #67c23a;
    }
    .row {
      width: 100%;
      color: #67c23a;
      padding: 30px 20px;
      h2 {
        padding: 10px;
        font-size: 22px;
      }
      p {
        font-size: 14px;
      }
    }
  }
}
.add-form-box {
  border: 1px solid #e6ebf5;
  margin-bottom: 10px;
  .title-back {
    border-bottom: 1px solid #e6ebf5;
    background: #f0f0f0;
    font-weight: bold;
    padding: 5px 10px;
  }
  .title-box{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .text{
      flex: 1;
    }
    .title-content{
      // flex: 0;
    }
  }
  .content {
    padding: 10px 20px;
    overflow: hidden;
    .block-box {
      display: flex;
      flex-wrap: wrap;
    }
    .group-box {
      flex: 1;
      flex: 0 0 378px;
      // flex: 0 0 50%;
      .timestartandend-group {
        width: 378px;
      }
      // max-width: 400px;
    }
    .full-group {
      flex: 0 0 100%;
    }
  }
  .el-form-item__label {
    padding-bottom: 0px;
  }
}
.span-box-2 {
  display: flex;
  & > div {
    flex: 1;
  }
  // & > div:nth-child(1) {
  //   margin-left: 10px;
  // }
  & > div:nth-child(2) {
    margin-left: 10px;
  }
}

.timestartandend-group {
  width: 100%;
  display: flex;
  background-image: none;
  flex-direction: row;
  & > .el-form-item__label {
    position: absolute;
  }
  // &.full-width {
  & > .el-form-item__content {
    width: 100%;
    display: flex;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    width: 100%;
    // width: -moz-calc(100% - 130px);
    // width: -webkit-calc(100% - 130px);
    // width: calc(100% - 130px);
    .el-form-item {
      margin-bottom: 0px;
    }
    .el-input__inner {
      border: 0px;
    }
  }
  // }
  .el-form-item__label {
    white-space: nowrap;
    // margin-left: 20px;
  }
  .el-date-editor {
    display: flex;
  }
  .el-date-editor .el-range__close-icon {
    position: absolute;
    top: 0;
    right: 3px;
  }
  input {
    padding-right: 0px;
    border: 0px;
    background: none;
  }
  .el-input__suffix {
    right: 0;
  }
  .el-date-editor .el-input__inner {
    padding-left: 8px;
  }
  .el-date-editor .el-input__prefix {
    display: none;
  }
  .el-input__icon {
    width: 12px;
  }

  .el-date-editor {
    position: relative;
  }
}
.mcp-upload {
  margin: 0 auto;
  display: flex;
  // .el-form-item.imgs-box{
  //   min-height:188px;
  //   min-width: 188px;
  //   flex: 0 0 188px;
  //   display: flex;
  //   flex-wrap: wrap;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  //   box-sizing: border-box;
  //   border: 1px solid #ebeef5;
  //   margin: 2px !important;
  //   h3 {
  //     padding: 10px 0px 5px;
  //     font-size: 14px;
  //     font-weight: 500;
  //   }
      .img-box{
        width: 200px;
        height: 200px;
        // flex: 0 0 200px;
        flex: 1;
        // margin-top: 15px;
        .el-form-item__error{
          top: 88%;
          left: 13px;
        }
        .avatar{
          width: 160px;
          height: 127px;
          display: block;
        }
      }
  // }
  .avatar-uploader-icon {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import Vue from "vue";
import IScrollView from "vue-iscroll-view";
import IScroll from "iscroll";
Vue.use(IScrollView, IScroll);
// 组件end
import "@src/common/filters";
import { areaOrgcode } from "@src/common/orgcode";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import utils from "@src/common/utils";
import secret from "@src/common/secret";
import { phoneNumVerify, idCardVerify } from "@src/common/regexp";
import { mapState } from 'vuex'
import {
  getOnlineFacilitatorOrders,
  getMctManageOrdersAdd,
  // getBankList
} from "@src/apis";
import {
  getBrankbank,
  getBranchbank} from "@src/apis/brankbank.js";
import UploadImg from "@src/components/UploadImg";
import bussinessTypeJson from "@src/data/bussinessType.json";
import { banks } from "@src/common/bank";
import settleMode from "@src/data/settleMode.json";
export default {
  name: "mer_manage_orders_add",
  props: {
    rowData: {
      type: Object
    },
    stepActive: {
      type: Number
    },
    formType: {
      type: String
    }
  },
  components: {
    UploadImg
  },
  mixins: [mixinsPc],
  data() {
    return {
      allImgNum: 0,
      searchImgNum: 0,
      proxyFlagDis: false,
      timeout: "",
      dialogLoading: "",
      corporatePerson: false,// 法人
      unCorporatePerson: false,//非法人
      enterprise: true,//企业
      personal: true,// 个人
      company: true,// 对公
      privateperson: true,// 对私
      companyNoDisabled: false,
      settleIdCardVisible: true,
      restaurants: [],
      accountNameDis: true,
      settleModeOption: settleMode,
      encryptKey: "",// 加密key
      signKey: "",// 签名key
      optionsArea: utils.areaPicherOptions(), //省市县数据
      labelPosition: "right",
      bankOptions: banks,
      slotsActions: bussinessTypeJson,
      // bankAreaVisible: false,
      // branchNameVisible: true,
      bankCity: "",
      bankCode: "",
      branchBankOptions: [],
      // 身份证正面
      uploadApi: "",
      addStep: "add",
      stepTab: {
      },
      customerNoDisabled: false,
      senImgAll: {
        BUSSINESS_LICENSE: { //商户营业执照照片
          id: 'bussinessLicenseImgId',
          ref: 'bussinessLicenseImg'
        },
        ACCOUNT_OPENING_LICENSE: { //开户许可证照片
          id: 'accountLicenseImgId',
          ref: 'accountLicenseImg'
        },
        LEGAL_PERSON_ID_POSITIVE: { //法人身份证人像面
          id: 'identityFrontImgId',
          ref: 'identityFrontImg'
        },
        LEGAL_PERSON_ID_BACK: { //法人身份证国徽面
          id: 'identityBackImgId',
          ref: 'identityBackImg'
        },
        APPLICANT_WITH_ID: { // 法人手持身份证合影照片
          id: 'identityHolderImgId',
          ref: 'identityHolderImg',
        },
        STORE_IMG: { // 店内照片
          id: 'storeImgId',
          ref: 'storeImg',
        },
        PLACE_IMG: { // 门头照片
          id: 'placeImgId',
          ref: 'placeImg',
        },
        CASH_SPACE_IMG: { // 收银台照片
          id: 'cashSpaceImgId',
          ref: 'cashSpaceImg',
        },
        SETTLE_CARD_IMG: { // 结算卡照片
          id: 'settleCardImgId',
          ref: 'settleCardImg',
        },
        CERTIFICATE_IMG: { // 授权照片
          id: 'certificateImgId',
          ref: 'certificateImg',
        },
        HOLD_CERTIFICATE_IMG: { // 法人手持授权照片
          id: 'holdCertificateImgId',
          ref: 'holdCertificateImg',
        },
        CARDHOLDER_ID_POSITIVE: { // 持卡人身份证人像面照片
          id: 'cardHolderFrontImgId',
          ref: 'cardHolderFrontImg',
        },
        CARDHOLDER_ID_BACK: { // 持卡人身份证国徽面照片
          id: 'cardHolderBackImgId',
          ref: 'cardHolderBackImg',
        },
        CARDHOLDER_WITH_ID: { // 持卡人手持身份证合影照片
          id: 'cardHolderIdImgId',
          ref: 'cardHolderIdImg',
        },
        OTHERS: { // 其他照片
          id: 'othersImgId',
          ref: 'othersImg',
        }
      },
      myarea: [],
      customerLOCAL: "LOCAL",
      addFormDefault: {
        customerFrom: "LOCAL",
        bankName: '',
        bankCode: '',
        branchName: '',
        version: "1.0.0",
        customerType: "1",
        accountType: "0",
        settleMode: "T1",
        service: "",
        companyNo: "",
        comCustomerNo: "",
        enterpriseName: "",
        bussinessName: "",
        proxyFlag: "",
        legalPerson: "",
        bussinessAddress: "",
        registerAddress: "",
        servicePhone: "",
        contactName: "",
        contactPhone: "",
        contactMobile: "",
        contactEmail: "",
        idType: "",
        idCard: "",
        idNoEffectiveBegin: "",
        idNoEffectiveEnd: "",
        taxNo: "",
        bussinessLicenseEffectiveBegin: "",
        bussinessLicenseEffectiveEnd: "",
        orgCode:"",
        accountName: "",
        accountNo: "",
        unionCode: "",
        reservedPhoneNo: "",
        settleIdCard: "",
        category: "",
        wechatScansRate: "",
        alipayScansRate: "",
        wechatAppRate: "",
        alipayAppRate: "",
        wechatH5Rate: "",
        alipayH5Rate: "",
        unionPayScansRate: "", // 银联1000以下费率
        unionPayScansUpRate: "", // 银联1000以上费率
        qqScansRate: "", // QQ费率
        quickPayRate: "", // 快捷支付手续费率
        quickPayDebitRate: "", // 无卡快捷借记卡手续费率
        quickPayCreditRate: "", // 无卡快捷贷记卡手续费率
        gateWayPayDebitRate: "", // 网关支付借记卡手续费率
        gateWayPayCreditRate: "", // 网关支付贷记卡手续费率
        t0CashCostFixed: "",
        bussinessLicenseImgId: "",//商户营业执照照片
        accountLicenseImgId: "",//开户许可证照片
        identityFrontImgId: "",//法人身份证人像面
        identityBackImgId: "",//法人身份证国徽面
        identityHolderImgId: "",//法人手持身份证合影照片
        storeImgId: "",//店内照片
        placeImgId: "",//门头照片
        cashSpaceImgId: "",//收银台照片
        settleCardImgId: "",//结算卡照片
        certificateImgId: "",//授权照片
        holdCertificateImgId: "",//法人手持授权照片
        cardHolderFrontImgId: "",//持卡人身份证人像面照片
        cardHolderBackImgId: "",//持卡人身份证国徽面照片
        cardHolderIdImgId: "",//持卡人手持身份证合影照片
        othersImgId: ""//其他照片
      },
      payTypeArr:[],
      payOptions:[
        // formItemVisible(['wechatPay','aliPay','qqPay','quickPay','unionPay'])
        {
          value: 'wechatPay',
          label: '微信'
        },
        {
          value: 'aliPay',
          label: '支付宝'
        },
        {
          value: 'qqPay',
          label: 'QQ'
        },
        {
          value: 'unionPay',
          label: '银联扫码'
        },
        {
          value: 'quickPay',
          label: '快捷'
        }
      ],
      addForm: {
       orgCode:""
      },
      addFormRules: {
        comCustomerNo: [{ required: true, message: "请输入接入机构商户编号", trigger: "blur,change" }],
        // legalPerson: [{ required: true, message: "请输入法人姓名", trigger: "blur,change" }],
        customerFrom: [{ required: true, message: "请选择商户来源", trigger: "blur,change" }],
        enterpriseName: [{ required: true, message: "请输入商户企业名称/申请人名称", trigger: "blur,change" }],
        bussinessName: [{ required: true, message: "请输入商户简称/店铺名称", trigger: "blur,change" }],
        customerType: [{ required: true, message: "请选择商户类型", trigger: "blur,change" }],
        proxyFlag: [{ required: true, message: "请选择是否开通代付", trigger: "blur,change" }],
        legalPerson: [{ required: true, message: "请填写法人姓名", trigger: "blur,change" }],
        registerAddress: [{ required: true, message: "请填写注册地址", trigger: "blur,change" }],
        servicePhone: [{ required: true, message: "请填写客服电话", trigger: "blur,change" }],
        contactName: [{ required: true, message: "请填写联系人姓名", trigger: "blur,change" }],
        idType: [{ required: true, message: "请选择证件类型", trigger: "blur,change" }],
        taxNo: [{ required: true, message: "请填写统一社会信用代码", trigger: "blur,change" }],
        orgCode: [{ required: true, message: "请选择区域", trigger: "blur,change" }],
        accountName: [{ required: true, message: "请填写收款人姓名", trigger: "blur,change" }],
        accountNo: [{ required: true, message: "请填写收款人账户号", trigger: "blur,change" }],
        accountType: [{ required: true, message: "请选择账户类型", trigger: "blur,change" }],
        unionCode: [{ required: true, message: "请选择银行", trigger: "blur,change" }],
        reservedPhoneNo: [{ required: true, message: "请填写银行预留手机号", trigger: "blur,change" }],
        idCard: [{ required: true, message: "请填写法人证件号", trigger: "blur,change" }],
        settleIdCard: [{ required: true, message: "请填写持卡人证件号码", trigger: "blur,change" }],
        category: [{ required: true, message: "请选择经营类型", trigger: "blur,change" }],
        settleMode: [{ required: true, message: "请选择结算方式", trigger: "blur,change" }],
        mcc: [{ required: true, message: "请输入MCC", trigger: "blur,change" }],
        channelOrgCode: [{ required: true, message: "请输入地区码", trigger: "blur,change" }],
        terminalNo: [{ required: true, message: "请输入终端号", trigger: "blur,change" }],
        wechatScansRate: [{ required: true, message: "请填写微信扫码费率", trigger: "blur,change" }],
        alipayScansRate: [{ required: true, message: "请填写支付宝扫码费率", trigger: "blur,change" }],
        wechatAppRate: [{ required: true, message: "请填写微信APP费率", trigger: "blur,change" }],
        alipayAppRate: [{ required: true, message: "请填写支付宝APP费率", trigger: "blur,change" }],
        wechatH5Rate: [{ required: true, message: "请填写微信H5费率", trigger: "blur,change" }],
        alipayH5Rate: [{ required: true, message: "请填写支付宝H5费率", trigger: "blur,change" }],
        unionPayScansRate: [{ required: true, message: "请填写银联1000以下费率", trigger: "blur,change" }],
        unionPayScansUpRate: [{ required: true, message: "请填写银联1000以上费率", trigger: "blur,change" }],
        qqScansRate: [{ required: true, message: "请填写QQ费率", trigger: "blur,change" }],
        quickPayRate: [{ required: true, message: "请填写快捷支付手续费率", trigger: "blur,change" }],
        quickPayDebitRate: [{ required: true, message: "请填写无卡快捷借记卡手续费率", trigger: "blur,change" }],
        quickPayCreditRate: [{ required: true, message: "请填写无卡快捷贷记卡手续费率", trigger: "blur,change" }],
        gateWayPayDebitRate: [{ required: true, message: "请填写网关支付借记卡手续费率", trigger: "blur,change" }],
        gateWayPayCreditRate: [{ required: true, message: "请填写网关支付贷记卡手续费率", trigger: "blur,change" }],
        bussinessLicenseImgId: [{ required: true, message: "请上传商户营业执照照片", trigger: "blur,change" }],
        identityFrontImgId: [{ required: true, message: "请上传法人身份证人像面", trigger: "blur,change" }],
        identityBackImgId: [{ required: true, message: "请上传法人身份证国徽面", trigger: "blur,change" }],
        identityHolderImgId: [{ required: true, message: "请上传法人手持身份证合影照片", trigger: "blur,change" }],
        storeImgId: [{ required: true, message: "请上传店内照片", trigger: "blur,change" }],
        placeImgId: [{ required: true, message: "请上传门头照片", trigger: "blur,change" }],
        cashSpaceImgId: [{ required: true, message: "请上传收银台照片", trigger: "blur,change" }],
        settleCardImgId: [{ required: true, message: "请上传结算卡照片", trigger: "blur,change" }],
        certificateImgId: [{ required: true, message: "请上传授权照片", trigger: "blur,change" }],
        holdCertificateImgId: [{ required: true, message: "请上传法人手持授权照片", trigger: "blur,change" }],
        cardHolderFrontImgId: [{ required: true, message: "请上传持卡人身份证人像面照片", trigger: "blur,change" }],
        cardHolderBackImgId: [{ required: true, message: "请上传持卡人身份证国徽面照片", trigger: "blur,change" }],
        cardHolderIdImgId: [{ required: true, message: "请上传持卡人手持身份证合影照", trigger: "blur,change" }],
        contactMobile: [
          { required: true, message: "请输入联系人手机号", trigger: "blur,change" },
          { required: true, validator: phoneNumVerify, trigger: "blur,change" }
        ]
      },
      formLabelWidth: "140px"
    };
  },
  methods: {
    formItemVisible(dataList){
      let ifshow = dataList.some(item=>{
        return (this.payTypeArr.some(paytype=>{return item == paytype}))
      })
      return ifshow;
    },
    // 结算卡输入失去焦点 获取银行信息
    accountNoBlur() {
      this.getBankListFn();
    },
    // 根据银行卡号码查询银行名称
    getBankListFn() {
      getBrankbank()({
        accountNo: this.addForm.accountNo + ''
      }).then(res => {
        let data = res.data;
        if (res.code == "00" && Object.keys(res.data).length > 0) {
          this.$set(this.addForm, 'bankCode', data.bankCode + '');
          this.$set(this.addForm, 'bankName', data.bankName + '');
          this.getBranchList();
          this.clearBranck();
        }
      })
    },
    // 银行列表
    async bankChange(val, cb) {
      let bankOptions = this.bankOptions.map(item => {
        return {
          value: item.name,
          ...item
        }
      })
      cb(bankOptions);
    },
    // 支行模糊搜索
    async branchChange(val, cb) {
      this.$set(this.addForm, 'branchBankName', val);
      await this.getBranchList().then((res) => {
        let branchBankOptions = res.map(item => {
          return {
            value: item.branchName,
            ...item
          }
        })
        cb(branchBankOptions);
      }).catch((err) => {
        console.log(err);
      });
    },
    bankSelect(item) {
      console.log(item);
      this.$set(this.addForm, 'bankCode', item.code + '');
      this.$set(this.addForm, 'bankName', item.name + '');
    },
    branchSelect(item) {
      this.$set(this.addForm, 'unionCode', item.unionCode);
      this.$set(this.addForm, 'branchName', item.branchName);
    },
    clearBranck() {
      this.$set(this.addForm, 'branchName', '');
      this.$set(this.addForm, 'unionCode', '');
    },
    async  getBranchList() {
      let bankCode = this.addForm.bankCode;
      let branchBankName = this.addForm.branchBankName;
      if (!bankCode) {
        this.branchBankOptions = [];
        return this.branchBankOptions
      } else {
        if (!branchBankName) {
          branchBankName = this.bankOptions.find(
            r => r.code == bankCode
          ).name
        }
        return await getBranchbank()({
          bankCode: bankCode + "",
          branchBankName: branchBankName
        }).then((res) => {
          if (res.code == '00') {
            this.branchBankOptions = res.data
          }
          return this.branchBankOptions
        })
      }

    },
    senImgAllHandle(agentNo, getData) {
      this.allImgNum = 0;
      this.searchImgNum = 0;
      for (let [key, val] of Object.entries(this.senImgAll)) {
        let imgId = val.id;
        if (getData[imgId]) {
          this.allImgNum++;
          this.searchImg(agentNo, getData[imgId], key)
        }
      }
      // console.log('所有图片加载完毕！');
    },
    // 查询图片
    searchImg(agentNo, imgId, imgType_) {
      // this.$emit("closeDisHandle",true);
      this.$nextTick(() => {
        if (this.$refs[imgType_]) {
          this.$refs[imgType_].loadingImg();
        }
      })
      this.getEncryptKey(agentNo).then((res) => {
        let encryptKey = res.encryptKey;
        let signKey = res.signKey;
        let queryEncryptData = secret.Encrypt({ // 加密数据块
          id: imgId,
        }, encryptKey);
        getMctManageOrdersAdd()(
          {
            key: signKey,
            version: "1.0.0",
            service: 'img.download',
            companyNo: agentNo,
            encryptData: queryEncryptData
          }
        ).then((res) => {
          //  this.$emit("closeDisHandle",false);
          this.searchImgNum++;
          if (res.code == "00") {
            let encryptData = res.encryptData;
            let getImages = secret.Decrypt(encryptData, encryptKey);
            getImages = JSON.parse(getImages);
            let imgString = getImages.imgString;
            // let imgRef = this.senImgAll[imgType].ref;
            this.$nextTick(() => {
              if (this.$refs[imgType_]) {
                this.$refs[imgType_].setImg('data:image/png;base64,' + imgString);
              }
            })
          } else {
            console.log(res);
          }
          this.$nextTick(() => {
            if (this.$refs[imgType_]) {
              this.$refs[imgType_].closeImgLoading();
            }
          })
        })

      }).catch((error) => {
        console.log(error);
      })
    },
    saveImgId(sendUpType, sendId) {
      let imgTypes = { ...this.senImgAll };
      for (let [imgType, imgObj] of Object.entries(imgTypes)) {
        let imgId = imgObj.id;
        if (sendUpType == imgType) {
          this.$set(this.addForm, imgId, sendId)
        }
      }
      this.setCache();
    },
    saveOneImg(imgkey, data, upType) {
      let imgbase64 = data.split(';base64,')[1];
      let encryptKey = this.encryptKey;
      if (!this.addForm.companyNo) {
        this.$message({
          message: '请先填写有效服务商编号',
          type: 'warning'
        });
        this.$refs[upType].clearImg();
        return false;
      }
      let sendForm = utils.pickObj(this.addForm, [
        "version",//版本号
        "companyNo"//机构编号
      ])
      // console.log(sendForm);
      let changeObj = {
        imgType: upType,
        imgString: imgbase64,
      }
      let encryptData = secret.Encrypt({ ...changeObj }, encryptKey)// 加密数据块
      this.$emit('saveDisHandle', true);
      getMctManageOrdersAdd()({
        key: this.signKey,
        service: "img.upload",
        encryptData: encryptData,
        ...sendForm
      }).then((res) => {
        this.$emit('saveDisHandle', false);
        if (res.code == "00") {
          let getData = JSON.parse(secret.Decrypt(res.encryptData, encryptKey));
          this.saveImgId(upType, getData.id);
        } else {
          this.$refs[upType].clearImg();
          this.$message({
            message: res.msg,
            type: "warning",
            center: true
          });
        }
      })
    },
    // 数字除以100，元转分
    accMulNum(data, num = 0.01) {
      return data ? utils.accMul(data, num) : "";
    },

    // 保存
    addSave() {
     this.$nextTick(()=>{
        this.$refs['addForm'].validate((valid) => {
        if (valid) {
          let encryptKey = this.encryptKey;
          if (encryptKey) {
            let newAddForm = { ...this.addForm };
            newAddForm.wechatScansRate = this.accMulNum(newAddForm.wechatScansRate);
            newAddForm.alipayScansRate = this.accMulNum(newAddForm.alipayScansRate);
            newAddForm.wechatAppRate = this.accMulNum(newAddForm.wechatAppRate);
            newAddForm.alipayAppRate = this.accMulNum(newAddForm.alipayAppRate);
            newAddForm.wechatH5Rate = this.accMulNum(newAddForm.wechatH5Rate);
            newAddForm.alipayH5Rate = this.accMulNum(newAddForm.alipayH5Rate);
            newAddForm.unionPayScansRate = this.accMulNum(newAddForm.unionPayScansRate);
            newAddForm.unionPayScansUpRate = this.accMulNum(newAddForm.unionPayScansUpRate);
            newAddForm.qqScansRate = this.accMulNum(newAddForm.qqScansRate);
            newAddForm.quickPayDebitRate = this.accMulNum(newAddForm.quickPayDebitRate);
            newAddForm.quickPayCreditRate = this.accMulNum(newAddForm.quickPayCreditRate);
            newAddForm.gateWayPayCreditRate = this.accMulNum(newAddForm.gateWayPayCreditRate);
            newAddForm.quickPayRate = this.accMulNum(newAddForm.quickPayRate);
            newAddForm.gateWayPayDebitRate = this.accMulNum(newAddForm.gateWayPayDebitRate);
            if (this.formType == 'ADD') {
              console.log({
                comCustomerNo: this.addForm.comCustomerNo,
                linkMan: this.addForm.contactName,
                contactName: this.addForm.contactName,
                phoneNo: this.addForm.contactMobile,
                ...newAddForm
              });
              let secretData = secret.Encrypt({
                comCustomerNo: this.addForm.comCustomerNo,
                linkMan: this.addForm.contactName,
                contactName: this.addForm.contactName,
                phoneNo: this.addForm.contactMobile,
                ...newAddForm
              }, encryptKey)// 加密数据块
              let sendData = utils.pickObj(this.addForm, [
                'version', 'companyNo'
              ]);
              getMctManageOrdersAdd()({
                encryptData: secretData,
                key: this.signKey,
                service: "customer.register",
                ...sendData
              }).then((res) => {
                if (res.code == "00") {
                  this.$message({
                    message: "恭喜你，新增数据成功",
                    type: "success",
                    center: true
                  });
                  this.$emit("addSuccess");
                  this.clearCache();
                } else {
                  this.$message({
                    message: res.msg,
                    type: "warning",
                    center: true
                  });
                }
              })
            }
            if (this.formType == 'EDIT') {
              console.log({
                comCustomerNo: this.addForm.comCustomerNo,
                linkMan: this.addForm.contactName,
                contactName: this.addForm.contactName,
                phoneNo: this.addForm.contactMobile,
                ...newAddForm
              });
              let secretData = secret.Encrypt({
                customerNo: this.addForm.comCustomerNo,
                linkMan: this.addForm.contactName,
                contactName: this.addForm.contactName,
                phoneNo: this.addForm.contactMobile,
                ...newAddForm
              }, encryptKey)// 加密数据块
              let sendData = utils.pickObj(this.addForm, [
                'version', 'companyNo'
              ]);

              getMctManageOrdersAdd()({
                encryptData: secretData,
                key: this.signKey,
                service: "customer.modify",
                ...sendData
              }).then((res) => {
                if (res.code == "00") {
                  this.$message({
                    message: "恭喜你，修改数据保存成功",
                    type: "success",
                    center: true
                  });
                  this.$emit("addSuccess");
                } else {
                  this.$message({
                    message: res.msg,
                    type: "warning",
                    center: true
                  });
                }
              })
            }
          } else {
            this.$message({
              message: "未找到该服务商的加密key",
              type: "warning",
              center: true
            });
          }
        } else {
          this.$message({
            message: "请仔细检查填写信息是否无误！",
            type: "warning",
            center: true
          });
          $(".el-dialog__wrapper").animate({
            scrollTop: 0
          }, 300);
        }
      })
     })
    },
    // 费率搜索
    querySearch(queryString, cb) {
      var restaurants = this.settleModeOption;
      restaurants = restaurants.map((item) => {
        return {
          value: utils.accMul(item.code, 100) + ""
          // address: item.code
        }
      })
      cb(restaurants);
    },
    clearValidate() {
      this.$nextTick(() => {
        this.$refs['addForm'].clearValidate();
      })
    },
    resetFields() {
      this.$refs['addForm'].resetFields();
    },
    getEncryptKey(agentNo) {
      // 得到加密key
      return new Promise(function (resolve, reject) {
        getOnlineFacilitatorOrders()({
          agentName: "",
          endTime: "",
          limit: 1,
          page: 1,
          startTime: "",
          status: "",
          agentNo: agentNo
        }).then((res) => {
          if (res.code == "00") {
            if (res.data.length > 0) {
              resolve({
                encryptKey: res.data[0].encryptKey,
                signKey: res.data[0].signKey,
              })
            }
          } else {
            this.$message({
              message: res.msg,
              type: "warning",
              center: true
            });
            reject('error');
          }
        })
      }).catch(() => {
        console.log("UserMenulistFetch--UnhandledPromiseRejectionWarning")
      });
    },
    // 获取加密key
    companyNoBlur() {
      let companyNo = this.addForm.companyNo;
      if(companyNo){
        this.getEncryptKey(companyNo).then((res) => {
          this.encryptKey = res.encryptKey;
          this.signKey = res.signKey;
        }).catch((error) => {
          console.log(error)
        });
      }
      this.setCache();
    },
    // 商户全称失去焦点
    enterpriseNameBlur() {
      let enterpriseName = this.addForm.enterpriseName;
      if (!this.addForm.bussinessName) {
        this.addForm.bussinessName = enterpriseName
      }
      this.relationship();
    },
    enterpriseNameChange() {
      this.relationship();
    },
    // 法人名称修改
    legalPersonBlur() {
      this.relationship();
    },
    legalPersonChange() {
      this.relationship();
    },
    accountNameChange() {
      this.relationship();
    },

    addDialog() {
      this.customerNoDisabled = false;
      this.addFormVisible = true;
      this.clearValidate();
    },
    banksChange(item) {
      console.log(item);
      console.log(this.addForm.bankCode)
      // 选择所属银行
      // this.bankAreaVisible = true;
      // this.branchNameVisible = false;
      // this.getBranchList();
      // this.clearBranck();
    },
    comCustomerNoFn() {
      let nowdate = new Date();
      let year = nowdate.getFullYear() + "";
      year = year.substr(2, 2);
      let mouth = nowdate.getMonth() + 1;
      mouth = mouth >= 10 ? mouth : "0" + mouth;
      let day = nowdate.getDate();
      day = day >= 10 ? day : "0" + day;
      let hour = nowdate.getHours();
      hour = hour >= 10 ? hour : "0" + hour;
      let minute = nowdate.getMinutes();
      minute = minute >= 10 ? minute : "0" + minute;
      let second = nowdate.getSeconds();
      second = second >= 10 ? second : "0" + second;
      return year + mouth + day + hour + minute + second;
    },
    //持卡人证件号显示隐藏
    checkIn() {
      if (this.dialogLoading) {
        this.dialogLoading.close();
      }
      // 清空数据 start
      this.addForm = { ...this.addFormDefault };
      this.myarea = ["","",""];
      this.resetFields();
      this.clearValidate();
       // 清空数据 end
      this.proxyFlagDis = false;
      this.$refs['addForm'].resetFields();
      this.addForm = Object.assign(this.addForm, {
        version: "1.0.0",
        customerType: "1",
        settleMode: "T1",
        accountType: "0"
      })
      this.$nextTick(() => {
        // 清空图片
        for (let [key, val] of Object.entries(this.senImgAll)) {
          let imgType = key;
          if (this.$refs[imgType]) {
            this.$refs[imgType].clearImg();
          }
        }
      })
      if (this.formType == 'ADD') {
        this.addHandle();
      }
      if (this.formType == 'EDIT') {
        this.editHandle();
      }
      this.relationship();
    },
    // 新增操作
    addHandle(){
      this.customerLOCAL = "LOCAL";
      this.companyNoDisabled = false;
      let newForm = Object.assign(this.addForm,this.getCache()); // 获取新增缓存数据
      this.myarea = newForm.orgCode ? areaOrgcode(newForm.orgCode) : [];// 地区编码转地区
      // let companyNo = this.addForm.companyNo;
      this.companyNoBlur();
      // this.addForm.proxyFlag = "1";
      this.addForm.comCustomerNo = this.comCustomerNoFn();
      if(this.addForm.companyNo){
        this.senImgAllHandle(this.addForm.companyNo,this.addForm)
      }
    },
    // 编辑操作
    editHandle(){
      if (this.searchImgNum < this.allImgNum) {
        this.cleanSearch()
      }
      this.companyNoDisabled = true;
      this.dialogLoading = this.$loading({
        target: document
          .querySelector("#dialogLoding")
          .querySelector(".el-dialog")
      });
      // 编辑
      this.$nextTick(() => {

        this.proxyFlagDis = true;
        let data = this.rowData;
        let agentNo = data.agentNo;// 服务商编号为加密key
        this.getEncryptKey(agentNo).then((res) => {
          let encryptKey = res.encryptKey;
          let signKey = res.signKey;
          this.encryptKey = encryptKey;
          this.signKey = signKey;
          let queryEncryptData = secret.Encrypt({ // 加密数据块
            customerNo: data.customerNo,
          }, encryptKey);
          //查询基本信息文字
          getMctManageOrdersAdd()({
            key: signKey,
            version: this.addForm.version,
            service: 'customer.query',
            companyNo: agentNo,
            encryptData: queryEncryptData
          }).then((res) => {
            this.dialogLoading.close();
            if (res.code == "00" && res.encryptData) {
              let encryptData = res.encryptData;
              let getData = secret.Decrypt(encryptData, encryptKey);
              getData = JSON.parse(getData);
              if (getData.customerFrom == "ZF_SYSN") {
                this.customerLOCAL = "LOCAL";
              } else {
                this.customerLOCAL = getData.customerFrom;
              }
              this.$set(this.addForm, 'bankCode', getData.bankCode)
              this.$set(this.addForm, 'branchName', getData.branchName)
              this.$set(this.addForm, 'unionCode', getData.unionCode)
              if (getData.accountNo) {
                //根据结算卡查银行列表
                this.accountNoBlur(getData.accountNo);
              }
              // 图片start
              this.senImgAllHandle(agentNo, getData);
              // 图片end
              getData.wechatScansRate = this.accMulNum(getData.wechatScansRate, 100) + ''
              getData.alipayScansRate = this.accMulNum(getData.alipayScansRate, 100) + '';
              getData.wechatAppRate = this.accMulNum(getData.wechatAppRate, 100) + '';
              getData.alipayAppRate = this.accMulNum(getData.alipayAppRate, 100) + '';
              getData.wechatH5Rate = this.accMulNum(getData.wechatH5Rate, 100) + '';
              getData.alipayH5Rate = this.accMulNum(getData.alipayH5Rate, 100) + '';
              getData.unionPayScansRate = this.accMulNum(getData.unionPayScansRate, 100) + '';
              getData.unionPayScansUpRate = this.accMulNum(getData.unionPayScansUpRate, 100) + '';
              getData.qqScansRate = this.accMulNum(getData.qqScansRate, 100) + '';
              getData.quickPayRate = this.accMulNum(getData.quickPayRate, 100) + '';
              getData.quickPayDebitRate = this.accMulNum(getData.quickPayDebitRate, 100) + '';
              getData.quickPayCreditRate = this.accMulNum(getData.quickPayCreditRate, 100) + '';
              getData.gateWayPayDebitRate = this.accMulNum(getData.gateWayPayDebitRate, 100) + '';
              getData.gateWayPayCreditRate = this.accMulNum(getData.gateWayPayCreditRate, 100) + '';
              let newObj = Object.assign(this.addForm, {
                companyNo: getData.agentNo,
                comCustomerNo: getData.customerNo,
                customerNo: getData.customerNo, // 系统返回商户编号
                contactMobile: getData.contactMobile || this.rowData.phoneNo,
              }, getData)
              this.myarea = getData.orgCode ? areaOrgcode(getData.orgCode) : [];// 地区编码转地区
              this.addForm = newObj;
              this.clearValidate();
            }

          })
        }).catch((error) => {
          this.dialogLoading.close();
          console.log(error)
        });
      })
    },
    //关系
    relationship() {
      this.enterprise = false;//企业
      this.personal = false;//个人
      this.company = false;// 对公
      this.privateperson = false;// 对私
      this.corporatePerson = false;// 法人
      this.unCorporatePerson = false;//非法人
      let addForm = this.addForm;
      let accountType = addForm.accountType; //结算类型
      let customerType = addForm.customerType; //商户类型
      let accountName = "";// 账户名称
      if (customerType == 0) {
        // 个人 只能对私 并且结算人身份证等于法人身份证
        this.personal = true;
        this.addForm.settleIdCard = this.addForm.idCard;
        accountName = addForm.enterpriseName;
        this.accountNameDis = false;
      }
      if (customerType == 1) {
        // 企业
        this.enterprise = true;
        if (accountType == 0) {
          // 对公
          this.company = true;
          this.accountNameDis = true;
          accountName = addForm.enterpriseName;
        }
        if (accountType == 1) {
          // 对私
          this.privateperson = true;
          this.addForm.settleIdCard = this.addForm.idCard;//设置结算人证件号码
          accountName = addForm.accountName == addForm.enterpriseName ? addForm.legalPerson : addForm.accountName || addForm.legalPerson;
          this.accountNameDis = false;
          //判断是是否为法人
          if (accountName == this.addForm.legalPerson) {
            // 法人
            this.corporatePerson = true;
          } else {
            // 非法人
            this.unCorporatePerson = true;
          }
        }
      }
      this.addForm.accountName = accountName; //设置用户名
      this.setCache()
    },
    //选择个人
    customerTypeSelect(val) {
      if (val == '0') {
        this.$set(this.addForm, "accountType", "1")
      }
      if (val == "1") {
        this.$set(this.addForm, "accountType", "0")
      }
      this.setCache();
    },
    setCache(){
      if (this.formType == 'ADD') {
        let sessionData = JSON.stringify(this.addForm);
        // let saveData = Object.assign(sessionData,{proxyFlag:0})
        sessionStorage.setItem("mctManageOrdersVersionCacheForm",sessionData );
      }
    },
    getCache(){
      if (this.formType == 'ADD') {
        if(sessionStorage.getItem("mctManageOrdersVersionCacheForm")){
          return JSON.parse(sessionStorage.getItem("mctManageOrdersVersionCacheForm"));
        }else{
          return {}
        }
      }
    },
    clearCache(){
      if (this.formType == 'ADD') {
        sessionStorage.setItem("mctManageOrdersVersionCacheForm", JSON.stringify({}));
      }
    },
  },
  computed: {
    // 上传图片所需start
    ...mapState({
      saveImgIdList: state => state.mctManageOrders_Pc.imgKeys, // 储存后台需要的图片id
      imgUrlList: state => state.mctManageOrders_Pc.imgKeys, // 后台返回的图片路径用于显示到页面
    }),
    // // 商户类型
    // customerType(){
    //   return this.addForm.customerType
    // },
    // 商户来源
    customerFrom(){
      return this.addForm.customerFrom
    },
    // 是否代付
    proxyFlag(){
      return this.addForm.proxyFlag;
    },
    // addForm.proxyFlag
    //商户名称label
    enterpriseNameHolder() {
      if (this.enterprise) {
        return "请填写营业与执照上一致的名称"
      } else {
        return "请填写申请人姓名"
      }
    },
    bussinessNameHolder() {
      if (this.enterprise) {
        return "请填写商户简称"
      } else {
        return "请填写申请人姓名/简称"
      }
    },
    allImgData() { // 上传图片时候需要附带的参数
      return {
        // businessNo: this.rowData.bussinessNo,
        // businessType: "customer",
        // imgString: ""
      }
    },
    imgUploadAction() {
      return `${this.oaIp}'/bussinessImg/upload'`
    },
    // 上传图片所需end

    accountTypeOptions() {
      return this.statusFilterQuery('accountType')
    },
    idTypeOptions() {
      return this.statusFilterQuery('idType')
    },
    customerTypeOptions() {
      return this.statusFilterQuery('mctManageType')
    },
    mctManageSettleModeOptions() {
      return this.statusFilterQuery('mctManageSettleMode')
    },
    isBankAreaRule() {
      if (this.addForm.branchName == "") {
        return "bankArea"
      } else {
        return ""
      }
    },

  },
  mounted() { },
  watch: {
    searchImgNum(val) {
      if (val < this.allImgNum) {
        this.$emit('saveDisHandle', true);
        // this.$emit("closeDisHandle",true);
      } else {
        this.$emit('saveDisHandle', false);
        // this.$emit("closeDisHandle",false);
      }
    },
    'myarea'(val) {
      this.addForm.orgCode = val[2];
      this.setCache()
    },
    detailsFormVisible(val) {
      this.saveLoadingStop(val);
    },
    editFormVisible(val) {
      this.saveLoadingStop(val);
    },
    "addForm.customerType"() {
      this.relationship();
      this.clearValidate();
    },
    //账户类型
    "addForm.accountType"() {
      this.relationship();
    }
  },
  created() {
    // this.saveImgId();
  }
};
</script>