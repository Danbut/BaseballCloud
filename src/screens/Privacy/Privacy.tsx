import authBackgroundImage from 'assets/images';
import React, { VFC } from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'shared';

const ContentContainer = styled(Flex)`
  grid-area: content;
`;

const Modal = styled(Flex)`
  backdrop-filter: blur(5px);
`;

const Privacy: VFC = () => (
  <ContentContainer
    width="100%"
    height="100%"
    flexDirection="row"
    justifyContent="center"
    alignItems="center"
    overflow="auto"
    backgroundImage={`url(${authBackgroundImage})`}
    backgroundSize="cover"
    backgroundPosition="top center"
  >
    <Box height="100%" padding="15px" display="block">
      <Modal
        flexDirection="column"
        borderRadius="8px"
        boxShadow="0 0 20px rgba(0, 0, 0, 0.4)"
        width="100%"
        maxWidth="1200px"
        minHeight="400px"
        padding="30px 40px"
        alignItems="flex-start"
        margin="0 auto"
        background="hsla(0, 0%, 100%, 0.85)"
      >
        <h2>Privacy Policy</h2>
        <p>Last updated May 08, 2018</p>
        <p>
          DaTraks, LLC (“we” or “us” or “our”) respects the privacy of our users
          (“user” or “you”). This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our website
          baseballcloud.com including any other media form, media channel,
          mobile website, or mobile application, related to or connected thereto
          (collectively, the “Site”). Please read this Privacy Policy carefully.
          IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE DO
          NOT ACCESS THE SITE.
        </p>
        <p>
          We reserve the right to make changes to this Privacy Policy at any
          time and for any reason. We will alert you about any changes by
          updating the “Revised” date of this Privacy Policy. Any changes or
          modifications will be effective immediately upon posting the updated
          Privacy Policy on the Site, and you waive the right to receive
          specific notice of each such change or modification. You are
          encouraged to periodically review this Privacy Policy to stay informed
          of updates. You will be deemed to have been made aware of, will be
          subject to, and will be deemed to have accepted the changes in any
          revised Privacy Policy by your continued use of the Site after the
          date such revised Privacy Policy is posted.
        </p>
        <h3>COLLECTION OF YOUR INFORMATION</h3>
        <p>
          We may collect information about you in a variety of ways. The
          information we may collect on the Site includes:
        </p>
        <h4>Personal Data</h4>
        <p>
          Personally identifiable information, such as your name, shipping
          address, email address, and telephone number, and demographic
          information, such as your age, gender, hometown, and interests, that
          you voluntarily give to us when you register with the Site or when you
          choose to participate in various activities related to the Site, such
          as online chat and message boards. You are under no obligation to
          provide us with personal information of any kind, however your refusal
          to do so may prevent you from using certain features of the Site.
        </p>
        <h4>Financial Data</h4>
        <p>
          Financial information, such as data related to your payment method
          (e.g. valid credit card number, card brand, expiration date) that we
          may collect when you purchase, order, return, exchange, or request
          information about out services from the Site. We store only very
          limited, if any, financial information that we collect. Otherwise, all
          financial information is stored by our payment processor, Stripe, and
          you are encouraged to review their privacy policy and contact them
          directly for responses to your questions.
        </p>
        <h4>Data from Contests, Giveaways, and Surveys</h4>
        <p>
          Personal and other information you may provide when entering contests
          or giveaways and/or responding to surveys.
        </p>
        <h3>USE OF YOUR INFORMATION</h3>
        <p>
          Having accurate information about you permits us to provide you with a
          smooth, efficient, and customized experience. Specifically, we may use
          information collected about you via the Site to:
        </p>
        <ul>
          <li>Administer sweepstakes, promotions, and contests.</li>
          <li>
            Compile anonymous statistical data and analysis for use internally
            or with third parties.
          </li>
          <li>Create and manage your account.</li>
          <li>
            Deliver targeted advertising, coupons, newsletters, and promotions,
            and other information regarding our website and mobile application
            to you.
          </li>
          <li>Email you regarding your account or order.</li>
          <li>Enable user-to-user communications.</li>
          <li>
            Fulfill and manage purchases, orders, payments, and other
            transactions to the Site.
          </li>
          <li>
            Generate a personal profile about you to make future visits to the
            Site more personalized.
          </li>
          <li>Increase the efficiency and operation of the Site.</li>
          <li>
            Monitor and analyze usage and trends to improve your experience with
            the Site.
          </li>
          <li>Notify you of updates to the Site.</li>
          <li>Offer new products, services, and/or recommendations to you.</li>
          <li>Perform other business activities as needed.</li>
          <li>
            Prevent fraudulent transactions, monitor against theft, and protect
            against criminal activity.
          </li>
          <li>Process payments and refunds.</li>
          <li>Request feedback and contact you about your use of the Site.</li>
          <li>Resolve disputes and troubleshoot problems.</li>
          <li>Send you a newsletter.</li>
          <li>Solicit support for the Site.</li>
        </ul>
        <h3>DISCLOSURE OF YOUR INFORMATION</h3>
        <p>
          We may share information we have collected about you in certain
          situations. Your information may be disclosed as follows:
        </p>
        <h4>By Law or to Protect Rights</h4>
        <p>
          If we believe the release of information about you is necessary to
          respond to legal process, to investigate or remedy potential
          violations of our policies, or to protect the rights, property, and
          safety of others, we may share your information as permitted or
          required by any applicable law, rule, or regulation. This includes
          exchanging information with other entities for fraud protection and
          credit risk reduction.
        </p>
        <h4>Interactions with Other Users</h4>
        <p>
          If you interact with other users of the Site, those users may see your
          name, profile photo, and descriptions of your activity, including
          sending invitations to other users, chatting with other users, liking
          posts, following blogs.
        </p>
        <h4>Online Postings</h4>
        <p>
          When you post comments, contributions, or other content to the Site,
          your posts may be viewed by all users and may be publicly distributed
          outside the Site in perpetuity.
        </p>
        <h4>Third-Party Advertisers</h4>
        <p>
          We may use third-party advertising companies to serve ads when you
          visit the Site. These companies may use information about your visits
          to the Site and other websites that are contained in web cookies in
          order to provide advertisements about good and services of interest to
          you.
        </p>
        <h4>Affiliates</h4>
        <p>
          We may share your information with our affiliates, in which case we
          will require those affiliates to honor this Privacy Policy. Affiliates
          include our parent company and any subsidiaries, joint venture
          partners or other companies that we control or that are under common
          control with us.
        </p>
        <h4>Business Partners</h4>
        <p>
          We may share your information with our business partners to offer you
          certain products, services or promotions.
        </p>
        <h4>Other Third Parties</h4>
        <p>
          We may share your information with advertisers and investors for the
          purpose of conducting general business analysis. We may also share
          your information with such third parties for marketing purposes, as
          permitted by law.
        </p>
        <h4>Sale or Bankruptcy</h4>
        <p>
          If we recognize or sell all or a portion of our assets, undergo a
          merger, or are acquired by another entity, we may transfer your
          information to the successor entity. If we go out of business or enter
          bankruptcy, your information would be an asset transferred or acquired
          by a third party. You acknowledge that such transfers may occur and
          that the transferee may decline honor commitments we made in this
          Privacy Policy.
        </p>
        <p>
          We are not responsible for the actions of third parties with whom you
          share personal or sensitive data, and we have no authority to manage
          or control third-party solicitations. If you no longer wish to receive
          correspondence, emails, or other communications from third parties,
          you are responsible for contacting the third party directly.
        </p>
        <h3>TRACKING TECHNOLOGIES</h3>
        <h4>Cookies and Web Beacons</h4>
        <p>
          We may use cookies, web beacons, tracking pixels, and other tracking
          technologies on the Site to help customize the Site and improve your
          experience.
        </p>
        <h4>Internet-Based Advertising</h4>
        <p>
          Additionally, we may use third-party software to serve ads on the
          Site, implement email marketing campaigns, and manage other
          interactive marketing initiatives. This third-party software may use
          cookies or similar tracking technology to help manage and optimize
          your online experience with us.
        </p>
        <h4>Website Analytics</h4>
        <p>
          We may also partner with selected third-party vendors, such as Google
          Analytics, to allow tracking technologies and remarketing services on
          the Site through the use of first-party cookies and third-party
          cookies to, among other things, analyze and track users’ use of the
          Site, determine the popularity of certain content and better
          understand online activity. By accessing the Site, you consent to the
          collection and use of your information by these third-party vendors.
          You are encouraged to review their privacy policy and contact them
          directly for responses to your questions. We do not transfer personal
          information to these third-party vendors.
        </p>
        <p>
          You should be aware that getting a new computer, installing a new
          browser, upgrading an existing browser, or erasing or otherwise
          altering your browser’s cookie files may also clear certain opt-out
          cookies, plug-ins, or settings.
        </p>
        <h3>THIRD-PARTY WEBSITES</h3>
        <p>
          The Site may contain links to third-party websites and applications of
          interest, including advertisements and external services, that are not
          affiliated with us. Once you have used these links to leave the Site,
          any information you provide to these third parties is not covered by
          this Privacy Policy, and we cannot guarantee the safety and privacy of
          your information. Before visiting and providing any information to any
          third-party websites, you should inform yourself of the privacy
          policies and practices (if any) of the third party responsible for
          that website, and should take those steps necessary to, in your
          discretion, protect the privacy of your information. We are not
          responsible for the content or privacy and security practices and
          policies of any third parties, including other sites, services or
          applications that may be linked to or from the Site.
        </p>
        <h3>SECURITY OF YOUR INFORMATION</h3>
        <p>
          We use administrative, technical, and physical security measures to
          help protect your personal information. While we have taken reasonable
          steps to secure the personal information you provide us, please be
          aware that despite our efforts, no security measures are perfect or
          impenetrable, and no method of data transmission can be guaranteed
          against any interception or other type of misuse. Any information
          disclosed online is vulnerable to interception and misuse by
          unauthorized parties. Therefore, we cannot guarantee complete security
          if you provide personal information.
        </p>
        <h3>POLICY FOR CHILDREN</h3>
        <p>
          We do not knowingly solicit information from or market to children
          under the age of 13. If you become aware of any data we have collected
          from children under age 13, please contact us using the contact
          information provided below.
        </p>
        <h3>CONTROLS FOR DO-NOT-TRACK FEATURES</h3>
        <p>
          Most web browsers and some mobile operating systems include a
          Do-Not-Track (“DNT”) feature or setting you can activate to signal
          your privacy preference not to have data about your online browsing
          activities monitored and collected. No uniform technology standard for
          recognizing and implementing DNT signals has been finalized. As such,
          we do not currently respond to DNT browser signals or any other
          mechanism that automatically communicates your choice not to be
          tracked online. If a standard for online tracking is adopted that we
          must follow in the future, we will inform you about that practice in a
          revised version of this Privacy Policy.
        </p>
        <h3>OPTIONS REGARDING YOUR INFORMATION</h3>
        <h4>Account Information</h4>
        <p>
          You may at any time review or change the information in your account
          or terminate your account by:
        </p>
        <ul>
          <li>
            Logging into your user account settings and updating the user
            account.
          </li>
          <li>Contacting us using the contact information provided</li>
        </ul>
        <p>
          Upon your request to terminate your account, we will deactivate or
          delete your account and information from our active databases.
          However, some information may be retained in our files to prevent
          fraud, troubleshoot problems, assist with any investigations, enforce
          our Terms of Use and/or comply with legal requirements.
        </p>
        <h4>Emails and Communications</h4>
        <p>
          If you no longer wish to receive correspondence, emails, or other
          communications from us, you may opt-out by:
        </p>
        <ul>
          <li>
            Noting your preferences at the time you register your account with
            the Site.
          </li>
          <li>
            Logging into your account settings and updating your preferences.
          </li>
          <li>Contacting us using the contact information provided.</li>
        </ul>
        <p>
          If you no longer wish to receive correspondence, emails, or other
          communications from third parties, you are responsible for contacting
          the third party directly.
        </p>
        <h3>CALIFORNIA PRIVACY RIGHTS</h3>
        <p>
          California Civil Code Section 1798.83, also known as the “Shine The
          Light” law, permits our users who are California residents to request
          and obtain from us, once a year and free of charge, information about
          categories of personal information (if any) we disclosed to third
          parties for direct marketing purposes and the names and addresses of
          all third parties with which we shared personal information in the
          immediately preceding calendar year. If you are a California resident
          and would like to make such a request, please submit your request in
          writing to us using the contact information provided below.
        </p>
        <p>
          If you are under 18 years of age, reside in California, and have a
          registered account with the Site, you have the right to request
          removal of unwanted data that you publicly post on the Site. To
          request removal of such data, please contact us using the contact
          information provided below, and include the email address associated
          with your account and a statement that you reside in California. We
          will make sure the data is not publicly displayed on the Site, but
          please be aware that the data may not be completely or comprehensively
          removed from our systems
        </p>
        <h3>CONTACT US</h3>
        <p>
          If you have any questions or comments about this Privacy Policy,
          please contact us at:
        </p>
        <p>
          DaTraks, LLC
          <br />
          2111 E. Michigan Street, Suite 144
          <br />
          Orlando, FL 32806
          <br />
          Phone: (407) 900-1486
          <br />
          support@baseballcloud.com
        </p>
      </Modal>
    </Box>
  </ContentContainer>
);

export default Privacy;
