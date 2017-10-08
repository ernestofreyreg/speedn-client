import React from 'react'

const SavePrediction = ({amount, description, onYes, onNo, handling}) => (
  <div className='SavePrediction'>

    <div className='box'>
      <div className='piggy'><img src='/static/img/saved.png'/></div>
      <div className='info'>
        <div className='msg'>We think you are about to spend some money on:</div>
        <div className='description'>{description}</div>
        <div className='amount'>${amount}</div>
        {!handling &&
        <div className='actions'>
          <div className='yes' onClick={onYes}>Save it!</div>
          <div className='no' onClick={onNo}>Nah!</div>
        </div>
        }

        {handling &&
          <div className='actions'>
            <div className='handling'>Saving Money!!!</div>
          </div>
        }
      </div>
    </div>

    {/* language=CSS */}
    <style jsx>{`
      .SavePrediction {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
      }

      .box {
        background-color: aliceblue;
        display: inline-flex;
        flex-direction: row;
        margin: 0 30px;
        border-radius: 10px;
        padding: 20px;
      }

      .info {
        display: inline-flex;
        flex-direction: column;
        margin-left: 10px;
      }

      .msg {
        font-size: 16px;
        color: #999;
      }

      .description {
        font-size: 24px;
        color: black;
      }

      .amount {
        font-size: 40px;
        color: #f58262;
      }

      .actions {
        display: inline-flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 10px;
      }

      .yes {
        font-size: 24px;
        color: white;
        background-color: #f58262;
        padding: 10px;
        border-radius: 10px;
      }

      .no {
        font-size: 24px;
        color: #999;
        padding: 10px;
        border-radius: 10px;
      }

      .handling {
        font-size: 24px;
        color: green;
        padding: 10px;
      }
    `}</style>
  </div>
)

export default SavePrediction
