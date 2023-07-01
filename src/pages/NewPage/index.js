import { Line } from '@ant-design/charts';
import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';

import { EllipsisOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Dropdown } from 'antd';
import { StatisticCard } from '@ant-design/pro-components';
import { Select } from 'antd';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

const { Divider, Operation } = StatisticCard;

import { Col, Row, Table, Tag } from 'antd';

const TableLogistic = () => {
  const columns = [
    {
      title: '日期',
      dataIndex: 'packetTime',
      key: 'packetTime',
    },
    {
      title: '配送中',
      dataIndex: 'logisticOnShip',
      key: 'logisticOnShip',
    },
    {
      title: '已签收',
      dataIndex: 'logisticReceive',
      key: 'logisticReceive',
    },
    {
      title: '拒收',
      dataIndex: 'logisticReject',
      key: 'logisticReject',
    },
    {
      title: '总计',
      dataIndex: 'logisticSum',
      key: 'logisticSum',
    },
    {
      title: '已回款',
      dataIndex: 'moneyPay',
      key: 'moneyPay',
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
  ];
  const data = [
    {
      key: '1',
      packetTime: '2022-03-01',
      logisticOnShip: 30,
      logisticReceive: 20,
      logisticReject: 10,
      logisticSum: 60,
      moneyPay: 32,
      receiveRate: 0.65,
      rejectRate: 0.35,
    },
    {
      key: '2',
      packetTime: '2022-03-02',
      logisticOnShip: 30,
      logisticReceive: 20,
      logisticReject: 10,
      logisticSum: 60,
      moneyPay: 42,
      receiveRate: 0.65,
      rejectRate: 0.35,
    },
    {
      key: '3',
      packetTime: '2022-03-03',
      logisticOnShip: 30,
      logisticReceive: 20,
      logisticReject: 10,
      logisticSum: 60,
      moneyPay: 32,
      receiveRate: 0.65,
      rejectRate: 0.35,
    },
    {
      key: '4',
      packetTime: '2022-03-04',
      logisticOnShip: 30,
      logisticReceive: 20,
      logisticReject: 10,
      logisticSum: 60,
      moneyPay: 32,
      receiveRate: 0.65,
      rejectRate: 0.35,
    },
    {
      key: '5',
      packetTime: '2022-03-05',
      logisticOnShip: 30,
      logisticReceive: 20,
      logisticReject: 10,
      logisticSum: 60,
      moneyPay: 42,
      receiveRate: 0.65,
      rejectRate: 0.35,
    },
    {
      key: '6',
      packetTime: '2022-03-06',
      logisticOnShip: 30,
      logisticReceive: 20,
      logisticReject: 10,
      logisticSum: 60,
      moneyPay: 32,
      receiveRate: 0.65,
      rejectRate: 0.35,
    },
    {
      key: '7',
      packetTime: '2022-03-07',
      logisticOnShip: 30,
      logisticReceive: 20,
      logisticReject: 10,
      logisticSum: 60,
      moneyPay: 32,
      receiveRate: 0.65,
      rejectRate: 0.35,
    },
    {
      key: '8',
      packetTime: '2022-03-08',
      logisticOnShip: 30,
      logisticReceive: 20,
      logisticReject: 10,
      logisticSum: 60,
      moneyPay: 42,
      receiveRate: 0.65,
      rejectRate: 0.35,
    },
    {
      key: '9',
      packetTime: '2022-03-09',
      logisticOnShip: 30,
      logisticReceive: 20,
      logisticReject: 10,
      logisticSum: 60,
      moneyPay: 32,
      receiveRate: 0.65,
      rejectRate: 0.35,
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

const DemoPie = () => {
  const data = [
    {
      type: '在途',
      value: 50,
    },
    {
      type: '已签收',
      value: 30,
    },
    {
      type: '拒收',
      value: 20,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
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
  return (
    <>
      <Row justify="start" align="middle" gutter={[16, 24]}>
        <Col span={6}>
          <Space direction="vertical" size="small">
            <div>集包时间 </div>
            <RangePicker />
          </Space>
        </Col>

        <Col span={5}>
          <Space direction="vertical" size="small">
            <div>国家 </div>
            <Select
              showSearch
              placeholder="选择一个国家"
              options={[
                {
                  label: '中国',
                },
              ]}
            />
          </Space>
        </Col>

        <Col span={4}>
          <Space direction="vertical" size="small">
            <div>签收状态 </div>
            <Select
              showSearch
              placeholder="签收状态"
              options={[
                { label: '在途', value: '在途' },
                { label: '已签收', value: '已签收' },
                { label: '拒收', value: '拒收' },
              ]}
            />
          </Space>
        </Col>
        <Col span={3}>
          <Button type="primary">查询</Button>
        </Col>

        <Col span={8}>
          <Pie {...config} />
          {/*  todo 这里补充一个表格 和肥茹提供的网站保持一致*/}
        </Col>

        <Col span={16}>
          <TableLogistic />
        </Col>
      </Row>

      <Row align="middle"></Row>
    </>
  );
};

const DemoLine = () => {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];
  const config = {
    data,
    height: 400,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };
  return <Line {...config} />;
};

const Demostatistic = () => {
  return (
    <StatisticCard.Group>
      <StatisticCard
        statistic={{
          title: '物流订单数',
          tip: 'xxx时间内订单数',
          value: 10,
        }}
      />
      <Operation>=</Operation>
      <StatisticCard
        statistic={{
          title: '签收',
          value: 50,
          status: 'success',
        }}
      />
      <Operation>+</Operation>
      <StatisticCard
        statistic={{
          title: '在途',
          value: 30,
          status: 'processing',
        }}
      />
      <Operation>+</Operation>
      <StatisticCard
        statistic={{
          title: '拒收',
          value: 20,
          status: 'error',
        }}
      />
    </StatisticCard.Group>
  );
};

export default function NewPage() {
  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        header={{
          title: '发货数据分析',
          ghost: true,
          breadcrumb: {},
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
        tabList={[
          {
            tab: '基本信息',
            key: 'base',
            closable: false,
            children: <DemoPie />,
          },
          {
            tab: '详细信息',
            key: 'info',
            children: <DemoLine />,
          },
        ]}
        tabProps={{
          hideAdd: true,
          onEdit: (e, action) => console.log(e, action),
        }}
        onTabChange={(key) => console.log(key)}
      >
        {/*页面内容*/}
        <Demostatistic />

        <ProCard direction="column" ghost gutter={[0, 16]}>
          <ProCard style={{ height: 200 }} />
          <ProCard gutter={16} ghost style={{ height: 200 }}>
            <ProCard colSpan={16} />
            <ProCard colSpan={8} />
          </ProCard>
        </ProCard>
      </PageContainer>
    </div>
  );
}
