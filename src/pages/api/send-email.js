const nodemailer = require('nodemailer');

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // const { email, title, message, file } = req.body;
    const { email, title, sheet, customerInfo, totalPayment, totalQuantity } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      host: 'smtp.gmail.com',
      secure: false,
      requireTLS: true,
      auth: {
        user: 'hamjinsoo90@gmail.com',
        pass: 'czdcnrdhfkbrfelt',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 테이블을 HTML 문자열로 변환
    const tableRows = sheet
      .map(
        item => `
      <tr>
        <td style="padding: 12px 0; font-size: 15px; text-align: center; background: #fff; border-bottom: 1px solid #aaa;">${item.product}</td>
        <td style="padding: 12px 0; font-size: 15px; text-align: center; background: #fff; border-bottom: 1px solid #aaa;">실버</td>
        <td style="padding: 12px 0; font-size: 15px; text-align: center; background: #fff; border-bottom: 1px solid #aaa;">${item.length}mm</td>
        <td style="padding: 12px 0; font-size: 15px; text-align: center; background: #fff; border-bottom: 1px solid #aaa;">${item.amount}개</td>
        <td style="padding: 12px 0; font-size: 15px; text-align: center; background: #fff; border-bottom: 1px solid #aaa;">${item.productPrice.toLocaleString()}원</td>
        <td style="padding: 12px 0; font-size: 15px; text-align: center; background: #fff; border-bottom: 1px solid #aaa;">
            ${item.tab.value !== '' ? `* 탭가공: ${item.tab.value} / ${item.tab.amount}개` : ''}
            ${item.hole.value !== '' ? `* 홀가공: ${item.hole.value} / ${item.hole.amount}개` : ''}
            ${
              item.angle.value !== ''
                ? `* 45도각도 절단: ${item.angle.value} / ${item.angle.amount}개`
                : ''
            }
        </td>
        <td style="padding: 12px 0; font-size: 15px; text-align: center; background: #fff; border-bottom: 1px solid #aaa;">${(item.tabPrice + item.anglePrice + item.holePrice).toLocaleString()}원</td>
        <td style="padding: 12px 0; font-size: 15px; text-align: center; background: #fff; border-bottom: 1px solid #aaa;">${(item.productPrice + item.tabPrice + item.anglePrice + item.holePrice).toLocaleString()}원</td>
      </tr>
    `,
      )
      .join('');

    const mailOptions = {
      from: 'hamjinsoo90@gmail.com',
      to: ['heyya1588@gmail.com', email],
      subject: title,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 1000px; margin: auto; padding: 0 0 30px;">
          <h2 style="color: #333; text-align: center; font-size: 25px;">견 적 서</h2>
          
          <table width="100%" border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; margin-top: 30px;">
            <tr>
              <th style="padding: 15px 0; font-size: 15px; text-align: center; background: #f2f2f2; border-bottom: 1px solid #aaa;">성함</th>
              <td style="padding: 15px 0; font-size: 15px; text-align: center; background: #fff; border-bottom: 1px solid #aaa;">${customerInfo.name}</td>
              <th style="padding: 15px 0; font-size: 15px; text-align: center; background: #f2f2f2; border-bottom: 1px solid #aaa;">연락처</th>
              <td style="padding: 15px 0; font-size: 15px; text-align: center; background: #fff; border-bottom: 1px solid #aaa;">${customerInfo.tel}</td>
            </tr>
            <tr>
              <th style="padding: 15px 0; font-size: 15px; text-align: center; background: #f2f2f2; border-bottom: 1px solid #aaa;">이메일</th>
              <td style="padding: 15px 0; font-size: 15px; text-align: center; background: #fff; border-bottom: 1px solid #aaa;">${customerInfo.email}</td>
              <th style="padding: 15px 0; font-size: 15px; text-align: center; background: #f2f2f2; border-bottom: 1px solid #aaa;">견적 날짜</th>
              <td style="padding: 15px 0; font-size: 15px; text-align: center; background: #fff; border-bottom: 1px solid #aaa;">${new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr>
          </table>

          <table width="100%" border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; margin-top:50px;">
            <thead>
              <tr style="background: #f2f2f2;">
                <th style="padding: 15px 0; font-weight: 600; text-align: center;">제품명</th>
                <th style="padding: 15px 0; font-weight: 600; text-align: center;">색상</th>
                <th style="padding: 15px 0; font-weight: 600; text-align: center;">주문크기</th>
                <th style="padding: 15px 0; font-weight: 600; text-align: center;">수량</th>
                <th style="padding: 15px 0; font-weight: 600; text-align: center;">금액</th>
                <th style="padding: 15px 0; font-weight: 600; text-align: center;">가공옵션</th>
                <th style="padding: 15px 0; font-weight: 600; text-align: center;">가공금액</th>
                <th style="padding: 15px 0; font-weight: 600; text-align: center;">총금액</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>

          <table width="100%" border="1"  cellspacing="0" cellpadding="8" style="border-collapse: collapse;">
            <tr>
              <th th style="padding: 12px 0; font-size: 15px; text-align: center; background: #f2f2f2;">총 수량</th>
              <td style="padding: 12px 0; font-size: 15px; text-align: center; background: #fff;">${totalQuantity}개</td>
              <th th style="padding: 12px 0; font-size: 15px; text-align: center; background: #f2f2f2;">총 견적비용</th>
              <td style="padding: 12px 0; font-size: 15px; text-align: center; background: #fff;">${totalPayment.toLocaleString()}원</td>
            </tr>
          </table>

          ${
            customerInfo.remark
              ? `<p style="margin-top: 15px; color: blue;"><strong>요청사항:</strong> ${customerInfo.remark}</p>`
              : ''
          }
        </div>
      `,
    };

    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ message: '이메일이 성공적으로 전송되었습니다.' });
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
