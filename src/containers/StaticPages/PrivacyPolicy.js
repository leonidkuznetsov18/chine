import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Header } from 'components';
import { push } from 'react-router-redux';
import styles from './StaticPages.scss';
import { Grid } from 'react-bootstrap/lib';

@connect(
  () => ({}),
  {pushState: push})

export default class PrivacyPolicy extends Component {
  static propTypes = {
    pushState: PropTypes.func.isRequired
  };

  handleMenuClick() {
    this.props.pushState('/register');
  }
  render() {
    return (
      <div>
        <Header isRed={true} buttonText={'Back'} pageCaption={<span>Privacy Policy</span>} btnAction={this.handleMenuClick.bind(this)} />
        <Grid>
          <div className={styles.agreementContent}>
            <h2 className="text-center">Privacy Policy</h2>
            <p>This Privacy Policy governs the manner in which Tso Chinese Delivery collects, uses, maintains and discloses information collected from users (each, a "User") of the tsodelivery.com website ("Site"). This privacy policy applies to the Site and all products and services offered by Tso Chinese Delivery.</p>
            <br/>
            <h2>Personal identification information</h2>
            <p>We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the siteplace an order and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, credit card information,</p>
            <br/>
            <p>Users may, however, visit our Site anonymously.</p>
            <br/>
            <p>We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.</p>
            <br/>
            <h2>Non-personal identification information</h2>
            <p>We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.</p>
            <br/>
            <h2>Web browser cookies</h2>
            <p>Our Site may use "cookies" to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. User may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.</p>
            <br/>
            <h2>How we use collected information</h2>
            <p>Tso Chinese Delivery collects and uses Users personal information for the following purposes:</p>
            <br/>
            <ul>
            <li>To improve customer service
            <ul>
            <li>Your information helps us to more effectively respond to your customer service requests and support needs.</li>
            </ul>
            </li>
            <li> To personalize user experience
            <ul>
            <li>We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.</li>
            </ul>
            </li>
            <li>To improve our Site
            <ul>
            <li> We continually strive to improve our website offerings based on the information and feedback we receive from you.</li>
            </ul>
            </li><li> To process transactions
            <ul>
            <li> We may use the information Users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide the service.</li>
            </ul>
            </li><li>To administer a content, promotion, survey or other Site feature
            <ul>
            <li>To send Users information they agreed to receive about topics we think will be of interest to them.</li>
            </ul>
            </li><li> To send periodic emails
            <ul>
            <li> The email address Users provide for order processing, will only be used to send them information and updates pertaining to their order. It may also be used to respond to their inquiries, and/or other requests or questions. If User decides to opt-in to our mailing list, they will receive emails that may include company news, updates, related product or service information, etc. If at any time the User would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email or User may contact us via our Site.</li>
            </ul>
            </li>
            </ul>
            <br/>
            <h2>How we protect your information</h2>
            <p>We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.Sensitive and private data exchange between the Site and its Users happens over a SSL secured communication channel and is encrypted and protected with digital signatures.</p>
            <br/>
            <h2>Sharing your personal information</h2>
            <p>We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.We may use third party service providers to help us operate our business and the Site or administer activities on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes provided that you have given us your permission.</p>
            <br/>
            <h2>Changes to this privacy policy</h2>
            <p>Tso Chinese Delivery has the discretion to update this privacy policy at any time. When we do, . We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.</p>
            <br/>
            <h2>Your acceptance of these terms</h2>
            <p>By using this Site, you signify your acceptance of this policy and <a href="#">terms of service</a>. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.</p>
            <br/>
            <h2>Contacting us</h2>
            <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:</p>
            <p>Tso Chinese Delivery<br/>Tsodelivery.com<br/>3909 N IH35 Ste E-5 Austin TX 78722<br/>admin@tsodelivery.com</p>
            <br/>
          </div>
        </Grid>
      </div>
    );
  }
}
