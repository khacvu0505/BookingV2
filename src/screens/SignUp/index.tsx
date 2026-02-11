import CallToActions from "@/components/common/CallToActions";

import SignUpForm from "@/components/common/SignUpForm";

import MetaComponent from "@/components/common/MetaComponent";
import Footer2 from "@/components/footer/footer-2";
import { useTranslation } from "react-i18next";

const metadata = {
  title: "Sign Up || GoTrip - Travel & Tour ReactJs Template",
  description: "GoTrip - Travel & Tour ReactJs Template",
};

const SignUp = () => {
  const { t } = useTranslation();
  return (
    <>
      <MetaComponent meta={metadata} />

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="container">
          <div className="row justify-center">
            <div className="col-xl-6 col-lg-7 col-md-9">
              <div className="bg-white shadow-4 rounded-4 px-30 py-30">
                <SignUpForm />
                {/* End SignUP */}

                <div className="row y-gap-20 pt-30">
                  {/* <div className="col-12">
                    <div className="text-center">or sign in with</div>
                  </div>
                  <LoginWithSocial /> */}
                  <div className="col-12">
                    <div className="text-center px-30">
                      {t("AUTH.SIGNUP/DESCRIPTION")}
                    </div>
                  </div>
                </div>
                {/* End .row */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End login section */}

      {/* <CallToActions /> */}
      {/* End Call To Actions Section */}
    </>
  );
};

export default SignUp;
