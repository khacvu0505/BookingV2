import React from "react";
import MetaComponent from "@/apps/MetaComponent";

const metadata = {
  title: "Operating Regulations",
  description: "OKdimall - Travel & Tour",
};

const PrivacyPolicies = () => {
  <MetaComponent meta={metadata} />;

  return (
    <div className="mb-50">
      <section className="mt-100 md:mt-80">
        <div className="container">
          <h1 className="text-neutral-800 text-24 lg:text-20 font-bold mb-4">
            CHÍNH SÁCH BẢO MẬT
          </h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-neutral-800 text-20 lg:text-18 font-semibold mb-3">
                Mục đích và phạm vi thu thập
              </h2>
              
              <h3 className="text-neutral-800 text-18 lg:text-16 font-medium mb-2">
                Mục đích thu thập thông tin:
              </h3>
              <p className="text-neutral-800 text-16 lg:text-14 mb-4">
                Chúng tôi thu thập thông tin cá nhân chỉ cần thiết nhằm phục vụ cho các mục đích sau đây:
              </p>
              <ul className="list-disc pl-6 text-neutral-800 text-16 lg:text-14 space-y-2">
                <li>Đơn Hàng: để xử lý các vấn đề liên quan đến đơn đặt hàng của bạn;</li>
                <li>Duy Trì Tài Khoản: để tạo và duy trình tài khoản của bạn với chúng tôi, bao gồm cả các chương trình khách hàng thân thiết hoặc các chương trình thưởng đi kèm với tài khoản của bạn.</li>
                <li>Dịch Vụ Người Tiêu Dùng, Dịch Vụ Chăm Sóc Khách Hàng: bao gồm các phản hồi cho các yêu cầu, khiếu nại và phản hồi của bạn;</li>
                <li>Cá Nhân Hóa: Chúng tôi có thể tổ hợp dữ liệu được thu thập để có một cái nhìn hoàn chỉnh hơn về một người tiêu dùng và từ đó cho phép chúng tôi phục vụ tốt hơn với sự cá nhân hóa mạnh hơn ở các khía cạnh, bao gồm nhưng không giới hạn: (i) để cải thiện và cá nhân hóa trải nghiệm của bạn trên website thương mại điện tử OKdimall (ii) để cải thiện các tiện ích, dịch vụ, điều chỉnh chúng phù hợp với các nhu cầu được cá thể hóa và đi đến những ý tưởng dịch vụ mới (iii) để phục vụ bạn với những giới thiệu, quảng cáo được điều chỉnh phù hợp với sự quan tâm của bạn.</li>
                <li>An Ninh: cho các mục đích ngăn ngừa các hoạt động phá hủy tài khoản người dùng của khách hàng hoặc các hoạt động giả mạo khách hàng.</li>
                <li>Theo yêu cầu của pháp luật: tùy quy định của pháp luật vào từng thời điểm, chúng tôi có thể thu thập, lưu trữ và cung cấp theo yêu cầu của cơ quan nhà nước có thẩm quyền.</li>
              </ul>

              <h3 className="text-neutral-800 text-18 lg:text-16 font-medium mb-2 mt-4">
                Phạm vi thu thập:
              </h3>
              <p className="text-neutral-800 text-16 lg:text-14 mb-2">
                Đối với Người bán: OKdimall thu thập các thông tin về: Địa chỉ email, mật khẩu, họ tên, số điện thoại, mã số thuế/ngày cấp/nơi cấp.
              </p>
              <p className="text-neutral-800 text-16 lg:text-14">
                Đối với Người mua: OKdimall thu thập các thông tin sau: Họ và tên; địa chỉ; số điện thoại; email.
              </p>
            </div>

            <div>
              <h2 className="text-neutral-800 text-20 lg:text-18 font-semibold mb-3">
                Phạm vi sử dụng thông tin:
              </h2>
              <p className="text-neutral-800 text-16 lg:text-14 mb-4">
                OKdimall sẽ sử dụng những thông tin cá nhân mà Khách hàng cung cấp để thực hiện các công việc sau:
              </p>
              <ul className="list-disc pl-6 text-neutral-800 text-16 lg:text-14 space-y-2">
                <li>Hỗ trợ Khách hàng giải đáp mọi thắc mắc, băn khoăn liên quan đến các sản phẩm/dịch vụ mà Khách hàng quan tâm;</li>
                <li>Cung cấp thông tin liên quan đến sản phẩm và các ưu đãi/khuyến mại mới dành cho Khách hàng nếu Khách hàng đăng ký nhận email thông báo;</li>
                <li>Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của Khách hàng hoặc các hoạt động giả mạo thành viên;</li>
                <li>Liên lạc và giải quyết với Khách hàng trong những trường hợp đặc biệt.</li>
                <li>Hỗ trợ hệ thống chăm sóc khách hàng, quản lý khách hàng, chăm sóc và nhận ý kiến phản hồi từ phía khách hàng của OKdimall.</li>
                <li>Trong trường hợp có yêu cầu của pháp luật: giao dịch TMĐT OKdimall có trách nhiệm hợp tác cung cấp thông tin cá nhân thành viên khi có yêu cầu từ cơ quan tư pháp gồm: Viện kiểm sát, Tòa án, Cơ quan Công an điều tra liên quan đến hành vi vi phạm pháp luật nào đó của Khách hàng.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-neutral-800 text-20 lg:text-18 font-semibold mb-3">
                Các bên thứ ba được quyền tiếp cận thông tin cá nhân của Khách hàng:
              </h2>
              <p className="text-neutral-800 text-16 lg:text-14 mb-4">
                Chúng tôi sẽ không cung cấp thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào, trừ một số hoạt động cần thiết dưới đây:
              </p>
              <ul className="list-disc pl-6 text-neutral-800 text-16 lg:text-14 space-y-2">
                <li>Các đối tác là bên cung cấp dịch vụ cho chúng tôi liên quan đến thực hiện đơn hàng và chỉ giới hạn trong phạm vi thông tin cần thiết cũng như áp dụng các quy định đảm bảo an ninh, bảo mật các thông tin cá nhân.</li>
                <li>Chúng tôi có thể sử dụng dịch vụ từ một nhà cung cấp dịch vụ là bên thứ ba để thực hiện một số hoạt động liên quan đến website OKdimall và khi đó bên thứ ba này có thể truy cập hoặc xử lý các thông tin cá nhân trong quá trình cung cấp các dịch vụ đó. Chúng tôi yêu cầu các bên thứ ba này tuân thủ mọi luật lệ về bảo vệ thông tin cá nhân liên quan và các yêu cầu về an ninh liên quan đến thông tin cá nhân.</li>
                <li>Yêu cầu pháp lý: Chúng tôi có thể tiết lộ các thông tin cá nhân nếu điều đó do luật pháp quy định và việc tiết lộ như vậy là cần thiết một cách hợp lý để tuân thủ các quy trình pháp lý.</li>
                <li>Chuyển giao kinh doanh (nếu có): trong trường hợp sáp nhập, hợp nhất toàn bộ hoặc một phần với công ty khác, người mua sẽ có quyền truy cập thông tin được chúng tôi lưu trữ, duy trì trong đó bao gồm cả thông tin cá nhân.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-neutral-800 text-20 lg:text-18 font-semibold mb-3">
                Thời gian lưu trữ thông tin:
              </h2>
              <p className="text-neutral-800 text-16 lg:text-14">
                Thông tin cá nhân của khách hàng sẽ được lưu trữ cho đến khi khách hàng có yêu cầu hủy bỏ hoặc khách hàng tự đăng nhập và thực hiện hủy bỏ. Trong mọi trường hợp thông tin cá nhân của khách hàng sẽ được bảo mật trên máy chủ của OKdimall.
              </p>
            </div>

            <div>
              <h2 className="text-neutral-800 text-20 lg:text-18 font-semibold mb-3">
                Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân:
              </h2>
              <ul className="list-disc pl-6 text-neutral-800 text-16 lg:text-14 space-y-2">
                <li>Tên đơn vị: CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ DU LỊCH OKDIMALL</li>
                <li>Mã số thuế: 4201934832</li>
                <li>Trụ sở chính: 3/2 Nguyễn Lộ Trạch, phường Nha Trang, tỉnh Khánh Hòa, Việt Nam</li>
                <li>Hotline: 0886 479 456</li>
                <li>Email: ca@OKdimall.com</li>
              </ul>
            </div>

            <div>
              <h2 className="text-neutral-800 text-20 lg:text-18 font-semibold mb-3">
                Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình:
              </h2>
              <p className="text-neutral-800 text-16 lg:text-14">
                Người dùng có quyền tiếp cận để tự kiểm tra, cập nhật, chỉnh sửa hoặc hủy bỏ các dữ liệu cá nhân của mình bằng cách đăng nhập vào tài khoản của mình trên OKdimall và chỉnh sửa thông tin cá nhân, hoặc người dùng có thể yêu cầu OKdimall hỗ trợ thực hiện việc này. Việc đăng nhập vào website của OKdimall có thể thực hiện trên máy tính, điện thoại, hay các công cụ khác có tính năng truy cập vào website.
              </p>
            </div>
            <div>
              <h2 className="text-neutral-800 text-20 lg:text-18 font-semibold mb-3">
                Cam kết bảo mật thông tin cá nhân khách hàng
              </h2>
              <p className="text-neutral-800 text-16 lg:text-14 mb-4">
                Thông tin cá nhân của người dùng trên OKdimall được cam kết bảo mật theo chính sách bảo vệ thông tin cá nhân. Việc thu thập và sử dụng thông tin của người dùng chỉ được thực hiện khi có sự đồng ý của người dùng trừ những trường hợp pháp luật có quy định khác hoặc thỏa thuận khác. Chúng tôi cam kết rằng:
              </p>
              <ul className="list-disc pl-6 text-neutral-800 text-16 lg:text-14 space-y-2 mb-4">
                <li>Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của người dùng khi không có sự cho phép đồng ý từ người dùng nhằm trục lợi.</li>
                <li>Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân của thành viên, OKdimall sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho người dùng được biết.</li>
                <li>Chúng tôi yêu cầu các cá nhân khi đăng ký tài khoản và sử dụng dịch vụ trên OKdimall phải cung cấp đầy đủ thông tin cá nhân có liên quan và chịu trách nhiệm về tính chính xác, pháp lý và cập nhật của những thông tin trên. Công ty không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến quyền lợi của người dùng nếu xét thấy thông tin cá nhân của người dùng đó cung cấp là không chính xác.</li>
                <li>OKdimall sẽ không chịu trách nhiệm trong trường hợp thông tin cá nhân bị rò rỉ phát sinh từ lỗi kỹ thuật, lỗi đường truyền, lỗi phần mềm hoặc lỗi khác không phải do công ty gây ra.</li>
              </ul>
              <p className="text-neutral-800 text-16 lg:text-14 mb-4">
                Website thiết lập hệ thống bảo vệ thông tin cá nhân người sử dụng qua các hình thức sau:
              </p>
              <ol className="list-decimal pl-6 text-neutral-800 text-16 lg:text-14 space-y-2 mb-4">
                <li>Thiết lập hệ thống tường lửa ngăn ngừa các hình thức tấn công mạng.</li>
                <li>Đội ngũ kỹ thuật, nhân viên của doanh nghiệp thường xuyên túc trực theo dõi toàn bộ hoạt động của trang mạng. Đảm bảo mọi cuộc tấn công từ các phía đều được phát hiện kịp thời và thực hiện biện pháp ngăn chặn.</li>
                <li>Các thông tin cá nhân, thông tin riêng của người sử dụng sẽ được lưu trữ theo các quy định của Công ty và thực hiện bảo mật nghiêm ngặt theo các quy định của pháp luật.</li>
              </ol>
            </div>

            <div>
              <h2 className="text-neutral-800 text-20 lg:text-18 font-semibold mb-3">
                Chính sách Bảo mật thanh toán trực tuyến
              </h2>
              <p className="text-neutral-800 text-16 lg:text-14 mb-4">
                Chính sách giao dịch thanh toán bằng thẻ nội địa và thẻ quốc tế đảm bảo tuân thủ các tiêu chuẩn bảo mật của các Đối Tác Cổng Thanh Toán/ví điện tử gồm:
              </p>
              <ul className="list-disc pl-6 text-neutral-800 text-16 lg:text-14 space-y-2 mb-4">
                <li>Tiêu chuẩn bảo mật dữ liệu trên internet SSL (Secure Sockets Layer) do GlobalSign cấp. Chứng nhận tiêu chuẩn bảo mật dữ liệu thông tin thanh toán (PCI DSS) do Trustwave cung cấp.</li>
                <li>Tiêu chuẩn mã hóa MD5 128 bit.</li>
                <li>Các nguyên tắc và quy định bảo mật thông tin trong ngành tài chính ngân hàng theo quy định của Ngân hàng nhà nước Việt Nam.</li>
              </ul>
              <ul className="list-disc pl-6 text-neutral-800 text-16 lg:text-14 space-y-2 mb-4">
                <li>Thông tin Thẻ thanh toán của khách hàng không lưu trên hệ thống của website mà được lưu giữ và bảo mật theo tiêu chuẩn quốc tế PCI DSS trên các Đối Tác Cổng Thanh Toán/ví điện tử.</li>
                <li>Khách hàng truy cập vào website thông qua giao thức HTTPS.</li>
                <li>Khách hàng có tuỳ chọn sử dụng OTP để truy cập và giao dịch.</li>
                <li>Hệ thống nội bộ giữa các modules của Đối Tác Cổng Thanh Toán/ví điện tử sử dụng các phương thức trao đổi mã hoá keys: Các hệ thống ứng dụng trao đổi dữ liệu nội bộ được mã hoá bằng bộ khóa private & public key đảm bảo tính bảo mật và toàn vẹn dữ liệu.</li>
              </ul>
              <p className="text-neutral-800 text-16 lg:text-14 mb-4">
                Chính sách bảo mật giao dịch trong thanh toán của OKdimall áp dụng với Khách hàng trên nền tảng:
              </p>
              <ul className="list-disc pl-6 text-neutral-800 text-16 lg:text-14 space-y-2 mb-4">
                <li>OKdimall không trực tiếp lưu trữ thông tin thẻ của khách hàng. Việc bảo mật thông tin thẻ của Khách hàng được thực hiện bởi Đối Tác Cổng Thanh Toán/ví điện tử.</li>
                <li>Đối với thẻ quốc tế: thông tin thẻ thanh toán của Khách hàng mà có khả năng sử dụng để xác lập giao dịch không được lưu trữ trên hệ thống của OKdimall. Đối Tác Cổng Thanh Toán/ví điện tử sẽ lưu trữ và bảo mật các thông tin này.</li>
                <li>Đối với thẻ nội địa: OKdimall chỉ lưu trữ mã đơn hàng/đặt hẹn, mã giao dịch và tên ngân hàng.</li>
                <li>OKdimall cam kết đảm bảo thực hiện nghiêm túc các biện pháp bảo mật cần thiết cho mọi hoạt động thanh toán thực hiện trên Website.</li>
              </ul>
              <p className="text-neutral-800 text-16 lg:text-14 mb-4">
                Các lưu ý khi thanh toán qua mạng:
              </p>
              <ul className="list-disc pl-6 text-neutral-800 text-16 lg:text-14 space-y-2 mb-4">
                <li>Chỉ sử dụng trang web có chứng chỉ thanh toán an toàn.</li>
                <li>Tuyệt đối không cho người khác mượn thẻ hoặc tài khoản của mình để thực hiện thanh toán tại website.</li>
                <li>Trong trường hợp phát sinh các giao dịch ngoài ý muốn trên OKdimall, khách hàng vui lòng liên hệ với Tổng đài CSKH được công cố trên website và Tổng đài của Cổng thanh toán/Ngân hàng mà phát sinh giao dịch đó.</li>
                <li>Kiểm tra tài khoản ngân hàng của mình thường xuyên để đảm bảo tất cả giao dịch qua thẻ đều nằm trong tầm kiểm soát.</li>
              </ul>
              <p className="text-neutral-800 text-16 lg:text-14 mb-4">
                Cơ chế tiếp nhận và giải quyết khiếu nại của người tiêu dùng liên quan đến việc thông tin cá nhân bị sử dụng sai mục đích hoặc phạm vi đã thông báo:
              </p>
              <p className="text-neutral-800 text-16 lg:text-14 mb-4">
                Khi người tiêu dùng phát hiện thông tin cá nhân của mình trên OKdimall bị sử dụng sai mục đích hoặc ngoài phạm vi sử dụng thông tin, người tiêu dùng có thể gửi khiếu nại đến Công ty TNHH Thương mại và dịch vụ du lịch OKdimall theo các cách thức sau:
              </p>
              <ul className="list-disc pl-6 text-neutral-800 text-16 lg:text-14 space-y-2 mb-4">
                <li>Gọi điện thoại đến số hotline: 0886 479 456</li>
                <li>Gửi email khiếu nại đến địa chỉ: ca@OKdimall.com</li>
                <li>Gửi văn bản khiếu nại theo đường bưu điện đến hoặc gửi trực tiếp tại trụ sở công ty, địa chỉ 3/2 Nguyễn Lộ Trạch, phường Nha Trang, tỉnh Khánh Hòa, Việt Nam</li>
              </ul>
              <p className="text-neutral-800 text-16 lg:text-14 mb-4">
                Thời hạn để Công ty xử lý phản ánh liên quan đến thông tin cá nhân khách hàng là 07 ngày làm việc, kể từ ngày tiếp nhận được khiếu nại của Khách hàng.
              </p>
              <p className="text-neutral-800 text-16 lg:text-14 mb-4">
                Trong mọi trường hợp, OKdimall đề cao việc thương lượng, hòa giải với Khách hàng để thống nhất và đưa ra biện pháp giải quyết, xử lý khiếu nại.
              </p>
              <p className="text-neutral-800 text-16 lg:text-14 mb-4">
                Trong trường hợp hai bên không đạt được sự thỏa thuận như mong muốn dẫn đến thương lượng, hòa giải không thành, một trong hai bên có quyền đưa vụ việc ra tòa án nhân dân có thẩm quyền để giải quyết theo quy định của pháp luật.
              </p>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicies;
