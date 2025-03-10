import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
// component
import Step1 from '@/component/Step1';
import Step2 from '@/component/Step2';
import SubStep2 from '@/component/SubStep2';
import Step3 from '@/component/Step3';
import Step4 from '@/component/Step4';
import TableToPDF from '@/component/TableToPDF';

const Main = () => {
  const products = ['2020', '3030', '4040', '2040', '3060', '4080'];
  const initialOrders = {
    product: '2020',
    color: '실버',
    length: 0,
    amount: 0,
  };
  const [selectedProduct, setSelectedProduct] = useState('2020');
  const [selectOrders, setSelectOrders] = useState([]);
  const [orders, setOrders] = useState(initialOrders);
  const tabOptions = [
    {
      id: 0,
      value: '2020 / 3030 / 4040 한쪽 1개 300원',
      price: 300,
    },
    {
      id: 1,
      value: '2020 / 3030 / 4040 양쪽 2개 600원',
      price: 600,
    },
    {
      id: 2,
      value: '2040 / 3060 / 4080 한쪽 2개 600원',
      price: 600,
    },
    {
      id: 3,
      value: '2040 / 3060 / 4080 양쪽 4개 1200원',
      price: 1200,
    },
  ];
  const holeOptions = [
    {
      id: 0,
      value: '20용 5파이 1개 400원',
      price: 400,
    },
    {
      id: 1,
      value: '30용 6파이 1개 400원',
      price: 400,
    },
    {
      id: 2,
      value: '40용 8파이 1개 400원',
      price: 400,
    },
  ];
  const angleOptions = [
    {
      id: 0,
      value: '45도 한쪽 600원',
      price: 600,
    },
    {
      id: 1,
      value: '45도 양쪽 1200원',
      price: 1200,
    },
  ];
  const [subOrders, setSubOrders] = useState({
    tab: {
      value: '',
      amount: 0,
      price: 0,
    },
    hole: {
      value: '',
      amount: 0,
      price: 0,
    },
    angle: {
      value: '',
      amount: 0,
      price: 0,
    },
  });
  const [sheet, setSheet] = useState([]);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    tel: '',
    email: '',
    remark: null,
  });
  const [agree, setAgree] = useState(false);

  const productPrice = useMemo(() => {
    const { product, length, amount } = orders;
    if (!length || !amount) {
      return 0;
    }

    const priceMap = {
      2020: 400,
      2040: 700,
      3030: 900,
      3060: 1400,
      4040: 1500,
      4080: 2700,
    };

    // 2020 제품의 특별 규칙: 1-50mm는 100원
    if (product === '2020' && length <= 50) {
      return 100 * amount;
    }

    // 구간별 가격 계산 함수
    const calculateSegmentPrice = (basePrice, length, is4040 = false) => {
      // 1-100mm: 기본가
      if (length <= 100) {
        return basePrice;
      }

      // 구간 계산 (101-200mm는 2구간, 201-300mm는 3구간...)
      const segment = Math.ceil(length / 100);
      const segmentPrice = basePrice * segment;

      // 4040 제품은 구간당 100원 추가
      if (is4040) {
        return segmentPrice + 100 * (segment - 1);
      }

      return segmentPrice;
    };

    const basePrice = priceMap[product] || 0;
    const finalPrice = calculateSegmentPrice(basePrice, length, product === '4040');

    return finalPrice * amount;
  }, [orders]);
  // 탭가공 가격
  const tabPrice = useMemo(() => {
    const { tab } = subOrders;

    return tab.price * tab.amount;
  }, [subOrders.tab]);

  // 홀가공 가격
  const holePrice = useMemo(() => {
    const { hole } = subOrders;
    return (hole?.price || 0) * (hole?.amount || 0);
  }, [subOrders.hole]);

  // 45도 각도절단 가격
  const anglePrice = useMemo(() => {
    const { angle } = subOrders;
    return (angle?.price || 0) * (angle?.amount || 0);
  }, [subOrders.angle]);

  const handleAddToSheet = useCallback(() => {
    // 기본 유효성 검사
    if (Object.values(orders).some(value => value === 0 || value === '')) {
      return alert('입력하지 않은 정보가 있습니다.');
    }

    // subOrders 데이터 검증
    const validatedSubOrders = {
      tab: {
        value: subOrders.tab?.value || '',
        amount: subOrders.tab?.amount || 0,
        price: subOrders.tab?.price || 0,
      },
      hole: {
        value: subOrders.hole?.value || '',
        amount: subOrders.hole?.amount || 0,
        price: subOrders.hole?.price || 0,
      },
      angle: {
        value: subOrders.angle?.value || '',
        amount: subOrders.angle?.amount || 0,
        price: subOrders.angle?.price || 0,
      },
    };

    setSheet(prev => [
      ...prev,
      {
        ...orders,
        ...validatedSubOrders,
        tabPrice: tabPrice || 0,
        holePrice: holePrice || 0,
        anglePrice: anglePrice || 0,
        productPrice: productPrice || 0,
      },
    ]);

    setOrders(initialOrders);
    setSubOrders({
      tab: {
        value: '',
        amount: 0,
        price: 0,
      },
      hole: {
        value: '',
        amount: 0,
        price: 0,
      },
      angle: {
        value: '',
        amount: 0,
        price: 0,
      },
    });

    setSelectOrders([]);
    setSelectedProduct('2020');
  }, [orders, subOrders, tabPrice, holePrice, anglePrice, productPrice]);

  // 총 견적금액 (100원 절사 전)
  const totalEstimatePrice = useMemo(() => {
    return sheet.reduce(
      (sum, item) =>
        sum +
        (Number(item.productPrice) +
          Number(item.tabPrice) +
          Number(item.anglePrice) +
          Number(item.holePrice)),
      0,
    );
  }, [sheet]);

  // 총 결제금액 (100원 미만 절사)
  const totalPayment = useMemo(() => {
    return Math.floor(totalEstimatePrice / 100) * 100;
  }, [totalEstimatePrice]);

  // 총 결제수량 (총 결제금액 / 100)
  const totalQuantity = useMemo(() => totalPayment / 100, [totalPayment]);

  return (
    <MainBase>
      <Step1
        products={products}
        setOrders={setOrders}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
      <Step2 productPrice={productPrice} orders={orders} setOrders={setOrders} />
      <SubStep2
        tabOptions={tabOptions}
        tabPrice={tabPrice}
        holeOptions={holeOptions}
        holePrice={holePrice}
        angleOptions={angleOptions}
        anglePrice={anglePrice}
        subOrders={subOrders}
        setSubOrders={setSubOrders}
        selectOrders={selectOrders}
        setSelectOrders={setSelectOrders}
        handleAddToSheet={handleAddToSheet}
      />
      <Step3
        sheet={sheet}
        setSheet={setSheet}
        totalEstimatePrice={totalEstimatePrice}
        totalPayment={totalPayment}
        totalQuantity={totalQuantity}
      />
      <Step4 agree={agree} setAgree={setAgree} setCustomerInfo={setCustomerInfo} />

      <TableToPDF
        agree={agree}
        sheet={sheet}
        customerInfo={customerInfo}
        totalQuantity={totalQuantity}
        totalPayment={totalPayment}
      />
    </MainBase>
  );
};

export default Main;

const MainBase = styled.main`
  background-color: #f8f8f8;
  padding: 0 15px;
`;
