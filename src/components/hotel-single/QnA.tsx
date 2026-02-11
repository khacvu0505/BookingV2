import QnA from "../qnA/QnA";

const QnAList = ({ listQnA }) => {
  return (
    <div
      className="accordion -simple row y-gap-10 js-accordion mt-10 mx-auto"
      id="Faq1"
    >
      <QnA faqContent={listQnA} />
    </div>
  );
};

export default QnAList;
