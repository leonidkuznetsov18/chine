import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Header } from 'components';
import { push } from 'react-router-redux';
import styles from './StaticPages.scss';
import { Grid, Row, Col } from 'react-bootstrap/lib';
import { toggleSidebar } from 'redux/modules/sidebar';

@connect(
  () => ({}),
  {pushState: push, toggleSidebar})

export default class AboutCatering extends Component {
  static propTypes = {
    pushState: PropTypes.func.isRequired,
    toggleSidebar: PropTypes.func,
  };

  handleMenuClick() {
    this.props.pushState('/');
    this.props.toggleSidebar();
    document.body.style.overflow = 'auto';
  }

  render() {
    return (
      <div className={styles.aboutCatering}>
        <Helmet title="Catering"/>
        <Header isRed={true}
                buttonText={'Back'}
                pageCaption={<span>Catering</span>}
                btnAction={this.handleMenuClick.bind(this)}
        />
        <Grid>
            <Row>
                <Col xs={12}>
                    <h1>About Catering</h1>
                    <p>
                        Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit.
                        Debitis illo dignissimos, fugiat accusamus
                        beatae at, eius excepturi tenetur.
                        Quasi ipsa quidem adipisci nostrum voluptatibus
                        tempore voluptates iste. Provident nulla pariatur
                        ipsam distinctio iusto quibusdam nihil
                        necessitatibus expedita sunt quaerat voluptas
                        ipsa ducimus ratione laborum, minima tempore veniam harum, est molestiae?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit.
                        Debitis illo dignissimos, fugiat accusamus
                        beatae at, eius excepturi tenetur.
                        Quasi ipsa quidem adipisci nostrum voluptatibus
                        tempore voluptates iste. Provident nulla pariatur
                        ipsam distinctio iusto quibusdam nihil
                        necessitatibus expedita sunt quaerat voluptas
                        ipsa ducimus ratione laborum, minima tempore veniam harum, est molestiae?
                        Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit.
                        Debitis illo dignissimos, fugiat accusamus
                        beatae at, eius excepturi tenetur.
                        Quasi ipsa quidem adipisci nostrum voluptatibus
                        tempore voluptates iste. Provident nulla pariatur
                        ipsam distinctio iusto quibusdam nihil
                        necessitatibus expedita sunt quaerat voluptas
                        ipsa ducimus ratione laborum, minima tempore veniam harum, est molestiae?
                    </p>
                    <div className={styles.contacts}>
                      <a href="skype:+1 020 89-555-12" className={styles.contactsLink}>+1 020 89-555-12</a>
                      <br/>
                      <a href="mailto:delivery@tso.com" className={styles.contactsLink}>delivery@tso.com</a>
                    </div>
                </Col>
            </Row>
        </Grid>
      </div>
    );
  }
}
