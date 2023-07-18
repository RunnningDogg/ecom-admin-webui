// @ts-ignore
/* eslint-disable */

import {TablePaginationConfig} from "antd";
import {FilterValue} from "antd/es/table/interface";

declare namespace API {
  // type CurrentUser = {
  //   name?: string;
  //   avatar?: string;
  //   userid?: string;
  //   email?: string;
  //   signature?: string;
  //   title?: string;
  //   group?: string;
  //   tags?: { key?: string; label?: string }[];
  //   notifyCount?: number;
  //   unreadCount?: number;
  //   country?: string;
  //   access?: string;
  //   geographic?: {
  //     province?: { label?: string; key?: string };
  //     city?: { label?: string; key?: string };
  //   };
  //   address?: string;
  //   phone?: string;
  // };

  type CurrentUser = {
    id?: number;
    userName?: string;
    // avatar?: string;
    userAccount?: string;
    email?: string;

    /**
     * 用户状态 0是代表正常
     */
    userStatus?: number;

    /**
     * 用户角色 0是代表普通用户 1是admin
     */
    userRole?: number;
    createTime?: Date;

    updateTime?: Date;

    isDelete?: number;
  };

  type LoginResult = {
    data?: CurrentUser;
    // type?: string;
    message?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type DirectQueryParams = {
    startDate?: Date;
    endDate?: Date;
    country?: string[];
    logisticStatus?: string[];
    customerPayStatus?: string[];
  };

  // type DirectLogisticItem = {
  //   directId: number;
  //   packetTime: Date; // 集包时间
  //   userName: string; // 客户代码
  //   country: string; // 国家
  //   channelCode: string; // 渠道代码
  //   customerOrderCode: string; // 客户单号
  //   logisticCode: string; // 物流单号
  //   customerPayStatus: string; // 客户回款
  //   logisticStatus: string; // 物流状态
  //   logisticTrack: string; // 物流最新轨迹
  //   logisticTime: Date; // 物流最新轨迹时间
  //   receiverName: string; // 收件人姓名
  //   receiverPhone: string; // 电话
  //   receiverEmail: string; // 邮箱
  //   receiverPostalCode: string; // 邮编
  //   receiverProvince: string; // 省份
  //   receiverCity: string; // 城市
  //   receiverDistrict: string; // 地区
  //   receiverDetailAddress: string; // 详细信息
  //   storeDeliveryCode: string; // 店配码
  //   storeDeliveryName: string; // 店配名称
  //   codAmount: number; // COD金额
  //   codCurrency: string; // COD币种
  //   expressCategory: string; // 快递类别
  //   productName: string; // 产品名称
  //   productType: string; // 货物类型
  //   productAmount: number; // 数量
  //   productWeight: number; // 重量
  //   productLength: number; // 长
  //   productWidth: number; // 宽
  //   productHeight: number; // 高
  //   exceptionReason: string; // 异常原因
  // };

  type DirectLogisticItem = {
    logisticId: number;
    packetTime?: Date;
    userName?: string;
    country?: string;
    channelCode?: string;
    customerOrderCode?: string;
    logisticCode?: string;
    customerPayStatus?: string;
    logisticStatus?: string;
    logisticTrack?: string;
    logisticTime?: Date;
    receiverName?: string;
    receiverPhone?: string;
    receiverEmail?: string;
    receiverPostalCode?: string;
    receiverProvince?: string;
    receiverCity?: string;
    receiverDistrict?: string | null;
    receiverDetailAddress?: string;
    storeDeliveryCode?: string | null;
    storeDeliveryName?: string | null;
    codAmount?: number;
    codCurrency?: string;
    expressCategory?: string;
    productName?: string;
    productType?: string;
    productAmount?: number;
    productWeight?: number;
    productLength?: number | null;
    productWidth?: number | null;
    productHeight?: number | null;
    exceptionReason?: string;
  };

  type DirectQueryResult = {
    code?: number;
    data?: DirectLogisticItem[];
    message?: string;
    description?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };



  interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    startDate ?: string;
    endDate ?: string;
    country ?: string[];
    logisticStatus ?: string[];
    directStatus ?: number[];

    // 待开发 todo
    filters?: Record<string, FilterValue>;
  }

}
