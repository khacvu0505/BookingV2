import React from "react";
import MetaComponent from "@/apps/MetaComponent";
import "./PrivaryPolicy.style.scss";

const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy Description",
};
const PrivacyPolicy = () => {
  return (
    <div className="mt-60">
      <MetaComponent meta={metadata} />
      <div className="container mt-120 mb-60">
        <h1 className="text-30 lg:text-28 md:text-26 text-neutral-800 text-center mb-30">
          CHÍNH SÁCH BẢO MẬT
        </h1>
        <h2 className="text-22 lg:text-20 md:text-18 text-neutral-800">
          Mục đích và phạm vi thu thập
        </h2>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          + Mục đích thu thập thông tin:
        </p>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          Chúng tôi thu thập thông tin cá nhân chỉ cần thiết nhằm phục vụ cho
          các mục đích sau đây:
        </p>
        <ul className="privary_policy-list">
          <li>
            Đơn Hàng: để xử lý các vấn đề liên quan đến đơn đặt hàng của bạn;
          </li>
          <li>
            Duy Trì Tài Khoản: để tạo và duy trì tài khoản của bạn với chúng
            tôi, bao gồm cả các chương trình khách hàng thân thiết hoặc các
            chương trình thưởng đi kèm với tài khoản của bạn.
          </li>
          <li>
            Dịch Vụ Người Tiêu Dùng, Dịch Vụ Chăm Sóc Khách Hàng: bao gồm các
            phản hồi cho các yêu cầu, khiếu nại và phản hồi của bạn;
          </li>
          <li>
            Cá Nhân Hóa: Chúng tôi có thể tổ hợp dữ liệu được thu thập để có một
            cái nhìn hoàn chỉnh hơn về một người tiêu dùng và từ đó cho phép
            chúng tôi phục vụ tốt hơn với sự cá nhân hóa mạnh hơn ở các khía
            cạnh, bao gồm nhưng không giới hạn:
            <ul>
              <li>
                (i) để cải thiện và cá nhân hóa trải nghiệm của bạn trên website
                thương mại điện tử Okdimall.com
              </li>
              <li>
                (ii) để cải thiện các tiện ích, dịch vụ, điều chỉnh chúng phù
                hợp với các nhu cầu được cá thể hóa và đi đến những ý tưởng dịch
                vụ mới
              </li>
              <li>
                (iii) để phục vụ bạn với những giới thiệu, quảng cáo được điều
                chỉnh phù hợp với sự quan tâm của bạn.
              </li>
            </ul>
          </li>
          <li>
            An Ninh: cho các mục đích ngăn ngừa các hoạt động phá hủy tài khoản
            người dùng của khách hàng hoặc các hoạt động giả mạo khách hàng.
          </li>
          <li>
            Theo yêu cầu của pháp luật: tùy quy định của pháp luật vào từng thời
            điểm, chúng tôi có thể thu thập, lưu trữ và cung cấp theo yêu cầu
            của cơ quan nhà nước có thẩm quyền.
          </li>
        </ul>

        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          + Phạm vi thu thập:
        </p>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          Đối với Người bán: Okdimall.com thu thập các thông tin về: Địa chỉ,
          email, mật khẩu, họ tên, số điện thoại, mã số thuế/ngày cấp/nơi cấp.
        </p>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          Đối với Người mua: Okdimall.com thu thập các thông tin sau: Họ và tên;
          địa chỉ; số điện thoại; email.
        </p>

        <h2 className="text-22 lg:text-20 md:text-18 text-neutral-800 mt-20">
          Phạm vi sử dụng thông tin:
        </h2>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          Okdimall.com sẽ sử dụng những thông tin cá nhân mà Khách hàng cung cấp
          để thực hiện các công việc sau:
        </p>
        <ul className="privary_policy-list">
          <li>
            Hỗ trợ Khách hàng giải đáp mọi thắc mắc, băn khoăn liên quan đến các
            sản phẩm/dịch vụ mà Khách hàng quan tâm;
          </li>
          <li>
            Cung cấp thông tin liên quan đến sản phẩm và các ưu đãi/khuyến mại
            mới dành cho Khách hàng nếu Khách hàng đăng ký nhận email thông báo;
          </li>
          <li>
            Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của Khách hàng
            hoặc các hoạt động giả mạo thành viên;
          </li>
          <li>
            Liên lạc và giải quyết với Khách hàng trong những trường hợp đặc
            biệt.
          </li>
          <li>
            Hỗ trợ hệ thống chăm sóc khách hàng, quản lý khách hàng, chăm sóc và
            nhận ý kiến phản hồi từ phía khách hàng của Okdimall.com.
          </li>
          <li>
            Trong trường hợp có yêu cầu của pháp luật: giao dịch TMĐT
            Okdimall.com có trách nhiệm hợp tác cung cấp thông tin cá nhân thành
            viên khi có yêu cầu từ cơ quan tư pháp gồm: Viện kiểm sát, Tòa án,
            Cơ quan Công an điều tra liên quan đến hành vi vi phạm pháp luật nào
            đó của Khách hàng.
          </li>
        </ul>

        <h2 className="text-22 lg:text-20 md:text-18 text-neutral-800 mt-20">
          Các bên thứ ba được quyền tiếp cận thông tin cá nhân của Khách hàng:
        </h2>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          Chúng tôi sẽ không cung cấp thông tin cá nhân của bạn cho bất kỳ bên
          thứ ba nào, trừ một số hoạt động cần thiết dưới đây:
        </p>
        <ul className="privary_policy-list">
          <li>
            Các đối tác là bên cung cấp dịch vụ cho chúng tôi liên quan đến thực
            hiện đơn hàng và chỉ giới hạn trong phạm vi thông tin cần thiết cũng
            như áp dụng các quy định đảm bảo an ninh, bảo mật các thông tin cá
            nhân.
          </li>
          <li>
            Chúng tôi có thể sử dụng dịch vụ từ một nhà cung cấp dịch vụ là bên
            thứ ba để thực hiện một số hoạt động liên quan đến website
            Okdimall.com và khi đó bên thứ ba này có thể truy cập hoặc xử lý các
            thông tin cá nhân trong quá trình cung cấp các dịch vụ đó. Chúng tôi
            yêu cầu các bên thứ ba này tuân thủ mọi luật lệ về bảo vệ thông tin
            cá nhân liên quan và các yêu cầu về an ninh liên quan đến thông tin
            cá nhân.
          </li>
          <li>
            Yêu cầu pháp lý: Chúng tôi có thể tiết lộ các thông tin cá nhân nếu
            điều đó do luật pháp quy định và việc tiết lộ như vậy là cần thiết
            một cách hợp lý để tuân thủ các quy trình pháp lý.
          </li>
          <li>
            Chuyển giao kinh doanh (nếu có): trong trường hợp sáp nhập, hợp nhất
            toàn bộ hoặc một phần với công ty khác, người mua sẽ có quyền truy
            cập thông tin được chúng tôi lưu trữ, duy trì trong đó bao gồm cả
            thông tin cá nhân.
          </li>
        </ul>

        <h2 className="text-22 lg:text-20 md:text-18 text-neutral-800 mt-20">
          Thời gian lưu trữ thông tin:
        </h2>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          Thông tin cá nhân của khách hàng sẽ được lưu trữ cho đến khi khách
          hàng có yêu cầu hủy bỏ hoặc khách hàng tự đăng nhập và thực hiện hủy
          bỏ. Trong mọi trường hợp thông tin cá nhân của khách hàng sẽ được bảo
          mật trên máy chủ của Okdimall.com.
        </p>

        <h2 className="text-22 lg:text-20 md:text-18 text-neutral-800 mt-20">
          Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân:
        </h2>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          Tên đơn vị: CÔNG TY CỔ PHẦN OKDIMALL.COM VIỆT NAM
        </p>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          Mã số thuế: 4201934832
        </p>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          3/2 Nguyễn Lộ Trạch, phường Nha Trang, tỉnh Khánh Hòa, Việt Nam
        </p>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          Hotline: +84 886 479 456
        </p>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          Email: info@okdimall.com
        </p>

        <h2 className="text-22 lg:text-20 md:text-18 text-neutral-800 mt-20">
          Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá
          nhân của mình:
        </h2>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          Người dùng có quyền tiếp cận để tự kiểm tra, cập nhật, chỉnh sửa hoặc
          hủy bỏ các dữ liệu cá nhân của mình bằng cách đăng nhập vào tài khoản
          của mình trên Okdimall.com và chỉnh sửa thông tin cá nhân, hoặc người
          dùng có thể yêu cầu Okdimall.com hỗ trợ thực hiện việc này.
        </p>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          Việc đăng nhập vào website của Okdimall.com có thể thực hiện trên máy
          tính, điện thoại, hay các công cụ khác có tính năng truy cập vào
          website.
        </p>

        <h2 className="text-22 lg:text-20 md:text-18 text-neutral-800 mt-20">
          Cam kết bảo mật thông tin cá nhân khách hàng
        </h2>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          Thông tin cá nhân của người dùng trên Okdimall.com được cam kết bảo
          mật theo chính sách bảo vệ thông tin cá nhân. Việc thu thập và sử dụng
          thông tin của người dùng chỉ được thực hiện khi có sự đồng ý của người
          dùng trừ những trường hợp pháp luật có quy định khác hoặc thỏa thuận
          khác. Chúng tôi cam kết rằng:
        </p>
        <ul className="privary_policy-list">
          <li>
            Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3
            nào về thông tin cá nhân của người dùng khi không có sự cho phép
            đồng ý từ người dùng nhằm trục lợi.
          </li>
          <li>
            Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn
            đến mất mát dữ liệu cá nhân của thành viên, Okdimall.com sẽ có trách
            nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp
            thời và thông báo cho người dùng được biết.
          </li>
          <li>
            Chúng tôi yêu cầu các cá nhân khi đăng ký tài khoản và sử dụng dịch
            vụ trên Okdimall.com phải cung cấp đầy đủ thông tin cá nhân có liên
            quan và chịu trách nhiệm về tính chính xác, pháp lý và cập nhật của
            những thông tin trên. Công ty không chịu trách nhiệm cũng như không
            giải quyết mọi khiếu nại có liên quan đến quyền lợi của người dùng
            nếu xét thấy thông tin cá nhân của người dùng đó cung cấp là không
            chính xác.
          </li>
          <li>
            Okdimall.com sẽ không chịu trách nhiệm trong trường hợp thông tin cá
            nhân bị rò rỉ phát sinh từ lỗi kỹ thuật, lỗi đường truyền, lỗi phần
            mềm hoặc lỗi khác không phải do công ty gây ra.
          </li>
        </ul>

        <h2 className="text-22 lg:text-20 md:text-18 text-neutral-800 mt-20">
          Website thiết lập hệ thống bảo vệ thông tin cá nhân người sử dụng qua
          các hình thức sau:
        </h2>
        <ol className="privary_policy-list">
          <li>
            Thiết lập hệ thống tường lửa ngăn ngừa các hình thức tấn công mạng.
          </li>
          <li>
            Đội ngũ kỹ thuật, nhân viên của doanh nghiệp thường xuyên túc trực
            theo dõi toàn bộ hoạt động của trang mạng. Đảm bảo mọi cuộc tấn công
            từ các phía đều được phát hiện kịp thời và thực hiện biện pháp ngăn
            chặn.
          </li>
          <li>
            Các thông tin cá nhân, thông tin riêng của người sử dụng sẽ được lưu
            trữ theo các quy định của Công ty và thực hiện bảo mật nghiêm ngặt
            theo các quy định của pháp luật.
          </li>
        </ol>

        <h2 className="text-22 lg:text-20 md:text-18 text-neutral-800 mt-20">
          Cơ chế tiếp nhận và giải quyết khiếu nại của người tiêu dùng liên quan
          đến việc thông tin cá nhân bị sử dụng sai mục đích hoặc phạm vi đã
          thông báo:
        </h2>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          Khi người tiêu dùng phát hiện thông tin cá nhân của mình trên
          Okdimall.com bị sử dụng sai mục đích hoặc ngoài phạm vi sử dụng thông
          tin, người tiêu dùng có thể gửi khiếu nại đến Công Ty Tnhh Thương Mại
          Và Dịch Vụ Du Lịch Okdimall theo các cách thức sau:
        </p>
        <ul className="privary_policy-list">
          <li>
            Gọi điện thoại đến số hotline: <strong>+84 886 479 456</strong>
          </li>
          <li>
            Gửi email khiếu nại đến địa chỉ: <strong>info@okdimall.com</strong>
          </li>
          <li>
            Gửi văn bản khiếu nại theo đường bưu điện đến hoặc gửi trực tiếp tại
            trụ sở công ty, địa chỉ:{" "}
            <strong>
              3/2 Nguyễn Lộ Trạch, phường Nha Trang, tỉnh Khánh Hòa, Việt Nam
            </strong>
          </li>
        </ul>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          Thời hạn để Công ty xử lý phản ánh liên quan đến thông tin cá nhân
          khách hàng là <strong>07 ngày làm việc</strong>, kể từ ngày tiếp nhận
          được khiếu nại của Khách hàng.
        </p>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          Trong mọi trường hợp, Okdimall.com đề cao việc thương lượng, hòa giải
          với Khách hàng để thống nhất và đưa ra biện pháp giải quyết, xử lý
          khiếu nại.
        </p>
        <p className="text-16 lg:text-15 md:text-14 text-neutral-800">
          Trong trường hợp hai bên không đạt được sự thỏa thuận như mong muốn
          dẫn đến thương lượng, hòa giải không thành, một trong hai bên có quyền
          đưa vụ việc ra tòa án nhân dân có thẩm quyền để giải quyết theo quy
          định của pháp luật.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
