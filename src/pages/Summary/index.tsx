import { Button, Col, DatePicker, Dropdown, Row, Table, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { request } from '@umijs/max';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { EllipsisOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/plots';
import { Select, Space } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
// import { DownloadOutlined } from '@ant-design/icons';
import {querySummaryLength} from "@/services/ant-design-pro/api";
import {FilterValue, SorterResult} from "antd/es/table/interface";

dayjs.extend(weekday);
dayjs.extend(localeData);

const { RangePicker } = DatePicker;

// 声明数据列
interface SummaryType {
  packetTime: Date;
  /**
   * 物流状态
   */
  shipLogistic: number;
  receiveLogistic: number;
  rejectLogistic: number;
  totalLogistic: number;
  paybackLogistic: number;

  /**
   * 签收率 拒收率
   */
  receiveRate: number;
  rejectRate: number;
}

const tableColumns: ColumnsType<SummaryType> = [
  {
    title: '日期',
    dataIndex: 'packetTime',
    key: 'packetTime',
  },
  {
    title: '配送中',
    dataIndex: 'shipLogistic',
    key: 'shipLogistic',
  },
  {
    title: '已签收',
    dataIndex: 'receiveLogistic',
    key: 'receiveLogistic',
  },
  {
    title: '拒收',
    dataIndex: 'rejectLogistic',
    key: 'rejectLogistic',
  },
  {
    title: '总计',
    dataIndex: 'totalLogistic',
    key: 'totalLogistic',
  },
  {
    title: '已回款',
    dataIndex: 'paybackLogistic',
    key: 'paybackLogistic',
  },
  {
    title: '签收率',
    key: 'receiveRate',
    dataIndex: 'receiveRate',
  },
  {
    title: '拒收率',
    key: 'rejectRate',
    dataIndex: 'rejectRate',
  },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //    <Button type="primary" icon={<DownloadOutlined/>}  onClick={ async () => {
  //      const query = {
  //        startDate: record?.packetTime,
  //        endDate: record?.packetTime,
  //      };
  //
  //      const requestOptions = {
  //        method: 'POST',
  //        body: JSON.stringify(query),
  //        headers: {
  //          'Content-Type': 'application/json',
  //        },
  //      };
  //
  //      fetch('/api/logistic/download', requestOptions)
  //        .then((response) => response.blob())
  //        .then((blob) => {
  //          const url = URL.createObjectURL(blob);
  //          const link = document.createElement('a');
  //          link.href = url;
  //          link.download = `物流-${record?.packetTime}.xlsx`;
  //          document.body.appendChild(link);
  //          link.click();
  //          URL.revokeObjectURL(url); // 释放url
  //          document.body.removeChild(link);
  //        })
  //        .catch((error) => {
  //          // 处理请求错误
  //          console.error(error);
  //        });
  //    }
  //    } >
  //      导出
  //    </Button>
  //    </Space>
  //   )
  // }
];

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  startDate ?: string;
  endDate ?: string;
  country ?: string[];
  logisticStatus ?: string[];
  directStatus ?: number[];
  filters?: Record<string, FilterValue>;

}

// 日期预设值
const rangePresets: {
  label: string;
  value: [Dayjs, Dayjs];
}[] = [
  { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
];

interface PieDataProps {
  tableData: SummaryType[];
}

const PieData: React.FC<PieDataProps> = ({ tableData }) => {
  const res = [
    { type: '运输中', value: 0 },
    { type: '已签收', value: 0 },
    { type: '拒收', value: 0 },
  ];

  if (tableData) {
    tableData.forEach(
      (obj: { shipLogistic: number; receiveLogistic: number; rejectLogistic: number }) => {
        res[0].value += obj.shipLogistic;
        res[1].value += obj.receiveLogistic;
        res[2].value += obj.rejectLogistic;
      },
    );
  }
  // console.log(res);
  const config = {
    appendPadding: 10,
    data: res,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'outer',
      labelHeight: 28,
      content: '{name}\n{percentage}',
      // style: {
      //   fontSize: 14,
      //   textAlign: 'center',
      // },
    },
    legend: {
      layout: 'horizontal',
      position: 'bottom',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  // @ts-ignore
  return <Pie {...config} />;
};

// 目前我没有想到分开各个组件的方案，先全部卸载一起
const App: React.FC = () => {
  // input输入框

  // 表格数据渲染
  const [tableData, setData] = useState<SummaryType[]>([]);
  const [loading, setLoading] = useState(false);

  // 分页条件
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  // 服务器获取数据的方法
  const fetchData = async () => {
    setLoading(true);
    // 拿数据
    const res = await request('/api/logistic/summary', {
      method: 'POST',
      data: {
        ...tableParams,
        current: tableParams?.pagination?.current,
        pageSize: tableParams?.pagination?.pageSize,
      },
    });

    const resWithKeys = res?.data.map((item: any, index: any) => {
      return { ...item, key: index };
    });
    // console.log(resWithKeys);
    setData(resWithKeys);

    // 拿分页设置
    const totalPage = await querySummaryLength({});

    setTableParams({
      pagination: {
        ...tableParams.pagination,
        total: totalPage?.data
      },
    });
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // todo 加入国家,时间,物流状态筛选条件
    const params = {
      country: tableParams?.country,
      logisticStatus: tableParams?.logisticStatus,
      startDate: tableParams?.startDate,
      endDate: tableParams?.endDate,
      current: tableParams?.pagination?.current,
      pageSize: tableParams?.pagination?.pageSize,
      directStatus: tableParams?.directStatus
    }

    const res = await request('/api/logistic/summary', {
      method: 'POST',
      data: params,
    });
    // 转换结果，使其唯一
    const resWithKeys = res?.data.map((item: any, index: any) => {
      return { ...item, key: index };
    });
    setData(resWithKeys);

    // 获取长度
    const totalLength = await querySummaryLength(params);
    // 分页设置
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        total: totalLength
      },
    });
    setLoading(false);
  };

  // 监控tableProps 是否发生了变化（分页条件）
  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  // handleChange的日期函数
  const onRangeChange = (dates: any, dateStrings: string[]) => {
    // null | (Dayjs | null)[]
    // values: RangeValue<dayjs.Dayjs>
    if (dates) {
      // console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);

      setTableParams({
        ...tableParams,
        startDate: dateStrings[0],
        endDate: dateStrings[1]
      })
    } else {
      console.log('Clear');
    }
  };

  // handleChange的国家函数
  const handleCountryChange = (newValue: string[]) => {
    console.log(newValue);

    setTableParams({
      ...tableParams,
      country: newValue
    })
  };

  // handleChange的物流状态函数
  const handleLogisticChange = (newValue: string[]) => {
    console.log(newValue);

    setTableParams({
      ...tableParams,
      logisticStatus: newValue
    })
  };

  // 直发转寄变化
  const handleLogisticWayChange = (newValue: number[]) => {
    setTableParams({
      ...tableParams,
      directStatus: newValue
    })
  }

  // 下载全部
  const handleDownload =  () => {

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(tableParams),
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
        link.download = `明细物流表.xlsx`;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url); // 释放url
        document.body.removeChild(link);
      })
      .catch((error) => {
        // 处理请求错误
        console.error(error);
      });
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<SummaryType>,
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <div>
      <div
        style={{
          background: '#F5F7FA',
        }}
      >
        <PageContainer
          header={{
            title: '发货数据分析',
            ghost: true,
            extra: [
              <Button key="1" type="primary">
                主要按钮
              </Button>,
              <Button key="2">次要按钮</Button>,
              <Dropdown
                key="dropdown"
                trigger={['click']}
                menu={{
                  items: [
                    {
                      label: '下拉菜单',
                      key: '1',
                    },
                    {
                      label: '下拉菜单2',
                      key: '2',
                    },
                    {
                      label: '下拉菜单3',
                      key: '3',
                    },
                  ],
                }}
              >
                <Button key="4" style={{ padding: '0 8px' }}>
                  <EllipsisOutlined />
                </Button>
              </Dropdown>,
            ],
          }}
          tabBarExtraContent="标签页内容Kevin"
        >
          <Row justify="start" align="middle" gutter={[16, 24]}>
            {/*// 集包时间*/}
            <Col span={6}>
              <Space direction="vertical" size="small">
                <div>集包时间 </div>
                <RangePicker presets={rangePresets} onChange={ (values, dateStrings) =>  onRangeChange(values, dateStrings)} />
              </Space>
            </Col>

            {/*  筛选条件 */}
            <Col span={6}>
              <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                <div>国家</div>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="国家 支持多选"
                  options={[
                    { value: '希腊', label: '希腊' },
                    { value: '克罗地亚', label: '克罗地亚' },
                    { value: '保加利亚', label: '保加利亚' },
                    { value: '罗马尼亚', label: '罗马尼亚' },
                    { value: '欧洲', label: '欧洲' },
                  ]}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  onChange={handleCountryChange}
                />
              </Space>
            </Col>

            <Col span={4}>
              <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                <div>签收状态 </div>
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="签收状态 支持多选"
                  style={{ width: '100%' }}
                  options={[
                    { label: '配送中', value: '配送中' },
                    { label: '已签收', value: '已签收' },
                    { label: '拒收', value: '拒收' },
                  ]}
                  onChange={handleLogisticChange}
                />
              </Space>
            </Col>

            <Col span={4}>
              <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                <div>物流方式 </div>
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="物流方式 直发/转寄"
                  style={{ width: '100%' }}
                  options={[
                    { label: '直发', value: 1 },
                    { label: '转寄', value: 0 },
                  ]}
                  onChange={handleLogisticWayChange}
                />
              </Space>
            </Col>

            <Col span={4}>
              <Space>
                <Button type="primary" size="middle" onClick={handleSubmit}>
                  查询
                </Button>

                <Button type="primary" size="middle" onClick={handleDownload}>
                  导出为Excel
                </Button>
              </Space>

            </Col>

            {/*表格*/}
            <Col span={16}>
              <Table columns={tableColumns} dataSource={tableData}
                     loading={loading}  pagination={tableParams.pagination}
                    onChange={handleTableChange}
              />
            </Col>

            {/*饼图*/}
            <Col span={8}>{tableData && <PieData tableData={tableData} />}</Col>
          </Row>

          <ProCard direction="column" ghost gutter={[0, 16]}>
            <ProCard style={{ height: 200 }} />
            <ProCard gutter={16} ghost style={{ height: 200 }}>
              <ProCard colSpan={16} />
              <ProCard colSpan={8} />
            </ProCard>
          </ProCard>
        </PageContainer>
      </div>
    </div>
  );
};

export default App;
