import React from 'react'
import classNames from 'classnames'

const PredictionAlert = ({description, amount, hasPrediction, onClick}) => (
  <div className={classNames('PredictionAlert', {'has': hasPrediction})} onClick={onClick}>
    <div className='alert'>
      <img src='/static/img/speednlogo.png' />

      <div className='description'>
        <span className='about'>You are about to spend on</span>
        {description}
      </div>
      <div className='amount'>${amount}</div>
    </div>


    {/* language=CSS */}
    <style jsx>{`
      .PredictionAlert {
        position: absolute;
        top: -100%;
        left: 0;
        right: 0;
        display: inline-flex;
        flex-direction: column;
        z-index: 1;
        transition: top 1.2s;
        background-color: aliceblue;
      }

      .PredictionAlert.has { top: 0; }

      .alert {
        display: inline-flex;
        flex-direction: row;
        padding: 10px;
      }

      .alert img {
        width: 40px;
        height: 40px;
      }

      .alert .description {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        font-size: 15px;
        color: #777;
        margin-left: 10px;
      }

      .alert .description .about {
        font-size: 13px;
        color: #999;
      }

      .alert .amount {
        font-size: 40px;
        color: #f58262;
      }
    `}</style>
  </div>
)

export default PredictionAlert
