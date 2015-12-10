import React, {Component, PropTypes} from 'react'
import Logo from '../../assets/logo-grey-2.png'
import './style.css'

export default class Home extends Component {
  displayName: 'Home'
  render () {
    return (
      <div className='container-fluid full-width homePage'>
        <div className='row'>
          <div className='col-md-2'></div>
          <div className='col-md-8 main'>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='guesstimate-logo-outer'>
                  <div className='guesstimate-logo'>
                    <div className='guesstimate-icon'>
                      <img src={Logo} />
                    </div>
                    <div className='guesstimate-name'>Guesstimate</div>
                  </div>
                </div>
              </div>

              <div className='col-sm-12 guesstimate-slogan'>
                <h2> Reduce uncertainty by doing math with probability distributions.
                </h2>
              </div>

            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12 cta'>
            <a href='/spaces' className='ui button huge primary'> Browse Public Models </a>
          </div>
        </div>

      </div>
    )
  }
}