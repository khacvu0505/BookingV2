import React from "react";
import MetaComponent from "@/apps/MetaComponent";

const metadata = {
  title: "Operating Regulations",
  description: "OKdimall - Travel & Tour",
};

const DisputeResolutionMechanism = () => {
  <MetaComponent meta={metadata} />;

  return (
    <div className="mb-50">
      <section className="mt-100 md:mt-80">
        <div className="container">
          <h1 className="text-neutral-800 text-24 lg:text-20 font-bold mb-4">
            CƠ CHẾ GIẢI QUYẾT TRANH CHẤP, KHIẾU NẠI
          </h1>
          <p className="text-neutral-800 text-16 lg:text-14 mb-4">
            Khi phát sinh tranh chấp hoặc khiếu nại, OKdimall khuyến khích giải pháp thương lượng, hòa giải giữa các bên để đạt được sự đồng thuận về phương án giải quyết. Nếu hai bên không thể thương lượng với nhau và yêu cầu OKdimall đứng ra giải quyết vụ việc. Khi đó, quyết định của OKdimall là quyết định cuối cùng.
          </p>

          <h2 className="text-neutral-800 text-20 lg:text-18 font-bold mb-3">
            Đầu mối tiếp nhận giải quyết tranh chấp:
          </h2>
          <p className="text-neutral-800 text-16 lg:text-14 mb-2">
            CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ DU LỊCH OKDIMALL VIỆT NAM
          </p>
          <ul className="text-neutral-800 text-16 lg:text-14 mb-4 list-disc pl-6">
            <li>3/2 Nguyễn Lộ Trạch, phường Nha Trang, tỉnh Khánh Hòa, Việt Nam</li>
            <li>Email: ca@OKdimall.com</li>
            <li>Hotline: 0886479456</li>
          </ul>

          <h2 className="text-neutral-800 text-20 lg:text-18 font-bold mb-3">
            Trình tự giải quyết tranh chấp:
          </h2>
          <ol className="text-neutral-800 text-16 lg:text-14 mb-4 list-decimal pl-6">
            <li>OKdimall tiếp nhận thông tin khiếu nại, tranh chấp.</li>
            <li>OKdimall xác thực thông tin.</li>
            <li>OKdimall đứng ra làm bên thứ 3 hòa giải cho các thành viên (nếu là tranh chấp giữa Người mua và Nhà cung cấp), hoặc tiến hành thương lượng với thành viên (nếu là tranh chấp giữa thành viên với OKdimall).</li>
            <li>Giải quyết tranh chấp theo thương lượng, hòa giải nếu thương lượng/hòa giải thành.</li>
            <li>Nếu thương lượng hòa giải không thành, tranh chấp sẽ được giải quyết tại Tòa án nhân dân có thẩm quyền. Phán quyết của tòa có giá trị ràng buộc với các bên.</li>
          </ol>

          <h2 className="text-neutral-800 text-20 lg:text-18 font-bold mb-3">
            Cụ thể:
          </h2>
          <div className="text-neutral-800 text-16 lg:text-14 mb-4">
            <p className="font-bold mb-2">+ Đối với trường hợp phát sinh tranh chấp giữa Nhà cung cấp với Người mua:</p>
            <p className="mb-2">
              Các bên phải có vai trò trách nhiệm trong việc tích cực giải quyết vấn đề. Website cung cấp dịch vụ TMĐT OKdimall.com có trách nhiệm đứng ra làm trung gian để tiếp nhận thông tin từ Người sử dụng dịch vụ – chuyển thông tin đến cho Người cung cấp dịch vụ lưu trú, thực hiện hòa giải giữa Hai bên và thúc đẩy quá trình giải quyết vụ việc giữa Hai bên.
            </p>
            <p className="mb-2">
              Đối với Người cung cấp dịch vụ lưu trú: cần có trách nhiệm cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang gây mâu thuẫn cho Người sử dụng dịch vụ. Về phía OKdimall.com, chúng tôi sẽ có trách nhiệm cung cấp những thông tin liên quan đến một bên thành viên nếu được bên còn lại yêu cầu.
            </p>
            <p className="mb-2">
              Sau khi Người sử dụng dịch vụ và Người cung cấp dịch vụ lưu trú đã giải quyết xong tranh chấp, các bên phải có trách nhiệm báo lại cho Ban quản lý Website cung cấp dịch vụ TMĐT OKdimall.com. Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Người cung cấp dịch vụ lưu trú: OKdimall.com sẽ có biện pháp cảnh cáo, khóa tài khoản hoặc chuyển cho cơ quan pháp luật có thẩm quyền tùy theo mức độ của sai phạm.
            </p>
            <p className="mb-2">
              Nếu thông qua hình thức thỏa thuận mà vẫn không thể giải quyết được mâu thuẫn phát sinh từ giao dịch giữa 2 bên Người sử dụng dịch vụ và Người cung cấp dịch vụ lưu trú, một trong hai bên có quyền đưa vụ việc ra giải quyết tại Tòa án nhân dân có thẩm quyền.
            </p>
          </div>

          <div className="text-neutral-800 text-16 lg:text-14 mb-4">
            <p className="font-bold mb-2">+ Đối với trường hợp phát sinh tranh chấp giữa thành viên (người dùng nói chung) với OKdimall:</p>
            <p className="mb-2">
              OKdimall có trách nhiệm lớn nhất trong việc giải quyết mâu thuẫn, hòa giải, đảm bảo lợi ích của thành viên. Nếu mâu thuẫn được xác định là lỗi của OKdimall, Ban quản trị website sẽ nhanh chóng đưa ra phương án giải quyết để đạt được các tiêu chí do bên còn lại đặt ra.
            </p>
            <p className="mb-2">
              Nếu việc thỏa thuận không đạt được kết quả như hai bên mong muốn, một trong các bên có quyền đưa vụ việc ra giải quyết tại Tòa án nhân dân có thẩm quyền.
            </p>
          </div>

          <p className="text-neutral-800 text-16 lg:text-14">
            OKdimall cam kết giải quyết mọi tranh chấp, khiếu nại trên cơ sở khách quan, dựa trên thỏa thuận hợp đồng và quy định pháp luật.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DisputeResolutionMechanism;
