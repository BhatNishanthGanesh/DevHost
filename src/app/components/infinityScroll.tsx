// components/CompanyScroll.js
const CompanyScroll = () => {
    const companies = [
      "Google", "Microsoft", "Amazon", "Apple", "Facebook", "Netflix", "Tesla",
      "Adobe", "Spotify", "Salesforce", "IBM", "Intel", "Oracle", "Cisco",
      "PayPal", "Uber", "Twitter", "LinkedIn", "Snapchat", "Slack"
    ];
  
    return (
      <div className="flex flex-col items-center space-y-8 py-8">
        {/* Company Name Scrolls */}
        {[20, 30, 25, 40].map((time, idx) => (
          <div key={idx} className="relative flex w-[700px] overflow-hidden mask">
            <div
              className="whitespace-nowrap animate-scroll"
              style={{ animationDuration: `${time}s` }}
            >
              {companies.map((company, index) => (
                <span
                  key={index}
                  className="inline-flex mx-2 px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-cyan-500 transition-colors"
                >
                  {company}
                </span>
              ))}
            </div>
            <div
              className="whitespace-nowrap animate-scroll-reverse"
              style={{ animationDuration: `${time}s` }}
            >
              {companies.map((company, index) => (
                <span
                  key={index}
                  className="inline-flex mx-2 px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-cyan-500 transition-colors"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default CompanyScroll;
  