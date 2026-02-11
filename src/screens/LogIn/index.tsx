import CallToActions from "@/components/common/CallToActions";
import LoginForm from "@/components/common/LoginForm";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Login || GoTrip - Travel & Tour ReactJs Template",
  description: "GoTrip - Travel & Tour ReactJs Template",
};

const LogIn = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="container">
          <div className="row justify-center">
            <div className="col-xl-6 col-lg-7 col-md-9">
              <div className="px-50 py-50 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4">
                <LoginForm />
                {/* End .Login */}

                <div className="row y-gap-20 pt-30">
                  {/* <div className="col-12">
                    <div className="text-center">or sign in with</div>
                  </div> */}
                  {/* <LoginWithSocial /> */}
                </div>
                {/* End .row */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <CallToActions /> */}
    </>
  );
};

export default LogIn;
