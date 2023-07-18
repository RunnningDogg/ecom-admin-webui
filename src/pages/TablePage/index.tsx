import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import {request, useModel} from '@umijs/max';
import {
  queryDetailedDirectLength,
  queryDetailedDirectLogistic,
} from '@/services/ant-design-pro/api';
import { TableDropdown } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import {Button, Upload, notification, message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ParamsType } from '@ant-design/pro-provider';
import {API} from "@/services/ant-design-pro/typings";


interface RowEditLinkProps {
  handleOnClick: () => void;
}
const RowEditLink : React.FC<RowEditLinkProps> = ({handleOnClick}) => {
  const { initialState } = useModel('@@initialState');
  console.log("编辑",initialState?.currentUser?.userRole)
  return(
    <>
      {initialState?.currentUser?.userRole === 1 &&
        <a
          onClick={handleOnClick}
        >
          编辑
        </a>
      }
    </>
  )
}

const columns: ProColumns<API.DirectLogisticItem>[] = [
  {
    title: '排序',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
    key: 'index',
  },
  {
    title: '数据库物流id',
    dataIndex: 'logisticId',
    hideInSearch: true,
    hideInTable: true,
    valueType: 'index',
    key: 'logisticId',
    // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
  },
  {
    title: '集包时间',
    dataIndex: 'packetTime',
    valueType: 'date',
    copyable: true,
    hideInSearch: true,
    key: 'packetTime',
    // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
  },
  {
    title: '集包日期',
    dataIndex: 'packetDateRange',
    key: 'dateNoteInTable',
    valueType: 'dateRange',
    fieldProps: { placeholder: ['开始时间', '结束时间'] },
    hideInTable: true,
  },
  {
    title: '创建者',
    dataIndex: 'userName',
    key: 'userName',
    valueEnum: {
      all: { text: '全部', key: "all" },
      Kevin: { text: 'Kevin' },
      Coach: { text: 'Coach鹏' },
      Bryant: { text: 'Bryant' },
    },
  },
  {
    title: '国家',
    dataIndex: 'country',
    key: 'country',
    valueType: 'select',
    sorter: true,
    valueEnum: {
      all: { text: '全部' },
      美国: { text: '美国' },
      日本: { text: '日本' },
      韩国: { text: '韩国' },
      英国: { text: '英国' },
    },
    fieldProps: {
      mode: 'multiple',
      placeholder: '支持多选',
    },
    width: 80,
    order: 2,
  },

  {
    title: '物流单号',
    dataIndex: 'logisticCode',
    key: 'logisticCode',
    copyable: true,
  },
  {
    title: '客户回款',
    dataIndex: 'customerPayStatus',
    key: 'customerPayStatus',
    valueType: 'select',
    fieldProps: {
      mode: 'multiple',
    },
    valueEnum: {
      已回款: { text: '已回款' },
      '--': { text: '未回款' },
    },
  },
  {
    title: '物流状态',
    dataIndex: 'logisticStatus',
    key: 'logisticStatus',
    valueType: 'select',
    fieldProps: {
      mode: 'multiple',
    },
    valueEnum: {
      配送中: { text: '配送中' },
      已签收: { text: '已签收' },
      拒收: { text: '拒收' },
    },
  },
  {
    title: '渠道代码',
    dataIndex: 'channelCode',
    key: 'channelCode',
  },
  {
    title: '客户单号',
    dataIndex: 'customerOrderCode',
    key: 'customerOrderCode',
    copyable: true,
  },
  {
    title: '物流最新轨迹',
    dataIndex: 'logisticTrack',
    key: 'logisticTrack',
    copyable: true,
    search: false,
    width: 120,
  },
  {
    title: '物流最新轨迹时间',
    dataIndex: 'logisticTime',
    key: 'logisticTime',
    valueType: 'date',
    copyable: true,
    search: false,
  },
  {
    title: '收件人姓名',
    dataIndex: 'receiverName',
    key: 'receiverName',
    copyable: true,
    search: false,
  },
  {
    title: '电话',
    dataIndex: 'receiverPhone',
    key: 'receiverPhone',
    copyable: true,
    search: false,
  },
  {
    title: '邮箱',
    dataIndex: 'receiverEmail',
    key: 'receiverEmail',
    copyable: true,
    search: false,
  },
  {
    title: '邮编',
    dataIndex: 'receiverPostalCode',
    key: 'receiverPostalCode',
    copyable: true,
    search: false,
  },
  {
    title: '省份',
    dataIndex: 'receiverProvince',
    key: 'receiverProvince',
    search: false,
  },
  {
    title: '城市',
    dataIndex: 'receiverCity',
    key: 'receiverCity',
    search: false,
  },
  {
    title: '地区',
    dataIndex: 'receiverDistrict',
    key: 'receiverDistrict',
    search: false,
  },
  {
    title: '详细信息',
    dataIndex: 'receiverDetailAddress',
    key: 'receiverDetailAddress',
    copyable: true,
    search: false,
  },
  {
    title: '店配码',
    dataIndex: 'storeDeliveryCode',
    key: 'storeDeliveryCode',
    search: false,
  },
  {
    title: '店配名称',
    dataIndex: 'storeDeliveryName',
    key: 'storeDeliveryName',
    copyable: true,
    search: false,
  },
  {
    title: 'COD金额',
    dataIndex: 'codAmount',
    key: 'codAmount',
    search: false,
  },
  {
    title: 'COD币种',
    dataIndex: 'codCurrency',
    key: 'codCurrency',
    search: false,
  },
  {
    title: '快递类别',
    dataIndex: 'expressCategory',
    key: 'expressCategory',
    search: false,
  },
  {
    title: '产品名称',
    dataIndex: 'productName',
    key: 'expressCategory',
    search: false,
  },
  {
    title: '货物类型',
    dataIndex: 'productType',
    key: 'expressCategory',
    search: false,
  },
  {
    title: '数量',
    dataIndex: 'productAmount',
    key: 'productAmount',
    search: false,
  },
  {
    title: '重量',
    dataIndex: 'productWeight',
    key: 'productWeight',
    search: false,
  },
  {
    title: '长',
    dataIndex: 'productLength',
    key: 'productLength',
    search: false,
  },
  {
    title: '宽',
    dataIndex: 'productWidth',
    key: 'productWidth',
    search: false,
  },
  {
    title: '高',
    dataIndex: 'productHeight',
    key: 'productHeight',
    search: false,
  },
  {
    title: '异常原因',
    dataIndex: 'exceptionReason',
    key: 'exceptionReason',
    search: false,
  },
  {
    title: '配送方式',
    dataIndex: 'isDirect',
    key: 'directStatus',
    valueType: 'select',
    fieldProps: {
      mode: 'multiple',
      placeholder: '支持多选',
    },
    valueEnum: {
      1: {text: '直发'},
      0: {text: '转寄'}
    },
    // 搜索表单权重
    order: 10,
  },
  {
    title: '操作',
    width: 80,
    key: 'option',
    valueType: 'option',
    render: (text, record, _, action) => [

      // <a
      //   key="editable"
      //   onClick={() => {
      //     action?.startEditable?.(record.logisticId);
      //   }}
      // >
      //   编辑
      // </a>,
      <RowEditLink key="editable" handleOnClick={
        () => {action?.startEditable?.(record.logisticId);}
      }/>,
      <TableDropdown
        key="actionGroup"
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];


const UploadExcelButton: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const handleUpload = async () => {
    const formData = new FormData();
    console.log(fileList.length);
    fileList.forEach((file) => {
      console.log(file);
      formData.append('file', file as RcFile);
    });
    formData.append('name', 'tt');
    // console.log(fileList);
    // console.log(formData);
    setUploading(true);

    fetch('/api/logistic/excel/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setFileList([]);
        // message.success('upload successfully.');
        if (res?.code === 0){
          // message.warning(`解析行数：${res?.data[0]} \n 上传成功数：${res?.data[1]}   上传失败数(客户单号重复)：${res?.data[0]-res?.data[1]}`)
          notification.warning({
            placement: 'topRight',
            message: '上传结果',
            description:  <>解析行数：{res?.data[0]} <br/> 上传成功数：{res?.data[1]} <br/>  上传失败数(客户单号重复)：{res?.data[0]-res?.data[1]}</>
          })
        }else{
          // message.error("上传失败")
          notification.error({
            placement: 'topRight',
            message: '上传结果',
            description:  `上传失败, 请联系业务员解决`
          })
        }

      })
      .catch(() => {
        notification.error({
          placement: 'topRight',
          message: '上传结果',
          description:  `上传失败, 请联系业务员解决`
        })
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    withCredentials: true,
    accept:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
  };

  return (
    <div>
      {initialState?.currentUser?.userRole === 1 && (
        <>
          <Upload {...props} fileList={fileList}>
            <Button icon={<UploadOutlined />}>上传Excel文档(仅限管理员 )</Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? 'Uploading' : 'Start Upload'}
          </Button>
        </>
      )}
    </div>
  );
};

const UpdateExcelButton: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const handleUpload = async () => {
    const formData = new FormData();
    console.log(fileList.length);
    fileList.forEach((file) => {
      console.log(file);
      formData.append('file', file as RcFile);
    });
    formData.append('name', 'tt');
    setUploading(true);

    fetch('/api/logistic/excel/update', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setFileList([]);
        // message.success('upload successfully.');
        if (res?.code === 0){
          // message.warning(`解析行数：${res?.data[0]} \n 上传成功数：${res?.data[1]}   上传失败数(客户单号重复)：${res?.data[0]-res?.data[1]}`)
          notification.warning({
            placement: 'topRight',
            message: '上传结果',
            description:  <>解析行数：{res?.data[0]} <br/> 更新成功数：{res?.data[1]} <br/>  更新失败数：{res?.data[0]-res?.data[1]}</>
          })
        }else{
          // message.error("上传失败")
          notification.error({
            placement: 'topRight',
            message: '更新结果',
            description:  `更新失败, 请联系业务员解决`
          })
        }

      })
      .catch(() => {
        notification.error({
          placement: 'topRight',
          message: '上传结果',
          description:  `上传失败, 请联系业务员解决`
        })
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    withCredentials: true,
    accept:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
  };

  return (
    <div>
      {initialState?.currentUser?.userRole === 1 && (
        <>
          <Upload {...props} fileList={fileList}>
            <Button icon={<UploadOutlined />}>更新Excel文档(仅限管理员 )</Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? 'Uploading' : 'Start Upload'}
          </Button>
        </>
      )}
    </div>
  );
};


