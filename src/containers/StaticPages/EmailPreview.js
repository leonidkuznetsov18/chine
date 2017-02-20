import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import config from '../../../api/config';

@connect(
  () => ({}),
  {pushState: push})

export default class EmailPreview extends Component {
  static propTypes = {
    pushState: PropTypes.func.isRequired,
    location: PropTypes.object,
  };

  render() {
    const { location } = this.props;
    return (
    <table border="0" cellPadding="0" cellSpacing="0" style={{margin: 0, padding: 0, backgroundColor: '#eee'}} width="100%">
      <tr>
        <td height="15px"></td>
      </tr>
     <tr>
       <td style={{textAlign: 'center'}}><img alt="" border="0" src="https://gallery.mailchimp.com/a2949bb79afed4a7c74c4c092/images/5bbeba02-7cf2-4c94-ba96-e2eec9f0df67.png" height="60px" width="121px" /></td>
     </tr>
     <tr height="27px"></tr>
  <tr>
    <td align="center">
      <center style={{width: 100 + '%'}}>
      <table border="0" cellPadding="0" cellSpacing="0" style={{margin: 0, padding: 0, backgroundColor: '#fff'}} width="100%">
        <tr><td height="27px"></td></tr>
        <tr style={{textAlign: 'center'}}>
          <td>
            <span style={{display: 'inline-block', width: 300 + 'px', fontSize: 42 + 'px', fontFamily: 'Arial, Helvetica, sans-serif', color: '#000'}}>
              HELLO,
            </span>
          </td>
        </tr>
        <tr style={{textAlign: 'center'}}>
          <td>
            <span style={{display: 'inline-block', width: 300 + 'px', fontSize: 42 + 'px', textTransform: 'uppercase', fontFamily: 'Arial, Helvetica, sans-serif', color: '#000'}}>
             {location.query && location.query.name ? location.query.name : 'dear customer'}
            </span>
          </td>
        </tr>
        <tr><td height="58px"></td></tr>
        <tr style={{textAlign: 'center'}}>
          <td>
             <span style={{display: 'inline-block', width: 100 + '%', fontSize: 42 + 'px', textTransform: 'uppercase', color: '#FE0000', fontFamily: 'Arial, Helvetica, sans-serif'}}>
               We’re TSO happy to have you!
             </span>
          </td>
        </tr>
        <tr><td height="57px"></td></tr>
        <tr style={{textAlign: 'center'}}>
          <td>
            <span style={{display: 'inline-block', width: 700 + 'px', fontSize: 22 + 'px', textTransform: 'uppercase', fontFamily: 'Arial, Helvetica, sans-serif', color: '#000'}}>
              You have successfully created your TSO account.<br/>
              Your registered phone number is:
            </span>
          </td>
        </tr>
        <tr><td height="30px"></td></tr>
        <tr style={{textAlign: 'center'}}>
          <td>
            <span style={{display: 'inline-block', width: 100 + '%', fontSize: 42 + 'px', textTransform: 'uppercase', fontFamily: 'Arial, Helvetica, sans-serif', color: '#000'}}>
              +1{location.query.phone.slice(0, 2)} {location.query.phone.slice(2, 5)} {location.query.phone.slice(5, 8)} {location.query.phone.slice(8, 10)}
            </span>
          </td>
        </tr>
        <tr><td height="80px"></td></tr>
        <tr style={{textAlign: 'center'}}>
          <td>
            <span style={{display: 'inline-block', width: 100 + '%', fontSize: 22 + 'px', textTransform: 'uppercase', fontFamily: 'Arial, Helvetica, sans-serif', color: '#000'}}>
              Don’t forget that the price you see is the price you pay.<br/>
              <span style={{borderBottom: '3px solid #FE0000'}}>Delivery, Tax, & Gratuity are all INCLUDED.</span>
            </span>
          </td>
        </tr>
        <tr><td height="58px"></td></tr>
        <tr style={{textAlign: 'center'}}>
          <td>
            <a href={config.SITE_URL}><button style={{display: 'inline-block', border: 'none', width: 360 + 'px', fontSize: 22 + 'px', textTransform: 'uppercase', fontFamily: 'Arial, Helvetica, sans-serif', backgroundColor: '#FE0000', borderRadius: 6 + 'px', height: 50 + 'px'}}>
              <span style={{color: '#fff'}}>place your order now</span>
            </button></a>
          </td>
        </tr>
        <tr><td height="42px"></td></tr>
        <tr style={{textAlign: 'center'}}>
          <td>
            <a href={config.SITE_URL} style={{display: 'inline-block', width: 100 + '%', fontSize: 22 + 'px', textTransform: 'uppercase', fontFamily: 'Arial, Helvetica, sans-serif', color: '#9B9B9B', textDecoration: 'none'}}>go to
              <span style={{borderBottom: '1px solid #9B9B9B'}}>www.tsodelivery.com</span></a>
          </td>
        </tr>
        <tr><td height="87px"></td></tr>
        <tr style={{textAlign: 'center'}}>
          <td>
            <span style={{display: 'inline-block', width: 100 + '%', fontSize: 42 + 'px', textTransform: 'uppercase', fontFamily: 'Arial, Helvetica, sans-serif', color: '#000'}}>
              See you soon!<br/>
              General Tso
            </span>
          </td>
        </tr>
        <tr><td height="68px"></td></tr>
      </table>
     </center>
    </td>
  </tr>
  <tr><td height="27px"></td></tr>
  <tr style={{textAlign: 'center'}}>
    <td>
      <span>
        <img src="https://gallery.mailchimp.com/a2949bb79afed4a7c74c4c092/images/7c40417b-91cd-4cab-9f32-e8f169e71832.png" width="31px" height="31px" />
        <img src="https://gallery.mailchimp.com/a2949bb79afed4a7c74c4c092/images/02b442f9-1596-437d-b861-ff3be08fff2e.png" style={{marginLeft: 120 + 'px'}} width="18px" height="34px"/>
        <img src="https://gallery.mailchimp.com/a2949bb79afed4a7c74c4c092/images/c43c1f57-7af7-483d-a5fa-827671a55838.png" style={{marginLeft: 120 + 'px'}} width="32px" height="26px" />
      </span>
    </td>
  </tr>
  <tr><td height="42px"></td></tr>
  <tr style={{textAlign: 'center'}}>
    <td>
      <span style={{color: '#9B9B9B', textTransform: 'uppercase', fontSize: 22 + 'px', fontFamily: 'Arial, Helvetica, sans-serif'}}>
        Copyright © 2016 tso delivery <br/>
        343 Hill road, Austin, tx, Usa <br/>
        <a href="#" style={{color: '#9B9B9B'}}>View email in browser</a>/<a href = {config.SITE_URL + 'unsubscribe/' + location.query.hash} style={{color: '#9B9B9B'}}>Unsubscribe</a>
      </span>
    </td>
  </tr>
  <tr><td height="50px"></td></tr>
</table>
      );
  }
}
