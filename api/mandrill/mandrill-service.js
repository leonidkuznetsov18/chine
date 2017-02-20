import config from '../config'

var mandrill = require('mandrill-api/mandrill');

export function email_send(params, hash){
    var mandrill_client = new mandrill.Mandrill(config.MANDRILL_API_KEY);
    var phoneNumber = params.phone ? params.phone.replace(/\-/g,'') : '';
    var message = {
        "html": `
        <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0; background-color: #eee" width="100%">
      <tr>
        <td height='15px'></td>
      </tr>
     <tr>
       <td style='text-align: center'><img alt="" border="0" src="https://gallery.mailchimp.com/a2949bb79afed4a7c74c4c092/images/5bbeba02-7cf2-4c94-ba96-e2eec9f0df67.png" height="60px" width="121px"></td>
     </tr>
     <tr height='27px'></tr>
  <tr>
    <td align="center">
      <center style="max-width: 700px; width: 100%;">
      <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0; background-color: #fff" width="100%">
        <tr><td height='27px'></td></tr>
        <tr style="text-align:center;">
          <td>
            <span style="display:inline-block; width:300px; font-size: 42px; font-family: Arial, Helvetica, sans-serif; color: #000">
              HELLO,
            </span>
          </td>
        </tr>
        <tr style="text-align:center;">
          <td>
            <span style="display:inline-block; width:300px; font-size: 42px; text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; color: #000;">
             ${params && params.first_name ? params.first_name : 'dear customer'}
            </span>
          </td>
        </tr>
        <tr><td height='58px'></td></tr>
        <tr style="text-align:center;">
          <td>
             <span style="display:inline-block; width:100%; font-size: 42px; text-transform: uppercase; color:#FE0000; font-family: Arial, Helvetica, sans-serif;">
               We’re TSO happy to have you!
             </span>
          </td>
        </tr>
        <tr><td height='57px'></td></tr>
        <tr style="text-align:center;">
          <td>
            <span style="display:inline-block; width:700px; font-size: 22px; text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; color: #000;">
              You have successfully created your TSO account.<br/>
              Your registered phone number is:
            </span>
          </td>
        </tr>
        <tr><td height='30px'></td></tr>
        <tr style="text-align:center;">
          <td>
            <span style="display:inline-block; width:100%; font-size: 42px; text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; color: #000;">
              ${phoneNumber}
            </span>
          </td>
        </tr>
        <tr><td height='80px'></td></tr>
        <tr style="text-align:center;">
          <td>
            <span style="display:inline-block; width:100%; font-size: 22px; text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; color: #000;">
              Don’t forget that the price you see is the price you pay.<br/>
              <span style='border-bottom: 3px solid #FE0000;'>Delivery, Tax, & Gratuity are all INCLUDED.</span>
            </span>
          </td>
        </tr>
        <tr><td height='58px'></td></tr>
        <tr style="text-align:center;">
          <td>
            <a href=${config.SITE_URL}><button style="display:inline-block; border: none; width:85%; font-size: 22px; text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; background-color: #FE0000; border-radius: 6px; height: 50px">
              <span style='color: #fff;'>place your order now</span>
            </button></a>
          </td>
        </tr>
        <tr><td height='42px'></td></tr>
        <tr style="text-align:center;">
          <td>
            <a href=${config.SITE_URL} style="display:inline-block; width:100%; font-size: 22px; text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; color: #9B9B9B; text-decoration: none;">go to 
              <span style='border-bottom: 1px solid #9B9B9B'>www.tsodelivery.com</span></a>
          </td>
        </tr>
        <tr><td height='87px'></td></tr>
        <tr style="text-align:center;">
          <td>
            <span style="display:inline-block; width:100%; font-size: 42px; text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; color: #000;">
              See you soon!<br/>
              General Tso
            </span>
          </td>
        </tr>
        <tr><td height='68px'></td></tr>
      </table>
     </center>   
    </td>
  </tr>
  <tr><td height='27px'></td></tr>
  <tr style='text-align: center'>
    <td>
      <span>
        <img src='https://gallery.mailchimp.com/a2949bb79afed4a7c74c4c092/images/7c40417b-91cd-4cab-9f32-e8f169e71832.png' width="31px" height="31px" />
        <img src='https://gallery.mailchimp.com/a2949bb79afed4a7c74c4c092/images/02b442f9-1596-437d-b861-ff3be08fff2e.png' style=" margin-left: 120px" width="18px" height="34px"/>
        <img src='https://gallery.mailchimp.com/a2949bb79afed4a7c74c4c092/images/c43c1f57-7af7-483d-a5fa-827671a55838.png' style="margin-left: 120px" width="32px" height="26px" />
      </span>
    </td>
  </tr>
  <tr><td height='42px'></td></tr>
  <tr style='text-align: center'>
    <td>
      <span style='color: #9B9B9B; text-transform: uppercase; font-size: 22px; font-family: Arial, Helvetica, sans-serif;'>
        Copyright © 2016 tso delivery <br/>
        343 Hill road, Austin, tx, Usa <br/>
        <a href=${config.SITE_URL+'preview-email?phone=' + phoneNumber+'&name=' + params.first_name + '&hash=' + hash} style='color: #9B9B9B;'>View email in browser</a>/<a href=${config.SITE_URL+'unsubscribe/'+hash} style='color: #9B9B9B;'>Unsubscribe</a>
      </span>
    </td>
  </tr>
  <tr><td height='50px'></td></tr>
</table>`,
        "text": "Example text content",
        "subject": "Welcome to TSO Chinese Delivery. ",
        "from_email": "delivery@tsodev.scenario-projects.com",
        "from_name": "TSO Chinese Delivery",
        "to": [{
                "email": params.email,
                "name": `${params.first_name} ${params.last_name}`,
                "type": "to"
            }],
        "important": false,
        "track_opens": null,
        "track_clicks": null,
        "auto_text": null,
        "auto_html": null,
        "inline_css": null,
        "url_strip_qs": null,
        "preserve_recipients": null,
        "view_content_link": null,
        "tracking_domain": null,
        "signing_domain": null,
        "return_path_domain": null,
        "merge": true,
        "merge_language": "mailchimp",
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        console.log(result);
    }, function(e) {
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    });

    }

    export function recover_password(params,hash){
    var mandrill_client = new mandrill.Mandrill(config.MANDRILL_API_KEY);
    var message = {
        "html": `<p>Hello,${params.email} <br/>
           Recover your password <br/>
           Go to <a href="${config.SITE_URL}set-new-password/${hash}">${config.SITE_URL}set-new-password/${hash}</a>
        </p>`,
        "text": "Example text content",
        "subject": "Recover your password.",
        "from_email": "delivery@tsodev.scenario-projects.com",
        "from_name": "TSO Chinese Delivery",
        "to": [{
                "email": params.email,
                "name": `${params.first_name} ${params.last_name}`,
                "type": "to"
            }],
        "important": false,
        "track_opens": null,
        "track_clicks": null,
        "auto_text": null,
        "auto_html": null,
        "inline_css": null,
        "url_strip_qs": null,
        "preserve_recipients": null,
        "view_content_link": null,
        "tracking_domain": null,
        "signing_domain": null,
        "return_path_domain": null,
        "merge": true,
        "merge_language": "mailchimp",
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        console.log(result);
    }, function(e) {
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    });

    }