export default () => {
  const { initialState } = useModel('@@initialState');
  // console.log(initialState?.currentUser?.userRole)

  const tableParams = useRef<
    ParamsType & {
      pageSize?: number | undefined;
      current?: number | undefined;
      keyword?: string | undefined;
    }
  >();

  // 修改column列的定义, 管理员才能筛选用户名
  const user = columns.find((item) => item.dataIndex === "userName")
  if (user){
    user.hideInSearch = initialState?.currentUser?.userRole === 0;
    user.hideInTable = initialState?.currentUser?.userRole === 0;
  }



  // 保存删除需要的key
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  return (
    <PageContainer>
      <ProTable<API.DirectLogisticItem>

        //  保存 删除 取消触发 todo
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async(rowKey, data, row) => {
            console.log("save");
            console.log(rowKey, data, row);
            const res = await request("/api/logistic/table/update", {
              method: "POST",
              data: [data]
            })
            if (res.code === 0 ){
              message.success("更新成功!")
            }
          },
          onChange: setEditableRowKeys,
          onDelete: async(rowKey,row) => {
            console.log("delete");
            console.log(rowKey,row);
            const res = await request("/api/logistic/table/delete", {
              method: "POST",
              data: [rowKey]
            })
            if (res.code === 0 ){
              message.success("删除成功!")
            }
          },
          onCancel: async(key,row,originRow) => {
            console.log(key,row,originRow);
          }
        }}
        columns={columns}
        request={async (params) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          // console.log(params);
          tableParams.current = params; // 设置params
          const query = {
            ...params,
            startDate: (params.dateNoteInTable || [])[0],
            endDate: (params.dateNoteInTable || [])[1],
          };
          const res: API.DirectQueryResult = await queryDetailedDirectLogistic(query);
          const total = await queryDetailedDirectLength(query);
          return Promise.resolve({
            data: res.data,
            success: true,
            total: total?.data,
          });
        }}
        rowKey="logisticId"
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
          <UploadExcelButton key="upload" />,
          <UpdateExcelButton key="update"/>,
          <Button
            type="primary"
            key="primary"
            onClick={async () => {
              console.log(tableParams);
              // @ts-ignore
              const query = {
                ...tableParams.current,
                startDate: (tableParams.current?.dateNoteInTable || [])[0],
                endDate: (tableParams.current?.dateNoteInTable || [])[1],
              };

              const requestOptions = {
                method: 'POST',
                body: JSON.stringify(query),
                headers: {
                  'Content-Type': 'application/json',
                },
              };

              fetch('/api/logistic/download', requestOptions)
                .then((response) => response.blob())
                .then((blob) => {
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `直发物流.xlsx`;
                  document.body.appendChild(link);
                  link.click();
                  URL.revokeObjectURL(url); // 释放url
                  document.body.removeChild(link);
                })
                .catch((error) => {
                  // 处理请求错误
                  console.error(error);
                });
            }}
          >
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
          // onChange: (mapObj) => {
          //   /* 注意：如果设置持久化，不要在该函数中再额外设置columnsState的值，否则死循环 */
          //   console.log(mapObj); // {useName: { show: true },age: { show: false},…}
          // },
          persistenceKey: 'infoTableSetting', // 持久化列的key，用于判断是否是同一个table,会存在缓存里去
          persistenceType: 'localStorage', // 持久化列的类型，localStorage 设置在关闭浏览器后也是存在的，sessionStorage 关闭浏览器后会丢失
        }}
      />
    </PageContainer>
  );
};
