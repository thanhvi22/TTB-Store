




import { Button, message, Modal, Radio, Spin, Table, Tooltip } from 'antd';
import adminApi from 'apis/adminApi';
import helpers from 'helpers';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



function generateFilterOrder() {
  let result = [];
  for (let i = 0; i < 7; ++i) {
    result.push({ value: i, text: helpers.convertOrderStatus(i) });
  }
  return result;
}

function OrderList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //
  

  // event: Cập nhật trạng thái đơn hàng
  const updateOrderStatus = async (id, orderStatus) => {
    try {
      const response = await adminApi.postUpdateOrderStatus(id, orderStatus);
      if (response) {
        message.success('Cập nhật thành công');
        setData(
          data.map((item) =>
            item.orderId === id ? { ...item, orderStatus } : { ...item },
          ),
        );
      }
    } catch (error) {
      message.success('Cập nhật thất bại');
    }
  };

  // modal cập nhật trạng thái đơn hàng
  function UpdateOrderStatusModal(defaultVal = 0, orderCode, orderId) {
    let valueCurr = defaultVal;
    const modal = Modal.info({
      width: 768,
      title: `Cập nhật trạng thái đơn hàng #${orderCode}`,
      content: (
        <Radio.Group
          defaultValue={defaultVal}
          onChange={(v) => (valueCurr = v.target.value)}
          className="m-t-12">
          {generateFilterOrder().map((item, index) => (
            <Radio className="m-b-8" key={index} value={item.value}>
              {item.text}
            </Radio>
          ))}
        </Radio.Group>
      ),
      centered: true,
      icon: null,
      okText: 'Cập nhật',
      onOk: () => {
        updateOrderStatus(orderId, valueCurr);
        modal.destroy();
      },
    });
  }

  const columns = [
    {
      title: ' Mã Khách Hàng',
      key: 'owner',
      dataIndex: 'owner',
    },
    
    {
      title: 'Họ tên',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: 'Mã Sản Phẩm',
      key: 'code',
      dataIndex: 'code',
      render: (code, data) => (
        <a target="blank" href={`/product/${data._id}`}>
          {code}
        </a>
      ),
    },

    {
      title: 'Hình Ảnh Mặt Hàng',
      key: 'avt',
      dataIndex: 'avt',
      render: (avt) => (

        <img className="max-w-100 max-h-100" src={avt} alt="Ảnh Đơn Hàng" />

      ),
    },
    
    {
      title: 'Mã đơn hàng',
      key: 'orderCode',
      dataIndex: 'orderCode',
      render: (v) => <a>{v}</a>,
    },
    {
      title: 'Ngày đặt',
      key: 'orderDate',
      dataIndex: 'orderDate',
      sorter: (a, b) => {
        if (a.orderDate > b.orderDate) return 1;
        if (a.orderDate < b.orderDate) return -1;
        return 0;
      },
    },
    {
      title: 'Sản phẩm',
      key: 'prodName',
      dataIndex: 'prodName',
      render: (prodName, record) => (
        <Tooltip title={prodName}>
          <Link to={`/product/${record.idProduct}`}>
            {helpers.reduceProductName(prodName, 30)}
          </Link>
        </Tooltip>
      ),
    },
    {
      title: 'Tổng tiền',
      key: 'totalMoney',
      dataIndex: 'totalMoney',
      render: (value) => (
        <b style={{ color: '#333' }}>{helpers.formatProductPrice(value)}</b>
      ),
      sorter: (a, b) => a.totalMoney - b.totalMoney,
    },
    {
      title: 'HT thanh toán',
      key: 'paymentMethod',
      dataIndex: 'paymentMethod',
      render: (value) => (value === 0 ? 'Tiền mặt' : 'VNPay'),
    },
    {
      title: 'Trạng thái đơn hàng',
      key: 'orderStatus',
      dataIndex: 'orderStatus',
      filters: generateFilterOrder(),
      onFilter: (value, record) => record.orderStatus === value,
      render: (value) => helpers.convertOrderStatus(value),
    },
    {
      title: '',
      render: (_v, records) => (
        <Button
          type="dashed"
          onClick={() =>
            UpdateOrderStatusModal(
              records.orderStatus,
              records.orderCode,
              records.orderId,
            )
          }>
          Cập nhật
        </Button>
      ),
    },
  ];

  useEffect(() => {
    let isSubscribe = true;
    async function getOrderList() {
      try {
        setIsLoading(true);
        const response = await adminApi.getOrderList();
        if (isSubscribe && response) {
          const { list } = response.data;
          const newList = list.map((item, index) => {
            return {
              key: index,
              owner: item.owner,
              orderCode: item.orderCode,
              orderDate: helpers.formatOrderDate(item.orderDate),
              prodName: item.orderProd.name,
              totalMoney:
                item.numOfProd *
                (item.orderProd.price -
                  (item.orderProd.price * item.orderProd.discount) / 100),
              paymentMethod: item.paymentMethod,
              orderStatus: item.orderStatus,
              idProduct: item.orderProd.id,
              orderId: item._id,
            };
          });
          setData([...newList]);
          setIsLoading(false);
        }
      } catch (error) {
        if (isSubscribe) setIsLoading(false);
      }
    }
    getOrderList();
    return () => {
      isSubscribe = false;
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Spin className="trans-center" tip="Đang lấy danh sách đơn hàng ..." />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ showLessItems: true, position: ['bottomCenter'] }}
        />
      )}
    </>
  );
}

export default OrderList;
