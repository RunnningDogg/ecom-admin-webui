import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';

type DirectLogisticItem = {
  directId: number;
  packetTime: Date; // 集包时间
  userName: string; // 客户代码
  country: string; // 国家
  channelCode: string; // 渠道代码
  customerOrderCode: string; // 客户单号
  logisticCode: string; // 物流单号
  customerPayStatus: string; // 客户回款
  logisticStatus: string; // 物流状态
  logisticTrack: string; // 物流最新轨迹
  logisticTime: Date; // 物流最新轨迹时间
  receiverName: string; // 收件人姓名
  receiverPhone: string; // 电话
  receiverEmail: string; // 邮箱
  receiverPostalCode: string; // 邮编
  receiverProvince: string; // 省份
  receiverCity: string; // 城市
  receiverDistrict: string; // 地区
  receiverDetailAddress: string; // 详细信息
  storeDeliveryCode: string; // 店配码
  storeDeliveryName: string; // 店配名称
  codAmount: number; // COD金额
  codCurrency: string; // COD币种
  expressCategory: string; // 快递类别
  productName: string; // 产品名称
  productType: string; // 货物类型
  productAmount: number; // 数量
  productWeight: number; // 重量
  productLength: number; // 长
  productWidth: number; // 宽
  productHeight: number; // 高
  exceptionReason: string; // 异常原因
};

const directLogisticDataSource: DirectLogisticItem[] = [];

for (let i = 0; i < 5; i += 1) {
  directLogisticDataSource.push({
    directId: i + 1,
    packetTime: new Date(),
    userName: `User ${i + 1}`,
    country: `Country ${i + 1}`,
    channelCode: `Channel Code ${i + 1}`,
    customerOrderCode: `Customer Order Code ${i + 1}`,
    logisticCode: `Logistic Code ${i + 1}`,
    customerPayStatus: `Customer Pay Status ${i + 1}`,
    logisticStatus: `Logistic Status ${i + 1}`,
    logisticTrack: `Logistic Track ${i + 1}`,
    logisticTime: new Date(),
    receiverName: `Receiver Name ${i + 1}`,
    receiverPhone: `Receiver Phone ${i + 1}`,
    receiverEmail: `Receiver Email ${i + 1}`,
    receiverPostalCode: `Receiver Postal Code ${i + 1}`,
    receiverProvince: `Receiver Province ${i + 1}`,
    receiverCity: `Receiver City ${i + 1}`,
    receiverDistrict: `Receiver District ${i + 1}`,
    receiverDetailAddress: `Receiver Detail Address ${i + 1}`,
    storeDeliveryCode: `Store Delivery Code ${i + 1}`,
    storeDeliveryName: `Store Delivery Name ${i + 1}`,
    codAmount: (i + 1) * 10,
    codCurrency: `COD Currency ${i + 1}`,
    expressCategory: `Express Category ${i + 1}`,
    productName: `Product Name ${i + 1}`,
    productType: `Product Type ${i + 1}`,
    productAmount: i + 1,
    productWeight: (i + 1) * 0.5,
    productLength: (i + 1) * 10,
    productWidth: (i + 1) * 5,
    productHeight: (i + 1) * 2,
    exceptionReason: `Exception Reason ${i + 1}`,
  });
}

const columns2: ProColumns<DirectLogisticItem>[] = [
  {
    title: '排序',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '集包时间',
    dataIndex: 'packetTime',
    valueType: 'dateRange',
    copyable: true,
    render: (_) => <a>{_}</a>,
    // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
  },
  {
    title: '创建者',
    dataIndex: 'userName',
    valueEnum: {
      all: { text: '全部' },
      Kevin: { text: 'Kevin' },
      Coach: { text: 'Coach鹏' },
      Bryant: { text: 'Bryant' },
    },
  },
  {
    title: '国家',
    dataIndex: 'country',
    sorter: true,
    valueEnum: {
      all: { text: '全部' },
      美国: { text: '美国' },
      日本: { text: '日本' },
      韩国: { text: '韩国' },
      英国: { text: '英国' },
    },
  },
  {
    title: '渠道代码',
    dataIndex: 'channelCode',
  },
  {
    title: '客户单号',
    dataIndex: 'customerOrderCode',
    copyable: true,
  },
  {
    title: '物流单号',
    dataIndex: 'logisticCode',
    copyable: true,
  },
  {
    title: '客户回款',
    dataIndex: 'customerPayStatus',
  },
  {
    title: '物流状态',
    dataIndex: 'logisticStatus',
  },
  {
    title: '物流最新轨迹',
    dataIndex: 'logisticTrack',
    copyable: true,
  },
  {
    title: '物流最新轨迹时间',
    dataIndex: 'logisticTime',
    valueType: 'date',
    copyable: true,
  },
  {
    title: '收件人姓名',
    dataIndex: 'receiverName',
    copyable: true,
  },
  {
    title: '电话',
    dataIndex: 'receiverPhone',
    copyable: true,
  },
  {
    title: '邮箱',
    dataIndex: 'receiverEmail',
    copyable: true,
  },
  {
    title: '邮编',
    dataIndex: 'receiverPostalCode',
    copyable: true,
  },
  {
    title: '省份',
    dataIndex: 'receiverProvince',
  },
  {
    title: '城市',
    dataIndex: 'receiverCity',
  },
  {
    title: '地区',
    dataIndex: 'receiverDistrict',
  },
  {
    title: '详细信息',
    dataIndex: 'receiverDetailAddress',
    copyable: true,
  },
  {
    title: '店配码',
    dataIndex: 'storeDeliveryCode',
  },
  {
    title: '店配名称',
    dataIndex: 'storeDeliveryName',
    copyable: true,
  },
  {
    title: 'COD金额',
    dataIndex: 'codAmount',
  },
  {
    title: 'COD币种',
    dataIndex: 'codCurrency',
  },
  {
    title: '快递类别',
    dataIndex: 'expressCategory',
  },
  {
    title: '产品名称',
    dataIndex: 'productName',
  },
  {
    title: '货物类型',
    dataIndex: 'productType',
  },
  {
    title: '数量',
    dataIndex: 'productAmount',
  },
  {
    title: '重量',
    dataIndex: 'productWeight',
  },
  {
    title: '长',
    dataIndex: 'productLength',
  },
  {
    title: '宽',
    dataIndex: 'productWidth',
  },
  {
    title: '高',
    dataIndex: 'productHeight',
  },
  {
    title: '异常原因',
    dataIndex: 'exceptionReason',
  },
];

// const columns: ProColumns<TableListItem>[] = [
//   {
//     title: '排序',
//     dataIndex: 'index',
//     valueType: 'indexBorder',
//     width: 48,
//   },
//   {
//     title: '应用名称',
//     dataIndex: 'name',
//     render: (_) => <a>{_}</a>,
//     // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
//     filterDropdown: () => (
//       <div style={{ padding: 8 }}>
//         <Input style={{ width: 188, marginBlockEnd: 8, display: 'block' }} />
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
//     ),
//   },
//   {
//     title: '创建者',
//     dataIndex: 'creator',
//     valueEnum: {
//       all: { text: '全部' },
//       付小小: { text: '付小小' },
//       曲丽丽: { text: '曲丽丽' },
//       林东东: { text: '林东东' },
//       陈帅帅: { text: '陈帅帅' },
//       兼某某: { text: '兼某某' },
//     },
//   },
//   {
//     title: '状态',
//     dataIndex: 'status',
//     initialValue: 'all',
//     filters: true,
//     onFilter: true,
//     valueEnum: {
//       all: { text: '全部', status: 'Default' },
//       close: { text: '关闭', status: 'Default' },
//       running: { text: '运行中', status: 'Processing' },
//       online: { text: '已上线', status: 'Success' },
//       error: { text: '异常', status: 'Error' },
//     },
//   },
//   {
//     title: '备注',
//     dataIndex: 'memo',
//     ellipsis: true,
//     copyable: true,
//   },
//   {
//     title: '操作',
//     width: 180,
//     key: 'option',
//     valueType: 'option',
//     render: () => [
//       <a key="link">链路</a>,
//       <a key="link2">报警</a>,
//       <a key="link3">监控</a>,
//       <TableDropdown
//         key="actionGroup"
//         menus={[
//           { key: 'copy', name: '复制' },
//           { key: 'delete', name: '删除' },
//         ]}
//       />,
//     ],
//   },
// ];

export default () => {
  return (
    <PageContainer>
      <ProTable<DirectLogisticItem>
        columns={columns2}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: directLogisticDataSource,
            success: true,
          });
        }}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: true,
        }}
        dateFormatter="string"
        toolbar={{
          title: '直发物流表格',
          tooltip: '这是直发物流表格',
        }}
        toolBarRender={() => [
          <Button key="danger" danger>
            危险按钮
          </Button>,
          <Button key="show">上传Excel文档(管理员)</Button>,
          <Button type="primary" key="primary">
            一键导出EXCEL
          </Button>,
        ]}
        columnsState={{
          defaultValue: {
            // 配置初始值
            index: { show: false },
            receiverPostalCode: { show: false },
            receiverCity: { show: false },
            receiverProvince: { show: false },
            storeDeliveryCode: { show: false },
            storeDeliveryName: { show: false },
            productWeight: { show: false },
            productLength: { show: false },
            productWidth: { show: false },
            productHeight: { show: false },
            exceptionReason: { show: false },
          },
          onChange: (mapObj) => {
            /* 注意：如果设置持久化，不要在该函数中再额外设置columnsState的值，否则死循环 */
            console.log(mapObj); // {useName: { show: true },age: { show: false},…}
          },
          persistenceKey: 'infoTableSetting', // 持久化列的key，用于判断是否是同一个table,会存在缓存里去
          persistenceType: 'localStorage', // 持久化列的类型，localStorage 设置在关闭浏览器后也是存在的，sessionStorage 关闭浏览器后会丢失
        }}
      />
    </PageContainer>
  );
};
